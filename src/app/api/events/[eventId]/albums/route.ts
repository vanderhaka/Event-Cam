import { NextRequest } from 'next/server';
import { ApiError, jsonResponse, parseJsonBody } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { toStringList } from '@/lib/utils';

export async function POST(request: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    const event = await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();
    const body = await parseJsonBody(request);

    const title = String(body.title ?? '').trim();
    if (!title) {
      return jsonResponse({ message: 'Album title is required' }, { status: 400 });
    }

    const mediaIds = toStringList(body.mediaIds);
    if (mediaIds.length === 0) {
      return jsonResponse({ message: 'mediaIds is required' }, { status: 400 });
    }

    const { data: existing, error: mediaError } = await admin
      .from('media_items')
      .select('id')
      .eq('event_id', event.id)
      .in('id', mediaIds);

    if (mediaError) {
      return jsonResponse({ message: mediaError.message }, { status: 400 });
    }

    if (!existing || existing.length !== mediaIds.length) {
      return jsonResponse({ message: 'Some media IDs were not found for this event' }, { status: 400 });
    }

    const criteria = body.criteria ? body.criteria : {};
    const visibility = String(body.visibility ?? 'public');

    const { data: album, error: albumError } = await admin
      .from('albums')
      .insert({
        event_id: event.id,
        title,
        criteria,
        visibility,
        created_by: userId,
      })
      .select('*')
      .single();

    if (albumError) {
      return jsonResponse({ message: albumError.message }, { status: 400 });
    }

    const rows = mediaIds.map((mediaItemId) => ({ album_id: album.id, media_item_id: mediaItemId }));
    const { error: joinError } = await admin.from('album_items').insert(rows);

    if (joinError) {
      return jsonResponse({ message: joinError.message }, { status: 400 });
    }

    return jsonResponse({ album });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to create album' }, { status: 500 });
  }
}
