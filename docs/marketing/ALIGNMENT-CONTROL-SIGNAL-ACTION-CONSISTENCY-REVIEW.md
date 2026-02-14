# Alignment Control Signal-Action Consistency Review

Use this artifact to verify that similar control signals trigger consistent response actions across teams and cycles.

When equivalent signals produce inconsistent actions, teams lose trust in control logic and outcome quality degrades.

---

## Purpose

This review ensures:
- control response patterns are consistent for equivalent risk signals,
- action inconsistency is detected before it causes uneven execution outcomes,
- response standards stay reliable across owners, teams, and time periods.

---

## Scope

Run this review for:
- all CC-1 controls,
- CC-2 controls tied to active P0/P1 decision pathways,
- controls with repeated similar signals producing divergent outcomes.

---

## Consistency Metrics

| Metric | Definition | Target |
|---|---|---:|
| Signal-Action Mapping Coverage Rate | % in-scope signals with documented expected response class | 100% |
| Inconsistent Response Count | Equivalent signals resulting in materially different action classes | 0 |
| Response Consistency Rate | % equivalent signal sets handled with approved action class | ≥ 98% |
| Consistency Correction On-Time Rate | % inconsistency corrections closed by due date | ≥ 95% |
| Repeat Inconsistency Pattern Count | Controls with repeated inconsistency across cycles | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Consistent | Equivalent signals produce expected, standardized actions |
| Watch | Minor response variance requiring calibration |
| Inconsistent | Material response mismatch for equivalent signals |
| Recovering | Standardization corrections active with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Signal Class | Expected Action Class | Observed Action Class | Status | Consistency Owner | Correction Due | Notes |
|---|---|---|---|---|---|---|---|---|
| SAC-001 |  |  |  |  |  |  |  |  |
| SAC-002 |  |  |  |  |  |  |  |  |
| SAC-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing signal-action consistency review:
- [ ] all in-scope signal classes have expected action mapping,
- [ ] inconsistent cases include root-cause category,
- [ ] correction owners and due dates are assigned,
- [ ] standard-response updates are published to relevant runbooks,
- [ ] post-correction verification confirms improved consistency.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control enters Inconsistent status for two cycles,
- inconsistent response count >0 for two cycles,
- response consistency rate drops below target,
- repeat inconsistency pattern count >0 in any cycle.

Escalation output must include:
- inconsistent case list with impact summary,
- standardization package with accountable owners,
- dated checkpoint proving restored response consistency.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-SIGNAL-INTEGRITY-REVIEW.md`
- `ALIGNMENT-CONTROL-ALERT-TRIAGE-QUALITY-REVIEW.md`
- `ALIGNMENT-CONTROL-ACTIONABILITY-REVIEW.md`
- `ALIGNMENT-CONTROL-RUNBOOK-COVERAGE-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
