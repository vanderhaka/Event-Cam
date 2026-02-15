# MVP Coding Micro-Steps (from NEXT-STEPS)

This doc extracts only the pure coding work needed to reach MVP from
`docs/marketing/NEXT-STEPS.md`.

Exclude non-coding work: interviews, competitor research, pricing modeling, and go-to-market
actions.

## Scope (MVP)

- [ ] Ship a functional album/gallery experience for guests and couples
- [ ] Keep uploads frictionless while enforcing no-moderation safety controls
- [ ] Make upload/album links work internationally on modern iOS/Android browsers

## Completion Controls (Use these for every phase)

- Mark each task as completed with `[x]`.
- Do not move to the next phase until all **Go/No-Go tests** in that phase pass.
- Record pass/fail results inline under each phase:
  - `Test 1: PASS` or `Test 1: FAIL`

## Prerequisites

- [ ] Confirm the existing QR/event flow still works end-to-end for existing users.
- [ ] Decide owner identity model for event actions (token, auth session, or admin link).
- [ ] Define media limits (max file size, max files per event, allowed MIME types).
- [ ] **Go/No-Go Before Moving On (Phase: Prerequisites)**
  - [ ] `Test A: Manual smoke test` for one create-event → QR → upload flow.
  - [ ] `Test B: Data contract check` confirming event identifier, owner identity, and media table fields exist.
  - [ ] `Test C: Security baseline` confirming owner-only mutating actions are restricted.

---

## Backend: Core Album + Controls

- [ ] Add/confirm event media list endpoint.
- [ ] Return events with media metadata and public album URL.
- [ ] Add/confirm album view payload includes:
  - `id`
  - `event_id`
  - `uploaded_by`
  - `created_at`
  - `media_url`
  - `media_type`
  - `thumbnail_url` (if available)
- [ ] Add upload validation middleware for no-moderation safety.
- [ ] Enforce MIME/type allowlist, file size caps, and per-event total media cap.
- [ ] Add rate limit / burst guard per device/session/IP for uploads.
- [ ] Add bad-file/malware check (or storage-level scan hook if already provided).
- [ ] Add owner actions: delete media by id, hide album, disable event/link.
- [ ] Add report endpoint for abuse/misuse with reason text and timestamp.
- [ ] Add audit/events log for: upload attempts, upload failures, report events, disables, deletions.
- [ ] Add idempotency protections on upload operations to prevent duplicates from retries.
- [ ] Add index/optimized query paths for gallery listing at event scale.
- [ ] **Go/No-Go Before Moving On (Phase: Backend)**
  - [ ] `Test 1: API contract test` for media list and album view schema.
  - [ ] `Test 2: Upload validation test` rejects invalid MIME, oversized files, and over-limit uploads.
  - [ ] `Test 3: Guardrail test` enforces rate limits on burst uploads and verifies owner-only admin actions.
  - [ ] `Test 4: Abuse test` validates report creation and persistence.
  - [ ] `Test 5: Duplicate handling` upload retry does not create duplicate media records.

---

## Frontend: Event/Gallery UX

- [ ] Implement album page route from shared event link.
- [ ] Add API call to fetch event+media with loading, empty, and error states.
- [ ] Render responsive photo/video grid.
- [ ] Add progressive loading / lazy loading for first-party browser performance.
- [ ] Add simple ordering (newest first, optional oldest fallback).
- [ ] Add media viewer for image zoom and video playback.
- [ ] Add owner controls in gallery UI:
  - delete media
  - hide album
  - disable new uploads
  - regenerate link
- [ ] Add report flow UI with reason list and confirm action.
- [ ] Add copy/share link and fallback copy-on-click behavior.
- [ ] Add upload result states:
  - upload in progress
  - upload success
  - explicit failure reason by step.
- [ ] **Go/No-Go Before Moving On (Phase: Frontend)**
  - [ ] `Test 1: Gallery render test` loads valid album and displays media types correctly.
  - [ ] `Test 2: Interaction test` owner delete/hide/report actions mutate UI and persist state.
  - [ ] `Test 3: Upload UX test` shows deterministic states for success, fail, and retry.
  - [ ] `Test 4: Share-link test` link copy/fallback and fallback path works on mobile and desktop.

---

## Cross-Platform Reliability for MVP Launch

- [ ] Validate QR scanning + open page + upload + gallery render on iOS Safari (latest 2 versions).
- [ ] Validate same path on Android Chrome (latest 2 versions).
- [ ] Add user-facing copy that avoids locale-only AU assumptions.
- [ ] Add URL normalization / canonical link handling to prevent broken deep links.
- [ ] Ensure no hardcoded AU currency/date formats in core MVP copy.
- [ ] **Go/No-Go Before Moving On (Phase: Cross-Platform Reliability)**
  - [ ] `Test 1: iOS flow test` passes smoke case for scan → upload → album on both tested Safari versions.
  - [ ] `Test 2: Android flow test` passes smoke case for scan → upload → album on both tested Chrome versions.
  - [ ] `Test 3: Localization sanity test` confirms no AU-only strings in core upload/album copy.

---

## Observability to support Step 2 analysis

- [ ] Add minimal event metrics capture:
  - scan/open page
  - upload click
  - upload success
  - upload fail with reason
  - gallery open success
  - report submitted
  - album disable
- [ ] Persist metrics in a lightweight internal store or append-only event log.
- [ ] Add admin/debug endpoint or report export to inspect one test event quickly.
- [ ] **Go/No-Go Before Marking MVP Complete**
  - [ ] `Test 1: Event capture test` logs all seven event types for one complete test session.
  - [ ] `Test 2: Export/inspect test` returns a per-event event log for Step 2 review.
  - [ ] `Test 3: Failure telemetry test` verifies upload failure reasons are queryable.

---

## Micro-Task Order (Recommended)

1. Backend validation + media list endpoint
2. Gallery route and media grid rendering
3. Upload guardrails and error taxonomy
4. Owner control actions and report flow
5. Cross-platform sanity checks
6. Step-2 metrics capture

## Done Criteria (Coding-only MVP)

1. A shared event link opens a gallery containing uploaded media from that event
2. Guests can scan/open and upload without app requirement
3. A single owner can remove media and disable sharing
4. Report path exists and events are logged with enough detail to manually review
5. The flow works on target iOS/Android browsers without AU-only text assumptions

## Progress Log (fill as you go)

- **Phase 1 Prerequisites**
  - Completed: `No`
  - Test Results: _pending_
- **Phase 2 Backend**
  - Completed: `No`
  - Test Results: _pending_
- **Phase 3 Frontend**
  - Completed: `No`
  - Test Results: `pending`
- **Phase 4 Cross-Platform Reliability**
  - Completed: `No`
  - Test Results: _pending_
- **Phase 5 Observability**
  - Completed: `No`
  - Test Results: _pending_

## Estimated Coding Effort

1. Core gallery/backend + upload safety controls: 12-18 hours
2. Frontend gallery + owner controls + report UI: 8-12 hours
3. Cross-platform validation + metrics plumbing: 2-4 hours
4. Total: 22-34 hours (aligns with updated Step 1 band)
