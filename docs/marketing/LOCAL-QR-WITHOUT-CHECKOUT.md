# Test QR flow without Stripe checkout (local/dev)

Use this when you need to verify QR generation and scan behavior without completing payment.

## Prerequisites

- You are running the app locally with local auth.
- Supabase project credentials are configured.
- You can open the event detail page in the dashboard.

## 1) Enable unpaid publish in local env

In `/Users/jamesvanderhaak/Desktop/Development/projects/Event-Cam/.env.local` set:

```
EVENT_CAM_ALLOW_UNPAID=1
```

Restart the dev server after editing env vars (`npm run dev`).

## 2) Create event + invitees

1. Create or open a test event.
2. Add at least one invitee for closed events.
3. Confirm checkout may still run, but it is no longer required for publish in local dev.

## 3) Publish QR codes directly

Because the dashboard button is still disabled until `status === paid`, call publish directly:

```js
const eventId = window.location.pathname.split('/').at(-1);
await fetch(`/api/events/${eventId}/publish`, { method: 'POST' });
```

Expected result:
- Invite rows are marked `qr_state: issued`.
- Event moves to `published`.
- QR modal links become available in the invite list.

## 4) Verify scan

1. Open an issued invite and copy the QR link from the modal.
2. Load it and ensure upload page opens with event context.
3. Submit a test image/video to confirm moderation and downstream flow.

## 5) Cleanup

Set `EVENT_CAM_ALLOW_UNPAID=0` (or remove it) before staging/prod verification.
