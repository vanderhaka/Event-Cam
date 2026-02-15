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

export async function sendAlbumDeliveryEmail(params: {
  to: string;
  eventName: string;
  albumTitle: string;
  shareUrl: string;
  password: string;
  photoCount: number;
}) {
  const { to, eventName, albumTitle, shareUrl, password, photoCount } = params;

  return getResend().emails.send({
    from: fromAddress,
    to,
    subject: `Your ${eventName} photos are ready`,
    html: buildAlbumEmailHtml({ eventName, albumTitle, shareUrl, password, photoCount }),
  });
}

function buildAlbumEmailHtml(params: {
  eventName: string;
  albumTitle: string;
  shareUrl: string;
  password: string;
  photoCount: number;
}) {
  const { eventName, albumTitle, shareUrl, password, photoCount } = params;

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

</table>
</td></tr>
</table>
</body>
</html>`;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
