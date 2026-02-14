# Event Cam MVP

A mobile-first Next.js app for invite-only event photo/video collection:

- Organizer creates an event and adds invitees.
- Organizer pays Stripe for invite count.
- Publishing creates unique QR URLs per invite.
- Scanning a QR opens contributor upload flow with mandatory consent.
- Uploaded media is stored in Supabase Storage and enters moderation.
- Organizer creates curated albums and protected links with password + optional expiry/limits.

## Tech stack

- Next.js App Router
- Supabase (Auth, Postgres, Storage)
- Stripe Checkout

## Quick setup

1. Install dependencies:

```bash
npm install
```

2. Copy env vars:

```bash
cp .env.example .env.local
```

3. Fill:

- Supabase URL / anon key / service role key
- Stripe secret key and webhook secret
- Event fee defaults and token salt

4. Apply database schema:

Run `supabase/schema.sql` in your Supabase database SQL editor.

5. Start dev server:

```bash
npm run dev
```

## Vercel deployment

For production (e.g. `event-cam-qr-test.vercel.app`), set these in **Vercel → Project → Settings → Environment Variables**:

- `NEXT_PUBLIC_SUPABASE_URL` – Supabase project URL  
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Supabase anon/public key  
- **`SUPABASE_SERVICE_ROLE_KEY`** – Supabase **service role** key (Dashboard → Settings → API). Required for server-side queries (e.g. listing events). If missing, `/api/events` returns 500.  
- Stripe and other vars from `.env.example` as needed.

## API routes implemented

- `POST /api/events`
- `POST /api/events/{eventId}/invitees`
- `POST /api/events/{eventId}/checkout`
- `POST /api/events/{eventId}/publish`
- `GET /api/invite/{inviteToken}`
- `POST /api/invite/{inviteToken}/media`
- `GET /api/events/{eventId}/moderation`
- `POST /api/events/{eventId}/media/{mediaId}/approve`
- `POST /api/events/{eventId}/media/{mediaId}/reject`
- `POST /api/events/{eventId}/albums`
- `POST /api/albums/{albumId}/share-links`
- `GET /api/albums/{albumId}/public`
- `POST /api/stripe/webhook`

## Notes

- This is a working MVP scaffold, not production hardened.
- Add throttling, webhook signature hardening, and stricter validation before launch.
- Event media bucket is private; moderation and album views use time-limited signed URLs so only the event host or valid share-link viewers can access files.
- Set `EVENT_CAM_ALLOW_UNPAID=1` for local/dev deployments to bypass publish payment checks when testing QR flows.
