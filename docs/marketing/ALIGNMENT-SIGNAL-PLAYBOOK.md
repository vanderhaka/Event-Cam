# Alignment Signal Playbook

> Defines what to do when key alignment signals improve, degrade, or break.

---

## Signal Categories

1. **Decision signals** (closure speed, blocker aging, reversals)
2. **Execution signals** (experiment throughput, cadence compliance)
3. **Measurement signals** (KPI consistency, dashboard readiness)
4. **Narrative signals** (message consistency, boundary adherence)

---

## Signal Response Matrix

| Signal | Green | Yellow | Red | Immediate Response |
|---|---|---|---|---|
| Priority 0 closure status | All closed on time | One delayed | Multiple delayed/blocked | Run urgent decision review and escalate blockers |
| Pricing consistency | No contradictions | Minor mismatch detected | Conflicting live values in active docs | Freeze external pricing updates until reconciled |
| Weekly alignment score | ≥17 | 13–16 | <13 | Apply scorecard mandatory action rules |
| Experiment portfolio load | ≤5 active, clear statuses | 5 active with ambiguous statuses | >5 active or no kill decisions | Pause new tests, force scale/kill decisions |
| Doc sync SLA | ≥90% within 48h | 70–89% | <70% | Assign doc-sync owner sprint to clear backlog |
| KPI owner coverage | 100% assigned | One owner gap | Multiple owner gaps | Block scaling decisions until ownership restored |
| Message consistency | Single approved narrative in use | Isolated drift signal | Multiple conflicting narratives active | Run messaging reset and re-issue canonical narrative |

---

## Red Signal Protocol (24-Hour)

When any signal turns red:

1. Log blocker in `ALIGNMENT-BLOCKERS-LOG.md`.
2. Classify risk category + severity using `ALIGNMENT-RISK-TAXONOMY.md`.
3. Assign owner + 24-hour corrective action.
4. Record action in weekly dashboard and decision review.
5. Confirm resolution or escalate in next cycle.

---

## Yellow Signal Protocol (72-Hour)

When any signal turns yellow:

1. Create corrective task with owner and due date.
2. Track progress in weekly operations checklist.
3. If unresolved after 72 hours, escalate to red.

---

## Green Signal Reinforcement

When signals remain green for 2+ consecutive weeks:

- Maintain current cadence; do not add process overhead.
- Capture what is working in changelog or retrospective notes.
- Reallocate effort from governance overhead to execution velocity.

---

## Signal Ownership

| Signal Area | Primary Owner |
|---|---|
| Decision signals | Ops / PMO |
| Execution signals | Growth Lead |
| Measurement signals | Growth + Product Analytics |
| Narrative signals | Marketing Lead |

---

## Rule

No strategic expansion decision should proceed while any critical alignment signal remains red.

