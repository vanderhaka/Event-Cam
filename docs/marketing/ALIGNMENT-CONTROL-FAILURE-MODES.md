# Alignment Control Failure Modes

Use this artifact to catalog how active governance controls can fail, be bypassed, or degrade under pressure.

Controls do not fail only when missing; they also fail when followed superficially, applied late, or run with stale assumptions.

---

## Purpose

This artifact helps teams:
- detect recurring control breakdown patterns early,
- apply containment before failures cascade into incidents,
- improve control design using real-world failure evidence.

---

## Failure Mode Classes

| Class | Description | Typical Example |
|---|---|---|
| Design Failure | Control logic is incomplete or mis-specified | Threshold misses key edge case |
| Adoption Failure | Teams do not consistently execute control steps | Required weekly check skipped repeatedly |
| Timing Failure | Control is applied too late to prevent impact | Escalation happens after SLA breach |
| Data Failure | Control input data is stale, missing, or unreliable | Decision quality control run on expired evidence |
| Ownership Failure | Accountability is unclear or overloaded | No owner for corrective action after alert |
| Conflict Failure | Competing controls produce contradictory actions | Throughput rule conflicts with safety rule |

---

## Failure Severity Rubric

| Severity | Definition | Response Window |
|---|---|---:|
| F1 (Critical) | Active failure materially threatens P0 decisions, KPI integrity, or incident containment | Same business day |
| F2 (High) | Failure creates repeated SLA misses, contradictions, or quality degradation | 24 hours |
| F3 (Moderate) | Failure weakens control reliability but no major impact yet | 3 business days |

---

## Canonical Failure Mode Log

| Failure ID | Date Detected | Control Artifact | Failure Class | Severity | Failure Signal | Immediate Containment | Corrective Owner | Target Fix Date | Status |
|---|---|---|---|---|---|---|---|---|---|
| CFM-001 |  |  |  |  |  |  |  |  |  |
| CFM-002 |  |  |  |  |  |  |  |  |  |
| CFM-003 |  |  |  |  |  |  |  |  |  |

---

## Containment First Rule

When a high-severity control failure is detected:

1. Apply immediate containment to prevent spread.
2. Route to owning control artifact for corrective update.
3. Set explicit verification checkpoint date.
4. Log whether policy wording or execution discipline is the primary root cause.

No F1/F2 failure should remain without containment action by end of response window.

---

## Root Cause Review Prompts

Use these prompts during weekly review:
- Was the control design missing an obvious edge case?
- Did owners have required capacity and authority?
- Was data freshness/reliability sufficient for the control?
- Did another control unintentionally block timely response?
- Was compliance monitored, or only assumed?

---

## Monthly Pattern Review

| Month | New Failures | Reopened Failures | F1/F2 Count | Repeated Same-Class Failures | Controls Updated | Net Risk Trend |
|---|---:|---:|---:|---:|---:|---|
| [YYYY-MM] |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |

If repeated same-class failures rise for 2 consecutive months, trigger control redesign review.

---

## Escalation Triggers

Escalate immediately when:
- any F1 failure lacks containment in same business day,
- same control logs 2+ F1/F2 failures in 30 days,
- unresolved control failure blocks active P0 decision closure,
- failure recurs after a declared “fixed” status.

Escalation output must include:
- root cause class decision,
- control update owner + effective date,
- verification test and rollback condition.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-COVERAGE-MATRIX.md`
- `ALIGNMENT-CONTROL-CHANGE-PROTOCOL.md`
- `ALIGNMENT-CONTROL-PRECEDENCE-RULES.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-INCIDENT-HOTWASH-TEMPLATE.md`
