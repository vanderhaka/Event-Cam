# Alignment Intervention Prioritization Matrix

Use this artifact to prioritize remediation interventions when multiple governance issues compete for limited team capacity.

Without explicit intervention priority rules, teams often fix visible issues first instead of the highest-risk issues.

---

## Purpose

This matrix ensures:
- interventions are ranked by risk and expected leverage,
- remediation sequencing is transparent and consistent,
- high-impact fixes are not delayed by lower-value work.

---

## Prioritization Dimensions

Score each intervention from 1 to 5 on:

1. **Risk Severity** — impact if issue remains unresolved.
2. **Recurrence Pressure** — likelihood issue repeats/escalates.
3. **Decision Exposure** — effect on active P0/P1 decisions.
4. **Execution Drag** — degree to which issue slows core delivery.
5. **Remediation Feasibility** — ability to implement quickly (higher is easier).

---

## Priority Formula

`Intervention Priority Score = (Severity + Recurrence + Decision Exposure + Execution Drag + Feasibility) / 25 * 100`

---

## Priority Bands

| Score | Band | Interpretation | Default Action |
|---:|---|---|---|
| 85–100 | I1 Critical | Immediate intervention required | Start same cycle |
| 70–84 | I2 High | Important risk reduction opportunity | Start within 1 cycle |
| 50–69 | I3 Moderate | Valuable but not urgent | Schedule after I1/I2 |
| <50 | I4 Low | Optimize later / monitor | Backlog or combine |

---

## Canonical Matrix Table

| Intervention ID | Source Signal/Artifact | Severity (1-5) | Recurrence (1-5) | Decision Exposure (1-5) | Execution Drag (1-5) | Feasibility (1-5) | Score | Band | Owner | Due Date |
|---|---|---:|---:|---:|---:|---:|---:|---|---|---|
| IPM-001 |  |  |  |  |  |  |  |  |  |  |
| IPM-002 |  |  |  |  |  |  |  |  |  |  |
| IPM-003 |  |  |  |  |  |  |  |  |  |  |

---

## Scheduling Rules

- Always clear I1 interventions before opening new I3/I4 work.
- If 3+ I2 items are open, freeze non-critical governance enhancements.
- Re-score interventions weekly until closed.
- Interventions with falling feasibility should be split into smaller executable fixes.

---

## Quality Gate

Before finalizing intervention queue:
- [ ] source risk evidence is linked for each item,
- [ ] scoring rationale is documented,
- [ ] owner and due date are assigned for I1/I2 items,
- [ ] dependency constraints are captured,
- [ ] expected success metric is defined.

If any item is unchecked, intervention is not queue-ready.

---

## Escalation Triggers

Escalate when:
- any I1 intervention remains unstarted beyond one business day,
- intervention queue contains unresolved I1 items for 2+ cycles,
- low-priority interventions consume capacity while I1/I2 backlog grows,
- intervention outcomes fail to reduce targeted risk after one cycle.

Escalation output must include:
- forced re-prioritization decision,
- owner/capacity reallocation,
- updated intervention queue with dated checkpoints.

---

## Integration Points

Use with:
- `ALIGNMENT-ROOT-CAUSE-PATTERN-REVIEW.md`
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-BACKLOG-AGING-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
