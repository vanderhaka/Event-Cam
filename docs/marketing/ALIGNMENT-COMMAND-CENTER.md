# Alignment Command Center

> Operational control page for running the alignment system week-to-week.

---

## What to Check First (Every Monday)

1. `ALIGNMENT-ACTIVE-ARTIFACT-SET.md` — active pack/mode and frozen docs.
2. `ALIGNMENT-SCORECARD.md` — current alignment health.
3. `ALIGNMENT-BLOCKERS-LOG.md` — unresolved blockers and SLA risk.
4. `ALIGNMENT-DECISIONS-LOG.md` — open vs closed high-priority decisions.
5. `ALIGNMENT-DASHBOARD-TEMPLATE.md` — last weekly operating snapshot.
6. `ALIGNMENT-CANONICAL-SOURCE-MAP.md` — source-of-truth ownership for conflicting topics.
7. `ALIGNMENT-SYSTEM-HEALTH-METRICS.md` — meta-health of alignment discipline itself.

---

## Weekly Control Loop

## Step 0: Control Context Scan (10 min)
- Confirm active pack + operating mode still match current risk/complexity.
- Confirm no frozen artifact is being used as canonical source.
- Confirm no unresolved canonical-source conflict older than 5 business days.
- Confirm artifact usage telemetry is within acceptable utilization/staleness range.
- Review any proposed control sunset actions and verify packet completeness.

## Step 1: Health Scan (15 min)
- Confirm current alignment score band.
- Confirm current system-health band (Green/Yellow/Red).
- Confirm any red signals from signal playbook.
- Confirm blocker backlog trend.
- Confirm meeting effectiveness status (Green/Yellow/Red trend).

## Step 2: Decision Scan (15 min)
- Check Priority 0/1 decisions due this week.
- Check for ownerless or overdue decisions.
- Check doc-sync SLA compliance on recently closed decisions.
- Check decision debt backlog trend and oldest unresolved debt items.
- Verify premortem coverage for all open Priority 0 decisions.
- Check decision intake queue for triage SLA misses and unassigned requests.
- Check active decision counts against WIP ceilings.
- Check overdue decision outcome reviews and unresolved negative outcomes.
- Check confidence-band distribution for active P0/P1 decisions.

## Step 3: Execution Scan (20 min)
- Verify active experiment load (≤5).
- Verify scale/hold/kill decisions queued for review.
- Verify KPI dashboard completeness and owner readiness.
- Verify decision-to-KPI traceability rows updated for current-week changes.

## Step 4: Risk Scan (10 min)
- Re-rank top 5 risks.
- Confirm mitigation owner accountability.
- Escalate overdue high/critical items.
- Confirm contradiction backlog trend (new vs resolved this week).
- Check control-coverage gaps and assign owner for any uncovered failure mode.

## Step 5: Commitments (10 min)
- Set top 3 commitments for next 7 days.
- Assign single owner per commitment.
- Capture expected success signal.
- If priority conflicts emerge, apply `ALIGNMENT-PRIORITY-RULES.md` before finalizing commitments.
- Confirm owner load remains within safe threshold before assigning net-new critical items.
- Review prior-week commitment slippage and apply recovery protocol for S2/S3 misses.

## Step 6: Control Hygiene Scan (10 min)
- Run ID format/link checks on new entries (decision/experiment/blocker/dependency).
- Run state-machine sanity check on transitioned items.
- Log any transition or ID hygiene defects for next-week correction.

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
| Canonical-source conflict unresolved >5 business days | Escalate in decision review and assign forced close date |
| Active artifact count exceeds mode guardrail for 2 weeks | Run pruning pass and republish active-set declaration |
| Repeated invalid state transitions this week | Freeze affected workflow until owner retraining completes |
| Sev-1 alignment incident detected | Trigger on-call escalation matrix immediately |
| Critical KPI anomaly detected (A1/A2) | Trigger metric anomaly protocol and mark packet provisional |
| P0 decision request untriaged beyond 24h | Escalate intake owner and force triage in same-week review |
| Decision WIP ceiling breached | Pause low-priority activations and run queue reduction session |
| Decision outcome review overdue >7 days | Escalate review owner and assign corrective action deadline |
| Meeting effectiveness Red for 2 consecutive weeks | Redesign meeting cadence/format and assign recovery owner |
| S3 commitment slippage detected | Trigger same-day recovery plan and escalate ownership support |
| Active-artifact utilization <70% for 2 weeks | Reduce active set and trigger pruning/merge pass |
| Control retirement proposed without sunset packet | Block retirement and escalate for evidence review |
| 2+ active P0 decisions below confidence score 70 | Trigger conditional-approval review and mitigation plan |

---

## Required Inputs by Meeting

| Meeting | Minimum Inputs |
|---|---|
| KPI Standup | KPI dashboard + data quality checklist |
| Decision Review | Questions doc + decisions log + blockers log + decision intake queue + decision outcome reviews |
| Experiment Review | Experiment register + thresholds + outcomes |
| Strategy Sync | Monthly review template + score trend + risk register + meeting effectiveness review + artifact usage telemetry |
| Executive Review | Weekly executive packet + active artifact set + contradiction register |

---

## Weekly Output Pack

By end of each week, publish:

1. Updated dashboard snapshot
2. Updated scorecard result
3. Updated decisions log
4. Updated blockers status
5. Updated weekly executive packet
6. Updated active artifact set declaration
7. Next-week top commitments

If any output is missing, weekly alignment is incomplete.

