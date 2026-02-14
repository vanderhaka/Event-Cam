# Alignment Control Mitigation Coverage Review

Use this artifact to verify that every exposed control risk has an active mitigation plan with clear ownership.

Uncovered risks accumulate silently when teams track risk signals but fail to map them to concrete mitigations.

---

## Purpose

This review ensures:
- exposed risks are paired with explicit mitigation actions,
- mitigation coverage gaps are detected before incidents occur,
- mitigation plans remain current, owned, and outcome-verifiable.

---

## Scope

Run this review for:
- all Exposed CC-1 residual risks,
- CC-2 risks linked to active P0/P1 decisions,
- risk areas with repeated recurrence, exception, or escalation patterns.

---

## Coverage Metrics

| Metric | Definition | Target |
|---|---|---:|
| Mitigation Coverage Rate | % in-scope exposed risks with active mitigation plan | 100% |
| Uncovered Exposed Risk Count | Exposed risks without assigned mitigation plan | 0 |
| Mitigation Ownership Completeness | % mitigation plans with primary + backup owner | 100% |
| Mitigation Plan Freshness Rate | % active plans updated within required cadence | ≥ 95% |
| Repeat Uncovered Risk Count | Risks recurring without mitigation across cycles | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Covered | Exposed risk has active, owned, current mitigation plan |
| Partial Coverage | Plan exists but ownership, freshness, or scope is incomplete |
| Uncovered | No valid mitigation plan for exposed risk |
| Recovering | Coverage remediation underway with owner and due date |

---

## Canonical Coverage Table

| Review ID | Risk ID | Control Artifact | Exposed Risk Status | Mitigation Plan Linked (Y/N) | Ownership Complete (Y/N) | Status | Coverage Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| CMC-001 |  |  |  |  |  |  |  |  |
| CMC-002 |  |  |  |  |  |  |  |  |
| CMC-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing mitigation-coverage review:
- [ ] all in-scope exposed risks are listed,
- [ ] mitigation linkage and ownership are verified,
- [ ] uncovered/partial risks include exposure notes,
- [ ] correction owners and due dates are assigned,
- [ ] post-correction coverage verification is recorded.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 exposed risk is Uncovered,
- uncovered exposed risk count >0 for two consecutive cycles,
- mitigation ownership completeness drops below target,
- repeat uncovered risk count >0 in any cycle.

Escalation output must include:
- uncovered risk list and exposure summary,
- mitigation coverage remediation package with accountable owners,
- dated checkpoint proving restored full coverage.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-RESIDUAL-RISK-REVIEW.md`
- `ALIGNMENT-INTERVENTION-PRIORITIZATION-MATRIX.md`
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-CONTROL-OWNER-COVERAGE-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
