# Alignment Control Deprecation Risk Review

Use this artifact to evaluate risks before deprecating, merging, or retiring active controls.

Retiring controls too early can remove hidden safeguards and reintroduce previously contained failure modes.

---

## Purpose

This review ensures:
- proposed control deprecations are risk-assessed before execution,
- dependency and coverage gaps are identified before control retirement,
- post-deprecation verification is planned and evidence-backed.

---

## Scope

Run this review for:
- any CC-1 control proposed for deprecation/merge,
- CC-2 controls with high dependency fan-out,
- controls with recent incidents, overrides, or repeated corrective actions.

---

## Risk Metrics

| Metric | Definition | Target |
|---|---|---:|
| Pre-Deprecation Risk Assessment Coverage | % deprecation candidates with completed risk packet | 100% |
| High-Risk Deprecation Candidate Count | Candidates with unresolved high-risk exposure | 0 |
| Dependency Coverage Gap Count | Missing replacement coverage for dependent workflows | 0 |
| Post-Deprecation Incident Count | Incidents linked to retired/merged controls within verification window | 0 |
| Deprecation Verification Completion Rate | % retired controls with completed post-window verification | 100% |

---

## Status Model

| Status | Meaning |
|---|---|
| Safe Candidate | Risk-assessed, covered, and ready for controlled deprecation |
| Watch Candidate | Minor unresolved risks requiring mitigation |
| Unsafe Candidate | Material unresolved risks block deprecation |
| Verifying | Deprecation executed; post-window verification in progress |

---

## Canonical Review Table

| Review ID | Control Artifact | Proposed Action (Retire/Merge) | Risk Assessment Complete (Y/N) | Replacement Coverage Verified (Y/N) | Status | Risk Owner | Verification Due |
|---|---|---|---|---|---|---|---|
| CDR-001 |  |  |  |  |  |  |  |
| CDR-002 |  |  |  |  |  |  |  |
| CDR-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing deprecation-risk review:
- [ ] all in-scope candidates have risk packets and dependency maps,
- [ ] unsafe candidates include explicit block reasons,
- [ ] mitigations and owners are assigned for watch/unsafe items,
- [ ] verification windows and success criteria are defined,
- [ ] deprecation outcomes are linked to incident and effectiveness artifacts.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 candidate is classified Unsafe,
- dependency coverage gap count >0 at deprecation decision time,
- post-deprecation incident count >0 for any candidate,
- deprecation verification completion falls below target for 2 cycles.

Escalation output must include:
- unsafe candidate list and exposure summary,
- mitigation package with accountable owners,
- dated verification checkpoint proving risk-controlled deprecation.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-SUNSET-CRITERIA.md`
- `ALIGNMENT-CONTROL-PORTFOLIO-REVIEW.md`
- `ALIGNMENT-CONTROL-DEPENDENCY-MAP.md`
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-COMMAND-CENTER.md`
