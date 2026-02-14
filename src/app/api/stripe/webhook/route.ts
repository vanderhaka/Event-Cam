import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { getStripeClient } from '@/lib/stripe';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { publishEventQrCodes } from '@/lib/publish-event';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response(JSON.stringify({ message: 'Missing webhook secret' }), { status: 500 });
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const stripe = getStripeClient();
  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(body, sig || '', webhookSecret);
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Invalid webhook signature' }), { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;
    const eventId = session.metadata?.event_id;
    const checkoutSession = session.id;

    if (eventId && checkoutSession) {
      await admin.from('billing_records').update({ status: 'paid', invoice_ref: session.invoice as string }).eq('event_id', eventId).eq('checkout_session', checkoutSession);
      await admin.from('events').update({ status: 'paid' }).eq('id', eventId);
      try {
        await publishEventQrCodes(admin, eventId, { requirePaid: false });
      } catch (err) {
        console.error('[stripe webhook] auto-publish failed for event', eventId, err);
      }
    }
  }

  if (stripeEvent.type === 'checkout.session.expired') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;
    const eventId = session.metadata?.event_id;
    const checkoutSession = session.id;

    if (eventId && checkoutSession) {
      await admin.from('billing_records').update({ status: 'failed' }).eq('event_id', eventId).eq('checkout_session', checkoutSession);
      await admin.from('events').update({ status: 'draft' }).eq('id', eventId);
    }
  }

  return new Response(JSON.stringify({ received: true }));
}
