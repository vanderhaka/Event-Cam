# Alignment Priority Rules

Use these rules when multiple decisions, blockers, or initiatives compete for limited team capacity.

Without explicit priority logic, teams default to urgency noise instead of strategic value.

---

## Purpose

This artifact standardizes how to prioritize:
- decisions,
- blockers,
- experiments,
- documentation updates.

It protects the selected path from opportunistic drift.

---

## Priority Order (Highest to Lowest)

1. **Path Integrity Risks**  
   Anything threatening the currently selected primary path.

2. **Decision Bottlenecks**  
   Priority 0/1 decisions blocking execution flow.

3. **Commercial/Credibility Risks**  
   Issues that could damage trust (pricing contradictions, unresolved comms conflicts).

4. **Execution Throughput Risks**  
   Blockers/dependencies that slow delivery materially.

5. **Optimization Opportunities**  
   Performance improvements not required for path continuity.

---

## Priority Scoring Model (1–5 each)

Score each candidate across:

- **Strategic Impact**
- **Urgency**
- **Dependency Weight**
- **Risk of Delay**
- **Reversibility Cost** (higher score = harder to recover if delayed)

Total score range: 5–25.

---

## Priority Bands

| Score | Band | Action Expectation |
|---:|---|---|
| 21–25 | P0-Critical | Start same day; leadership visibility |
| 16–20 | P1-High | Start within 1 business day |
| 11–15 | P2-Medium | Schedule this week |
| 5–10 | P3-Low | Backlog or batch for later cycle |

---

## Tie-Break Rules

When two items score the same:

1. prioritize item with higher **path integrity** risk,
2. then item with higher **commercial credibility** risk,
3. then item with shorter time-to-resolution,
4. then item with clearer owner availability.

If still tied, escalation owner decides and logs rationale.

---

## Weekly Priority Queue Protocol

At weekly planning:
1. Score top 10 active items.
2. Force-rank top 5.
3. Assign one owner per top-5 item.
4. Mark all remaining items as deferred or delegated.

No weekly plan should carry >5 top-priority active items.

---

## Priority Drift Warning Signals

Run a drift check when:
- top priorities change more than twice in one week,
- same high-score item is deferred repeatedly,
- low-score items consume majority of team bandwidth.

If drift detected, pause new work and re-run priority queue with leadership.

---

## Required Logging

For every P0-Critical / P1-High item:
- log priority score,
- log owner and due date,
- log why it outranked alternatives.

Use decision log or blockers log depending on item type.

---

## Integration Points

Use with:
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-DECISION-CRITERIA.md`
- `ALIGNMENT-BLOCKERS-LOG.md`
- `ALIGNMENT-DECISIONS-LOG.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
