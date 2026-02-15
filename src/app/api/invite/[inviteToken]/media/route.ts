import { ApiError, jsonResponse } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { normalizeInviteToken, randomToken, hashValue } from '@/lib/utils';
import {
  nowCanUpload,
  getClientIpFromRequest,
  parseUploadMediaType,
  isAllowedMime,
  getMaxUploadBytes,
  getConfigLimits,
  fingerprintInviteClient,
  analyzeUploadFilename,
} from '@/lib/upload-controls';
import { recordEventMetric } from '@/lib/event-metrics';

type ScanJob = {
  eventId: string;
  mediaId: string;
  storagePath: string;
  fileHash: string;
  fileType: string;
  mediaType: 'image' | 'video';
  originalFileName: string;
};

function queueContentScanJob(scanJob: ScanJob) {
  if (process.env.EVENT_CAM_ENABLE_FILE_SCAN !== 'true') {
    return;
  }

  void (async () => {
    const scanWebhookUrl = process.env.EVENT_CAM_SCAN_WEBHOOK_URL;
    await recordEventMetric({
      eventId: scanJob.eventId,
      actor: 'system',
      action: 'upload_success',
      reason: 'media_scan_queued',
      request: undefined,
      metadata: {
        mediaId: scanJob.mediaId,
        storagePath: scanJob.storagePath,
        fileHash: scanJob.fileHash,
        mediaType: scanJob.mediaType,
      },
    });

    if (!scanWebhookUrl) {
      return;
    }

    try {
      await fetch(scanWebhookUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          mediaId: scanJob.mediaId,
          eventId: scanJob.eventId,
          storagePath: scanJob.storagePath,
          originalFileName: scanJob.originalFileName,
          fileHash: scanJob.fileHash,
          fileType: scanJob.fileType,
          mediaType: scanJob.mediaType,
        }),
      });
    } catch {
      await recordEventMetric({
        eventId: scanJob.eventId,
        actor: 'system',
        action: 'upload_failed',
        reason: 'media_scan_enqueue_failed',
        metadata: {
          mediaId: scanJob.mediaId,
          storagePath: scanJob.storagePath,
          fileHash: scanJob.fileHash,
        },
      });
    }
  })();
}

