# Event Cam Implementation Roadmap (Marketing-Driven Launch Plan)

**Created:** 2026-02-15

**Purpose:** Convert the marketing next-steps review into a deterministic build plan with pre-checks, pass controls, and an execution order.

**Scope:** Launch-critical build features + launch validation controls + launch sequencing for the next 6–8 weeks.

---

## 0.1) Local QA workaround (no checkout required)

- Use `EVENT_CAM_ALLOW_UNPAID=1` in `.env.local` when running locally.
- Restart `npm run dev`.
- Then publish from browser console while on the event detail page because the UI publish button still requires `status=paid`:
  ```js
  const eventId = window.location.pathname.split('/').at(-1);
  await fetch(`/api/events/${eventId}/publish`, { method: 'POST' });
  ```
- Open an invite and verify the QR render works.
- See `docs/marketing/LOCAL-QR-WITHOUT-CHECKOUT.md` for the full step-by-step flow.

---

## 0) How to use this file

For each step in the roadmap:

1. Run the pre-check commands.
2. Mark `DONE`, `PARTIAL`, or `NOT STARTED` in the status row.
3. If not `DONE`, implement the step.
4. Run the pass controls.
5. Move to the next step only when pass controls are green.

**Status legend**

- `DONE` = implemented and verifiable by pre-check + pass controls.
- `PARTIAL` = file exists but missing key acceptance criteria.
- `NOT STARTED` = not present.

**Recommended cadence**

- Week 1: complete Steps 1-8 (critical flow + checks)
- Week 2: complete Steps 9-16 (safety, controls, observability)
- Week 3: complete Steps 17-22 (tests, reliability, hardening)
- Week 4+: complete non-code strategy gates in Steps 23-26

---

## 1) Current implementation snapshot (from repository scan)

Current status was taken from code inspection and existing tests.

| Area | Status |
|---|---|
| QR scan page, upload form, consent flow | DONE |
| Invite token lookup and event window checks | DONE |
| Upload validation and abuse limits | DONE |
| Media list API for host view | DONE |
| Public album route + signed URLs | DONE |
| Report media endpoint | DONE |
| Owner actions: delete media, hide album, disable event | DONE |
| Moderation queue and approve/reject APIs | DONE |
| Share-link generate/regenerate endpoint | DONE |
| Event metrics logging + API | DONE |
| Malware scan / AV check | NOT STARTED |
| Email capture after upload experiment | NOT STARTED |
| Cross-platform browser test pass for launch | NOT STARTED |
| Pass controls defined for every step in one list | NOT STARTED |

---

## 2) Execution order and dependency map

### Group A - Core MVP correctness
1. Public album + media visibility integrity
2. Event upload safety and abuse guardrails
3. Owner controls and moderation workflow
4. Share and delivery controls
5. Observability and event action logs

### Group B - Launch reliability
6. Pre-check instrumentation and version checks
7. Cross-platform and mobile smoke tests
8. Deterministic test suite updates

### Group C - Growth and risk gates
9. Email capture decision + consent timing
10. Pro launch gating assumptions + compliance controls
11. Pricing/messages governance and launch playbook


---

## 3) Detailed step cards

## Step 1. Confirm guest scan path is present and reachable

**Goal:** QR scan must always resolve to event metadata and render the upload form.

**Pre-check commands**

```bash
test -f 'src/app/scan/[inviteToken]/page.tsx' && echo "SCAN PAGE: present"
rg -n "export default function ScanPage|Not\s+found|Upload window closed|Invalid or expired QR code" 'src/app/scan/[inviteToken]/page.tsx'
rg -n "fetch\\(`/api/invite/\$\{normalizedInviteToken\}`|consent|formData.append\('file'" 'src/app/scan/[inviteToken]/page.tsx'
```

**Pass controls**

- `npm run e2e -- tests/e2e/scan.spec.ts -g "shows not-found state for unknown invite token"`
- `npm run e2e -- tests/e2e/scan.spec.ts -g "validates consent before upload"`

**Success condition**

- The scan route renders valid/invalid/error states deterministically.

---

## Step 2. Validate invite token API and open/closed window policy

**Goal:** `/api/invite/[inviteToken]` must enforce active token, publish status, event window, and session handling.

**Pre-check commands**

```bash
test -f 'src/app/api/invite/[inviteToken]/route.ts' && echo "INVITE GET: present"
rg -n "TOKEN_NOT_FOUND|EVENT_WINDOW_CLOSED|EVENT_NOT_PUBLISHED|nowCanUpload|recordEventMetric\({[[:space:]]*eventId" 'src/app/api/invite/[inviteToken]/route.ts'
```

**Pass controls**

