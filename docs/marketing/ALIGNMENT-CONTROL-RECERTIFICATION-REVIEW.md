# Alignment Control Recertification Review

Use this artifact to periodically re-certify that critical controls remain valid, necessary, and correctly configured.

Controls that were once effective can decay silently as teams, risks, and operating modes change.

---

## Purpose

This review ensures:
- critical controls are re-validated against current risk and workflow reality,
- stale control logic and thresholds are corrected before failure,
- obsolete controls are flagged for redesign, merge, or sunset.

---

## Scope

Run recertification for:
- all CC-1 controls each quarter,
- CC-2 controls each half-year,
- controls changed, overridden, or repeatedly escalated in current quarter.

---

## Recertification Metrics

| Metric | Definition | Target |
|---|---|---:|
| In-Scope Recertification Completion Rate | % controls recertified within required cadence | 100% |
| Configuration Drift Count | Recertified controls with material logic/threshold drift | 0 |
| Obsolete Control Count | Recertified controls no longer justified by current risk context | declining trend |
| Recertification Action Closure Rate | % required recertification actions closed on time | ≥ 95% |
| Repeat Drift Count | Controls failing recertification in consecutive cycles | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Recertified | Control remains valid and correctly configured |
| Drift Detected | Material config/logic drift identified |
| Obsolete Candidate | Control no longer justified in current operating context |
| Reworking | Control update/merge/sunset action underway |

---

## Canonical Recertification Table

| Review ID | Control Artifact | Criticality | Recertification Date | Drift Detected (Y/N) | Obsolete Candidate (Y/N) | Status | Action Owner | Action Due |
|---|---|---|---|---|---|---|---|---|
| RCR-001 |  |  |  |  |  |  |  |  |
| RCR-002 |  |  |  |  |  |  |  |  |
| RCR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing control recertification review:
- [ ] all in-scope controls were evaluated within cadence,
- [ ] recertification evidence is linked and current,
- [ ] drift/obsolete candidates have action owners and due dates,
- [ ] recurring drift controls are root-caused,
- [ ] action outcomes are reflected in control portfolio records.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control misses recertification cadence,
- configuration drift count is >0 for two consecutive cycles,
- obsolete controls remain active beyond one recertification cycle,
- repeat drift count rises across the same control family.

Escalation output must include:
- affected control list and risk exposure,
- recertification correction actions with accountable owners,
- dated verification checkpoint for restored certification integrity.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-LIFECYCLE-ANALYSIS.md`
- `ALIGNMENT-CONTROL-CHANGE-PROTOCOL.md`
- `ALIGNMENT-CONTROL-PORTFOLIO-REVIEW.md`
- `ALIGNMENT-CONTROL-SUNSET-CRITERIA.md`
- `ALIGNMENT-COMMAND-CENTER.md`
