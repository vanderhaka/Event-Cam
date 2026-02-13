import { NextRequest } from 'next/server';
import { ApiError, jsonResponse } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { hashValue } from '@/lib/utils';

export async function GET(request: NextRequest, context: { params: { albumId: string } }) {
  try {
    const shareToken = request.nextUrl.searchParams.get('token') || request.nextUrl.searchParams.get('shareToken');
    const password = request.nextUrl.searchParams.get('password') || '';

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
    const itemsOrdered = mediaIds
      .map((mediaId) => (mediaRows ?? []).find((item) => item.id === mediaId))
      .filter(Boolean)
      .map((item) => {
        const inv = inviteeById.get(item.invitee_id);
        const publicUrl = admin.storage
          .from('event-media')
          .getPublicUrl(item.storage_path).data.publicUrl;
        return {
          id: item.id,
          mediaType: item.media_type,
          mimeType: item.mime_type,
          uploadedAt: item.created_at,
          invitedBy: inv,
          url: publicUrl,
          name: item.original_name,
          durationSec: item.duration_sec,
        };
      });

    await admin
      .from('share_links')
      .update({ view_count: (share.view_count || 0) + 1 })
      .eq('id', share.id);

    return jsonResponse({
      album: {
        id: album.id,
        title: album.title,
        criteria: album.criteria,
      },
      items: itemsOrdered,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to open share link' }, { status: 500 });
  }
}
