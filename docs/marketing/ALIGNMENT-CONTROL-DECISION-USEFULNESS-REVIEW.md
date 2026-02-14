# Alignment Control Decision Usefulness Review

Use this artifact to verify that control outputs are materially improving real decision quality, not just generating reporting activity.

If controls are not influencing decisions, governance overhead grows while strategic outcomes remain unchanged.

---

## Purpose

This review ensures:
- control insights are actually used in high-impact decisions,
- weak decision linkage is detected before control bloat compounds,
- control design is optimized for decision relevance and timing.

---

## Scope

Run this review for:
- all CC-1 controls,
- CC-2 controls feeding active P0/P1 decision streams,
- controls with repeated output generation but low decision reference rates.

---

## Usefulness Metrics

| Metric | Definition | Target |
|---|---|---:|
| Decision-Linkage Coverage Rate | % in-scope control outputs explicitly referenced in qualifying decisions | 100% |
| Low-Usefulness Control Count | Controls below minimum decision-usefulness threshold | 0 |
| Median Signal-to-Decision Integration Lag (hrs) | Time from control output publication to decision usage | declining trend |
| Usefulness Remediation On-Time Rate | % low-usefulness controls with closed remediation by due date | ≥ 95% |
| Repeat Low-Usefulness Pattern Count | Controls below threshold in consecutive cycles | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| High Utility | Control outputs are timely and consistently used in decision packets |
| Watch | Usage is inconsistent, delayed, or partial |
| Low Utility | Outputs rarely influence decisions despite operating cost |
| Recovering | Utility-improvement actions active with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Output Volume | Decision Reference Rate (%) | Median Integration Lag (hrs) | Status | Utility Owner | Remediation Due |
|---|---|---:|---:|---:|---|---|---|
| CUD-001 |  |  |  |  |  |  |  |
| CUD-002 |  |  |  |  |  |  |  |
| CUD-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing decision-usefulness review:
- [ ] all in-scope controls have measured decision linkage,
- [ ] decision references are evidence-linked and auditable,
- [ ] low-utility controls include root cause category,
- [ ] remediation owners and due dates are assigned,
- [ ] post-remediation usage and lag improvements are verified.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control remains Low Utility for two cycles,
- low-usefulness control count >0 for two cycles,
- median integration lag worsens for two cycles,
- usefulness remediation on-time rate drops below target.

Escalation output must include:
- low-utility control list with decision-impact summary,
- redesign or sunset-candidate package with accountable owners,
- dated checkpoint proving restored decision usefulness.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-PACKET-COMPLIANCE.md`
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-CONTROL-EFFICIENCY-REVIEW.md`
- `ALIGNMENT-GOVERNANCE-ROI-REPORT.md`
- `ALIGNMENT-COMMAND-CENTER.md`
