'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';
import type { User } from '@supabase/supabase-js';

function displayName(user: User): string {
  const meta = user?.user_metadata ?? {};
  const first = (meta.first_name ?? '').trim();
  const last = (meta.last_name ?? '').trim();
  const full = (meta.full_name ?? '').trim();
  if (first || last) return [first, last].filter(Boolean).join(' ');
  if (full) return full;
  const email = (user?.email ?? '').trim();
  if (email) return email.split('@')[0] ?? 'there';
  return 'there';
}

export function HeaderNav() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = createBrowserSupabaseClient();
    (async () => {
      const { data: { user: u } } = await client.auth.getUser();
      setUser(u ?? null);
      setLoading(false);
    })();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const client = createBrowserSupabaseClient();
    await client.auth.signOut();
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  return (
    <nav className="nav">
      <Link href="/" className="link">
        Home
      </Link>
      <Link href="/dashboard" className="link">
        Dashboard
      </Link>
      <span className="nav-divider" />
      {loading ? (
        <span className="link muted" style={{ cursor: 'default' }}>
          …
        </span>
      ) : user ? (
        <>
          <span className="header-greeting" aria-label={`Logged in as ${displayName(user)}`}>
            Hey, {displayName(user)}
          </span>
          <button
            type="button"
            className="btn btn-subtle btn-sm"
            onClick={handleLogout}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link href="/auth/login" className="link">
            Log in
          </Link>
          <Link href="/auth/register" className="link btn btn-sm btn-primary">
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
}
