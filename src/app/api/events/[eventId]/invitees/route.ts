import { NextRequest } from 'next/server';
import { ApiError, jsonResponse, parseJsonBody } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { normalizeWhitespace, toStringList } from '@/lib/utils';

export async function POST(request: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    await getEventForHost(context.params.eventId, userId);

    const body = await parseJsonBody(request);
    const rawInvitees = body.invitees;

    if (!Array.isArray(rawInvitees) || rawInvitees.length === 0) {
      return jsonResponse({ message: 'invitees must be a non-empty array' }, { status: 400 });
    }

    const invitees = rawInvitees
      .map((entry: { displayName?: string; name?: string; email?: string; phone?: string; phone_e164?: string; groupTag?: string; group_tag?: string }) => {
        const displayName = normalizeWhitespace(String(entry?.displayName ?? entry?.name ?? '').trim());
        if (!displayName) return null;
        return {
          event_id: context.params.eventId,
          display_name: displayName,
          email: entry?.email ? String(entry.email).trim() : null,
          phone_e164: String(entry?.phone_e164 ?? entry?.phone ?? '').trim() || null,
          group_tag: String(entry?.groupTag ?? entry?.group_tag ?? '').trim() || null,
          created_by_host: userId,
        };
      })
      .filter((invitee): invitee is NonNullable<typeof invitee> => Boolean(invitee));

    if (invitees.length === 0) {
      return jsonResponse({ message: 'Each invitee must have a displayName' }, { status: 400 });
    }

    const admin = createSupabaseAdminClient();
    const { data, error } = await admin.from('invitees').insert(invitees).select('*');

    if (error) {
      return jsonResponse({ message: error.message }, { status: 400 });
    }

    return jsonResponse({ invitees: data }, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to add invitees' }, { status: 500 });
  }
}

export async function GET(_: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    await getEventForHost(context.params.eventId, userId);

    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from('invitees')
      .select('id, display_name, email, phone_e164, group_tag, qr_state, qr_token, is_active')
      .eq('event_id', context.params.eventId)
      .order('created_at', { ascending: false });

    if (error) {
      return jsonResponse({ message: error.message }, { status: 400 });
    }

    return jsonResponse({ invitees: data ?? [] });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to fetch invitees' }, { status: 500 });
  }
}
