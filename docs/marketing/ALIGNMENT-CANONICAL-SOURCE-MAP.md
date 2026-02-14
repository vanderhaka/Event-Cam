# Alignment Canonical Source Map

Use this map to determine which artifact is the source of truth for each operating domain.

When multiple docs touch the same topic, this map prevents ambiguity about which one governs decisions.

---

## Purpose

This artifact defines:
- primary canonical source by domain,
- allowed supporting references,
- conflict resolution routing.

---

## Canonical Source Table

| Domain | Canonical Source (Primary) | Supporting Sources (Secondary) | Conflict Resolver |
|---|---|---|---|
| Strategic priorities and risks | `MARKETING-DOCS-REVIEW.md` | `ALIGNMENT-SYSTEM-OVERVIEW.md` | Strategy Owner |
| Path selection and boundaries | `PATH-ALIGNMENT-WORKSHEET.md` | `ALIGNMENT-CHECKLIST.md` | Leadership Team |
| Decision status/history | `ALIGNMENT-DECISIONS-LOG.md` | `QUESTIONS-THAT-NEED-ANSWERS.md` | Strategy Owner |
| Decision timing commitments | `ALIGNMENT-DECISION-SLA.md` | `ALIGNMENT-DECISION-CALENDAR.md` | Ops / PMO |
| Option comparison method | `ALIGNMENT-DECISION-CRITERIA.md` | `ALIGNMENT-PRIORITY0-DECISION-BRIEF.md` | Strategy Owner |
| Experiment lifecycle and outcomes | `ALIGNMENT-EXPERIMENT-REGISTRY.md` | `ALIGNMENT-DASHBOARD-TEMPLATE.md` | Growth Lead |
| Assumption status/confidence | `ALIGNMENT-ASSUMPTION-REGISTRY.md` | `ALIGNMENT-EVIDENCE-STANDARDS.md` | Strategy + Growth |
| KPI definitions/formulas | `ALIGNMENT-METRIC-DEFINITIONS.md` | `ALIGNMENT-METRIC-THRESHOLDS.md` | Growth Lead |
| KPI weekly status | `ALIGNMENT-DASHBOARD-TEMPLATE.md` | `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md` | Ops / PMO |
| Risk classification/escalation | `ALIGNMENT-RISK-TAXONOMY.md` | `ALIGNMENT-BLOCKERS-LOG.md` | Ops / PMO |
| Contradictions across docs | `ALIGNMENT-CONTRADICTION-REGISTER.md` | `ALIGNMENT-NARRATIVE-GUARDRAILS.md` | Strategy Owner |
| Dependency health | `ALIGNMENT-DEPENDENCY-TRACKER.md` | `ALIGNMENT-COMMAND-CENTER.md` | Ops / PMO |
| Decision impact traceability | `ALIGNMENT-TRACEABILITY-MATRIX.md` | `ALIGNMENT-RETROSPECTIVE-TEMPLATE.md` | Ops + Growth |
| Reversal process | `ALIGNMENT-DECISION-REVERSAL-PROTOCOL.md` | `ALIGNMENT-DECISIONS-LOG.md` | Strategy Owner |
| Artifact lifecycle state | `ALIGNMENT-ARTIFACT-LIFECYCLE.md` | `ALIGNMENT-CHANGELOG.md` | Documentation Owner |
| Artifact quality state | `ALIGNMENT-DOC-QUALITY-SCORECARD.md` | `ALIGNMENT-ARTIFACT-PRUNING-POLICY.md` | Documentation Owner |
| Active vs frozen artifact set | `ALIGNMENT-ACTIVE-ARTIFACT-SET.md` | `ALIGNMENT-ARTIFACTS-INDEX.md` | Ops / PMO |
| Global ID format/linking | `ALIGNMENT-ID-STANDARDS.md` | `ALIGNMENT-STATE-MACHINE.md` | Documentation Owner |
| Weekly leadership briefing | `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md` | `ALIGNMENT-COMMAND-CENTER.md` | Ops / PMO |

---

## Canonical Source Rules

1. If a secondary source conflicts with a primary source, primary source wins.
2. Conflicts must be logged in `ALIGNMENT-CONTRADICTION-REGISTER.md` within 24 hours.
3. Resolution decisions must be written in `ALIGNMENT-DECISIONS-LOG.md`.
4. After resolution, all affected secondary sources must sync within 48 hours.

---

## Escalation Rules

Escalate to weekly decision review when:
- the same domain has unresolved canonical conflict >5 business days,
- no owner is assigned for a canonical source,
- canonical source is stale beyond agreed cadence.

---

## Monthly Maintenance

At each monthly strategy sync:
- verify canonical source ownership still valid,
- confirm domains with repeated conflicts,
- update this map if ownership or source-of-truth locations change.

Log any changes in `ALIGNMENT-CHANGELOG.md`.
