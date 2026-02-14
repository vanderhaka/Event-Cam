# Alignment Control Dependency Change Impact Review

Use this artifact to evaluate downstream risk before changing dependencies that support critical controls.

Dependency changes can look local but trigger hidden cross-control failures when impact is not assessed upfront.

---

## Purpose

This review ensures:
- dependency changes are impact-assessed before rollout,
- high-risk downstream effects are mitigated before activation,
- post-change verification confirms expected control behavior.

---

## Scope

Run this review for:
- dependency changes affecting CC-1 controls,
- shared dependency changes touching multiple CC-2 controls,
- source, schema, or workflow changes tied to P0/P1 decision signals.

---

## Impact Metrics

| Metric | Definition | Target |
|---|---|---:|
| Pre-Change Impact Assessment Rate | % in-scope dependency changes with completed impact review before rollout | 100% |
| High-Risk Change Count | Changes flagged high-risk without full mitigation plan | 0 |
| Unanticipated Impact Count | Post-change control issues not identified in pre-change assessment | 0 |
| Impact Mitigation Closure Rate | % required mitigations completed before change activation | 100% |
| Post-Change Verification Completion Rate | % in-scope changes with completed verification within window | 100% |

---

## Status Model

| Status | Meaning |
|---|---|
| Assessed | Change impact analyzed; risks mitigated and approved |
| Watch | Moderate unresolved risk with conditional mitigation in progress |
| At Risk | Material unresolved impact risk blocks safe rollout |
| Verifying | Change live; post-change verification in progress |

---

## Canonical Review Table

| Review ID | Dependency Change ID | Affected Controls | Impact Assessment Complete (Y/N) | Mitigation Complete (Y/N) | Status | Impact Owner | Verification Due |
|---|---|---|---|---|---|---|---|
| DCI-001 |  |  |  |  |  |  |  |
| DCI-002 |  |  |  |  |  |  |  |
| DCI-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing dependency-change impact review:
- [ ] all in-scope dependency changes are logged,
- [ ] downstream control impacts are mapped and risk-rated,
- [ ] mitigation plans include owners and due dates,
- [ ] activation decision references impact evidence,
- [ ] post-change verification outcomes are linked.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 dependency change is At Risk at planned rollout date,
- unanticipated impact count >0 in any cycle,
- high-risk changes proceed without full mitigation closure,
- repeated unanticipated impacts occur in same dependency domain.

Escalation output must include:
- at-risk change list and downstream exposure summary,
- mitigation and rollback package with accountable owners,
- dated post-change verification checkpoint.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-DEPENDENCY-MAP.md`
- `ALIGNMENT-DEPENDENCY-RESOLUTION-SLA-REVIEW.md`
- `ALIGNMENT-CONTROL-CHANGE-PROTOCOL.md`
- `ALIGNMENT-CHANGE-IMPACT-ASSESSMENT.ATH`
- `ALIGNMENT-COMMAND-CENTER.md`
