import { NextRequest } from 'next/server';
import { ApiError, jsonResponse, parseJsonBody } from '@/lib/http';
import { getEventForHost, requireHostUser } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { getStripeClient } from '@/lib/stripe';

export async function POST(request: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    const event = await getEventForHost(context.params.eventId, userId);
    const body = await parseJsonBody(request);
    const allowUnpaid =
      Number(process.env.EVENT_CAM_ALLOW_UNPAID ?? '0') === 1 &&
      process.env.NODE_ENV !== 'production';

    const admin = createSupabaseAdminClient();
    const isOpenEvent = event.event_type === 'open';

    const {
      count: inviteCount,
      error: inviteCountError,
    } = await admin
      .from('invitees')
      .select('id', { count: 'exact', head: true })
      .eq('event_id', context.params.eventId)
      .eq('is_active', true);

    if (inviteCountError) {
      return jsonResponse({ message: inviteCountError.message }, { status: 400 });
    }

    const billableQuantity = isOpenEvent ? 1 : (inviteCount ?? 0);
    if (billableQuantity <= 0) {
      return jsonResponse({
        message: isOpenEvent
          ? 'Open events require checkout before publishing.'
          : 'Add at least one invitee before checkout.',
      }, { status: 400 });
    }

    const feePerInvite = Number(body.feePerInviteCents ?? event.fee_per_invite_cents ?? 0);
    const currency = String(body.currency ?? 'usd').toLowerCase();
    const lineItemAmount = Number.isFinite(feePerInvite) && feePerInvite > 0 ? feePerInvite : Number(process.env.EVENT_CAM_DEFAULT_FEE_CENTS ?? event.fee_per_invite_cents ?? 500);

    const origin = request.nextUrl.origin;

    if (allowUnpaid) {
      const checkoutSessionId = `dev-checkout-${Date.now()}`;
      const total = lineItemAmount * billableQuantity;

      const billingInsert = await admin.from('billing_records').insert({
        event_id: event.id,
        provider: 'stripe',
        checkout_session: checkoutSessionId,
        amount_cents: total,
        currency: currency.toUpperCase(),
        status: 'paid',
      });

      if (billingInsert.error) {
        return jsonResponse({ message: 'Unable to start checkout' }, { status: 500 });
      }

      const eventUpdate = await admin.from('events').update({ status: 'paid' }).eq('id', event.id);
      if (eventUpdate.error) {
        return jsonResponse({ message: 'Unable to start checkout' }, { status: 500 });
      }

      return jsonResponse({
        checkoutUrl: `${origin}/dashboard/events/${event.id}?checkout=dev_skip`,
        checkoutSessionId,
        invites: billableQuantity,
        total,
        skippedCheckout: true,
      });
    }

    const stripe = getStripeClient();

    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            unit_amount: lineItemAmount,
            product_data: {
              name: isOpenEvent
                ? `${event.name} - Open Event QR`
                : `${event.name} - Event Invite Access`,
            },
          },
          quantity: billableQuantity,
        },
      ],
      success_url: `${origin}/dashboard/events/${event.id}?checkout=success`,
      cancel_url: `${origin}/dashboard/events/${event.id}?checkout=cancel`,
      metadata: {
        event_id: event.id,
        scope: 'event_invite_checkout',
      },
    });

    if (!stripeSession.url || !stripeSession.id) {
      return jsonResponse({ message: 'Unable to create checkout session' }, { status: 400 });
    }

    const total = lineItemAmount * billableQuantity;
    await admin
      .from('billing_records')
      .upsert(
        {
          event_id: event.id,
          provider: 'stripe',
          checkout_session: stripeSession.id,
          amount_cents: total,
          currency: currency.toUpperCase(),
          status: 'pending',
        },
        { onConflict: 'checkout_session' }
      );

    await admin.from('events').update({ status: 'checkout_pending' }).eq('id', event.id);

    return jsonResponse({
      checkoutUrl: stripeSession.url,
      checkoutSessionId: stripeSession.id,
      invites: billableQuantity,
      total,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to start checkout' }, { status: 500 });
  }
}
