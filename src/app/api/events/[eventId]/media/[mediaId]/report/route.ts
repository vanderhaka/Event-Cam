import { ApiError, jsonResponse, parseJsonBody } from '@/lib/http';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { recordEventMetric } from '@/lib/event-metrics';

export async function POST(request: Request, context: { params: { eventId: string; mediaId: string } }) {
  try {
    const admin = createSupabaseAdminClient();
    const body = await parseJsonBody(request);
    const reason = String(body.reason ?? '').trim();
    const reporterToken = body.reporterToken ? String(body.reporterToken).trim() : null;

    if (!reason) {
      return jsonResponse({ message: 'reason is required' }, { status: 400 });
    }

    const { data: media, error: mediaError } = await admin
      .from('media_items')
      .select('id, event_id')
      .eq('id', context.params.mediaId)
      .eq('event_id', context.params.eventId)
      .eq('moderation_state', 'approved')
      .single();

    if (mediaError || !media) {
      return jsonResponse({ message: 'Media item not found' }, { status: 404 });
    }

    const reportPayload = {
      media_item_id: media.id,
      event_id: media.event_id,
      reporter_token: reporterToken,
      reason,
      context: {
        user_agent: request.headers.get('user-agent') || null,
      },
    };

    const { error: reportError } = await admin.from('media_reports').insert(reportPayload);
    if (reportError) {
      return jsonResponse({ message: reportError.message }, { status: 400 });
    }

    await recordEventMetric({
      eventId: media.event_id,
      action: 'gallery_report_submit',
      actor: 'guest',
      actorId: null,
      reason,
      metadata: {
        mediaItemId: media.id,
      },
    });

    return jsonResponse({ reported: true });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to submit report' }, { status: 500 });
  }
}
