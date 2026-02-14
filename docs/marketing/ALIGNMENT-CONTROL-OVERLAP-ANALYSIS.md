# Alignment Control Overlap Analysis

Use this artifact to identify overlapping controls that produce duplicate work, conflicting guidance, or unnecessary governance cost.

Control sprawl often appears as near-duplicate controls with slightly different wording and redundant review loops.

---

## Purpose

This analysis ensures:
- overlapping controls are identified explicitly,
- duplicate effort is reduced through merge/clarify decisions,
- control boundaries remain clear for owners and operators.

---

## Scope

Evaluate overlap across:
- active controls in the current artifact set,
- newly introduced controls during verification windows,
- controls linked to same failure modes or metrics.

---

## Overlap Metrics

| Metric | Definition | Target |
|---|---|---:|
| Overlap Pair Count | Number of active control pairs with substantial functional overlap | declining trend |
| Duplicate Effort Hours | Estimated weekly hours spent on overlapping control tasks | declining trend |
| Conflict-Prone Overlap Count | Overlap pairs with contradictory actions or thresholds | 0 |
| Merge Resolution Rate | % identified overlap pairs resolved within one cycle | ≥ 80% |
| Post-Merge Stability Rate | % merged controls with stable risk outcomes after 4 weeks | ≥ 85% |

---

## Overlap Types

| Type | Description | Example |
|---|---|---|
| Functional Duplicate | Two controls enforce same behavior with little differentiation | Two reviews both track stale evidence risk |
| Partial Overlap | Controls share one section but differ elsewhere | One control duplicates escalation section of another |
| Contradictory Overlap | Controls prescribe conflicting responses for same trigger | One says defer, another says block immediately |
| Reporting Overlap | Separate artifacts collect near-identical status tables | Multiple weekly logs for same action stream |

---

## Canonical Overlap Table

| Overlap ID | Control A | Control B | Overlap Type | Impact (Low/Med/High) | Current Risk | Recommended Action (Clarify/Merge/Keep Separate) | Owner | Due Date |
|---|---|---|---|---|---|---|---|---|
| COA-001 |  |  |  |  |  |  |  |  |
| COA-002 |  |  |  |  |  |  |  |  |
| COA-003 |  |  |  |  |  |  |  |  |

---

## Analysis Quality Gate

Before finalizing overlap decisions:
- [ ] overlap evidence is documented for each pair,
- [ ] owner impact and effort impact are assessed,
- [ ] conflict risk is evaluated where actions differ,
- [ ] merge/clarify actions include timeline and owner,
- [ ] post-change verification checkpoint is scheduled.

If any item is unchecked, overlap decision remains provisional.

---

## Decision Rules

- **Clarify** when overlap is minor and boundaries can be tightened quickly.
- **Merge** when overlap is high and both controls can be consolidated without risk loss.
- **Keep Separate** only when controls address distinct risk layers with clear non-overlapping roles.

---

## Escalation Triggers

Escalate when:
- conflict-prone overlap count >0 in active controls,
- overlap pair remains unresolved for 2 cycles,
- duplicate effort increases while governance ROI declines,
- proposed merge affects CC-1 controls without full verification plan.

Escalation output must include:
- overlap-resolution decision and rationale,
- owner and due date for implementation,
- post-change stability metrics for next cycle.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-PORTFOLIO-REVIEW.md`
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-CONTROL-PRECEDENCE-RULES.md`
- `ALIGNMENT-GOVERNANCE-COST-BUDGET.md`
- `ALIGNMENT-COMMAND-CENTER.md`
