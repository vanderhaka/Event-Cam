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
- Review open overrides for expiry risk and compensating-control status.
- Confirm portfolio-review due date and readiness of required inputs.
- Resolve any active control conflicts using precedence rules and log outcomes.
- Review active control-change verification windows and rollback triggers.
- Review open high-severity control failure modes and containment status.
- Review escalation effectiveness trend (SLA, recurrence, reopened count).
- Review corrective-action backlog (overdue CA-P0/CA-P1 and reopened actions).
- Review closure-integrity audit results (valid-closure rate, failure classes, stale-evidence closures).

## Step 1: Health Scan (15 min)
- Confirm current alignment score band.
- Confirm current system-health band (Green/Yellow/Red).
- Confirm any red signals from signal playbook.
- Confirm blocker backlog trend.
- Confirm meeting effectiveness status (Green/Yellow/Red trend).
- Confirm governance cost is within weekly budget threshold.
- Confirm latest governance ROI trend and action status.
- Confirm signal-lag trend and any stage-specific threshold breaches.

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
- Check for expired evidence linked to pending high-impact decisions.
- Check critical/high signal lag entries for assignment/action bottlenecks.

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
- Check recurring control-failure patterns and trigger redesign review where needed.
- Check unresolved or reopened escalations for root-cause containment gaps.
- Check corrective actions awaiting verification and overdue closure.
- Check reopened items caused by invalid closure and assign correction owners.

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
- Review top automation-priority candidates and dependency status.

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
| Calibration gap worsens below -0.15 for 2 months | Tighten confidence scoring policy and evidence requirements |
| P0/P1 decision depends on expired evidence | Block approval until refresh or explicit override logged |
| Override expires without closure | Escalate as governance incident and force same-week resolution |
| Governance cost exceeds 120% budget for 2 weeks | Trigger cost-reduction playbook and re-evaluate active pack/mode |
| Portfolio review overdue beyond quarter reset window | Escalate to leadership and freeze net-new control additions |
| Governance ROI negative for 2 months | Initiate governance redesign and leadership review |
| Unresolved control conflict blocks decision progress | Apply precedence ruling and assign wording-fix owner |
| C2/C3 control change launched without packet | Freeze rollout and require immediate governance review |
| P-A1 automation candidates idle for 2 cycles | Escalate automation queue reprioritization |
| Critical signal lags breach stage thresholds | Trigger on-call + lag root-cause correction plan |
| Same control logs repeated F1/F2 failure modes | Trigger control redesign via change protocol |
| Escalation recurrence rises for 2 months | Run escalation-effectiveness redesign review |
| Corrective-action backlog grows for 3 weeks | Run corrective-action reset and owner rebalance |
| Valid closure rate drops below 90% | Freeze new closes in affected workflow and run closure-integrity correction |

---

## Required Inputs by Meeting

| Meeting | Minimum Inputs |
|---|---|
| KPI Standup | KPI dashboard + data quality checklist |
| Decision Review | Questions doc + decisions log + blockers log + decision intake queue + decision outcome reviews |
| Experiment Review | Experiment register + thresholds + outcomes |
| Strategy Sync | Monthly review template + score trend + risk register + meeting effectiveness review + artifact usage telemetry + decision calibration report + governance ROI report + signal lag analysis + control failure modes review + escalation effectiveness review + corrective action tracker + closure integrity audit |
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

