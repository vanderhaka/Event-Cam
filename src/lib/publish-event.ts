import type { SupabaseClient } from '@supabase/supabase-js';
import { randomToken } from '@/lib/utils';

export type PublishResult = { issued: { inviteeId: string; qrToken: string; qrUrl: string }[] };

/**
 * Issues QR codes for an event's invitees and marks the event as published.
 * Caller must ensure the event is paid (or allow-unpaid is set).
 */
export async function publishEventQrCodes(
  admin: SupabaseClient,
  eventId: string,
  options?: { requirePaid?: boolean; userId?: string }
): Promise<PublishResult> {
  const requirePaid = options?.requirePaid ?? true;
  const userId = options?.userId;

  const { data: event, error: eventError } = await admin
    .from('events')
    .select('id, host_id, event_type')
    .eq('id', eventId)
    .single();

  if (eventError || !event) {
    throw new Error('Event not found');
  }

  if (requirePaid && Number(process.env.EVENT_CAM_ALLOW_UNPAID ?? '0') !== 1) {
    const { data: paidRecord } = await admin
      .from('billing_records')
      .select('id')
      .eq('event_id', eventId)
      .eq('status', 'paid')
      .maybeSingle();
    if (!paidRecord) {
      throw new Error('Event is not paid');
    }
  }

  const { data: allInvitees, error: inviteeError } = await admin
    .from('invitees')
    .select('id, display_name, qr_token, is_active')
    .eq('event_id', eventId);

  if (inviteeError) throw new Error(inviteeError.message);

  const isOpenEvent = event.event_type === 'open';
  let invitees = (allInvitees ?? []).filter((inv) => inv.is_active);
  const hostId = userId ?? event.host_id;

  if (isOpenEvent && (!allInvitees || allInvitees.length === 0)) {
    const openEventToken = randomToken();
    const { data: newInvitee, error: insertError } = await admin
      .from('invitees')
      .insert({
        event_id: eventId,
        display_name: 'Event guests',
        qr_token: openEventToken,
        qr_state: 'issued',
        is_active: true,
        created_by_host: hostId,
      })
      .select('id, display_name, qr_token, is_active')
      .single();

    if (insertError || !newInvitee) throw new Error(insertError?.message ?? 'Failed to create open event invitee');
    invitees = [newInvitee];
  } else if (!allInvitees || allInvitees.length === 0) {
    throw new Error('NO_INVITEES');
  } else if (invitees.length === 0) {
    throw new Error('NO_ACTIVE_INVITEES');
  }

  const updates = invitees.map((inv) => ({
    id: inv.id,
    event_id: eventId,
    display_name: inv.display_name,
    qr_token: inv.qr_token || randomToken(),
    qr_state: 'issued' as const,
  }));

  const { error: updateError } = await admin.from('invitees').upsert(updates, { onConflict: 'id' });
  if (updateError) throw new Error(updateError.message);

  await admin.from('events').update({ is_published: true, status: 'published' }).eq('id', eventId);

  const qrBase = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const issued = updates.map((inv) => ({
    inviteeId: inv.id,
    qrToken: inv.qr_token,
    qrUrl: `${qrBase}/scan/${inv.qr_token}`,
  }));

  return { issued };
}
