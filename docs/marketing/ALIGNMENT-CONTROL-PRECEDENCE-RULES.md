# Alignment Control Precedence Rules

Use this artifact to resolve conflicts when multiple controls prescribe different actions for the same situation.

Without explicit precedence, teams stall, apply controls inconsistently, and create contradictory governance behavior.

---

## Purpose

This rule set defines:
- which controls take priority during conflicts,
- how to document exceptions,
- how to avoid repeated ambiguity.

---

## Core Precedence Order

When controls conflict, apply in this order:

1. **Safety/Critical Integrity Controls**  
   (incident severity, data integrity, legal/compliance constraints)

2. **Path Integrity Controls**  
   (canonical source, contradiction resolution, decision authority)

3. **Decision Quality Controls**  
   (evidence standards, confidence index, premortem, calibration)

4. **Execution Throughput Controls**  
   (SLA, WIP limits, intake queue, dependency handling)

5. **Efficiency/Optimization Controls**  
   (cost budget, usage telemetry, sunset/portfolio optimization)

If a lower-level control conflicts with a higher-level one, higher-level control wins.

---

## Tie-Break Rules (Same Level)

If two controls at same precedence level conflict:
1. choose the stricter risk-protective action,
2. if equal strictness, choose the action with clearer owner accountability,
3. if still tied, escalate to decision owner in same-week review.

---

## Conflict Logging Requirement

Every precedence conflict must be logged with:
- control pair in conflict,
- chosen action and rationale,
- owner approving conflict resolution,
- follow-up action to reduce recurring ambiguity.

Use ID format: `PCR-###`.

---

## Canonical Conflict Log

| Conflict ID | Date | Control A | Control B | Precedence Winner | Decision Owner | Rationale | Follow-up Due |
|---|---|---|---|---|---|---|---|
| PCR-001 |  |  |  |  |  |  |  |
| PCR-002 |  |  |  |  |  |  |  |
| PCR-003 |  |  |  |  |  |  |  |

---

## Escalation Triggers

Escalate when:
- same control conflict repeats 2+ times in a month,
- teams bypass precedence order without override log,
- unresolved precedence conflict blocks a P0 decision.

Escalation output must include:
- immediate ruling,
- control wording update owner,
- due date for preventing recurrence.

---

## Integration Points

Use with:
- `ALIGNMENT-CANONICAL-SOURCE-MAP.md`
- `ALIGNMENT-CONTROL-COVERAGE-MATRIX.md`
- `ALIGNMENT-OVERRIDE-REGISTER.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-GOVERNANCE-CHARTER.md`
