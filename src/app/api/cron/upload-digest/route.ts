import { NextRequest } from 'next/server';
import { ApiError, jsonResponse } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { sendHostUploadDigestEmail } from '@/lib/email';

const DIGEST_FREQUENCY_OPTIONS = ['immediate', 'daily', 'off'] as const;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

type DigestFrequency = (typeof DIGEST_FREQUENCY_OPTIONS)[number];

type CronEvent = {
  id: string;
  name: string;
  host_id: string;
};

type EmailSetting = {
  event_id: string;
  host_upload_digest: boolean;
  digest_frequency: string;
  reply_to: string | null;
};

type JobResult = {
  eventId: string;
  status: 'sent' | 'skipped' | 'failed';
  reason: string;
  photoCount?: number;
};

function toDigestFrequency(raw: string | null) {
  return DIGEST_FREQUENCY_OPTIONS.find((value) => value === raw);
}

function isAuthorizedRequest(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;

  const headerAuth = request.headers.get('authorization');
  if (headerAuth === `Bearer ${secret}`) return true;

  // Vercel Cron sets the x-vercel-cron header and does not provide a custom auth token.
  const cronHeader = request.headers.get('x-vercel-cron');
  return cronHeader === '1';
}

function formatEmailSettingsRow(raw: EmailSetting) {
  const frequency = toDigestFrequency(raw.digest_frequency) || 'daily';
  return {
    host_upload_digest: Boolean(raw.host_upload_digest),
    digest_frequency: frequency,
    reply_to: raw.reply_to || null,
  };
}

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  if (!isAuthorizedRequest(request)) {
    return jsonResponse({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const admin = createSupabaseAdminClient();
    const requestUrl = new URL(request.url);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin;
    const now = Date.now();
    const minLookback = new Date(now - ONE_DAY_MS).toISOString();

    const { data: allEvents, error: eventError } = await admin
      .from('events')
      .select('id, name, host_id')
      .order('created_at', { ascending: false });

    if (eventError) {
      return jsonResponse({ message: eventError.message }, { status: 400 });
    }

    const events = allEvents ?? [];
    if (events.length === 0) {
      return jsonResponse({ message: 'No events found', processed: 0, sent: 0, skipped: 0, failed: 0, jobs: [] });
    }

    const { data: settingsRows, error: settingsError } = await admin
      .from('email_settings')
      .select('event_id, host_upload_digest, digest_frequency, reply_to')
      .in('event_id', events.map((event) => event.id));

    if (settingsError) {
      return jsonResponse({ message: settingsError.message }, { status: 400 });
    }

    const eventSettingById = new Map((settingsRows ?? []).map((row) => [row.event_id, formatEmailSettingsRow(row)]));
    const candidateEvents = events.filter((event) => {
      const settings = eventSettingById.get(event.id) || {
        host_upload_digest: true,
        digest_frequency: 'daily' as DigestFrequency,
        reply_to: null,
      };
      return settings.host_upload_digest && settings.digest_frequency !== 'off';
    });

    if (candidateEvents.length === 0) {
      return jsonResponse({ message: 'No events eligible for digest', processed: 0, sent: 0, skipped: 0, failed: 0, jobs: [] });
    }

    const { data: sendHistory, error: sendHistoryError } = await admin
      .from('email_sends')
      .select('event_id, created_at')
      .in('event_id', candidateEvents.map((event) => event.id))
      .eq('email_type', 'host_upload_digest')
      .order('created_at', { ascending: false });

    if (sendHistoryError) {
      return jsonResponse({ message: sendHistoryError.message }, { status: 400 });
    }

    const lastDigestByEvent = new Map<string, string>();
    (sendHistory ?? []).forEach((row) => {
      if (!lastDigestByEvent.has(row.event_id)) {
        lastDigestByEvent.set(row.event_id, row.created_at);
      }
    });

    const jobs: JobResult[] = [];
    let sentCount = 0;
    let skippedCount = 0;
    let failedCount = 0;

    for (const event of candidateEvents as CronEvent[]) {
      const settings = eventSettingById.get(event.id) || {
        host_upload_digest: true,
        digest_frequency: 'daily' as DigestFrequency,
        reply_to: null,
      };

      const lastDigest = lastDigestByEvent.get(event.id);
      let lookbackIso: string | null = null;

      if (settings.digest_frequency === 'daily') {
        if (lastDigest) {
          const lastSent = new Date(lastDigest).getTime();
          if (lastSent + ONE_DAY_MS > now) {
            jobs.push({ eventId: event.id, status: 'skipped', reason: 'daily frequency cooldown active' });
            skippedCount += 1;
            continue;
          }
          lookbackIso = lastDigest;
        } else {
          lookbackIso = minLookback;
        }
      } else if (lastDigest) {
        lookbackIso = lastDigest;
      } else {
        lookbackIso = minLookback;
      }

      let mediaQuery = admin
        .from('media_items')
        .select('id', { count: 'exact', head: true })
        .eq('event_id', event.id);

      if (lookbackIso) {
        mediaQuery = mediaQuery.gt('created_at', lookbackIso);
      }

      const { count, error: countError } = await mediaQuery;
      if (countError) {
        jobs.push({ eventId: event.id, status: 'failed', reason: `Could not count media: ${countError.message}` });
        failedCount += 1;
        continue;
      }

      const photoCount = count ?? 0;
      if (photoCount <= 0) {
        jobs.push({
          eventId: event.id,
          status: 'skipped',
          reason: settings.digest_frequency === 'immediate' ? 'No new uploads' : 'No uploads in digest window',
        });
        skippedCount += 1;
        continue;
      }

      let previewRowsQuery = admin
        .from('media_items')
        .select('original_name')
        .eq('event_id', event.id)
        .order('created_at', { ascending: false })
        .limit(5);
      if (lookbackIso) {
        previewRowsQuery = previewRowsQuery.gt('created_at', lookbackIso);
      }
      const { data: previewRows, error: previewError } = await previewRowsQuery;
      if (previewError) {
        jobs.push({
          eventId: event.id,
          status: 'failed',
          reason: `Could not load preview media: ${previewError.message}`,
          photoCount,
        });
        failedCount += 1;
        continue;
      }

      const hostEmailResult = await admin.auth.admin.getUserById(event.host_id);
      const hostEmail = hostEmailResult.data?.user?.email;
      if (!hostEmail || hostEmailResult.error) {
        const reason = hostEmailResult.error
          ? `Could not load host account: ${hostEmailResult.error.message}`
          : 'Host email not available';
        jobs.push({ eventId: event.id, status: 'failed', reason, photoCount });
        failedCount += 1;
        continue;
      }

      const moderationUrl = `${appUrl}/dashboard/events/${event.id}`;

      try {
        const email = await sendHostUploadDigestEmail({
          to: hostEmail,
          eventName: event.name,
          photoCount,
          moderationUrl,
          recentPhotoNames: previewRows?.map((row) => row.original_name || 'upload').filter(Boolean),
          replyTo: settings.reply_to,
        });

        await admin.from('email_sends').insert({
          event_id: event.id,
          album_id: null,
          recipient_email: hostEmail,
          email_type: 'host_upload_digest',
          resend_id: email?.data?.id || null,
        });

        jobs.push({ eventId: event.id, status: 'sent', reason: 'Digest sent', photoCount });
        sentCount += 1;
      } catch (error) {
        jobs.push({
          eventId: event.id,
          status: 'failed',
          reason: error instanceof Error ? error.message : 'Unknown email failure',
          photoCount,
        });
        failedCount += 1;
      }
    }

    return jsonResponse({
      processed: candidateEvents.length,
      sent: sentCount,
      skipped: skippedCount,
      failed: failedCount,
      jobs,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to run upload digest job' }, { status: 500 });
  }
}
