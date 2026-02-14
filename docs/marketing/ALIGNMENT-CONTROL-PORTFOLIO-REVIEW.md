# Alignment Control Portfolio Review

Use this artifact to review the full set of active controls and confirm they still match current risk, complexity, and operating mode.

Without portfolio-level review, controls accumulate faster than they are validated, creating hidden process drag.

---

## Purpose

This review is designed to:
- validate that each active control has clear value,
- remove control duplication across artifacts,
- adjust control intensity as team maturity and risk profile evolve.

---

## Review Cadence

Run:
- **Quarterly (mandatory)** during quarter reset.
- **Ad hoc** after major mode shifts, repeated incidents, or sustained governance over-budget signals.

---

## Portfolio Review Questions

1. Which controls produced measurable risk reduction this quarter?
2. Which controls were active but underused?
3. Which controls overlap or conflict?
4. Which controls are missing for current risk profile?
5. Is current control load appropriate for active operating mode?

---

## Control Portfolio Table

| Control Artifact | Primary Risk Addressed | Usage Level (High/Med/Low) | Outcome Signal Trend | Cost Level (High/Med/Low) | Portfolio Decision (Keep/Merge/Retire/Expand) | Owner |
|---|---|---|---|---|---|---|
| [Artifact 1] |  |  |  |  |  |  |
| [Artifact 2] |  |  |  |  |  |  |
| [Artifact 3] |  |  |  |  |  |  |

---

## Portfolio Decision Rules

- **Keep** when usage and risk-reduction value are clear.
- **Merge** when controls overlap with similar signals/actions.
- **Retire** when value is low and risk remains stable.
- **Expand** when emerging risks are insufficiently covered.

No Keep/Expand decision is valid without owner confirmation and current evidence.

---

## Required Inputs

Before review, collect latest:
- active artifact set,
- artifact usage telemetry,
- governance cost budget,
- system health metrics,
- control coverage matrix,
- override register.

---

## Review Outputs

At close of review, publish:
1. updated active control portfolio decision table,
2. control change list (keep/merge/retire/expand),
3. owner assignments and due dates,
4. next verification checkpoint date.

---

## Escalation Triggers

Escalate portfolio review when:
- >25% of active controls are low-usage for 2+ cycles,
- governance cost is above budget for 2+ consecutive weeks,
- repeated incidents occur in domains previously marked as low-risk.

Escalation output must include:
- immediate load-reduction or risk-coverage action,
- decision on operating-mode adjustment,
- leadership sign-off on revised portfolio.

---

## Integration Points

Use with:
- `ALIGNMENT-ACTIVE-ARTIFACT-SET.md`
- `ALIGNMENT-ARTIFACT-USAGE-TELEMETRY.md`
- `ALIGNMENT-GOVERNANCE-COST-BUDGET.md`
- `ALIGNMENT-CONTROL-SUNSET-CRITERIA.md`
- `ALIGNMENT-CONTROL-COVERAGE-MATRIX.md`
