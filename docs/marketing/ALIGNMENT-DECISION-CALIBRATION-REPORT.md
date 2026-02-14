# Alignment Decision Calibration Report

Use this artifact to compare pre-decision confidence scores against actual decision outcomes.

If confidence scoring is never calibrated, teams over-trust weak predictions and repeat avoidable mistakes.

---

## Purpose

This report helps teams:
- measure how accurate decision confidence scores are over time,
- identify systematic optimism/pessimism in decision approvals,
- improve decision quality by tightening confidence-scoring discipline.

---

## Calibration Questions

1. Did high-confidence decisions actually outperform lower-confidence decisions?
2. Are low-confidence approvals producing disproportionate reversals or negative effects?
3. Are confidence scores drifting away from real-world outcomes?

---

## Calibration Window

Run monthly on all decisions that have:
- a recorded confidence score at approval time, and
- at least one completed outcome review.

Include all P0 decisions and any high-impact P1 decisions.

---

## Outcome Mapping

Map outcome statuses to numeric values for calibration analysis:

| Outcome Status | Calibration Value |
|---|---:|
| Confirmed | 1.0 |
| Partial | 0.6 |
| Inconclusive | 0.5 |
| No Effect | 0.2 |
| Negative Effect | 0.0 |

---

## Calibration Table

| Decision ID | Approval Confidence Score | Confidence Band | Outcome Status | Calibration Value | Gap (Observed - Expected) | Notes |
|---|---:|---|---|---:|---:|---|
| DEC-001 |  |  |  |  |  |  |
| DEC-002 |  |  |  |  |  |  |
| DEC-003 |  |  |  |  |  |  |

Expected value guidance:
- High band: 0.85
- Moderate band: 0.75
- Low band: 0.60
- Very Low band: 0.45

---

## Calibration Metrics

| Metric | Definition | Target |
|---|---|---:|
| Mean Calibration Gap | Average (Observed - Expected) across decisions | -0.10 to +0.10 |
| High-Band Failure Rate | % High-band decisions with No Effect/Negative outcomes | < 15% |
| Low-Band Override Rate | % Low/Very Low decisions approved anyway | declining trend |
| Confidence Drift Index | Absolute average gap over trailing 3 months | declining trend |

---

## Interpretation Rules

- **Near-zero mean gap:** confidence model is reasonably calibrated.
- **Persistent negative gap:** approval confidence is overstated (optimism bias).
- **Persistent positive gap:** model may be overly conservative.
- **High-band failure spike:** tighten evidence and premortem standards immediately.

---

## Corrective Actions

When calibration worsens:
1. Re-train scoring practice for decision owners.
2. Raise evidence requirement for high-band ratings.
3. Require leadership review for low-band overrides.
4. Update confidence-score examples in decision templates.

---

## Escalation Triggers

Escalate in monthly strategy sync when:
- mean calibration gap is below -0.15 for 2 consecutive months,
- high-band failure rate exceeds 20% in any month,
- low/very-low override rate rises month-over-month for 2 months.

Escalation output must include:
- root cause hypothesis,
- confidence-scoring policy adjustment,
- verification plan for next calibration cycle.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-CONFIDENCE-INDEX.md`
- `ALIGNMENT-DECISION-OUTCOME-REVIEWS.md`
- `ALIGNMENT-TRACEABILITY-MATRIX.md`
- `ALIGNMENT-EVIDENCE-STANDARDS.md`
- `ALIGNMENT-MONTHLY-REVIEW-TEMPLATE.md`
