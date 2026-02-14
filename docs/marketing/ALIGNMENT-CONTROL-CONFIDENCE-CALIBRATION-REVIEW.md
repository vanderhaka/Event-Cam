# Alignment Control Confidence Calibration Review

Use this artifact to verify whether control-confidence scores accurately predict real control outcomes.

If confidence scores are not calibrated, teams over-trust fragile controls and under-invest in the right fixes.

---

## Purpose

This review ensures:
- confidence scoring reflects observed control performance,
- optimism/pessimism bias in control scoring is detected early,
- scoring rules are adjusted when prediction accuracy degrades.

---

## Scope

Run calibration for:
- all CC-1 controls scored in the Control Confidence Index,
- CC-2 controls with incidents, escalations, or major interventions,
- controls with 2+ consecutive cycles in Low/Conditional bands.

---

## Calibration Metrics

| Metric | Definition | Target |
|---|---|---:|
| Calibration Coverage Rate | % in-scope controls with score-to-outcome comparison completed | 100% |
| Mean Confidence Gap | Average (predicted confidence outcome − observed outcome) | -0.10 to +0.10 |
| High-Band Miss Rate | % high-confidence controls that still produced negative incidents/outcomes | <10% |
| Low-Band Recovery Accuracy | % low-confidence controls that required and received successful remediation | ≥90% |
| Recalibration Lead Time | Time from detected scoring bias to applied scoring-rule update | ≤ 10 business days |

---

## Status Model

| Status | Meaning |
|---|---|
| Calibrated | Confidence scores align with observed outcomes |
| Mild Drift | Minor scoring bias present; monitor and tune |
| Material Drift | Systematic over/under-confidence impacting decisions |
| Recalibrating | Rule/weight updates in progress with owner and due date |

---

## Canonical Calibration Table

| Review ID | Control Artifact | Prior Confidence Score | Confidence Band | Observed Outcome Score (0-1) | Gap | Status | Recalibration Owner | Recalibration Due |
|---|---|---:|---|---:|---:|---|---|---|
| CCR-001 |  |  |  |  |  |  |  |  |
| CCR-002 |  |  |  |  |  |  |  |  |
| CCR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing confidence-calibration review:
- [ ] all in-scope controls have confidence-vs-outcome comparison,
- [ ] outcome scoring rules are explicit and consistently applied,
- [ ] material drift patterns are root-caused,
- [ ] recalibration owners and due dates are assigned where needed,
- [ ] post-change verification checkpoint is scheduled.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- mean confidence gap leaves target range for 2 cycles,
- high-band miss rate breaches threshold for 2 cycles,
- material drift affects active quarter-critical controls,
- recalibration actions miss due date.

Escalation output must include:
- impacted controls and drift-exposure summary,
- recalibration actions with accountable owners,
- dated verification checkpoint proving restored calibration.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-CONFIDENCE-INDEX.md`
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-CONTROL-FAILURE-MODES.md`
- `ALIGNMENT-INTERVENTION-PRIORITIZATION-MATRIX.md`
- `ALIGNMENT-COMMAND-CENTER.md`
