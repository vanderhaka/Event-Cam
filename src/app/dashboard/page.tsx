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
  const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
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
        setMessage('You must log in before creating or viewing events.');
        router.push('/auth/login');
        return;
      }
      await reload();
    })();

    // Auto-detect location via Geolocation + reverse geocoding
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
            // Reverse geocoding failed — leave location empty for manual entry
          } finally {
            setDetectingLocation(false);
          }
        },
        () => {
          // Geolocation denied or unavailable
          setDetectingLocation(false);
        },
        { enableHighAccuracy: false, timeout: 8000 },
      );
    }
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
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
      setMessage('Event created');
      setName('');
      await reload();
    } else {
      const payload = await response.json();
      setMessage(payload.message || 'Failed to create event');
    }
  }

  return (
    <div className="grid">
      <section className="card">
        <h2 className="section-head">Create event</h2>
        <form onSubmit={submit} className="form-grid">
          <label>
            <div className="label">Event name</div>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <div className="row">
            <label className="stack field">
              <div className="label">Location</div>
              <input
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={detectingLocation ? 'Detecting location…' : 'Add location'}
                disabled={detectingLocation}
              />
              <span className="tz-hint">{timezone}</span>
            </label>
            <label className="stack field">
              <div className="label">Fee per invite (cents)</div>
              <input className="input" value={feePerInviteCents} onChange={(e) => setFeePerInviteCents(e.target.value)} required />
            </label>
          </div>
          <div className="row">
            <div className="stack field">
              <div className="label">Start</div>
              <DateTimeInput className="input" value={startAt} onChange={setStartAt} />
            </div>
            <div className="stack field">
              <div className="label">End</div>
              <DateTimeInput className="input" value={endAt} onChange={setEndAt} />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </form>
        {message ? <p>{message}</p> : null}
      </section>

      <section className="card">
        <h2 className="section-head">Your events</h2>
        {events.length === 0 ? (
          <p className="muted">No events yet.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event.id} className="list-item">
                <Link href={`/dashboard/events/${event.id}`} className="link">
                  <strong>{event.name}</strong>
                </Link>
                <div className="muted">
                  {readableDate(event.start_at)} → {readableDate(event.end_at)}
                </div>
                <span className="muted"> — {event.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
