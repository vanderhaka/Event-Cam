import { NextRequest } from 'next/server';
import { ApiError, jsonResponse } from '@/lib/http';
import { requireHostUser, getEventForHost } from '@/lib/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

const MAX_LOG_LIMIT = 1000;

export async function GET(request: NextRequest, context: { params: { eventId: string } }) {
  try {
    const { userId } = await requireHostUser();
    await getEventForHost(context.params.eventId, userId);
    const admin = createSupabaseAdminClient();

    const action = request.nextUrl.searchParams.get('action');
    const rawLimit = Number(request.nextUrl.searchParams.get('limit') ?? 200);
    const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, MAX_LOG_LIMIT) : 200;

    let query = admin
      .from('event_action_logs')
      .select('id,action,actor,actor_id,target_type,target_id,reason,ip_hash,user_agent,metadata,created_at')
      .eq('event_id', context.params.eventId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (action) {
      query = query.eq('action', action);
    }

    const { data, error } = await query;
    if (error) {
      return jsonResponse({ message: error.message }, { status: 400 });
    }

    return jsonResponse({ event_id: context.params.eventId, logs: data ?? [] });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse({ message: error.message }, { status: error.status });
    }
    return jsonResponse({ message: 'Unable to fetch event logs' }, { status: 500 });
  }
}
