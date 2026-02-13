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
    const { data: invitee, error } = await admin
      .from('invitees')
      .select('*')
      .eq('qr_token', inviteeTokenKey(inviteToken))
      .single();

    if (error || !invitee) {
      return jsonResponse({ message: 'Invalid or expired QR code' }, { status: 404 });
    }

    if (!invitee.is_active || invitee.qr_state !== 'issued') {
      return jsonResponse({ message: 'This QR code is disabled' }, { status: 403 });
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
      return jsonResponse({ message: 'Event is not published yet' }, { status: 403 });
    }

    if (!nowCanUpload(event)) {
      return jsonResponse({ message: 'Event upload window is closed', state: 'closed' }, { status: 403 });
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
  return token.trim();
}
