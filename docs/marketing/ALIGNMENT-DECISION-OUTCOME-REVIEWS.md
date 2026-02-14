# Alignment Decision Outcome Reviews

Use this artifact to verify whether closed decisions produced the intended outcomes after implementation.

Closing a decision is not proof of success. Outcome reviews confirm impact, expose misses, and trigger corrective action.

---

## Purpose

This control ensures:
- every high-impact decision has a scheduled outcome check,
- expected vs observed impact is reviewed with evidence,
- underperforming decisions are corrected quickly.

---

## Scope

Required for:
- all P0 decisions,
- P1 decisions with KPI or pricing impact,
- any decision that changed active operating mode or primary path.

Optional for lower-impact P1/P2 decisions.

---

## Review Timing Standard

| Decision Type | First Outcome Review | Second Outcome Review |
|---|---:|---:|
| P0 | 30 days after close | 60 days after close |
| P1 (high impact) | 30 days after close | Optional at 60 days |
| P1/P2 (lower impact) | Optional at 45 days | Not required |

If implementation is delayed, reset review clock from implementation start date.

---

## Outcome Status Model

| Status | Meaning |
|---|---|
| Confirmed | Intended KPI/behavior change achieved within threshold |
| Partial | Some movement, below intended threshold |
| No Effect | No measurable change attributable to decision |
| Negative Effect | Adverse movement or side effects detected |
| Inconclusive | Evidence insufficient or contaminated by unresolved anomalies |

---

## Canonical Review Table

| Review ID | Decision ID | Decision Priority | Review Date | Expected Outcome | Observed Outcome | Status | Recommended Action | Owner | Next Check Date |
|---|---|---|---|---|---|---|---|---|---|
| DOR-001 |  |  |  |  |  |  |  |  |  |
| DOR-002 |  |  |  |  |  |  |  |  |  |
| DOR-003 |  |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before marking review complete:
- [ ] Decision ID links to decision log and traceability row.
- [ ] Expected outcome uses pre-decision threshold.
- [ ] Observed outcome comes from canonical metric definitions.
- [ ] Data anomalies are resolved or explicitly disclosed.
- [ ] Action recommendation is explicit (reinforce / modify / reverse / monitor).

If any box is unchecked, status must be Inconclusive.

---

## Mandatory Actions by Outcome Status

- **Confirmed:** reinforce decision and codify playbook pattern.
- **Partial:** define adjustment and schedule follow-up review.
- **No Effect:** run causal investigation and consider reversal request.
- **Negative Effect:** open reversal workflow immediately.
- **Inconclusive:** resolve data/evidence gap within 5 business days.

---

## Escalation Triggers

Escalate in weekly decision review when:
- outcome review is overdue by >7 days,
- 2+ recent P0/P1 decisions are No Effect or Negative Effect,
- Inconclusive status persists beyond one review cycle.

Escalation output must include:
- owner accountability update,
- corrective action deadline,
- explicit decision on reinforcement/modification/reversal path.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISIONS-LOG.md`
- `ALIGNMENT-TRACEABILITY-MATRIX.md`
- `ALIGNMENT-DECISION-REVERSAL-PROTOCOL.md`
- `ALIGNMENT-METRIC-DEFINITIONS.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
