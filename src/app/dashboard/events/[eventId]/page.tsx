'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${ordinalSuffix(day)} ${month} ${year}, ${time}`;
};

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [eventPayload, setEventPayload] = useState<any>(null);
  const [inviteeRows, setInviteeRows] = useState([{ firstName: '', lastName: '', phone: '' }]);
  const [pendingQueue, setPendingQueue] = useState<any[]>([]);
  const [approvedMedia, setApprovedMedia] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumMediaIds, setAlbumMediaIds] = useState('');
  const [sharePassword, setSharePassword] = useState('');

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

  async function loadData() {
    const base = await fetchWithAuth(`/api/events/${eventId}`);
    if (base.ok) {
      const payload = await base.json();
      setEventPayload(payload);
    } else if (base.status === 401) {
      router.push('/auth/login');
      return;
    }

    const pending = await fetchWithAuth(`/api/events/${eventId}/moderation?state=pending`);
    if (pending.ok) {
      const queue = await pending.json();
      setPendingQueue(queue.media ?? []);
    } else if (pending.status === 401) {
      router.push('/auth/login');
      return;
    }

    const approved = await fetchWithAuth(`/api/events/${eventId}/moderation?state=approved`);
    if (approved.ok) {
      const list = await approved.json();
      setApprovedMedia(list.media ?? []);
    } else if (approved.status === 401) {
      router.push('/auth/login');
      return;
    }
  }

  useEffect(() => {
    loadData();
  }, [eventId]);

  function updateInviteeRow(index: number, field: 'firstName' | 'lastName' | 'phone', value: string) {
    setInviteeRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  function addInviteeRow() {
    setInviteeRows((prev) => [...prev, { firstName: '', lastName: '', phone: '' }]);
  }

  function removeInviteeRow(index: number) {
    setInviteeRows((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  }

  async function addInvitees(event: FormEvent) {
    event.preventDefault();
    const invitees = inviteeRows
      .filter((row) => row.firstName.trim())
      .map((row) => {
        const displayName = [row.firstName.trim(), row.lastName.trim()].filter(Boolean).join(' ');
        return { displayName, phone: row.phone.trim() || undefined };
      });

    if (invitees.length === 0) {
      setStatusMessage('Add at least one invitee with a first name');
      return;
    }

    const response = await fetchWithAuth(`/api/events/${eventId}/invitees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invitees }),
    });

    if (response.ok) {
      setInviteeRows([{ firstName: '', lastName: '', phone: '' }]);
      setStatusMessage('Invitees added');
      await loadData();
    } else {
      const payload = await response.json();
      setStatusMessage(payload.message || 'Could not add invitees');
    }
  }

  async function checkout() {
    const response = await fetchWithAuth(`/api/events/${eventId}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const payload = await response.json();
    if (response.ok && payload.checkoutUrl) {
      window.location.href = payload.checkoutUrl;
      return;
    }
    setStatusMessage(payload.message || 'Checkout failed');
  }

  async function publishEvent() {
    const response = await fetchWithAuth(`/api/events/${eventId}/publish`, { method: 'POST' });
    const payload = await response.json();
    if (response.ok) {
      setStatusMessage(`Published ${payload.issued?.length ?? 0} invitees`);
      await loadData();
    } else {
      setStatusMessage(payload.message || 'Publish failed');
    }
  }

  async function moderate(mediaId: string, action: 'approve' | 'reject') {
    const response = await fetchWithAuth(`/api/events/${eventId}/media/${mediaId}/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: '' }),
    });

    if (response.ok) {
      await loadData();
      setStatusMessage(`Media ${action}d`);
    } else {
      const payload = await response.json();
      setStatusMessage(payload.message || `Could not ${action} media`);
    }
  }

  async function createAlbum(event: FormEvent) {
    event.preventDefault();
    const response = await fetchWithAuth(`/api/events/${eventId}/albums`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: albumTitle,
        mediaIds: albumMediaIds.split(',').map((value) => value.trim()).filter(Boolean),
      }),
    });

    const payload = await response.json();
    if (response.ok) {
      setStatusMessage(`Album created: ${payload.album?.id}`);
      setAlbumTitle('');
      setAlbumMediaIds('');
      await loadData();
    } else {
      setStatusMessage(payload.message || 'Could not create album');
    }
  }

  async function createShareLink(albumId: string) {
    const response = await fetchWithAuth(`/api/albums/${albumId}/share-links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: sharePassword || 'changeme', maxViews: 50, expiresInHours: 72 }),
    });

    const payload = await response.json();
    if (response.ok) {
      navigator.clipboard.writeText(payload.shareUrl);
      setStatusMessage('Share link generated and copied to clipboard');
    } else {
      setStatusMessage(payload.message || 'Could not create share link');
    }
  }

  if (!eventPayload) {
    return <p className="muted">Loading event...</p>;
  }

  return (
    <div className="grid">
      <section className="card">
        <h2 className="section-head">{eventPayload.event?.name}</h2>
        <p className="muted">
          Status:
          <span
            className={`status-chip ${
              eventPayload.event?.status === 'checkout_pending' ? 'pending' : eventPayload.event?.status
            }`}
            role="status"
          >
            {eventPayload.event?.status}
          </span>
        </p>
        <p className="muted">
          Window: {readableDate(eventPayload.event?.start_at)} → {readableDate(eventPayload.event?.end_at)}
        </p>
      </section>

      <section className="card">
        <h3 className="section-head">Add invitees</h3>
        <form onSubmit={addInvitees} className="form-grid">
          <div className="invitee-rows">
            {inviteeRows.map((row, index) => (
              <div key={index} className="invitee-row">
                <div className="invitee-fields">
                  <label className="field">
                    <div className="label">First name *</div>
                    <input
                      className="input"
                      placeholder="Jane"
                      value={row.firstName}
                      onChange={(e) => updateInviteeRow(index, 'firstName', e.target.value)}
                      required
                    />
                  </label>
                  <label className="field">
                    <div className="label">Last name</div>
                    <input
                      className="input"
                      placeholder="Doe"
                      value={row.lastName}
                      onChange={(e) => updateInviteeRow(index, 'lastName', e.target.value)}
                    />
                  </label>
                  <label className="field">
                    <div className="label">Phone</div>
                    <input
                      className="input"
                      type="tel"
                      placeholder="+1 555 000 0000"
                      value={row.phone}
                      onChange={(e) => updateInviteeRow(index, 'phone', e.target.value)}
                    />
                  </label>
                </div>
                {inviteeRows.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger invitee-remove"
                    onClick={() => removeInviteeRow(index)}
                    aria-label={`Remove invitee ${index + 1}`}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="row gap-sm">
            <button type="button" className="btn btn-subtle" onClick={addInviteeRow}>
              + Add another
            </button>
            <button className="btn btn-primary" type="submit">
              Save invitees
            </button>
          </div>
        </form>
      </section>

      <section className="card">
        <h3 className="section-head">Invitees</h3>
        <div className="row">
          <button className="btn btn-subtle" onClick={checkout}>
            Checkout
          </button>
          <button className="btn btn-success" onClick={publishEvent}>
            Generate QR tokens (publish)
          </button>
        </div>
        <ul>
          {eventPayload.invitees?.map((invitee: any) => (
            <li key={invitee.id} className="list-item">
              {invitee.display_name} - {invitee.qr_state}
              {invitee.qr_token ? ` - /scan/${invitee.qr_token}` : ''}
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h3 className="section-head">Moderation queue</h3>
        <ul>
          {pendingQueue.map((item) => (
            <li key={item.id} className="list-item">
              <strong>{item.media_type}</strong> - {item.original_name || 'upload'}
              {item.invitee ? ` — ${item.invitee.display_name}` : ''}
              <div className="row gap-sm stack-small">
                <button className="btn btn-success" onClick={() => moderate(item.id, 'approve')}>
                  Approve
                </button>
                <button className="btn btn-danger" onClick={() => moderate(item.id, 'reject')}>
                  Reject
                </button>
              </div>
            </li>
          ))}
          {pendingQueue.length === 0 ? <li className="muted">No pending uploads</li> : null}
        </ul>
      </section>

      <section className="card">
        <h3 className="section-head">Create album from approved media</h3>
        <form onSubmit={createAlbum} className="form-grid">
          <label>
            <div className="label">Album title</div>
            <input className="input" value={albumTitle} onChange={(event) => setAlbumTitle(event.target.value)} required />
          </label>
          <label>
            <div className="label">Approved media IDs (comma separated)</div>
            <textarea
              value={albumMediaIds}
              onChange={(event) => setAlbumMediaIds(event.target.value)}
              rows={3}
              className="input"
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Create album
          </button>
        </form>
        <p className="muted">Hint: use approved IDs like {`{${approvedMedia[0]?.id || 'id1,id2' }}`}</p>
      </section>

      <section className="card">
        <h3 className="section-head">Albums</h3>
        <label>
          <div className="label">Share password</div>
          <input className="input" value={sharePassword} onChange={(event) => setSharePassword(event.target.value)} placeholder="shared-password" />
        </label>
        <ul>
          {eventPayload.albums?.map((album: any) => (
            <li key={album.id} className="list-item">
              <strong>{album.title}</strong>
              <button className="btn btn-subtle" onClick={() => createShareLink(album.id)}>
                Generate private share link
              </button>
            </li>
          ))}
        </ul>
      </section>

      {statusMessage ? <p>{statusMessage}</p> : null}
    </div>
  );
}
