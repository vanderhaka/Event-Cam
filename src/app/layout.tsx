import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Event Cam',
  description: 'Invite-only event photo and video collection',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="top-shell">
          <header>
            <h1 className="brand">
              <span className="brand-mark">Event</span> Cam
            </h1>
            <p className="subtitle">Simple media collection for private events</p>
            <nav className="nav">
              <Link href="/" className="link">
                Home
              </Link>
              <Link href="/dashboard" className="link">
                Host dashboard
              </Link>
              <Link href="/auth/login" className="link">
                Login
              </Link>
              <Link href="/auth/register" className="link">
                Register
              </Link>
            </nav>
          </header>
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
