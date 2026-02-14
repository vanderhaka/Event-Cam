# Alignment Control Threshold-Action Coverage Review

Use this artifact to verify that every active control threshold has a defined, executable response action.

Thresholds without actions create alert noise and false confidence, because teams can detect issues but not reliably respond.

---

## Purpose

This review ensures:
- each threshold state maps to a concrete action path,
- undefined response gaps are surfaced before incidents compound,
- threshold systems stay operationally useful rather than purely descriptive.

---

## Scope

Run this review for:
- all CC-1 control thresholds,
- CC-2 thresholds tied to active P0/P1 decisions,
- thresholds modified in the current quarter.

---

## Coverage Metrics

| Metric | Definition | Target |
|---|---|---:|
| Threshold-Action Coverage Rate | % in-scope thresholds with explicit action mapping | 100% |
| Unmapped Threshold Count | Threshold states without approved action path | 0 |
| Action Mapping Freshness Rate | % mappings reviewed/updated within required cadence | ≥ 95% |
| Coverage Correction On-Time Rate | % unmapped-threshold corrections closed by due date | ≥ 95% |
| Repeat Unmapped Threshold Count | Thresholds recurring as unmapped across cycles | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Mapped | Threshold state has clear action, owner, and escalation route |
| Watch | Mapping exists but is stale or partially specified |
| Unmapped | No valid response mapping for threshold state |
| Recovering | Mapping correction in progress with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Threshold ID | Action Path Defined (Y/N) | Owner Defined (Y/N) | Last Reviewed | Status | Coverage Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| CTA-001 |  |  |  |  |  |  |  |  |
| CTA-002 |  |  |  |  |  |  |  |  |
| CTA-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing threshold-action coverage review:
- [ ] all in-scope thresholds are listed and classified,
- [ ] action paths include owner, due-time expectation, and escalation route,
- [ ] unmapped/stale states include correction owners and due dates,
- [ ] repeat unmapped patterns are root-caused,
- [ ] post-correction verification confirms restored full mapping coverage.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 threshold remains Unmapped for two cycles,
- unmapped threshold count >0 for two cycles,
- action mapping freshness rate drops below target,
- repeat unmapped threshold count >0 in any cycle.

Escalation output must include:
- unmapped threshold list with exposure summary,
- coverage-remediation package with accountable owners,
- dated checkpoint proving restored threshold-action coverage.

---

## Integration Points

Use with:
- `ALIGNMENT-THRESHOLD-CALIBRATION-REVIEW.md`
- `ALIGNMENT-CONTROL-ACTIONABILITY-REVIEW.md`
- `ALIGNMENT-CONTROL-SIGNAL-ACTION-CONSISTENCY-REVIEW.md`
- `ALIGNMENT-CONTROL-RUNBOOK-COVERAGE-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
