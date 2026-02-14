# Alignment Owner Capacity Forecast

Use this artifact to forecast owner capacity against expected decision/governance workload in upcoming cycles.

Reactive load management catches overload after quality and SLA damage has already started.

---

## Purpose

This forecast ensures:
- upcoming owner overload is visible before assignments are finalized,
- critical work is matched to realistic capacity,
- preventive reallocation decisions are made early.

---

## Scope

Forecast capacity for:
- decision owners (P0/P1 queue),
- control/governance owners,
- data/analytics owners supporting evidence and review cycles,
- escalation/on-call roles.

---

## Forecast Metrics

| Metric | Definition | Target |
|---|---|---:|
| Forecasted Critical Load | Count of projected critical items per owner next cycle | within threshold by role |
| Capacity Utilization Forecast | Forecasted governance/decision workload as % available capacity | ≤ agreed band |
| Overload Risk Count | Owners projected above high-risk threshold | 0 or declining |
| Reallocation Lead Time | Time from overload forecast to reassignment decision | ≤ 3 business days |
| Forecast Accuracy | % owners whose actual load stays within forecast band | improving trend |

---

## Risk Bands

| Band | Forecasted Critical Load | Action |
|---|---:|---|
| Low | 0–3 | no intervention |
| Watch | 4–6 | pre-plan delegation |
| High | 7+ | reassign before cycle starts |

---

## Canonical Forecast Table

| Forecast Cycle | Owner | Planned Decision Load | Planned Execution/Blocker Load | Planned Governance Load | Forecasted Critical Total | Risk Band | Pre-Cycle Action |
|---|---|---:|---:|---:|---:|---|---|
| [YYYY-WW] |  |  |  |  |  |  |  |
| [YYYY-WW] |  |  |  |  |  |  |  |
| [YYYY-WW] |  |  |  |  |  |  |  |

---

## Forecast Quality Gate

Before approving next cycle:
- [ ] projected P0/P1 decision queue is included,
- [ ] escalation/on-call obligations are included,
- [ ] major dependencies/incident carryover is included,
- [ ] backup owners are assigned for high-risk owners,
- [ ] reallocation actions are logged for High-band forecasts.

If any item is unchecked, forecast is incomplete.

---

## Escalation Triggers

Escalate when:
- 2+ owners forecast in High band for next cycle,
- same owner is forecast High in consecutive cycles,
- high-risk forecast overlaps with critical review or decision windows,
- no reallocation plan exists before cycle start.

Escalation output must include:
- owner-load rebalancing decision,
- deferred/non-critical work freeze decision,
- updated owner assignments and check-in date.

---

## Integration Points

Use with:
- `ALIGNMENT-OWNER-LOAD-MANAGEMENT.md`
- `ALIGNMENT-DECISION-WIP-LIMITS.md`
- `ALIGNMENT-INTERVENTION-PRIORITIZATION-MATRIX.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
