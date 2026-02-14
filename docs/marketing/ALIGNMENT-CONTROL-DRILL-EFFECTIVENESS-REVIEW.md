# Alignment Control Drill Effectiveness Review

Use this artifact to verify that control and runbook drills actually improve execution reliability under pressure.

Running drills without measuring quality creates false confidence and leaves critical gaps uncorrected.

---

## Purpose

This review ensures:
- drills test the highest-risk control failure paths,
- execution quality is measured against explicit success criteria,
- drill findings convert into verified corrective actions.

---

## Scope

Track drill effectiveness for:
- all CC-1 controls and selected CC-2 controls,
- controls with recent incidents/escalations,
- controls with updated runbooks in current quarter.

---

## Effectiveness Metrics

| Metric | Definition | Target |
|---|---|---:|
| Drill Completion Rate | % scheduled drills executed on time | ≥ 95% |
| First-Pass Success Rate | % drills completing without material step failure | ≥ 90% |
| Critical-Step Omission Count | Number of missed mandatory steps across drills | 0 |
| Time-to-Stabilization (Drill) | Median time to execute stabilization path in drills | improving trend |
| Corrective-Action Closure Rate | % drill actions verified closed by due date | ≥ 95% |

---

## Effectiveness Status Model

| Status | Meaning |
|---|---|
| Effective | Drill outcomes meet quality thresholds and actions close on time |
| Watch | Minor quality drift or isolated delayed closures |
| At Risk | Repeated material drill failures or action backlog growth |
| Recovering | Remediation underway with owner and dated verification checkpoint |

---

## Canonical Review Table

| Review ID | Control Artifact | Drill Scenario | Completed On Time (Y/N) | First-Pass Success (Y/N) | Critical Steps Missed (count) | Stabilization Time | Corrective Actions Open | Status |
|---|---|---|---|---|---:|---|---:|---|
| CDR-001 |  |  |  |  |  |  |  |  |
| CDR-002 |  |  |  |  |  |  |  |  |
| CDR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing drill-effectiveness review:
- [ ] in-scope controls and scenarios are risk-ranked and current,
- [ ] drill outcomes include explicit pass/fail evidence,
- [ ] critical-step misses are root-caused and actioned,
- [ ] corrective actions have owners and due dates,
- [ ] reopened/recurring drill failures are flagged for escalation.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 drill has repeated critical-step omissions,
- first-pass success rate drops below threshold for 2 cycles,
- corrective-action closure rate remains below target for 2 cycles,
- drill stabilization time worsens materially across consecutive cycles.

Escalation output must include:
- failed drill scenarios and risk exposure,
- corrective action plan with accountable owners,
- next verification date confirming recovery.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-RUNBOOK-COVERAGE-REVIEW.md`
- `ALIGNMENT-CONTROL-FAILURE-MODES.md`
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-ESCALATION-EFFECTIVENESS-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
