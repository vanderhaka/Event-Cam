import { NextRequest } from 'next/server';
import { ApiError, jsonResponse } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

const CSV_HEADERS = ['id', 'email', 'display_name', 'marketing_consent', 'created_at', 'unsubscribed_at', 'emails_sent'];

type ContactRow = {
  id: string;
  email: string;
  display_name: string;
  marketing_consent: boolean;
  created_at: string | null;
  unsubscribed_at: string | null;
  emails_sent: number;
};

function toCsvCell(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  const text = typeof value === 'string' ? value : String(value);
  const escaped = text.replace(/"/g, '""');
  return `"${escaped}"`;
}

function toCsv(contacts: ContactRow[]) {
  const headerLine = CSV_HEADERS.map(toCsvCell).join(',');
  const rows = contacts.map((contact) => CSV_HEADERS.map((key) => toCsvCell(contact[key as keyof ContactRow])).join(','));
  return [headerLine, ...rows].join('\n');
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export async function GET(request: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    const event = await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();

    const { data: rawContacts, error: contactError } = await admin
      .from('guest_contacts')
      .select('id, invitee_id, email, marketing_consent, created_at, unsubscribed_at')
      .eq('event_id', event.id)
      .order('created_at', { ascending: false });

    if (contactError) {
      return jsonResponse({ message: contactError.message }, { status: 400 });
    }

    const contacts = rawContacts ?? [];
    const inviteeIds = Array.from(new Set(contacts.map((row) => row.invitee_id).filter(Boolean) as string[]));
    let displayNameByInvitee = new Map<string, string>();
    if (inviteeIds.length > 0) {
      const { data: invitees, error: inviteeError } = await admin.from('invitees').select('id, display_name').in('id', inviteeIds as string[]);
      if (inviteeError) {
        return jsonResponse({ message: inviteeError.message }, { status: 400 });
      }
      displayNameByInvitee = new Map((invitees ?? []).map((invitee) => [invitee.id, String(invitee.display_name || '')]));
    }

    const { data: sendRows, error: sendError } = await admin
      .from('email_sends')
      .select('recipient_email')
      .eq('event_id', event.id)
      .eq('email_type', 'album_delivery');
    if (sendError) {
      return jsonResponse({ message: sendError.message }, { status: 400 });
    }

    const emailsSentByAddress = new Map<string, number>();
    for (const row of sendRows ?? []) {
      const key = normalizeEmail(row.recipient_email || '');
      emailsSentByAddress.set(key, (emailsSentByAddress.get(key) || 0) + 1);
    }

    const payload = contacts.map<ContactRow>((contact) => {
      const email = normalizeEmail(contact.email);
      return {
        id: contact.id,
        email,
        display_name: contact.invitee_id ? displayNameByInvitee.get(contact.invitee_id) || '' : '',
        marketing_consent: Boolean(contact.marketing_consent),
        created_at: contact.created_at,
        unsubscribed_at: contact.unsubscribed_at,
        emails_sent: emailsSentByAddress.get(email) || 0,
      };
    });

    if (request.nextUrl.searchParams.get('format') === 'csv') {
      const csvBody = toCsv(payload);
      return new Response(csvBody, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="event-${event.id}-contacts.csv"`,
        },
      });
    }

    return jsonResponse({ contacts: payload });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to fetch contacts' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    const event = await getEventForHost(context.params.eventId, userId);

    const contactId = request.nextUrl.searchParams.get('contactId');
    if (!contactId) {
      return jsonResponse({ message: 'contactId is required' }, { status: 400 });
    }

    const admin = createSupabaseAdminClient();
    const { data: updatedRows, error: removeError } = await admin
      .from('guest_contacts')
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq('id', contactId)
      .eq('event_id', event.id)
      .select('id')
      .single();

    if (removeError) {
      return jsonResponse({ message: removeError.message }, { status: 400 });
    }
    if (!updatedRows) {
      return jsonResponse({ message: 'Contact not found' }, { status: 404 });
    }

    return jsonResponse({ updated: true, contactId: updatedRows.id });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to remove contact' }, { status: 500 });
  }
}
