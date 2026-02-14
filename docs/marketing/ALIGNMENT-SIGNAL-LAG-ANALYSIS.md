# Alignment Signal Lag Analysis

Use this artifact to measure how quickly the team responds after critical alignment signals change state.

Slow response converts early warnings into preventable incidents and decision reversals.

---

## Purpose

This analysis tracks:
- time from signal change to acknowledged ownership,
- time from acknowledgment to action,
- time from action to stabilization.

---

## Scope

Track lag for signal categories:
- KPI threshold breaches,
- contradiction severity escalations,
- SLA misses,
- incident severity upgrades,
- governance cost/ROI alert triggers.

---

## Lag Stages

| Stage | Definition |
|---|---|
| Detection Lag | Signal crossed threshold → signal logged |
| Assignment Lag | Signal logged → owner assigned |
| Action Lag | Owner assigned → first corrective action executed |
| Stabilization Lag | First action → signal returns to acceptable band |

---

## Target Lag Thresholds

| Signal Severity | Detection | Assignment | Action | Stabilization |
|---|---:|---:|---:|---:|
| Critical | ≤2h | ≤2h | ≤8h | ≤48h |
| High | ≤8h | ≤8h | ≤24h | ≤5 days |
| Medium | ≤1 day | ≤1 day | ≤3 days | ≤10 days |

---

## Canonical Lag Table

| Lag ID | Signal Type | Severity | Threshold Breach Time | Logged Time | Owner Assigned Time | First Action Time | Stabilized Time | Total Lag (hrs) | Status |
|---|---|---|---|---|---|---|---|---:|---|
| LAG-001 |  |  |  |  |  |  |  |  |  |
| LAG-002 |  |  |  |  |  |  |  |  |  |
| LAG-003 |  |  |  |  |  |  |  |  |  |

---

## Lag Interpretation Rules

- Frequent high Detection Lag → monitoring/alerting weakness.
- Frequent high Assignment Lag → ownership routing weakness.
- Frequent high Action Lag → execution capacity or priority weakness.
- Frequent high Stabilization Lag → root cause quality weakness.

---

## Escalation Triggers

Escalate when:
- Critical signal lag exceeds threshold in any stage,
- same stage exceeds threshold 3+ times in one month,
- lag trend worsens month-over-month for two consecutive months.

Escalation output must include:
- stage-specific root cause hypothesis,
- owner + due date for correction,
- expected lag reduction target for next cycle.

---

## Integration Points

Use with:
- `ALIGNMENT-SIGNAL-PLAYBOOK.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-METRIC-ANOMALY-PROTOCOL.md`
- `ALIGNMENT-ONCALL-ESCALATION-MATRIX.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
