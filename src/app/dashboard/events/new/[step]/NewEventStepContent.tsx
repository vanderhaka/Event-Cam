'use client';

import { FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';
import { useCreateEvent } from '../create-event-context';

const totalSteps = 4;

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

export default function NewEventStepContent() {
  const router = useRouter();
  const params = useParams();
  const stepParam = params?.step;
  const step = Math.min(totalSteps, Math.max(1, parseInt(Array.isArray(stepParam) ? stepParam[0] : stepParam ?? '1', 10) || 1));
  const supabase = createBrowserSupabaseClient();
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success'>('error');

  const {
    name,
    setName,
    eventType,
    setEventType,
    location,
    setLocation,
    timezone,
    detectingLocation,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
  } = useCreateEvent();

  async function buildAuthHeaders(extra: HeadersInit = {}) {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    const headers = new Headers(extra);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}) {
    const headers = await buildAuthHeaders(init.headers as HeadersInit);
    return fetch(input, { ...init, headers });
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    await supabase.auth.signOut();
    router.push('/');
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setCreating(true);
    setMessage('');
    const response = await fetchWithAuth('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        location,
        timezone,
        eventType,
        startAt: new Date(startAt).toISOString(),
        endAt: new Date(endAt).toISOString(),
      }),
    });
    if (response.ok) {
      setMessage('Event created successfully');
      setMessageType('success');
      setTimeout(() => router.push('/dashboard'), 1500);
    } else {
      const payload = await response.json();
      setMessage(payload.message || 'Failed to create event');
      setMessageType('error');
    }
    setCreating(false);
  }

  function goToStep(next: number) {
    router.push(`/dashboard/events/new/${next}`);
  }

  const canProceed = step === 1 ? name.trim().length > 0 : true;

  return (
    <div className="grid">
      <div className="row-center" style={{ justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Your Events</h2>
        <div className="row-center" style={{ gap: '0.5rem' }}>
          <Link href="/dashboard" className="btn btn-subtle">
            Cancel
          </Link>
          <button type="button" className="btn btn-subtle btn-sm" onClick={logout}>
            Log out
          </button>
        </div>
      </div>

      <section className="card create-event-card">
        <div className="create-flow-header">
          <h3 className="section-head">Create event</h3>
          <p className="section-sub">Set up a new event to start collecting memories from guests.</p>
          <div className="create-flow-stepper" role="navigation" aria-label="Create event steps">
            <div className="create-flow-dots">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`create-flow-dot ${step === s ? 'active' : ''} ${step > s ? 'done' : ''}`}
                  onClick={() => goToStep(s)}
                  aria-current={step === s ? 'step' : undefined}
                  aria-label={`Step ${s}${step === s ? ', current' : step > s ? ', completed' : ''}`}
                >
                  <span className="create-flow-dot-num">{s}</span>
                </button>
              ))}
            </div>
            <p className="create-flow-step-label">
              Step {step} of {totalSteps}
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="form-grid create-event-form" noValidate>
          {step === 1 && (
            <div className="create-flow-panel" data-step={1}>
              <label>
                <div className="label">Event name</div>
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Sarah & Tom's Wedding — Collecting memories"
                  autoFocus
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="create-flow-panel" data-step={2}>
              <div className="stack field">
                <div className="label">Event type</div>
                <div className="event-type-cards" role="radiogroup" aria-label="Event type">
                  <label className="event-type-option event-type-card">
                    <input
                      type="radio"
                      name="eventType"
                      value="invite_list"
                      checked={eventType === 'invite_list'}
                      onChange={() => setEventType('invite_list')}
                    />
                    <span className="event-type-label">
                      <strong>Known guest list</strong> — Add invitees; each gets a unique QR code.
                    </span>
                  </label>
                  <label className="event-type-option event-type-card">
                    <input
                      type="radio"
                      name="eventType"
                      value="open"
                      checked={eventType === 'open'}
                      onChange={() => setEventType('open')}
                    />
                    <span className="event-type-label">
                      <strong>Open event</strong> — One QR for the event; anyone can scan and upload.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="create-flow-panel" data-step={3}>
              <label>
                <div className="label">Location</div>
                <input
                  className="input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={detectingLocation ? 'Detecting location...' : 'e.g. Sydney, Australia'}
                  disabled={detectingLocation}
                  autoFocus
                />
                <span className="tz-hint">{timezone}</span>
              </label>
            </div>
          )}

          {step === 4 && (
            <div className="create-flow-panel" data-step={4}>
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
            </div>
          )}

          <div className="create-flow-actions">
            {step > 1 ? (
              <button type="button" className="btn btn-subtle" onClick={() => goToStep(step - 1)}>
                Back
              </button>
            ) : (
              <span />
            )}
            {step < totalSteps ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => canProceed && goToStep(step + 1)}
                disabled={!canProceed}
              >
                Next
              </button>
            ) : (
              <button className="btn btn-primary" type="submit" disabled={creating}>
                {creating ? 'Creating...' : 'Create Event'}
              </button>
            )}
          </div>
        </form>
      </section>

      {message && (
        <div className={`message ${messageType === 'error' ? 'message-error' : 'message-success'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
