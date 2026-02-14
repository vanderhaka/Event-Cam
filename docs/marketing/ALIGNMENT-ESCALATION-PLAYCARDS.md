# Alignment Escalation Playcards

Use these playcards when high-impact alignment failures occur and you need fast, structured response.

This is the tactical companion to escalation rules defined in other governance artifacts.

---

## Purpose

These playcards provide:
- immediate response steps,
- ownership routing,
- 24/72-hour containment actions,
- clear exit criteria.

Use during live incidents to reduce delay and decision thrash.

---

## Playcard 1 — Pricing Contradiction in Active Buyer Comms

### Trigger
- conflicting pricing appears in active docs, pages, or outbound messaging.

### Immediate (0–4h)
1. Freeze outbound pricing communications.
2. Identify canonical source via source map.
3. Open contradiction record with severity.

### 24-Hour Actions
1. Publish temporary internal pricing directive.
2. Update all public-facing references to canonical figure.
3. Log decision and affected artifacts.

### 72-Hour Actions
1. Complete contradiction closure.
2. Verify no stale cached messaging remains.
3. Add prevention action in retrospective notes.

### Exit Criteria
- single canonical pricing value live everywhere,
- contradiction marked resolved + verified.

---

## Playcard 2 — Priority 0 Decision Misses SLA

### Trigger
- P0 decision remains unresolved beyond final decision due date.

### Immediate (0–4h)
1. Escalate to decision owner + leadership.
2. Freeze dependent launch activities.
3. Capture blocker cause category.

### 24-Hour Actions
1. Force options summary (max 3 options).
2. Apply decision criteria scoring.
3. Set non-negotiable decision timestamp.

### 72-Hour Actions
1. Close decision in decision log.
2. Publish owner + implementation next steps.
3. Re-baseline dependent timelines.

### Exit Criteria
- decision closed with owner/date,
- blocked dependencies have updated dates.

---

## Playcard 3 — KPI Integrity Failure Before Leadership Review

### Trigger
- KPI values are disputed, stale, or source lineage is broken.

### Immediate (0–4h)
1. Mark affected metrics as provisional.
2. Freeze decisions relying on disputed metrics.
3. Assign source owner triage.

### 24-Hour Actions
1. Validate source freshness and schema integrity.
2. Confirm formula alignment with metric definitions.
3. Publish corrected values or confidence warning.

### 72-Hour Actions
1. Update data source catalog reliability rating if needed.
2. Add source incident record + prevention action.
3. Re-run impacted decisions if conclusions changed.

### Exit Criteria
- KPI confidence restored,
- source reliability status explicitly updated.

---

## Playcard 4 — Contradiction Backlog Surges

### Trigger
- 3+ new high/critical contradictions in one week.

### Immediate (0–4h)
1. Pause non-essential new initiatives.
2. Open contradiction triage session.
3. Assign owners by domain.

### 24-Hour Actions
1. Prioritize contradictions by execution risk.
2. Close at least one high-risk contradiction.
3. Publish conflict heatmap by domain.

### 72-Hour Actions
1. Resolve or schedule all high/critical contradictions.
2. Update canonical source map where ambiguity caused surge.
3. Run working-agreement reminder in decision review.

### Exit Criteria
- high/critical contradiction backlog trending down,
- no ownerless contradiction remains.

---

## Playcard 5 — Repeated Decision Reversals

### Trigger
- 2+ significant reversals in one quarter.

### Immediate (0–4h)
1. Flag potential decision-quality instability.
2. Switch to Diagnostic Mode if not already active.
3. Start reversal root-cause review.

### 24-Hour Actions
1. Audit evidence quality for reversed decisions.
2. Audit assumptions tied to those decisions.
3. Identify shared failure pattern.

### 72-Hour Actions
1. Implement prevention controls (e.g., stronger evidence threshold).
2. Update decision-quality checklist and criteria weightings.
3. Reconfirm quarter path boundaries.

### Exit Criteria
- root cause documented,
- mitigation controls added and owned.

---

## Escalation Playcard Usage Rules

1. Always assign one incident owner per playcard activation.
2. Timebox each phase (Immediate / 24h / 72h).
3. Log all major actions in decision or blocker artifacts.
4. If exit criteria are not met, escalate severity and extend response window with explicit approval.

---

## Integration Points

Use with:
- `ALIGNMENT-ONCALL-ESCALATION-MATRIX.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-BLOCKERS-LOG.md`
- `ALIGNMENT-CONTRADICTION-REGISTER.md`
- `ALIGNMENT-DECISION-REVERSAL-PROTOCOL.md`
