import { NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(_request: NextRequest) {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  return new Response(null, { status: 200 });
}
