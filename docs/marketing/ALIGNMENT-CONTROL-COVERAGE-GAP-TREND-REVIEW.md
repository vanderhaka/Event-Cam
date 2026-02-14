# Alignment Control Coverage Gap Trend Review

Use this artifact to track recurring coverage gaps across critical controls over time.

Single-cycle fixes can look successful while the same gaps reappear in later cycles.

---

## Purpose

This review ensures:
- control coverage gaps are trended, not treated as isolated events,
- recurring gap clusters are prioritized for structural fixes,
- coverage reliability improves cycle-over-cycle.

---

## Scope

Run this review for:
- all CC-1 controls,
- CC-2 controls with repeated compliance or adoption misses,
- controls with recurring gaps across ownership, evidence, or validation dimensions.

---

## Trend Metrics

| Metric | Definition | Target |
|---|---|---:|
| Coverage Gap Recurrence Rate | % controls with the same gap category in consecutive cycles | declining trend |
| New Gap Emergence Count | New coverage gap types introduced this cycle | minimal trend |
| Unresolved Gap Aging Count | Gap items exceeding target closure age | 0 |
| Structural Fix Conversion Rate | % recurring gaps converted into structural remediation plans | ≥ 95% |
| Repeat Post-Fix Gap Count | Gaps that reappear after marked remediation closure | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Stable | No recurring coverage gaps observed |
| Watch | Isolated recurrence pattern emerging |
| At Risk | Multiple recurring gaps or aged unresolved clusters |
| Recovering | Structural remediation in progress with owner and due date |

---

## Canonical Trend Table

| Review ID | Control Artifact | Gap Category | Consecutive Cycles Repeated | Oldest Open Age (days) | Structural Fix Planned (Y/N) | Status | Fix Owner | Fix Due |
|---|---|---|---:|---:|---|---|---|---|
| CGT-001 |  |  |  |  |  |  |  |  |
| CGT-002 |  |  |  |  |  |  |  |  |
| CGT-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing coverage-gap trend review:
- [ ] recurring gaps are classified by category and control domain,
- [ ] recurrence and age metrics are current,
- [ ] at-risk clusters have structural-fix owners and due dates,
- [ ] post-fix reappearance checks are recorded,
- [ ] escalation decisions are linked for persistent clusters.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control shows recurring gap for 2+ cycles,
- unresolved gap aging count >0 for two consecutive cycles,
- repeat post-fix gap count >0 in any cycle,
- structural fix conversion rate falls below target for 2 cycles.

Escalation output must include:
- recurring-gap cluster summary and exposure,
- structural remediation package with accountable owners,
- dated checkpoint proving recurrence reduction.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-ADOPTION-COMPLIANCE.md`
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-BACKLOG-AGING-REVIEW.md`
- `ALIGNMENT-ROOT-CAUSE-PATTERN-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
