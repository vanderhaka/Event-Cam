# Alignment Active Artifact Set

Use this file to declare which alignment artifacts are currently active for the team.

Without an explicit active set, teams drift into “all docs are active,” which causes maintenance failure and contradictory execution behavior.

---

## Purpose

This artifact creates a single control point for:
- selecting the active maturity pack,
- naming exactly which artifacts are in active use,
- freezing non-active artifacts without deleting history.

---

## Current Operating Selection (Fill Weekly)

- Quarter:
- Active pack (`A` / `B` / `C` / `D`):
- Active mode (`Focus` / `Execution` / `Governance` / `Diagnostic`):
- Effective date:
- Review owner:
- Next review date:

---

## Active Artifact Register (Canonical)

Only artifacts listed below are treated as active operational sources.

| Artifact | Role in Current Cycle | Owner | Cadence | Status (Active/At Risk) | Last Verified |
|---|---|---|---|---|---|
| `ALIGNMENT-START-HERE.md` | Entry and flow | [Owner] | Weekly | Active | [Date] |
| `QUESTIONS-THAT-NEED-ANSWERS.md` | Decision queue | [Owner] | Weekly | Active | [Date] |
| `PATH-ALIGNMENT-WORKSHEET.md` | Path contract | [Owner] | Monthly | Active | [Date] |
| `ALIGNMENT-DASHBOARD-TEMPLATE.md` | KPI operating view | [Owner] | Weekly | Active | [Date] |
| `ALIGNMENT-DECISIONS-LOG.md` | Decision history | [Owner] | Weekly | Active | [Date] |

Add/remove rows as needed, but keep this list explicit and current.

---

## Frozen Artifact Register

Artifacts not actively used this cycle should be listed here as **Frozen**, not deleted.

| Artifact | Freeze Reason | Date Frozen | Reactivation Trigger | Owner |
|---|---|---|---|---|
| [Artifact] | [Reason] | [Date] | [Condition] | [Owner] |

Frozen artifacts:
- remain available for audit/context,
- are excluded from weekly operating expectations,
- must not be cited as canonical unless reactivated.

---

## Activation / Deactivation Rules

### Activate an artifact only if:
- it solves a current operating problem,
- owner and update cadence are assigned,
- it does not duplicate an existing active artifact.

### Deactivate an artifact if:
- not used for 2 consecutive cycles,
- repeatedly stale or low-quality,
- superseded by a clearer active artifact.

Every activation/deactivation must be logged in changelog.

---

## Active Set Guardrails

| Pack | Recommended Active Artifact Count |
|---|---:|
| A | 5–7 |
| B | 8–12 |
| C | 12–18 |
| D | 18+ |

If active count exceeds pack guidance for 2 consecutive weeks:
1. run pruning review,
2. freeze low-utility artifacts,
3. republish active set within 5 business days.

---

## Weekly Review Checklist

- [ ] Active pack still matches team complexity.
- [ ] Active mode still matches current risk/signal conditions.
- [ ] Every active artifact has owner + recent verification.
- [ ] No frozen artifact is being used as canonical source.
- [ ] New artifacts added this week are explicitly classified (Active/Frozen).
- [ ] Active count still within guardrail for chosen pack.

---

## Integration Points

Use with:
- `ALIGNMENT-ARTIFACTS-INDEX.md`
- `ALIGNMENT-OPERATING-MODES.md`
- `ALIGNMENT-ARTIFACT-PRUNING-POLICY.md`
- `ALIGNMENT-DOC-QUALITY-SCORECARD.md`
- `ALIGNMENT-CHANGELOG.md`
- `ALIGNMENT-COMMAND-CENTER.md`
