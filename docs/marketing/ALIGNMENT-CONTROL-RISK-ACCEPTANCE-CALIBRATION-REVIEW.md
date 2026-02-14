# Alignment Control Risk Acceptance Calibration Review

Use this artifact to verify whether accepted-risk decisions were proportionate to actual outcomes.

If acceptance thresholds are miscalibrated, teams either accept too much risk or waste effort over-mitigating low-risk cases.

---

## Purpose

This review ensures:
- accepted-risk decisions are evaluated against observed outcomes,
- acceptance bias (over-acceptance or over-restriction) is detected early,
- acceptance criteria are recalibrated based on evidence.

---

## Scope

Run calibration for:
- all accepted CC-1 residual risks,
- accepted CC-2 risks tied to P0/P1 decisions,
- risk classes with repeat acceptance or breach patterns.

---

## Calibration Metrics

| Metric | Definition | Target |
|---|---|---:|
| Acceptance Calibration Coverage | % accepted risks reviewed against observed outcomes | 100% |
| Over-Acceptance Rate | % accepted risks that produced avoidable adverse outcomes | declining trend |
| Over-Restriction Rate | % rejected/mitigated risks that showed low realized impact | declining trend |
| Mean Acceptance Gap | Difference between predicted accepted-risk impact and observed impact | near 0 trend |
| Recalibration Action Closure Rate | % calibration-driven policy updates closed by due date | ≥ 95% |

---

## Status Model

| Status | Meaning |
|---|---|
| Calibrated | Acceptance criteria align with observed outcomes |
| Watch | Minor calibration drift detected |
| Drifted | Material mismatch between accepted-risk predictions and outcomes |
| Recalibrating | Criteria/threshold updates underway with owner and due date |

---

## Canonical Calibration Table

| Review ID | Risk ID | Accepted Impact Prediction | Observed Impact | Gap | Status | Recalibration Owner | Recalibration Due |
|---|---|---|---|---|---|---|---|
| CRCA-001 |  |  |  |  |  |  |  |
| CRCA-002 |  |  |  |  |  |  |  |
| CRCA-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing acceptance-calibration review:
- [ ] all in-scope accepted risks are mapped to observed outcomes,
- [ ] impact scoring and gap logic are consistent,
- [ ] drifted cases have recalibration owners and due dates,
- [ ] policy/threshold updates are linked to findings,
- [ ] post-update verification checkpoint is scheduled.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- over-acceptance rate worsens for 2 cycles,
- any CC-1 accepted risk produces severe avoidable outcome,
- mean acceptance gap shows sustained directional drift,
- recalibration actions miss due dates.

Escalation output must include:
- miscalibrated risk class summary,
- recalibration action package with accountable owners,
- dated checkpoint verifying improved acceptance calibration.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-RISK-ACCEPTANCE-REVIEW.md`
- `ALIGNMENT-CONTROL-RESIDUAL-RISK-REVIEW.md`
- `ALIGNMENT-CONTROL-CONFIDENCE-CALIBRATION-REVIEW.md`
- `ALIGNMENT-DECISION-QUALITY-REGRESSION-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
