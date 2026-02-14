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
          <div className="header-left">
            <Link href="/">
              <h1 className="brand">
                <span className="brand-mark">Event</span> Cam
              </h1>
            </Link>
          </div>
          <nav className="nav">
            <Link href="/" className="link">
              Home
            </Link>
            <Link href="/dashboard" className="link">
              Dashboard
            </Link>
            <span className="nav-divider" />
            <Link href="/auth/login" className="link">
              Login
            </Link>
            <Link href="/auth/register" className="link btn btn-sm btn-primary">
              Sign Up
            </Link>
          </nav>
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
