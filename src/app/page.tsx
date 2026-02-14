import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="grid" style={{ gap: '1.5rem' }}>
      {/* Hero */}
      <section className="card hero">
        <h2 className="section-head">Capture every moment, effortlessly</h2>
        <p className="muted section-sub">
          Create events, share QR codes with guests, and collect all photos and videos in one beautiful album — no app downloads required.
        </p>
        <div className="row" style={{ gap: '0.75rem' }}>
          <Link href="/auth/login" className="btn btn-primary btn-lg">
            Organizer Login
          </Link>
          <Link href="/auth/register" className="btn btn-secondary btn-lg">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="card" style={{ textAlign: 'center' }}>
        <h3 className="section-head" style={{ marginBottom: '1.5rem' }}>How it works</h3>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h4>Create your event</h4>
            <p>Set up event details, dates, and add your guest list in minutes.</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h4>Share QR codes</h4>
            <p>Each guest receives a unique QR code via email, text, or print.</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h4>Guests upload</h4>
            <p>Guests scan the QR and instantly upload photos and videos from their phone.</p>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <h4>Curate and share</h4>
            <p>Review uploads, create albums, and share password-protected galleries.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon" style={{ background: '#dbeafe' }}>
            <span>&#128247;</span>
          </div>
          <h3>No App Required</h3>
          <p>Guests upload directly from their phone browser. No downloads, no sign-ups, no friction.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" style={{ background: '#f0fdf4' }}>
            <span>&#9989;</span>
          </div>
          <h3>Moderation Built In</h3>
          <p>Review every photo and video before it hits the album. Approve or reject with one tap.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" style={{ background: '#fef3c7' }}>
            <span>&#128279;</span>
          </div>
          <h3>Private Sharing</h3>
          <p>Generate password-protected album links with view limits and expiration dates.</p>
        </div>
      </div>
    </div>
  );
}
