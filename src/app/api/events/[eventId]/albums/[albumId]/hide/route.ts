import { ApiError, jsonResponse } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { recordEventMetric } from '@/lib/event-metrics';

export async function POST(_: Request, context: { params: { eventId: string; albumId: string } }) {
  try {
    const { userId } = await requireHostUser();
    const event = await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();

    const { data: album, error: albumError } = await admin
      .from('albums')
      .select('id')
      .eq('id', context.params.albumId)
      .eq('event_id', event.id)
      .single();

    if (albumError || !album) {
      return jsonResponse({ message: 'Album not found' }, { status: 404 });
    }

    const { error: hideError } = await admin.from('albums').update({ visibility: 'private' }).eq('id', album.id);
    if (hideError) {
      return jsonResponse({ message: hideError.message }, { status: 400 });
    }

    await admin
      .from('share_links')
      .update({ revoked_at: new Date().toISOString() })
      .eq('album_id', album.id)
      .is('revoked_at', null);

    await recordEventMetric({
      eventId: event.id,
      action: 'album_hidden',
      actor: 'host',
      actorId: userId,
      targetType: 'album',
      targetId: album.id,
      reason: 'manual_hide',
      metadata: { albumId: album.id },
    });

    return jsonResponse({ hidden: true, albumId: album.id });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to hide album' }, { status: 500 });
  }
}
