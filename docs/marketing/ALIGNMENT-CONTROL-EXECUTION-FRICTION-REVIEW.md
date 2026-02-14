# Alignment Control Execution Friction Review

Use this artifact to detect where controls are creating avoidable execution friction that delays critical work.

Without friction visibility, teams normalize process delays and attribute misses to “capacity” instead of removable control bottlenecks.

---

## Purpose

This review ensures:
- control-induced delays are measured and surfaced early,
- friction hotspots are reduced without weakening risk safeguards,
- escalation focuses on bottlenecks that degrade delivery speed.

---

## Scope

Run this review for:
- all CC-1 controls,
- CC-2 controls attached to P0/P1 decision pathways,
- workflows with repeat SLA breaches or handoff delays.

---

## Friction Metrics

| Metric | Definition | Target |
|---|---|---:|
| Friction Assessment Coverage Rate | % in-scope controls with current friction assessment | 100% |
| High-Friction Control Count | Controls exceeding friction threshold | 0 |
| Median Friction Delay (hrs) | Median delay introduced by control steps | declining trend |
| Friction Remediation On-Time Rate | % friction-reduction actions closed by due date | ≥ 95% |
| Repeat Friction Breach Count | Controls breaching friction threshold in consecutive cycles | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Smooth | Control flow delay within accepted threshold |
| Watch | Delay near threshold or rising trend |
| Friction-High | Delay exceeds threshold and impacts critical flow |
| Recovering | Friction-reduction actions active with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Median Delay (hrs) | Friction Threshold (hrs) | Status | Friction Owner | Remediation Due | Notes |
|---|---|---:|---:|---|---|---|---|
| CFR-001 |  |  |  |  |  |  |  |
| CFR-002 |  |  |  |  |  |  |  |
| CFR-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing execution-friction review:
- [ ] all in-scope controls have measured delay baselines,
- [ ] friction thresholds are documented by control criticality,
- [ ] high-friction controls have owners and remediation due dates,
- [ ] repeat friction breaches are root-caused for structural fixes,
- [ ] post-remediation delay verification is recorded.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control remains Friction-High for two cycles,
- median friction delay increases for two cycles,
- friction remediation on-time rate drops below target,
- repeat friction breach count >0 in any cycle.

Escalation output must include:
- high-friction control list with delay impact summary,
- remediation package with owner and due date,
- dated checkpoint proving delay reduction.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-LATENCY-DECOMPOSITION.md`
- `ALIGNMENT-CROSS-FUNCTION-COORDINATION-REVIEW.md`
- `ALIGNMENT-COMMITMENT-SLIPPAGE-PROTOCOL.md`
- `ALIGNMENT-CONTROL-EFFICIENCY-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
