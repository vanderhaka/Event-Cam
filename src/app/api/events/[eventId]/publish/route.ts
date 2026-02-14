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

    const { data: allInvitees, error: inviteeError } = await admin
      .from('invitees')
      .select('id, display_name, qr_token, is_active')
      .eq('event_id', event.id);

    if (inviteeError) {
      return jsonResponse({ message: inviteeError.message }, { status: 400 });
    }

    const isOpenEvent = event.event_type === 'open';
    let invitees = (allInvitees ?? []).filter((invitee) => invitee.is_active);

    if (isOpenEvent && (!allInvitees || allInvitees.length === 0)) {
      const openEventToken = randomToken();
      const { data: newInvitee, error: insertError } = await admin
        .from('invitees')
        .insert({
          event_id: event.id,
          display_name: 'Event guests',
          qr_token: openEventToken,
          qr_state: 'issued',
          is_active: true,
          created_by_host: userId,
        })
        .select('id, display_name, qr_token, is_active')
        .single();

      if (insertError || !newInvitee) {
        return jsonResponse({ message: insertError?.message ?? 'Failed to create open event invitee' }, { status: 400 });
      }
      invitees = [newInvitee];
    } else if (!allInvitees || allInvitees.length === 0) {
      return jsonResponse({ message: 'No invitees on this event', code: 'NO_INVITEES' }, { status: 400 });
    } else if (invitees.length === 0) {
      return jsonResponse(
        {
          message: 'No active invitees on this event. Add invitees and keep them active before publishing.',
          code: 'NO_ACTIVE_INVITEES',
          summary: {
            inviteeCount: allInvitees.length,
            activeInviteeCount: 0,
          },
        },
        { status: 400 },
      );
    }

    const updates = invitees.map((invitee) => ({
      id: invitee.id,
      event_id: event.id,
      display_name: invitee.display_name,
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
