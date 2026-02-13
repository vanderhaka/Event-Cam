import { ApiError, jsonResponse, parseJsonBody } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

export async function POST(request: Request, context: { params: { eventId: string; mediaId: string } }) {
  try {
    const { userId } = await requireHostUser();
    await getEventForHost(context.params.eventId, userId);

    const admin = createSupabaseAdminClient();
    const body = await parseJsonBody(request);

    await admin
      .from('media_items')
      .update({
        moderation_state: 'approved',
        reviewed_by: userId,
        reviewed_at: new Date().toISOString(),
        rejection_reason: body.reason ? String(body.reason).trim() : null,
      })
      .eq('id', context.params.mediaId)
      .eq('event_id', context.params.eventId);

    return jsonResponse({ status: 'approved', mediaId: context.params.mediaId });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to approve media' }, { status: 500 });
  }
}
