# Alignment Control Decay Early Warning Review

Use this artifact to detect early signs that critical controls are degrading before they fail visibly.

Most control failures are preceded by subtle decay signals that go unnoticed until incidents escalate.

---

## Purpose

This review ensures:
- weak control signals are detected before material failure,
- decay patterns are triaged and corrected early,
- leading indicators trigger preventive intervention, not reactive recovery.

---

## Scope

Run this review for:
- all CC-1 controls each cycle,
- CC-2 controls with recent exceptions or misses,
- controls in active change, calibration, or recertification windows.

---

## Early-Warning Metrics

| Metric | Definition | Target |
|---|---|---:|
| Decay Signal Coverage Rate | % in-scope controls with defined early-warning indicators | 100% |
| Early Detection Rate | % material control degradations detected before incident/escalation | ≥ 90% |
| Undetected Decay Count | Degradations first discovered only after incident impact | 0 |
| Preventive Intervention Lead Time | Time from decay signal to corrective action start | ≤ 2 business days |
| Repeat Decay Pattern Count | Controls showing same decay pattern in consecutive cycles | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| Stable | No meaningful decay signals observed |
| Watch | Early decay signals present; preventive actions needed |
| At Risk | Persistent or multi-signal decay threatening control reliability |
| Recovering | Corrective/preventive actions underway with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Criticality | Early-Warning Signals Triggered | First Trigger Date | Preventive Action Started (Y/N) | Status | Action Owner | Action Due |
|---|---|---|---|---|---|---|---|---|
| CDE-001 |  |  |  |  |  |  |  |  |
| CDE-002 |  |  |  |  |  |  |  |  |
| CDE-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing decay early-warning review:
- [ ] all in-scope controls have current decay indicators,
- [ ] triggered signals are evidence-linked and triaged,
- [ ] at-risk controls have assigned preventive owners and due dates,
- [ ] repeat decay patterns are root-caused,
- [ ] preventive actions are tracked to verified closure.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control remains At Risk for 2 cycles,
- undetected decay count is >0 in any cycle,
- preventive intervention lead time breaches target for 2 cycles,
- repeat decay patterns cluster in same control domain.

Escalation output must include:
- affected controls and decay pattern summary,
- preventive/corrective action package with owners,
- dated verification checkpoint proving decay stabilization.

---

## Integration Points

Use with:
- `ALIGNMENT-LEADING-INDICATOR-WATCHLIST.md`
- `ALIGNMENT-PREVENTIVE-ACTION-REVIEW.md`
- `ALIGNMENT-CONTROL-CONFIDENCE-INDEX.md`
- `ALIGNMENT-CONTROL-RECERTIFICATION-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
