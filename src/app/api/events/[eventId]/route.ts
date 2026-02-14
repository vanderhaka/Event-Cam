import { NextRequest } from 'next/server';
import { ApiError, jsonResponse } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { getEventForHost, requireHostUser } from '@/lib/auth';

async function readEvent(eventId: string, userId: string) {
  const admin = createSupabaseAdminClient();
  const event = await getEventForHost(eventId, userId);

  const { data: invitees, error: inviteeError } = await admin
    .from('invitees')
    .select('id, display_name, email, phone_e164, group_tag, qr_state, qr_token, is_active, created_at')
    .eq('event_id', eventId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (inviteeError) {
    throw new ApiError('Unable to fetch invitees', 400);
  }

  const { data: albums } = await admin
    .from('albums')
    .select('id, title, created_at')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });

  const { count: inviteCount, error: inviteCountError } = await admin
    .from('invitees')
    .select('id', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('is_active', true);

  if (inviteCountError) {
    throw new ApiError('Unable to count invitees', 400);
  }

  const { count: approvedCount, error: approvedCountError } = await admin
    .from('media_items')
    .select('id', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('moderation_state', 'approved');

  if (approvedCountError) {
    throw new ApiError('Unable to count approved media', 400);
  }

  return {
    event,
    invitees: invitees ?? [],
    albums: albums ?? [],
    counts: {
      invitees: inviteCount ?? 0,
      approved_media: approvedCount ?? 0,
    },
  };
}

export async function GET(_: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    const payload = await readEvent(context.params.eventId, userId);
    return jsonResponse(payload);
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to load event' }, { status: 400 });
  }
}
