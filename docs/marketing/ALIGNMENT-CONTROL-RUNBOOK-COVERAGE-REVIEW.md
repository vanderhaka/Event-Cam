# Alignment Control Runbook Coverage Review

Use this artifact to verify that every critical control has a current, executable runbook and validation evidence.

When controls lack clear runbooks, teams respond inconsistently during incidents and recovery slows.

---

## Purpose

This review ensures:
- critical controls have explicit step-by-step operating and recovery guidance,
- runbooks are current and role-mapped to active owners,
- runbooks are validated through periodic drills or real incident verification.

---

## Scope

Required for:
- all CC-1 and CC-2 controls,
- controls with repeated incidents/escalations,
- controls changed in the current or prior cycle.

---

## Coverage Metrics

| Metric | Definition | Target |
|---|---|---:|
| Runbook Coverage Rate | % in-scope controls with linked runbook | 100% |
| Validated Runbook Rate | % in-scope controls with runbook validated within cadence | ≥ 95% |
| Stale Runbook Count | In-scope controls with out-of-date runbook content | 0 |
| Drill Pass Rate | % runbook drills completed without material execution gaps | ≥ 90% |
| Incident Without Runbook Count | Incidents where responders lacked applicable runbook | 0 |

---

## Coverage Status Model

| Status | Meaning |
|---|---|
| Covered | Runbook exists, current, and validated |
| Partial Coverage | Runbook exists but outdated or unvalidated |
| Uncovered | No runbook linked for in-scope control |
| Correcting | Runbook creation/update/validation in progress |

---

## Canonical Coverage Table

| Review ID | Control Artifact | Criticality | Runbook Link | Last Validated Date | Validation Method (Drill/Incident) | Status | Gap Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| CRC-001 |  |  |  |  |  |  |  |  |
| CRC-002 |  |  |  |  |  |  |  |  |
| CRC-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing runbook-coverage review:
- [ ] all in-scope controls are listed,
- [ ] each control has an active runbook reference,
- [ ] stale/unvalidated runbooks have correction owners and due dates,
- [ ] validation evidence (drill or incident) is logged,
- [ ] ownership and escalation roles in runbooks match current org assignments.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control is Uncovered,
- stale runbook count remains >0 for two consecutive cycles,
- incident occurs without an applicable runbook,
- runbook validation rate drops below target for two cycles.

Escalation output must include:
- uncovered/stale runbook list with risk impact,
- dated correction and validation plan with accountable owners,
- verification checkpoint confirming restored coverage.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-CRITICALITY-MAP.md`
- `ALIGNMENT-ESCALATION-PLAYCARDS.md`
- `ALIGNMENT-ONCALL-ESCALATION-MATRIX.md`
- `ALIGNMENT-CONTROL-OWNER-COVERAGE-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
