# Event Cam — Sitemap & Page Flow

A single source of truth for routes and how users move through the app. Update this when adding or changing pages.

---

## Public routes (no auth)

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Landing: hero, “How it works”, feature cards. CTAs → Login, Register. |
| `/auth/login` | Login | Sign in. On success → Dashboard. On “user not found” → Register with email prefilled. |
| `/auth/register` | Register | Sign up. Email confirm → Dashboard (via `/api/auth/confirm-new-user`). Link to Login. |
| `/scan/[inviteToken]` | Guest scan | **Guest-only.** No main nav. Load invite via `/api/invite/[inviteToken]`. Upload media. States: not_found, expired, generic. |
| `/albums/[albumId]/public` | Public album | **Recipient-only.** Requires `?share=<token>` (or `?token=`). Password gate, then gallery. |
| `/qr-test` | QR test | **Dev/utility.** Enter token, preview scan URL and QR. Optional `?token=`. |

---

## Authenticated routes (organizer)

| Path | Page | Description |
|------|------|-------------|
| `/dashboard` | Dashboard | Event list. “+ New Event” form. Cards link to `/dashboard/events/[eventId]`. Unauthenticated → redirect to Login. |
| `/dashboard/events/[eventId]` | Event detail | Tabs: Invitees / Event QR, Moderation, Albums. Back link → Dashboard. Checkout → Stripe; Publish → issue QR. Share links point to `/albums/[albumId]/public?share=...`. |

---

## Page flow (high level)

```
                         ┌─────────────┐
                         │     /      │  Home
                         │   (root)   │
                         └─────┬─────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
  │ /auth/login │       │/auth/register│       │ /dashboard  │  (if already logged in)
  └──────┬──────┘       └──────┬──────┘       └──────┬──────┘
         │                     │                     │
         │  success             │  confirm email      │
         └──────────────┬──────┴──────────────────────┘
                        │
                        ▼
                 ┌─────────────┐
                 │ /dashboard  │  Event list
                 └──────┬──────┘
                        │  click event
                        ▼
                 ┌─────────────────────────┐
                 │ /dashboard/events/[id]  │  Invitees | Moderation | Albums
                 └──────┬──────────────────┘
                        │
                        │  “Show QR” → scan URL = /scan/{inviteToken}
                        │  “Generate share link” → /albums/[albumId]/public?share=...
                        └───────────────────────────────────────────────────

  Guest / recipient flows (no login):

  QR or link                    Share link
       │                              │
       ▼                              ▼
  ┌──────────────┐            ┌─────────────────────────┐
  │ /scan/[token]│            │ /albums/[id]/public     │
  │ (upload)     │            │ ?share=... + password   │
  └──────────────┘            └─────────────────────────┘
```

---

## Flow notes

- **Home → Auth:** Home links to Login and Register. Header shows Login / Sign Up when logged out, “Hey, {name}” + Log out when logged in.
- **Login:** Success → Dashboard. Error (e.g. user not found) → redirect to Register with `?email=...`.
- **Register:** After signup, Supabase email confirmation; confirm handler sends user to Dashboard.
- **Dashboard:** Requires session; 401 from `/api/events` → redirect to Login. Event cards → `/dashboard/events/[eventId]`.
- **Event detail:** “Back to events” → Dashboard. Invitees tab: “Show QR” opens modal with URL `{origin}/scan/{qr_token}`. Albums tab: “Generate share link” produces URL to `/albums/[albumId]/public?share=...` (recipient enters password on that page).
- **Scan page:** Entry only via invite token (QR or direct URL). No link from main nav; body gets `.guest-page` for styling. Uses `/api/invite/[inviteToken]` and `/api/invite/[inviteToken]/media` (POST).
- **Public album:** Must have `share` or `token` query param. Password submitted to `/api/albums/[albumId]/public`; on success, gallery shown.

---

## API routes (reference)

Not part of “page” flow but used by the above:

- `POST /api/auth/logout` — clear session; app redirects to `/`
- `GET/POST /api/events` — list / create events
- `GET /api/events/[eventId]` — event detail (invitees, albums)
- `POST /api/events/[eventId]/invitees` — add invitees
- `POST /api/events/[eventId]/checkout` — Stripe checkout
- `POST /api/events/[eventId]/publish` — publish QR codes
- `GET /api/events/[eventId]/moderation` — pending/approved media
- `POST /api/events/[eventId]/media/[mediaId]/approve|reject`
- `POST /api/events/[eventId]/albums` — create album
- `POST /api/albums/[albumId]/share-links` — create share link
- `GET /api/invite/[inviteToken]` — invite info for scan page
- `POST /api/invite/[inviteToken]/media` — guest upload
- `GET /api/albums/[albumId]/public` — public album (with token + password)
- `POST /api/auth/confirm-new-user` — email confirmation callback
- Stripe webhook: `POST /api/stripe/webhook`

---

## File locations (App Router)

| Route | File |
|-------|------|
| `/` | `src/app/page.tsx` |
| `/auth/login` | `src/app/auth/login/page.tsx` |
| `/auth/register` | `src/app/auth/register/page.tsx` |
| `/dashboard` | `src/app/dashboard/page.tsx` |
| `/dashboard/events/[eventId]` | `src/app/dashboard/events/[eventId]/page.tsx` |
| `/scan/[inviteToken]` | `src/app/scan/[inviteToken]/page.tsx` |
| `/albums/[albumId]/public` | `src/app/albums/[albumId]/public/page.tsx` |
| `/qr-test` | `src/app/qr-test/page.tsx` |

Shared UI: `src/components/HeaderNav.tsx` (used in `src/app/layout.tsx`).
