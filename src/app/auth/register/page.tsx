'use client';

import { FormEvent, Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

function friendlyAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('rate limit') || lower.includes('email rate limit')) {
    return 'Too many sign-ups right now. Please try again in a few minutes.';
  }
  if (lower.includes('already registered') || lower.includes('already exists')) {
    return 'An account with this email already exists. Try signing in instead.';
  }
  return message;
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createBrowserSupabaseClient();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const fromLogin = searchParams.get('email');
    if (fromLogin) setEmail(fromLogin);
  }, [searchParams]);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | 'info'>('error');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          first_name: firstName.trim() || undefined,
          last_name: lastName.trim() || undefined,
        },
      },
    });

    if (response.error) {
      setMessage(friendlyAuthError(response.error.message));
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (response.data?.session) {
      setMessage('Account created — redirecting...');
      setMessageType('success');
      router.push('/dashboard');
      return;
    }

    // No session when email confirmation is required: auto-confirm and sign in
    const user = response.data?.user;
    if (user?.id) {
      const confirmRes = await fetch('/api/auth/confirm-new-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!confirmRes.ok) {
        const err = await confirmRes.json().catch(() => ({}));
        setMessage(err?.error ?? 'Could not complete sign up.');
        setMessageType('error');
        setLoading(false);
        return;
      }
      const signIn = await supabase.auth.signInWithPassword({ email, password });
      if (signIn.error) {
        setMessage(friendlyAuthError(signIn.error.message));
        setMessageType('error');
        setLoading(false);
        return;
      }
      setMessage('Account created — redirecting...');
      setMessageType('success');
      router.push('/dashboard');
      return;
    }

    setMessage('Account created! Check your email to confirm before logging in.');
    setMessageType('info');
    setLoading(false);
  }

  return (
    <div className="auth-wrapper">
      <section className="card">
        <h2 className="section-head">Create your account</h2>
        <p className="section-sub">Start collecting event media in minutes</p>
        <form onSubmit={submit} className="form-grid">
          <label>
            <div className="label">First name</div>
            <input
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="Jane"
              autoComplete="given-name"
            />
          </label>
          <label>
            <div className="label">Last name</div>
            <input
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Doe"
              autoComplete="family-name"
            />
          </label>
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
            <div className="label">
              Password <span className="label-hint">(minimum 6 characters)</span>
            </div>
            <input
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              type="password"
              placeholder="Choose a secure password"
              autoComplete="new-password"
            />
          </label>
          <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        {message && (
          <div className={`message ${messageType === 'error' ? 'message-error' : messageType === 'success' ? 'message-success' : 'message-info'}`}>
            {message}
          </div>
        )}
      </section>
      <div className="auth-footer">
        Already have an account?{' '}
        <Link href="/auth/login">Sign in here</Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="auth-wrapper">
        <section className="card">
          <h2 className="section-head">Create your account</h2>
          <p className="section-sub">Loading...</p>
        </section>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
