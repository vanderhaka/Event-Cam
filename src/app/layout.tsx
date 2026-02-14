import type { Metadata } from 'next';
import Link from 'next/link';
import { HeaderNav } from '@/components/HeaderNav';
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
          <HeaderNav />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
