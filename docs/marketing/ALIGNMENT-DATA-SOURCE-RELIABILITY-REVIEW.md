# Alignment Data Source Reliability Review

Use this artifact to monitor whether core data sources feeding decision and governance controls remain reliable over time.

When source reliability drifts, downstream confidence, thresholds, and decisions degrade—even if reports still look complete.

---

## Purpose

This review ensures:
- critical data sources are scored for reliability each cycle,
- reliability degradation is surfaced before decision impact expands,
- remediation prioritizes sources with highest decision exposure.

---

## Scope

Review reliability for sources used in:
- KPI and threshold monitoring,
- decision confidence and calibration,
- outcome reviews and reversal decisions,
- operating-health and governance ROI calculations.

---

## Reliability Metrics

| Metric | Definition | Target |
|---|---|---:|
| Reliable Source Rate | % critical sources in Green reliability band | ≥ 90% |
| Source Degradation Count | Number of sources with worsening reliability vs prior cycle | declining trend |
| Decision Exposure Count | Number of active P0/P1 decisions dependent on degraded sources | 0 or declining |
| Reliability Recovery Lead Time | Time from degradation detection to mitigation action | ≤ 3 business days |
| Repeat Reliability Incidents | Same source failing reliability checks in consecutive cycles | declining trend |

---

## Reliability Bands

| Band | Meaning | Default Action |
|---|---|---|
| Green | Source reliable and within quality thresholds | normal use |
| Yellow | Reliability concerns emerging | caution note + mitigation plan |
| Red | Source unreliable for high-impact decision use | block high-confidence approvals |

---

## Canonical Reliability Table

| Source ID | Source Name | Current Band | Primary Reliability Issue | Downstream Dependencies | Decision Exposure (Y/N) | Recovery Owner | Recovery Due Date |
|---|---|---|---|---|---|---|---|
| DSRR-001 |  |  |  |  |  |  |  |
| DSRR-002 |  |  |  |  |  |  |  |
| DSRR-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before publishing reliability review:
- [ ] all critical sources are assessed,
- [ ] reliability band criteria are applied consistently,
- [ ] degraded-source decision exposure is mapped,
- [ ] recovery actions include owner and due date,
- [ ] confidence/approval impacts are reflected in dependent artifacts.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any Red-band source supports active P0/P1 decision packet,
- 2+ critical sources degrade in same cycle,
- source degradation remains unresolved beyond due date,
- repeat reliability incidents occur for same source in 2+ consecutive cycles.

Escalation output must include:
- source-risk concentration summary,
- immediate decision gating instructions,
- dated reliability recovery plan.

---

## Integration Points

Use with:
- `ALIGNMENT-DATA-SOURCE-CATALOG.md`
- `ALIGNMENT-WEEKLY-DATA-CONTRACT.md`
- `ALIGNMENT-EVIDENCE-REFRESH-SCHEDULE.md`
- `ALIGNMENT-DECISION-CONFIDENCE-INDEX.md`
- `ALIGNMENT-COMMAND-CENTER.md`
