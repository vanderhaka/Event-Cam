# Alignment Control Lifecycle Analysis

Use this artifact to evaluate controls by lifecycle stage so teams can distinguish emerging controls, mature controls, and sunset-ready controls.

Without lifecycle visibility, teams either retire controls too early or keep low-value controls too long.

---

## Purpose

This analysis ensures:
- each active control has a clear lifecycle status,
- lifecycle transitions are evidence-based,
- optimization and retirement decisions are timed appropriately.

---

## Lifecycle Stages

| Stage | Description | Typical Decision Focus |
|---|---|---|
| Launching | Newly introduced control within first verification window | Adoption and clarity |
| Stabilizing | Control adopted but still tuning thresholds/process details | Reliability and noise reduction |
| Mature | Control consistently effective with stable risk reduction | Efficiency optimization |
| Sunset Candidate | Control value declining or duplicated by other controls | Merge/retire decision |
| Retired | Control formally deactivated with verification complete | Residual-risk watch |

---

## Lifecycle Metrics

| Metric | Definition | Target |
|---|---|---:|
| Stage Classification Coverage | % active controls with assigned lifecycle stage | 100% |
| Launch-to-Stable Time | Median time for new controls to reach stable compliance/effectiveness | ≤ 8 weeks |
| Mature Control Efficiency Gain | % mature controls with measured cost-efficiency improvement cycle-over-cycle | improving trend |
| Sunset Candidate Conversion Rate | % sunset candidates resolved (merge/retire/keep) within 1 cycle | ≥ 80% |
| Premature Retirement Rate | % retired controls reactivated within verification window | ≤ 10% |

---

## Canonical Lifecycle Table

| Control Artifact | Current Stage | Stage Entry Date | Primary Health Signal | Cost Signal | Lifecycle Risk | Next Lifecycle Decision | Owner |
|---|---|---|---|---|---|---|---|
| [Artifact 1] |  |  |  |  |  |  |  |
| [Artifact 2] |  |  |  |  |  |  |  |
| [Artifact 3] |  |  |  |  |  |  |  |

---

## Transition Rules

- Launching → Stabilizing: adoption baseline met and no major design defects.
- Stabilizing → Mature: effectiveness score stable and recurrence/noise controlled.
- Mature → Sunset Candidate: low incremental value, overlap detected, or operating mode shift reduces need.
- Sunset Candidate → Retired: sunset packet approved + verification plan active.
- Retired → Reactivated: residual risk worsens during post-retirement watch window.

---

## Quality Gate

Before lifecycle-stage change:
- [ ] stage-transition evidence is documented,
- [ ] dependency and criticality impacts are reviewed,
- [ ] owner/accountability for next stage is confirmed,
- [ ] rollback/reactivation trigger is defined (where relevant),
- [ ] affected artifacts are updated within sync SLA.

If any item is unchecked, stage transition is not valid.

---

## Escalation Triggers

Escalate when:
- control remains Launching/Stabilizing beyond expected window without progress,
- Mature controls show declining effectiveness for 2+ cycles,
- Sunset candidates remain unresolved across two review cycles,
- retired control reactivation rate exceeds threshold.

Escalation output must include:
- lifecycle bottleneck diagnosis,
- owner and due date for transition correction,
- expected lifecycle movement targets for next cycle.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-PORTFOLIO-REVIEW.md`
- `ALIGNMENT-CONTROL-SUNSET-CRITERIA.md`
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-CONTROL-CRITICALITY-MAP.md`
- `ALIGNMENT-COMMAND-CENTER.md`
