# Alignment Decision Premortem

Run this premortem before approving high-impact decisions to identify likely failure paths in advance.

The goal is to reduce avoidable reversals by surfacing execution, data, and narrative risks before commitment.

---

## When to Use

Required for:
- all P0 decisions,
- any pricing-path change,
- any decision with expected impact across 2+ functions.

Optional for P1/P2 decisions where uncertainty is high.

---

## Premortem Prompt

Assume this decision failed badly in 90 days.

Ask: **“What most likely caused the failure?”**

Capture causes before debating solutions.

---

## Failure-Mode Capture Table

| Failure Mode | Root Cause Hypothesis | Early Warning Signal | Prevention Control | Contingency Owner | Severity (L/M/H) |
|---|---|---|---|---|---|
| [Mode 1] |  |  |  |  |  |
| [Mode 2] |  |  |  |  |  |
| [Mode 3] |  |  |  |  |  |

Include at least one mode in each class:
- execution failure,
- data/measurement failure,
- narrative/market failure.

---

## Control Design Checklist

Before approval, confirm:

- [ ] Failure modes are explicit and testable.
- [ ] Early warning signals are measurable weekly.
- [ ] Prevention controls are mapped to existing artifacts.
- [ ] Contingency owner is named for every High-severity mode.
- [ ] Decision brief includes reversal trigger thresholds.

If any box is unchecked, decision is not premortem-ready.

---

## Required Outputs

Attach to decision packet:

1. Top 3 failure modes and mitigations.
2. Early warning metric list with thresholds.
3. First contingency action if warning threshold is breached.
4. Confirmed owner for monitoring warnings.

---

## Escalation Rules

Escalate to leadership if:
- 2+ High-severity failure modes have no credible prevention control,
- warning signals cannot be measured reliably from current data sources,
- contingency ownership is unresolved by decision deadline.

---

## Integration Points

Use with:
- `ALIGNMENT-PRIORITY0-DECISION-BRIEF.MD`
- `ALIGNMENT-EVIDENCE-STANDARDS.md`
- `ALIGNMENT-DECISION-REVERSAL-PROTOCOL.md`
- `ALIGNMENT-TRACEABILITY-MATRIX.md`
- `ALIGNMENT-DATA-SOURCE-CATALOG.md`
