# Alignment Doc Quality Scorecard

Use this scorecard to evaluate the quality of active strategy and operating artifacts on a recurring cadence.

This prevents low-quality docs from becoming hidden sources of execution drift.

---

## Purpose

This artifact helps teams:
- detect weak or stale documents early,
- prioritize document maintenance by impact,
- enforce minimum quality before docs are used in decision-making.

---

## Scoring Dimensions (0–4 each)

Score each active artifact across the following:

1. **Clarity**  
   Is the document easy to interpret without owner intervention?

2. **Consistency**  
   Does it align with current canonical decisions and pricing/ICP narrative?

3. **Currency**  
   Is it updated recently enough for its intended use?

4. **Actionability**  
   Can someone execute from it with clear owners/dates/criteria?

5. **Evidence Linkage**  
   Are major claims tied to metrics, assumptions, or decision references?

6. **Governance Metadata**  
   Does it include owner, status, and last-updated context?

Total per artifact: **0–24**

---

## Score Interpretation

| Total Score | Band | Meaning | Required Action |
|---:|---|---|---|
| 20–24 | Strong | Ready for operational use | Maintain cadence |
| 15–19 | Watch | Usable but vulnerable to drift | Schedule targeted updates this cycle |
| 10–14 | Weak | High risk of misalignment | Open blocker + assign owner fix plan |
| 0–9 | Critical | Unsafe as source of truth | Remove from active use until repaired |

---

## Artifact Scoring Table (Canonical)

| Artifact | Owner | Clarity | Consistency | Currency | Actionability | Evidence | Governance | Total | Band | Action |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|
| `MARKETING-DOCS-REVIEW.md` | [Owner] |  |  |  |  |  |  |  |  |  |
| `QUESTIONS-THAT-NEED-ANSWERS.md` | [Owner] |  |  |  |  |  |  |  |  |  |
| `ALIGNMENT-ARTIFACTS-INDEX.md` | [Owner] |  |  |  |  |  |  |  |  |  |
| `ALIGNMENT-DASHBOARD-TEMPLATE.md` | [Owner] |  |  |  |  |  |  |  |  |  |

Add rows for all active artifacts in your selected maturity pack.

---

## Quality Gates

A document cannot be treated as “canonical” if:
- total score < 15, or
- Consistency score ≤ 1, or
- Currency score = 0 for decision-critical artifacts.

If gate fails:
1. mark artifact status as **At Risk**,
2. create remediation in blockers log,
3. assign fix owner and due date.

---

## Cadence

### Weekly (light)
- Score top 5 most-used artifacts.
- Flag sudden drops from prior week.

### Monthly (full)
- Score all active artifacts in current maturity pack.
- Publish trend vs prior month.

### Quarterly (reset)
- Reconfirm which artifacts remain active.
- Archive low-value artifacts with repeated weak scores.

---

## Trend Metrics

Track month-over-month:
- Average artifact score,
- % artifacts in Strong band,
- % artifacts failing quality gates,
- Median time-to-repair for Weak/Critical artifacts,
- Reopened quality failures (same artifact regresses twice).

---

## Escalation Rules

Escalate in weekly decision review when:
- 2+ decision-critical artifacts are in Weak/Critical band,
- any canonical pricing/decision doc falls below 15,
- median time-to-repair exceeds 14 days.

Escalation outcome must include:
- owner reassignment or support,
- fixed remediation due date,
- explicit temporary fallback artifact.

---

## Integration Points

Use with:
- `ALIGNMENT-ARTIFACT-LIFECYCLE.md`
- `ALIGNMENT-BLOCKERS-LOG.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-MONTHLY-REVIEW-TEMPLATE.md`
- `ALIGNMENT-CHANGELOG.md`
