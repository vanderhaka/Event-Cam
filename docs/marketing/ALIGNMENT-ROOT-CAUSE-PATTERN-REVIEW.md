# Alignment Root Cause Pattern Review

Use this artifact to consolidate root-cause signals across incidents, escalations, slippage, reopen events, and control failures.

Without pattern-level review, teams fix symptoms repeatedly while systemic causes remain active.

---

## Purpose

This review ensures:
- root-cause categories are tracked consistently across workflows,
- recurring causes are prioritized for structural fixes,
- corrective efforts focus on causes with highest aggregate impact.

---

## Scope

Aggregate root causes from:
- commitment slippage logs,
- escalation effectiveness reviews,
- control failure mode logs,
- decision reopen analysis,
- incident hotwash outputs.

---

## Core Pattern Metrics

| Metric | Definition | Target |
|---|---|---:|
| Classified Root Cause Rate | % reviewed events with explicit primary cause category | 100% |
| Top-3 Cause Concentration | % total events driven by top 3 causes | declining trend |
| Repeat Cause Recurrence | Number of cycles where same cause remains top contributor | declining trend |
| Structural Fix Yield | % top causes with approved systemic fix plan | ≥ 80% |
| Post-Fix Recurrence Drop | % reduction in event recurrence after fix implementation | improving trend |

---

## Standard Cause Categories

Use one primary cause per event:
- planning scope error,
- ownership/capacity overload,
- dependency coordination failure,
- data/evidence quality failure,
- control design gap,
- control adoption/non-compliance,
- policy ambiguity/conflict.

---

## Canonical Pattern Table

| Review Period | Cause Category | Event Count | Severity Mix (High/Critical %) | Trend vs Prior Period | Structural Fix Status | Owner | Next Check Date |
|---|---|---:|---:|---|---|---|---|
| [YYYY-MM] |  |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before publishing pattern review:
- [ ] all source workflows mapped to shared cause taxonomy,
- [ ] high-severity events all have assigned cause category,
- [ ] top recurring causes have named structural-fix owners,
- [ ] fixes include expected impact metric and date,
- [ ] recurrence trend is explicitly interpreted.

If any item is unchecked, review is incomplete.

---

## Prioritization Rules

- Prioritize causes by: severity-weighted count × recurrence × cross-workflow spread.
- Any cause appearing in 3+ workflows should trigger systemic remediation (not local patch only).
- Causes tied to P0 decisions or CC-1 controls always rank above local efficiency issues.

---

## Escalation Triggers

Escalate when:
- top cause remains unchanged for 3 consecutive cycles,
- high-severity events increase while same cause category dominates,
- structural fix plans are missing for recurring top causes,
- post-fix recurrence fails to improve after one full cycle.

Escalation output must include:
- top-cause intervention plan,
- owner/accountability update,
- expected recurrence-reduction target for next cycle.

---

## Integration Points

Use with:
- `ALIGNMENT-COMMITMENT-SLIPPAGE-PROTOCOL.md`
- `ALIGNMENT-CONTROL-FAILURE-MODES.md`
- `ALIGNMENT-DECISION-REOPEN-ANALYSIS.md`
- `ALIGNMENT-ESCALATION-EFFECTIVENESS-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
