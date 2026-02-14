# Alignment Dependency Tracker

Use this tracker to manage cross-functional dependencies that can delay decisions, experiments, and execution milestones.

Alignment often fails because dependencies are implicit until deadlines slip.

---

## Purpose

This artifact makes dependencies:
- visible early,
- owner-assigned,
- date-bound,
- escalation-ready.

It is a practical bridge between decision governance and weekly delivery execution.

---

## Dependency Types

Tag each dependency with one primary type:

- **Data** — dashboard, instrumentation, metric reliability, attribution.
- **Legal/Compliance** — terms, permissions, policy constraints.
- **Product/Engineering** — feature, bug fix, release dependency.
- **Ops/Process** — approvals, handoffs, meeting/cadence dependencies.
- **Commercial** — partner input, pricing approval, contract terms.
- **External** — vendor or platform dependency outside direct control.

---

## Priority Levels

- **Critical** — blocks current-quarter path execution or a Priority 0 decision.
- **High** — blocks an active workstream or risks KPI targets materially.
- **Medium** — causes execution inefficiency but not immediate path failure.
- **Low** — minor sequencing dependency with limited strategic impact.

---

## Canonical Tracker Table

| Dep ID | Type | Priority | Description | Blocking Item | Requesting Owner | Delivering Owner | Due Date | Current Status | Escalation Date | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| DEP-001 | Data | High | [Dependency description] | [Decision/Experiment/Task ID] | [Owner] | [Owner] | [Date] | Open | [Date] | [Context] |
| DEP-002 | Product/Engineering | Medium |  |  |  |  |  | Open |  |  |
| DEP-003 | Legal/Compliance | Critical |  |  |  |  |  | Open |  |  |

Status options:
- `Open`
- `In Progress`
- `At Risk`
- `Blocked`
- `Resolved`

---

## Dependency Intake Standard

Every new dependency must include:
- clear description of the required output,
- blocking item ID,
- requesting and delivering owners,
- due date tied to a business milestone.

Dependencies without owners or due dates are invalid and should not be accepted.

---

## SLA by Priority

| Priority | Acknowledge By | Resolution Target | Escalate By |
|---|---|---|---|
| Critical | same business day | 3 business days | day 2 if unresolved |
| High | 1 business day | 5 business days | day 4 if unresolved |
| Medium | 2 business days | 10 business days | day 8 if unresolved |
| Low | 5 business days | 20 business days | next monthly review |

If escalation is triggered, create/update an item in `ALIGNMENT-BLOCKERS-LOG.md`.

---

## Weekly Review Protocol

In weekly operations review:
1. Review all `At Risk` and `Blocked` dependencies first.
2. Reconfirm owner commitment and revised dates.
3. Identify cascading risk (one dependency blocking multiple items).
4. Force escalation path for all Critical/High misses.

---

## Escalation Triggers

Escalate immediately when:
- a dependency blocks a Priority 0 decision,
- a single dependency blocks 2+ active workstreams,
- due date slips twice,
- delivering owner is unassigned for >24 hours on a Critical dependency.

Escalation owner: Ops / PMO (or equivalent execution lead).

---

## Dependency Health Metrics

Track weekly:
- Open dependencies by priority,
- On-time resolution rate,
- Average resolution time by dependency type,
- Repeat blocker rate by owner/function,
- Cascading dependency count (one-to-many blockers).

Use these signals in dashboard and monthly strategy review.

---

## Integration Points

Use with:
- `ALIGNMENT-BLOCKERS-LOG.md`
- `ALIGNMENT-DECISION-CALENDAR.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-SCORECARD.md`
- `ALIGNMENT-TRACEABILITY-MATRIX.md`
