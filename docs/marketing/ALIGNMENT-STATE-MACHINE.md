# Alignment State Machine

Use this artifact to standardize status transitions across decisions, experiments, blockers, dependencies, and document lifecycle.

When teams use inconsistent states, reporting breaks and escalation timing becomes unreliable.

---

## Purpose

This state machine provides:
- canonical state definitions,
- valid transition paths,
- transition ownership and SLA expectations,
- anti-stall controls for long-lived states.

---

## Object Types Covered

- Decision
- Experiment
- Blocker
- Dependency
- Artifact (document lifecycle)

Each object should use only its defined states and transitions.

---

## 1) Decision State Machine

### States
- `Open`
- `In Progress`
- `Blocked`
- `Closed`
- `Revisit`

### Valid Transitions
- Open → In Progress
- Open → Blocked
- In Progress → Blocked
- In Progress → Closed
- Blocked → In Progress
- Closed → Revisit
- Revisit → In Progress

### Invalid Transitions (disallowed)
- Open → Closed (without evaluation)
- Blocked → Closed (without unblock evidence)

---

## 2) Experiment State Machine

### States
- `Backlog`
- `Scoped`
- `Approved`
- `Running`
- `Analyzing`
- `Decided`
- `Archived`

### Valid Transitions
- Backlog → Scoped
- Scoped → Approved
- Approved → Running
- Running → Analyzing
- Analyzing → Decided
- Decided → Archived
- Running → Decided (only for stop-loss early termination)

---

## 3) Blocker State Machine

### States
- `Open`
- `Owned`
- `In Progress`
- `Escalated`
- `Resolved`

### Valid Transitions
- Open → Owned
- Owned → In Progress
- In Progress → Escalated
- Escalated → In Progress
- In Progress → Resolved

Rule: no blocker may stay in Open > 24 hours without owner assignment.

---

## 4) Dependency State Machine

### States
- `Open`
- `In Progress`
- `At Risk`
- `Blocked`
- `Resolved`

### Valid Transitions
- Open → In Progress
- In Progress → At Risk
- At Risk → In Progress
- At Risk → Blocked
- Blocked → In Progress
- In Progress → Resolved

---

## 5) Artifact Lifecycle State Machine

### States
- `Draft`
- `Active`
- `Superseded`
- `Archived`

### Valid Transitions
- Draft → Active
- Active → Superseded
- Superseded → Archived
- Active → Archived (only if deprecated without replacement)

Rule: Superseded artifacts must reference replacement artifact within 48 hours.

---

## Transition Ownership Rules

| Object Type | Transition Approver | Default Operator |
|---|---|---|
| Decision | Strategy Owner | Ops / PMO |
| Experiment | Growth Lead | Experiment Owner |
| Blocker | Ops / PMO | Functional Owner |
| Dependency | Ops / PMO | Delivering Owner |
| Artifact Lifecycle | Documentation Owner | Artifact Owner |

---

## Anti-Stall SLA Controls

Escalate when:
- Decision remains `In Progress` > SLA window in `ALIGNMENT-DECISION-SLA.md`.
- Experiment remains `Analyzing` > 5 business days.
- Blocker remains `Escalated` > 3 business days without next action.
- Dependency remains `At Risk` > 5 business days.
- Artifact remains `Draft` > 30 days without activation decision.

---

## Reporting Requirements

Weekly control views must include:
- counts by state per object type,
- aging by state,
- transition failures (invalid attempted transitions),
- overdue state dwell alerts.

Use these in:
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-DASHBOARD-TEMPLATE.md`
- `ALIGNMENT-MONTHLY-REVIEW-TEMPLATE.md`

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-SLA.md`
- `ALIGNMENT-EXPERIMENT-REGISTRY.md`
- `ALIGNMENT-BLOCKERS-LOG.md`
- `ALIGNMENT-DEPENDENCY-TRACKER.md`
- `ALIGNMENT-ARTIFACT-LIFECYCLE.md`
