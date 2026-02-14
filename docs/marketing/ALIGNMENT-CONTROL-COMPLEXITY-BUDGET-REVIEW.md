# Alignment Control Complexity Budget Review

Use this artifact to keep control-system complexity within a manageable operating budget.

When control complexity grows unchecked, teams spend increasing effort navigating process instead of reducing risk.

---

## Purpose

This review ensures:
- control complexity is measured and capped by operating stage,
- complexity growth is justified by risk reduction, not habit,
- simplification actions are executed before complexity creates decision drag.

---

## Scope

Run this review for:
- all active CC-1 controls,
- CC-2 controls with multi-step exception paths,
- controls modified in the current quarter.

---

## Complexity Metrics

| Metric | Definition | Target |
|---|---|---:|
| Complexity Assessment Coverage Rate | % in-scope controls with current complexity score | 100% |
| High-Complexity Control Count | Controls above approved complexity threshold | 0 |
| Median Control Complexity Score | Median score across in-scope controls | stable or declining |
| Simplification Action On-Time Rate | % complexity-reduction actions closed by due date | ≥ 95% |
| Repeat Complexity Breach Count | Controls breaching threshold in consecutive cycles | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Within Budget | Complexity score at or below approved threshold |
| Watch | Complexity near threshold or increasing quickly |
| Over Budget | Complexity exceeds threshold and creates operating drag |
| Recovering | Simplification package active with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Complexity Score | Threshold | Status | Simplification Owner | Simplification Due | Notes |
|---|---|---:|---:|---|---|---|---|
| CBR-001 |  |  |  |  |  |  |  |
| CBR-002 |  |  |  |  |  |  |  |
| CBR-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing complexity-budget review:
- [ ] all in-scope controls have current complexity scores,
- [ ] threshold logic is documented by team stage,
- [ ] over-budget controls have simplification actions and owners,
- [ ] repeat breaches are root-caused for structural fixes,
- [ ] post-simplification verification confirms score reduction.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control remains Over Budget for two cycles,
- high-complexity control count increases for two cycles,
- simplification action on-time rate drops below target,
- repeat complexity breach count >0 in any cycle.

Escalation output must include:
- over-budget control list with complexity drivers,
- simplification package with ownership and due dates,
- dated checkpoint proving complexity reduction or safe deactivation.

---

## Integration Points

Use with:
- `ALIGNMENT-GOVERNANCE-COST-BUDGET.md`
- `ALIGNMENT-CONTROL-EFFICIENCY-REVIEW.md`
- `ALIGNMENT-CONTROL-PORTFOLIO-REVIEW.md`
- `ALIGNMENT-CONTROL-OVERLAP-ANALYSIS.md`
- `ALIGNMENT-COMMAND-CENTER.md`
