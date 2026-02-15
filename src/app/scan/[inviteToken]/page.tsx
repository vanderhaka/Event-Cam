'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

function decodeURIComponentSafe(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

type MobileSupportConfig = {
  uploadSupported: boolean;
  fileCaptureMode: 'environment' | undefined;
  mobileSupportMessage: string;
  isMobileViewport: boolean;
};

function computeMobileSupport(): MobileSupportConfig {
  const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
  const isPortrait = window.innerHeight >= window.innerWidth;
  const isIOS = /iPhone|iPad|iPod/.test(window.navigator.userAgent);
  const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
  const supportsUpload = typeof File !== 'undefined' && typeof FormData !== 'undefined' && typeof FileList !== 'undefined';

  const supportMessage = supportsUpload
    ? (isMobileViewport || isMobileDevice) && !isPortrait
      ? 'For best upload results on mobile, rotate your device to portrait mode.'
      : ''
    : 'Your browser does not support file uploads. Please use a modern mobile browser.';

  return {
    uploadSupported: supportsUpload,
    fileCaptureMode: isIOS ? 'environment' : undefined,
    mobileSupportMessage: supportMessage,
    isMobileViewport,
  };
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
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [contributorEmail, setContributorEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [emailMessageType, setEmailMessageType] = useState<'error' | 'success' | 'info'>('info');
  const [capturingEmail, setCapturingEmail] = useState(false);
  const [fileCaptureMode, setFileCaptureMode] = useState<'environment' | undefined>(undefined);
  const [uploadSupported, setUploadSupported] = useState(true);
  const [mobileSupportMessage, setMobileSupportMessage] = useState('');
  const [errorState, setErrorState] = useState<'not_found' | 'expired' | 'generic' | null>(null);

  // Hide the main navigation for the guest scan page
  useEffect(() => {
    document.body.classList.add('guest-page');
    return () => { document.body.classList.remove('guest-page'); };
  }, []);

  useEffect(() => {
    const updateDeviceConfig = () => {
      if (typeof window === 'undefined') {
        return;
      }
      const settings = computeMobileSupport();
      setFileCaptureMode(settings.fileCaptureMode);
      setUploadSupported(settings.uploadSupported);
      setMobileSupportMessage(settings.mobileSupportMessage);
    };

    updateDeviceConfig();
    window.addEventListener('resize', updateDeviceConfig);
    window.addEventListener('orientationchange', updateDeviceConfig);
    return () => {
      window.removeEventListener('resize', updateDeviceConfig);
      window.removeEventListener('orientationchange', updateDeviceConfig);
    };
  }, []);

  const loadInfo = useCallback(async () => {
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
  }, [normalizedInviteToken]);

  useEffect(() => {
    loadInfo();
  }, [loadInfo]);

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

    if (!uploadSupported) {
      setMessage('Your browser does not support file uploads. Please use a modern mobile browser.');
      setMessageType('error');
      return;
    }

    setUploading(true);
    setMessage('');
    setEmailMessage('');

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
      setShowEmailCapture(true);
      setTagCsv('');
      setDurationSec('');
      // Reset the file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setMessage((error as Error).message || 'Upload failed');
      setMessageType('error');
      setShowEmailCapture(false);
    } finally {
      setUploading(false);
    }
  }

  async function submitEmailCapture(event: FormEvent) {
    event.preventDefault();

    if (!contributorEmail.trim()) {
      setEmailMessage('Please enter an email address');
      setEmailMessageType('error');
      return;
    }

    if (!marketingConsent) {
      setEmailMessage('Please confirm marketing consent before saving');
      setEmailMessageType('error');
      return;
    }

    setCapturingEmail(true);
    setEmailMessage('');

    try {
      const response = await fetch(`/api/invite/${normalizedInviteToken}/contact`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: contributorEmail.trim(),
          marketingConsent,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message || 'Unable to save your email');
      }

      setEmailMessage('Email preference saved.');
      setEmailMessageType('success');
      setContributorEmail('');
      setMarketingConsent(false);
    } catch (error) {
      setEmailMessage((error as Error).message || 'Unable to save email');
      setEmailMessageType('error');
    } finally {
      setCapturingEmail(false);
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
          }
        </p>

        <form onSubmit={submit} className="form-grid">
          <div className="file-upload-area">
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              capture={fileCaptureMode}
              disabled={!uploadSupported}
              onChange={(e) => setFiles(e.target.files)}
            />
            {mobileSupportMessage ? <p className="muted" style={{ marginTop: '0.5rem' }}>{mobileSupportMessage}</p> : null}
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

          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={uploading || !uploadSupported || !files || files.length === 0 || !consent}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {message && (
          <div className={`message ${messageType === 'error' ? 'message-error' : messageType === 'success' ? 'message-success' : 'message-info'}`}>
            {message}
          </div>
        )}

        {showEmailCapture && (
          <form onSubmit={submitEmailCapture} className="form-grid" style={{ marginTop: '1rem' }}>
            <label>
              <div className="label">Email (optional)</div>
              <input
                type="email"
                className="input"
                value={contributorEmail}
                onChange={(e) => setContributorEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={capturingEmail}
              />
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                disabled={capturingEmail}
              />
              <span>I agree to receive marketing and event updates.</span>
            </label>

            <button className="btn btn-subtle btn-lg" type="submit" disabled={capturingEmail}>
              {capturingEmail ? 'Saving...' : 'Save email preference'}
            </button>

            {emailMessage && (
              <div className={`message ${emailMessageType === 'error' ? 'message-error' : emailMessageType === 'success' ? 'message-success' : 'message-info'}`}>
                {emailMessage}
              </div>
            )}
          </form>
        )}
      </section>
    </div>
  );
}
