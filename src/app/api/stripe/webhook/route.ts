import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { getStripeClient } from '@/lib/stripe';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { publishEventQrCodes } from '@/lib/publish-event';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const json = (message: string, status = 200) =>
    new Response(JSON.stringify({ message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return json('Missing webhook secret', 500);
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const stripe = getStripeClient();
  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(body, sig || '', webhookSecret);
  } catch (error) {
    return json('Invalid webhook signature', 400);
  }

  const admin = createSupabaseAdminClient();

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;
    const eventId = session.metadata?.event_id;
    const checkoutSession = session.id;

    if (eventId && checkoutSession) {
      const billingUpdate = await admin
        .from('billing_records')
        .update({ status: 'paid', invoice_ref: session.invoice as string })
        .eq('event_id', eventId)
        .eq('checkout_session', checkoutSession);

      if (billingUpdate.error) {
        console.error('[stripe webhook] failed to mark billing record as paid', billingUpdate.error);
        return json('Failed to update billing status', 500);
      }

      const eventUpdate = await admin.from('events').update({ status: 'paid' }).eq('id', eventId);
      if (eventUpdate.error) {
        console.error('[stripe webhook] failed to mark event as paid', eventUpdate.error);
        return json('Failed to mark event as paid', 500);
      }

      try {
        await publishEventQrCodes(admin, eventId, { requirePaid: false });
      } catch (err) {
        console.error('[stripe webhook] auto-publish failed for event', eventId, err);
        return json('Failed to publish event QR codes', 500);
      }
    }
  }

  if (stripeEvent.type === 'checkout.session.expired') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;
    const eventId = session.metadata?.event_id;
    const checkoutSession = session.id;

    if (eventId && checkoutSession) {
      const billingUpdate = await admin
        .from('billing_records')
        .update({ status: 'failed' })
        .eq('event_id', eventId)
        .eq('checkout_session', checkoutSession);

      if (billingUpdate.error) {
        console.error('[stripe webhook] failed to mark billing record as failed', billingUpdate.error);
        return json('Failed to update billing status', 500);
      }

      const eventUpdate = await admin.from('events').update({ status: 'draft' }).eq('id', eventId);
      if (eventUpdate.error) {
        console.error('[stripe webhook] failed to revert event status', eventUpdate.error);
        return json('Failed to revert event status', 500);
      }
    }
  }

  return json('Webhook processed');
}
