import { NextRequest } from 'next/server';
import { ApiError, jsonResponse } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { hashValue } from '@/lib/utils';

export async function GET(request: NextRequest, context: { params: { albumId: string } }) {
  try {
    const shareToken = request.nextUrl.searchParams.get('token') || '';
    const password = request.nextUrl.searchParams.get('password') || '';
    const mediaId = request.nextUrl.searchParams.get('mediaId');

    if (!shareToken || !password) {
      return jsonResponse({ message: 'Share token and password are required' }, { status: 401 });
    }

    const admin = createSupabaseAdminClient();

    // Validate share link (same checks as public album route)
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

    const expectedHash = hashValue(password, process.env.EVENT_CAM_TOKEN_SALT || 'event-cam');
    if (share.password_hash !== expectedHash) {
      return jsonResponse({ message: 'Invalid share password' }, { status: 401 });
    }

    const { data: album, error: albumError } = await admin
      .from('albums')
      .select('id, title')
      .eq('id', context.params.albumId)
      .single();

    if (albumError || !album || album.id !== share.album_id) {
      return jsonResponse({ message: 'Album not found for this share token' }, { status: 404 });
    }

    // Get album items
    const { data: albumItems, error: albumItemsError } = await admin
      .from('album_items')
      .select('media_item_id')
      .eq('album_id', context.params.albumId);

    if (albumItemsError) {
      return jsonResponse({ message: albumItemsError.message }, { status: 400 });
    }

    const allMediaIds = (albumItems ?? []).map((item) => item.media_item_id);
    if (allMediaIds.length === 0) {
      return jsonResponse({ items: [] });
    }

    // Filter to requested media or all
    const targetIds = mediaId ? allMediaIds.filter((id) => id === mediaId) : allMediaIds;

    if (targetIds.length === 0) {
      return jsonResponse({ message: 'Media item not found in this album' }, { status: 404 });
    }

    const { data: mediaRows, error: mediaError } = await admin
      .from('media_items')
      .select('id, storage_path, original_name, media_type, moderation_state')
      .in('id', targetIds)
      .eq('moderation_state', 'approved');

    if (mediaError) {
      return jsonResponse({ message: mediaError.message }, { status: 400 });
    }

    const downloadUrlExpirySec = 3600;
    const items = await Promise.all(
      (mediaRows ?? []).map(async (item) => {
        let downloadUrl: string | null = null;
        if (item.storage_path) {
          const { data } = await admin.storage
            .from('event-media')
            .createSignedUrl(item.storage_path, downloadUrlExpirySec, {
              download: item.original_name || true,
            });
          downloadUrl = data?.signedUrl ?? null;
        }
        return {
          id: item.id,
          name: item.original_name || `${item.media_type}-${item.id}`,
          mediaType: item.media_type,
          downloadUrl,
        };
      }),
    );

    return jsonResponse({ items: items.filter((item) => item.downloadUrl) });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to generate download links' }, { status: 500 });
  }
}
