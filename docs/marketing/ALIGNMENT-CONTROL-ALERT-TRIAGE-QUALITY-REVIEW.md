# Alignment Control Alert Triage Quality Review

Use this artifact to verify that critical control alerts are triaged accurately, quickly, and to the right owner.

Alert volume alone is not the problem—poor triage quality turns signal into noise and delays real risk response.

---

## Purpose

This review ensures:
- critical alerts are classified and routed correctly on first triage,
- triage quality remains high under sustained alert load,
- repeated mis-triage patterns are corrected before they create incidents.

---

## Scope

Run this review for:
- all alerts tied to CC-1 controls,
- high-severity alerts on CC-2 controls,
- alert streams with recent fatigue, misses, or escalations.

---

## Triage Quality Metrics

| Metric | Definition | Target |
|---|---|---:|
| First-Triage Accuracy Rate | % alerts correctly classified/routed on first pass | ≥ 95% |
| Mis-Triage Count | Alerts initially misclassified, mis-prioritized, or misrouted | 0 |
| Critical Alert Misroute Count | CC-1 critical alerts routed to wrong owner/workflow | 0 |
| Median Triage Decision Time | Time from alert creation to triage decision | improving trend |
| Repeat Mis-Triage Pattern Count | Recurring mis-triage categories across cycles | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| Accurate | Triage outcomes are correct and timely |
| Watch | Minor triage quality drift without material impact |
| At Risk | Material triage errors increasing exposure |
| Recovering | Triage-quality remediation underway with owner and due date |

---

## Canonical Review Table

| Review ID | Alert Stream | Alert Severity | First-Triage Correct (Y/N) | Routed Owner Correct (Y/N) | Triage Time | Status | Correction Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| ATQ-001 |  |  |  |  |  |  |  |  |
| ATQ-002 |  |  |  |  |  |  |  |  |
| ATQ-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing alert-triage quality review:
- [ ] in-scope alerts are sampled across severity tiers,
- [ ] first-triage decisions are validated against policy and precedence,
- [ ] mis-triage cases include root-cause classification,
- [ ] correction owners and due dates are assigned,
- [ ] high-severity streams have verified triage play updates.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 critical alert is misrouted,
- mis-triage count >0 for two consecutive cycles,
- first-triage accuracy rate drops below target for 2 cycles,
- repeat mis-triage patterns cluster by same owner/workflow.

Escalation output must include:
- mis-triage case list and exposure summary,
- triage-policy/training corrections with accountable owners,
- dated verification checkpoint showing restored triage quality.

---

## Integration Points

Use with:
- `ALIGNMENT-ALERT-FATIGUE-REVIEW.md`
- `ALIGNMENT-ESCALATION-EFFECTIVENESS-REVIEW.md`
- `ALIGNMENT-THRESHOLD-CALIBRATION-REVIEW.md`
- `ALIGNMENT-CONTROL-PRECEDENCE-RULES.md`
- `ALIGNMENT-COMMAND-CENTER.md`
