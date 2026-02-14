import { NextRequest } from 'next/server';
import { ApiError, jsonResponse, parseJsonBody } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { normalizeWhitespace } from '@/lib/utils';

async function getInviteeForEvent(admin: ReturnType<typeof createSupabaseAdminClient>, eventId: string, inviteeId: string) {
  const { data: invitee, error } = await admin
    .from('invitees')
    .select('id, event_id, display_name, email, phone_e164, group_tag, qr_state, is_active')
    .eq('id', inviteeId)
    .eq('event_id', eventId)
    .single();

  if (error || !invitee) {
    throw new ApiError('Invitee not found', 404);
  }
  return invitee;
}

export async function PATCH(request: NextRequest, context: { params: { eventId: string; inviteeId: string } }) {
  try {
    const { userId } = await requireHostUser();
    await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();
    await getInviteeForEvent(admin, context.params.eventId, context.params.inviteeId);

    const body = await parseJsonBody(request);
    const displayName = body.displayName != null ? normalizeWhitespace(String(body.displayName).trim()) : undefined;
    const email = body.email !== undefined ? (body.email ? String(body.email).trim() : null) : undefined;
    const phone = body.phone !== undefined ? (body.phone ? String(body.phone).trim() : null) : undefined;
    const groupTag = body.groupTag !== undefined ? (body.groupTag ? String(body.groupTag).trim() : null) : undefined;

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (displayName !== undefined) {
      if (!displayName) throw new ApiError('displayName cannot be empty', 400);
      updates.display_name = displayName;
    }
    if (email !== undefined) updates.email = email;
    if (phone !== undefined) updates.phone_e164 = phone;
    if (groupTag !== undefined) updates.group_tag = groupTag;

    const { data, error } = await admin
      .from('invitees')
      .update(updates)
      .eq('id', context.params.inviteeId)
      .eq('event_id', context.params.eventId)
      .select('*')
      .single();

    if (error) return jsonResponse({ message: error.message }, { status: 400 });
    return jsonResponse({ invitee: data });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to update invitee' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, context: { params: { eventId: string; inviteeId: string } }) {
  try {
    const { userId } = await requireHostUser();
    await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();
    await getInviteeForEvent(admin, context.params.eventId, context.params.inviteeId);

    const { error } = await admin
      .from('invitees')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', context.params.inviteeId)
      .eq('event_id', context.params.eventId);

    if (error) return jsonResponse({ message: error.message }, { status: 400 });
    return jsonResponse({ success: true });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to remove invitee' }, { status: 500 });
  }
}
