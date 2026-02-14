# Alignment Evidence Standards

Use this document to define what counts as valid evidence for strategy decisions, KPI interpretation, and experiment outcomes.

Without evidence standards, teams mistake anecdotes for signal and overcommit to weak conclusions.

---

## Purpose

This artifact establishes:
- evidence quality tiers,
- minimum evidence requirements by decision type,
- unacceptable evidence patterns,
- verification and audit rules.

It is a control for decision quality, not a reporting formality.

---

## Evidence Quality Tiers

Classify each evidence item by its highest applicable tier:

### Tier 1 — Directional Signal
- small-sample observations,
- qualitative interviews,
- single-channel short-window metric movement.

Use case: hypothesis generation only.

### Tier 2 — Decision Support
- repeated pattern across multiple periods or cohorts,
- controlled experiment with clear guardrails,
- measurable impact with plausible causality.

Use case: P1 decisions, scoped execution changes.

### Tier 3 — Decision-Grade Evidence
- replicated signal across segments/time,
- clear baseline vs post-change comparison,
- confounders documented and bounded,
- material KPI movement sustained through verification window.

Use case: P0 decisions, path-level commitments, pricing/model changes.

---

## Minimum Evidence Requirements by Decision Type

| Decision Type | Minimum Evidence Tier | Required Components |
|---|---|---|
| Messaging copy tweak | Tier 1 | directional metric + owner note |
| Channel budget shift (small) | Tier 2 | baseline, test period, CAC/quality deltas |
| Channel scale/kill | Tier 2 | pass/fail thresholds + post-test summary |
| Pricing model change | Tier 3 | cohort/segment analysis + guardrails |
| ICP/path change (P0) | Tier 3 | multi-source evidence + assumption updates + risk analysis |
| Reversal of P0 decision | Tier 3 | sustained off-track proof + reversal verification plan |

---

## Required Evidence Packet (for P0 / High-Impact Decisions)

Every high-impact decision must include:

1. **Baseline Snapshot**  
   What metric state existed pre-change?

2. **Intervention Definition**  
   What changed, exactly, and when?

3. **Signal Window**  
   What period is used to evaluate impact?

4. **Primary KPI + Guardrails**  
   What should move, and what must not degrade?

5. **Confounder Notes**  
   What parallel changes could affect interpretation?

6. **Decision Confidence Statement**  
   Why confidence is high/medium/low despite known limits.

---

## Unacceptable Evidence Patterns

Do not use these as sole justification:

- vanity metrics without conversion linkage,
- one-off anecdote from single customer,
- short-window spikes with no baseline comparison,
- “this feels better” without data,
- unsupported projections presented as outcomes.

If any appear in a decision brief, the decision remains **In Progress**.

---

## Evidence Freshness Rules

- Evidence older than 90 days must be revalidated before major strategic decisions.
- For fast-changing channels, evidence older than 30 days is considered stale.
- Pricing and economics decisions require latest available contribution/CAC/retention data.

---

## Source Reliability Ranking

When sources conflict, prioritize in this order:

1. Instrumented product + transaction data
2. Experiment data with documented controls
3. CRM/ops records with consistent definitions
4. Structured customer interviews
5. Expert opinion / stakeholder intuition

Lower-ranked sources can inform hypotheses but cannot override higher-ranked contradictory evidence.

---

## Evidence Review Cadence

### Weekly
- validate evidence behind active experiments and pending P1 decisions.

### Monthly
- audit evidence packets for closed high-impact decisions.
- tag weak evidence cases and assign remediation.

### Quarterly
- review recurring evidence failures and update standards if needed.

---

## Governance Rules

- Every decision brief must include an **Evidence Quality Tier** tag.
- Every dashboard claim must reference metric definitions and source lineage.
- Every retrospective must identify where evidence quality was insufficient.
- Repeated weak-evidence decisions trigger governance escalation.

---

## Integration Points

Use alongside:
- `ALIGNMENT-PRIORITY0-DECISION-BRIEF.md`
- `ALIGNMENT-DECISION-CRITERIA.md`
- `ALIGNMENT-EXPERIMENT-REGISTRY.md`
- `ALIGNMENT-ASSUMPTION-REGISTRY.md`
- `ALIGNMENT-TRACEABILITY-MATRIX.md`
- `ALIGNMENT-RETROSPECTIVE-TEMPLATE.md`
