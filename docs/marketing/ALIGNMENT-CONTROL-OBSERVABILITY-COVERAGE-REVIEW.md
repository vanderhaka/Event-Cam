# Alignment Control Observability Coverage Review

Use this artifact to verify that critical controls are observable through reliable signals, alerts, and diagnostics.

If control observability is incomplete, teams detect failures late and respond with low-confidence actions.

---

## Purpose

This review ensures:
- critical controls have explicit health signals and alert paths,
- observability signals are reliable and actionable,
- blind spots are reduced before they create decision or execution risk.

---

## Scope

Required for:
- all CC-1 controls,
- CC-2 controls with dependency or recovery risk,
- controls with recent incidents, misses, or false alerts.

---

## Coverage Metrics

| Metric | Definition | Target |
|---|---|---:|
| Signal Coverage Rate | % in-scope controls with defined leading + lagging health signals | 100% |
| Alert Coverage Rate | % in-scope controls with active alerting tied to thresholds | 100% |
| Diagnostic Readiness Rate | % in-scope controls with linked diagnostics/log references for triage | ≥ 95% |
| Blind Spot Count | In-scope controls lacking one or more required observability components | 0 |
| Alert Actionability Rate | % critical alerts leading to clear owner action without manual reinterpretation | ≥ 90% |

---

## Coverage Status Model

| Status | Meaning |
|---|---|
| Observable | Signal, alert, and diagnostics coverage complete and reliable |
| Partial | At least one observability layer missing or low reliability |
| Blind | Control lacks critical observability layers |
| Correcting | Coverage remediation in progress with owner and due date |

---

## Canonical Coverage Table

| Review ID | Control Artifact | Criticality | Signals Defined (Y/N) | Alerts Active (Y/N) | Diagnostics Linked (Y/N) | Status | Gap Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| OCR-001 |  |  |  |  |  |  |  |  |
| OCR-002 |  |  |  |  |  |  |  |  |
| OCR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing observability-coverage review:
- [ ] all in-scope controls are listed and criticality-mapped,
- [ ] each control has declared health signals and thresholds,
- [ ] each control has active alert routing and owner assignment,
- [ ] diagnostic references are current and accessible,
- [ ] blind/partial controls have remediation owners and due dates.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control is Blind,
- blind spot count is >0 for 2 consecutive cycles,
- alert actionability drops below target for 2 cycles,
- incident occurs where observability gaps delayed detection or response.

Escalation output must include:
- blind/partial control list with risk impact summary,
- observability remediation plan with accountable owners,
- dated verification checkpoint for restored coverage.

---

## Integration Points

Use with:
- `ALIGNMENT-LEADING-INDICATOR-WATCHLIST.md`
- `ALIGNMENT-ALERT-FATIGUE-REVIEW.md`
- `ALIGNMENT-THRESHOLD-CALIBRATION-REVIEW.md`
- `ALIGNMENT-CONTROL-CRITICALITY-MAP.md`
- `ALIGNMENT-COMMAND-CENTER.md`
