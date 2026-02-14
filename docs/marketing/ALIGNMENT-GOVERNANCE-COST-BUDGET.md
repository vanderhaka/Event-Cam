# Alignment Governance Cost Budget

Use this artifact to cap governance overhead and keep operating effort proportional to business value.

A healthy alignment system improves execution speed; an unhealthy one consumes time without improving outcomes.

---

## Purpose

This budget defines:
- how much team time can be spent on governance,
- warning thresholds for process overhead,
- reduction actions when governance cost exceeds value.

---

## Governance Cost Categories

Track weekly cost across:

1. **Meeting Cost**  
   Total participant-hours in recurring alignment meetings.

2. **Documentation Cost**  
   Hours spent updating/maintaining active artifacts.

3. **Control Administration Cost**  
   Hours spent running checks, audits, and escalations.

4. **Recovery Cost**  
   Hours spent on incident/slippage/rework tied to governance failures.

---

## Weekly Budget Targets

| Team Stage | Max Governance Hours / Week | Max Governance % of Team Capacity |
|---|---:|---:|
| Early (Pack A/B) | 8–12 | 10% |
| Scaling (Pack C) | 12–18 | 15% |
| High Complexity (Pack D) | 18–28 | 20% |

If governance time exceeds stage budget for 2 weeks, trigger cost-reduction plan.

---

## Cost Tracking Table

| Week | Meeting Hours | Documentation Hours | Control Admin Hours | Recovery Hours | Total Governance Hours | % Capacity | Status (Within/Warning/Over) | Action |
|---|---:|---:|---:|---:|---:|---:|---|---|
| [YYYY-MM-DD] |  |  |  |  |  |  |  |  |
| [YYYY-MM-DD] |  |  |  |  |  |  |  |  |
| [YYYY-MM-DD] |  |  |  |  |  |  |  |  |

---

## Efficiency Indicators

Assess whether governance cost is producing value:

| Indicator | Expected Direction |
|---|---|
| Decision SLA compliance | Up |
| Contradiction backlog | Down |
| Slippage severity (S2/S3) | Down |
| Meeting effectiveness status | Stable Green/Yellow |
| Control incident frequency | Down |

If governance cost rises but indicators do not improve, reduce process load.

---

## Cost Reduction Playbook

When over budget:
1. Freeze non-critical artifact updates for one cycle.
2. Merge or retire low-utilization controls.
3. Reduce meeting duration by 20% with stricter agenda.
4. Rebalance owner load to reduce rework.
5. Reassess operating mode and active pack.

---

## Escalation Triggers

Escalate when:
- governance cost exceeds 120% of budget for 2 consecutive weeks,
- recovery cost exceeds 30% of total governance cost,
- cost is rising while decision quality metrics deteriorate.

Escalation output must include:
- target budget reset or mode change,
- controls to pause/merge/retire,
- expected savings and review date.

---

## Integration Points

Use with:
- `ALIGNMENT-MEETING-EFFECTIVENESS-REVIEW.md`
- `ALIGNMENT-ARTIFACT-USAGE-TELEMETRY.md`
- `ALIGNMENT-CONTROL-SUNSET-CRITERIA.md`
- `ALIGNMENT-OPERATING-MODES.md`
- `ALIGNMENT-COMMAND-CENTER.md`
