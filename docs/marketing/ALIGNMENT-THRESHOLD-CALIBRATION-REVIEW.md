# Alignment Threshold Calibration Review

Use this artifact to verify that control and KPI thresholds still reflect current operating reality.

Static thresholds in changing conditions create two risks: late detection (too loose) and alert fatigue (too strict).

---

## Purpose

This review ensures:
- threshold bands remain predictive and decision-useful,
- false alerts and missed alerts are both tracked,
- threshold updates are evidence-based and governed.

---

## Scope

Review thresholds for:
- KPI green/yellow/red bands,
- anomaly severity cutoffs,
- decision SLA breach thresholds,
- confidence and calibration guardrails,
- leading-indicator warning thresholds.

---

## Calibration Metrics

| Metric | Definition | Target |
|---|---|---:|
| False Alert Rate | % threshold breaches that did not represent real risk | ≤ 20% |
| Missed Alert Rate | % significant incidents with no prior threshold warning | ≤ 10% |
| Alert Actionability Rate | % alerts that triggered useful action within SLA | ≥ 80% |
| Threshold Stability | % thresholds unchanged due to stable performance | context-dependent |
| Recalibration Lag | Time from identified threshold issue to approved update | ≤ 30 days |

---

## Calibration Status Model

| Status | Meaning |
|---|---|
| Stable | Threshold performs as expected |
| Drift Suspected | Alert quality degraded; review required |
| Recalibrating | Update packet in progress/verification |
| Updated | New threshold active within verification window |
| Reverted | Updated threshold rolled back due to degraded outcomes |

---

## Canonical Threshold Review Table

| Threshold ID | Domain | Current Value/Band | Signal Problem | Proposed Change | Expected Benefit | Approval Owner | Effective Date | Verification Outcome |
|---|---|---|---|---|---|---|---|---|
| TCR-001 |  |  |  |  |  |  |  |  |
| TCR-002 |  |  |  |  |  |  |  |  |
| TCR-003 |  |  |  |  |  |  |  |  |

---

## Calibration Quality Gate

Before applying threshold changes:
- [ ] false/missed alert evidence is documented,
- [ ] affected workflows and controls are identified,
- [ ] expected behavior change is explicit and measurable,
- [ ] verification window and rollback trigger are defined,
- [ ] owner/accountability and communication plan are set.

No threshold change should go live without this gate.

---

## Decision Rules

- High false-alert + low missed-alert profile → consider relaxing threshold.
- Low false-alert + high missed-alert profile → tighten threshold.
- High false-alert + high missed-alert profile → redesign signal definition, not just threshold value.

---

## Escalation Triggers

Escalate when:
- missed alert rate exceeds 15% in any month,
- threshold changes are made without verification plan,
- same threshold is changed 3+ times in one quarter,
- alert-actionability rate drops below 60%.

Escalation output must include:
- root cause hypothesis (threshold value vs signal design),
- recalibration owner + due date,
- next-cycle verification targets.

---

## Integration Points

Use with:
- `ALIGNMENT-METRIC-THRESHOLDS.md`
- `ALIGNMENT-METRIC-ANOMALY-PROTOCOL.md`
- `ALIGNMENT-LEADING-INDICATOR-WATCHLIST.md`
- `ALIGNMENT-CONTROL-CHANGE-PROTOCOL.md`
- `ALIGNMENT-COMMAND-CENTER.md`
