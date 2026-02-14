'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

const ordinalSuffix = (value: number) => {
  const v = value % 100;
  if (v >= 11 && v <= 13) return `${value}th`;
  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
};

const readableDate = (value?: string | null) => {
  if (!value) return 'Not set';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Invalid date';
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date);
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${ordinalSuffix(day)} ${month} ${year}, ${time}`;
};

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [events, setEvents] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success'>('error');

  async function buildAuthHeaders(extra: HeadersInit = {}) {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    const headers = new Headers(extra);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}) {
    const headers = await buildAuthHeaders(init.headers as HeadersInit);
    return fetch(input, { ...init, headers });
  }

  async function reload() {
    const response = await fetchWithAuth('/api/events');
    if (!response.ok) {
      if (response.status === 401) {
        setMessage('You must log in before creating or viewing events.');
        router.push('/auth/login');
        return;
      }
      return;
    }
    const payload = await response.json();
    setEvents(payload.events ?? []);
  }

  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        router.push('/auth/login');
        return;
      }
      await reload();
    })();
  }, []);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <div className="grid">
      {/* Header bar */}
      <div className="row-center" style={{ justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Your Events</h2>
        <div className="row-center" style={{ gap: '0.5rem' }}>
          <Link href="/dashboard/events/new" className="btn btn-primary">
            + New Event
          </Link>
          <button className="btn btn-subtle btn-sm" onClick={logout}>
            Log out
          </button>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div className={`message ${messageType === 'error' ? 'message-error' : 'message-success'}`}>
          {message}
        </div>
      )}

      {/* Events list */}
      {events.length === 0 ? (
        <section className="card empty-state-card">
          <div className="empty-state">
            <h3 className="empty-state-heading">Your first event is waiting</h3>
            <p className="empty-state-text">
              Every great album starts with one moment—yours starts here. Create an event, invite your guests, and start collecting memories in one place.
            </p>
            <Link
              href="/dashboard/events/new"
              className="btn btn-primary btn-lg empty-state-cta"
            >
              Create your first event
            </Link>
          </div>
        </section>
      ) : (
        <div className="event-list">
          {events.map((evt) => (
            <Link key={evt.id} href={`/dashboard/events/${evt.id}`} className="event-card">
              <div className="event-card-info">
                <div className="event-card-name">
                  {evt.name}
                  <span className={`status-chip ${evt.status === 'checkout_pending' ? 'pending' : evt.status}`} style={{ marginLeft: '0.5rem' }}>
                    {evt.status}
                  </span>
                  {evt.event_type === 'open' && (
                    <span className="status-chip" style={{ marginLeft: '0.5rem', background: 'var(--surface-soft)', color: 'var(--muted)', fontSize: '0.75rem' }}>
                      Open
                    </span>
                  )}
                </div>
                <div className="event-card-date">
                  {readableDate(evt.start_at)} &mdash; {readableDate(evt.end_at)}
                </div>
                {evt.location && <div className="event-card-date">{evt.location}</div>}
              </div>
              <span className="event-card-arrow">&rsaquo;</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
