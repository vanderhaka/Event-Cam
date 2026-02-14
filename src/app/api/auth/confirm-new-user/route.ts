import { NextRequest } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

const MAX_AGE_MS = 2 * 60 * 1000; // only confirm users created in the last 2 minutes

export async function POST(request: NextRequest) {
  let body: { userId?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = body.userId;
  if (!userId || typeof userId !== 'string') {
    return new Response(JSON.stringify({ error: 'userId required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const admin = createSupabaseAdminClient();
  const {
    data: { user },
    error: fetchError,
  } = await admin.auth.admin.getUserById(userId);

  if (fetchError || !user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const createdAt = user.created_at ? new Date(user.created_at).getTime() : 0;
  if (Date.now() - createdAt > MAX_AGE_MS) {
    return new Response(JSON.stringify({ error: 'Confirmation window expired' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (user.email_confirmed_at) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
    email_confirm: true,
  });

  if (updateError) {
    return new Response(JSON.stringify({ error: updateError.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
