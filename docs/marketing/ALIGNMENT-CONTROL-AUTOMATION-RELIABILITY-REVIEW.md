# Alignment Control Automation Reliability Review

Use this artifact to verify that automated controls run reliably and continue producing valid governance outcomes.

Automation can reduce manual load, but unreliable automation creates silent, high-scale control failures.

---

## Purpose

This review ensures:
- automated controls execute on schedule with expected quality,
- automation failures are detected and corrected before they propagate,
- manual fallback paths are ready when automation degrades.

---

## Scope

Track automation reliability for:
- all automated CC-1 controls,
- automated CC-2 controls affecting active P0/P1 decisions,
- newly launched or recently changed automations.

---

## Reliability Metrics

| Metric | Definition | Target |
|---|---|---:|
| Automation Success Rate | % scheduled automation runs completed without material failure | ≥ 99% |
| Failed Automation Count | Number of failed/partial automation runs in cycle | 0 |
| Mean Time to Recover (MTTR) | Time from automation failure detection to restored reliable operation | ≤ 1 business day |
| Fallback Readiness Rate | % automated controls with current tested manual fallback | 100% |
| Silent Failure Count | Failures discovered only after downstream impact (no alert at failure time) | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Reliable | Automation runs consistently and fallback path is ready |
| Watch | Isolated failures or degraded performance; no material impact yet |
| At Risk | Repeated failures, stale fallback, or silent-failure evidence |
| Recovering | Reliability remediation underway with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Automation Job/Flow | Success Rate | Failures (count) | Fallback Tested (Y/N) | Status | Reliability Owner | Action Due |
|---|---|---|---:|---:|---|---|---|---|
| CAR-001 |  |  |  |  |  |  |  |  |
| CAR-002 |  |  |  |  |  |  |  |  |
| CAR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing automation-reliability review:
- [ ] all in-scope automated controls are listed,
- [ ] success/failure evidence is linked for each automation,
- [ ] fallback paths are current and tested,
- [ ] at-risk automations have remediation owners and due dates,
- [ ] silent-failure causes are root-caused and actioned.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any automated CC-1 control enters At Risk,
- failed automation count >0 for 2 consecutive cycles,
- fallback readiness drops below target,
- silent failure occurs on any high-impact automation.

Escalation output must include:
- impacted automation list and downstream exposure summary,
- remediation + fallback actions with accountable owners,
- dated verification checkpoint proving restored reliability.

---

## Integration Points

Use with:
- `ALIGNMENT-AUTOMATION-PRIORITIZATION-SCORECARD.md`
- `ALIGNMENT-CONTROL-FAILURE-MODES.md`
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-CONTROL-TEST-COVERAGE-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
