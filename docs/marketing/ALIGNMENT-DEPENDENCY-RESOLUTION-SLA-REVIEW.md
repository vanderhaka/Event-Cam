# Alignment Dependency Resolution SLA Review

Use this artifact to verify whether cross-functional dependencies are being resolved within committed SLA windows.

Dependency delays are a primary hidden driver of decision latency, slippage, and repeat escalations.

---

## Purpose

This review ensures:
- dependency resolution speed is measured consistently,
- overdue dependencies are escalated before they cascade,
- recurring SLA misses trigger structural coordination fixes.

---

## Scope

Track dependencies from:
- decision packets and intake queue routing,
- blockers and execution commitments,
- corrective-action and escalation workflows,
- cross-team data/evidence readiness dependencies.

---

## SLA Metrics

| Metric | Definition | Target |
|---|---|---:|
| On-Time Dependency Resolution Rate | % dependencies resolved by SLA date | ≥ 85% |
| Overdue Dependency Count | Number of dependencies currently beyond SLA | 0 or declining |
| Median Days Beyond SLA | Median delay for overdue dependencies | declining trend |
| Repeat Miss Pair Count | Function-pair dependencies missing SLA repeatedly | declining trend |
| Escalation Conversion Rate | % overdue dependencies escalated within required window | ≥ 95% |

---

## Dependency SLA Status Model

| Status | Meaning |
|---|---|
| On Track | Dependency expected to resolve within SLA |
| At Risk | Signals indicate likely SLA miss |
| Overdue | SLA date passed without resolution |
| Escalated | Overdue dependency routed through escalation path |
| Recovered | Resolved after overdue state with verified closure |

---

## Canonical SLA Table

| Dependency ID | Source Workflow | Owner Pair | SLA Date | Current Status | Days to/over SLA | Escalated (Y/N) | Recovery Action | Next Check Date |
|---|---|---|---|---|---:|---|---|---|
| DSR-001 |  |  |  |  |  |  |  |  |
| DSR-002 |  |  |  |  |  |  |  |  |
| DSR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before publishing SLA review:
- [ ] all high-priority dependencies are included,
- [ ] SLA dates and owners are current,
- [ ] overdue dependencies have dated recovery actions,
- [ ] escalation status is explicitly captured,
- [ ] repeat-miss patterns are summarized by owner pair.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any P0/P1 dependency is overdue without escalation,
- overdue dependency count rises for 2 consecutive cycles,
- same owner pair misses 3+ dependency SLAs in one cycle,
- unresolved dependency blocks decision closure or commitment recovery.

Escalation output must include:
- top overdue dependency clusters,
- owner/accountability correction actions,
- SLA recovery targets for next cycle.

---

## Integration Points

Use with:
- `ALIGNMENT-DEPENDENCY-TRACKER.md`
- `ALIGNMENT-CROSS-FUNCTION-COORDINATION-REVIEW.md`
- `ALIGNMENT-COMMITMENT-SLIPPAGE-PROTOCOL.md`
- `ALIGNMENT-DECISION-LATENCY-DECOMPOSITION.md`
- `ALIGNMENT-COMMAND-CENTER.md`
