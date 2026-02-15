import { createHmac, timingSafeEqual } from 'crypto';
import { Resend } from 'resend';

let _resend: Resend | null = null;

function getResend() {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not configured');
    _resend = new Resend(key);
  }
  return _resend;
}

const fromAddress =
  process.env.RESEND_FROM_ADDRESS || 'Event Cam <noreply@eventcam.app>';

const UNSUBSCRIBE_TOKEN_VERSION = 'v1';
const unsubscribeSalt = process.env.EVENT_CAM_TOKEN_SALT || 'event-cam';
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type UnsubscribeTokenPayload = {
  v: string;
  c: string;
  e: string;
  t: number;
};

export async function sendAlbumDeliveryEmail(params: {
  to: string;
  eventName: string;
  albumTitle: string;
  shareUrl: string;
  password: string;
  photoCount: number;
  unsubscribeUrl?: string;
}) {
  const { to, eventName, albumTitle, shareUrl, password, photoCount, unsubscribeUrl } = params;

  return getResend().emails.send({
    from: fromAddress,
    to,
    subject: `Your ${eventName} photos are ready`,
    html: buildAlbumEmailHtml({ eventName, albumTitle, shareUrl, password, photoCount, unsubscribeUrl }),
  });
}

export async function sendHostEventPublishedEmail(params: {
  to: string;
  eventName: string;
  eventDate: string;
  guestCount: number;
  dashboardUrl: string;
  qrPreviewUrl: string;
}) {
  const { to, eventName, eventDate, guestCount, dashboardUrl, qrPreviewUrl } = params;

  return getResend().emails.send({
    from: fromAddress,
    to,
    subject: 'Your event is live — QR codes are ready',
    html: buildHostPublishedEmailHtml({
      eventName,
      eventDate,
      guestCount,
      dashboardUrl,
      qrPreviewUrl,
    }),
  });
}

export async function sendHostUploadDigestEmail(params: {
  to: string;
  eventName: string;
  photoCount: number;
  moderationUrl: string;
  recentPhotoNames?: string[];
  replyTo?: string | null;
}) {
  const { to, eventName, photoCount, moderationUrl, recentPhotoNames, replyTo } = params;

  return getResend().emails.send({
    from: fromAddress,
    to,
    subject: `${photoCount} new photo${photoCount === 1 ? '' : 's'} uploaded to ${eventName}`,
    ...(replyTo ? { reply_to: replyTo } : {}),
    html: buildHostUploadDigestEmailHtml({
      eventName,
      photoCount,
      moderationUrl,
      recentPhotoNames,
    }),
  });
}

