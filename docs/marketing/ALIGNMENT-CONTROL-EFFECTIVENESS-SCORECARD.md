# Alignment Control Effectiveness Scorecard

Use this scorecard to evaluate whether each active control is producing measurable risk reduction relative to its operating cost.

A control should remain active only if it is used, improves outcomes, and justifies its overhead.

---

## Purpose

This scorecard helps teams:
- measure control-level effectiveness consistently,
- distinguish high-value controls from overhead-heavy controls,
- provide objective input for keep/merge/retire decisions.

---

## Scoring Dimensions

Score each dimension from 0 to 5:

1. **Adoption Strength** — control is consistently followed in required workflows.
2. **Outcome Impact** — control measurably reduces targeted failure/risk signals.
3. **Response Quality** — control improves speed/quality of mitigation decisions.
4. **Evidence Integrity** — control outputs are evidence-linked and audit-valid.
5. **Cost Efficiency** — control value is high relative to time/coordination cost.

---

## Effectiveness Formula

`Control Effectiveness Score = (Adoption + Outcome + Response + Evidence + Efficiency) / 25 * 100`

---

## Effectiveness Bands

| Score | Band | Interpretation | Default Action |
|---:|---|---|---|
| 85–100 | High | Control is reliable and high-value | Keep |
| 70–84 | Solid | Value present, some improvement needed | Keep + optimize |
| 50–69 | Weak | Limited value or quality gaps | Redesign or merge |
| <50 | Failing | Low value or high burden | Retire/replace candidate |

---

## Canonical Scorecard Table

| Control Artifact | Review Date | Adoption (0-5) | Outcome (0-5) | Response (0-5) | Evidence (0-5) | Efficiency (0-5) | Score | Band | Decision |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| [Artifact 1] |  |  |  |  |  |  |  |  |  |
| [Artifact 2] |  |  |  |  |  |  |  |  |  |
| [Artifact 3] |  |  |  |  |  |  |  |  |  |

---

## Monthly Review Rules

- Score all controls in the active artifact set.
- Any control below 70 must have explicit improvement action.
- Any control below 50 for two consecutive cycles must enter portfolio decision review.
- Review score trends, not only single-cycle snapshots.

---

## Quality Gate

Before finalizing monthly scores:
- [ ] scoring evidence links are attached,
- [ ] adoption input reflects latest compliance review,
- [ ] outcome input reflects current risk/incident trends,
- [ ] efficiency input uses current governance-cost data,
- [ ] decision (keep/optimize/merge/retire) is owner-approved.

If any item is unchecked, score is provisional.

---

## Escalation Triggers

Escalate when:
- 20%+ of active controls score below 70 in one cycle,
- any critical control scores below 50,
- control score deterioration continues for 3 consecutive cycles,
- low-scoring controls remain active without remediation.

Escalation output must include:
- control-level remediation or retirement decisions,
- owner assignments and deadlines,
- next-cycle recovery targets.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-PORTFOLIO-REVIEW.md`
- `ALIGNMENT-GOVERNANCE-ROI-REPORT.md`
- `ALIGNMENT-CONTROL-ADOPTION-COMPLIANCE.md`
- `ALIGNMENT-GOVERNANCE-COST-BUDGET.md`
- `ALIGNMENT-COMMAND-CENTER.md`
