# Alignment Control Escape Defect Review

Use this artifact to track failures that escaped active controls and were discovered only after downstream impact.

When escape defects are not analyzed, teams mistake isolated incidents for noise and miss structural control gaps.

---

## Purpose

This review ensures:
- escaped control failures are captured, classified, and traced to root causes,
- recurring escape patterns trigger structural control redesign,
- detection lag and downstream impact are reduced cycle-over-cycle.

---

## Scope

Track escape defects for:
- all CC-1 controls,
- CC-2 controls tied to active P0/P1 decisions,
- controls with recent incidents, escalations, or reopening patterns.

---

## Escape Defect Metrics

| Metric | Definition | Target |
|---|---|---:|
| Escape Defect Count | Number of control failures discovered after downstream impact | 0 |
| Escape Defect Rate | Escapes per 100 in-scope control cycles | declining trend |
| Median Detection Lag | Time from defect introduction to detection | improving trend |
| Repeat Escape Pattern Count | Repeated escape causes across same control family | 0 |
| Escape Remediation Closure Rate | % escape-driven corrective actions closed on time | ≥ 95% |

---

## Status Model

| Status | Meaning |
|---|---|
| Contained | Escape defect addressed and no repeat evidence |
| Watch | Escape defect addressed but repeat risk remains |
| Exposed | Escape defect unresolved or recurring |
| Recovering | Remediation in progress with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Escape Defect Description | Detection Lag | Downstream Impact | Repeat Pattern (Y/N) | Status | Remediation Owner | Remediation Due |
|---|---|---|---|---|---|---|---|---|
| CED-001 |  |  |  |  |  |  |  |  |
| CED-002 |  |  |  |  |  |  |  |  |
| CED-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing escape-defect review:
- [ ] all detected escape defects are logged and classified,
- [ ] detection lag and impact are documented for each defect,
- [ ] repeat-pattern defects are root-caused,
- [ ] remediation owners and due dates are assigned,
- [ ] closure evidence is linked in corrective-action artifacts.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control records an Exposed escape defect,
- escape defect count is >0 for two consecutive cycles,
- repeat escape pattern count increases cycle-over-cycle,
- median detection lag worsens for 2 cycles.

Escalation output must include:
- escape-defect list and impact summary,
- corrective redesign package with accountable owners,
- dated verification checkpoint for containment.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-FAILURE-MODES.md`
- `ALIGNMENT-ROOT-CAUSE-PATTERN-REVIEW.md`
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-CLOSURE-INTEGRITY-AUDIT.md`
- `ALIGNMENT-COMMAND-CENTER.md`
