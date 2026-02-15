# Super-Admin Route Plan

**Created:** 2026-02-15
**Status:** Plan — not yet implemented
**Scope:** Platform-level admin dashboard for monitoring, configuration, and operations

---

## Problem statement

There is no way for the platform owner to see what's happening across Event Cam as a whole. Every view in the app is scoped to a single host and their events. As the platform grows, the operator needs:

- **Visibility** — how many events, uploads, emails, revenue across the whole platform
- **Operations** — flagged content, abuse reports, compliance status
- **Configuration** — platform-wide settings (pricing, feature flags, email defaults)
- **User oversight** — who is using the platform, which hosts are active, any issues

### What the admin is NOT

The admin does **not** manage individual events. Hosts manage their own events, contacts, albums, and email sends through the existing host dashboard. The admin route is a read-heavy operations dashboard with a small number of platform-level write actions (suspend user, resolve report, update config).

### What stays on the host dashboard (unchanged)

Everything that's there today:

| Feature | Owner |
|---|---|
| Create/edit/delete events | Host |
| Manage invitees and guest list | Host |
| Moderate uploaded media | Host |
| Create albums, share links | Host |
| "Email album to all contacts" (bulk send) | Host |
| Guest contacts tab (per-event) | Host |
| Email settings (digest, reply-to, auto-send) | Host |
| Send album to single recipient | Host |

---

## 1. Role system

### Approach: `admin_users` allow-list table

Simple table, no changes to Supabase auth schema. One role for now — `super_admin`. A second tier (`admin` — read-only) can be added later if needed.

```sql
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade unique,
  role text not null default 'super_admin' check (role in ('super_admin')),
  granted_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create index admin_users_user_idx on public.admin_users (user_id);
```

**Seed:** Insert the platform owner manually after deployment:
```sql
insert into public.admin_users (user_id, role)
values ('<your-supabase-user-id>', 'super_admin');
```

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
```

---

## 2. What the admin dashboard shows

### 2a. Platform overview (home)

Top-level numbers answering "how is the platform doing":

| Metric | Source |
|---|---|
| Total events (by status: draft / paid / published) | `events` table |
| Total hosts (unique `host_id` values) | `events` table |
| Total photos uploaded | `media_items` count |
| Total photos approved / rejected / pending | `media_items` by `moderation_state` |
| Total albums created | `albums` count |
| Total guest contacts captured | `guest_contacts` count |
| Marketing consent rate | `guest_contacts` where `marketing_consent = true` / total |
| Total emails sent (by type) | `email_sends` count grouped by `email_type` |
| Unsubscribe rate | `guest_contacts` where `unsubscribed_at is not null` / total |
| Revenue (total, this month) | `billing_records` sum |

Plus a recent activity feed: last 20 events created, last 20 emails sent, last 20 uploads.

### 2b. Events list

Read-only bird's-eye view of all events on the platform.

| Column | Source |
|---|---|
| Event name | `events.name` |
| Host email | `auth.users.email` via `events.host_id` |
| Status | `events.status` |
| Type | `events.event_type` |
| Guest count | `invitees` count |
| Upload count | `media_items` count |
| Contact count | `guest_contacts` count |
| Created | `events.created_at` |

Search by event name or host email. Filter by status. Paginated.

Click-through shows a read-only detail view (event info, guest list, media stats, albums, email activity for that event).

### 2c. Users (hosts) list

All users who have created at least one event.

| Column | Source |
|---|---|
| Email | `auth.users.email` |
| Events created | count of `events` |
| Total uploads (across their events) | `media_items` count |
| Total revenue | `billing_records` sum |
| Signed up | `auth.users.created_at` |

Search by email. Paginated.

### 2d. Email health

Platform-wide email delivery overview. Answers "are our emails working":

| Metric | Source |
|---|---|
| Emails sent today / this week / this month | `email_sends` count by date |
| Breakdown by type (album_delivery, host_event_published, host_upload_digest) | `email_sends` grouped by `email_type` |
| Total contacts | `guest_contacts` count |
| Contacts with consent | `guest_contacts` where `marketing_consent = true` |
| Unsubscribed contacts | `guest_contacts` where `unsubscribed_at is not null` |
| Recent sends log (last 50) | `email_sends` ordered by `created_at` desc |

No per-email open/click tracking (use Resend dashboard for that until volume justifies it).

### 2e. Reports / flagged content

Content that guests or the system has flagged:

| Column | Source |
|---|---|
| Media item | `media_items` where reported or flagged |
| Event name | join to `events` |
| Reporter | from `event_action_logs` where `action_type = 'media_reported'` |
| Status | pending review / resolved |
| Reported at | timestamp |

Admin actions: view media, mark resolved, delete media (hard remove from storage).

### 2f. Platform configuration (future)

Settings that apply platform-wide. Not per-event. Deferred until there are actual settings to configure.

Potential candidates:
- Default pricing per invitee (`fee_per_invite_cents`)
- Global email footer text
- Maintenance mode toggle
- Feature flags (e.g., open events enabled)

---

## 3. Admin route structure

### URL layout

```
/admin                          → Platform overview dashboard
/admin/events                   → All events list (read-only)
/admin/events/[eventId]         → Event detail (read-only)
/admin/users                    → All hosts list (read-only)
/admin/email-health             → Email delivery overview
/admin/reports                  → Flagged content / abuse reports
```

### File structure

```
src/app/admin/
├── layout.tsx                  → Auth gate + sidebar nav
├── page.tsx                    → Platform overview dashboard
├── events/
│   ├── page.tsx                → All events list
│   └── [eventId]/
│       └── page.tsx            → Event detail (read-only)
├── users/
│   └── page.tsx                → All hosts list
├── email-health/
│   └── page.tsx                → Email delivery overview
└── reports/
    └── page.tsx                → Flagged content queue
