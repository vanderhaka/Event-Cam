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

  async function load(event?: FormEvent) {
    if (event) event.preventDefault();

    const response = await fetch(`/api/albums/${albumId}/public?token=${encodeURIComponent(token)}&password=${encodeURIComponent(password)}`);
    const body = await response.json();

    if (response.ok) {
      setPayload(body);
      setMessage('');
    } else {
      setPayload(null);
      setMessage(body.message || 'Unable to load album');
    }
  }

  useEffect(() => {
    if (token && password) {
      load();
    }
  }, [albumId, token, password]);

  if (!token) {
    return <p className="muted">Missing share token.</p>;
  }

  return (
    <section className="card">
      {!payload ? (
      <form onSubmit={load} className="grid">
          <label>
            <div className="label">Share password</div>
            <input className="input" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          <button className="btn btn-primary" type="submit">
            Open album
          </button>
          {message ? <p>{message}</p> : null}
        </form>
      ) : (
        <div className="grid">
          <h2>{payload.album.title}</h2>
          {payload.items.map((item: any) => (
            <article key={item.id} className="media-block">
              {item.mediaType === 'image' ? (
                <img className="media-preview" src={item.url} alt={item.name || 'photo'} />
              ) : (
                <video controls className="media-preview" src={item.url} />
              )}
              <p className="muted">{item.invitedBy?.display_name || 'Anonymous'}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
