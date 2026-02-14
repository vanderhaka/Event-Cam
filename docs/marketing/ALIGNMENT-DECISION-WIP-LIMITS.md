# Alignment Decision WIP Limits

Use this artifact to cap concurrent decision work and protect decision quality.

Too many open decisions at once creates shallow analysis, stale evidence, and missed SLAs.

---

## Purpose

This control enforces:
- a maximum number of active decisions by priority band,
- explicit sequencing when limits are breached,
- higher decision quality by reducing parallel decision load.

---

## Default WIP Limits

| Decision Band | Max Concurrent Active Items | Notes |
|---|---:|---|
| P0 | 2 | Path-defining only; avoid parallel strategic conflicts |
| P1 | 5 | Execution-significant decisions |
| P2 | 8 | Lower urgency; defer when capacity is constrained |
| Total Active (all bands) | 12 | Hard ceiling unless leadership exception is granted |

“Active” includes statuses: Triaged, Briefing, Scheduled, In Review.

---

## Limit Breach Protocol

When any limit is exceeded:

1. Freeze intake routing for lowest-priority new items.
2. Re-rank active queue using priority rules.
3. Close, defer, or reject at least enough items to return under limit.
4. Publish breach reason and correction owner.

No new P2 item may be activated while P0 or P1 is over limit.

---

## Weekly WIP Monitoring Table

| Week | Active P0 | Active P1 | Active P2 | Total Active | Breach (Y/N) | Corrective Action | Owner |
|---|---:|---:|---:|---:|---|---|---|
| [YYYY-MM-DD] |  |  |  |  |  |  |  |
| [YYYY-MM-DD] |  |  |  |  |  |  |  |

---

## Quality Safeguards Under Load

If total active decisions >10 (near ceiling), enforce:
- mandatory premortem for all P0 decisions,
- evidence quality check before scheduling,
- no same-owner assignment for >35% of active items.

If total active decisions >12 (ceiling breach):
- stop new activations except critical P0,
- run same-week queue reduction session.

---

## Escalation Triggers

Escalate to leadership when:
- WIP breach persists into next week,
- P0 active count exceeds 2 for more than 3 business days,
- decision quality failures rise while limits are breached.

Escalation output must include:
- item-level close/defer decisions,
- owner rebalance actions,
- next-week target state.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-INTAKE-QUEUE.md`
- `ALIGNMENT-PRIORITY-RULES.md`
- `ALIGNMENT-DECISION-SLA.md`
- `ALIGNMENT-OWNER-LOAD-MANAGEMENT.md`
- `ALIGNMENT-COMMAND-CENTER.md`