export async function POST(request: Request, context: { params: { inviteToken: string } }) {
  const { inviteToken } = context.params;

  if (!inviteToken) {
    return jsonResponse({ message: 'Missing inviteToken' }, { status: 400 });
  }
  const normalizedInviteToken = normalizeInviteToken(inviteToken);
  if (!normalizedInviteToken) {
    return jsonResponse({ message: 'Invalid inviteToken' }, { status: 400 });
  }

  const config = getConfigLimits();
  const requestId = request.headers.get('x-request-id') || null;
  const idempotencyKey = request.headers.get('Idempotency-Key') || request.headers.get('idempotency-key') || null;

  try {
    const admin = createSupabaseAdminClient();

    const { data: invitee, error } = await admin
      .from('invitees')
      .select('*')
      .eq('qr_token', normalizedInviteToken)
      .single();

    if (error || !invitee) {
      return jsonResponse({ message: 'Invalid invite token' }, { status: 404 });
    }

    if (!invitee.is_active || invitee.qr_state !== 'issued') {
      return jsonResponse({ message: 'Invite token is disabled' }, { status: 403 });
    }

    const { data: event, error: eventError } = await admin
      .from('events')
      .select('*')
      .eq('id', invitee.event_id)
      .single();

    if (eventError || !event) {
      return jsonResponse({ message: 'Event not found' }, { status: 404 });
    }

    if (!event.is_published || event.status !== 'published') {
      return jsonResponse({ message: 'Event is not currently accepting uploads' }, { status: 403 });
    }

    if (!nowCanUpload(event)) {
      return jsonResponse({ message: 'Event upload window is closed' }, { status: 403 });
    }

    const { count: eventMediaCount, error: eventMediaCountError } = await admin
      .from('media_items')
      .select('id', { count: 'exact', head: true })
      .eq('event_id', event.id);
    if (eventMediaCountError) {
      return jsonResponse({ message: eventMediaCountError.message }, { status: 400 });
    }

    if ((eventMediaCount ?? 0) >= config.maxMediaPerEvent) {
      return jsonResponse({ message: 'This event has reached the photo upload cap for MVP testing.' }, { status: 429 });
    }

    const form = await request.formData();
    const file = form.get('file');
    const consent = String(form.get('consent') ?? 'false');
    const tags = String(form.get('tags') ?? '');
    const durationSec = Number(form.get('durationSec') ?? 0);
    const clientIp = getClientIpFromRequest(request) || null;

    await recordEventMetric({
      eventId: event.id,
      action: 'upload_click',
      actor: 'guest',
      request,
      actorId: null,
      reason: 'upload_request_received',
      metadata: { hasFile: file instanceof File, consentProvided: consent === 'true' },
    });

    if (consent !== 'true') {
      await recordEventMetric({
        eventId: event.id,
        action: 'upload_failed',
        actor: 'guest',
        request,
        actorId: null,
        reason: 'consent_missing',
      });
      return jsonResponse({ message: 'You must provide consent before upload' }, { status: 400 });
    }

    if (!(file instanceof File)) {
      await recordEventMetric({
        eventId: event.id,
        action: 'upload_failed',
        actor: 'guest',
        request,
        actorId: null,
        reason: 'missing_file',
      });
      return jsonResponse({ message: 'Missing media file' }, { status: 400 });
    }

    if (file.size === 0) {
      await recordEventMetric({
        eventId: event.id,
        action: 'upload_failed',
        actor: 'guest',
        request,
        actorId: null,
        reason: 'empty_file',
      });
      return jsonResponse({ message: 'Uploaded file is empty' }, { status: 400 });
    }

    const mediaType = parseUploadMediaType(file.type);
    if (!mediaType) {
      await recordEventMetric({
        eventId: event.id,
        action: 'upload_failed',
        actor: 'guest',
        request,
        actorId: null,
        reason: 'unsupported_mime_type',
        metadata: { mimeType: file.type },
      });
      return jsonResponse({ message: 'Only image and video uploads are supported' }, { status: 400 });
    }

    if (!isAllowedMime(mediaType, file.type)) {
      await recordEventMetric({
        eventId: event.id,
        actor: 'guest',
        action: 'upload_failed',
        request,
        actorId: null,
        reason: 'mime_not_allowed',
        metadata: { mimeType: file.type },
      });
      return jsonResponse({ message: 'File type is not allowed for this event' }, { status: 400 });
    }

    const maxBytes = getMaxUploadBytes(mediaType);
    if (file.size > maxBytes) {
      await recordEventMetric({
        eventId: event.id,
        actor: 'guest',
        action: 'upload_failed',
        request,
        actorId: null,
        reason: 'file_too_large',
        metadata: { fileSize: file.size, limitBytes: maxBytes, mediaType },
      });
      return jsonResponse({ message: 'File exceeds size limit' }, { status: 400 });
    }

    if (mediaType === 'video' && durationSec > config.maxVideoSeconds) {
      await recordEventMetric({
        eventId: event.id,
        actor: 'guest',
        action: 'upload_failed',
        request,
        actorId: null,
        reason: 'video_too_long',
        metadata: { durationSec },
      });
      return jsonResponse({ message: `Video duration must be ${config.maxVideoSeconds}s or less` }, { status: 400 });
    }

    const burstWindowStart = new Date(Date.now() - config.burstWindowSeconds * 1000).toISOString();
    const { error: burstError, count: recentUploadCount } = await admin
      .from('media_items')
      .select('id', { count: 'exact', head: true })
      .eq('invitee_id', invitee.id)
      .gte('created_at', burstWindowStart);

    if (burstError) {
      return jsonResponse({ message: burstError.message }, { status: 400 });
    }
    if ((recentUploadCount ?? 0) >= config.maxBurstAttempts) {
      await recordEventMetric({
        eventId: event.id,
        actor: 'guest',
        action: 'upload_failed',
        request,
        actorId: null,
        reason: 'burst_rate_limit',
        metadata: { burstWindowSeconds: config.burstWindowSeconds, max: config.maxBurstAttempts },
      });
      return jsonResponse({ message: 'Upload rate limit reached. Please wait before sending more media.' }, { status: 429 });
    }

    const uploadWindowStart = new Date(Date.now() - config.uploadWindowMinutes * 60 * 1000).toISOString();
    const { error: windowUploadError, count: windowUploadCount } = await admin
      .from('media_items')
      .select('id', { count: 'exact', head: true })
      .eq('invitee_id', invitee.id)
      .gte('created_at', uploadWindowStart);

    if (windowUploadError) {
      return jsonResponse({ message: windowUploadError.message }, { status: 400 });
    }
    if ((windowUploadCount ?? 0) >= config.maxUploadsPerInvitee) {
      await recordEventMetric({
        eventId: event.id,
        actor: 'guest',
        action: 'upload_failed',
        request,
        actorId: null,
        reason: 'invitee_rate_limit',
        metadata: { windowMinutes: config.uploadWindowMinutes, max: config.maxUploadsPerInvitee },
      });
      return jsonResponse({ message: 'Upload limit reached for this event window.' }, { status: 429 });
    }

    const fingerprint = fingerprintInviteClient(request, invitee.qr_token);
    const fileNameAnalysis = analyzeUploadFilename(file.name || `upload.${mediaType}`);
    const resolvedExtension = fileNameAnalysis.canonicalExtension || (mediaType === 'video' ? 'mp4' : 'jpg');
    const safeExtension =
      resolvedExtension && /^[a-z0-9]{2,6}$/.test(resolvedExtension) ? resolvedExtension : mediaType === 'video' ? 'mp4' : 'jpg';

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileHash = hashValue(fileBuffer.toString('base64'));
    const fileFingerprint = hashValue(`${invitee.qr_token}:${fileHash}:${file.size}:${file.type}`);

    if (process.env.EVENT_CAM_ENABLE_FILE_SCAN === 'true' && fileNameAnalysis.isBlocked) {
      await recordEventMetric({
        eventId: event.id,
        actor: 'guest',
        action: 'upload_failed',
        request,
        actorId: null,
        targetType: 'media_upload',
        reason: 'media_scan_failed',
        metadata: {
          fileHash,
          fileScanReasons: fileNameAnalysis.reasons,
          originalFileName: file.name,
          canonicalName: fileNameAnalysis.sanitizedName,
          mediaType,
        },
      });
      return jsonResponse({ message: 'Upload blocked by file safety policy' }, { status: 400 });
    }

    if (safeExtension === 'bin') {
      await recordEventMetric({
        eventId: event.id,
        actor: 'guest',
        action: 'upload_failed',
        request,
        actorId: null,
        targetType: 'media_upload',
        reason: 'invalid_extension',
      });
      return jsonResponse({ message: 'Invalid media filename' }, { status: 400 });
    }

    const safeTags = String(tags)
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 10);

    if (idempotencyKey) {
      const { data: priorKey } = await admin
        .from('upload_idempotency_keys')
        .select('media_item_id')
        .eq('event_id', event.id)
        .eq('invitee_id', invitee.id)
        .eq('idempotency_key', idempotencyKey)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();
      if (priorKey?.media_item_id) {
        await recordEventMetric({
          eventId: event.id,
          actor: 'guest',
          action: 'upload_success',
          request,
          actorId: null,
          reason: 'idempotent_replay',
          metadata: { idempotencyKey },
        });
        return jsonResponse({ message: 'Duplicate request ignored', mediaId: priorKey.media_item_id }, { status: 200 });
      }
    }

    const storagePath = `${event.id}/${invitee.id}/${randomToken(16)}.${safeExtension}`;

    const upload = await admin.storage.from('event-media').upload(storagePath, fileBuffer, {
      contentType: file.type,
      upsert: false,
    });

    if (upload.error) {
      await recordEventMetric({
        eventId: event.id,
        actor: 'guest',
        action: 'upload_failed',
        request,
        actorId: null,
        reason: upload.error.message,
        metadata: { storagePath, fileFingerprint },
      });
      return jsonResponse({ message: upload.error.message }, { status: 400 });
    }

    const { data: mediaItem, error: mediaInsertError } = await admin
      .from('media_items')
      .insert({
        event_id: event.id,
        invitee_id: invitee.id,
        uploader_token: invitee.qr_token,
        media_type: mediaType,
        storage_path: storagePath,
        original_name: file.name || `${mediaType}-upload.${resolvedExtension}`,
        mime_type: file.type,
        size_bytes: file.size,
        duration_sec: mediaType === 'video' ? durationSec || null : null,
        attributed_labels: safeTags,
        consent_granted: true,
        moderation_state: 'approved',
      })
      .select('*')
      .single();

    if (mediaInsertError) {
      await recordEventMetric({
        eventId: event.id,
        actor: 'guest',
        action: 'upload_failed',
        request,
        actorId: null,
        reason: mediaInsertError.message,
        metadata: { storagePath },
      });
      return jsonResponse({ message: mediaInsertError.message }, { status: 400 });
    }

    await admin
      .from('contributor_sessions')
      .upsert({
        event_id: event.id,
        invitee_id: invitee.id,
        device_fingerprint: fingerprint,
        last_ip_hash: hashValue(clientIp || 'unknown'),
        has_consented: true,
        last_seen_at: new Date().toISOString(),
      }, { onConflict: 'event_id,invitee_id' });

    if (idempotencyKey) {
      await admin.from('upload_idempotency_keys').insert({
        event_id: event.id,
        invitee_id: invitee.id,
        idempotency_key: idempotencyKey,
        media_item_id: mediaItem.id,
        request_fingerprint: fingerprint,
        request_id: requestId,
        request_payload: {
          sizeBytes: file.size,
          mimeType: file.type,
          mediaType,
        },
      });
    }

    await recordEventMetric({
      eventId: event.id,
      actor: 'guest',
      action: 'upload_success',
      request,
      actorId: null,
      targetType: 'media_item',
      targetId: mediaItem.id,
      metadata: {
        mediaId: mediaItem.id,
        mediaType,
        sizeBytes: file.size,
        moderationState: 'approved',
        fileHash,
      },
    });

    if (process.env.EVENT_CAM_ENABLE_FILE_SCAN === 'true') {
      queueContentScanJob({
        eventId: event.id,
        mediaId: mediaItem.id,
        storagePath,
        fileHash,
        fileType: file.type,
        mediaType,
        originalFileName: file.name || `${mediaType}-upload.${safeExtension}`,
      });
    }

    return jsonResponse({ media: mediaItem }, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError) {
      if ((request as Request).headers && error.status >= 500) {
        const normalizedInvite = normalizeInviteToken(inviteToken);
        if (normalizedInvite) {
          const admin = createSupabaseAdminClient();
          const { data: invitee } = await admin.from('invitees').select('event_id').eq('qr_token', normalizedInvite).single();
          if (invitee?.event_id) {
            await recordEventMetric({
              eventId: invitee.event_id,
              actor: 'guest',
              action: 'upload_failed',
              request,
              actorId: null,
              reason: error.message,
            });
          }
        }
      }
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to upload media' }, { status: 500 });
  }
}
