# Alignment Control Verification Latency Review

Use this artifact to measure how long it takes to verify that control actions actually worked after execution.

When verification is delayed, ineffective controls remain active too long and risk compounds silently.

---

## Purpose

This review ensures:
- control outcomes are verified quickly after execution,
- verification lag is visible and corrected before it drives false confidence,
- repeated latency bottlenecks trigger structural process fixes.

---

## Scope

Track verification latency for:
- all CC-1 controls,
- CC-2 controls tied to active P0/P1 decisions,
- controls with recent incidents, reversals, or corrective-action workloads.

---

## Latency Metrics

| Metric | Definition | Target |
|---|---|---:|
| On-Time Verification Rate | % in-scope control actions verified within defined latency SLA | ≥ 95% |
| Overdue Verification Count | In-scope actions with verification beyond SLA | 0 |
| Median Verification Lag | Median time from control action completion to outcome verification | improving trend |
| Critical Verification Breach Count | CC-1 actions verified after critical-lag threshold | 0 |
| Repeat Latency Pattern Count | Controls repeatedly breaching verification SLA across cycles | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| On-Time | Verification completed within SLA |
| Watch | Minor lag; no material exposure yet |
| Breached | Verification lag exceeds SLA and increases risk |
| Recovering | Lag-reduction actions underway with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Criticality | Action Completed Date | Verification Date | Lag (days) | Status | Latency Owner | Correction Due |
|---|---|---|---|---|---:|---|---|---|
| CVL-001 |  |  |  |  |  |  |  |  |
| CVL-002 |  |  |  |  |  |  |  |  |
| CVL-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing verification-latency review:
- [ ] all in-scope completed control actions are listed,
- [ ] each action has verification evidence with timestamp,
- [ ] breached items have corrective owners and due dates,
- [ ] repeat latency causes are root-caused,
- [ ] updated SLAs/process fixes are linked for persistent lag patterns.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 action enters Breached status beyond critical threshold,
- overdue verification count >0 for two consecutive cycles,
- on-time verification rate falls below target for 2 cycles,
- repeat latency pattern appears on same control family.

Escalation output must include:
- breached action list and exposure summary,
- lag-reduction intervention plan with accountable owners,
- dated checkpoint for restored on-time verification performance.

---

## Integration Points

Use with:
- `ALIGNMENT-RECOVERY-WINDOW-COMPLIANCE.md`
- `ALIGNMENT-CLOSURE-INTEGRITY-AUDIT.md`
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-DECISION-OUTCOME-LAG-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
