import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { normalizeAndHash } from '@/lib/upload-controls';

export type EventMetricAction =
  | 'scan_opened'
  | 'upload_click'
  | 'upload_success'
  | 'upload_failed'
  | 'gallery_open_success'
  | 'gallery_report_submit'
  | 'event_disabled'
  | 'media_deleted'
  | 'album_hidden'
  | 'email_capture'
  | 'album_email_sent';

export async function recordEventMetric(params: {
  eventId: string;
  action: EventMetricAction;
  actor?: 'guest' | 'host' | 'system';
  targetType?: string | null;
  targetId?: string | null;
  reason?: string | null;
  request?: Request;
  actorId?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const {
    eventId,
    action,
    actor = 'guest',
    actorId = null,
    targetType = null,
    targetId = null,
    reason = null,
    metadata = {},
    request,
  } = params;
  const admin = createSupabaseAdminClient();
  const ipAddress = request ? request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') : null;
  const ipHash = normalizeAndHash(ipAddress);
  const userAgent = request ? request.headers.get('user-agent') || null : null;

  await admin.from('event_action_logs').insert({
    event_id: eventId,
    action,
    actor,
    actor_id: actorId,
    target_type: targetType,
    target_id: targetId,
    reason,
    ip_hash: ipHash,
    user_agent: userAgent,
    metadata,
  });
}
