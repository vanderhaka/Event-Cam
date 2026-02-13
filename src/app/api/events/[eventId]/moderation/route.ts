import { NextRequest } from 'next/server';
import { ApiError, jsonResponse } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    await getEventForHost(context.params.eventId, userId);
    const state = request.nextUrl.searchParams.get('state') || 'pending';

    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from('media_items')
      .select('id, media_type, original_name, mime_type, size_bytes, duration_sec, moderation_state, created_at, attributed_labels, invitee_id, uploader_token')
      .eq('event_id', context.params.eventId)
      .eq('moderation_state', state)
      .order('created_at', { ascending: false });

    if (error) {
      return jsonResponse({ message: error.message }, { status: 400 });
    }

    const mediaItems = data ?? [];
    if (mediaItems.length === 0) {
      return jsonResponse({ media: [] });
    }

    const inviteeIds = mediaItems.map((item) => item.invitee_id).filter(Boolean);
    const { data: invitees } = await admin
      .from('invitees')
      .select('id, display_name, group_tag, phone_e164')
      .in('id', inviteeIds as string[]);

    const inviteeById = new Map((invitees ?? []).map((invitee) => [invitee.id, invitee]));
    const enriched = mediaItems.map((item) => ({
      ...item,
      invitee: inviteeById.get(item.invitee_id) || null,
    }));

    return jsonResponse({ media: enriched });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to fetch moderation queue' }, { status: 500 });
  }
}
