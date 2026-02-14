# Alignment Control Outcome Attribution Review

Use this artifact to verify that observed execution improvements can be credibly attributed to specific controls.

Without attribution, teams overestimate ineffective controls and underinvest in the controls that actually reduce risk.

---

## Purpose

This review ensures:
- control impact claims are evidence-backed and not correlation-only,
- low-attribution controls are redesigned before they consume more operating budget,
- investment is reallocated toward controls with verified outcome contribution.

---

## Scope

Run this review for:
- all CC-1 controls,
- CC-2 controls with high operating cost or high visibility claims,
- controls cited in executive packets as primary drivers of improvement.

---

## Attribution Metrics

| Metric | Definition | Target |
|---|---|---:|
| Attribution Coverage Rate | % in-scope controls with documented outcome-attribution assessment | 100% |
| Low-Attribution Control Count | Controls without credible causal linkage to claimed outcomes | 0 |
| Verified Contribution Rate | % controls with evidence-supported contribution to target outcomes | ≥ 95% |
| Attribution Correction On-Time Rate | % attribution-gap corrections closed by due date | ≥ 95% |
| Repeat Attribution Gap Count | Controls failing attribution quality in consecutive cycles | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Attributed | Outcome claims are supported by credible causal evidence |
| Watch | Evidence is partial or confounded by competing factors |
| Unattributed | Claims are not causally supported |
| Recovering | Attribution-improvement actions active with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Claimed Outcome | Attribution Evidence Strength | Confounders Assessed (Y/N) | Status | Attribution Owner | Correction Due |
|---|---|---|---|---|---|---|---|
| COA-001 |  |  |  |  |  |  |  |
| COA-002 |  |  |  |  |  |  |  |
| COA-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing outcome-attribution review:
- [ ] all in-scope controls have explicit claimed outcomes,
- [ ] attribution evidence and confounder checks are documented,
- [ ] unattributed claims have correction owners and due dates,
- [ ] attribution method updates are reflected in metric definitions,
- [ ] post-correction verification confirms stronger attribution quality.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control remains Unattributed for two cycles,
- low-attribution control count >0 for two cycles,
- verified contribution rate drops below target,
- repeat attribution gap count >0 in any cycle.

Escalation output must include:
- unattributed claim list with decision-impact summary,
- attribution-hardening package with accountable owners,
- dated checkpoint proving restored attribution quality.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-GOVERNANCE-ROI-REPORT.md`
- `ALIGNMENT-CONTROL-DECISION-USEFULNESS-REVIEW.md`
- `ALIGNMENT-METRIC-DEFINITION-CONSISTENCY-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
