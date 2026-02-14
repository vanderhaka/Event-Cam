'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ScanPage() {
  const { inviteToken } = useParams<{ inviteToken: string }>();
  const [info, setInfo] = useState<any>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [consent, setConsent] = useState(false);
  const [tagCsv, setTagCsv] = useState('');
  const [durationSec, setDurationSec] = useState('');
  const [message, setMessage] = useState('');
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [errorCode, setErrorCode] = useState('');

  async function loadInfo() {
    console.debug('[scan page] loading invite', { inviteToken });
    const response = await fetch(`/api/invite/${inviteToken}`);
    console.debug('[scan page] invite response', { status: response.status });
    const payload = await response.json();
    if (response.ok) {
      setInfo(payload);
      setStatusCode(200);
      setErrorCode('');
    } else {
      setStatusCode(response.status);
      setErrorCode(payload.code || 'UNKNOWN');
      setMessage(payload.message || 'Could not load invite details');
      console.error('[scan page] invite lookup failed', payload);
    }
  }

  useEffect(() => {
    loadInfo();
  }, [inviteToken]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!files || files.length === 0) {
      setMessage('Please pick at least one file');
      return;
    }

    if (!consent) {
      setMessage('Consent is required before upload');
      return;
    }

    const uploads = Array.from(files).map(async (mediaFile) => {
      const formData = new FormData();
      formData.append('file', mediaFile);
      formData.append('consent', 'true');
      formData.append('tags', tagCsv);
      formData.append('durationSec', durationSec);
      const response = await fetch(`/api/invite/${inviteToken}/media`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.message || 'Upload failed');
      }
      return response.json();
    });

    try {
      await Promise.all(uploads);
      setMessage('Upload complete');
      setFiles(null);
      setTagCsv('');
      setDurationSec('');
    } catch (error) {
      setMessage((error as Error).message);
    }
  }

  if (!info) {
    return (
      <section className="card">
        <p className="muted">{message || 'Loading...'}</p>
        {statusCode ? <p className="muted">{`HTTP ${statusCode}${errorCode ? ` · ${errorCode}` : ''}`}</p> : null}
      </section>
    );
  }

  return (
    <section className="card">
      <h2 className="section-head">{info.event.name}</h2>
      <p className="muted">
        Uploading as <strong>{info.invitee.displayName}</strong>
      </p>
      <p className="muted">Upload your photos and 20s videos before the event window closes.</p>

      <form onSubmit={submit} className="form-grid">
        <label>
          <div className="label">Files</div>
          <input
            className="input"
            type="file"
            accept="image/*,video/*"
            multiple
            capture="environment"
            onChange={(event) => setFiles(event.target.files)}
          />
        </label>
        <label>
          <div className="label">Optional tags (comma separated)</div>
          <input className="input" value={tagCsv} onChange={(event) => setTagCsv(event.target.value)} placeholder="James and Mel" />
        </label>
        <label>
          <div className="label">Duration (seconds, optional for videos)</div>
          <input className="input" value={durationSec} onChange={(event) => setDurationSec(event.target.value)} type="number" min="0" />
        </label>
        <label className="row">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
          <span>I confirm photos and videos can be attributed to me and reviewed before publication.</span>
        </label>
        <button className="btn btn-primary" type="submit">
          Upload
        </button>
      </form>

      <p>{message}</p>
    </section>
  );
}
