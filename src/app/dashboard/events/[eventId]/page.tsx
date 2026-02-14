'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
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
  const [statusType, setStatusType] = useState<'error' | 'success' | 'info'>('info');
  const [albumTitle, setAlbumTitle] = useState('');
  const [selectedMediaIds, setSelectedMediaIds] = useState<Set<string>>(new Set());
  const [sharePassword, setSharePassword] = useState('');
  const [activeTab, setActiveTab] = useState<'invitees' | 'moderation' | 'albums'>('invitees');
  const [baseOrigin, setBaseOrigin] = useState('');
  const [qrModalInvitee, setQrModalInvitee] = useState<any>(null);
  useEffect(() => {
    setBaseOrigin(typeof window !== 'undefined' ? window.location.origin : '');
  }, []);

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

  function showStatus(msg: string, type: 'error' | 'success' | 'info' = 'info') {
    setStatusMessage(msg);
    setStatusType(type);
    if (type === 'success') {
      setTimeout(() => setStatusMessage(''), 4000);
    }
  }

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
      showStatus('Add at least one invitee with a first name', 'error');
      return;
    }

    const response = await fetchWithAuth(`/api/events/${eventId}/invitees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invitees }),
    });

    if (response.ok) {
      setInviteeRows([{ firstName: '', lastName: '', phone: '' }]);
      showStatus('Invitees added successfully', 'success');
      await loadData();
    } else {
      const payload = await response.json();
      showStatus(payload.message || 'Could not add invitees', 'error');
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
    showStatus(payload.message || 'Checkout failed', 'error');
  }

  async function publishEvent() {
    const response = await fetchWithAuth(`/api/events/${eventId}/publish`, { method: 'POST' });
    const payload = await response.json();
    if (response.ok) {
      showStatus(`Published! ${payload.issued?.length ?? 0} invitees received QR codes.`, 'success');
      await loadData();
    } else {
      showStatus(payload.message || 'Publish failed', 'error');
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
      showStatus(`Media ${action}d`, 'success');
    } else {
      const payload = await response.json();
      showStatus(payload.message || `Could not ${action} media`, 'error');
    }
  }

  function toggleMediaSelection(mediaId: string) {
    setSelectedMediaIds((prev) => {
      const next = new Set(prev);
      if (next.has(mediaId)) {
        next.delete(mediaId);
      } else {
        next.add(mediaId);
      }
      return next;
    });
  }

  function selectAllMedia() {
    if (selectedMediaIds.size === approvedMedia.length) {
      setSelectedMediaIds(new Set());
    } else {
      setSelectedMediaIds(new Set(approvedMedia.map((m) => m.id)));
    }
  }

  async function createAlbum(event: FormEvent) {
    event.preventDefault();
    if (selectedMediaIds.size === 0) {
      showStatus('Select at least one approved media item', 'error');
      return;
    }
    const response = await fetchWithAuth(`/api/events/${eventId}/albums`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: albumTitle,
        mediaIds: Array.from(selectedMediaIds),
      }),
    });

    const payload = await response.json();
    if (response.ok) {
      showStatus('Album created successfully', 'success');
      setAlbumTitle('');
      setSelectedMediaIds(new Set());
      await loadData();
    } else {
      showStatus(payload.message || 'Could not create album', 'error');
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
      showStatus('Share link copied to clipboard!', 'success');
    } else {
      showStatus(payload.message || 'Could not create share link', 'error');
    }
  }

  if (!eventPayload) {
    return (
      <section className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p className="muted">Loading event...</p>
      </section>
    );
  }

  const tabStyle = (tab: string) => ({
    padding: '0.5rem 1rem',
    border: 'none',
    background: activeTab === tab ? 'var(--accent)' : 'transparent',
    color: activeTab === tab ? '#fff' : 'var(--muted)',
    fontWeight: 600 as const,
    borderRadius: '10px',
    cursor: 'pointer' as const,
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  });

  return (
    <div className="grid">
      {/* Back link + Event header */}
      <div>
        <Link href="/dashboard" className="link" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'inline-block' }}>
          &larr; Back to events
        </Link>
        <section className="card">
          <div className="row-center" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h2 className="section-head" style={{ display: 'inline' }}>{eventPayload.event?.name}</h2>
              <span
                className={`status-chip ${
                  eventPayload.event?.status === 'checkout_pending' ? 'pending' : eventPayload.event?.status
                }`}
                role="status"
                style={{ marginLeft: '0.75rem' }}
              >
                {eventPayload.event?.status}
              </span>
              <p className="muted" style={{ margin: '0.4rem 0 0', fontSize: '0.88rem' }}>
                {readableDate(eventPayload.event?.start_at)} &mdash; {readableDate(eventPayload.event?.end_at)}
              </p>
              {eventPayload.event?.location && (
                <p className="muted" style={{ margin: '0.15rem 0 0', fontSize: '0.85rem' }}>{eventPayload.event.location}</p>
              )}
            </div>
            <div className="row" style={{ gap: '0.5rem' }}>
              <button className="btn btn-subtle btn-sm" onClick={checkout}>
                Checkout
              </button>
              <button className="btn btn-success btn-sm" onClick={publishEvent}>
                Publish QR Codes
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Status message */}
      {statusMessage && (
        <div className={`message ${statusType === 'error' ? 'message-error' : statusType === 'success' ? 'message-success' : 'message-info'}`}>
          {statusMessage}
        </div>
      )}

      {/* Tab navigation */}
      <div className="row-center" style={{ gap: '0.25rem', background: 'var(--surface-soft)', padding: '0.3rem', borderRadius: '12px', width: 'fit-content' }}>
        <button style={tabStyle('invitees')} onClick={() => setActiveTab('invitees')}>
          Invitees ({eventPayload.invitees?.length ?? 0})
        </button>
        <button style={tabStyle('moderation')} onClick={() => setActiveTab('moderation')}>
          Moderation ({pendingQueue.length})
        </button>
        <button style={tabStyle('albums')} onClick={() => setActiveTab('albums')}>
          Albums ({eventPayload.albums?.length ?? 0})
        </button>
      </div>

      {/* ─── Invitees Tab ─── */}
      {activeTab === 'invitees' && (
        <>
          <section className="card">
            <h3 className="section-head">Add invitees</h3>
            <p className="section-sub">Add the people you want to invite. They will each get a unique QR code after publishing.</p>
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

          {eventPayload.invitees && eventPayload.invitees.length > 0 && (
            <section className="card">
              <h3 className="section-head">Guest list</h3>
              <p className="section-sub">{eventPayload.invitees.length} invitee{eventPayload.invitees.length !== 1 ? 's' : ''}. Click &quot;Show QR&quot; to see the scan link and QR code.</p>
              <ul className="invitee-list">
                {eventPayload.invitees.map((invitee: any) => (
                  <li key={invitee.id} className="invitee-item">
                    <div>
                      <span className="invitee-name">{invitee.display_name}</span>
                    </div>
                    <div className="invitee-item-actions">
                      <span className={`status-chip ${invitee.qr_state === 'issued' ? 'published' : 'draft'}`}>
                        {invitee.qr_state === 'issued' ? 'QR Issued' : 'Pending'}
                      </span>
                      {invitee.qr_state === 'issued' && invitee.qr_token && (
                        <button
                          type="button"
                          className="btn btn-subtle btn-sm"
                          onClick={() => setQrModalInvitee(invitee)}
                        >
                          Show QR
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* QR modal */}
          {qrModalInvitee && baseOrigin && (() => {
            const scanUrl = `${baseOrigin}/scan/${encodeURIComponent(qrModalInvitee.qr_token)}`;
            const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(scanUrl)}`;
            return (
              <div className="modal-backdrop" onClick={() => setQrModalInvitee(null)} role="presentation">
                <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3 className="modal-title">Scan link — {qrModalInvitee.display_name}</h3>
                    <button type="button" className="modal-close" onClick={() => setQrModalInvitee(null)} aria-label="Close">
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <img
                      src={qrImageUrl}
                      alt={`QR code for ${qrModalInvitee.display_name}`}
                      width={280}
                      height={280}
                      className="qr-modal-image"
                    />
                    <div className="qr-modal-actions">
                      <a href={scanUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                        Open scan page
                      </a>
                      <span className="qr-modal-url muted">{scanUrl}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </>
      )}

      {/* ─── Moderation Tab ─── */}
      {activeTab === 'moderation' && (
        <>
          <section className="card">
            <h3 className="section-head">Pending review</h3>
            <p className="section-sub">Review uploaded media before it goes into an album.</p>
            {pendingQueue.length === 0 ? (
              <div className="empty-state">
                <p>No pending uploads to review</p>
              </div>
            ) : (
              <div className="mod-card-grid">
                {pendingQueue.map((item) => (
                  <div key={item.id} className="mod-card">
                    <div className="mod-card-preview">
                      {item.media_type === 'video' ? (
                        item.url ? (
                          <video src={item.url} className="mod-card-media" controls muted playsInline />
                        ) : (
                          <div className="mod-card-placeholder">Video</div>
                        )
                      ) : item.url ? (
                        <img src={item.url} alt={item.original_name || 'Upload'} className="mod-card-media" />
                      ) : (
                        <div className="mod-card-placeholder">Image</div>
                      )}
                    </div>
                    <div className="mod-card-info">
                      <strong className="mod-card-name">{item.original_name || 'Upload'}</strong>
                      {item.invitee && (
                        <span className="mod-card-from muted">from {item.invitee.display_name}</span>
                      )}
                    </div>
                    <div className="mod-card-actions">
                      <button className="btn btn-success btn-sm" onClick={() => moderate(item.id, 'approve')}>
                        Approve
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => moderate(item.id, 'reject')}>
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {approvedMedia.length > 0 && (
            <section className="card">
              <h3 className="section-head">Approved media</h3>
              <p className="section-sub">{approvedMedia.length} item{approvedMedia.length !== 1 ? 's' : ''} approved</p>
              <ul className="invitee-list">
                {approvedMedia.map((item) => (
                  <li key={item.id} className="invitee-item">
                    <div>
                      <span className="invitee-name">{item.original_name || 'Upload'}</span>
                      <span className="invitee-meta" style={{ marginLeft: '0.5rem' }}>
                        {item.media_type}
                        {item.invitee ? ` \u2014 ${item.invitee.display_name}` : ''}
                      </span>
                    </div>
                    <span className="status-chip paid">Approved</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      {/* ─── Albums Tab ─── */}
      {activeTab === 'albums' && (
        <>
          <section className="card">
            <h3 className="section-head">Create album</h3>
            <p className="section-sub">
              Select approved media items and group them into a shareable album.
            </p>
            <form onSubmit={createAlbum} className="form-grid">
              <label>
                <div className="label">Album title</div>
                <input className="input" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} required placeholder="e.g. Ceremony Highlights" />
              </label>

              {approvedMedia.length > 0 ? (
                <div>
                  <div className="row-center" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div className="label" style={{ margin: 0 }}>Select media ({selectedMediaIds.size} selected)</div>
                    <button type="button" className="btn btn-subtle btn-sm" onClick={selectAllMedia}>
                      {selectedMediaIds.size === approvedMedia.length ? 'Deselect all' : 'Select all'}
                    </button>
                  </div>
                  <div className="media-select-grid">
                    {approvedMedia.map((item) => (
                      <div
                        key={item.id}
                        className={`media-select-item ${selectedMediaIds.has(item.id) ? 'selected' : ''}`}
                        onClick={() => toggleMediaSelection(item.id)}
                      >
                        {selectedMediaIds.has(item.id) && <span className="check-mark">{'\u2713'}</span>}
                        <div className="media-type-badge">{item.media_type}</div>
                        <div className="media-name">{item.original_name || 'Upload'}</div>
                        {item.invitee && <div className="invitee-meta">{item.invitee.display_name}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="muted" style={{ fontSize: '0.88rem' }}>No approved media yet. Review pending uploads in the Moderation tab first.</p>
              )}

              <button className="btn btn-primary" type="submit" disabled={selectedMediaIds.size === 0}>
                Create Album ({selectedMediaIds.size} items)
              </button>
            </form>
          </section>

          {eventPayload.albums && eventPayload.albums.length > 0 && (
            <section className="card">
              <h3 className="section-head">Your albums</h3>
              <div style={{ marginBottom: '0.75rem' }}>
                <label>
                  <div className="label">Share password</div>
                  <input className="input" value={sharePassword} onChange={(e) => setSharePassword(e.target.value)} placeholder="Set a password for share links" style={{ maxWidth: '300px' }} />
                </label>
              </div>
              <ul className="album-list">
                {eventPayload.albums.map((album: any) => (
                  <li key={album.id} className="album-item">
                    <strong>{album.title}</strong>
                    <button className="btn btn-subtle btn-sm" onClick={() => createShareLink(album.id)}>
                      Generate share link
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
