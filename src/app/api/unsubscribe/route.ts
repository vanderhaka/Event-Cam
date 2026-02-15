import { jsonResponse } from '@/lib/http';
import { parseUnsubscribeToken } from '@/lib/email';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token');
  if (!token) {
    return jsonResponse({ message: 'Missing unsubscribe token' }, { status: 400 });
  }

  const payload = parseUnsubscribeToken(token);
  if (!payload) {
    return jsonResponse({ message: 'Invalid unsubscribe token' }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from('guest_contacts')
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq('id', payload.contactId)
    .eq('event_id', payload.eventId)
    .is('unsubscribed_at', null);

  if (error) {
    return jsonResponse({ message: 'Unable to process unsubscribe request' }, { status: 500 });
  }

  return jsonResponse({ message: 'You have been unsubscribed.' }, { status: 200 });
}
