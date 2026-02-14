# Alignment Control Intervention Effect Lag Review

Use this artifact to measure how long it takes for control interventions to produce measurable improvement.

If intervention effect lag is unknown, teams misjudge intervention quality and escalate too early or too late.

---

## Purpose

This review ensures:
- intervention outcomes are tracked with explicit time-to-effect expectations,
- lagging interventions are identified before confidence erodes,
- interventions with persistent delay are redesigned or replaced.

---

## Scope

Run this review for:
- CC-1 control interventions,
- CC-2 interventions tied to active P0/P1 risks,
- interventions triggered by recurring defects, exceptions, or quality regressions.

---

## Effect Lag Metrics

| Metric | Definition | Target |
|---|---|---:|
| On-Time Effect Realization Rate | % interventions showing expected improvement within defined lag window | ≥ 90% |
| Delayed Effect Count | Interventions not showing measurable improvement by expected lag threshold | 0 |
| Median Time-to-Effect | Median time from intervention start to first validated positive signal | improving trend |
| No-Effect Intervention Count | Interventions with no measurable improvement in review window | 0 |
| Repeat Lag Pattern Count | Same intervention type repeatedly missing effect window across cycles | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| On-Track | Effect observed within expected lag window |
| Watch | Lag approaching threshold with partial signal |
| Delayed | Effect not observed by threshold date |
| Reworking | Intervention redesign in progress with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Intervention ID | Start Date | Expected Effect Date | First Positive Signal Date | Status | Intervention Owner | Rework Due |
|---|---|---|---|---|---|---|---|---|
| CIL-001 |  |  |  |  |  |  |  |  |
| CIL-002 |  |  |  |  |  |  |  |  |
| CIL-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing intervention effect-lag review:
- [ ] all in-scope interventions have defined expected lag windows,
- [ ] effect evidence is linked to canonical signals,
- [ ] delayed/no-effect interventions have rework owners and due dates,
- [ ] repeat lag patterns are root-caused,
- [ ] post-rework verification checkpoints are scheduled.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 intervention remains Delayed beyond one full cycle,
- no-effect intervention count >0 for two consecutive cycles,
- on-time effect realization rate drops below target for 2 cycles,
- repeat lag patterns cluster in same intervention class.

Escalation output must include:
- delayed/no-effect intervention list and exposure summary,
- redesign package with accountable owners,
- dated checkpoint confirming improved time-to-effect performance.

---

## Integration Points

Use with:
- `ALIGNMENT-INTERVENTION-PRIORITIZATION-MATRIX.md`
- `ALIGNMENT-DECISION-OUTCOME-LAG-REVIEW.md`
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-COMMAND-CENTER.md`
