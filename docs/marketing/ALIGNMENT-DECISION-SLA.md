# Alignment Decision SLA

This SLA defines how quickly strategic and operating decisions must move from open to closed state.

Use this with:
- `QUESTIONS-THAT-NEED-ANSWERS.md`
- `ALIGNMENT-DECISIONS-LOG.md`
- `ALIGNMENT-BLOCKERS-LOG.md`
- `ALIGNMENT-DECISION-CALENDAR.md`

---

## Why This Exists

Teams often fail not because decisions are impossible, but because decision latency is invisible.

This artifact forces explicit deadlines, owners, and escalation paths so “pending” decisions do not silently block execution.

---

## Priority Bands

Apply exactly one priority to each decision:

- **P0 (Path-Defining)**  
  Decisions that determine market focus, pricing architecture, channel allocation, or core operating model.

- **P1 (Execution-Critical)**  
  Decisions that affect current-quarter launch quality, KPI reliability, or active experiment integrity.

- **P2 (Optimization / Expansion)**  
  Decisions that improve efficiency or optional expansion but do not block current path execution.

---

## SLA Targets

| Priority | Initial Owner Assignment | Decision Brief Due | Final Decision Due | Mandatory Escalation |
|---|---|---|---|---|
| P0 | within 24 hours | within 3 business days | within 7 business days | Day 5 if unresolved |
| P1 | within 48 hours | within 5 business days | within 10 business days | Day 8 if unresolved |
| P2 | within 5 business days | within 10 business days | within 20 business days | Day 15 if unresolved |

“Final Decision Due” means a documented decision exists in `ALIGNMENT-DECISIONS-LOG.md` with owner sign-off.

---

## Aging Rules

Every open decision must be tagged with an age bucket:

- **0–2 days**: On track
- **3–5 days**: At risk
- **6–10 days**: Late
- **10+ days**: Critical delay

Any P0 decision entering **Late** status automatically triggers an escalation entry in `ALIGNMENT-BLOCKERS-LOG.md`.

---

## Escalation Ladder

Use this escalation sequence without skipping steps:

1. **Owner Ping (same day)**  
   Confirm blocker source and required inputs.
2. **Functional Escalation (+1 business day)**  
   Escalate to owner’s functional lead.
3. **Cross-Functional Escalation (+2 business days)**  
   Add strategy owner + ops owner; force options comparison.
4. **Leadership Escalation (+3 business days)**  
   Bring to leadership decision review with forced close date.

If P0 remains open after leadership escalation, mark alignment health as degraded in weekly scorecard.

---

## Decision Quality Requirements

A decision counts as **Closed** only if all are true:

- Decision statement is unambiguous.
- Scope and boundaries are explicit.
- KPI impact expectation is documented.
- Owner and effective date are defined.
- Known downside/trade-off is recorded.
- Contradicting docs are listed for update.

If any item is missing, status must remain **In Progress** or **Blocked**.

---

## SLA Exceptions

Exceptions are allowed only with:
1. clear reason (dependency, legal risk, data unavailable),
2. approved temporary owner for unblock work,
3. revised close date,
4. explicit impact statement.

Log all exceptions in both:
- `ALIGNMENT-DECISIONS-LOG.md` (decision entry notes),
- `ALIGNMENT-BLOCKERS-LOG.md` (active blocker row).

---

## Weekly SLA Review

In the weekly decision review meeting:

1. Count open decisions by priority and age bucket.
2. Identify breaches by SLA type (assignment, brief, final close).
3. Force remediation plan for every breached P0/P1 item.
4. Record SLA health trend (improving/stable/degrading).

---

## SLA Health Metrics

Track these each week:

- **P0 On-Time Close Rate** = P0 decisions closed by SLA / total P0 decisions due
- **P1 On-Time Close Rate** = P1 decisions closed by SLA / total P1 decisions due
- **Median Decision Cycle Time** (open → closed)
- **Breach Recurrence Rate** = repeat breaches by same dependency class
- **Escalation Success Rate** = escalated decisions closed within 3 business days

Use these signals in:
- `ALIGNMENT-SCORECARD.md`
- `ALIGNMENT-DASHBOARD-TEMPLATE.md`
- `ALIGNMENT-MONTHLY-REVIEW-TEMPLATE.md`
