'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

function decodeURIComponentSafe(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default function ScanPage() {
  const params = useParams<{ inviteToken: string | string[] }>();
  const rawInviteToken = Array.isArray(params.inviteToken) ? params.inviteToken[0] : params.inviteToken;
  const inviteToken = rawInviteToken?.trim();
  const normalizedInviteToken = inviteToken ? decodeURIComponentSafe(inviteToken) : '';

  const [info, setInfo] = useState<any>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [consent, setConsent] = useState(false);
  const [tagCsv, setTagCsv] = useState('');
  const [durationSec, setDurationSec] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | 'info'>('info');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [errorState, setErrorState] = useState<'not_found' | 'expired' | 'generic' | null>(null);

  // Hide the main navigation for the guest scan page
  useEffect(() => {
    document.body.classList.add('guest-page');
    return () => { document.body.classList.remove('guest-page'); };
  }, []);

  async function loadInfo() {
    if (!normalizedInviteToken) {
      setErrorState('not_found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/invite/${normalizedInviteToken}`);
      const payload = await response.json();

      if (response.ok) {
        setInfo(payload);
        setErrorState(null);
      } else {
        const code = payload.code || '';
        if (code === 'TOKEN_NOT_FOUND' || response.status === 404) {
          setErrorState('not_found');
        } else if (code === 'EVENT_WINDOW_CLOSED' || code === 'EXPIRED') {
          setErrorState('expired');
        } else {
          setErrorState('generic');
        }
      }
    } catch {
      setErrorState('generic');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInfo();
  }, [normalizedInviteToken]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!files || files.length === 0) {
      setMessage('Please pick at least one file');
      setMessageType('error');
      return;
    }

    if (!consent) {
      setMessage('You must agree to the consent before uploading');
      setMessageType('error');
      return;
    }

    setUploading(true);
    setMessage('');

    const fileList = Array.from(files);
    let completed = 0;

    try {
      for (const mediaFile of fileList) {
        setMessage(`Uploading ${completed + 1}/${fileList.length}: ${mediaFile.name || 'media'}…`);
        setMessageType('info');

        const formData = new FormData();
        formData.append('file', mediaFile);
        formData.append('consent', 'true');
        formData.append('tags', tagCsv);
        formData.append('durationSec', durationSec);

        const response = await fetch(`/api/invite/${normalizedInviteToken}/media`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const payload = await response.json();
          throw new Error(`Upload ${mediaFile.name || 'media'} failed: ${payload.message || 'Upload failed'}`);
        }

        await response.json();
        completed += 1;
      }

      setMessage(`${completed} file${completed > 1 ? 's' : ''} uploaded successfully! They are now available in the event gallery.`);
      setMessageType('success');
      setFiles(null);
      setTagCsv('');
      setDurationSec('');
      // Reset the file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setMessage((error as Error).message || 'Upload failed');
      setMessageType('error');
    } finally {
      setUploading(false);
    }
  }

  // --- Loading state ---
  if (loading) {
    return (
      <div className="scan-layout">
        <div className="scan-header">
          <h1 className="brand">
            <span className="brand-mark">Event</span> Cam
          </h1>
        </div>
        <section className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <p className="muted">Loading your invite...</p>
        </section>
      </div>
    );
  }

  // --- Error states ---
  if (errorState) {
    const errorContent = {
      not_found: {
        title: 'Invite not found',
        desc: 'This QR code doesn\u2019t match any active invite. Please check with the event host for a valid link.',
      },
      expired: {
        title: 'Upload window closed',
        desc: 'The upload window for this event has ended. Contact the event host if you believe this is a mistake.',
      },
      generic: {
        title: 'Something went wrong',
        desc: 'We couldn\u2019t load your invite. Please try again or contact the event host.',
      },
    }[errorState];

    return (
      <div className="scan-layout">
        <div className="scan-header">
          <h1 className="brand">
            <span className="brand-mark">Event</span> Cam
          </h1>
        </div>
        <section className="card error-card">
          <h2 className="error-title">{errorContent.title}</h2>
          <p className="error-desc">{errorContent.desc}</p>
        </section>
      </div>
    );
  }

  // --- Upload form ---
  return (
    <div className="scan-layout">
      <div className="scan-header">
        <h1 className="brand">
          <span className="brand-mark">Event</span> Cam
        </h1>
      </div>

      <section className="card">
        <h2 className="section-head">{info.event.name}</h2>
        <p className="section-sub">
          {info.event.eventType === 'open'
            ? 'Upload your photos and videos below. They appear in the event gallery right after upload.'
            : <>Hi <strong>{info.invitee.displayName}</strong> — upload your photos and videos below. They appear in the event gallery right after upload.</>
        </p>

        <form onSubmit={submit} className="form-grid">
          <div className="file-upload-area">
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              capture="environment"
              onChange={(e) => setFiles(e.target.files)}
            />
            <p className="file-upload-text">
              {files && files.length > 0
                ? <strong>{files.length} file{files.length > 1 ? 's' : ''} selected</strong>
                : <>Tap to <strong>choose photos or videos</strong>, or use your camera</>
              }
            </p>
          </div>

          <label>
            <div className="label">Tags <span className="label-hint">(optional — e.g. &quot;ceremony&quot;, &quot;reception&quot;)</span></div>
            <input className="input" value={tagCsv} onChange={(e) => setTagCsv(e.target.value)} placeholder="e.g. ceremony, reception" />
          </label>

          <label className="checkbox-row">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>I confirm my photos and videos can be attributed to me and shared in the event gallery.</span>
          </label>

          <button className="btn btn-primary btn-lg" type="submit" disabled={uploading || !files || files.length === 0 || !consent}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {message && (
          <div className={`message ${messageType === 'error' ? 'message-error' : messageType === 'success' ? 'message-success' : 'message-info'}`}>
            {message}
          </div>
        )}
      </section>
    </div>
  );
}
