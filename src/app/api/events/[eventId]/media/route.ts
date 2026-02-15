import { NextRequest } from 'next/server';
import { ApiError, jsonResponse } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

const SIGNED_MEDIA_URL_TTL_SECONDS = 60 * 60;

type MediaListState = 'all' | 'pending' | 'approved' | 'rejected';

const ALLOWED_LIST_STATE: Record<string, MediaListState> = {
  all: 'all',
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
};

function buildPublicAlbumUrl(albumId: string, token: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  return `${base}/albums/${albumId}/public?share=${token}`;
}

function parseSortDirection(value: string | null) {
  return value === 'oldest' ? 'asc' : 'desc';
}

export async function GET(request: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId: _userId } = await requireHostUser();
    const event = await getEventForHost(context.params.eventId, _userId);
    const admin = createSupabaseAdminClient();

    const mediaState = ALLOWED_LIST_STATE[request.nextUrl.searchParams.get('state') || 'all'] || 'all';
    const orderDirection = parseSortDirection(request.nextUrl.searchParams.get('order'));

    let mediaQuery = admin
      .from('media_items')
      .select('id,event_id,invitee_id,uploader_token,created_at,media_type,storage_path,original_name,mime_type,size_bytes,duration_sec,moderation_state')
      .eq('event_id', event.id)
      .order('created_at', { ascending: orderDirection === 'asc' });

    if (mediaState !== 'all') {
      mediaQuery = mediaQuery.eq('moderation_state', mediaState);
    }

    const { data: mediaRows, error: mediaError } = await mediaQuery;
    if (mediaError) {
      return jsonResponse({ message: mediaError.message }, { status: 400 });
    }

    const items = mediaRows ?? [];
    const inviteeIds = Array.from(new Set(items.map((item) => item.invitee_id).filter(Boolean)));
    let invitees: Array<{ id: string; display_name: string }> = [];
    if (inviteeIds.length > 0) {
      const { data: inviteeRows, error: inviteeError } = await admin
        .from('invitees')
        .select('id, display_name')
        .in('id', inviteeIds as string[]);

      if (inviteeError) {
        return jsonResponse({ message: inviteeError.message }, { status: 400 });
      }

      invitees = inviteeRows ?? [];
    }

    const inviteeById = new Map((invitees ?? []).map((invitee) => [invitee.id, invitee.display_name]));

    const enriched = await Promise.all(
      items.map(async (item) => {
        let mediaUrl: string | null = null;
        if (item.storage_path) {
          const { data } = await admin.storage.from('event-media').createSignedUrl(item.storage_path, SIGNED_MEDIA_URL_TTL_SECONDS);
          mediaUrl = data?.signedUrl ?? null;
        }

        return {
          id: item.id,
          event_id: item.event_id,
          uploaded_by: inviteeById.get(item.invitee_id) ?? item.uploader_token,
          created_at: item.created_at,
          media_type: item.media_type,
          media_url: mediaUrl,
          thumbnail_url: null,
          original_name: item.original_name,
          mime_type: item.mime_type,
          size_bytes: item.size_bytes,
          duration_sec: item.duration_sec,
          moderation_state: item.moderation_state,
        };
      }),
    );

    const { data: publicAlbums, error: albumError } = await admin
      .from('albums')
      .select('id')
      .eq('event_id', event.id)
      .eq('visibility', 'public')
      .order('created_at', { ascending: false });
    if (albumError) {
      return jsonResponse({ message: albumError.message }, { status: 400 });
    }

    let publicAlbumUrl: string | null = null;
    let publicAlbumId: string | null = null;
    if (publicAlbums && publicAlbums.length > 0) {
      const publicAlbumIdRow = publicAlbums[0].id;
      publicAlbumId = publicAlbumIdRow;
      const { data: shareRows, error: shareError } = await admin
        .from('share_links')
        .select('token, expires_at, max_views, view_count, revoked_at')
        .eq('album_id', publicAlbumId)
        .is('revoked_at', null)
        .order('created_at', { ascending: false });

      if (shareError) {
        return jsonResponse({ message: shareError.message }, { status: 400 });
      }

      const now = Date.now();
      const share = (shareRows ?? []).find((link) => {
        if (link.expires_at && new Date(link.expires_at).getTime() < now) return false;
        if (link.max_views !== null && link.view_count >= link.max_views) return false;
        return true;
      });

      const shareToken = share?.token;
      if (shareToken) {
        publicAlbumUrl = buildPublicAlbumUrl(publicAlbumIdRow, String(shareToken));
      }
    }

    return jsonResponse({
      event: {
        id: event.id,
        name: event.name,
        public_album_url: publicAlbumUrl,
        public_album_id: publicAlbumId,
        status: event.status,
        is_published: event.is_published,
      },
      media: enriched,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to fetch media list' }, { status: 500 });
  }
}
