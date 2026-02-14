# Alignment Experiment Registry

Use this registry to run experiments with consistent rigor, clear ownership, and explicit stop/scale decisions.

---

## Purpose

This artifact exists to prevent:
- random “activity” without learning,
- overlapping tests that contaminate each other,
- weak post-mortems that fail to inform future decisions.

It should be reviewed in the weekly experiment review and referenced in the monthly strategy sync.

---

## Stage Definitions

Use one status per experiment:

- **Backlog** — Idea captured but not scoped.
- **Scoped** — Hypothesis, metric, and owner are defined.
- **Approved** — Cleared for launch with dates and guardrails.
- **Running** — Live and collecting data.
- **Analyzing** — Data collection ended; analysis in progress.
- **Decided** — Scale / Iterate / Stop decision made.
- **Archived** — Learnings documented and closed.

---

## Registry Table (Canonical)

| Exp ID | Status | Hypothesis | Primary Metric | Success Threshold | Guardrail Metric | Owner | Start | End | Decision | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| EXP-001 | Backlog | [If we do X for Y segment, Z will improve] | [Metric] | [Target] | [Risk metric] | [Name] | [Date] | [Date] | [TBD] | [Dependencies] |
| EXP-002 | Backlog |  |  |  |  |  |  |  |  |  |
| EXP-003 | Backlog |  |  |  |  |  |  |  |  |  |

---

## Experiment Brief (Required Before Approval)

Complete this for each experiment before status moves to **Approved**.

### 1) Context
- Problem statement:
- Why now:
- Related decision/question ID:

### 2) Design
- Hypothesis (single sentence):
- Audience/segment:
- Channel/touchpoint:
- Intervention details:
- Run window:

### 3) Measurement Contract
- Primary metric:
- Success threshold:
- Secondary metric(s):
- Guardrail metric(s):
- Data source(s):

### 4) Risk & Constraints
- Primary execution risk:
- Compliance/brand/legal checks needed:
- Resource ceiling (time/budget):
- Stop-loss trigger:

### 5) Decision Rule
- If success threshold met:
- If ambiguous result:
- If failure/guardrail breach:

---

## Weekly Review Protocol

During weekly experiment review:
1. Move stale **Backlog** items to cancel or scope.
2. Confirm every **Running** experiment has:
   - active owner,
   - clean data source,
   - no unresolved blocker older than 7 days.
3. Force a decision for every **Analyzing** item within 5 business days.
4. Archive closed experiments only after learnings are documented.

---

## Decision Outcomes

Every closed experiment must end in one of four outcomes:
- **Scale** — Roll out to wider segment/channel.
- **Iterate** — Re-run with one major change.
- **Hold** — Keep result in reserve; no immediate rollout.
- **Stop** — Discontinue and document why.

No closed experiment should end as “inconclusive” without a next action.

---

## Monthly Learning Rollup

At month-end, summarize:
- Experiments launched vs completed,
- Win rate (Scale outcomes / Decided outcomes),
- Most common failure mode,
- Top 3 reusable learnings,
- 1–2 experiments to retire permanently (low strategic value).

Feed this summary into:
- `ALIGNMENT-MONTHLY-REVIEW-TEMPLATE.md`
- `ALIGNMENT-DECISION-MEETING-NOTES-TEMPLATE.md`
- `ALIGNMENT-RETROSPECTIVE-TEMPLATE.md`

---

## Quality Bar

An experiment is considered “high quality” only if:
- hypothesis is explicit,
- success and guardrail thresholds are defined before launch,
- owner and date range are assigned,
- close-out decision is documented with evidence.
