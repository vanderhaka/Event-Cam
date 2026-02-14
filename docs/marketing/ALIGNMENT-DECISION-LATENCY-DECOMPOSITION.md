# Alignment Decision Latency Decomposition

Use this artifact to break total decision cycle time into stage-level latency so bottlenecks can be fixed precisely.

Aggregate SLA misses hide where time is actually being lost.

---

## Purpose

This decomposition ensures:
- decision delay is diagnosed by stage, not only by total cycle length,
- bottleneck owners are explicit,
- latency reduction actions target the highest-delay stages first.

---

## Scope

Apply to:
- P0 and P1 decision flows,
- high-impact cross-functional decisions,
- decisions repeatedly nearing or missing SLA.

---

## Latency Stages

| Stage | Start → End |
|---|---|
| Intake Latency | Request logged → triage complete |
| Preparation Latency | Triage complete → packet ready |
| Scheduling Latency | Packet ready → decision meeting held |
| Resolution Latency | Meeting held → decision closed |
| Sync Latency | Decision closed → downstream artifact sync complete |

---

## Latency Metrics

| Metric | Definition | Target |
|---|---|---:|
| Median Total Cycle Time | Median end-to-end decision time | within SLA by priority |
| Longest Stage Share | % of total cycle spent in slowest stage | declining trend |
| Stage Breach Count | Number of stage-level latency breaches per cycle | declining trend |
| Bottleneck Recurrence Rate | % cycles where same stage is dominant bottleneck | declining trend |
| Post-Fix Latency Improvement | % latency reduction after targeted intervention | improving trend |

---

## Canonical Decomposition Table

| Decision ID | Priority | Intake (hrs) | Prep (hrs) | Scheduling (hrs) | Resolution (hrs) | Sync (hrs) | Total (hrs) | Dominant Bottleneck Stage | Owner |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| DLD-001 |  |  |  |  |  |  |  |  |  |
| DLD-002 |  |  |  |  |  |  |  |  |  |
| DLD-003 |  |  |  |  |  |  |  |  |  |

---

## Quality Gate

Before publishing decomposition review:
- [ ] timestamps are complete and source-valid,
- [ ] stage boundaries are consistently applied,
- [ ] dominant bottleneck owner is assigned,
- [ ] intervention is mapped to bottleneck stage,
- [ ] post-fix checkpoint date is scheduled.

If any item is unchecked, decomposition is incomplete.

---

## Escalation Triggers

Escalate when:
- same stage is dominant bottleneck for 3 consecutive cycles,
- P0 decision exceeds SLA due to unresolved stage bottleneck,
- stage breach count rises for 2 consecutive cycles,
- sync latency repeatedly delays downstream execution.

Escalation output must include:
- bottleneck stage summary,
- owner + corrective action plan,
- expected stage-level latency reduction target.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-SLA.md`
- `ALIGNMENT-DECISION-INTAKE-QUEUE.md`
- `ALIGNMENT-DECISION-PACKET-COMPLIANCE.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
