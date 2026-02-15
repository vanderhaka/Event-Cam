/* eslint-disable @next/next/no-img-element */
'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

type SortOrder = 'newest' | 'oldest';

export default function PublicAlbumPage() {
  const { albumId } = useParams<{ albumId: string }>();
  const search = useSearchParams();
  const token = search.get('share') || search.get('token') || '';

  const [password, setPassword] = useState('');
  const [payload, setPayload] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const [reporting, setReporting] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [preview, setPreview] = useState<any | null>(null);
  const [manualShareLink, setManualShareLink] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);

  const orderedItems = useMemo(() => {
    if (!payload?.items) {
      return [];
    }
    return [...payload.items].sort((a, b) => {
      const aAt = new Date(a.uploadedAt || '').getTime();
      const bAt = new Date(b.uploadedAt || '').getTime();
      return sortOrder === 'oldest' ? aAt - bAt : bAt - aAt;
    });
  }, [payload, sortOrder]);

  function setCopyStatus(text: string) {
    setCopyMessage(text);
    setTimeout(() => {
      setCopyMessage('');
    }, 1500);
  }

  function shareUrlFromState() {
    if (typeof window === 'undefined' || !token || !password) {
      return '';
    }
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('token', token);
    searchParams.set('password', password);
    searchParams.set('order', sortOrder);
    return `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
  }

  const load = useCallback(
    async (event?: FormEvent, nextSortOrder: SortOrder = sortOrder) => {
      if (event) event.preventDefault();
      setLoading(true);
      setMessage('');
      setPayload(null);

      const response = await fetch(
        `/api/albums/${albumId}/public?token=${encodeURIComponent(token)}&password=${encodeURIComponent(password)}&order=${nextSortOrder}`,
      );
      const body = await response.json();

      if (response.ok) {
        setSortOrder(nextSortOrder);
        setPayload(body);
        setMessage('');
      } else {
        setPayload(null);
        setMessage(body.message || 'Unable to load album');
      }
      setLoading(false);
    },
    [albumId, password, sortOrder, token]
  );

  async function copyShareUrl() {
    const shareUrl = shareUrlFromState();
    if (!shareUrl) {
      setCopyStatus('Share link unavailable');
      return;
    }

    setCopyMessage('');
    setManualShareLink('');
    const forceClipboardFailure = process.env.NODE_ENV !== 'production'
      && typeof window !== 'undefined'
      && new URLSearchParams(window.location.search).get('forceClipboardFailure') === '1';

    const isMobileViewport = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const isMobileUserAgent = typeof window !== 'undefined'
      ? /(Mobi|Android|iPhone|iPad|iPod|Mobile)/i.test(window.navigator.userAgent)
      : false;
    const isMobileContext = isMobileViewport || isMobileUserAgent;

    try {
      if (forceClipboardFailure) {
        throw new Error('Clipboard failure forced for QA');
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus('Share link copied');
      return;
    } catch {
      if (isMobileContext) {
        setManualShareLink(shareUrl);
        setCopyStatus('Clipboard blocked. Tap the link below to copy it manually.');
        return;
      }
      const manualCopy = window.prompt('Copy this link:', shareUrl);
      if (manualCopy) {
        setCopyStatus('Link captured');
      }
    }
  }

  async function report(mediaId: string) {
    const reason = window.prompt('Why should this media be reviewed?');
    if (!reason) {
      return;
    }

    if (!payload?.album?.event_id) {
      setMessage('Unable to submit report for this item');
      return;
    }

    setReporting(mediaId);
    try {
      const response = await fetch(`/api/events/${payload.album.event_id}/media/${mediaId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      if (response.ok) {
        setMessage('Report submitted. Thanks for helping keep the gallery safe.');
        return;
      }
      const body = await response.json();
      setMessage(body.message || 'Unable to submit report');
    } finally {
      setReporting(null);
    }
  }

  async function downloadFile(url: string, filename: string, itemId?: string) {
    if (itemId) setDownloading(itemId);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open in new tab
      window.open(url, '_blank');
    } finally {
      if (itemId) setDownloading(null);
    }
  }

  async function downloadAll() {
    setDownloadingAll(true);
    try {
      const response = await fetch(
        `/api/albums/${albumId}/download?token=${encodeURIComponent(token)}&password=${encodeURIComponent(password)}`,
      );
      if (!response.ok) return;
      const { items } = await response.json();
      for (const item of items) {
        if (item.downloadUrl) {
          await downloadFile(item.downloadUrl, item.name);
          await new Promise((resolve) => setTimeout(resolve, 600));
        }
      }
    } finally {
      setDownloadingAll(false);
    }
  }

  function openPreview(item: any) {
    if (!item.url) {
      return;
    }
    setPreview(item);
  }

  function closePreview() {
    setPreview(null);
  }

  useEffect(() => {
    if (token && password) {
      void load(undefined, sortOrder);
    }
  }, [load, sortOrder, token, password]);

  if (!token) {
    return (
      <div className="auth-wrapper">
        <section className="card error-card">
          <h2 className="error-title">Missing share link</h2>
          <p className="error-desc">This album link appears to be incomplete. Please check with the event host for the correct link.</p>
        </section>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      {!payload ? (
        <div className="auth-wrapper">
          <section className="card">
            <h2 className="section-head" style={{ textAlign: 'center' }}>Private Album</h2>
            <p className="section-sub" style={{ textAlign: 'center' }}>Enter the password to view this album</p>
            <form onSubmit={load} className="form-grid">
              <label>
                <div className="label">Password</div>
                <input
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  placeholder="Enter album password"
                />
              </label>
              <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
                {loading ? 'Opening...' : 'Open Album'}
              </button>
              {loading && <p className="muted" style={{ textAlign: 'center' }}>Loading album...</p>}
              {message && <div className="message message-error">{message}</div>}
            </form>
          </section>
        </div>
      ) : (
        <div className="grid" style={{ gap: '1.25rem' }}>
          <section className="card" style={{ textAlign: 'center' }}>
            <h2 className="section-head">{payload.album.title}</h2>
            <p className="muted">{payload.items.length} item{payload.items.length !== 1 ? 's' : ''}</p>
            <div className="row" style={{ justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
              <button
                type="button"
                className={sortOrder === 'newest' ? 'btn btn-primary btn-sm' : 'btn btn-subtle btn-sm'}
                onClick={() => setSortOrder('newest')}
              >
                Newest first
              </button>
              <button
                type="button"
                className={sortOrder === 'oldest' ? 'btn btn-primary btn-sm' : 'btn btn-subtle btn-sm'}
                onClick={() => setSortOrder('oldest')}
              >
                Oldest first
              </button>
              <button type="button" className="btn btn-subtle btn-sm" onClick={copyShareUrl}>
                Copy share link
              </button>
              <button
                type="button"
                className="btn btn-subtle btn-sm"
                onClick={downloadAll}
                disabled={downloadingAll || orderedItems.length === 0}
              >
                {downloadingAll ? 'Downloading...' : 'Download all'}
              </button>
            </div>
            {copyMessage && <p className="muted" style={{ fontSize: '0.85rem', margin: '0.5rem 0 0' }}>{copyMessage}</p>}
            {manualShareLink ? (
              <div style={{ marginTop: '0.5rem' }}>
                <input className="input" readOnly value={manualShareLink} aria-label="Manual share link" />
                <p className="muted" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                  Long-press the link and choose Copy.
                </p>
              </div>
            ) : null}
          </section>
          {orderedItems.map((item: any) => (
            <article key={item.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
              {item.mediaType === 'image' ? (
                <img
                  loading="lazy"
                  style={{ width: '100%', display: 'block', borderRadius: 'var(--radius) var(--radius) 0 0', cursor: 'zoom-in' }}
                  src={item.url}
                  alt={item.name || 'photo'}
                  onClick={() => openPreview(item)}
                />
              ) : (
                <video
                  controls
                  preload="metadata"
                  style={{ width: '100%', display: 'block', borderRadius: 'var(--radius) var(--radius) 0 0', cursor: 'zoom-in' }}
                  src={item.url}
                  onClick={() => openPreview(item)}
                />
              )}
              <div style={{ padding: '0.75rem 1rem' }}>
                <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>
                  {item.invitedBy?.display_name || 'Anonymous'}
                </p>
                <div className="row" style={{ gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn btn-subtle btn-sm"
                    onClick={() => item.url && downloadFile(item.url, item.name || `photo-${item.id}`, item.id)}
                    disabled={downloading === item.id || !item.url}
                  >
                    {downloading === item.id ? 'Saving...' : 'Download'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-subtle btn-sm"
                    onClick={() => report(item.id)}
                    disabled={reporting === item.id}
                  >
                    {reporting === item.id ? 'Submitting…' : 'Report'}
                  </button>
                </div>
              </div>
            </article>
          ))}
          {preview && (
            <div className="modal-backdrop" onClick={closePreview} role="presentation">
              <div
                className="modal-card"
                onClick={(event) => event.stopPropagation()}
                style={{ maxWidth: '92vw', width: 'fit-content' }}
              >
                {preview.mediaType === 'image' ? (
                  <img src={preview.url} alt={preview.name || 'photo'} style={{ width: '100%', display: 'block' }} />
                ) : (
                  <video controls src={preview.url} style={{ width: '100%', display: 'block' }} />
                )}
                <button type="button" className="btn btn-subtle" onClick={closePreview} style={{ marginTop: '0.75rem' }}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
