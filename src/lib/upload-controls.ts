import { hashValue } from '@/lib/utils';

export type UploadMediaType = 'image' | 'video';

type UploadMediaKind = 'image' | 'video';

const MAX_IMAGES_BYTES = 10 * 1024 * 1024;
const MAX_VIDEOS_BYTES = 40 * 1024 * 1024;
const MAX_VIDEO_SECONDS = 20;
const MAX_BURST_ATTEMPTS = 8;
const BURST_WINDOW_SECONDS = 30;
const MAX_UPLOADS_PER_INVITEE = 60;
const MAX_INVITEE_WINDOW_MINUTES = 60;
const MAX_MEDIA_PER_EVENT = 500;

export const ALLOWED_MIME_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'image/webp'],
  video: ['video/mp4', 'video/webm', 'video/quicktime'],
};

export function nowCanUpload(event: { start_at: string; end_at: string }) {
  const start = new Date(event.start_at).getTime();
  const end = new Date(event.end_at).getTime();
  const now = Date.now();
  return now >= start && now <= end;
}

export function parseUploadMediaType(fileType: string): UploadMediaKind | '' {
  if (!fileType) return '';
  if (fileType.startsWith('image/')) return 'image';
  if (fileType.startsWith('video/')) return 'video';
  return '';
}

export function isAllowedMime(mediaType: UploadMediaType | '', mime: string) {
  if (mediaType === 'image') return ALLOWED_MIME_TYPES.image.includes(mime);
  if (mediaType === 'video') return ALLOWED_MIME_TYPES.video.includes(mime);
  return false;
}

export function getMaxUploadBytes(mediaType: UploadMediaType) {
  return mediaType === 'video' ? MAX_VIDEOS_BYTES : MAX_IMAGES_BYTES;
}

export function getConfigLimits() {
  return {
    maxImagesBytes: MAX_IMAGES_BYTES,
    maxVideosBytes: MAX_VIDEOS_BYTES,
    maxVideoSeconds: MAX_VIDEO_SECONDS,
    maxBurstAttempts: MAX_BURST_ATTEMPTS,
    burstWindowSeconds: BURST_WINDOW_SECONDS,
    maxUploadsPerInvitee: MAX_UPLOADS_PER_INVITEE,
    uploadWindowMinutes: MAX_INVITEE_WINDOW_MINUTES,
    maxMediaPerEvent: MAX_MEDIA_PER_EVENT,
  };
}

export function getClientIpFromRequest(request: Request) {
  const directIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
  if (directIp) {
    return directIp.split(',')[0]?.trim() || null;
  }
  return null;
}

export function fingerprintInviteClient(request: Request, inviteeToken: string) {
  const ua = request.headers.get('user-agent') || 'unknown-agent';
  const ip = getClientIpFromRequest(request) || 'unknown-ip';
  const raw = `${ua}|${ip}|${inviteeToken.slice(0, 16)}|${request.headers.get('accept-language') || 'unknown-locale'}`;
  return hashValue(raw, process.env.EVENT_CAM_FINGERPRINT_SALT || 'event-cam');
}

export function normalizeAndHash(value: string | null) {
  if (!value) return null;
  return hashValue(value, process.env.EVENT_CAM_ANALYTICS_SALT || 'event-cam');
}
