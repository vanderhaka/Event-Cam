# Alignment Decision Intake Queue

Use this artifact to capture, triage, and route new decision requests before they become hidden blockers.

Without a controlled intake queue, teams miss deadlines, duplicate discussions, and overload decision owners.

---

## Purpose

This queue standardizes how new decisions enter the system:
- every request gets an ID and owner,
- priority is assigned using shared rules,
- unresolved intake items are visible before they become decision debt.

---

## Intake Workflow

1. **Capture**  
   Log request with minimal required fields.

2. **Triage**  
   Assign priority (P0/P1/P2), due target, and decision owner.

3. **Route**  
   Move item to:
   - Priority 0 brief workflow,
   - standard decision workflow,
   - reject/defer with rationale.

4. **Schedule**  
   Add to decision review calendar with explicit close target.

5. **Close or Defer**  
   Update status and link to final decision ID or deferral rationale.

---

## Queue Status Model

| Status | Meaning |
|---|---|
| New | Logged, not triaged yet |
| Triaged | Priority + owner assigned |
| Briefing | Supporting evidence/brief being prepared |
| Scheduled | Decision date committed |
| Closed | Decision completed and linked |
| Deferred | Explicitly delayed with next review date |
| Rejected | Not pursued, rationale documented |

No item may remain in **New** beyond triage SLA.

---

## Intake SLA

| Priority | Triage SLA | Scheduling SLA |
|---|---:|---:|
| P0 | 24 hours | 2 business days |
| P1 | 3 business days | 5 business days |
| P2 | 5 business days | 10 business days |

If triage SLA is breached, escalate in weekly decision review.

---

## Canonical Intake Table

| Intake ID | Date Logged | Request Summary | Requestor | Proposed Priority | Assigned Priority | Owner | Current Status | Required By | Linked Decision ID | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| DIN-001 |  |  |  |  |  |  |  |  |  |  |
| DIN-002 |  |  |  |  |  |  |  |  |  |  |
| DIN-003 |  |  |  |  |  |  |  |  |  |  |

---

## Intake Quality Gate

Before triage, confirm:
- [ ] request is a true decision (not an execution task),
- [ ] request has clear decision question,
- [ ] expected impact area is named,
- [ ] duplicates checked against open decisions,
- [ ] minimum evidence available or evidence plan assigned.

If any item fails, return to requestor for clarification.

---

## Weekly Queue Review

In weekly decision scan, report:
- count by queue status,
- triage SLA misses,
- deferred items older than 14 days,
- rejected items with recurring theme.

Queue health is Red if:
- any P0 intake misses triage SLA,
- 20%+ of total queue is overdue triage,
- deferred backlog grows for 3 consecutive weeks.

---

## Escalation Triggers

Escalate to leadership when:
- 2+ P0 requests are untriaged at week close,
- same decision topic is re-introduced 3+ times in 30 days,
- queue owner load prevents triage within SLA.

Escalation output must include:
- re-prioritization decision,
- owner reassignment if needed,
- forced close dates for overdue intake.

---

## Integration Points

Use with:
- `ALIGNMENT-PRIORITY-RULES.md`
- `ALIGNMENT-DECISION-SLA.md`
- `ALIGNMENT-PRIORITY0-DECISION-BRIEF.md`
- `ALIGNMENT-DECISIONS-LOG.md`
- `ALIGNMENT-DECISION-DEBT-REGISTER.md`
