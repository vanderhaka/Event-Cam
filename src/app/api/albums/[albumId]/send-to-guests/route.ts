import { ApiError, jsonResponse, parseJsonBody } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { requireHostUser } from '@/lib/auth';
import { hashValue } from '@/lib/utils';
import { buildUnsubscribeUrl, sendAlbumDeliveryEmail } from '@/lib/email';
import { recordEventMetric } from '@/lib/event-metrics';

type GuestContactRow = {
  id: string;
  email: string;
  marketing_consent: boolean;
  unsubscribed_at: string | null;
};

type SendHistoryRow = {
  recipient_email: string;
};

export type SendToGuestsResult = {
  sentCount: number;
  alreadySentCount: number;
  unsubscribedCount: number;
  failedCount: number;
  message: string;
};

type SendToGuestsParams = {
  admin: ReturnType<typeof createSupabaseAdminClient>;
  userId: string;
  albumId: string;
  password: string;
};

function normalizeEmail(rawEmail: unknown) {
  if (typeof rawEmail !== 'string') {
    return '';
  }
  return rawEmail.trim().toLowerCase();
}

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function sendAlbumToGuests(params: SendToGuestsParams): Promise<SendToGuestsResult> {
  const { admin, userId, albumId, password } = params;

  if (!password) {
    throw new ApiError('Share password is required', 400);
  }
  if (password.length < 4) {
    throw new ApiError('Password must be at least 4 characters', 400);
  }

  const { data: album, error: albumError } = await admin
    .from('albums')
    .select('id, title, event_id')
    .eq('id', albumId)
    .single();

  if (albumError || !album) {
    throw new ApiError('Album not found', 404);
  }

  const { data: event, error: eventError } = await admin
    .from('events')
    .select('host_id, name')
    .eq('id', album.event_id)
    .single();

  if (eventError || !event) {
    throw new ApiError('Unable to validate album host', 400);
  }

  if (event.host_id !== userId) {
    throw new ApiError('Not authorized for this album', 403);
  }

  const { data: shareLink, error: shareLinkError } = await admin
    .from('share_links')
    .select('id, token, password_hash')
    .eq('album_id', album.id)
    .is('revoked_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (shareLinkError || !shareLink) {
    throw new ApiError('No active share link found. Generate a share link first.', 400);
  }

  const expectedHash = hashValue(password, process.env.EVENT_CAM_TOKEN_SALT || 'event-cam');
  if (shareLink.password_hash !== expectedHash) {
    throw new ApiError('Password does not match the active share link', 400);
  }

  const { data: contacts, error: contactsError } = await admin
    .from('guest_contacts')
    .select('id, email, marketing_consent, unsubscribed_at')
    .eq('event_id', album.event_id);

  if (contactsError) {
    throw new ApiError('Unable to load guest contacts', 500);
  }

  const normalizedContacts = (contacts ?? [])
    .map((contact) => ({
      ...contact,
      email: normalizeEmail((contact as GuestContactRow).email),
    }))
    .filter((contact: GuestContactRow & { email: string }) => contact.email.length > 0 && isEmailValid(contact.email));

  const marketingContacts = normalizedContacts.filter((contact) => contact.marketing_consent && contact.unsubscribed_at === null);
  const unsubscribedCount = normalizedContacts.filter((contact) => contact.marketing_consent && contact.unsubscribed_at).length;

  const { data: sendHistory, error: sendHistoryError } = await admin
    .from('email_sends')
    .select('recipient_email')
    .eq('album_id', album.id)
    .eq('email_type', 'album_delivery');

  if (sendHistoryError) {
    throw new ApiError('Unable to load send history', 500);
  }

  const alreadySentEmails = new Set<string>((sendHistory ?? []).map((row: SendHistoryRow) => normalizeEmail(row.recipient_email)));

  const alreadySentCount = marketingContacts.filter((contact) => alreadySentEmails.has(contact.email)).length;
  const eligibleContacts = marketingContacts.filter((contact) => !alreadySentEmails.has(contact.email));

  if (marketingContacts.length === 0) {
    return {
      sentCount: 0,
      alreadySentCount: 0,
      unsubscribedCount: 0,
      failedCount: 0,
      message: 'No consenting, subscribed contacts found.',
    };
  }

  if (eligibleContacts.length === 0) {
    return {
      sentCount: 0,
      alreadySentCount,
      unsubscribedCount,
      failedCount: 0,
      message: 'All contacts already received this album.',
    };
  }

  const { count: photoCount } = await admin
    .from('album_items')
    .select('media_item_id', { count: 'exact', head: true })
    .eq('album_id', album.id);

  const linkBase = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const shareUrl = `${linkBase}/albums/${album.id}/public?share=${shareLink.token}&password=${encodeURIComponent(password)}`;

  const failures: Array<{ email: string; reason: string }> = [];
  const successfullySent: Array<{
    event_id: string;
    album_id: string;
    recipient_email: string;
    email_type: string;
    resend_id: string | null;
    status: string;
  }> = [];

  for (const contact of eligibleContacts as Array<GuestContactRow & { email: string }>) {
    const unsubscribeUrl = buildUnsubscribeUrl(contact.id, album.event_id);
    const { error: emailError, data: emailData } = await sendAlbumDeliveryEmail({
      to: contact.email,
      eventName: event.name,
      albumTitle: album.title,
      shareUrl,
      password,
      photoCount: photoCount ?? 0,
      unsubscribeUrl,
    });

    if (emailError) {
      failures.push({ email: contact.email, reason: emailError?.message || 'Unable to send email' });
      continue;
    }

    successfullySent.push({
      event_id: album.event_id,
      album_id: album.id,
      recipient_email: contact.email,
      email_type: 'album_delivery',
      resend_id: emailData?.id ?? null,
      status: 'sent',
    });
  }

  if (successfullySent.length > 0) {
    const { error: historyError } = await admin.from('email_sends').insert(successfullySent);
    if (historyError) {
      console.error('[send-to-guests] Failed to record email sends', historyError.message);
    }
  }

  await recordEventMetric({
    eventId: album.event_id,
    action: 'album_email_sent',
    actor: 'host',
    actorId: userId,
    targetType: 'album',
    targetId: album.id,
    metadata: {
      sentCount: successfullySent.length,
      alreadySentCount,
      unsubscribedCount,
      failedCount: failures.length,
      recipients: eligibleContacts.length,
    },
  });

  return {
    sentCount: successfullySent.length,
    alreadySentCount,
    unsubscribedCount,
    failedCount: failures.length,
    message:
      failures.length > 0
        ? `${successfullySent.length} sent. ${failures.length} failed.`
        : `${successfullySent.length} sent successfully.`,
  };
}

export async function POST(request: Request, context: { params: { albumId: string } }) {
  try {
    const { userId } = await requireHostUser();
    const admin = createSupabaseAdminClient();
    const body = await parseJsonBody(request);
    const password = String(body.password ?? '').trim();
    const result = await sendAlbumToGuests({
      admin,
      userId,
      albumId: context.params.albumId,
      password,
    });

    return jsonResponse(result);
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to send album to all guests' }, { status: 500 });
  }
}
