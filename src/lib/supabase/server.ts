import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

function requireEnvVar(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value;
}

export function createSupabaseServerClient() {
  const url = requireEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  const anonKey = requireEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  const cookieStore = cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (newCookies) => {
        newCookies.forEach((cookie) => {
          cookieStore.set(cookie.name, cookie.value, cookie.options);
        });
      },
    },
  });
}

export function createSupabaseAdminClient() {
  const url = requireEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  const serviceRole = requireEnvVar('SUPABASE_SERVICE_ROLE_KEY');

  return createClient(url, serviceRole, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
