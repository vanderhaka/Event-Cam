import { ApiError, jsonResponse } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { publishEventQrCodes } from '@/lib/publish-event';
import { sendHostEventPublishedEmail } from '@/lib/email';

export async function POST(request: Request, context: { params: { eventId: string } }) {
  try {
    const { user, userId } = await requireHostUser();
    const event = await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();

    const result = await publishEventQrCodes(admin, context.params.eventId, {
      requirePaid: true,
      userId,
    });

    if (user?.email) {
      const requestUrl = new URL(request.url);
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? requestUrl.origin;
      const dashboardUrl = `${appUrl}/dashboard/events/${context.params.eventId}`;
      const qrPreviewUrl = result.issued[0]?.qrUrl ?? dashboardUrl;
      const eventDate = event.start_at ? new Date(event.start_at).toISOString() : 'TBD';

      try {
        const hostNotificationResult = await sendHostEventPublishedEmail({
          to: user.email,
          eventName: event.name,
          eventDate,
          guestCount: result.issued.length,
          dashboardUrl,
          qrPreviewUrl,
        });

        await admin
          .from('email_sends')
          .insert({
            event_id: event.id,
            recipient_email: user.email,
            email_type: 'host_event_published',
            resend_id: hostNotificationResult?.data?.id ?? null,
          })
          .then(({ error }) => {
            if (error) {
              console.error('[publish] failed to log host publish notification send', error.message);
            }
          });
      } catch (sendError) {
        console.error('[publish] failed to send host publish notification', sendError);
      }
    } else {
      console.warn('[publish] host publish notification skipped, no host email on account');
    }

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
