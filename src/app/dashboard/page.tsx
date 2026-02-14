'use client';

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

function toIsoLocal(date: Date) {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
}

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

function formatDateTimeDisplay(value: string): string {
  if (!value) return 'Select date & time';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Select date & time';
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${day} ${month} ${year}, ${time}`;
}

function DateTimeInput({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const display = useMemo(() => formatDateTimeDisplay(value), [value]);

  const openPicker = useCallback(() => {
    try {
      inputRef.current?.showPicker();
    } catch {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <div className={`datetime-input-wrapper ${className ?? ''}`} onClick={openPicker}>
      <span className="datetime-display">{display}</span>
      <input
        ref={inputRef}
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="datetime-native-input"
        tabIndex={-1}
        aria-hidden
      />
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [events, setEvents] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success'>('error');
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [startAt, setStartAt] = useState(toIsoLocal(new Date()));
  const [endAt, setEndAt] = useState(toIsoLocal(new Date(Date.now() + 24 * 60 * 60 * 1000)));
  const [feePerInviteCents, setFeePerInviteCents] = useState('500');

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

    if ('geolocation' in navigator) {
      setDetectingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`,
              { headers: { 'Accept-Language': 'en' } },
            );
            if (res.ok) {
              const data = await res.json();
              const addr = data.address ?? {};
              const city = addr.city || addr.town || addr.village || addr.municipality || '';
              const state = addr.state || '';
              const country = addr.country || '';
              const parts = [city, state, country].filter(Boolean);
              if (parts.length > 0) {
                setLocation(parts.join(', '));
              }
            }
          } catch {
            // Reverse geocoding failed
          } finally {
            setDetectingLocation(false);
          }
        },
        () => {
          setDetectingLocation(false);
        },
        { enableHighAccuracy: false, timeout: 8000 },
      );
    }
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setCreating(true);
    setMessage('');

    const response = await fetchWithAuth('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        location,
        timezone,
        startAt: new Date(startAt).toISOString(),
        endAt: new Date(endAt).toISOString(),
        feePerInviteCents: Number(feePerInviteCents),
      }),
    });

    if (response.ok) {
      setMessage('Event created successfully');
      setMessageType('success');
      setName('');
      setShowForm(false);
      await reload();
    } else {
      const payload = await response.json();
      setMessage(payload.message || 'Failed to create event');
      setMessageType('error');
    }
    setCreating(false);
  }

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
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Event'}
          </button>
          <button className="btn btn-subtle btn-sm" onClick={logout}>
            Log out
          </button>
        </div>
      </div>

      {/* Create event form */}
      {showForm && (
        <section className="card">
          <h3 className="section-head">Create event</h3>
          <p className="section-sub">Set up a new event to start collecting media from guests.</p>
          <form onSubmit={submit} className="form-grid">
            <label>
              <div className="label">Event name</div>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Sarah & Tom's Wedding" />
            </label>
            <div className="row">
              <label className="stack field">
                <div className="label">Location</div>
                <input
                  className="input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={detectingLocation ? 'Detecting location...' : 'e.g. Sydney, Australia'}
                  disabled={detectingLocation}
                />
                <span className="tz-hint">{timezone}</span>
              </label>
              <label className="stack field">
                <div className="label">Fee per invite <span className="label-hint">(cents)</span></div>
                <input className="input" value={feePerInviteCents} onChange={(e) => setFeePerInviteCents(e.target.value)} required type="number" min="0" />
              </label>
            </div>
            <div className="row">
              <div className="stack field">
                <div className="label">Starts</div>
                <DateTimeInput className="input" value={startAt} onChange={setStartAt} />
              </div>
              <div className="stack field">
                <div className="label">Ends</div>
                <DateTimeInput className="input" value={endAt} onChange={setEndAt} />
              </div>
            </div>
            <button className="btn btn-primary" type="submit" disabled={creating}>
              {creating ? 'Creating...' : 'Create Event'}
            </button>
          </form>
        </section>
      )}

      {/* Messages */}
      {message && (
        <div className={`message ${messageType === 'error' ? 'message-error' : 'message-success'}`}>
          {message}
        </div>
      )}

      {/* Events list */}
      {events.length === 0 ? (
        <section className="card">
          <div className="empty-state">
            <span className="empty-state-icon">{'\uD83C\uDF89'}</span>
            <p>No events yet. Create your first event to get started!</p>
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
