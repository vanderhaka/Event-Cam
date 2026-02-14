# Alignment Decision Confidence Index

Use this artifact to score confidence in high-impact decisions before and after closure.

Confidence scoring prevents teams from treating weakly evidenced decisions as settled truth.

---

## Purpose

This index helps teams:
- quantify decision confidence consistently,
- distinguish evidence-backed decisions from assumption-heavy bets,
- prioritize validation work where confidence is low.

---

## Confidence Dimensions

Score each dimension from 0 to 5:

1. **Evidence Strength** — quality and relevance of supporting data.
2. **Causal Clarity** — confidence that decision is likely to drive intended outcome.
3. **Execution Readiness** — owner capacity, dependencies, and implementation feasibility.
4. **Risk Containment** — quality of mitigation, monitoring, and reversal preparedness.

---

## Confidence Formula

`Decision Confidence Score = (Evidence + Causal + Execution + Risk) / 20 * 100`

---

## Confidence Bands

| Score | Band | Interpretation | Required Action |
|---:|---|---|---|
| 85–100 | High | Decision is well-supported and execution-ready | Proceed |
| 70–84 | Moderate | Viable but has meaningful uncertainty | Proceed with enhanced monitoring |
| 50–69 | Low | Significant uncertainty or readiness gaps | Conditional approval only |
| <50 | Very Low | Decision not reliable for high-impact use | Do not approve |

---

## Canonical Confidence Table

| Decision ID | Date | Evidence (0-5) | Causal (0-5) | Execution (0-5) | Risk (0-5) | Score | Band | Approval Status | Follow-up Validation Date |
|---|---|---:|---:|---:|---:|---:|---|---|---|
| DEC-001 |  |  |  |  |  |  |  |  |  |
| DEC-002 |  |  |  |  |  |  |  |  |  |
| DEC-003 |  |  |  |  |  |  |  |  |  |

---

## Confidence Review Rules

- All P0 decisions must have confidence score recorded before closure.
- Any P0/P1 decision below 70 requires explicit conditional-approval note.
- Any score below 50 cannot be approved without leadership override.
- Re-score decisions after first outcome review to compare expected vs observed confidence.

---

## Escalation Triggers

Escalate when:
- 2+ active P0 decisions are in Low or Very Low confidence bands,
- confidence score drops by 15+ points between pre-close and post-outcome review,
- low-confidence decisions are repeatedly approved without mitigation plans.

Escalation output must include:
- validation plan owner and due date,
- conditions for confidence recovery,
- rollback trigger if confidence does not improve.

---

## Integration Points

Use with:
- `ALIGNMENT-PRIORITY0-DECISION-BRIEF.md`
- `ALIGNMENT-EVIDENCE-STANDARDS.md`
- `ALIGNMENT-DECISION-PREMORTEM.md`
- `ALIGNMENT-DECISION-OUTCOME-REVIEWS.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
