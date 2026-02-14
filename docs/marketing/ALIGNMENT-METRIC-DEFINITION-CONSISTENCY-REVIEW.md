# Alignment Metric Definition Consistency Review

Use this artifact to verify that metric names, formulas, thresholds, and owner interpretations remain consistent across active artifacts.

Metric inconsistency creates false signal movement, contradictory decisions, and avoidable trust loss.

---

## Purpose

This review ensures:
- the same metric means the same thing everywhere,
- formula and threshold drift is detected quickly,
- decision packets and dashboards use canonical metric definitions.

---

## Scope

Review consistency across:
- metric definitions and thresholds,
- dashboard and executive packet usage,
- decision packet references,
- anomaly and escalation trigger logic.

---

## Consistency Metrics

| Metric | Definition | Target |
|---|---|---:|
| Canonical Match Rate | % reviewed metric references matching canonical definition exactly | ≥ 95% |
| Formula Drift Count | Number of metrics with conflicting formulas across active artifacts | 0 |
| Threshold Drift Count | Number of metrics with conflicting threshold bands | 0 |
| Owner Interpretation Variance | Number of metrics interpreted differently by owner groups | declining trend |
| Correction Lead Time | Time from inconsistency detection to artifact correction | ≤ 3 business days |

---

## Consistency Status Model

| Status | Meaning |
|---|---|
| Consistent | Name, formula, threshold, and owner interpretation aligned |
| Minor Drift | Small wording variance, no decision-impact formula mismatch |
| Material Drift | Formula/threshold mismatch with potential decision impact |
| Correcting | Drift identified and remediation in progress |

---

## Canonical Consistency Table

| Metric ID/Name | Canonical Source | Checked Artifact | Formula Match (Y/N) | Threshold Match (Y/N) | Owner Interpretation Match (Y/N) | Status | Correction Owner | Due Date |
|---|---|---|---|---|---|---|---|---|
| MCR-001 |  |  |  |  |  |  |  |  |
| MCR-002 |  |  |  |  |  |  |  |  |
| MCR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing review:
- [ ] all high-impact metrics are sampled across core artifacts,
- [ ] canonical source is explicitly cited for each metric,
- [ ] material drift items have correction owner and due date,
- [ ] corrected artifacts are rechecked for consistency,
- [ ] decision-impact disclosure is added where needed.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any material drift affects active P0/P1 decisions,
- formula or threshold drift persists beyond due date,
- same metric drifts repeatedly in consecutive cycles,
- metric inconsistency contributes to contradictory decisions.

Escalation output must include:
- impacted-metric list and decision exposure,
- canonical-source reinforcement actions,
- dated correction and verification plan.

---

## Integration Points

Use with:
- `ALIGNMENT-METRIC-DEFINITIONS.md`
- `ALIGNMENT-METRIC-THRESHOLDS.md`
- `ALIGNMENT-DASHBOARD-TEMPLATE.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-COMMAND-CENTER.md`
