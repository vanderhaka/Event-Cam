# Alignment On-Call Escalation Matrix

Use this matrix to assign clear on-call ownership when alignment incidents occur between scheduled meetings.

This prevents high-impact issues from waiting until the next weekly review.

---

## Purpose

This artifact defines:
- on-call roles by incident type,
- response-time expectations,
- escalation chain for unresolved incidents,
- handoff expectations after incident stabilization.

---

## What Counts as an Alignment Incident

Treat these as incidents requiring on-call response:

- critical contradiction discovered in active pricing or narrative docs,
- Priority 0 decision blocked past hard deadline,
- invalid state transitions causing control/reporting failure,
- KPI ownership gap during a scaling decision window,
- multiple unresolved Critical blockers at once,
- canonical-source conflict disrupting active execution.

---

## Severity Levels

| Severity | Definition | Response Start SLA | Stabilization Target |
|---|---|---:|---:|
| Sev-1 | Immediate threat to active path execution or commercial trust | 1 hour | 24 hours |
| Sev-2 | High risk of near-term execution slippage | 4 hours | 48 hours |
| Sev-3 | Medium risk, controllable with scheduled intervention | 1 business day | 5 business days |
| Sev-4 | Low urgency, monitor and include in next cadence | 2 business days | Next weekly review |

---

## On-Call Ownership Matrix

| Incident Type | Primary On-Call | Secondary On-Call | Escalation Owner |
|---|---|---|---|
| Pricing contradiction / comms risk | Strategy Owner | Marketing Lead | Founder / CEO |
| Decision SLA breach (P0) | Ops / PMO | Strategy Owner | Leadership Team |
| Blocker/dependency cascade | Ops / PMO | Functional Lead | Founder / CEO |
| KPI/data ownership failure | Growth Lead | Ops / PMO | Leadership Team |
| ID/state-machine integrity failure | Documentation Owner | Ops / PMO | Strategy Owner |
| Canonical-source conflict | Documentation Owner | Strategy Owner | Founder / CEO |

---

## Escalation Chain

If incident is unresolved within stabilization target:

1. Primary on-call escalates to secondary on-call.
2. Secondary triggers escalation owner review.
3. Escalation owner sets forced decision and due date.
4. If still unresolved: open executive escalation in next available leadership window.

For Sev-1, skip directly to steps 2 and 3.

---

## Incident Log Entry Template

- Incident ID:
- Severity:
- Detected by:
- Detection timestamp:
- Incident type:
- Immediate impact:
- Primary on-call:
- Current status:
- Next action:
- Stabilization due:
- Escalation triggered? (Yes/No):
- Closure timestamp:
- Root cause category:
- Prevention action:

---

## After-Action Requirements

Within 48 hours of closure:

1. Update relevant operating artifact(s).
2. Log root cause + prevention in retrospective notes.
3. Update contradiction/blocker/dependency registers as needed.
4. Confirm whether operating mode should change.

No incident is complete until after-action updates are done.

---

## Weekly Reporting

Report in weekly executive packet:
- incidents opened by severity,
- incidents closed by severity,
- median time-to-stabilize,
- repeated incident categories.

Escalate if:
- two Sev-1 incidents occur in one month,
- same incident category repeats 3+ times in a quarter.

---

## Integration Points

Use with:
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-BLOCKERS-LOG.md`
- `ALIGNMENT-CONTRADICTION-REGISTER.md`
- `ALIGNMENT-RETROSPECTIVE-TEMPLATE.md`
