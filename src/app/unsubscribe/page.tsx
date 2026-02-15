'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type MessageState = 'idle' | 'loading' | 'success' | 'error';

function UnsubscribeStatus() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('Processing your request…');
  const [state, setState] = useState<MessageState>('idle');

  useEffect(() => {
    if (!token) {
      setMessage('This unsubscribe link is missing a token.');
      setState('error');
      return;
    }

    const run = async () => {
      setState('loading');
      setMessage('Processing your request…');
      try {
        const response = await fetch(`/api/unsubscribe?token=${encodeURIComponent(token)}`);
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          setMessage(payload.message || 'Could not process unsubscribe request.');
          setState('error');
          return;
        }
        setMessage(payload.message || 'You have been unsubscribed.');
        setState('success');
      } catch {
        setMessage('Could not process unsubscribe request.');
        setState('error');
      }
    };

    run();
  }, [token]);

  return (
    <div className="auth-wrapper">
      <section className="card">
        <h2 className="section-head">Unsubscribe</h2>
        <p
          className={`${
            state === 'error'
              ? 'message message-error'
              : state === 'success'
                ? 'message message-success'
                : 'muted'
          }`}
          style={{ margin: '0.75rem 0 0.5rem' }}
        >
          {message}
        </p>
        <Link className="section-sub" href="/">
          Return home
        </Link>
      </section>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="auth-wrapper">
          <section className="card">
            <h2 className="section-head">Unsubscribe</h2>
            <p className="muted">Loading unsubscribe page...</p>
          </section>
        </div>
      }
    >
      <UnsubscribeStatus />
    </Suspense>
  );
}
