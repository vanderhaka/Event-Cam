# Alignment Control Efficiency Review

Use this artifact to verify that critical controls deliver sufficient risk-reduction value relative to their operating burden.

Without efficiency review, teams keep expensive controls active even when outcomes are weak, creating governance drag and execution slowdown.

---

## Purpose

This review ensures:
- control effort stays proportional to measurable risk-reduction outcomes,
- high-burden low-return controls are redesigned, automated, or sunset-candidated,
- governance overhead remains sustainable as the control set grows.

---

## Scope

Run this review for:
- all active CC-1 controls,
- CC-2 controls with rising maintenance or triage effort,
- controls flagged in governance-cost, overlap, or adoption exceptions.

---

## Efficiency Metrics

| Metric | Definition | Target |
|---|---|---:|
| Efficiency Coverage Rate | % in-scope controls with current value-to-cost assessment | 100% |
| High-Burden Low-Return Control Count | Controls below minimum value-to-cost threshold | 0 |
| Median Control Value-to-Cost Ratio | Median ratio across in-scope controls | improving trend |
| Efficiency Remediation On-Time Rate | % low-efficiency controls remediated by due date | ≥ 95% |
| Repeat Inefficiency Count | Controls failing efficiency threshold in consecutive cycles | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Efficient | Value-to-cost ratio meets threshold and trend is stable/improving |
| Watch | Ratio near threshold or showing mild decline |
| Inefficient | Ratio below threshold with material operating drag |
| Recovering | Improvement actions active with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Monthly Effort (hrs) | Outcome Value Score | Value-to-Cost Ratio | Status | Efficiency Owner | Improvement Due |
|---|---|---:|---:|---:|---|---|---|
| CER-001 |  |  |  |  |  |  |  |
| CER-002 |  |  |  |  |  |  |  |
| CER-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing efficiency review:
- [ ] all in-scope controls have current value-to-cost assessments,
- [ ] threshold logic is documented and applied consistently,
- [ ] inefficient controls have owner, due date, and remediation path,
- [ ] repeat inefficiency patterns are root-caused,
- [ ] post-remediation ratio trend is verified.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control is Inefficient for two consecutive cycles,
- high-burden low-return control count >0 for two cycles,
- median value-to-cost ratio declines for two cycles,
- efficiency remediation on-time rate drops below target.

Escalation output must include:
- inefficient control list with burden and outcome summary,
- redesign/automation/sunset recommendation package,
- dated checkpoint proving ratio recovery or safe deactivation.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-GOVERNANCE-COST-BUDGET.md`
- `ALIGNMENT-CONTROL-OVERLAP-ANALYSIS.md`
- `ALIGNMENT-AUTOMATION-PRIORITIZATION-SCORECARD.md`
- `ALIGNMENT-COMMAND-CENTER.md`
