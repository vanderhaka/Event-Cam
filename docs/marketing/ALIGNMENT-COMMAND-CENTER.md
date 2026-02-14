# Alignment Command Center

> Operational control page for running the alignment system week-to-week.

---

## What to Check First (Every Monday)

1. `ALIGNMENT-SCORECARD.md` — current alignment health.
2. `ALIGNMENT-BLOCKERS-LOG.md` — unresolved blockers and SLA risk.
3. `ALIGNMENT-DECISIONS-LOG.md` — open vs closed high-priority decisions.
4. `ALIGNMENT-DASHBOARD-TEMPLATE.md` — last weekly operating snapshot.

---

## Weekly Control Loop

## Step 1: Health Scan (15 min)
- Confirm current alignment score band.
- Confirm any red signals from signal playbook.
- Confirm blocker backlog trend.

## Step 2: Decision Scan (15 min)
- Check Priority 0/1 decisions due this week.
- Check for ownerless or overdue decisions.
- Check doc-sync SLA compliance on recently closed decisions.

## Step 3: Execution Scan (20 min)
- Verify active experiment load (≤5).
- Verify scale/hold/kill decisions queued for review.
- Verify KPI dashboard completeness and owner readiness.

## Step 4: Risk Scan (10 min)
- Re-rank top 5 risks.
- Confirm mitigation owner accountability.
- Escalate overdue high/critical items.

## Step 5: Commitments (10 min)
- Set top 3 commitments for next 7 days.
- Assign single owner per commitment.
- Capture expected success signal.

---

## Escalation Shortcuts

Use this trigger table before meetings:

| Trigger | Action |
|---|---|
| Priority 0 blocked > due date | Immediate decision review escalation |
| Alignment score <13 | Freeze new initiatives; run correction plan |
| Pricing contradiction in active docs | Pause pricing comms; reconcile source-of-truth first |
| >5 active experiments | Pause new experiments; force closeout decisions |
| KPI owner missing | Block channel scaling decisions until owner assigned |

---

## Required Inputs by Meeting

| Meeting | Minimum Inputs |
|---|---|
| KPI Standup | KPI dashboard + data quality checklist |
| Decision Review | Questions doc + decisions log + blockers log |
| Experiment Review | Experiment register + thresholds + outcomes |
| Strategy Sync | Monthly review template + score trend + risk register |

---

## Weekly Output Pack

By end of each week, publish:

1. Updated dashboard snapshot
2. Updated scorecard result
3. Updated decisions log
4. Updated blockers status
5. Next-week top commitments

If any output is missing, weekly alignment is incomplete.

