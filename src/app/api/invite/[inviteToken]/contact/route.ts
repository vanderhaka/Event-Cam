import { ApiError, jsonResponse } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { normalizeInviteToken } from '@/lib/utils';
import { recordEventMetric } from '@/lib/event-metrics';

function normalizeEmail(rawEmail: unknown) {
  if (typeof rawEmail !== 'string') {
    return '';
  }
  return rawEmail.trim().toLowerCase();
}

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request, context: { params: { inviteToken: string } }) {
  const { inviteToken } = context.params;
  if (!inviteToken) {
    return jsonResponse({ message: 'Missing inviteToken' }, { status: 400 });
  }

  const normalizedInviteToken = normalizeInviteToken(inviteToken);
  if (!normalizedInviteToken) {
    return jsonResponse({ message: 'Invalid inviteToken' }, { status: 400 });
  }

  let email = '';
  let marketingConsent = false;
  try {
    const payload = await request.json();
    email = normalizeEmail(payload?.email);
    marketingConsent = Boolean(payload?.marketingConsent);
  } catch {
    return jsonResponse({ message: 'Invalid request body' }, { status: 400 });
  }

  if (!email) {
    return jsonResponse({ message: 'Email is required for contact capture' }, { status: 400 });
  }
  if (!isEmailValid(email)) {
    return jsonResponse({ message: 'Invalid email format' }, { status: 400 });
  }
  if (!marketingConsent) {
    return jsonResponse({ message: 'Marketing consent is required to store email' }, { status: 400 });
  }

  try {
    const admin = createSupabaseAdminClient();
    const { data: invitee, error } = await admin
      .from('invitees')
      .select('*')
      .eq('qr_token', normalizedInviteToken)
      .single();

    if (error || !invitee) {
      return jsonResponse({ message: 'Invalid invite token' }, { status: 404 });
    }

    if (!invitee.is_active || invitee.qr_state !== 'issued') {
      return jsonResponse({ message: 'Invite token is disabled' }, { status: 403 });
    }

    const { error: contactError } = await admin
      .from('guest_contacts')
      .upsert({
        event_id: invitee.event_id,
        invitee_id: invitee.id,
        email,
        marketing_consent: marketingConsent,
      })
      .select('id')
      .single();

    if (contactError) {
      return jsonResponse({ message: 'Unable to store guest contact' }, { status: 500 });
    }

    await recordEventMetric({
      eventId: invitee.event_id,
      actor: 'guest',
      action: 'email_capture',
      targetType: 'invitee',
      targetId: invitee.id,
      reason: 'email_opt_in',
      metadata: {
        email,
        marketingConsent,
        tokenHint: invitee.qr_token.slice(0, 8),
      },
    });

    return jsonResponse({ message: 'Email captured' }, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to capture email' }, { status: 500 });
  }
}
