# Alignment Control Confidence Index

Use this artifact to score confidence that each critical control will perform reliably under normal and stressed conditions.

Teams often assume controls are reliable because they are documented; confidence scoring forces proof over assumption.

---

## Purpose

This review ensures:
- control reliability is quantified with transparent scoring criteria,
- low-confidence controls are prioritized before they fail in production workflows,
- confidence trends inform control portfolio and escalation decisions.

---

## Scope

Apply this index to:
- all CC-1 controls,
- CC-2 controls linked to active P0/P1 decisions,
- controls with recent incidents, repeated exceptions, or unresolved corrective actions.

---

## Confidence Dimensions

Score each dimension from 0–100:

1. **Ownership Resilience** (primary/backup/escalation coverage quality)
2. **Validation Coverage** (runbook + drill + failover + test coverage completeness)
3. **Observability Reliability** (signal, alert, and diagnostics quality)
4. **Operational Performance** (recent compliance, incident recurrence, response quality)
5. **Evidence Integrity** (fresh, linked, and auditable evidence support)

---

## Confidence Formula

```
Control Confidence Score =
(0.20 × Ownership Resilience)
+ (0.25 × Validation Coverage)
+ (0.20 × Observability Reliability)
+ (0.20 × Operational Performance)
+ (0.15 × Evidence Integrity)
```

Round to whole number.

---

## Confidence Bands

| Band | Score | Interpretation |
|---|---:|---|
| High Confidence | 85–100 | Control is reliable; monitor normally |
| Moderate Confidence | 70–84 | Control is usable but has notable fragility |
| Conditional Confidence | 55–69 | Control requires near-term mitigation and tighter monitoring |
| Low Confidence | <55 | Control is high risk; intervention required before critical reliance |

---

## Canonical Index Table

| Review ID | Control Artifact | Criticality | Ownership | Validation | Observability | Operational | Evidence | Confidence Score | Band | Priority Action Owner | Action Due |
|---|---|---|---:|---:|---:|---:|---:|---:|---|---|---|
| CCI-001 |  |  |  |  |  |  |  |  |  |  |  |
| CCI-002 |  |  |  |  |  |  |  |  |  |  |  |
| CCI-003 |  |  |  |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing confidence-index review:
- [ ] all in-scope controls are scored across all five dimensions,
- [ ] scoring inputs are evidence-linked and current,
- [ ] low/conditional controls have explicit mitigation owners and due dates,
- [ ] repeated low-confidence controls are root-caused,
- [ ] confidence trend deltas are recorded cycle-over-cycle.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control falls into Low Confidence band,
- same control remains Conditional/Low for 2 consecutive cycles,
- average CC-1 confidence drops below 75,
- low-confidence controls overlap active quarter-critical commitments.

Escalation output must include:
- low-confidence control list and exposure summary,
- mitigation package with accountable owners,
- dated verification checkpoint for confidence recovery.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-CONTROL-TEST-COVERAGE-REVIEW.md`
- `ALIGNMENT-CONTROL-OBSERVABILITY-COVERAGE-REVIEW.md`
- `ALIGNMENT-CONTROL-OWNER-COVERAGE-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
