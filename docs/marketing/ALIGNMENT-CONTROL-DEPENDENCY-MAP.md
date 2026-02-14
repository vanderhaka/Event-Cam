# Alignment Control Dependency Map

Use this artifact to track prerequisite relationships between active controls so teams avoid activating controls out of sequence.

Control mis-ordering creates false compliance where downstream controls run without required upstream inputs.

---

## Purpose

This map ensures:
- control activation follows dependency order,
- missing prerequisite controls are visible immediately,
- rollout plans include sequence-safe adoption windows.

---

## Dependency Types

| Type | Description | Example |
|---|---|---|
| Data Dependency | Control requires validated data from another control | Outcome review depends on metric definitions + data contract |
| Process Dependency | Control depends on workflow discipline from another control | Reversal protocol depends on decisions log + traceability |
| Governance Dependency | Control requires policy/authority gate before use | Control sunset depends on portfolio review + usage telemetry |
| Timing Dependency | Control must run on a specific cadence before downstream control | Calibration report depends on completed outcome reviews |

---

## Dependency Risk Levels

| Level | Definition | Action |
|---|---|---|
| D1 (Critical) | Downstream control is invalid without upstream control | Block downstream execution until resolved |
| D2 (High) | Downstream control quality materially degraded | Run with caution and forced remediation date |
| D3 (Moderate) | Partial impact to quality/reporting | Track and resolve in normal cycle |

---

## Canonical Dependency Map Table

| Dependency ID | Downstream Control | Upstream Prerequisite | Dependency Type | Risk Level | Current Status (Satisfied/At Risk/Broken) | Owner | Target Fix Date |
|---|---|---|---|---|---|---|---|
| CDM-001 |  |  |  |  |  |  |  |
| CDM-002 |  |  |  |  |  |  |  |
| CDM-003 |  |  |  |  |  |  |  |

---

## Minimum Required Dependency Checks

Before activating a new control:
- [ ] all D1 prerequisites are already active and healthy,
- [ ] required cadence inputs are available,
- [ ] owner/accountability chain is explicit,
- [ ] fallback path is defined if upstream control fails.

If any item is unchecked, activation should be delayed.

---

## Dependency Break Protocol

When dependency status is Broken:
1. mark downstream outputs provisional,
2. assign upstream recovery owner same day,
3. set forced revalidation date for downstream control outputs,
4. escalate if D1 remains broken beyond one business day.

---

## Escalation Triggers

Escalate when:
- any D1 dependency remains Broken beyond one business day,
- same dependency breaks 2+ times in one month,
- 3+ dependencies are At Risk in same weekly cycle,
- dependency break invalidates a P0/P1 decision packet.

Escalation output must include:
- dependency repair owner + due date,
- downstream control impact statement,
- activation-sequence correction action.

---

## Integration Points

Use with:
- `ALIGNMENT-ACTIVE-ARTIFACT-SET.md`
- `ALIGNMENT-CANONICAL-SOURCE-MAP.md`
- `ALIGNMENT-CONTROL-CHANGE-PROTOCOL.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-ADOPTION-ROADMAP.md`
