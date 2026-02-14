# Alignment Control Documentation Drift Review

Use this artifact to detect when control documentation no longer matches actual operating behavior.

When docs drift from reality, teams execute inconsistent workflows and lose trust in governance guidance.

---

## Purpose

This review ensures:
- control documentation stays synchronized with live workflows,
- drift is identified before causing misexecution or contradictory decisions,
- documentation corrections are prioritized and verified quickly.

---

## Scope

Run this review for:
- all CC-1 controls,
- CC-2 controls with recent process changes,
- controls with repeated operator confusion, exceptions, or reopening patterns.

---

## Drift Metrics

| Metric | Definition | Target |
|---|---|---:|
| Documentation Sync Rate | % in-scope controls whose docs match current workflow behavior | 100% |
| Documentation Drift Count | In-scope controls with material doc-vs-reality mismatch | 0 |
| Drift Exposure Count | Decision/operation incidents linked to documentation mismatch | 0 |
| Drift Correction Lead Time | Time from drift detection to verified documentation correction | ≤ 2 business days |
| Repeat Drift Pattern Count | Controls with recurring documentation drift across cycles | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| Synced | Documentation accurately reflects live control behavior |
| Watch | Minor mismatch detected; low immediate risk |
| Drifted | Material mismatch creating execution or decision risk |
| Recovering | Documentation remediation underway with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Live Workflow Reference | Documentation Match (Y/N) | Drift Impact Note | Status | Correction Owner | Correction Due |
|---|---|---|---|---|---|---|---|
| CDD-001 |  |  |  |  |  |  |  |
| CDD-002 |  |  |  |  |  |  |  |
| CDD-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing documentation-drift review:
- [ ] all in-scope controls are checked against live workflows,
- [ ] material drift includes impact/exposure notes,
- [ ] drifted controls have correction owners and due dates,
- [ ] corrected docs are verified against current operations,
- [ ] repeat drift causes are root-caused and actioned.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control is Drifted,
- documentation drift count >0 for two consecutive cycles,
- drift exposure count increases cycle-over-cycle,
- same control family shows recurring drift.

Escalation output must include:
- drifted-control list and exposure summary,
- correction plan with accountable owners,
- dated verification checkpoint proving restored documentation sync.

---

## Integration Points

Use with:
- `ALIGNMENT-DOC-QUALITY-SCORECARD.MD`
- `ALIGNMENT-CONTROL-CHANGE-PROTOCOL.md`
- `ALIGNMENT-CANONICAL-SOURCE-COMPLIANCE-REVIEW.md`
- `ALIGNMENT-HANDOFF-RELIABILITY-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
