import { ApiError, jsonResponse, parseJsonBody } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { requireHostUser } from '@/lib/auth';
import { randomToken, hashValue } from '@/lib/utils';

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

    const maxViews = body.maxViews ? Number(body.maxViews) : null;
    const shouldRegenerate = body.regenerate === true;
    const expiresInHours = Number(body.expiresInHours ?? 0);
    const expiresAt = Number.isFinite(expiresInHours) && expiresInHours > 0
      ? new Date(Date.now() + expiresInHours * 60 * 60 * 1000).toISOString()
      : null;

    if (shouldRegenerate) {
      await admin
        .from('share_links')
        .update({ revoked_at: new Date().toISOString() })
        .eq('album_id', album.id)
        .is('revoked_at', null);
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

    return jsonResponse({
      share,
      shareUrl: `${linkBase}/albums/${album.id}/public?share=${token}`,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to create share link' }, { status: 500 });
  }
}
