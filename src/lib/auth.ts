import { ApiError } from '@/lib/http';
import { createSupabaseAdminClient, createSupabaseServerClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function requireHostUser() {
  const headerStore = headers();
  const authHeader = headerStore.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (token) {
      const adminSupabase = createSupabaseAdminClient();
      const {
        data: { user },
        error,
      } = await adminSupabase.auth.getUser(token);

      if (!error && user) {
        return { user, supabase: adminSupabase, userId: user.id };
      }
    }
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new ApiError('Authentication required', 401);
  }

  return { user, supabase, userId: user.id };
}

export async function getEventForHost(eventId: string, userId: string) {
  const supabase = createSupabaseAdminClient();

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .eq('host_id', userId)
    .single();

  if (error || !event) {
    throw new ApiError('Event not found', 404);
  }

  return event;
}
