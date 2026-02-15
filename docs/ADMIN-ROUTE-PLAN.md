# Admin Route & Email System Restructure Plan

**Created:** 2026-02-15
**Status:** Plan — not yet implemented
**Scope:** Super-admin route, role system, and separation of platform-level email management from host dashboard

---

## Problem statement

The email system (contacts, bulk send, send history, unsubscribe management) is currently embedded in the **host dashboard** at `/dashboard/events/[eventId]`. This is wrong for two reasons:

1. **The flywheel email flow is a platform concern.** Capturing guest emails, sending album deliveries to grow the user base, managing unsubscribes, and (eventually) nurture sequences are decisions made by the platform operator — not individual event hosts.
2. **There is no admin route at all.** No way for the platform owner to see cross-event data, monitor email health, manage contacts globally, or control platform-level email behaviour.

### What stays on the host dashboard

| Feature | Why it belongs to the host |
|---|---|
| "Share album" (generate link, send to a specific person) | Host decides who to share with |
| Upload digest toggle + frequency | Host controls their own notification preference |
| Reply-to address | Host personalisation |

### What moves to admin

| Feature | Why it belongs to admin |
|---|---|
| Guest contact list (all events, cross-platform) | Platform growth metric, not per-host data |
| Bulk send ("email album to all contacts") | Platform-triggered flywheel action |
| Send history / email log | Platform monitoring |
| Unsubscribe management | Compliance is platform responsibility |
| Email templates (hardcoded for now) | Platform branding, not host-editable |
| Future: nurture sequences | Platform marketing automation |
| Future: email analytics (open rates, bounces) | Platform health monitoring |

---

## 1. Role system

### Approach: `admin_users` table

A simple allow-list table rather than a role column on auth.users. This avoids touching the Supabase auth schema and keeps the admin list explicit and auditable.

```sql
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade unique,
  role text not null default 'super_admin' check (role in ('super_admin', 'admin')),
  granted_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create index admin_users_user_idx on public.admin_users (user_id);
```

**Role definitions:**

| Role | Access |
|---|---|
| `super_admin` | Full admin access. Can grant/revoke other admins. |
| `admin` | Full admin access except managing other admins. |

**Seed:** The first admin is inserted manually via a migration or SQL console using the Supabase user ID of the platform owner.

### Auth helper

New function in `src/lib/auth.ts`:

```typescript
export async function requireAdmin() {
  const { user, supabase, userId } = await requireHostUser();
  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from('admin_users')
    .select('role')
    .eq('user_id', userId)
    .single();

  if (!data) {
    throw new ApiError('Forbidden', 403);
  }

  return { user, supabase, userId, adminRole: data.role as string };
}

export async function requireSuperAdmin() {
  const result = await requireAdmin();
  if (result.adminRole !== 'super_admin') {
    throw new ApiError('Forbidden', 403);
  }
  return result;
}
```

---

## 2. Admin route structure

### URL layout

```
/admin                          → Admin dashboard (overview stats)
/admin/emails                   → Email management hub
/admin/emails/contacts          → Cross-event contact list
/admin/emails/sends             → Global send history / email log
/admin/emails/templates         → View email templates (read-only for now)
/admin/events                   → All events on the platform
/admin/events/[eventId]         → Admin view of a specific event
/admin/users                    → User management (future)
```

### File structure

```
src/app/admin/
├── layout.tsx                  → Admin layout with nav, auth gate
├── page.tsx                    → Dashboard: key stats, recent activity
├── emails/
│   ├── page.tsx                → Email hub: quick stats + links to sub-pages
│   ├── contacts/
│   │   └── page.tsx            → Cross-event contact list with search, filter, export
│   └── sends/
│       └── page.tsx            → Paginated email log with filters (type, status, date)
└── events/
    ├── page.tsx                → All events list with search + status filter
    └── [eventId]/
        └── page.tsx            → Admin event detail (contacts, sends, albums for one event)
```

### Admin layout (`/admin/layout.tsx`)

- Client component that checks admin status on mount
- Redirects to `/dashboard` if not admin
- Renders a sidebar/top-nav with links to admin sections
- Shows current admin user info

