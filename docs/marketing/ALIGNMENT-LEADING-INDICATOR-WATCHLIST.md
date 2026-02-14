# Alignment Leading Indicator Watchlist

Use this artifact to track early warning indicators that typically deteriorate before major KPI, decision-quality, or incident failures.

Lagging metrics show damage after impact. Leading indicators provide intervention time.

---

## Purpose

This watchlist helps teams:
- detect risk build-up before threshold breaches,
- trigger preventive action earlier,
- reduce high-severity escalations through preemptive correction.

---

## Leading Indicator Domains

Track indicators across:
- decision flow stress,
- execution reliability stress,
- governance quality drift,
- data integrity degradation,
- ownership load concentration.

---

## Indicator Severity Model

| Band | Meaning | Action |
|---|---|---|
| Watch | Slight drift from baseline | Monitor and assign owner check |
| Warning | Consistent drift with rising risk | Start preventive action within 48h |
| Critical Warning | High probability of near-term incident/degradation | Same-day containment and escalation |

---

## Canonical Watchlist Table

| Indicator ID | Indicator Name | Domain | Current Value | Baseline Range | Status (Watch/Warning/Critical Warning) | Trigger Condition | Owner | Preventive Action | Next Review Date |
|---|---|---|---:|---|---|---|---|---|---|
| LIW-001 |  |  |  |  |  |  |  |  |  |
| LIW-002 |  |  |  |  |  |  |  |  |  |
| LIW-003 |  |  |  |  |  |  |  |  |  |

---

## Recommended Starter Indicators

| Indicator | Why It Leads |
|---|---|
| Decision intake triage misses (weekly) | Predicts decision backlog and SLA failure |
| Reopened corrective actions | Predicts poor fix quality and recurring incidents |
| Active-owner high-load count | Predicts slippage and low decision quality |
| Invalid closure count | Predicts hidden unresolved risk |
| Expired evidence linked to open P0/P1 | Predicts low-confidence or incorrect approvals |
| Meeting effectiveness downgrade streak | Predicts governance overhead without outcomes |

---

## Preventive Action Rules

- Two consecutive Warning readings → open corrective action.
- Any Critical Warning → escalate in same weekly review.
- Any leading indicator with no owner for >1 business day → treat as governance incident.

---

## Weekly Review Prompts

- Which indicator moved from Watch to Warning this week?
- Which preventive actions are overdue?
- Which domains show multiple indicators worsening simultaneously?
- Which indicator thresholds need recalibration based on new evidence?

---

## Escalation Triggers

Escalate when:
- 3+ indicators enter Warning/Critical Warning in same week,
- same indicator stays Warning for 3 consecutive weeks,
- any Critical Warning has no containment action same day.

Escalation output must include:
- cross-domain root-cause hypothesis,
- preventive action owner assignments,
- expected next-week watchlist movement target.

---

## Integration Points

Use with:
- `ALIGNMENT-SIGNAL-LAG-ANALYSIS.md`
- `ALIGNMENT-CLOSURE-INTEGRITY-AUDIT.md`
- `ALIGNMENT-OWNER-LOAD-MANAGEMENT.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
