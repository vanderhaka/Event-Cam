import { NextRequest } from 'next/server';
import { ApiError, jsonResponse } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { hashValue } from '@/lib/utils';

function nowCanUpload(event: { start_at: string; end_at: string }) {
  const start = new Date(event.start_at).getTime();
  const end = new Date(event.end_at).getTime();
  const now = Date.now();
  return now >= start && now <= end;
}

export async function GET(_: NextRequest, context: { params: { inviteToken: string } }) {
  try {
    const { inviteToken } = context.params;
    if (!inviteToken) {
      return jsonResponse({ message: 'Missing inviteToken' }, { status: 400 });
    }

    const admin = createSupabaseAdminClient();
    const normalizedToken = inviteeTokenKey(inviteToken);
    const altToken = stripQrNoise(normalizedToken);

    // eslint-disable-next-line no-console
    console.info('[invite lookup]', { tokenHint: normalizedToken.slice(0, 8), length: normalizedToken.length, altProvided: altToken !== normalizedToken });

    let query = admin.from('invitees').select('*');
    const tokenCandidates = Array.from(new Set([normalizedToken, altToken].filter((value): value is string => Boolean(value))));
    const { data: invitees, error } = await query.in('qr_token', tokenCandidates).order('updated_at', { ascending: false });

    if (error || !invitees || invitees.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('[invite lookup] token not found', {
        tokenHint: normalizedToken.slice(0, 8),
        candidates: tokenCandidates,
      });
      return jsonResponse({ message: 'Invalid or expired QR code', code: 'TOKEN_NOT_FOUND', candidates: tokenCandidates }, { status: 404 });
    }

    const invitee = invitees[0] as typeof invitees[0];
    if (!invitee) {
      return jsonResponse({ message: 'Invalid or expired QR code', code: 'TOKEN_NOT_FOUND' }, { status: 404 });
    }


    if (!invitee.is_active || invitee.qr_state !== 'issued') {
      // eslint-disable-next-line no-console
      console.warn('[invite lookup] token disabled', {
        tokenHint: normalizedToken.slice(0, 8),
        isActive: invitee.is_active,
        qrState: invitee.qr_state,
      });
      return jsonResponse({ message: 'This QR code is disabled', code: 'TOKEN_DISABLED' }, { status: 403 });
    }

    const { data: event, error: eventError } = await admin
      .from('events')
      .select('*')
      .eq('id', invitee.event_id)
      .single();

    if (eventError || !event) {
      return jsonResponse({ message: 'Event not found' }, { status: 404 });
    }

    if (!event.is_published || event.status !== 'published') {
      // eslint-disable-next-line no-console
      console.warn('[invite lookup] event not published', { eventId: event.id, isPublished: event.is_published, status: event.status });
      return jsonResponse({ message: 'Event is not published yet', code: 'EVENT_NOT_PUBLISHED' }, { status: 403 });
    }

    if (!nowCanUpload(event)) {
      // eslint-disable-next-line no-console
      console.warn('[invite lookup] event window closed', {
        eventId: event.id,
        startAt: event.start_at,
        endAt: event.end_at,
        now: new Date().toISOString(),
      });
      return jsonResponse(
        {
          message: 'Event upload window is closed',
          code: 'WINDOW_CLOSED',
          state: 'closed',
          event: { id: event.id, startAt: event.start_at, endAt: event.end_at },
        },
        { status: 403 },
      );
    }

    const { data: existingSession } = await admin
      .from('contributor_sessions')
      .select('*')
      .eq('invitee_id', invitee.id)
      .single();

    if (!existingSession) {
      const ip = 'unknown';
      await admin.from('contributor_sessions').insert({
        event_id: invitee.event_id,
        invitee_id: invitee.id,
        device_fingerprint: hashValue('default-device'),
        last_ip_hash: hashValue(ip),
      });
    }

    return jsonResponse({
      event: {
        id: event.id,
        name: event.name,
        startAt: event.start_at,
        endAt: event.end_at,
      },
      invitee: {
        id: invitee.id,
        displayName: invitee.display_name,
        groupTag: invitee.group_tag,
      },
      consentRequired: true,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to resolve invite token' }, { status: 500 });
  }
}

function inviteeTokenKey(token: string) {
  const trimmed = token.trim();
  try {
    return decodeURIComponent(trimmed);
  } catch {
    return trimmed;
  }
}

function stripQrNoise(token: string) {
  return token
    .replace(/^["'`]+/, '')
    .replace(/["'`]+$/, '')
    .replace(/\\+$/, '')
    .replace(/\s+/g, '')
    .replace(/[^A-Za-z0-9_-]/g, '');
}
