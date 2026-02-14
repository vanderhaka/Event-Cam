# Alignment Change Impact Assessment

Use this assessment before making material changes to strategy, pricing, operating cadence, or governance controls.

This prevents high-impact changes from being approved without understanding second-order effects.

---

## Purpose

This artifact helps teams evaluate:
- what a proposed change affects,
- who is impacted,
- what risks are introduced,
- whether sequencing dependencies are satisfied.

---

## When to Run This Assessment

Run before approving any change that affects one or more of:

- path selection or scope boundaries,
- pricing architecture or partner economics,
- KPI definitions or thresholds,
- decision rights / ownership model,
- active artifact set or operating mode.

If uncertain, run the assessment anyway.

---

## Assessment Template

### 1) Change Summary
- Change ID:
- Proposed by:
- Date:
- Change type (Strategy / Pricing / KPI / Governance / Operating Process):
- One-sentence change statement:

### 2) Intended Outcome
- What problem does this change solve?
- What measurable improvement is expected?
- Expected time-to-signal:

### 3) Impact Surface
- Affected artifacts:
- Affected owners/teams:
- Affected customer/channel segments:
- Affected KPIs:

### 4) Risk Assessment
- Primary risk:
- Secondary risks:
- Worst-case failure mode:
- Detection signal for failure:

### 5) Dependency Check
- Required prerequisite decisions:
- Required data/evidence:
- Required implementation resources:
- Blocking dependencies open? (Yes/No)

### 6) Reversibility
- Reversible? (High/Medium/Low)
- Reversal trigger:
- Reversal owner:
- Estimated rollback time:

### 7) Approval Recommendation
- Approve now
- Approve with conditions
- Defer pending prerequisites
- Reject

Rationale:

---

## Impact Scoring Matrix (Quick)

Score each dimension 1–5:

- **Strategic Impact**
- **Execution Complexity**
- **Cross-Functional Disruption**
- **Risk Severity**
- **Reversibility Difficulty**

Interpretation:
- **5–10 total:** low-risk tactical change
- **11–17 total:** moderate change; approve with controls
- **18–25 total:** high-impact change; leadership review required

---

## Mandatory Controls by Score Band

| Score Band | Required Controls |
|---|---|
| 5–10 | Decision log entry + owner assignment |
| 11–17 | Add dependency check + evidence tier tag + KPI watch plan |
| 18–25 | Leadership sign-off + reversal protocol pre-defined + weekly traceability review |

---

## Sequencing Rule

No high-impact change (18–25) can be approved unless:
- contradiction backlog has no unresolved critical item in same domain,
- required prerequisites are closed in decision log,
- owner capacity is confirmed for execution and monitoring.

---

## Post-Approval Requirements

Within 48 hours of approval:

1. Log decision in `ALIGNMENT-DECISIONS-LOG.md`.
2. Update impacted artifacts and canonical source map.
3. Add traceability row for expected KPI movement.
4. Add reversal trigger if change is high-impact.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-CRITERIA.md`
- `ALIGNMENT-EVIDENCE-STANDARDS.md`
- `ALIGNMENT-DEPENDENCY-TRACKER.md`
- `ALIGNMENT-TRACEABILITY-MATRIX.md`
- `ALIGNMENT-DECISION-REVERSAL-PROTOCOL.md`
