# Alignment Control Actionability Review

Use this artifact to verify that control outputs consistently produce clear, executable actions.

When controls generate signals without actionable next steps, teams collect data but delay correction.

---

## Purpose

This review ensures:
- control findings are translated into explicit actions with owners and due dates,
- non-actionable outputs are detected and redesigned quickly,
- execution closes the loop from signal to verified intervention.

---

## Scope

Run this review for:
- all CC-1 controls,
- CC-2 controls supporting active P0/P1 decisions,
- controls with repeated unresolved alerts, exceptions, or review findings.

---

## Actionability Metrics

| Metric | Definition | Target |
|---|---|---:|
| Actionability Coverage Rate | % in-scope outputs with explicit action owner + due date | 100% |
| Non-Actionable Output Count | Outputs lacking clear next step or ownership | 0 |
| Signal-to-Action Lead Time | Median time from control signal to assigned action | declining trend |
| Action Closure On-Time Rate | % assigned control actions closed by due date | ≥ 95% |
| Repeat Non-Actionable Pattern Count | Repeated non-actionable outputs by control | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Actionable | Output includes clear action, owner, due date, and closure criteria |
| Watch | Action quality or ownership is partial/unclear |
| Non-Actionable | Output cannot be executed without clarification |
| Recovering | Corrective redesign of action logic underway |

---

## Canonical Review Table

| Review ID | Control Artifact | Output/Event ID | Action Defined (Y/N) | Owner Assigned (Y/N) | Due Date Set (Y/N) | Status | Actionability Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| CAR-001 |  |  |  |  |  |  |  |  |
| CAR-002 |  |  |  |  |  |  |  |  |
| CAR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing control-actionability review:
- [ ] all in-scope outputs are assessed for actionability,
- [ ] non-actionable outputs include root cause category,
- [ ] correction owners and due dates are assigned,
- [ ] closure criteria are defined for each corrective action,
- [ ] post-correction verification confirms actionability improvement.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control produces Non-Actionable outputs in two consecutive cycles,
- non-actionable output count >0 for two cycles,
- signal-to-action lead time worsens for two cycles,
- action closure on-time rate falls below target.

Escalation output must include:
- non-actionable output list with impact summary,
- redesign package with accountable owners and due dates,
- dated checkpoint proving restored actionability.

---

## Integration Points

Use with:
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-CONTROL-EXECUTION-FRICTION-REVIEW.md`
- `ALIGNMENT-COMMITMENT-SLIPPAGE-PROTOCOL.md`
- `ALIGNMENT-COMMAND-CENTER.md`
