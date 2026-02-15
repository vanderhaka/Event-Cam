# Email Flows Plan

**Created:** 2026-02-15
**Status:** Plan — partially implemented (Phases 1–3 implemented, phase 4 deferred)
**Scope:** Admin backend for email flow configuration + automated email delivery

---

## Current state

| What exists | Where |
|---|---|
| Resend SDK integration (lazy-init) | `src/lib/email.ts` |
| Album delivery email template | `src/lib/email.ts` → `sendAlbumDeliveryEmail()` |
| Manual "send album email" per album | `src/app/api/albums/[albumId]/send-email/route.ts` |
| Guest email capture after upload | `src/app/api/invite/[inviteToken]/contact/route.ts` |
| Email stored as JSON in action logs | `event_action_logs.metadata.email` (not a proper table) |
| Marketing consent flag | `event_action_logs.metadata.marketingConsent` |

### Key problems

1. **No contacts table.** Guest emails live in `event_action_logs` metadata JSON. Can't query, deduplicate, or manage them efficiently.
2. **No automated sends.** Host must manually type each recipient email. No "send to all guests" action.
3. **No host notifications.** No email on payment, publish, or new uploads.
4. **No unsubscribe handling.** Required by CAN-SPAM / GDPR for marketing emails.
5. **No send history.** Can't tell if a guest already received the album link.

---

## Database changes

### New table: `guest_contacts`

Dedicated table for captured guest emails. Replaces the current pattern of storing emails in `event_action_logs.metadata`.

```sql
create table if not exists public.guest_contacts (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  invitee_id uuid references public.invitees (id) on delete set null,
  email text not null,
  marketing_consent boolean not null default false,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),

  unique (event_id, email)
);

create index guest_contacts_event_idx on public.guest_contacts (event_id);
```

**Why a separate table:**
- Queryable: `select * from guest_contacts where event_id = ? and unsubscribed_at is null`
- Deduplication: unique constraint on `(event_id, email)` prevents duplicates
- Unsubscribe tracking: `unsubscribed_at` column for compliance
- Joins: can join to `invitees` for display name context

### New table: `email_sends`

Track every email sent to prevent double-sending and provide history.

```sql
create table if not exists public.email_sends (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  album_id uuid references public.albums (id) on delete set null,
  recipient_email text not null,
  email_type text not null,
  resend_id text,
  status text not null default 'sent',
  created_at timestamptz not null default now()
);

create index email_sends_event_idx on public.email_sends (event_id);
create index email_sends_recipient_idx on public.email_sends (recipient_email, email_type);
```

**`email_type` values:** `album_delivery`, `host_event_published`, `host_upload_digest`, `guest_nurture`

### New table: `email_settings`

Per-event email configuration. One row per event.

```sql
create table if not exists public.email_settings (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade unique,
  album_auto_send boolean not null default false,
  host_upload_digest boolean not null default true,
  digest_frequency text not null default 'daily' check (digest_frequency in ('immediate', 'daily', 'off')),
  reply_to text,
  updated_at timestamptz not null default now()
);
```

---

## Email flows

### Flow 1: Album delivery to captured guests (growth loop critical)

**Trigger:** Host clicks "Send album to all guests" on an album.

**Logic:**
1. Query `guest_contacts` for event where `unsubscribed_at is null` and `marketing_consent = true`
2. Filter out anyone already in `email_sends` for this album with `email_type = 'album_delivery'`
3. Find active share link for the album
4. Send album delivery email to each remaining contact
5. Record each send in `email_sends`
6. Show host a summary: "Sent to X guests, Y already received, Z unsubscribed"

**API:** `POST /api/albums/[albumId]/send-to-guests`

**Dashboard UI:** Button per album: "Email album to guests (X contacts)"

**Priority:** Highest. This closes the flywheel.

---

### Flow 2: Host notification — event published

**Trigger:** Event status changes to `published` (in `src/app/api/events/[eventId]/publish/route.ts`).

**Logic:**
1. Look up host email from `auth.users`
2. Send confirmation email with event name, guest count, and QR code preview link

**Template content:**
- Subject: "Your event is live — QR codes are ready"
- Body: event name, date, guest count, link to dashboard, reminder to print QR codes

**Priority:** Medium. Nice-to-have for host confidence.

---

### Flow 3: Host notification — upload digest

**Trigger:** Cron job or on-demand check (daily by default, configurable per event).

**Logic:**
1. Query events with `email_settings.host_upload_digest = true`
2. For each, count new `media_items` since last digest send
3. If count > 0, send digest email to host
4. Record in `email_sends` with `email_type = 'host_upload_digest'`

**Template content:**
- Subject: "X new photos uploaded to [Event Name]"
- Body: photo count, thumbnail previews (if feasible), link to moderation queue

**Implementation note:** Vercel Cron Jobs can trigger a `/api/cron/upload-digest` endpoint daily. Free tier supports 1 cron job.

**Priority:** Medium. Useful once events have real traffic.

---

### Flow 4: Guest nurture (deferred — post-validation)

**Trigger:** Time-based, after album delivery. Only for guests with `marketing_consent = true`.

**Logic:**
1. 7 days after album delivery email, send a follow-up
2. Content: "Planning your own event? Get started in 2 minutes."
3. Track via `email_sends` with `email_type = 'guest_nurture'`