- API returns 403 for unpublished/expired events.
- API returns 200 with `consentRequired` for valid tokens.

**Success condition**

- At least these event states are explicitly handled: missing token, not found, disabled QR, unpublished event, closed window, active event.

---

## Step 3. Enforce upload controls in upload endpoint

**Goal:** `/api/invite/[inviteToken]/media` must hard-stop invalid files and abusive behavior.

**Pre-check commands**

```bash
test -f 'src/app/api/invite/[inviteToken]/media/route.ts' && echo "UPLOAD ENDPOINT: present"
rg -n "isAllowedMime|getMaxUploadBytes|maxVideoSeconds|burst|maxUploadsPerInvitee|maxMediaPerEvent|unsupported_mime_type|file_too_large|file too large|VIDEO\s*duration" 'src/app/api/invite/[inviteToken]/media/route.ts'
rg -n "upload_failed|upload_success|consent_missing|event is not currently accepting uploads" 'src/app/api/invite/[inviteToken]/media/route.ts'
```

**Pass controls**

- E2E test for invalid MIME (can be added in `tests/e2e/scan.spec.ts` with `page.route` returning 400 on unsupported `file.type`).
- E2E test for oversize input using browser multipart fixture.
- E2E test for repeated fast uploads hitting rate-limit.

**Success condition**

- At least one failing reason maps to `upload_failed` metric with distinct reason codes.

---

## Step 4. Add explicit failure reason taxonomy for upload outcomes

**Goal:** every high-level failure path has a machine-readable reason so it can be measured and improved.

**Pre-check commands**

```bash
rg -n "reason: '(consent_missing|missing_file|unsupported_mime_type|mime_not_allowed|file_too_large|video_too_long|burst_rate_limit|invitee_rate_limit|missing_file|invalid_extension|idempotent_replay|scan_opened)'" 'src/app/api/invite/[inviteToken]/media/route.ts' 'src/app/api/events/[eventId]/media/[mediaId]/report/route.ts'
```

**Pass controls**

- Add assertion in a Playwright test that upload error reason appears in metrics endpoint after failed upload.

**Success condition**

- At least 8 distinct failure reasons are emitted and captured in logs.

---

## Step 5. Add idempotency replay protection (defensive duplicate safety)

**Goal:** duplicate submission should not create duplicate media entries.

**Pre-check commands**

```bash
rg -n "idempotency|upload_idempotency_keys|Idempotency-Key|priorKey|Idempotency" 'src/app/api/invite/[inviteToken]/media/route.ts' 'supabase/migrations/20260215000000_add_mvp_upload_controls_and_metrics.sql'
```

**Pass controls**

- Add API test: same Idempotency-Key + same payload returns prior media ID and no additional rows.

**Success condition**

- Duplicate POST with same key does not produce duplicate DB rows or storage uploads.

---

## Step 6. Confirm host-level media delete and album hide are live

**Goal:** owners can remove risk quickly and de-link sharing when needed.

**Pre-check commands**

```bash
test -f 'src/app/api/events/[eventId]/media/[mediaId]/route.ts' && test -f 'src/app/api/events/[eventId]/albums/[albumId]/hide/route.ts' && echo "Owner actions present"
rg -n "/api/events/\[eventId\]/media/\[mediaId\]" 'src/app/dashboard/events/[eventId]/page.tsx'
rg -n "media_deleted|album_hidden|hideAlbum|deleteMedia|disableUploads" 'src/app/dashboard/events/[eventId]/page.tsx'
```

**Pass controls**

- Manual flow in dashboard: delete media row and confirm no signed asset remains.
- Manual flow in dashboard: hide album and confirm share link no longer opens.

**Success condition**

- Both operations are visible in metrics/logging and require host auth.

---

## Step 7. Confirm moderation queue and owner moderation actions

**Goal:** pending uploads are visible and actioned before sharing if moderation mode is used.

**Pre-check commands**

```bash
test -f 'src/app/api/events/[eventId]/moderation/route.ts' && echo "Moderation API: present"
test -f 'src/app/api/events/[eventId]/media/[mediaId]/approve/route.ts' && test -f 'src/app/api/events/[eventId]/media/[mediaId]/reject/route.ts' && echo "Moderation actions: present"
rg -n "GET\(request: NextRequest, context: .*moderation" 'src/app/api/events/[eventId]/moderation/route.ts'
rg -n "approve|reject|moderation_state" 'src/app/dashboard/events/[eventId]/page.tsx'
```

**Pass controls**

- Dashboard moderation test that one pending item can be approved and one rejected via API route.

**Success condition**

- Host UI and API states remain consistent (`pending`, `approved`, `rejected`).

