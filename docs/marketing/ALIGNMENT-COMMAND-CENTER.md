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
- Review leading-indicator watchlist for Watch→Warning/Critical transitions.
- Review preventive-action effectiveness trend and ineffective-pattern concentration.
- Review threshold-calibration status (false alerts, missed alerts, pending recalibration).
- Review decision-quality regression trend and active remediation status.
- Review alert-fatigue status (noise ratio, repeat alerts, critical-response SLA).
- Review control-dependency map for Broken/At Risk prerequisite links.
- Review cadence-compliance status for weekly/monthly/quarterly review cycles.
- Review control-adoption compliance for newly launched or changed controls.
- Review control-effectiveness score trend for keep/optimize/merge/retire candidates.
- Review signal-correlation report for contradictory high-priority pairs.
- Review policy-exception patterns for recurrence, expiry risk, and unresolved extensions.
- Review handoff reliability status for recent ownership transitions.
- Review operating-health index trend for cross-domain deterioration.
- Review control-criticality map for CC-1/CC-2 risk concentration and coverage.
- Review decision-packet compliance status for upcoming P0/high-impact approvals.
- Review decision-reopen analysis trends for repeat churn and dominant causes.
- Review root-cause pattern trends across slippage/escalation/failure/reopen streams.
- Review backlog-aging trends for stale and critical-stale unresolved items.
- Review recurrence heatmap for chronic H3/H4 clusters and owner concentration.
- Review control-lifecycle stage transitions and stalled lifecycle states.
- Review cross-function coordination status for recurring delay/rework pairs.
- Review control-overlap analysis for unresolved duplicate/conflict-prone pairs.
- Review assumption-drift status for high-impact decision dependencies.
- Review intervention-priority queue for unresolved I1/I2 items.
- Review owner-capacity forecast for next-cycle high-risk load concentrations.
- Review decision-latency decomposition for repeated stage bottlenecks.
- Review dependency-resolution SLA status for overdue cluster growth.
- Review data-source reliability bands for degraded source concentration.
- Review metric-definition consistency status for formula/threshold drift.
- Review control-change saturation status for overlap and adoption-capacity pressure.
- Review recovery-window compliance for active/overdue stabilization plans.
- Review canonical-source compliance status for non-canonical usage violations.
- Review decision-outcome lag status for delayed/overdue visibility signals.
- Review evidence-linkage compliance for broken/unlinked critical items.
- Review reversal-trigger coverage status for active P0/high-impact decisions.
- Review decision-authority compliance for in-scope approvals and route integrity.
- Review control-owner coverage status for CC-1/CC-2 controls.
- Review definition-of-done compliance for recently closed high-impact items.
- Review control-runbook coverage status for CC-1/CC-2 controls.
- Review control-drill effectiveness for CC-1 and selected CC-2 controls.
- Review control-failover readiness status for CC-1 and dependency-critical CC-2 controls.
- Review dependency blast-radius status for critical shared dependencies.
- Review control-test coverage across runbook/drill/failover layers.
- Review control observability coverage across signal/alert/diagnostic layers.

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
- Check multi-domain leading-indicator deterioration and assign preventive actions.
- Check preventive actions marked ineffective and route redesign owners.
- Check thresholds in drift-suspected status and assign recalibration owners.
- Check decision-quality composite trend and assign intervention owners when regressing.
- Check noisy/repeat alert sources and assign alert-design corrections.
- Check downstream controls with unmet prerequisites and mark outputs provisional where required.
- Check missed/deferred reviews and assign catch-up owners.
- Check non-compliant control steps and assign remediation owners.
- Check controls with weak/failing effectiveness scores and assign action decisions.
- Check contradictory signal pairs and assign root-cause investigations.
- Check recurring or expired exceptions and assign policy-correction owners.
- Check recent handoffs for packet completeness, acceptance, and post-handoff stability.
- Check component-level index drops and assign recovery owners by domain.
- Check CC-1 controls for any non-compliance, owner gaps, or retirement proposals.
- Check P0/P1 packets for missing critical sections before decision meetings.
- Check reopened decisions for unresolved root causes and reclose stability risk.
- Check recurring top root causes and assign structural-fix owners.
- Check critical-stale backlog clusters and assign burn-down owners.
- Check persistent recurrence clusters and assign cross-functional intervention owners.
- Check controls stuck in unstable lifecycle stages and assign transition owners.
- Check repeated function-pair coordination failures and assign correction owners.
- Check overlap/conflict control pairs and assign clarify/merge owners.
- Check drifted assumptions with active decision exposure and assign rebase owners.
- Check intervention sequence adherence and rebalance capacity toward highest bands.
- Check forecasted high-risk owners and assign pre-cycle rebalancing actions.
- Check dominant decision bottleneck stages and assign stage-specific fixes.
- Check overdue dependency chains and assign expedited recovery owners.
- Check Red/Yellow source exposure and assign reliability recovery owners.
- Check material metric-definition drift and assign canonical correction owners.
- Check concurrent control-change load and resequence when saturation risk is high.
- Check overdue recovery windows and assign recovery-escalation owners.
- Check source-of-truth violations and assign correction owners.
- Check delayed/overdue decision outcome visibility and assign lag-correction owners.
- Check broken or stale evidence links and assign linkage-recovery owners.
- Check uncovered or partial reversal-trigger sets and assign correction owners.
- Check authority violations and assign ratification/correction owners.
- Check critical controls with partial/uncovered ownership and assign fixes.
- Check closed items with done-criteria gaps and assign closure corrections.
- Check critical controls with stale/missing runbooks and assign remediation owners.
- Check repeated drill failures and assign action-closure owners.
- Check controls not failover-ready and assign recovery/remediation owners.
- Check unmitigated high-blast dependencies and assign containment owners.
- Check partially covered critical controls and assign test-gap owners.
- Check blind/partial observability controls and assign coverage owners.

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
| 3+ leading indicators move to Warning/Critical in one week | Trigger preventive cross-functional risk review |
| Prevention success rate falls below threshold | Redesign preventive play patterns and owners |
| Missed alert rate exceeds tolerance | Trigger threshold recalibration review with immediate owner assignment |
| Decision quality composite declines 3 cycles | Trigger decision-quality remediation escalation |
| Alert fatigue status remains Fatigued for 2 weeks | Trigger alert-routing/threshold redesign intervention |
| D1 control dependency remains Broken beyond 1 business day | Block dependent control outputs and escalate dependency repair |
| Monthly/quarterly review missed | Trigger immediate cadence-recovery session and owner reset |
| Control adoption rate drops below threshold | Trigger adoption remediation or control redesign review |
| Critical control effectiveness score falls below threshold | Trigger immediate portfolio intervention decision |
| Contradictory critical signal pair unresolved >10 business days | Escalate cross-signal diagnostic review |
| Exception recurrence rises across same policy/control | Trigger policy-exception correction review |
| Critical workflow handoff fails or leaves ownerless window | Trigger immediate handoff recovery protocol |
| Operating health index drops sharply or enters critical band | Trigger cross-domain recovery intervention |
| CC-1 control non-compliant beyond SLA | Trigger immediate high-criticality control intervention |
| P0 packet non-compliant at decision date | Block approval and trigger packet remediation |
| P0 decision reopened more than once | Trigger decision-quality and closure-standard intervention |
| Same root cause dominates high-severity events for 3 cycles | Trigger systemic root-cause intervention plan |
| High/Critical backlog item enters critical-stale band | Trigger immediate backlog-burn escalation |
| H4 recurrence cluster appears or persists | Trigger chronic-recurrence intervention package |
| Control lifecycle stage stalls beyond expected window | Trigger lifecycle-transition remediation review |
| Cross-function coordination remains At Risk for 2 cycles | Trigger owner-pair coordination intervention |
| Conflict-prone control overlap unresolved | Trigger overlap-resolution intervention before next cycle |
| Drifted assumptions exposed to active P0/P1 decisions | Trigger assumption rebase and packet update intervention |
| I1 interventions remain unstarted while lower-priority work continues | Trigger forced intervention reprioritization |
| Forecast shows multi-owner high-risk overload next cycle | Trigger pre-cycle owner reallocation decision |
| Same decision stage bottleneck persists across cycles | Trigger stage-level latency intervention plan |
| Dependency SLA misses cluster across same owner pair | Trigger dependency-SLA recovery escalation |
| Red-band source feeds active P0/P1 decision | Trigger immediate decision gating and source-recovery escalation |
| Material metric formula/threshold drift affects active decisions | Trigger metric-consistency correction and decision note update |
| Control-change saturation reaches overloaded state | Trigger change-freeze/resequence intervention |
| Critical recovery window becomes overdue | Trigger immediate recovery-window escalation |
| Material non-canonical source usage detected | Trigger canonical-source correction intervention |
| P0/P1 decision outcome visibility becomes overdue | Trigger outcome-lag diagnosis and corrective action |
| Critical item evidence linkage missing/stale beyond due date | Trigger immediate evidence-linkage remediation |
| Active P0 decision missing reversal trigger coverage | Trigger immediate decision packet correction and review hold |
| High-impact decision approved without required authority | Trigger immediate authority correction and decision review hold |
| CC-1 control lacks full owner coverage | Trigger immediate ownership coverage correction |
| P0/high-impact item closed without required done criteria | Reopen item and trigger immediate done-compliance correction |
| CC-1 control lacks current validated runbook | Trigger immediate runbook remediation and temporary risk containment |
| CC-1 drill repeats critical-step failures | Trigger drill recovery intervention and corrective-action escalation |
| CC-1 control is not failover-ready | Trigger immediate failover-readiness remediation and containment plan |
| High-blast dependency is unmitigated | Trigger dependency containment intervention and escalation |
| CC-1 control is not fully test-covered | Trigger immediate test-coverage recovery plan |
| CC-1 control has observability blind spot | Trigger immediate observability coverage remediation |