**Priority:** Low. Defer until 500+ guest emails captured (per LAUNCH-PLAYBOOK.md deferred items). The album delivery email itself is the first touchpoint — conversion data from that needs to exist before building a nurture sequence.

---

## Admin backend — email settings UI

### Location

New tab on the event detail page: **"Email"** (alongside Invitees, Guest uploads, Albums).

### Settings panel

| Setting | Control | Default |
|---|---|---|
| Auto-send album to guests on share link creation | Toggle | Off |
| Host upload digest | Toggle | On |
| Digest frequency | Select: Immediate / Daily / Off | Daily |
| Reply-to address | Text input | Host's account email |

### Guest contacts panel

| Feature | Description |
|---|---|
| Contact list | Table showing: email, display name (from invitee), captured date, consent status, emails sent |
| Export | "Export CSV" button — downloads email, name, consent date |
| Remove | Per-contact remove button (sets `unsubscribed_at`, doesn't delete) |
| Bulk send | "Send album to all contacts" button (per album) |
| Send history | Expandable section showing all `email_sends` for this event |

### Unsubscribe flow

Every marketing email includes a one-click unsubscribe link:
```
/api/unsubscribe?token={hmac_signed_token}
```

- Token encodes `(contact_id, event_id)` signed with `EVENT_CAM_TOKEN_SALT`
- GET request sets `unsubscribed_at` on the `guest_contacts` row
- Shows a simple confirmation page: "You've been unsubscribed."
- Required by CAN-SPAM. Non-negotiable before sending marketing emails at scale.

---

## Implementation order

### Phase 1 — Close the flywheel (build next)

| Step | What | Files |
|---|---|---|
| 1 | Add `guest_contacts` migration | `supabase/migrations/` |
| 2 | Update contact capture endpoint to write to `guest_contacts` instead of just action logs | `src/app/api/invite/[inviteToken]/contact/route.ts` |
| 3 | Add `email_sends` migration | `supabase/migrations/` |
| 4 | Build "Send album to all guests" endpoint | `src/app/api/albums/[albumId]/send-to-guests/route.ts` |
| 5 | Add bulk send button to dashboard Albums tab | `src/app/dashboard/events/[eventId]/page.tsx` |
| 6 | Add unsubscribe endpoint + confirmation page | `src/app/api/unsubscribe/route.ts`, `src/app/unsubscribe/page.tsx` |
| 7 | Add unsubscribe link to email template | `src/lib/email.ts` |

**Estimated effort:** 8-12 hours

### Phase 2 — Host notifications

| Step | What | Files |
|---|---|---|
| 8 | Add `email_settings` migration | `supabase/migrations/` |
| 9 | Add host publish notification (inline in publish endpoint) | `src/app/api/events/[eventId]/publish/route.ts`, `src/lib/email.ts` |
| 10 | Add email settings UI tab on event detail page | `src/app/dashboard/events/[eventId]/page.tsx` |

**Estimated effort:** 4-6 hours

### Phase 3 — Upload digest + contacts management

| Step | What | Files |
|---|---|---|
| 11 | Add upload digest cron endpoint | `src/app/api/cron/upload-digest/route.ts` |
| 12 | Configure Vercel Cron Job | `vercel.json` |
| 13 | Add guest contacts panel to dashboard | `src/app/dashboard/events/[eventId]/page.tsx` |
| 14 | Add CSV export endpoint | `src/app/api/events/[eventId]/contacts/route.ts` |

**Estimated effort:** 6-8 hours

### Phase 4 — Nurture sequence (deferred)

Only after 500+ guest emails captured and album delivery conversion data exists.

| Step | What |
|---|---|
| 15 | Design nurture email template |
| 16 | Build time-based trigger (cron or queue) |
| 17 | A/B test subject lines |

**Estimated effort:** 4-6 hours

---

## What to explicitly NOT build yet

| Item | Why defer |
|---|---|
| Drag-and-drop email template editor | Overkill for MVP. Hardcoded templates are fine. |
| Per-guest email personalization | No data to personalize with yet. |
| Email analytics dashboard (open rates, clicks) | Use Resend's built-in dashboard until volume justifies custom UI. |
| Multiple email templates per event | One album delivery template is enough. |
| Scheduled sends / send-later | Manual trigger is fine at this scale. |
| Webhook for Resend delivery events | Only needed if tracking bounces/complaints at scale. |

---

## Email templates needed

| Template | Subject | When built |
|---|---|---|
| Album delivery (exists) | "Your [Event] photos are ready" | Done |
| Album delivery + unsubscribe | Same but with unsubscribe footer | Phase 1 |
| Host: event published | "Your event is live — QR codes are ready" | Phase 2 |
| Host: upload digest | "X new photos uploaded to [Event]" | Phase 3 |
| Guest: nurture | "Planning your own event?" | Phase 4 |

---

## Compliance checklist for email flows

- [ ] Every marketing email has a one-click unsubscribe link
- [ ] Unsubscribe is processed within 24 hours (instant in our case)
- [ ] Album delivery emails are transactional (no unsubscribe required) — but include one anyway for trust
- [ ] `marketing_consent = true` is verified before any non-transactional send
- [ ] `guest_contacts` respects event deletion cascade
- [ ] No email sent to addresses with `unsubscribed_at` set
- [ ] Resend handles bounce/complaint processing automatically
- [ ] From address matches a verified domain (required before leaving Resend test mode)

---

*Phase 1 is the priority. Everything else follows from having a working guest contact list and bulk send capability.*
