import { createHash, randomBytes } from 'crypto';

export function randomToken(size = 24) {
  return randomBytes(size).toString('base64url');
}

export function hashValue(value: string, salt = '') {
  return createHash('sha256').update(`${value}:${salt}`).digest('hex');
}

export function isFutureExpired(dateValue?: string | null) {
  if (!dateValue) return false;
  return new Date(dateValue).getTime() < Date.now();
}

export function normalizeInviteToken(rawToken: string) {
  const trimmed = rawToken.trim();
  try {
    const decoded = decodeURIComponent(trimmed);
    return stripNoise(decoded);
  } catch {
    return stripNoise(trimmed);
  }
}

export function stripNoise(token: string) {
  return token
    .replace(/^['"`]+/, '')
    .replace(/['"`]+$/, '')
    .replace(/\\+$/, '')
    .replace(/\s+/g, '')
    .replace(/[^A-Za-z0-9_-]/g, '');
}

export function nowIso() {
  return new Date().toISOString();
}

export function normalizeWhitespace(raw: string) {
  return raw.trim().replace(/\s+/g, ' ');
}

export function toStringList(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter(Boolean);
  }

  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
  }

  return [];
}
