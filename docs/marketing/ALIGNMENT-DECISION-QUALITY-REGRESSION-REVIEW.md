# Alignment Decision Quality Regression Review

Use this artifact to detect and correct sustained degradation in decision quality before it compounds into reversals, slippage, and strategy drift.

Decision quality often regresses gradually; without trend review, teams discover the drop only after major impact.

---

## Purpose

This review ensures:
- decision quality trends are monitored over time, not judged one decision at a time,
- early regression signals trigger intervention before major failures,
- quality standards are tightened when approval behavior drifts.

---

## Scope

Review quality regression across:
- P0 and high-impact P1 decisions,
- confidence scoring and outcome consistency,
- evidence quality and freshness compliance,
- reversal and no-effect trend frequency.

---

## Regression Metrics

| Metric | Definition | Target |
|---|---|---:|
| Low-Confidence Approval Rate | % P0/P1 approvals below defined confidence threshold | declining trend |
| No-Effect/Negative Outcome Rate | % reviewed decisions classified No Effect or Negative Effect | ≤ 20% |
| Decision Reversal Rate | % closed decisions entering reversal workflow | ≤ 15% |
| Evidence Deficiency Rate | % decisions approved with weak/expired evidence exceptions | ≤ 10% |
| Decision Quality Composite | Weighted score of confidence, outcomes, reversals, and evidence compliance | stable or improving trend |

---

## Regression Status Model

| Status | Meaning |
|---|---|
| Stable | Quality metrics within target range |
| Early Regression | One or more metrics trending worse for 2 consecutive cycles |
| Material Regression | Multiple metrics beyond tolerance requiring immediate intervention |
| Recovery | Remediation active and trend improving |

---

## Canonical Regression Review Table

| Review Month | Low-Confidence Approval Rate | No-Effect/Negative Rate | Reversal Rate | Evidence Deficiency Rate | Composite Score | Status | Primary Corrective Action |
|---|---:|---:|---:|---:|---:|---|---|
| [YYYY-MM] |  |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |  |

---

## Intervention Playbook

When regression is detected:
1. tighten evidence standards for high-impact approvals,
2. require premortem depth increase for P0 decisions,
3. elevate review authority for low-confidence approvals,
4. reduce active decision WIP until quality stabilizes.

---

## Quality Gate

Before declaring regression recovered:
- [ ] two consecutive cycles show improving composite score,
- [ ] reversal rate is back within tolerance,
- [ ] evidence deficiency trend has stabilized,
- [ ] low-confidence approvals include explicit mitigation compliance,
- [ ] intervention actions are documented and adopted.

---

## Escalation Triggers

Escalate when:
- decision quality composite declines for 3 consecutive cycles,
- reversal rate exceeds threshold in 2 consecutive months,
- low-confidence approvals rise while outcomes worsen,
- regression persists after one full remediation cycle.

Escalation output must include:
- regression root-cause hypothesis,
- policy/process changes with owners and dates,
- verification targets for next two review cycles.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-CONFIDENCE-INDEX.md`
- `ALIGNMENT-DECISION-CALIBRATION-REPORT.md`
- `ALIGNMENT-DECISION-OUTCOME-REVIEWS.md`
- `ALIGNMENT-DECISION-REVERSAL-PROTOCOL.md`
- `ALIGNMENT-COMMAND-CENTER.md`
