# Alignment Signal Correlation Review

Use this artifact to evaluate whether key governance signals move together in expected ways and to detect misleading single-metric interpretations.

Uncorrelated or contradictory signals can cause teams to optimize one metric while hidden risk grows elsewhere.

---

## Purpose

This review ensures:
- signal relationships are validated, not assumed,
- contradictory movement triggers deeper diagnosis,
- decision-making uses multi-signal context, not isolated indicators.

---

## Scope

Run correlation checks across:
- decision quality vs outcome status trends,
- alert volume/noise vs response lag,
- control adoption vs control effectiveness scores,
- governance cost vs governance ROI,
- leading indicators vs downstream incident/escalation rates.

---

## Correlation Metrics

| Metric | Definition | Target |
|---|---|---:|
| Expected Correlation Coverage | % expected signal pairs tracked monthly | 100% |
| Contradictory Signal Count | Number of high-priority signal pairs moving in conflicting directions | declining trend |
| Diagnosis Completion Rate | % contradictory pairs with root-cause analysis completed | ≥ 90% |
| Decision Override from Correlation Review | % high-impact decisions adjusted after correlation findings | context-dependent |
| Time-to-Correlation Review | Days from month close to published correlation review | ≤ 7 days |

---

## Correlation Status Model

| Status | Meaning |
|---|---|
| Aligned | Signal pair movement is consistent with expected model |
| Weak Correlation | Relationship exists but weaker than expected |
| Contradictory | Pair movement conflicts with expected causal pattern |
| Under Investigation | Root-cause analysis in progress |

---

## Canonical Correlation Table

| Review Month | Signal Pair | Expected Relationship | Observed Relationship | Status | Risk Interpretation | Owner | Follow-up Action |
|---|---|---|---|---|---|---|---|
| [YYYY-MM] |  |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |  |

---

## Priority Signal Pairs (Starter Set)

1. Control adoption rate ↔ control effectiveness score.
2. Alert fatigue metrics ↔ critical alert response SLA.
3. Decision confidence score ↔ outcome review status.
4. Leading warning count ↔ downstream escalation volume.
5. Governance cost trend ↔ governance ROI index.

---

## Review Quality Gate

Before publishing correlation findings:
- [ ] expected relationship for each pair is documented,
- [ ] source metrics are current and quality-checked,
- [ ] contradictory pairs have root-cause hypothesis,
- [ ] follow-up actions have owner and due date,
- [ ] decision implications are explicitly stated.

If any item is unchecked, report is incomplete.

---

## Escalation Triggers

Escalate when:
- contradictory signal count increases for 2 consecutive months,
- critical signal pair remains contradictory without diagnosis >10 business days,
- high-impact decision proceeds despite unresolved contradictory signals,
- multiple contradictory pairs indicate systemic model failure.

Escalation output must include:
- cross-signal root-cause summary,
- model/threshold/control change recommendations,
- verification checkpoints for next cycle.

---

## Integration Points

Use with:
- `ALIGNMENT-SYSTEM-HEALTH-METRICS.md`
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-DECISION-CALIBRATION-REPORT.md`
- `ALIGNMENT-GOVERNANCE-ROI-REPORT.md`
- `ALIGNMENT-COMMAND-CENTER.md`
