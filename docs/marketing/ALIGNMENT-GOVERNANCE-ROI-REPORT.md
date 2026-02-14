# Alignment Governance ROI Report

Use this artifact to evaluate whether governance effort is creating measurable execution and decision-quality gains.

If governance ROI is not tracked, teams cannot distinguish healthy discipline from expensive bureaucracy.

---

## Purpose

This report measures:
- governance cost versus measurable benefits,
- whether controls are improving decision quality and execution velocity,
- when governance intensity should be reduced or redesigned.

---

## Reporting Cadence

Run monthly and include in strategy sync materials.

Optional: mid-month pulse if governance cost is trending above budget.

---

## ROI Inputs

Collect:
- governance cost budget results,
- decision SLA compliance trend,
- contradiction/slippage/incident trends,
- meeting effectiveness trend,
- artifact utilization trend.

---

## Benefit Metrics (Monthly)

| Benefit Metric | Definition | Desired Direction |
|---|---|---|
| Decision Quality Gain | Reduction in low-confidence or reversed decisions | Up |
| Decision Velocity Gain | Improvement in on-time decision closure rate | Up |
| Drift Reduction | Reduction in unresolved contradictions/blockers | Up |
| Execution Reliability Gain | Reduction in S2/S3 slippage events | Up |
| Incident Avoidance Gain | Reduction in Sev-1/Sev-2 incidents | Up |

---

## ROI Calculation Framework

Use normalized score approach:

1. Convert each benefit metric to 0–100 improvement score.
2. Average into **Governance Benefit Score**.
3. Convert governance cost % capacity into **Governance Cost Score** (higher cost = lower score).
4. Compute:

`Governance ROI Index = Governance Benefit Score - Governance Cost Score`

---

## ROI Interpretation

| ROI Index | Interpretation | Action |
|---:|---|---|
| +20 or higher | Governance clearly paying off | Maintain current model |
| +5 to +19 | Positive but moderate return | Optimize selectively |
| -4 to +4 | Flat return | Review controls for simplification |
| -5 or lower | Negative return | Trigger governance redesign immediately |

---

## Monthly ROI Table

| Month | Benefit Score | Cost Score | ROI Index | Trend vs Prior Month | Recommended Action | Owner |
|---|---:|---:|---:|---|---|---|
| [YYYY-MM] |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |

---

## Escalation Triggers

Escalate to leadership when:
- ROI Index is negative for 2 consecutive months,
- cost rises while all benefit metrics are flat or deteriorating,
- governance redesign actions are deferred for 2+ cycles.

Escalation output must include:
- controls to simplify, merge, or retire,
- target ROI recovery window,
- owner and review date.

---

## Integration Points

Use with:
- `ALIGNMENT-GOVERNANCE-COST-BUDGET.md`
- `ALIGNMENT-CONTROL-PORTFOLIO-REVIEW.md`
- `ALIGNMENT-MEETING-EFFECTIVENESS-REVIEW.md`
- `ALIGNMENT-ARTIFACT-USAGE-TELEMETRY.md`
- `ALIGNMENT-MONTHLY-REVIEW-TEMPLATE.md`
