import { ApiError, jsonResponse } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { publishEventQrCodes } from '@/lib/publish-event';

export async function POST(_: Request, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();

    const result = await publishEventQrCodes(admin, context.params.eventId, {
      requirePaid: true,
      userId,
    });

    return jsonResponse(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to publish event';
    if (message === 'Event not found') {
      return jsonResponse({ message }, { status: 404 });
    }
    if (message === 'Event is not paid') {
      return jsonResponse({ message: 'Event is not paid and cannot be published' }, { status: 402 });
    }
    if (message === 'NO_INVITEES') {
      return jsonResponse({ message: 'No invitees on this event', code: 'NO_INVITEES' }, { status: 400 });
    }
    if (message === 'NO_ACTIVE_INVITEES') {
      return jsonResponse(
        {
          message: 'No active invitees on this event. Add invitees and keep them active before publishing.',
          code: 'NO_ACTIVE_INVITEES',
        },
        { status: 400 }
      );
    }
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: message }, { status: 400 });
  }
}