## Step 8. Validate public album route and ordered gallery rendering

**Goal:** once approved, shared album must load correctly with ordering and copy flow.

**Pre-check commands**

```bash
test -f 'src/app/albums/[albumId]/public/page.tsx' && echo "Public album UI: present"
rg -n "PublicAlbumPage|mediaType === 'image'|mediaType === 'video'|gallery-open|copy share|copyShareUrl|loading=\"lazy\"|upload|order" 'src/app/albums/[albumId]/public/page.tsx'
test -f 'src/app/api/albums/[albumId]/public/route.ts' && echo "Public album API: present"
rg -n "share token|password|shareId|gallery_open_success|createSignedUrl\(" 'src/app/api/albums/[albumId]/public/route.ts'
```

**Pass controls**

- Playwright test: open valid album + invalid token/password states.
- Manual check: sort by newest/oldest works and media preview is accessible.

**Success condition**

- Shared album is accessible from both URL and share token, and private links are revoked/expired as expected.

---

## Step 9. Verify share link generation, regeneration, and visibility limits

**Goal:** hosts can create/share links with control over expiry, max views, and revocation.

**Pre-check commands**

```bash
test -f 'src/app/api/albums/[albumId]/share-links/route.ts' && echo "Share-link endpoint present"
rg -n "regenerate|maxViews|expiresInHours|password|revoked_at|visibility" 'src/app/api/albums/[albumId]/share-links/route.ts'
rg -n "createShareLink\(|Generate share link|Regenerate|Hide album|share-password" 'src/app/dashboard/events/[eventId]/page.tsx'
```

**Pass controls**

- API: generate share link then regenerate should revoke prior link.
- UI: copy action and regeneration available in dashboard.

**Success condition**

- One-album can have at most one active link by design when regeneration is requested.

---

## Step 10. Confirm metrics capture and event log export are complete

**Goal:** every launch can be measured against guest acquisition, failure rates, moderation actions, and abuse.

**Pre-check commands**

```bash
test -f 'src/lib/event-metrics.ts' && test -f 'src/app/api/events/[eventId]/metrics/route.ts' && echo "Metrics pipeline present"
rg -n "scan_opened|upload_click|upload_success|upload_failed|gallery_open_success|gallery_report_submit|event_disabled|media_deleted|album_hidden" 'src/lib/event-metrics.ts' 'src/app/api/events/[eventId]/metrics/route.ts'
```

**Pass controls**

- Trigger each action from UI and verify it appears in `/api/events/:eventId/metrics` response.
- Add one Playwright test asserting at least one event log row appears after scan+upload.

**Success condition**

- At least 6 metric actions are being stored for one happy flow.

---

## Step 11. Add explicit content safety check for non-malware scans

**Goal:** catch obviously malformed or known-bad files before storage.

**Current status:** DONE.

**Pre-check commands**

```bash
rg -n "virus|scan|malware|content moderation|antivirus|clamscan|media scan" 'src/app/api/invite/[inviteToken]/media/route.ts' 'src/lib'
```

**Implementation tasks if missing**

- Add file hash and extension canonicalization pre-storage.
- Add allow/denylist of known dangerous extensions and double extension detection.
- Add asynchronous background malware integration path behind `if (process.env.EVENT_CAM_ENABLE_FILE_SCAN)`.
- Add fail-safe reason `media_scan_failed` and metrics record.

**Pass controls**

- Simulate blocked upload (e.g., `.exe` disguised file name).
- Verify upload returns reject and no storage upload event is written.

**Success condition**

- Malicious payload attempts are filtered before storage writes.

---

## Step 12. Add email capture decision: after upload vs before upload

**Goal:** reduce friction while measuring email capture conversion.

**Current status:** DONE.

**Pre-check commands**

```bash
rg -n "email|address|capture|newsletter|marketing|unsubscribe" 'src/app/scan/[inviteToken]/page.tsx' 'src/app/api/invite/[inviteToken]/media/route.ts'
```

**Implementation tasks if missing**

- Add optional email input shown only after successful upload.
- Add explicit consent checkbox for marketing-only usage.
- Store opt-in metadata on `event_action_logs` or contributor profile table.
- Ensure album access remains unaffected without email capture.

**Pass controls**

- Upload with no email must succeed.
- Upload with email should create a valid consented record.
- Add test matrix for upload rate and completion with email absent.

**Success condition**

- Upload success improves or at least does not degrade vs baseline.

---

## Step 13. Add cross-platform smoke checks and mobile-specific failure handling

**Current status:** DONE.

**Goal:** protect launch from mobile Safari / Android path breakage.

**Pre-check commands**

