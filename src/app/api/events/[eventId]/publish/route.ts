import { ApiError, jsonResponse } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { randomToken } from '@/lib/utils';

export async function POST(_: Request, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    const event = await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();

    const { data: paidRecord } = await admin
      .from('billing_records')
      .select('id, status')
      .eq('event_id', event.id)
      .eq('status', 'paid')
      .maybeSingle();

    if (!paidRecord && Number(process.env.EVENT_CAM_ALLOW_UNPAID ?? '0') !== 1) {
      return jsonResponse({ message: 'Event is not paid and cannot be published' }, { status: 402 });
    }

    const { data: invitees, error: inviteeError } = await admin
      .from('invitees')
      .select('id, display_name, qr_token, is_active')
      .eq('event_id', event.id)
      .eq('is_active', true);

    if (inviteeError) {
      return jsonResponse({ message: inviteeError.message }, { status: 400 });
    }

    if (!invitees || invitees.length === 0) {
      return jsonResponse({ message: 'No active invitees on this event' }, { status: 400 });
    }

    const updates = invitees.map((invitee) => ({
      id: invitee.id,
      qr_token: invitee.qr_token || randomToken(),
      qr_state: 'issued',
    }));

    const { error: updateError } = await admin
      .from('invitees')
      .upsert(updates, { onConflict: 'id' });

    if (updateError) {
      return jsonResponse({ message: updateError.message }, { status: 400 });
    }

    await admin
      .from('events')
      .update({ is_published: true, status: 'published' })
      .eq('id', event.id);

    const qrBase = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const issued = updates.map((invitee) => ({
      inviteeId: invitee.id,
      qrToken: invitee.qr_token,
      qrUrl: `${qrBase}/scan/${invitee.qr_token}`,
    }));

    return jsonResponse({ issued });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to publish event' }, { status: 500 });
  }
}
