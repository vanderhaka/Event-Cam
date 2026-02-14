# Alignment Control Exception Lead-Time Review

Use this artifact to measure how quickly control exceptions are resolved once identified.

Slow exception resolution extends exposure windows and normalizes policy bypass behavior.

---

## Purpose

This review ensures:
- control exceptions are addressed within risk-aligned lead-time targets,
- prolonged exceptions are visible before they become structural failures,
- recurring lead-time breaches trigger process and ownership correction.

---

## Scope

Run this review for:
- all exceptions affecting CC-1 controls,
- CC-2 exceptions linked to active P0/P1 decisions,
- exceptions involving overrides, canonical-source conflicts, or policy drift.

---

## Lead-Time Metrics

| Metric | Definition | Target |
|---|---|---:|
| On-Time Exception Closure Rate | % in-scope exceptions closed within SLA | ≥ 95% |
| Overdue Exception Count | In-scope exceptions beyond committed closure window | 0 |
| Median Exception Resolution Time | Time from exception open to verified closure | improving trend |
| Critical Exception Breach Count | CC-1-linked exceptions unresolved beyond critical threshold | 0 |
| Repeat Lead-Time Breach Count | Exception classes repeatedly breaching SLA across cycles | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| On-Time | Exception resolved within target lead time |
| Watch | Minor delay without material exposure yet |
| Breached | Resolution lag exceeds SLA and increases risk |
| Recovering | Exception lead-time remediation underway |

---

## Canonical Review Table

| Review ID | Exception ID | Control Domain | Open Date | Close Date | Resolution Lag (days) | Status | Resolution Owner | Correction Due |
|---|---|---|---|---|---:|---|---|---|
| CEL-001 |  |  |  |  |  |  |  |  |
| CEL-002 |  |  |  |  |  |  |  |  |
| CEL-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing exception lead-time review:
- [ ] all in-scope exceptions are listed with open/close timestamps,
- [ ] SLA category is explicit for each exception,
- [ ] breached exceptions include exposure impact notes,
- [ ] correction owners and due dates are assigned for breached patterns,
- [ ] verified closure evidence is linked for all closed exceptions.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any critical exception remains Breached,
- overdue exception count >0 for two consecutive cycles,
- on-time closure rate drops below target for 2 cycles,
- same exception class shows repeat lead-time breaches.

Escalation output must include:
- breached exception list and exposure summary,
- lead-time remediation package with accountable owners,
- dated checkpoint showing restored closure timing performance.

---

## Integration Points

Use with:
- `ALIGNMENT-POLICY-EXCEPTION-REVIEW.md`
- `ALIGNMENT-OVERRIDE-REGISTER.md`
- `ALIGNMENT-BACKLOG-AGING-REVIEW.md`
- `ALIGNMENT-DEPENDENCY-RESOLUTION-SLA-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
