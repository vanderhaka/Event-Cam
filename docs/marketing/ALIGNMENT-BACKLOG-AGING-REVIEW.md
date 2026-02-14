# Alignment Backlog Aging Review

Use this artifact to monitor how long unresolved items remain open across decisions, blockers, corrective actions, and exceptions.

Aging backlog is an early signal of hidden capacity debt and declining execution reliability.

---

## Purpose

This review ensures:
- aging items are visible by severity and workflow,
- stale items are escalated before they become systemic drag,
- teams focus on reducing age-weighted risk, not only item count.

---

## Scope

Track aging for:
- open decision items (intake, briefing, scheduled),
- blockers and dependencies,
- corrective actions,
- policy exceptions and overrides,
- unresolved contradictions.

---

## Aging Metrics

| Metric | Definition | Target |
|---|---|---:|
| Median Open Age | Median days open across in-scope items | stable/declining trend |
| High-Severity Aging Count | Number of High/Critical items older than SLA | 0 |
| Age-Weighted Backlog Score | Weighted open-age score by severity | declining trend |
| Oldest Open Item Age | Age of oldest unresolved in-scope item | within policy limit |
| Aging Recovery Rate | % overdue items closed within next cycle | ≥ 70% |

---

## Aging Bands

| Band | Age vs SLA | Meaning | Action |
|---|---|---|---|
| Fresh | ≤100% SLA | Within expected window | Normal monitoring |
| Stale | 101–150% SLA | Risk of drift and quality decay | Prioritize in next cycle |
| Critical Stale | >150% SLA | High risk of debt/instability | Immediate escalation |

---

## Canonical Aging Table

| Item Type | Item ID | Severity | Open Date | SLA Date | Current Age (days) | Aging Band | Owner | Next Action Date |
|---|---|---|---|---|---:|---|---|---|
| [Decision/Blocker/etc.] |  |  |  |  |  |  |  |  |
| [Decision/Blocker/etc.] |  |  |  |  |  |  |  |  |
| [Decision/Blocker/etc.] |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before publishing aging review:
- [ ] all in-scope workflows included in extraction,
- [ ] SLA references are current and consistent,
- [ ] stale/critical-stale items have dated actions,
- [ ] severity tags are verified,
- [ ] aging trend interpretation is explicit.

If any item is unchecked, review is incomplete.

---

## Prioritization Rule

When capacity is constrained, rank by:
`Severity Weight × Days Beyond SLA`

Address highest score first, not oldest item by age alone.

---

## Escalation Triggers

Escalate when:
- any High/Critical item enters Critical Stale band,
- age-weighted backlog score rises for 2 consecutive cycles,
- same owner has 3+ stale items simultaneously,
- stale backlog delays P0 decision closure.

Escalation output must include:
- top aging clusters and owners,
- forced close/defer decisions,
- dated backlog-burn plan for next cycle.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-INTAKE-QUEUE.md`
- `ALIGNMENT-BLOCKERS-LOG.md`
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-OVERRIDE-REGISTER.md`
- `ALIGNMENT-COMMAND-CENTER.md`
