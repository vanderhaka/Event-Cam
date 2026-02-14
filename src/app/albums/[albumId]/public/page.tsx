'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

export default function PublicAlbumPage() {
  const { albumId } = useParams<{ albumId: string }>();
  const search = useSearchParams();
  const token = search.get('share') || search.get('token') || '';

  const [password, setPassword] = useState('');
  const [payload, setPayload] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function load(event?: FormEvent) {
    if (event) event.preventDefault();
    setLoading(true);
    setMessage('');

    const response = await fetch(`/api/albums/${albumId}/public?token=${encodeURIComponent(token)}&password=${encodeURIComponent(password)}`);
    const body = await response.json();

    if (response.ok) {
      setPayload(body);
      setMessage('');
    } else {
      setPayload(null);
      setMessage(body.message || 'Unable to load album');
    }
    setLoading(false);
  }

  useEffect(() => {
    if (token && password) {
      load();
    }
  }, [albumId, token, password]);

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
              {message && <div className="message message-error">{message}</div>}
            </form>
          </section>
        </div>
      ) : (
        <div className="grid" style={{ gap: '1.25rem' }}>
          <section className="card" style={{ textAlign: 'center' }}>
            <h2 className="section-head">{payload.album.title}</h2>
            <p className="muted">{payload.items.length} item{payload.items.length !== 1 ? 's' : ''}</p>
          </section>
          {payload.items.map((item: any) => (
            <article key={item.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
              {item.mediaType === 'image' ? (
                <img
                  style={{ width: '100%', display: 'block', borderRadius: 'var(--radius) var(--radius) 0 0' }}
                  src={item.url}
                  alt={item.name || 'photo'}
                />
              ) : (
                <video
                  controls
                  style={{ width: '100%', display: 'block', borderRadius: 'var(--radius) var(--radius) 0 0' }}
                  src={item.url}
                />
              )}
              <div style={{ padding: '0.75rem 1rem' }}>
                <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>
                  {item.invitedBy?.display_name || 'Anonymous'}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
