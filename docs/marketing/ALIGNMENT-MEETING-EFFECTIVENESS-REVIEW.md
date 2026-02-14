# Alignment Meeting Effectiveness Review

Use this artifact to verify that alignment meetings are producing decisions, closures, and measurable progress.

Meeting volume without output is a hidden failure mode that creates process fatigue and slows execution.

---

## Purpose

This review ensures:
- meetings are outcome-driven, not status theater,
- time spent in governance is justified by decision and execution gains,
- low-yield meetings are corrected or removed quickly.

---

## Meetings in Scope

Evaluate at minimum:
- weekly decision review,
- weekly KPI standup,
- weekly experiment review,
- monthly strategy sync.

Optional: other recurring governance meetings.

---

## Core Effectiveness Metrics

| Metric | Definition | Target |
|---|---|---:|
| Decision Yield | Closed decisions per decision-review meeting | ≥ 2 |
| Action Closure Rate | % prior-meeting actions completed by due date | ≥ 80% |
| Escalation Resolution Rate | % escalations resolved within SLA | ≥ 85% |
| Meeting-to-Outcome Lag | Days from meeting decision to visible execution update | ≤ 7 days |
| Time Efficiency | Total governance hours per week / active critical items | within team baseline |

Set team baseline during first two weeks, then track trend direction.

---

## Weekly Review Table

| Week | Meeting Type | Scheduled (min) | Actual (min) | Key Outputs Produced | Output Quality (Low/Med/High) | Effectiveness Status (Green/Yellow/Red) | Corrective Action |
|---|---|---:|---:|---|---|---|---|
| [YYYY-MM-DD] | Decision Review |  |  |  |  |  |  |
| [YYYY-MM-DD] | KPI Standup |  |  |  |  |  |  |
| [YYYY-MM-DD] | Experiment Review |  |  |  |  |  |  |

---

## Quality Gate (Per Meeting)

Before marking meeting effective:
- [ ] agenda was published before meeting,
- [ ] owner and deadline captured for each action,
- [ ] decision IDs linked where applicable,
- [ ] unresolved blockers explicitly escalated,
- [ ] outputs reflected in canonical artifacts within 48 hours.

If any item is unchecked, meeting cannot be rated Green.

---

## Failure Patterns and Corrections

| Pattern | Correction |
|---|---|
| Same topics repeat with no closure | Force close options in next decision review |
| Actions repeatedly overdue | Reduce commitments and rebalance ownership |
| Meeting duration grows with no output increase | Timebox stricter and pre-read required |
| Escalations remain open beyond SLA | Trigger on-call path for governance incidents |
| Meetings produce notes but no artifact updates | Block next meeting until artifact sync completed |

---

## Escalation Triggers

Escalate when:
- 2 consecutive weeks of Red effectiveness status,
- decision review yields <1 closed decision for 2 weeks,
- >30% action items overdue for 2 weeks.

Escalation output must include:
- meeting redesign decision,
- owner/accountability update,
- measurable target improvement for next 2 weeks.

---

## Integration Points

Use with:
- `ALIGNMENT-MEETING-CADENCE.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-DECISION-MEETING-NOTES-TEMPLATE.md`
- `ALIGNMENT-OWNER-LOAD-MANAGEMENT.md`
