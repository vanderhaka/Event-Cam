import { ApiError, jsonResponse, parseJsonBody } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { requireHostUser } from '@/lib/auth';
import { hashValue } from '@/lib/utils';
import { sendAlbumDeliveryEmail } from '@/lib/email';
import { recordEventMetric } from '@/lib/event-metrics';

export async function POST(request: Request, context: { params: { albumId: string } }) {
  try {
    const { userId } = await requireHostUser();
    const admin = createSupabaseAdminClient();
    const body = await parseJsonBody(request);

    const to = String(body.to ?? '').trim().toLowerCase();
    if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return jsonResponse({ message: 'A valid email address is required' }, { status: 400 });
    }

    const password = String(body.password ?? '').trim();
    if (!password) {
      return jsonResponse({ message: 'Share link password is required' }, { status: 400 });
    }

    // Verify album belongs to this host
    const { data: album, error: albumError } = await admin
      .from('albums')
      .select('id, title, event_id')
      .eq('id', context.params.albumId)
      .single();

    if (albumError || !album) {
      return jsonResponse({ message: 'Album not found' }, { status: 404 });
    }

    const { data: event, error: eventError } = await admin
      .from('events')
      .select('host_id, name')
      .eq('id', album.event_id)
      .single();

    if (eventError || !event || event.host_id !== userId) {
      return jsonResponse({ message: 'Not authorized for this album' }, { status: 403 });
    }

    // Find the active share link for this album
    const { data: shareLink, error: shareLinkError } = await admin
      .from('share_links')
      .select('id, token, password_hash')
      .eq('album_id', album.id)
      .is('revoked_at', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (shareLinkError || !shareLink) {
      return jsonResponse(
        { message: 'No active share link found. Generate a share link first.' },
        { status: 400 },
      );
    }

    // Verify password matches the share link
    const expectedHash = hashValue(password, process.env.EVENT_CAM_TOKEN_SALT || 'event-cam');
    if (shareLink.password_hash !== expectedHash) {
      return jsonResponse({ message: 'Password does not match the active share link' }, { status: 400 });
    }

    // Count approved media items in this album
    const { count } = await admin
      .from('album_items')
      .select('media_item_id', { count: 'exact', head: true })
      .eq('album_id', album.id);

    const linkBase = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const shareUrl = `${linkBase}/albums/${album.id}/public?share=${shareLink.token}&password=${encodeURIComponent(password)}`;

    const { error: emailError } = await sendAlbumDeliveryEmail({
      to,
      eventName: event.name,
      albumTitle: album.title,
      shareUrl,
      password,
      photoCount: count ?? 0,
    });

    if (emailError) {
      return jsonResponse({ message: 'Failed to send email. Check your Resend configuration.' }, { status: 502 });
    }

    await recordEventMetric({
      eventId: album.event_id,
      action: 'album_email_sent',
      actor: 'host',
      actorId: userId,
      targetType: 'album',
      targetId: album.id,
      metadata: { to, photoCount: count ?? 0 },
    });

    return jsonResponse({ message: 'Album email sent', to });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to send album email' }, { status: 500 });
  }
}