```

### Admin layout

- Server-side or client-side auth check (calls `requireAdmin()` equivalent)
- Redirects to `/dashboard` if not an admin
- Sidebar with links to each section
- Shows "Admin" badge + current user

---

## 4. Admin API routes

All gated by `requireAdmin()`. All use `createSupabaseAdminClient()` (service role) since they query across all hosts/events.

### 4a. Platform stats

**`GET /api/admin/stats`**

Returns aggregate numbers for the overview dashboard. Single endpoint, multiple counts.

```json
{
  "events": { "total": 42, "draft": 10, "paid": 8, "published": 24 },
  "uploads": { "total": 3200, "approved": 2800, "rejected": 150, "pending": 250 },
  "albums": 65,
  "contacts": { "total": 1280, "withConsent": 980, "unsubscribed": 45 },
  "emails": { "total": 3400, "album_delivery": 2100, "host_event_published": 300, "host_upload_digest": 1000 },
  "revenue": { "totalCents": 420000, "thisMonthCents": 85000 },
  "hosts": 18
}
```

### 4b. Events list

**`GET /api/admin/events`**

Query params: `?page=1&limit=50&search=wedding&status=published`

Returns paginated events with host email, guest/upload/contact counts.

### 4c. Event detail

**`GET /api/admin/events/[eventId]`**

Returns full event data: event info, invitees count, media stats, albums, contacts, email sends — all read-only.

### 4d. Users list

**`GET /api/admin/users`**

Query params: `?page=1&limit=50&search=gmail`

Returns paginated host list with event counts and revenue.

### 4e. Email health

**`GET /api/admin/email-health`**

Returns email delivery stats (counts by type, by date range) and recent sends.

### 4f. Reports

**`GET /api/admin/reports`**

Returns flagged/reported media items.

**`POST /api/admin/reports/[mediaId]/resolve`**

Mark a report as resolved.

**`DELETE /api/admin/reports/[mediaId]`**

Delete reported media from storage and database.

---

## 5. Implementation order

### Phase 1 — Foundation

| Step | What | Files |
|---|---|---|
| 1 | Add `admin_users` migration | `supabase/migrations/20260216000000_add_admin_users.sql` |
| 2 | Add `requireAdmin()` to auth helpers | `src/lib/auth.ts` |
| 3 | Create admin layout with auth gate and sidebar | `src/app/admin/layout.tsx` |
| 4 | Build platform stats API | `src/app/api/admin/stats/route.ts` |
| 5 | Build overview dashboard page | `src/app/admin/page.tsx` |

### Phase 2 — Events + users visibility

| Step | What | Files |
|---|---|---|
| 6 | Build admin events list API | `src/app/api/admin/events/route.ts` |
| 7 | Build admin events list page | `src/app/admin/events/page.tsx` |
| 8 | Build admin event detail API | `src/app/api/admin/events/[eventId]/route.ts` |
| 9 | Build admin event detail page (read-only) | `src/app/admin/events/[eventId]/page.tsx` |
| 10 | Build admin users list API | `src/app/api/admin/users/route.ts` |
| 11 | Build admin users list page | `src/app/admin/users/page.tsx` |

### Phase 3 — Email health + reports

| Step | What | Files |
|---|---|---|
| 12 | Build email health API | `src/app/api/admin/email-health/route.ts` |
| 13 | Build email health page | `src/app/admin/email-health/page.tsx` |
| 14 | Build reports API (list + resolve + delete) | `src/app/api/admin/reports/route.ts` |
| 15 | Build reports page | `src/app/admin/reports/page.tsx` |

### Phase 4 — Future (deferred)

| Step | What |
|---|---|
| 16 | Platform configuration page (pricing, feature flags) |
| 17 | Resend webhook integration (bounce/complaint tracking in email health) |
| 18 | Admin audit log |
| 19 | Read-only admin tier (`admin` role vs `super_admin`) |

---

## 6. Security considerations

- All `/api/admin/*` routes call `requireAdmin()` before any data access
- All admin queries use `createSupabaseAdminClient()` (service role key)
- Admin layout redirects non-admins to `/dashboard`
- Admin actions on reports (delete media) should be logged in `event_action_logs`
- The admin route is **read-heavy** — the only write actions are resolving/deleting reported content and (future) platform config changes
- No admin route modifies host events, albums, contacts, or email sends

---

## 7. What NOT to build

| Item | Why |
|---|---|
| Admin managing host events | Hosts manage their own events |
| Admin sending emails on behalf of hosts | Hosts send their own emails |
| Admin managing guest contacts | Hosts manage their own contacts |
| Admin creating/editing albums | Hosts manage their own albums |
| Email template editor | Hardcoded templates are fine |
| Real-time email analytics (opens, clicks) | Use Resend dashboard |
| Admin user invitation flow | Manual SQL seed is fine for 1 admin |
| Platform config page | No settings to configure yet |

---

## 8. Relationship to existing plans

| Existing plan | Relationship |
|---|---|
| `EMAIL-FLOWS-PLAN.md` | No changes. The email system is host-facing and stays on the host dashboard. Admin only gets a read-only email health view. |
| `COMPLIANCE-PREFLIGHT.md` | Admin reports page helps close the "Abuse triage SLA" TODO item by giving the platform owner a queue to work through. |

---

*Phase 1 is the priority. Everything else follows from having an admin role check and a protected route with aggregate stats.*
