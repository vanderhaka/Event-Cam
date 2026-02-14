# Alignment Escalation Effectiveness Review

Use this artifact to verify whether escalations are actually resolving risks, not just moving items up the chain.

Escalation volume without resolution creates false confidence and recurring incidents.

---

## Purpose

This review ensures:
- escalations are resolved within target windows,
- escalation outcomes remove root causes (not only symptoms),
- recurring escalation themes are reduced cycle-over-cycle.

---

## Scope

Review all escalations from:
- decision reviews,
- incident/on-call flows,
- blocker and dependency escalations,
- control-failure and override escalations.

---

## Effectiveness Metrics

| Metric | Definition | Target |
|---|---|---:|
| Escalation Resolution SLA | % escalations closed within required response window | ≥ 90% |
| Root-Cause Closure Rate | % closed escalations with verified root-cause fix | ≥ 80% |
| Recurrence Rate | % escalated issues reappearing within 30 days | ≤ 15% |
| Escalation-to-Decision Lag | Time from escalation to explicit decision/owner action | ≤ 2 business days |
| Orphan Escalation Count | Escalations open without owner or due date | 0 |

---

## Escalation Status Model

| Status | Meaning |
|---|---|
| Open | Escalation logged, not yet triaged |
| Assigned | Accountable owner and due date set |
| In Resolution | Corrective action in progress |
| Verified | Fix validated by evidence |
| Closed | Outcome accepted and logged |
| Reopened | Issue recurred or verification failed |

No escalation should remain in Open for more than one business day.

---

## Canonical Escalation Review Table

| Escalation ID | Source Flow | Severity | Open Date | Owner | Due Date | Resolution Date | Root Cause Class | Outcome (Resolved/Partial/Failed) | Reopened (Y/N) |
|---|---|---|---|---|---|---|---|---|---|
| ESR-001 |  |  |  |  |  |  |  |  |  |
| ESR-002 |  |  |  |  |  |  |  |  |  |
| ESR-003 |  |  |  |  |  |  |  |  |  |

---

## Quality Gate

Before marking an escalation Closed:
- [ ] owner and due date were explicitly assigned,
- [ ] action taken is linked to affected control/workflow,
- [ ] root cause class is documented,
- [ ] verification evidence is attached,
- [ ] recurrence check date is scheduled.

If any item is unchecked, close status is invalid.

---

## Recurrence Prevention Rules

When an escalation is Reopened:
1. raise severity one level (when feasible),
2. require control-update packet if policy/process change is needed,
3. assign secondary reviewer for verification,
4. set 30-day recurrence watch checkpoint.

---

## Escalation Triggers

Escalate escalation-governance review when:
- escalation resolution SLA drops below 80% in any week,
- 3+ escalations reopen in a month,
- high-severity escalation remains unresolved beyond due date,
- recurrence rate worsens for 2 consecutive months.

Escalation output must include:
- root-cause trend summary,
- owner/accountability changes,
- corrective plan with date-bound verification.

---

## Integration Points

Use with:
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-ONCALL-ESCALATION-MATRIX.md`
- `ALIGNMENT-ESCALATION-PLAYCARDS.md`
- `ALIGNMENT-CONTROL-FAILURE-MODES.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
