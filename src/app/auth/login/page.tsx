'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();

    const response = await supabase.auth.signInWithPassword({ email, password });
    if (response.error) {
      setMessage(response.error.message);
      return;
    }

    setMessage('Logged in.');
    router.push('/dashboard');
  }

  return (
    <section className="card">
      <h2 className="section-head">Organizer login</h2>
      <form onSubmit={submit} className="form-grid">
        <label>
          <div className="label">Email</div>
          <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} required type="email" />
        </label>
        <label>
          <div className="label">Password</div>
          <input className="input" value={password} onChange={(event) => setPassword(event.target.value)} required type="password" />
        </label>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
      {message ? <p>{message}</p> : null}
    </section>
  );
}