---

## 3. Admin API routes

New API routes under `/api/admin/` — all gated by `requireAdmin()`.

### 3a. Admin stats

**`GET /api/admin/stats`**

Returns platform-level metrics for the admin dashboard.

```json
{
  "totalEvents": 42,
  "totalContacts": 1280,
  "totalEmailsSent": 3400,
  "contactsWithConsent": 980,
  "unsubscribedCount": 45,
  "recentSends": [{ "id": "...", "recipient_email": "...", "email_type": "...", "created_at": "..." }]
}
```

### 3b. Contacts (cross-event)

**`GET /api/admin/contacts`**

Query params: `?page=1&limit=50&search=gmail&event_id=...&consent=true&unsubscribed=false`

Returns paginated contact list across all events with:
- Email, display name, event name, consent status, unsubscribe status
- Total count for pagination
- CSV export via `?format=csv`

**`DELETE /api/admin/contacts/[contactId]`**

Unsubscribe a specific contact (sets `unsubscribed_at`).

### 3c. Email sends (global log)

**`GET /api/admin/sends`**

Query params: `?page=1&limit=50&type=album_delivery&status=sent&from=2026-01-01&to=2026-02-15`

Returns paginated send history across all events with:
- Recipient, email type, event name, status, resend_id, timestamp
- Total count for pagination

### 3d. Events list (admin view)

**`GET /api/admin/events`**

Query params: `?page=1&limit=50&search=wedding&status=published`

Returns all events with host email, contact count, send count, status.

### 3e. Bulk send trigger

**`POST /api/admin/events/[eventId]/send-album-to-contacts`**

Admin-triggered bulk send for a specific event's album. Same logic as the current `send-to-guests` endpoint but accessible only to admins.

Body: `{ "albumId": "...", "password": "..." }`

---

## 4. Admin UI pages

### 4a. Admin dashboard (`/admin/page.tsx`)

Overview cards:
- Total events (by status breakdown)
- Total guest contacts captured (with consent %)
- Total emails sent (by type breakdown)
- Unsubscribe rate
- Recent activity feed (last 10 email sends)

### 4b. Email contacts page (`/admin/emails/contacts/page.tsx`)

- Search bar (search by email or event name)
- Filters: consent status, unsubscribed, event
- Table: email, display name, event name, consent, subscribed/unsubscribed, emails received, captured date
- Bulk export CSV button
- Per-row: unsubscribe button

### 4c. Email sends page (`/admin/emails/sends/page.tsx`)

- Filters: email type, date range, event
- Table: recipient, email type, event name, status, resend_id, sent date
- Pagination

### 4d. Events list page (`/admin/events/page.tsx`)

- Search + status filter
- Table: event name, host email, status, guest count, contact count, emails sent, created date
- Click through to admin event detail

### 4e. Admin event detail (`/admin/events/[eventId]/page.tsx`)

