import { NextRequest } from 'next/server';
import { ApiError, jsonResponse } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { hashValue, normalizeInviteToken } from '@/lib/utils';
import { nowCanUpload, getClientIpFromRequest, fingerprintInviteClient } from '@/lib/upload-controls';
import { recordEventMetric } from '@/lib/event-metrics';

export async function GET(request: NextRequest, context: { params: { inviteToken: string } }) {
  try {
    const { inviteToken } = context.params;
    if (!inviteToken) {
      return jsonResponse({ message: 'Missing inviteToken' }, { status: 400 });
    }

    const admin = createSupabaseAdminClient();
    const normalizedToken = normalizeInviteToken(inviteToken);
    if (!normalizedToken) {
      return jsonResponse({ message: 'Invalid inviteToken' }, { status: 400 });
    }
    const tokenCandidates = [normalizedToken];

    // eslint-disable-next-line no-console
    console.info('[invite lookup]', {
      tokenHint: normalizedToken.slice(0, 8),
      length: normalizedToken.length,
      candidates: tokenCandidates,
    });

    const { data: invitees, error } = await admin
      .from('invitees')
      .select('*')
      .in('qr_token', tokenCandidates)
      .order('updated_at', { ascending: false });

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

    const clientIp = getClientIpFromRequest(request);
    const fingerprint = fingerprintInviteClient(request, invitee.qr_token);

    if (!existingSession) {
      const ip = clientIp || 'unknown';
      await admin.from('contributor_sessions').insert({
        event_id: invitee.event_id,
        invitee_id: invitee.id,
        device_fingerprint: fingerprint,
        last_ip_hash: hashValue(ip),
        is_active: true,
      });
    } else {
      await admin
        .from('contributor_sessions')
        .update({
          is_active: true,
          device_fingerprint: fingerprint,
          last_ip_hash: hashValue(clientIp || 'unknown'),
          last_seen_at: new Date().toISOString(),
        })
        .eq('event_id', invitee.event_id)
        .eq('invitee_id', invitee.id);
    }

    await recordEventMetric({
      eventId: event.id,
      action: 'scan_opened',
      actor: 'guest',
      request,
      actorId: null,
    });

    return jsonResponse({
      event: {
        id: event.id,
        name: event.name,
        startAt: event.start_at,
        endAt: event.end_at,
        eventType: event.event_type ?? 'invite_list',
      },
      eventId: event.id,
      shareToken: invitee.qr_token,
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
