# Alignment Artifact Usage Telemetry

Use this artifact to measure whether active alignment documents are actually used in weekly operations.

Artifact sprawl is dangerous when documents are declared active but rarely referenced in decisions or reviews.

---

## Purpose

This telemetry helps teams:
- detect underused active artifacts,
- retire or merge low-value controls,
- keep governance lightweight and outcome-oriented.

---

## Weekly Telemetry Metrics

| Metric | Definition | Target |
|---|---|---:|
| Active Artifact Utilization Rate | % active artifacts referenced at least once in week | ≥ 80% |
| Unused Active Artifact Count | Active artifacts with zero references in week | ≤ 3 |
| Stale Active Artifact Count | Active artifacts not updated within freshness SLA | 0 |
| Duplicate Function Overlap Count | Number of active artifacts serving same primary purpose | ≤ 2 |
| Artifact-to-Decision Link Rate | % closed decisions linked to at least one relevant active artifact | ≥ 90% |

---

## Reference Counting Rule

Count an artifact as “used” if it appears in at least one of:
- decision review inputs,
- weekly executive packet references,
- command-center checks,
- decision/incident logs linked in that week.

Passive storage or historical mention does not count as usage.

---

## Telemetry Table

| Week | Active Artifacts | Used Artifacts | Utilization % | Unused Active Count | Stale Active Count | Overlap Count | Action Required |
|---|---:|---:|---:|---:|---:|---:|---|
| [YYYY-MM-DD] |  |  |  |  |  |  |  |
| [YYYY-MM-DD] |  |  |  |  |  |  |  |
| [YYYY-MM-DD] |  |  |  |  |  |  |  |

---

## Actions by Signal

- **Utilization ≥ 80% and low stale count:** maintain active set.
- **Utilization 60–79%:** review unused artifacts for merge/freeze candidates.
- **Utilization < 60%:** immediate active-set reduction and mode reassessment.
- **Stale count > 0 for 2 weeks:** escalate owner compliance issue.

---

## Escalation Triggers

Escalate when:
- utilization remains <70% for 2 consecutive weeks,
- unused active artifact count increases 2 weeks in a row,
- overlap count >3 and no pruning action is logged.

Escalation output must include:
- active-set change decision,
- prune/merge plan with owners and dates,
- updated mode rationale if process intensity is too high.

---

## Integration Points

Use with:
- `ALIGNMENT-ACTIVE-ARTIFACT-SET.md`
- `ALIGNMENT-ARTIFACT-PRUNING-POLICY.md`
- `ALIGNMENT-DOC-QUALITY-SCORECARD.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-SYSTEM-HEALTH-METRICS.md`