---

## Required Inputs by Meeting

| Meeting | Minimum Inputs |
|---|---|
| KPI Standup | KPI dashboard + data quality checklist |
| Decision Review | Questions doc + decisions log + blockers log + decision intake queue + decision outcome reviews |
| Experiment Review | Experiment register + thresholds + outcomes |
| Strategy Sync | Monthly review template + score trend + risk register + meeting effectiveness review + artifact usage telemetry + decision calibration report + governance ROI report + signal lag analysis + control failure modes review + escalation effectiveness review + corrective action tracker + closure integrity audit + leading indicator watchlist + preventive action review + threshold calibration review + decision quality regression review + alert fatigue review + control dependency map + review cadence compliance + control adoption compliance + control effectiveness scorecard + signal correlation review + policy exception review + handoff reliability review + operating health index + control criticality map + decision packet compliance + decision reopen analysis + root cause pattern review + backlog aging review + recurrence heatmap + control lifecycle analysis + cross-function coordination review + control overlap analysis + assumption drift review + intervention prioritization matrix + owner capacity forecast + decision latency decomposition + dependency-resolution SLA review + data-source reliability review + metric-definition consistency review + control-change saturation review + recovery-window compliance + canonical-source compliance review + decision outcome lag review + evidence-linkage compliance + reversal-trigger coverage review + decision-authority compliance + control-owner coverage review + definition-of-done compliance + control-runbook coverage review + control-drill effectiveness review + control-failover readiness review + dependency-blast-radius review + control-test coverage review + control-observability coverage review |
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

