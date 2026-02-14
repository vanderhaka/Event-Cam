'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success'>('error');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const response = await supabase.auth.signInWithPassword({ email, password });
    if (response.error) {
      setLoading(false);
      router.push(`/auth/register?email=${encodeURIComponent(email)}`);
      return;
    }

    setMessage('Logged in — redirecting...');
    setMessageType('success');
    router.push('/dashboard');
  }

  return (
    <div className="auth-wrapper">
      <section className="card">
        <h2 className="section-head">Welcome back</h2>
        <p className="section-sub">Sign in to manage your events</p>
        <form onSubmit={submit} className="form-grid">
          <label>
            <div className="label">Email</div>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <label>
            <div className="label">Password</div>
            <input
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </label>
          <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        {message && (
          <div className={`message ${messageType === 'error' ? 'message-error' : 'message-success'}`}>
            {message}
          </div>
        )}
      </section>
      <div className="auth-footer">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register">Create one here</Link>
      </div>
    </div>
  );
}
