 'use client';

import { FormEvent, useEffect, useState } from 'react';

export default function QrTestPage() {
  const [token, setToken] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [warnLocalHost, setWarnLocalHost] = useState(false);

  useEffect(() => {
    const currentOrigin = window.location.origin;
    setBaseUrl(currentOrigin);
    try {
      const hostname = new URL(currentOrigin).hostname;
      setWarnLocalHost(hostname === 'localhost' || hostname === '127.0.0.1');

      const params = new URLSearchParams(window.location.search);
      const initialToken = params.get('token')?.trim();
      if (initialToken) {
        setToken(initialToken);
      }
    } catch {
      setWarnLocalHost(false);
    }
  }, []);

  const normalizedToken = token.trim();
  const normalizedBaseUrl = baseUrl.trim().replace(/\/+$/, '');
  const isPlaceholderToken = /^test-token$/i.test(normalizedToken);
  const scanUrl = normalizedToken && normalizedBaseUrl ? `${normalizedBaseUrl}/scan/${encodeURIComponent(normalizedToken)}` : '';
  const qrImageUrl = scanUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=420x420&data=${encodeURIComponent(scanUrl)}`
    : '';

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (scanUrl) {
      window.open(scanUrl, '_blank');
    }
  };

  return (
    <section className="card">
      <h2 className="section-head">Temporary QR Test Page</h2>
      <p className="muted">Use this to generate a QR code for an invite token you created in host publish flow.</p>
      <form onSubmit={onSubmit} className="form-grid">
        <label>
          <div className="label">Invite token</div>
          <input className="input" value={token} onChange={(event) => setToken(event.target.value)} />
        </label>
        <label>
          <div className="label">Base URL</div>
          <input className="input" value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} />
          <p className="muted">Use your phone-accessible URL, for example <code>http://192.168.1.45:3002</code>.</p>
        </label>
        <div className="row">
          <button className="btn btn-primary" type="submit" disabled={!scanUrl}>
            Open scan URL
          </button>
          {scanUrl ? (
            <a href={scanUrl} className="btn btn-subtle" target="_blank" rel="noreferrer">
              Open encoded target
            </a>
          ) : null}
        </div>
      </form>

      {isPlaceholderToken ? (
        <p className="muted">
          <strong>Warning:</strong> `test-token` is a placeholder and is not a real invite token. Publish an event first, then
          paste a real token here.
        </p>
      ) : null}

      {warnLocalHost ? (
        <p className="muted">
          Warning: this page detected <strong>localhost</strong>. Phones cannot open localhost, so replace Base URL with your local
          network IP (for example <strong>http://192.168.x.x:3002</strong>), then regenerate.
        </p>
      ) : null}

      {scanUrl ? (
        <>
        <div className="stack-small">
            <p className="muted">QR encodes: {scanUrl}</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrImageUrl}
            alt={`QR code for ${scanUrl}`}
            width={420}
            height={420}
            className="media-preview"
          />
        </>
      ) : (
        <p className="muted">Enter a token to generate a QR code.</p>
      )}
    </section>
  );
}
