# Alignment Decision Debt Register

Use this register to track unresolved or repeatedly deferred decisions that accumulate strategic execution debt.

Decision debt silently increases coordination cost and slows the team, even when weekly activity appears high.

---

## Purpose

This register helps teams:
- make decision debt visible,
- prioritize debt payoff work,
- prevent chronic deferral of path-critical choices.

---

## What Is Decision Debt

Decision debt exists when a decision:
- remains open beyond SLA,
- is deferred repeatedly without closure criteria,
- is closed but unresolved in downstream docs/process,
- is reopened repeatedly due to weak initial closure quality.

---

## Debt Categories

- **Timing Debt** — decision overdue beyond SLA.
- **Quality Debt** — decision closed with missing quality criteria.
- **Sync Debt** — decision closed but dependent artifacts not updated.
- **Reopen Debt** — decision reopened due to unstable/insufficient rationale.

---

## Register Fields

- Debt ID
- Linked Decision ID
- Debt Category
- Debt Description
- First Detected Date
- Current Age (days)
- Severity (High/Medium/Low)
- Owner
- Paydown Plan
- Target Payoff Date
- Status (`Open`, `In Paydown`, `Resolved`)
- Notes

---

## Canonical Register Table

| Debt ID | Decision ID | Category | Age (days) | Severity | Owner | Target Payoff | Status | Notes |
|---|---|---|---:|---|---|---|---|---|
| DD-001 | DEC-000 | Timing |  | High | [Owner] | [Date] | Open | [Notes] |
| DD-002 | DEC-000 | Sync |  | Medium | [Owner] | [Date] | Open | [Notes] |
| DD-003 | DEC-000 | Reopen |  | Low | [Owner] | [Date] | Open | [Notes] |

---

## Debt Severity Rules

Assign severity using this logic:

- **High**: debt affects path-defining decision, pricing truth, or launch-critical sequence.
- **Medium**: debt affects execution quality but not immediate path continuity.
- **Low**: debt mostly administrative with limited execution impact.

Any High debt older than 10 days triggers escalation in weekly decision review.

---

## Paydown Protocol

For each open debt item:

1. assign one owner,
2. define one concrete payoff action,
3. set target payoff date,
4. track progress weekly.

Debt remains open until:
- root debt cause removed,
- downstream artifacts synced,
- no active dependency blocked by this debt.

---

## Weekly Review Rules

In weekly control loop:

1. count open debt by category and severity,
2. review top 5 oldest debt items,
3. force paydown commitment for each High item,
4. close resolved items with verification note.

---

## Metrics

Track weekly:
- Open decision debt count,
- High-severity debt count,
- Median debt age,
- Debt paydown rate (resolved/opened),
- Reopen debt recurrence rate.

If total open debt rises 3 consecutive weeks, trigger focused debt paydown sprint.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISIONS-LOG.md`
- `ALIGNMENT-DECISION-SLA.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-PRIORITY-RULES.md`
