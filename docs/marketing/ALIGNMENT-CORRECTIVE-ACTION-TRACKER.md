# Alignment Corrective Action Tracker

Use this artifact to track all corrective actions from escalations, incidents, reversals, and review findings until verified closure.

Without one action tracker, fixes get fragmented across logs and recurring problems remain unresolved.

---

## Purpose

This tracker ensures:
- every corrective action has one accountable owner and due date,
- corrective work is prioritized by risk impact,
- “fixed” claims are verified before closure.

---

## Sources of Corrective Actions

Capture actions from:
- escalation reviews,
- control failure mode reviews,
- incident hotwash outputs,
- decision outcome/reversal workflows,
- commitment slippage reviews.

---

## Corrective Action Priority

| Priority | Definition | Start SLA |
|---|---|---:|
| CA-P0 | Failure threatens path integrity, P0 decisions, or critical KPI trust | Same business day |
| CA-P1 | Material quality/reliability issue with measurable execution impact | 2 business days |
| CA-P2 | Improvement action with moderate risk reduction | 5 business days |

---

## Status Model

| Status | Meaning |
|---|---|
| Logged | Action captured, not yet owner-confirmed |
| Assigned | Owner + due date accepted |
| In Progress | Execution started |
| Verification Pending | Action delivered, awaiting effectiveness proof |
| Verified Closed | Effectiveness validated and documented |
| Reopened | Action failed verification or issue recurred |

No action should remain in Logged for more than one business day.

---

## Canonical Corrective Action Table

| Action ID | Source Artifact / Event ID | Priority | Action Summary | Owner | Due Date | Verification Method | Current Status | Verification Date | Reopened (Y/N) |
|---|---|---|---|---|---|---|---|---|---|
| CA-001 |  |  |  |  |  |  |  |  |  |
| CA-002 |  |  |  |  |  |  |  |  |  |
| CA-003 |  |  |  |  |  |  |  |  |  |

---

## Closure Quality Gate

Before marking Verified Closed:
- [ ] action output is linked to original issue ID,
- [ ] expected risk-reduction signal is measured,
- [ ] evidence source is current and reliable,
- [ ] owner and reviewer sign-off captured,
- [ ] follow-up recurrence check date is set.

If any box is unchecked, status must remain Verification Pending.

---

## Weekly Review Prompts

- Which overdue CA-P0/CA-P1 actions block current decisions?
- Which actions are repeatedly reopened by source type?
- Which owners carry excessive corrective-action load?
- Which “closed” actions lack measurable risk improvement?

---

## Escalation Triggers

Escalate when:
- any CA-P0 action misses due date,
- 3+ CA-P1 actions are overdue in same week,
- reopened corrective-action rate exceeds 20% in a month,
- corrective-action backlog grows for 3 consecutive weeks.

Escalation output must include:
- forced re-prioritization decision,
- owner reallocation or support assignment,
- updated verification dates for at-risk actions.

---

## Integration Points

Use with:
- `ALIGNMENT-ESCALATION-EFFECTIVENESS-REVIEW.md`
- `ALIGNMENT-CONTROL-FAILURE-MODES.md`
- `ALIGNMENT-INCIDENT-HOTWASH-TEMPLATE.md`
- `ALIGNMENT-COMMITMENT-SLIPPAGE-PROTOCOL.md`
- `ALIGNMENT-COMMAND-CENTER.md`
