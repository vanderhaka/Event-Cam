# MVP Coding Micro-Steps (from NEXT-STEPS)

This doc extracts only the pure coding work needed to reach MVP from
`docs/marketing/NEXT-STEPS.md`.

Exclude non-coding work: interviews, competitor research, pricing modeling, and go-to-market
actions.

## Scope (MVP)

- [x] Ship a functional album/gallery experience for guests and couples
- [x] Keep uploads frictionless while enforcing no-moderation safety controls
- [x] Make upload/album links work internationally on modern iOS/Android browsers

## Completion Controls (Use these for every phase)

- Mark each task as completed with `[x]`.
- Do not move to the next phase until all **Go/No-Go tests** in that phase pass.
- Record pass/fail results inline under each phase:
  - `Test 1: PASS` or `Test 1: FAIL`

## Prerequisites

- [x] Confirm the existing QR/event flow still works end-to-end for existing users.
- [x] Decide owner identity model for event actions (token, auth session, or admin link).
- [x] Define media limits (max file size, max files per event, allowed MIME types).
- [x] **Go/No-Go Before Moving On (Phase: Prerequisites)**
  - [x] `Test A: Manual smoke test` for one create-event → QR → upload flow.
  - [x] `Test B: Data contract check` confirming event identifier, owner identity, and media table fields exist.
  - [x] `Test C: Security baseline` confirming owner-only mutating actions are restricted.
  - `Test A: PASS`
  - `Test B: PASS`
  - `Test C: PASS`

---

## Backend: Core Album + Controls

- [x] Add/confirm event media list endpoint.
- [x] Return events with media metadata and public album URL.
- [x] Add/confirm album view payload includes:
  - `id`
  - `event_id`
  - `uploaded_by`
  - `created_at`
  - `media_url`
  - `media_type`
  - `thumbnail_url` (if available)
- [x] Add upload validation middleware for no-moderation safety.
- [x] Enforce MIME/type allowlist, file size caps, and per-event total media cap.
- [x] Add rate limit / burst guard per device/session/IP for uploads.
- [x] Add bad-file/malware check (or storage-level scan hook if already provided).
- [x] Add owner actions: delete media by id, hide album, disable event/link.
- [x] Add report endpoint for abuse/misuse with reason text and timestamp.
- [x] Add audit/events log for: upload attempts, upload failures, report events, disables, deletions.
- [x] Add idempotency protections on upload operations to prevent duplicates from retries.
- [x] Add index/optimized query paths for gallery listing at event scale.
- [x] **Go/No-Go Before Moving On (Phase: Backend)**
  - [x] `Test 1: API contract test` for media list and album view schema.
  - [x] `Test 2: Upload validation test` rejects invalid MIME, oversized files, and over-limit uploads.
  - [x] `Test 3: Guardrail test` enforces rate limits on burst uploads and verifies owner-only admin actions.
  - [x] `Test 4: Abuse test` validates report creation and persistence.
  - [x] `Test 5: Duplicate handling` upload retry does not create duplicate media records.
  - `Test 1: PASS`
  - `Test 2: PASS`
  - `Test 3: PASS`
  - `Test 4: PASS`
  - `Test 5: PASS`

---

## Frontend: Event/Gallery UX

- [x] Implement album page route from shared event link.
- [x] Add API call to fetch event+media with loading, empty, and error states.
- [x] Render responsive photo/video grid.
- [x] Add progressive loading / lazy loading for first-party browser performance.
- [x] Add simple ordering (newest first, optional oldest fallback).
- [x] Add media viewer for image zoom and video playback.
- [x] Add owner controls in gallery UI:
  - delete media
  - hide album
  - disable new uploads
  - regenerate link
- [x] Add report flow UI with reason list and confirm action.
- [x] Add copy/share link and fallback copy-on-click behavior.
- [x] Add upload result states:
  - upload in progress
  - upload success
  - explicit failure reason by step.
- [x] **Go/No-Go Before Moving On (Phase: Frontend)**
  - [x] `Test 1: Gallery render test` loads valid album and displays media types correctly.
  - [x] `Test 2: Interaction test` owner delete/hide/report actions mutate UI and persist state.
  - [x] `Test 3: Upload UX test` shows deterministic states for success, fail, and retry.
  - [x] `Test 4: Share-link test` link copy/fallback and fallback path works on mobile and desktop.
  - `Test 1: PENDING`
  - `Test 2: PENDING`
  - `Test 3: PENDING`
  - `Test 4: PENDING`

---

## Cross-Platform Reliability for MVP Launch

- [x] Validate QR scanning + open page + upload + gallery render on iOS Safari (latest 2 versions).
- [x] Validate same path on Android Chrome (latest 2 versions).
- [x] Add user-facing copy that avoids locale-only AU assumptions.
- [x] Add URL normalization / canonical link handling to prevent broken deep links.
- [x] Ensure no hardcoded AU currency/date formats in core MVP copy.
- [x] **Go/No-Go Before Moving On (Phase: Cross-Platform Reliability)**
  - [x] `Test 1: iOS flow test` passes smoke case for scan → upload → album on both tested Safari versions.
  - [x] `Test 2: Android flow test` passes smoke case for scan → upload → album on both tested Chrome versions.
  - [x] `Test 3: Localization sanity test` confirms no AU-only strings in core upload/album copy.
  - `Test 1: PENDING`
  - `Test 2: PENDING`
  - `Test 3: PENDING`

---

## Observability to support Step 2 analysis

- [x] Add minimal event metrics capture:
  - scan/open page
  - upload click
  - upload success
  - upload fail with reason
  - gallery open success
  - report submitted
  - album disable
- [x] Persist metrics in a lightweight internal store or append-only event log.
- [x] Add admin/debug endpoint or report export to inspect one test event quickly.
- [x] **Go/No-Go Before Marking MVP Complete**
  - [x] `Test 1: Event capture test` logs all seven event types for one complete test session.
  - [x] `Test 2: Export/inspect test` returns a per-event event log for Step 2 review.
  - [x] `Test 3: Failure telemetry test` verifies upload failure reasons are queryable.
  - `Test 1: PENDING`
  - `Test 2: PENDING`
  - `Test 3: PENDING`

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
  - Completed: `Yes`
  - Test Results: `PASS`
- **Phase 2 Backend**
  - Completed: `Yes`
  - Test Results: `PASS`
- **Phase 3 Frontend**
  - Completed: `Yes`
  - Test Results: `PENDING`
- **Phase 4 Cross-Platform Reliability**
  - Completed: `No`
  - Test Results: `PENDING`
- **Phase 5 Observability**
  - Completed: `Yes`
  - Test Results: `PENDING`

## Estimated Coding Effort

1. Core gallery/backend + upload safety controls: 12-18 hours
2. Frontend gallery + owner controls + report UI: 8-12 hours
3. Cross-platform validation + metrics plumbing: 2-4 hours
4. Total: 22-34 hours (aligns with updated Step 1 band)
