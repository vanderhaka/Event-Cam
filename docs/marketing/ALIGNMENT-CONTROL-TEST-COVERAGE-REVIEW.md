# Alignment Control Test Coverage Review

Use this artifact to verify that critical controls are fully test-covered across runbook validation, drill execution, and failover readiness.

A control that is only partially tested can appear compliant while still failing in real incidents.

---

## Purpose

This review ensures:
- critical controls have complete multi-layer test coverage,
- coverage gaps are visible before incidents expose them,
- corrective test work is prioritized and closed quickly.

---

## Scope

Required for:
- all CC-1 controls,
- CC-2 controls supporting active P0/P1 decisions,
- controls with recent incidents, escalations, or major changes.

---

## Coverage Metrics

| Metric | Definition | Target |
|---|---|---:|
| Full Test Coverage Rate | % in-scope controls with current runbook, drill, and failover validation evidence | 100% |
| Partial Coverage Count | In-scope controls missing one or more required test layers | 0 |
| Untested Critical Control Count | CC-1 controls without any current validation evidence | 0 |
| Coverage Correction Lead Time | Time from gap detection to restored full coverage | ≤ 2 business days |
| Test Coverage Stability Rate | % in-scope controls maintaining full coverage across consecutive cycles | ≥ 95% |

---

## Coverage Status Model

| Status | Meaning |
|---|---|
| Fully Covered | Runbook, drill, and failover tests are current and valid |
| Partially Covered | One required test layer missing or stale |
| Uncovered | Multiple required test layers missing |
| Correcting | Gap remediation underway with owner and due date |

---

## Canonical Coverage Table

| Review ID | Control Artifact | Criticality | Runbook Validated (Y/N) | Drill Validated (Y/N) | Failover Validated (Y/N) | Status | Gap Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| TCR-001 |  |  |  |  |  |  |  |  |
| TCR-002 |  |  |  |  |  |  |  |  |
| TCR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing test-coverage review:
- [ ] all in-scope controls are listed and criticality-mapped,
- [ ] runbook, drill, and failover validation links are current,
- [ ] partial/uncovered controls have correction owners and due dates,
- [ ] repeated coverage gaps are root-caused and actioned,
- [ ] restored coverage is verified in linked control artifacts.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control is not Fully Covered,
- same control remains Partially Covered/Uncovered for 2 cycles,
- untested critical control count is >0 in any cycle,
- test-coverage stability drops below target for 2 cycles.

Escalation output must include:
- uncovered control list with risk exposure summary,
- remediation plan with accountable owners,
- dated verification checkpoint proving restored full coverage.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-RUNBOOK-COVERAGE-REVIEW.md`
- `ALIGNMENT-CONTROL-DRILL-EFFECTIVENESS-REVIEW.md`
- `ALIGNMENT-CONTROL-FAILOVER-READINESS-REVIEW.md`
- `ALIGNMENT-CONTROL-CRITICALITY-MAP.md`
- `ALIGNMENT-COMMAND-CENTER.md`
