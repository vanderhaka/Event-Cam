import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="grid">
      <div className="card hero">
        <h2 className="section-head">Capture every event in seconds</h2>
        <p className="muted section-sub">
          Hosts create events, attach invitees, print or email QR links, and collect uploads from mobile users without needing a separate app.
        </p>
        <div className="row">
          <Link href="/auth/login" className="btn btn-primary">
            Organizer Login
          </Link>
          <Link href="/auth/register" className="btn btn-secondary">
            Create Organizer Account
          </Link>
        </div>
      </div>
    </section>
  );
}
