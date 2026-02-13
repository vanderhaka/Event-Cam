'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();

    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (response.error) {
      setMessage(response.error.message);
      return;
    }

    if (response.data?.session) {
      setMessage('Account created. Logging you in.');
      router.push('/dashboard');
      return;
    }

    setMessage('Account created. Check email to confirm before logging in.');
  }

  return (
    <section className="card">
      <h2 className="section-head">Create organizer account</h2>
      <form onSubmit={submit} className="form-grid">
        <label>
          <div className="label">Email</div>
          <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} required type="email" />
        </label>
        <label>
          <div className="label">Password</div>
          <input className="input" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} type="password" />
        </label>
        <button className="btn btn-primary" type="submit">
          Create account
        </button>
      </form>
      {message ? <p>{message}</p> : null}
    </section>
  );
}
