# Alignment Control Ownership Churn Review

Use this artifact to monitor ownership turnover on critical controls and prevent stability loss from frequent handoffs.

Frequent owner changes without structured continuity create hidden reliability and decision-quality risk.

---

## Purpose

This review ensures:
- ownership churn on critical controls is visible and measured,
- high-churn controls receive continuity safeguards quickly,
- recurring churn patterns trigger structural ownership redesign.

---

## Scope

Track ownership churn for:
- all CC-1 controls,
- CC-2 controls tied to active P0/P1 decisions,
- controls with two or more owner changes in the current quarter.

---

## Churn Metrics

| Metric | Definition | Target |
|---|---|---:|
| Ownership Stability Rate | % in-scope controls with no unplanned owner turnover in cycle | ≥ 95% |
| High-Churn Control Count | In-scope controls with 2+ owner changes in quarter | 0 |
| Unplanned Transition Count | Owner changes without documented handoff packet or successor validation | 0 |
| Transition Recovery Time | Time to restore stable performance after owner change | ≤ 5 business days |
| Repeat Churn Pattern Count | Controls with repeated high-churn status across consecutive quarters | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| Stable | Ownership continuity intact; no material churn risk |
| Watch | Owner change occurred; continuity risk manageable |
| At Risk | High churn or unplanned transitions threaten control reliability |
| Recovering | Churn mitigation in progress with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Criticality | Owner Changes This Quarter | Unplanned Transition (Y/N) | Recovery Status | Status | Mitigation Owner | Mitigation Due |
|---|---|---|---:|---|---|---|---|---|
| OCR-001 |  |  |  |  |  |  |  |  |
| OCR-002 |  |  |  |  |  |  |  |  |
| OCR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing ownership-churn review:
- [ ] all in-scope controls are listed with current/previous owners,
- [ ] owner changes are classified planned vs unplanned,
- [ ] at-risk controls have mitigation owners and due dates,
- [ ] churn-related performance impact is documented,
- [ ] stabilized controls have verified continuity evidence.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control enters At Risk due to ownership churn,
- unplanned transition count >0 for two consecutive cycles,
- high-churn control count rises cycle-over-cycle,
- repeat churn pattern appears in same control family.

Escalation output must include:
- at-risk control list and continuity-impact summary,
- mitigation and ownership redesign actions with accountable owners,
- dated verification checkpoint proving restored ownership stability.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-SUCCESSION-READINESS-REVIEW.md`
- `ALIGNMENT-HANDOFF-RELIABILITY-REVIEW.md`
- `ALIGNMENT-OWNER-CAPACITY-FORECAST.md`
- `ALIGNMENT-OWNER-LOAD-MANAGEMENT.md`
- `ALIGNMENT-COMMAND-CENTER.md`
