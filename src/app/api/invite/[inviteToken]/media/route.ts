import { ApiError, jsonResponse } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { normalizeInviteToken, randomToken } from '@/lib/utils';

const MAX_VIDEO_SECONDS = 20;

function nowCanUpload(event: { start_at: string; end_at: string }) {
  const start = new Date(event.start_at).getTime();
  const end = new Date(event.end_at).getTime();
  const now = Date.now();
  return now >= start && now <= end;
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

    const form = await request.formData();
    const file = form.get('file');
    const consent = String(form.get('consent') ?? 'false');
    const tags = String(form.get('tags') ?? '');
    const durationSec = Number(form.get('durationSec') ?? 0);

    if (consent !== 'true') {
      return jsonResponse({ message: 'You must provide consent before upload' }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return jsonResponse({ message: 'Missing media file' }, { status: 400 });
    }

    const mediaType = file.type.startsWith('image/')
      ? 'image'
      : file.type.startsWith('video/')
        ? 'video'
        : '';

    if (!mediaType) {
      return jsonResponse({ message: 'Only image and video uploads are supported' }, { status: 400 });
    }

    if (mediaType === 'video' && durationSec > MAX_VIDEO_SECONDS) {
      return jsonResponse({ message: 'Video duration must be 20s or less' }, { status: 400 });
    }

    const extension = file.type.split('/')[1]?.replace(/[^a-zA-Z0-9]/g, '') || 'bin';
    const storagePath = `${event.id}/${invitee.id}/${randomToken(16)}.${extension}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const upload = await admin.storage.from('event-media').upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (upload.error) {
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
        original_name: file.name,
        mime_type: file.type,
        size_bytes: file.size,
        duration_sec: mediaType === 'video' ? durationSec || null : null,
        attributed_labels: tags
          .split(',')
          .map((label) => label.trim())
          .filter(Boolean),
        consent_granted: true,
      })
      .select('*')
      .single();

    if (mediaInsertError) {
      return jsonResponse({ message: mediaInsertError.message }, { status: 400 });
    }

    await admin
      .from('contributor_sessions')
      .upsert({
        event_id: event.id,
        invitee_id: invitee.id,
        has_consented: true,
        last_seen_at: new Date().toISOString(),
      }, { onConflict: 'event_id,invitee_id' });

    return jsonResponse({ media: mediaItem }, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to upload media' }, { status: 500 });
  }
}
