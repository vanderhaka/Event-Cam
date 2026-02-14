# Alignment Control Priority Inversion Review

Use this artifact to detect when low-priority control work repeatedly displaces higher-risk control obligations.

Priority inversion creates hidden exposure by making teams feel productive while critical risks stay unaddressed.

---

## Purpose

This review ensures:
- critical control work is executed before lower-risk activity,
- inversion patterns are visible and corrected quickly,
- prioritization rules are enforced under capacity pressure.

---

## Scope

Run this review for:
- all CC-1 control obligations,
- CC-2 obligations linked to active P0/P1 decisions,
- cycles with high backlog pressure or repeated overdue critical items.

---

## Inversion Metrics

| Metric | Definition | Target |
|---|---|---:|
| Critical-First Execution Rate | % cycles where CC-1 obligations are completed before lower-priority items | ≥ 95% |
| Priority Inversion Count | Instances where lower-priority control tasks were completed while higher-priority items remained overdue | 0 |
| Inversion Exposure Days | Total days critical control work remained delayed due to inversion | 0 |
| Inversion Recurrence Rate | % controls showing inversion in consecutive cycles | declining trend |
| Corrective Reprioritization SLA | % inversion cases corrected within SLA window | ≥ 95% |

---

## Status Model

| Status | Meaning |
|---|---|
| Ordered | Priority execution sequence is respected |
| Watch | Isolated inversion signal detected |
| Inverted | Material inversion delaying critical control work |
| Recovering | Reprioritization actions underway with owner and due date |

---

## Canonical Review Table

| Review ID | Control Domain | Overdue Critical Item | Lower-Priority Item Completed First (Y/N) | Inversion Exposure (days) | Status | Reprioritization Owner | Correction Due |
|---|---|---|---|---:|---|---|---|
| CPI-001 |  |  |  |  |  |  |  |
| CPI-002 |  |  |  |  |  |  |  |
| CPI-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing priority-inversion review:
- [ ] in-scope critical obligations are listed and ranked,
- [ ] execution order evidence is linked for reviewed items,
- [ ] inversion cases include exposure and impact notes,
- [ ] correction owners and due dates are assigned,
- [ ] recurrence patterns are root-caused and actioned.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 obligation remains overdue while lower-priority control work progresses,
- inversion count >0 for two consecutive cycles,
- inversion exposure days increase cycle-over-cycle,
- same control domain shows recurring inversion pattern.

Escalation output must include:
- inversion case list and risk exposure summary,
- reprioritization actions with accountable owners,
- dated checkpoint proving restored priority discipline.

---

## Integration Points

Use with:
- `ALIGNMENT-PRIORITY-RULES.md`
- `ALIGNMENT-INTERVENTION-PRIORITIZATION-MATRIX.md`
- `ALIGNMENT-BACKLOG-AGING-REVIEW.md`
- `ALIGNMENT-CONTROL-CRITICALITY-MAP.md`
- `ALIGNMENT-COMMAND-CENTER.md`
