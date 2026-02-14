# Alignment Operating Health Index

Use this artifact to produce a single composite operating-health score across the alignment system.

A unified index makes it easier to detect system-wide degradation that isolated metrics may hide.

---

## Purpose

This index helps teams:
- summarize alignment operating health in one comparable trend,
- detect broad deterioration early,
- prioritize interventions when multiple weak signals appear at once.

---

## Index Components

Compute the monthly index using five components:

1. **Decision Health**  
   Confidence quality, outcome quality, reversal stability.

2. **Execution Health**  
   Commitment reliability, blocker/dependency containment, SLA adherence.

3. **Control Health**  
   Adoption compliance, effectiveness score, dependency integrity.

4. **Signal Health**  
   Alert quality, leading-indicator behavior, signal-correlation coherence.

5. **Governance Efficiency Health**  
   Governance cost, ROI, cadence compliance.

---

## Component Scoring

Each component is scored 0–100 based on mapped source metrics.

Recommended weighting:
- Decision Health: 25%
- Execution Health: 25%
- Control Health: 20%
- Signal Health: 15%
- Governance Efficiency Health: 15%

---

## Formula

`Operating Health Index = (Decision*0.25) + (Execution*0.25) + (Control*0.20) + (Signal*0.15) + (Governance*0.15)`

---

## Health Bands

| Score | Band | Interpretation | Default Action |
|---:|---|---|---|
| 85–100 | Strong | System is stable and effective | Maintain + optimize selectively |
| 70–84 | Watch | Emerging weaknesses present | Targeted corrective actions |
| 55–69 | At Risk | Multi-domain degradation | Activate recovery package |
| <55 | Critical | System reliability compromised | Immediate leadership intervention |

---

## Canonical Index Table

| Month | Decision Score | Execution Score | Control Score | Signal Score | Governance Score | Operating Health Index | Band | Primary Action |
|---|---:|---:|---:|---:|---:|---:|---|---|
| [YYYY-MM] |  |  |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |  |  |

---

## Quality Gate

Before publishing index:
- [ ] all component inputs are refreshed and quality-checked,
- [ ] weighting rules are unchanged or explicitly versioned,
- [ ] source metric links are documented,
- [ ] trend interpretation is included,
- [ ] action owner is assigned when band is Watch or below.

If any item is unchecked, index is provisional.

---

## Escalation Triggers

Escalate when:
- index drops by 10+ points month-over-month,
- index stays At Risk for 2 consecutive cycles,
- index enters Critical band in any cycle,
- component divergence indicates systemic model inconsistency.

Escalation output must include:
- cross-component root-cause hypothesis,
- prioritized recovery actions with owners/dates,
- next-cycle target band and verification criteria.

---

## Integration Points

Use with:
- `ALIGNMENT-SYSTEM-HEALTH-METRICS.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-GOVERNANCE-ROI-REPORT.md`
- `ALIGNMENT-DECISION-QUALITY-REGRESSION-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
