# Alignment Control Rollback Readiness Review

Use this artifact to verify that critical controls can be safely rolled back when changes degrade outcomes.

Without rollback readiness, teams stay trapped in failing control changes and risk compounds quickly.

---

## Purpose

This review ensures:
- control rollback paths are explicit before high-impact changes go live,
- rollback triggers are measurable and decision-authority aligned,
- rollback execution is tested and time-bounded.

---

## Scope

Required for:
- all CC-1 controls with active or recent changes,
- CC-2 controls linked to active P0/P1 decisions,
- controls with failed change outcomes or repeat incidents.

---

## Readiness Metrics

| Metric | Definition | Target |
|---|---|---:|
| Rollback-Ready Coverage Rate | % in-scope controls with documented and approved rollback path | 100% |
| Trigger Completeness Rate | % in-scope controls with explicit measurable rollback triggers | ≥ 95% |
| Rollback Drill Pass Rate | % rollback validations completing without material failure | ≥ 90% |
| Median Rollback Execution Time | Time from trigger to stabilized rollback state | improving trend |
| Failed Rollback Count | Rollback attempts that failed to restore control stability | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Ready | Rollback path, trigger, and validation are complete |
| Partial Ready | Path exists but trigger clarity or validation is incomplete |
| Not Ready | No usable rollback path for in-scope control |
| Recovering | Rollback-readiness remediation in progress |

---

## Canonical Readiness Table

| Review ID | Control Artifact | Criticality | Rollback Path Linked (Y/N) | Trigger Defined (Y/N) | Last Validation Date | Status | Action Owner | Action Due |
|---|---|---|---|---|---|---|---|---|
| RBR-001 |  |  |  |  |  |  |  |  |
| RBR-002 |  |  |  |  |  |  |  |  |
| RBR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing rollback-readiness review:
- [ ] all in-scope controls are listed and criticality-mapped,
- [ ] rollback triggers are measurable and source-linked,
- [ ] rollback paths include authority and communication routing,
- [ ] partial/not-ready controls have owners and due dates,
- [ ] rollback validation evidence is current and auditable.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control is Not Ready during active change windows,
- failed rollback count is >0 in any cycle,
- rollback readiness remains below target for 2 cycles,
- rollback-trigger ambiguity delays corrective action on high-impact controls.

Escalation output must include:
- affected control list and exposure summary,
- rollback remediation actions with accountable owners,
- dated verification checkpoint for restored rollback readiness.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-CHANGE-PROTOCOL.md`
- `ALIGNMENT-REVERSAL-TRIGGER-COVERAGE-REVIEW.md`
- `ALIGNMENT-CONTROL-FAILOVER-READINESS-REVIEW.md`
- `ALIGNMENT-RECOVERY-WINDOW-COMPLIANCE.md`
- `ALIGNMENT-COMMAND-CENTER.md`
