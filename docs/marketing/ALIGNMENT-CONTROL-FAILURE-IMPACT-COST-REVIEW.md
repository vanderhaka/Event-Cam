# Alignment Control Failure Impact Cost Review

Use this artifact to quantify the real business cost when controls fail or degrade.

Without cost visibility, teams under-prioritize high-impact control failures and over-focus on low-cost noise.

---

## Purpose

This review ensures:
- control failures are translated into measurable impact cost,
- cost-weighted prioritization guides remediation sequencing,
- recurring high-cost failure classes trigger structural fixes.

---

## Scope

Run this review for:
- all CC-1 control failures and near-misses,
- CC-2 failures affecting active P0/P1 decisions,
- failures that caused rework, delay, or revenue/trust impact.

---

## Cost Metrics

| Metric | Definition | Target |
|---|---|---:|
| Failure Cost Coverage Rate | % in-scope failures with estimated impact cost | 100% |
| High-Cost Failure Count | Failures above defined high-cost threshold | declining trend |
| Cost-of-Failure Concentration | % total failure cost attributable to top 3 failure classes | declining trend |
| Cost-Weighted Closure Rate | % high-cost failures with closed remediation by due date | ≥ 95% |
| Repeat High-Cost Failure Count | Repeated high-cost failures in same control class | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Contained | Failure cost assessed and remediation reducing exposure |
| Watch | Moderate cost exposure with active mitigation |
| High Impact | Material cost exposure requiring priority intervention |
| Recovering | Cost-reduction remediation underway with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Failure/Event ID | Estimated Impact Cost | Cost Tier | Repeat Class (Y/N) | Status | Cost Owner | Remediation Due |
|---|---|---|---:|---|---|---|---|---|
| CFC-001 |  |  |  |  |  |  |  |  |
| CFC-002 |  |  |  |  |  |  |  |  |
| CFC-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing failure-impact cost review:
- [ ] all in-scope failures include cost estimation logic,
- [ ] cost tiers are applied consistently,
- [ ] high-impact failures have priority remediation owners/due dates,
- [ ] repeat high-cost classes are root-caused,
- [ ] post-remediation cost trend is tracked.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 failure enters High Impact status,
- high-cost failure count increases for 2 cycles,
- repeat high-cost failure count >0 in any cycle,
- cost-weighted closure rate drops below target.

Escalation output must include:
- high-cost failure list and exposure summary,
- cost-reduction action package with accountable owners,
- dated checkpoint confirming downward cost trend.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-FAILURE-MODES.md`
- `ALIGNMENT-ROOT-CAUSE-PATTERN-REVIEW.md`
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-GOVERNANCE-COST-BUDGET.md`
- `ALIGNMENT-COMMAND-CENTER.md`
