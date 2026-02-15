import { ApiError, jsonResponse } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { recordEventMetric } from '@/lib/event-metrics';

export async function POST(_: Request, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    const event = await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();

    const now = new Date().toISOString();
    const { error: eventError } = await admin
      .from('events')
      .update({ is_published: false, updated_at: now })
      .eq('id', event.id);

    if (eventError) {
      return jsonResponse({ message: eventError.message }, { status: 400 });
    }

    await admin.from('invitees').update({ qr_state: 'disabled', is_active: false, updated_at: now }).eq('event_id', event.id);

    await recordEventMetric({
      eventId: event.id,
      action: 'event_disabled',
      actor: 'host',
      actorId: userId,
      reason: 'uploads_disabled',
      metadata: { eventId: event.id },
    });

    return jsonResponse({ disabled: true, eventId: event.id });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to disable event' }, { status: 500 });
  }
}
