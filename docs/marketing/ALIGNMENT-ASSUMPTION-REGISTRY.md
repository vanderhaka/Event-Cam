# Alignment Assumption Registry

Use this registry to track strategic assumptions explicitly, test them intentionally, and retire them when disproven.

If assumptions stay implicit, teams confuse belief with fact and make fragile decisions.

---

## Purpose

This artifact ensures assumptions are:
- visible,
- owned,
- testable,
- linked to decisions and experiments.

It closes the loop between planning confidence and real-world evidence.

---

## Assumption Categories

Classify each assumption under one primary category:

- **Market** (demand size, urgency, buyer behavior)
- **ICP** (who converts, who retains, who refers)
- **Pricing** (willingness to pay, elasticity, package preference)
- **Channel** (acquisition efficiency and scalability)
- **Product** (feature-value linkage and adoption behavior)
- **Operational** (team capacity, execution speed, dependency reliability)
- **Economics** (CAC, contribution margin, payback, retention effects)

---

## Assumption States

Each assumption must have one state:

- **Unverified** — Not tested yet.
- **In Test** — Active test/measurement in progress.
- **Supported** — Evidence supports assumption (for now).
- **Rejected** — Evidence contradicts assumption.
- **Superseded** — Replaced by a newer assumption statement.

---

## Registry Fields

- **AID** (Assumption ID)
- **Statement** (single-sentence claim)
- **Category**
- **Confidence Level** (`Low`, `Medium`, `High`)
- **Decision Link** (Decision ID if assumption drives a decision)
- **Experiment/Test Link**
- **Validation Metric**
- **Success Threshold**
- **Owner**
- **Review Date**
- **Current State**
- **Last Evidence Note**
- **Next Action**

---

## Canonical Registry Table

| AID | Statement | Category | Confidence | Validation Metric | Threshold | Owner | Review Date | State | Next Action |
|---|---|---|---|---|---|---|---|---|---|
| A-001 | [Claim] | Market | Medium | [Metric] | [Target] | [Name] | [Date] | Unverified | [Test plan] |
| A-002 |  | ICP | Low |  |  |  |  | Unverified |  |
| A-003 |  | Pricing | Medium |  |  |  |  | Unverified |  |

---

## Writing Standard for Assumptions

Good assumption statements are:
- specific,
- falsifiable,
- time-bounded,
- measurable.

Avoid vague statements like:
- “users will like this,”
- “this channel should work.”

Prefer:
- “For [ICP], [offer] in [channel] will achieve [metric] ≥ [threshold] within [time window].”

---

## Review Cadence

### Weekly
- Update state for all assumptions linked to active experiments or decisions.
- Flag assumptions with overdue review dates.

### Monthly
- Re-score confidence based on evidence.
- Archive or supersede stale assumptions.
- Escalate rejected high-impact assumptions to strategy review.

### Quarterly
- Reset top 10 path-critical assumptions with current-quarter thresholds.

---

## Escalation Rules

Escalate immediately when:
- a **High confidence** assumption is rejected,
- 3+ assumptions in same category are rejected in one month,
- a rejected assumption underpins an active Priority 0 decision.

Escalation action options:
- revise decision,
- pause related execution,
- run a high-priority validation sprint.

---

## Quality Bar

An assumption entry is valid only if:
- statement is falsifiable,
- metric + threshold are defined,
- owner + review date are assigned.

Entries missing any of these must remain out of decision-critical workflows.

---

## Integration Points

Use together with:
- `ALIGNMENT-DECISIONS-LOG.md`
- `ALIGNMENT-DECISION-CRITERIA.md`
- `ALIGNMENT-EXPERIMENT-REGISTRY.md`
- `ALIGNMENT-TRACEABILITY-MATRIX.md`
- `ALIGNMENT-RETROSPECTIVE-TEMPLATE.md`
