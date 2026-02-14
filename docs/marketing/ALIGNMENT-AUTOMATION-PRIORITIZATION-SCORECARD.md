# Alignment Automation Prioritization Scorecard

Use this scorecard to prioritize which governance tasks should be automated first.

Automation without prioritization can increase complexity while failing to reduce real operating burden.

---

## Purpose

This scorecard helps teams:
- identify highest-leverage automation opportunities,
- compare impact versus implementation complexity,
- sequence automation work to improve governance ROI.

---

## Scoring Dimensions (1–5 each)

1. **Time Savings Potential**  
   Expected weekly hours saved if automated.

2. **Error Reduction Potential**  
   Degree to which automation reduces manual mistakes.

3. **Risk Reduction Impact**  
   How strongly automation improves control reliability.

4. **Implementation Complexity (reverse-scored)**  
   Lower complexity = higher score.

5. **Adoption Readiness**  
   Clarity of owners/process/data needed to deploy automation.

---

## Priority Formula

`Automation Priority Score = Time + Error + Risk + Complexity + Adoption`

Max score = 25.

---

## Priority Bands

| Score | Priority | Action |
|---:|---|---|
| 21–25 | P-A1 | Build in next cycle |
| 16–20 | P-A2 | Plan after P-A1 items |
| 11–15 | P-A3 | Keep in backlog, re-evaluate quarterly |
| ≤10 | P-A4 | Defer unless context changes |

---

## Canonical Scorecard Table

| Candidate ID | Automation Candidate | Time | Error | Risk | Complexity | Adoption | Total Score | Priority Band | Decision (Build/Plan/Defer) | Owner |
|---|---|---:|---:|---:|---:|---:|---:|---|---|---|
| AUT-001 |  |  |  |  |  |  |  |  |  |  |
| AUT-002 |  |  |  |  |  |  |  |  |  |  |
| AUT-003 |  |  |  |  |  |  |  |  |  |  |

---

## Suggested Candidate Types

Examples:
- weekly freshness and expiry checks,
- ID format/linkage validation,
- SLA deadline alerting,
- contradiction detection between canonical artifacts,
- packet completeness checks before leadership review.

---

## Decision Rules

- At least one P-A1 candidate should be delivered each quarter (if any exist).
- No automation build starts without owner + verification plan.
- Any automation with high complexity and low adoption readiness requires pilot first.

---

## Escalation Triggers

Escalate when:
- P-A1 candidates remain unstarted for 2 cycles,
- automation backlog grows while governance cost remains over budget,
- implemented automations fail to reduce target manual effort.

Escalation output must include:
- reprioritized automation queue,
- blocked dependency owners,
- target benefit checkpoint date.

---

## Integration Points

Use with:
- `ALIGNMENT-AUTOMATION-BACKLOG.md`
- `ALIGNMENT-GOVERNANCE-COST-BUDGET.md`
- `ALIGNMENT-GOVERNANCE-ROI-REPORT.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-CONTROL-PORTFOLIO-REVIEW.md`
