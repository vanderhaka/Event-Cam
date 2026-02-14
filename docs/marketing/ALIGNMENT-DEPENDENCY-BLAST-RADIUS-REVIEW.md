# Alignment Dependency Blast Radius Review

Use this artifact to quantify how far a single dependency failure can spread across decisions, controls, and execution commitments.

If dependency blast radius is unknown, incidents are underestimated and recovery plans miss hidden exposure.

---

## Purpose

This review ensures:
- high-impact dependencies are mapped to downstream decision/control exposure,
- blast radius is measured and risk-ranked before failure occurs,
- mitigation and isolation actions reduce multi-team disruption risk.

---

## Scope

Run this review for:
- dependencies linked to CC-1 controls,
- shared data/platform dependencies supporting active P0/P1 decisions,
- dependencies with recurring SLA breaches or reliability degradation.

---

## Blast Radius Metrics

| Metric | Definition | Target |
|---|---|---:|
| Mapped Critical Dependency Rate | % critical dependencies with documented downstream impact map | 100% |
| High-Blast Dependency Count | Dependencies exposing 3+ critical workflows if failed | declining trend |
| Unmitigated High-Blast Count | High-blast dependencies without isolation/backup mitigation | 0 |
| Exposure Recovery Preparedness Rate | % high-blast dependencies with tested containment play | ≥ 95% |
| Incident Spillover Count | Incidents where one dependency failure cascaded beyond expected boundary | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Contained | Blast radius is mapped and mitigations are active/tested |
| Watch | Partial mapping or mitigation coverage; moderate exposure remains |
| Exposed | High-blast dependency lacks mitigation or verified containment path |
| Correcting | Mitigation/remapping work in progress with owner and due date |

---

## Canonical Review Table

| Review ID | Dependency ID | Downstream Critical Workflows (count) | High Blast (Y/N) | Mitigation In Place (Y/N) | Last Containment Test Date | Status | Exposure Owner | Mitigation Due |
|---|---|---:|---|---|---|---|---|---|
| DBR-001 |  |  |  |  |  |  |  |  |
| DBR-002 |  |  |  |  |  |  |  |  |
| DBR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing blast-radius review:
- [ ] all in-scope dependencies are mapped to downstream exposure,
- [ ] high-blast dependencies are explicitly flagged and risk-ranked,
- [ ] unmitigated high-blast items have owners and due dates,
- [ ] containment tests are logged with pass/fail evidence,
- [ ] unresolved exposure on critical dependencies is escalated.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any high-blast dependency is Exposed for 2 cycles,
- incident spillover occurs beyond declared containment boundary,
- unmitigated high-blast count rises cycle-over-cycle,
- containment preparedness rate drops below target for 2 cycles.

Escalation output must include:
- exposed dependency list and spillover impact summary,
- mitigation and isolation actions with accountable owners,
- dated verification checkpoint for restored containment confidence.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-DEPENDENCY-MAP.md`
- `ALIGNMENT-DEPENDENCY-RESOLUTION-SLA-REVIEW.md`
- `ALIGNMENT-CONTROL-FAILOVER-READINESS-REVIEW.md`
- `ALIGNMENT-RECOVERY-WINDOW-COMPLIANCE.md`
- `ALIGNMENT-COMMAND-CENTER.md`
