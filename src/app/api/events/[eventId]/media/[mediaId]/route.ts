import { ApiError, jsonResponse } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { recordEventMetric } from '@/lib/event-metrics';

export async function DELETE(_request: Request, context: { params: { eventId: string; mediaId: string } }) {
  try {
    const { userId } = await requireHostUser();
    const event = await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();

    const { data: media, error: mediaError } = await admin
      .from('media_items')
      .select('id, storage_path')
      .eq('id', context.params.mediaId)
      .eq('event_id', event.id)
      .single();

    if (mediaError || !media) {
      return jsonResponse({ message: 'Media item not found' }, { status: 404 });
    }

    const { error: deleteError } = await admin
      .from('media_items')
      .delete()
      .eq('id', context.params.mediaId)
      .eq('event_id', event.id);

    if (deleteError) {
      return jsonResponse({ message: deleteError.message }, { status: 400 });
    }

    if (media.storage_path) {
      await admin.storage.from('event-media').remove([media.storage_path]).catch(() => {});
    }

    await recordEventMetric({
      eventId: event.id,
      action: 'media_deleted',
      actor: 'host',
      actorId: userId,
      targetType: 'media_item',
      targetId: media.id,
      metadata: { storagePath: media.storage_path },
    });

    return jsonResponse({ deleted: true, mediaId: media.id });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to delete media' }, { status: 500 });
  }
}