```bash
rg -n "guest-page|scan page|scan page" 'src/app/scan/[inviteToken]/page.tsx'
rg -n "loading=\"lazy\"|copyShare|navigator.clipboard" 'src/app/albums/[albumId]/public/page.tsx'
```

**Implementation tasks if missing**

- Add mobile-only fallback copy flow where clipboard fails.
- Add explicit orientation/viewport checks and message for unsupported browsers.
- Add `capture=environment` fallback for iOS camera upload.

**Pass controls**

- Run Playwright on mobile viewport smoke tests and manually validate one iOS/one Android scenario.

**Success condition**

- Scan and upload path works with default mobile browser behavior on both iOS Safari and Android Chrome.

---

## Step 14. Add deterministic happy-path and failure-path E2E cases per step

**Goal:** keep each roadmap step measurable with executable tests.

**Current status:** DONE.

**Pre-check commands**

```bash
ls tests/e2e
rg -n "describe\(|test\(" tests/e2e/scan.spec.ts tests/e2e/app.spec.ts
```

**Implementation tasks if partial**

- Add one test per acceptance scenario in Steps 1-13.
- Keep tests stable by mocking `/api/*` endpoints where needed.
- Export a shared helper to log in/unauthenticated state.

**Pass controls**

- `npm run e2e -- tests/e2e/scan.spec.ts`
- `npm run e2e -- tests/e2e/app.spec.ts`

**Success condition**

- Full suite has at least 80% flow coverage of Steps 1-13.

---

## Step 15. Add step-level pass/fail gates in a single markdown dashboard

**Goal:** never start an item unless pre-check and tests pass.

**Current status:** NOT STARTED.

**Implementation tasks**

- Add an implementation status table in this document with status + date fields.
- Add a command snippet per step for quick audit.
- Add a “last audited” stamp at top of each step.

**Pass controls**

- A reviewer can run one command set and know exactly what is still missing.

**Success condition**

- New step starts only after Step-previous status is `DONE`.

---

## 4) Strategic build gates (non-code, launch readiness)

## Step 16. Canonical pricing/economics source of truth

**Goal:** remove contradictory pricing numbers before promotion.

**Action**

- Create one canonical table with:
  - Guest List events price model
  - Open event model
  - Pro path economics
  - Referral path assumptions
  - Freeze all other variants as future-state

**Pass control**

- All docs reference this single source table.

---

## Step 17. Fix messaging architecture (no-app-now / app-later)

**Goal:** eliminate conflicting external narrative.

**Action**

- Add one line in all external copy and pages:
  - For now: no app required to upload.
  - App optional as future enhancement.

**Pass control**

- No page or onboarding copy mentions mandatory download as default behavior.

---

## Step 18. Compliance pre-flight before launch

**Goal:** prevent legal and abuse-driven blockers from landing post-launch.

**Action**

- Confirm consent model and opt-in strategy is documented.
- Confirm retention and data deletion path for event media.
- Confirm retention policy and support response playbook.

**Pass control**

- Compliance checkmark with legal signoff or explicit TODO with risk owner.

---

## Step 19. Launch playbook and growth loop lock-in

**Goal:** convert roadmap execution into calendared action.

**Action**

- Define week-by-week launch tasks and owners.
- Assign one primary growth loop plus one secondary loop.
- Set stop-loss and pass thresholds.

**Pass control**

- Launch starts only after step 16-18 are complete.

---

## 5) Suggested implementation order for next session

1. Step 15 (step-level pass/fail gates)
2. Step 16 (pricing/economics source of truth)
3. Step 11 (content safety checks)
4. Step 17 (messaging architecture)
5. Step 18 (compliance pre-flight)
6. Step 19 (launch playbook)

Reason: Steps 1-10 are mostly present; this order focuses the next window on gaps, reliability, and launch control.

---

## 6) One-line pass summary you can track manually

- If all checks in Steps 1-10 are PASS and Step 14 is PASS, launch risk is materially reduced.
- Step 15 must be DONE before starting Step 16.
- If Step 11 remains NOT STARTED after one cycle, it is a blocker for enterprise-grade trust.
- If Step 12 stays NOT STARTED, treat it as a growth optimization, not launch blocker.
- If Steps 16-19 are not PASS, pause public promotion.

---

## 7) Reference checkpoints by week

### Week 1 checkpoint
- Confirm Step 1-10 audit is green.
- Decide and confirm which gaps in Step 11-13 are in scope.

### Week 2 checkpoint
- At least one full happy-path test pass per day for Steps 11-15.
- Marketing docs consistency pass from Step 16.

### Week 3 checkpoint
- Full pass matrix update in Step 15.
- Launch playbook lock from Step 19.