Admin-specific view of a single event:
- Event info header (name, host, status, dates)
- Contacts for this event (same as current contacts tab, but admin-accessible)
- Send history for this event
- Albums with admin bulk-send trigger
- Email settings (read-only view of host's settings)

---

## 5. Changes to host dashboard

### Remove from host dashboard

- **Contacts tab** — remove entirely. Hosts don't need to manage the platform's contact list.
- **"Email album to all contacts" button** — remove from albums tab. This is an admin action.
- **Contact-related state** — remove `contacts`, `contactsLoading`, `exportingContacts`, `removingContactId`, `loadContacts()`, `exportContacts()`, `removeContact()` and all contact tab UI.

### Keep on host dashboard

- **Email tab** — keep but simplify to only host-facing settings:
  - Upload digest toggle + frequency
  - Reply-to address
  - Remove `album_auto_send` toggle (this is a platform decision)
- **Album section** — keep "Generate share link" and "Send album email" (single recipient). Remove bulk send.
- **Single-recipient email send** — host sends an album link to a specific person they know. This stays.

### Rename email tab

Rename from "Email" to "Notifications" since it now only controls the host's own notification preferences.

---

## 6. Database migration

Single migration file: `supabase/migrations/20260216000000_add_admin_users.sql`

```sql
-- Admin users allow-list
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade unique,
  role text not null default 'super_admin' check (role in ('super_admin', 'admin')),
  granted_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create index admin_users_user_idx on public.admin_users (user_id);
```

**Note:** The first super_admin must be seeded manually after deployment:
```sql
insert into public.admin_users (user_id, role)
values ('<your-supabase-user-id>', 'super_admin');
```

---

## 7. Implementation order

### Phase 1 — Admin foundation (build first)

| Step | What | Files |
|---|---|---|
| 1 | Add `admin_users` migration | `supabase/migrations/20260216000000_add_admin_users.sql` |
| 2 | Add `requireAdmin()` and `requireSuperAdmin()` to auth helpers | `src/lib/auth.ts` |
| 3 | Create admin layout with auth gate and nav | `src/app/admin/layout.tsx` |
| 4 | Build admin stats API | `src/app/api/admin/stats/route.ts` |
| 5 | Build admin dashboard page with overview cards | `src/app/admin/page.tsx` |

### Phase 2 — Email management in admin

| Step | What | Files |
|---|---|---|
| 6 | Build admin contacts API (paginated, searchable, CSV export) | `src/app/api/admin/contacts/route.ts` |
| 7 | Build admin contacts page | `src/app/admin/emails/contacts/page.tsx` |
| 8 | Build admin sends API (paginated, filterable) | `src/app/api/admin/sends/route.ts` |
| 9 | Build admin sends page | `src/app/admin/emails/sends/page.tsx` |
| 10 | Build admin email hub page | `src/app/admin/emails/page.tsx` |

### Phase 3 — Admin event management

| Step | What | Files |
|---|---|---|
| 11 | Build admin events list API | `src/app/api/admin/events/route.ts` |
| 12 | Build admin events list page | `src/app/admin/events/page.tsx` |
| 13 | Build admin event detail page (with contacts, sends, bulk send) | `src/app/admin/events/[eventId]/page.tsx` |
| 14 | Build admin bulk send API | `src/app/api/admin/events/[eventId]/send-album-to-contacts/route.ts` |

### Phase 4 — Clean up host dashboard

| Step | What | Files |
|---|---|---|
| 15 | Remove contacts tab from host event detail page | `src/app/dashboard/events/[eventId]/page.tsx` |
| 16 | Remove "email album to all contacts" button from albums | `src/app/dashboard/events/[eventId]/page.tsx` |
| 17 | Simplify email tab → "Notifications" (digest + reply-to only) | `src/app/dashboard/events/[eventId]/page.tsx` |
| 18 | Remove `album_auto_send` toggle (admin controls this) | `src/app/dashboard/events/[eventId]/page.tsx` |
| 19 | Clean up unused state, callbacks, and imports | `src/app/dashboard/events/[eventId]/page.tsx` |

### Phase 5 — Polish and future

| Step | What |
|---|---|
| 20 | Add admin user management page (grant/revoke admin) |
| 21 | Add email template preview page in admin |
| 22 | Wire `album_auto_send` as a platform-level setting in admin |
| 23 | Add Resend webhook integration for delivery/bounce tracking |

---

## 8. Security considerations

- All `/api/admin/*` routes must call `requireAdmin()` before any data access
- Admin layout must client-side check admin status and redirect non-admins
- Admin API routes use `createSupabaseAdminClient()` (service role) since they query across all events, not just the current user's
- No RLS bypass needed — admin routes already use the service role client
- Admin actions should be logged to `event_action_logs` with `actor = 'admin'` (requires adding `'admin'` to the actor check constraint if one exists)

---

## 9. What NOT to build yet

| Item | Why defer |
|---|---|
| Admin user invitation flow (email-based) | Manual SQL seed is fine for 1-2 admins |
| Email template editor | Hardcoded templates work until proven otherwise |
| Real-time email analytics | Use Resend dashboard until volume justifies custom UI |
| Admin audit log | Low priority — can add when multiple admins exist |
| Admin-to-host messaging | Not needed for MVP |

---

*Phase 1 is the priority. Everything else follows from having an admin role check and a protected route.*
