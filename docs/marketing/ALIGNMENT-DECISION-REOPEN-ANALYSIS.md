# Alignment Decision Reopen Analysis

Use this artifact to analyze why previously closed decisions are being reopened and to reduce repeated decision churn.

Frequent reopen events indicate weak closure quality, unstable assumptions, or unresolved dependency risk.

---

## Purpose

This analysis ensures:
- reopen patterns are visible and classified,
- root causes are addressed instead of repeatedly re-debating decisions,
- reopen volume declines over time.

---

## Scope

Review reopened decisions across:
- P0 and high-impact P1 items,
- pricing/narrative/path decisions,
- decisions reopened after outcome reviews or contradictions.

---

## Reopen Metrics

| Metric | Definition | Target |
|---|---|---:|
| Reopen Rate | % closed decisions reopened within 60 days | ≤ 10% |
| Repeat Reopen Rate | % decisions reopened more than once | ≤ 5% |
| Time-to-Reopen | Median days from close to reopen | increasing trend |
| Root-Cause Classified Rate | % reopened decisions with explicit cause category | 100% |
| Reclose Stability Rate | % reopened decisions that stay closed for 60 days after reclose | ≥ 85% |

---

## Reopen Cause Categories

Use one primary cause:
- insufficient evidence at closure,
- dependency not truly resolved,
- contradictory policy/control guidance,
- outcome underperformance,
- external context shift,
- ownership/execution failure.

---

## Canonical Reopen Table

| Reopen ID | Decision ID | Original Close Date | Reopen Date | Cause Category | Trigger Signal | Reopen Owner | Corrective Path | Reclose Date | Stable 60d (Y/N) |
|---|---|---|---|---|---|---|---|---|---|
| DRA-001 |  |  |  |  |  |  |  |  |  |
| DRA-002 |  |  |  |  |  |  |  |  |  |
| DRA-003 |  |  |  |  |  |  |  |  |  |

---

## Quality Gate

Before closing a reopened decision:
- [ ] reopen cause category is documented,
- [ ] deficient closure element is corrected,
- [ ] dependency/contradiction issues are explicitly resolved,
- [ ] updated evidence and confidence are recorded,
- [ ] 60-day stability checkpoint is scheduled.

If any item is unchecked, decision should remain open.

---

## Escalation Triggers

Escalate when:
- reopen rate exceeds target for 2 consecutive cycles,
- any P0 decision reopens more than once,
- same cause category drives 3+ reopens in one month,
- reopened decisions block active path commitments.

Escalation output must include:
- dominant reopen-cause trend,
- policy/process correction owner and due date,
- reclose-stability target for next cycle.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISIONS-LOG.md`
- `ALIGNMENT-DECISION-OUTCOME-REVIEWS.md`
- `ALIGNMENT-DECISION-REVERSAL-PROTOCOL.md`
- `ALIGNMENT-DECISION-QUALITY-REGRESSION-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
