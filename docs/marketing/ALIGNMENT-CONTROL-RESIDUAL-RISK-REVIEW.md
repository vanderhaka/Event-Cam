# Alignment Control Residual Risk Review

Use this artifact to evaluate remaining risk after current controls and mitigations are applied.

If residual risk is not measured explicitly, teams overestimate control protection and underinvest in remaining exposures.

---

## Purpose

This review ensures:
- post-control residual risk is visible by critical domain,
- risk reduction claims are evidence-based and not assumed,
- high residual-risk areas trigger targeted hardening decisions.

---

## Scope

Run this review for:
- all CC-1 controls,
- CC-2 controls supporting active P0/P1 decisions,
- controls with recent incidents, exceptions, or recurring gap patterns.

---

## Residual Risk Metrics

| Metric | Definition | Target |
|---|---|---:|
| Residual Risk Scored Coverage | % in-scope controls with current residual-risk score | 100% |
| High Residual Risk Control Count | Controls remaining above defined risk threshold after mitigation | 0 |
| Residual Risk Reduction Rate | % controls showing quarter-over-quarter residual risk reduction | improving trend |
| Unmitigated High-Risk Exposure Count | High residual-risk controls without active mitigation plan | 0 |
| Residual-Risk Reassessment Timeliness | % in-scope controls reassessed within required cadence | 100% |

---

## Status Model

| Status | Meaning |
|---|---|
| Controlled | Residual risk is within accepted threshold |
| Watch | Residual risk elevated but currently managed |
| Exposed | Residual risk above threshold and requires intervention |
| Recovering | Risk-reduction actions in progress with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Inherent Risk Score | Mitigation Effectiveness Score | Residual Risk Score | Status | Mitigation Owner | Reassessment Due |
|---|---|---:|---:|---:|---|---|---|
| CRR-001 |  |  |  |  |  |  |  |
| CRR-002 |  |  |  |  |  |  |  |
| CRR-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing residual-risk review:
- [ ] all in-scope controls have current inherent and residual risk scores,
- [ ] scoring logic and evidence references are linked,
- [ ] exposed controls have mitigation owners and due dates,
- [ ] unmitigated high-risk exposures are escalated,
- [ ] next reassessment checkpoints are scheduled.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control remains Exposed for 2 cycles,
- unmitigated high-risk exposure count >0 in any cycle,
- residual risk reduction stalls for 2 cycles,
- reassessment timeliness falls below target.

Escalation output must include:
- exposed control list and residual exposure summary,
- risk-reduction action package with accountable owners,
- dated checkpoint confirming residual-risk improvement.

---

## Integration Points

Use with:
- `ALIGNMENT-RISK-TAXONOMY.md`
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-CONTROL-CRITICALITY-MAP.md`
- `ALIGNMENT-INTERVENTION-PRIORITIZATION-MATRIX.md`
- `ALIGNMENT-COMMAND-CENTER.md`
