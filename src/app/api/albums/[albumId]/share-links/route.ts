import { ApiError, jsonResponse, parseJsonBody } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { requireHostUser } from '@/lib/auth';
import { randomToken, hashValue } from '@/lib/utils';
import { sendAlbumToGuests } from '../send-to-guests/route';

export async function POST(request: Request, context: { params: { albumId: string } }) {
  try {
    const { userId } = await requireHostUser();
    const admin = createSupabaseAdminClient();
    const body = await parseJsonBody(request);

    const password = String(body.password ?? '').trim();
    if (!password || password.length < 4) {
      return jsonResponse({ message: 'Password must be at least 4 chars' }, { status: 400 });
    }

    const { data: album, error: albumError } = await admin
      .from('albums')
      .select('id, event_id')
      .eq('id', context.params.albumId)
      .single();

    if (albumError || !album) {
      return jsonResponse({ message: 'Album not found' }, { status: 404 });
    }

    const { data: event, error: eventError } = await admin
      .from('events')
      .select('host_id')
      .eq('id', album.event_id)
      .single();

    if (eventError || !event) {
      return jsonResponse({ message: 'Unable to validate album host' }, { status: 400 });
    }

    if (event.host_id !== userId) {
      return jsonResponse({ message: 'Not authorized for this album' }, { status: 403 });
    }

    const shouldRegenerate = body.regenerate === true;
    const maxViews = body.maxViews === undefined ? null : Number(body.maxViews);
    const expiresInHours = body.expiresInHours === undefined ? null : Number(body.expiresInHours);

    if (maxViews !== null && (!Number.isInteger(maxViews) || maxViews <= 0)) {
      return jsonResponse({ message: 'maxViews must be a positive integer or omitted' }, { status: 400 });
    }

    if (expiresInHours !== null && (!Number.isFinite(expiresInHours) || expiresInHours <= 0)) {
      return jsonResponse({ message: 'expiresInHours must be a positive number or omitted' }, { status: 400 });
    }

    const expiresAt =
      expiresInHours === null
        ? null
        : new Date(Date.now() + expiresInHours * 60 * 60 * 1000).toISOString();

    if (shouldRegenerate) {
      const { error: revokeError } = await admin
        .from('share_links')
        .update({ revoked_at: new Date().toISOString() })
        .eq('album_id', album.id)
        .is('revoked_at', null);

      if (revokeError) {
        return jsonResponse({ message: revokeError.message }, { status: 400 });
      }
    }

    const token = randomToken(20);
    const tokenHash = hashValue(password, process.env.EVENT_CAM_TOKEN_SALT || 'event-cam');

    const { data: share, error: shareError } = await admin
      .from('share_links')
      .insert({
        album_id: album.id,
        token,
        password_hash: tokenHash,
        max_views: Number.isFinite(maxViews) ? maxViews : null,
        expires_at: expiresAt,
        created_by: userId,
      })
      .select('*')
      .single();

    if (shareError) {
      return jsonResponse({ message: shareError.message }, { status: 400 });
    }

    const linkBase = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    let autoSendSummary = null;
    try {
      const { data: settings } = await admin
        .from('email_settings')
        .select('album_auto_send')
        .eq('event_id', album.event_id)
        .single();

      if (settings?.album_auto_send) {
        autoSendSummary = await sendAlbumToGuests({
          admin,
          userId,
          albumId: album.id,
          password,
        });
      }
    } catch (error) {
      console.error('[share-links] auto-send to contacts failed', error instanceof Error ? error.message : String(error));
    }

    return jsonResponse({
      share,
      shareUrl: `${linkBase}/albums/${album.id}/public?share=${token}`,
      autoSend: autoSendSummary
        ? {
            sentCount: autoSendSummary.sentCount,
            alreadySentCount: autoSendSummary.alreadySentCount,
            unsubscribedCount: autoSendSummary.unsubscribedCount,
            failedCount: autoSendSummary.failedCount,
            message: autoSendSummary.message,
          }
        : null,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to create share link' }, { status: 500 });
  }
}
