'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [email, setEmail] = useState('');
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
      },
    });

    if (response.error) {
      setMessage(response.error.message);
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (response.data?.session) {
      setMessage('Account created — logging you in...');
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
