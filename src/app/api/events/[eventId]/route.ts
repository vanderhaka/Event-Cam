import { NextRequest } from 'next/server';
import { ApiError, jsonResponse, parseJsonBody } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { getEventForHost, requireHostUser } from '@/lib/auth';

const DEFAULT_EMAIL_SETTINGS = {
  album_auto_send: false,
  host_upload_digest: true,
  digest_frequency: 'daily' as const,
};

function toBooleanValue(value: unknown) {
  return typeof value === 'boolean' ? value : undefined;
}

function toDigestFrequency(value: unknown): 'immediate' | 'daily' | 'off' | undefined {
  if (value === 'immediate' || value === 'daily' || value === 'off') return value;
  return undefined;
}

function isValidEmail(value: unknown) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeEmail(value: unknown) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

async function readEmailSettings(admin: ReturnType<typeof createSupabaseAdminClient>, eventId: string, defaultReplyTo: string | null) {
  const { data: settings, error } = await admin
    .from('email_settings')
    .select('album_auto_send, host_upload_digest, digest_frequency, reply_to')
    .eq('event_id', eventId)
    .maybeSingle();

  if (error) {
    throw new ApiError('Unable to load email settings', 400);
  }

  const replyTo = normalizeEmail(settings?.reply_to ?? defaultReplyTo);

  return {
    album_auto_send: Boolean(settings?.album_auto_send ?? DEFAULT_EMAIL_SETTINGS.album_auto_send),
    host_upload_digest: Boolean(settings?.host_upload_digest ?? DEFAULT_EMAIL_SETTINGS.host_upload_digest),
    digest_frequency: toDigestFrequency(settings?.digest_frequency) || DEFAULT_EMAIL_SETTINGS.digest_frequency,
    reply_to: replyTo || null,
  };
}

async function readEvent(eventId: string, userId: string, defaultReplyTo: string | null) {
  const admin = createSupabaseAdminClient();
  const event = await getEventForHost(eventId, userId);
  const emailSettings = await readEmailSettings(admin, eventId, defaultReplyTo);

  const { data: invitees, error: inviteeError } = await admin
    .from('invitees')
    .select('id, display_name, email, phone_e164, group_tag, qr_state, qr_token, is_active, created_at')
    .eq('event_id', eventId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (inviteeError) {
    throw new ApiError('Unable to fetch invitees', 400);
  }

  const { data: albums } = await admin
    .from('albums')
    .select('id, title, created_at')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });

  const { count: inviteCount, error: inviteCountError } = await admin
    .from('invitees')
    .select('id', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('is_active', true);

  if (inviteCountError) {
    throw new ApiError('Unable to count invitees', 400);
  }

  const { count: approvedCount, error: approvedCountError } = await admin
    .from('media_items')
    .select('id', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('moderation_state', 'approved');

  if (approvedCountError) {
    throw new ApiError('Unable to count approved media', 400);
  }

  const { count: guestContactCount, error: guestContactCountError } = await admin
    .from('guest_contacts')
    .select('id', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('marketing_consent', true)
    .is('unsubscribed_at', null);

  if (guestContactCountError) {
    throw new ApiError('Unable to count guest contacts', 400);
  }

  return {
    event,
    invitees: invitees ?? [],
    albums: albums ?? [],
    counts: {
      invitees: inviteCount ?? 0,
      approved_media: approvedCount ?? 0,
      guest_contacts: {
        optIn: guestContactCount ?? 0,
      },
    },
    email_settings: emailSettings,
  };
}

export async function GET(_: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId, user } = await requireHostUser();
    const payload = await readEvent(context.params.eventId, userId, user.email ?? null);
    return jsonResponse(payload);
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to load event' }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId, user } = await requireHostUser();
    const event = await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();
    const body = await parseJsonBody(request);

    const settingsToUpdate: {
      album_auto_send?: boolean;
      host_upload_digest?: boolean;
      digest_frequency?: 'immediate' | 'daily' | 'off';
      reply_to?: string | null;
      updated_at: string;
      event_id: string;
    } = {
      event_id: event.id,
      updated_at: new Date().toISOString(),
    };

    if (body.album_auto_send !== undefined) {
      const value = toBooleanValue(body.album_auto_send);
      if (value === undefined) {
        return jsonResponse({ message: 'album_auto_send must be a boolean' }, { status: 400 });
      }
      settingsToUpdate.album_auto_send = value;
    }

    if (body.host_upload_digest !== undefined) {
      const value = toBooleanValue(body.host_upload_digest);
      if (value === undefined) {
        return jsonResponse({ message: 'host_upload_digest must be a boolean' }, { status: 400 });
      }
      settingsToUpdate.host_upload_digest = value;
    }

    if (body.digest_frequency !== undefined) {
      const value = toDigestFrequency(body.digest_frequency);
      if (!value) {
        return jsonResponse({ message: 'digest_frequency must be immediate, daily, or off' }, { status: 400 });
      }
      settingsToUpdate.digest_frequency = value;
    }

    if (body.reply_to !== undefined) {
      if (body.reply_to === null) {
        settingsToUpdate.reply_to = null;
      } else {
        const normalizedReplyTo = normalizeEmail(body.reply_to);
        if (!normalizedReplyTo) {
          settingsToUpdate.reply_to = null;
        } else if (!isValidEmail(normalizedReplyTo)) {
          return jsonResponse({ message: 'reply_to must be a valid email address' }, { status: 400 });
        } else {
          settingsToUpdate.reply_to = normalizedReplyTo;
        }
      }
    }

    if (
      !Object.prototype.hasOwnProperty.call(settingsToUpdate, 'album_auto_send') &&
      !Object.prototype.hasOwnProperty.call(settingsToUpdate, 'host_upload_digest') &&
      !Object.prototype.hasOwnProperty.call(settingsToUpdate, 'digest_frequency') &&
      !Object.prototype.hasOwnProperty.call(settingsToUpdate, 'reply_to')
    ) {
      return jsonResponse({ message: 'No settings provided' }, { status: 400 });
    }

    const { error } = await admin.from('email_settings').upsert(settingsToUpdate, {
      onConflict: 'event_id',
    });

    if (error) {
      return jsonResponse({ message: error.message }, { status: 400 });
    }

    const emailSettings = await readEmailSettings(admin, event.id, user.email ?? null);
    return jsonResponse({ email_settings: emailSettings });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to update email settings' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();
    const { error } = await admin.from('events').delete().eq('id', context.params.eventId).eq('host_id', userId);
    if (error) {
      console.error('[DELETE /api/events/:eventId]', error.message);
      return jsonResponse({ message: 'Failed to delete event' }, { status: 500 });
    }
    return jsonResponse({ deleted: true }, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to delete event' }, { status: 400 });
  }
}
