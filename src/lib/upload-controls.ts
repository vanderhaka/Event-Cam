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
const DANGEROUS_FILE_EXTENSIONS = new Set([
  'exe',
  'bat',
  'cmd',
  'com',
  'cpl',
  'dll',
  'msc',
  'msi',
  'msp',
  'scr',
  'pif',
  'js',
  'jse',
  'ps1',
  'vbs',
  'vbe',
  'vbscript',
  'wsf',
  'wsh',
  'sh',
  'bash',
  'py',
  'jar',
  'php',
  'asp',
  'aspx',
  'jsp',
  'hta',
  'apk',
  'bin',
  'dmg',
  'iso',
  'run',
  'deb',
  'rpm',
  'elf',
]);

const MEDIA_EXTENSION_HINTS = new Set([
  'jpg',
  'jpeg',
  'jpe',
  'png',
  'webp',
  'heic',
  'heif',
  'tif',
  'tiff',
  'gif',
  'mp4',
  'mov',
  'm4v',
  'm4a',
  'quicktime',
  'webm',
]);

const CANONICAL_EXTENSION_MAP: Record<string, string> = {
  jpeg: 'jpg',
  jpe: 'jpg',
  tiff: 'tif',
  m4v: 'mp4',
  m4a: 'mp4',
  quicktime: 'mov',
};

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

function cleanFilename(raw: string) {
  return raw
    .normalize('NFKC')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\\+/g, '/')
    .replace(/^(?:\.\.\/|\.\/|\/)+/, '')
    .trim();
}

export function analyzeUploadFilename(fileName: string) {
  const clean = cleanFilename(fileName || 'upload.bin');
  let normalized = clean;

  for (let attempts = 0; attempts < 2; attempts += 1) {
    if (!/%[0-9a-fA-F]{2}/.test(normalized)) {
      break;
    }
    try {
      const decoded = decodeURIComponent(normalized);
      if (decoded === normalized) {
        break;
      }
      normalized = decoded;
    } catch {
      break;
    }
  }

  const pathOnly = normalized.split('/').filter(Boolean);
  const fileNameOnly = pathOnly.at(-1) || normalized;

  const lower = fileNameOnly.toLowerCase();
  const rawParts = lower.split('.').map((part) => part.trim()).filter(Boolean);
  const canonicalParts = rawParts
    .map((part) => part.replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)
    .map((part) => CANONICAL_EXTENSION_MAP[part] ?? part);

  const extension = canonicalParts.length > 0 ? canonicalParts.at(-1) : 'bin';
  const middleParts = canonicalParts.slice(0, -1);

  const hasPathTraversal =
    normalized.includes('..') || pathOnly.length > 1;
  const hasDangerousExtension = DANGEROUS_FILE_EXTENSIONS.has(extension);
  const hasSuspiciousMiddleExtension = middleParts.some(
    (part) =>
      DANGEROUS_FILE_EXTENSIONS.has(part) ||
      (MEDIA_EXTENSION_HINTS.has(part) &&
        part.length >= 2 &&
        part.length <= 5 &&
        /^[a-z]+$/.test(part)),
  );
  const hasDoubleEncoded = /%2e|%2f|%5c/i.test(normalized);
  const hasMultipleDots = rawParts.length > 1;

  const canonicalExtension = CANONICAL_EXTENSION_MAP[extension] ?? extension;

  return {
    sanitizedName: normalized,
    canonicalParts,
    extension,
    canonicalExtension,
    reasons: [
      hasPathTraversal ? 'path_traversal' : null,
      hasDangerousExtension ? 'dangerous_extension' : null,
      hasSuspiciousMiddleExtension ? 'double_extension' : null,
      hasMultipleDots && hasSuspiciousMiddleExtension ? 'nested_extension' : null,
      hasDoubleEncoded ? 'double_encoded_extension' : null,
    ].filter(Boolean) as string[],
    isBlocked:
      hasPathTraversal || hasDangerousExtension || hasSuspiciousMiddleExtension || hasDoubleEncoded,
  };
}
