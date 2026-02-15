import { NextRequest } from 'next/server';
import { ApiError, jsonResponse } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { hashValue } from '@/lib/utils';
import { recordEventMetric } from '@/lib/event-metrics';

export async function GET(request: NextRequest, context: { params: { albumId: string } }) {
  try {
    const shareToken = request.nextUrl.searchParams.get('token') || request.nextUrl.searchParams.get('shareToken');
    const password = request.nextUrl.searchParams.get('password') || '';
    const sortDirection = request.nextUrl.searchParams.get('order') === 'oldest' ? 'oldest' : 'newest';

    if (!shareToken || !password) {
      return jsonResponse({ message: 'share token and password are required' }, { status: 401 });
    }

    const admin = createSupabaseAdminClient();

    const { data: share, error } = await admin
      .from('share_links')
      .select('*')
      .eq('token', shareToken)
      .single();

    if (error || !share) {
      return jsonResponse({ message: 'Invalid share link' }, { status: 404 });
    }

    if (share.revoked_at) {
      return jsonResponse({ message: 'This share link has been revoked' }, { status: 410 });
    }

    if (share.expires_at && new Date(share.expires_at).getTime() < Date.now()) {
      return jsonResponse({ message: 'Share link expired' }, { status: 410 });
    }

    if (share.max_views !== null && share.view_count >= share.max_views) {
      return jsonResponse({ message: 'Share link reached view limit' }, { status: 429 });
    }

    const expectedHash = hashValue(password, process.env.EVENT_CAM_TOKEN_SALT || 'event-cam');
    if (share.password_hash !== expectedHash) {
      return jsonResponse({ message: 'Invalid share password' }, { status: 401 });
    }

    const { data: album, error: albumError } = await admin
      .from('albums')
      .select('*')
      .eq('id', context.params.albumId)
      .single();

    if (albumError || !album || album.id !== share.album_id) {
      return jsonResponse({ message: 'Album not found for this share token' }, { status: 404 });
    }

    if (album.visibility !== 'public') {
      return jsonResponse({ message: 'This album is no longer public' }, { status: 410 });
    }

    const { data: albumItems, error: albumItemsError } = await admin
      .from('album_items')
      .select('media_item_id,added_at')
      .eq('album_id', context.params.albumId)
      .order('added_at');

    if (albumItemsError) {
      return jsonResponse({ message: albumItemsError.message }, { status: 400 });
    }

    const mediaIds = (albumItems ?? []).map((item) => item.media_item_id);
    if (mediaIds.length === 0) {
      return jsonResponse({
        album: { id: album.id, title: album.title },
        items: [],
      });
    }

    const { data: mediaRows, error: mediaError } = await admin
      .from('media_items')
      .select('*')
      .in('id', mediaIds)
      .eq('moderation_state', 'approved');

    if (mediaError) {
      return jsonResponse({ message: mediaError.message }, { status: 400 });
    }

    const { data: invitees, error: inviteeError } = await admin
      .from('invitees')
      .select('id,display_name,group_tag')
      .in(
        'id',
        (mediaRows ?? []).map((item) => item.invitee_id)
      );

    if (inviteeError) {
      return jsonResponse({ message: inviteeError.message }, { status: 400 });
    }

    const inviteeById = new Map((invitees ?? []).map((invitee) => [invitee.id, invitee]));
    const signedUrlExpirySec = 3600; // 1 hour for share-link viewers
    const mediaIdsInOrder = mediaIds
      .map((mediaId) => (mediaRows ?? []).find((item) => item.id === mediaId))
      .filter(Boolean);
    const itemsWithPaths = await Promise.all(
      mediaIdsInOrder.map(async (item) => {
        const inv = inviteeById.get(item.invitee_id);
        let url: string | null = null;
        if (item.storage_path) {
          const { data } = await admin.storage
            .from('event-media')
            .createSignedUrl(item.storage_path, signedUrlExpirySec);
          url = data?.signedUrl ?? null;
        }
        return {
          id: item.id,
          mediaType: item.media_type,
          mimeType: item.mime_type,
          uploadedAt: item.created_at,
          invitedBy: inv,
          url,
          name: item.original_name,
          durationSec: item.duration_sec,
        };
      }),
    );

    const orderedItems = itemsWithPaths.slice().sort((a, b) => {
      const aAt = new Date(a.uploadedAt || '').getTime();
      const bAt = new Date(b.uploadedAt || '').getTime();
      return sortDirection === 'oldest' ? aAt - bAt : bAt - aAt;
    });

    await recordEventMetric({
      eventId: album.event_id,
      action: 'gallery_open_success',
      actor: 'guest',
      actorId: null,
      reason: 'public_gallery_open',
      metadata: {
        albumId: album.id,
        mediaCount: orderedItems.length,
      },
    });

    await admin
      .from('share_links')
      .update({ view_count: (share.view_count || 0) + 1 })
      .eq('id', share.id);

    return jsonResponse({
      album: {
        id: album.id,
        title: album.title,
        event_id: album.event_id,
        criteria: album.criteria,
      },
      items: orderedItems,
      order: sortDirection,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to open share link' }, { status: 500 });
  }
}