function buildAlbumEmailHtml(params: {
  eventName: string;
  albumTitle: string;
  shareUrl: string;
  password: string;
  photoCount: number;
  unsubscribeUrl?: string;
}) {
  const { eventName, albumTitle, shareUrl, password, photoCount, unsubscribeUrl } = params;
  const unsubscribeBlock = unsubscribeUrl
    ? `<tr><td style="padding:0 32px 24px;font-size:12px;text-align:center;color:#52525b;">
        <a href="${escapeHtml(unsubscribeUrl)}" style="color:#4f46e5;text-decoration:underline;">Unsubscribe</a>
      </td></tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:12px;overflow:hidden;">

  <tr><td style="padding:40px 32px 24px;text-align:center;">
    <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#111;">Your photos are ready</h1>
    <p style="margin:0;font-size:15px;color:#71717a;">${escapeHtml(eventName)}</p>
  </td></tr>

  <tr><td style="padding:0 32px 24px;">
    <p style="margin:0 0 24px;font-size:15px;color:#3f3f46;line-height:1.5;">
      ${photoCount} photo${photoCount !== 1 ? 's' : ''} from <strong>${escapeHtml(albumTitle)}</strong> ${photoCount !== 1 ? 'are' : 'is'} waiting for you. View them, share them, or download them before the link expires.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <a href="${escapeHtml(shareUrl)}" style="display:inline-block;background:#2563eb;color:#ffffff;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
          View Album
        </a>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 32px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;border-radius:8px;">
      <tr><td style="padding:14px 18px;">
        <p style="margin:0;font-size:13px;color:#71717a;">Album password</p>
        <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#111;font-family:monospace;">${escapeHtml(password)}</p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:20px 32px;border-top:1px solid #e4e4e7;text-align:center;">
        <p style="margin:0;font-size:12px;color:#a1a1aa;">Sent via Event Cam</p>
  </td></tr>
  ${unsubscribeBlock}

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function buildUnsubscribeToken(contactId: string, eventId: string) {
  const payload: UnsubscribeTokenPayload = {
    v: UNSUBSCRIBE_TOKEN_VERSION,
    c: contactId,
    e: eventId,
    t: Date.now(),
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', unsubscribeSalt).update(encodedPayload).digest('base64url');
  return `${encodedPayload}.${signature}`;
}

export function parseUnsubscribeToken(token: string | null) {
  if (!token) return null;
  const [payloadPart, signaturePart] = token.split('.');
  if (!payloadPart || !signaturePart) {
    return null;
  }

  const expectedSignature = createHmac('sha256', unsubscribeSalt).update(payloadPart).digest('base64url');
  const providedSignature = Buffer.from(signaturePart, 'base64url');
  const expectedBuffer = Buffer.from(expectedSignature, 'base64url');
  if (providedSignature.length !== expectedBuffer.length) {
    return null;
  }
  if (!timingSafeEqual(providedSignature, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf8')) as UnsubscribeTokenPayload;
    if (payload.v !== UNSUBSCRIBE_TOKEN_VERSION || !uuidPattern.test(payload.c) || !uuidPattern.test(payload.e)) {
      return null;
    }
    return { contactId: payload.c, eventId: payload.e };
  } catch {
    return null;
  }
}

export function buildUnsubscribeUrl(contactId: string, eventId: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const token = buildUnsubscribeToken(contactId, eventId);
  return `${base}/unsubscribe?token=${encodeURIComponent(token)}`;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHostUploadDigestEmailHtml(params: {
  eventName: string;
  photoCount: number;
  moderationUrl: string;
  recentPhotoNames?: string[];
}) {
  const { eventName, photoCount, moderationUrl, recentPhotoNames } = params;
  const safeName = escapeHtml(eventName);
  const safeModerationUrl = escapeHtml(moderationUrl);
  const safePhotoCount = String(photoCount);

  const previewRows = (recentPhotoNames ?? [])
    .filter(Boolean)
    .slice(0, 5)
    .map((name) => `<li style="margin-bottom:8px;">${escapeHtml(name)}</li>`)
    .join('');

  const previewBlock = previewRows
    ? `<tr><td style="padding:0 32px 14px;"><p style="margin:0 0 8px;font-size:14px;color:#3f3f46;">Latest uploads:</p><ul style="margin:0 0 0 1.25rem;padding:0;color:#3f3f46;font-size:14px;line-height:1.5;">${previewRows}</ul></td></tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;">

  <tr><td style="padding:40px 32px 24px;text-align:center;">
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111;">${safePhotoCount} new photo${photoCount === 1 ? '' : 's'}</h1>
    <p style="margin:0;font-size:15px;color:#71717a;">were uploaded to <strong>${safeName}</strong></p>
  </td></tr>
  ${previewBlock}
  <tr><td style="padding:0 32px 26px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <a href="${safeModerationUrl}" style="display:inline-block;background:#0ea5e9;color:#ffffff;padding:14px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Open moderation queue</a>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:20px 32px;border-top:1px solid #e4e4e7;text-align:center;">
    <p style="margin:0;font-size:12px;color:#a1a1aa;">Sent via Event Cam</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildHostPublishedEmailHtml(params: {
  eventName: string;
  eventDate: string;
  guestCount: number;
  dashboardUrl: string;
  qrPreviewUrl: string;
}) {
  const { eventName, eventDate, guestCount, dashboardUrl, qrPreviewUrl } = params;
  const safeName = escapeHtml(eventName);
  const safeDate = escapeHtml(eventDate);
  const safeDashboard = escapeHtml(dashboardUrl);
  const safeQrPreview = escapeHtml(qrPreviewUrl);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;">

  <tr><td style="padding:40px 32px 24px;text-align:center;">
    <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#111;">Event published</h1>
    <p style="margin:0;font-size:15px;color:#71717a;">${safeName}</p>
  </td></tr>

  <tr><td style="padding:0 32px 24px;">
    <p style="margin:0 0 14px;font-size:15px;color:#3f3f46;line-height:1.5;">
      Your event is now live. ${escapeHtml(greetingGuestCount(guestCount))} Use the links below to open your dashboard and review your QR codes.
    </p>
    <p style="margin:0;font-size:14px;color:#3f3f46;line-height:1.5;">Event date: ${safeDate}</p>
    <p style="margin:18px 0 0;font-size:14px;color:#3f3f46;line-height:1.5;">
      First, we recommend printing or sharing your QR links at the event now that publishing is complete.
    </p>
  </td></tr>

  <tr><td style="padding:0 32px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding-bottom:12px">
        <a href="${safeDashboard}" style="display:block;text-align:center;background:#0ea5e9;color:#ffffff;padding:14px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
          Open Event Dashboard
        </a>
      </td></tr>
      <tr><td>
        <a href="${safeQrPreview}" style="display:block;text-align:center;background:#334155;color:#ffffff;padding:14px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
          View Event QR Preview
        </a>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:20px 32px;border-top:1px solid #e4e4e7;text-align:center;">
    <p style="margin:0;font-size:12px;color:#a1a1aa;">Sent via Event Cam</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function greetingGuestCount(guestCount: number) {
  return `${guestCount} guest${guestCount === 1 ? '' : 's'} now has access to upload.`;
}
