# Alignment Control Lead-Time Predictability Review

Use this artifact to verify that critical control workflows close within predictable lead-time bands.

When control lead times are volatile, planning confidence drops and high-impact decisions miss timing windows.

---

## Purpose

This review ensures:
- control completion timing is predictable enough for reliable planning,
- lead-time volatility is detected before it compounds into commitment slippage,
- corrective actions focus on stabilizing cycle-time performance, not just average speed.

---

## Scope

Run this review for:
- all CC-1 controls,
- CC-2 controls supporting active P0/P1 decisions,
- controls with recurring SLA breaches or reopening patterns.

---

## Predictability Metrics

| Metric | Definition | Target |
|---|---|---:|
| Predictability Coverage Rate | % in-scope controls with measured lead-time distribution | 100% |
| Out-of-Band Lead-Time Count | Control cycles outside approved predictability band | 0 |
| Lead-Time Variability Index | Coefficient of variation for control cycle time | declining trend |
| On-Time Stabilization Rate | % volatility-reduction actions closed by due date | ≥ 95% |
| Repeat Volatility Pattern Count | Controls breaching predictability band in consecutive cycles | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Predictable | Lead time is within approved band and stable |
| Watch | Lead-time variance increasing or near band limit |
| Volatile | Lead-time spread exceeds approved predictability band |
| Recovering | Stabilization actions active with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Median Lead Time (hrs) | Variability Index | Predictability Band | Status | Predictability Owner | Stabilization Due |
|---|---|---:|---:|---|---|---|---|
| CLP-001 |  |  |  |  |  |  |  |
| CLP-002 |  |  |  |  |  |  |  |
| CLP-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing lead-time predictability review:
- [ ] all in-scope controls have current lead-time distribution data,
- [ ] predictability bands are documented by control criticality,
- [ ] volatile controls have owners and stabilization plans,
- [ ] repeat volatility patterns are root-caused,
- [ ] post-correction run verifies improved predictability.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control remains Volatile for two cycles,
- out-of-band lead-time count >0 for two cycles,
- lead-time variability index worsens for two cycles,
- on-time stabilization rate drops below target.

Escalation output must include:
- volatile control list with delivery-impact summary,
- stabilization package with accountable owners and due dates,
- dated checkpoint proving restored predictability.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-SLA.md`
- `ALIGNMENT-COMMITMENT-SLIPPAGE-PROTOCOL.md`
- `ALIGNMENT-DECISION-LATENCY-DECOMPOSITION.md`
- `ALIGNMENT-CONTROL-EXECUTION-FRICTION-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
