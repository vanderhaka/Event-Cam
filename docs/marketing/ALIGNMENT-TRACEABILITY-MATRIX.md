# Alignment Traceability Matrix

Use this matrix to connect strategy decisions to execution artifacts, KPIs, and outcomes.

Without traceability, teams cannot prove whether decisions actually changed execution results.

---

## Purpose

This artifact ensures every material decision can be traced end-to-end:

**Decision → Plan Change → Execution Activity → KPI Movement → Review Outcome**

It is designed to reduce:
- decision theater (decisions that do not translate into action),
- metric ambiguity (movement without causal context),
- accountability gaps (nobody owning follow-through).

---

## When to Use

Use this matrix when:
- a Priority 0 or Priority 1 decision is closed,
- a path change is approved mid-quarter,
- KPI movement requires causal explanation,
- leadership asks “what did this decision actually change?”

---

## Traceability Fields

Each row should represent one decision-to-outcome chain.

- **Trace ID**
- **Decision ID** (from `ALIGNMENT-DECISIONS-LOG.md`)
- **Decision Summary**
- **Effective Date**
- **Impacted Artifact(s)**
- **Execution Workstream**
- **Owner**
- **KPI(s) Expected to Move**
- **Expected Direction** (Up/Down/Stable)
- **Earliest Signal Date**
- **Observed Signal**
- **Outcome Status** (`Pending`, `On Track`, `Off Track`, `Needs Reversal`)
- **Follow-up Action**
- **Review Link**

---

## Canonical Matrix Table

| Trace ID | Decision ID | Decision Summary | Effective Date | Workstream | KPI Target | Expected Direction | Earliest Signal | Observed Signal | Status | Owner | Follow-up |
|---|---|---|---|---|---|---|---|---|---|---|---|
| TR-001 | DEC-000 | [Summary] | [Date] | [Channel / Pricing / Ops] | [Metric] | Up | [Date] | [TBD] | Pending | [Name] | [Action] |
| TR-002 | DEC-000 |  |  |  |  |  |  |  | Pending |  |  |
| TR-003 | DEC-000 |  |  |  |  |  |  |  | Pending |  |  |

---

## Status Definitions

- **Pending** — Decision is closed, but signal window has not started.
- **On Track** — Signals are moving in expected direction with no major guardrail breach.
- **Off Track** — Signals are flat/negative versus expected direction.
- **Needs Reversal** — Negative impact is sustained; decision rollback or redesign required.

---

## Operating Protocol

### Weekly
1. Update observed signal for all active rows.
2. Flag rows with missed earliest signal date.
3. Escalate any row that stays Off Track for 2 consecutive reviews.

### Monthly
1. Evaluate whether each decision produced measurable change.
2. Mark rows as validated / not validated.
3. Feed results into retrospective and next decision cycle.

---

## Quality Bar

A row is valid only if:
- Decision ID exists in decision log.
- KPI expected to move is defined in metric definitions.
- Owner is assigned.
- Earliest signal date is realistic and documented.

Reject rows that omit any of these fields.

---

## Escalation Rules

Escalate to leadership review when:
- a Priority 0 decision shows Off Track status for 2+ weeks,
- a row reaches Needs Reversal,
- the same KPI is impacted by 3+ concurrent decisions (causal ambiguity risk).

Escalated rows must include a forced action by next decision meeting:
- continue,
- modify,
- reverse.

---

## Integration Points

Use alongside:
- `ALIGNMENT-DECISIONS-LOG.md` (source of decision truth)
- `ALIGNMENT-DASHBOARD-TEMPLATE.md` (weekly KPI view)
- `ALIGNMENT-METRIC-DEFINITIONS.md` (metric consistency)
- `ALIGNMENT-RETROSPECTIVE-TEMPLATE.md` (quarterly learning loop)
