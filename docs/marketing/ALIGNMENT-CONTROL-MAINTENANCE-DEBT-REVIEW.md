# Alignment Control Maintenance Debt Review

Use this artifact to identify and reduce overdue maintenance work that quietly degrades critical controls.

Maintenance debt compounds silently; controls can appear compliant while becoming harder to operate and recover.

---

## Purpose

This review ensures:
- overdue control maintenance is visible and prioritized,
- hidden debt on critical controls is reduced before incidents increase,
- recurring debt patterns trigger structural remediation.

---

## Scope

Run maintenance-debt review for:
- all CC-1 controls,
- CC-2 controls with repeated corrective actions or drift findings,
- controls with deferred updates older than one cycle.

---

## Debt Metrics

| Metric | Definition | Target |
|---|---|---:|
| Maintenance Debt Count | Number of overdue maintenance items across in-scope controls | 0 |
| Debt Age Weighted Score | Sum of open maintenance items weighted by age and criticality | declining trend |
| Critical Debt Item Count | Overdue maintenance items on CC-1 controls | 0 |
| Debt Closure Rate | % maintenance debt items closed within target SLA | ≥ 95% |
| Repeat Debt Pattern Count | Controls repeatedly carrying overdue maintenance debt across cycles | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| Healthy | No material maintenance debt on control |
| Watch | Manageable debt present; requires near-term closure |
| At Risk | Debt level threatens control reliability/compliance |
| Recovering | Debt-reduction actions underway with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Criticality | Open Debt Items | Oldest Debt Age (days) | Critical Debt (Y/N) | Status | Debt Owner | Closure Due |
|---|---|---|---:|---:|---|---|---|---|
| CMR-001 |  |  |  |  |  |  |  |  |
| CMR-002 |  |  |  |  |  |  |  |  |
| CMR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing maintenance-debt review:
- [ ] all in-scope controls are listed with current debt counts,
- [ ] debt items have age and criticality classification,
- [ ] at-risk debt items have owners and due dates,
- [ ] repeat debt patterns are root-caused,
- [ ] closed items include verification evidence.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control has Critical Debt item older than SLA,
- maintenance debt count increases for 2 consecutive cycles,
- debt closure rate drops below target for 2 cycles,
- repeat debt patterns cluster in one control family.

Escalation output must include:
- at-risk debt list and control exposure summary,
- debt-burn remediation package with accountable owners,
- dated checkpoint confirming debt stabilization.

---

## Integration Points

Use with:
- `ALIGNMENT-BACKLOG-AGING-REVIEW.md`
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-CONTROL-LIFECYCLE-ANALYSIS.md`
- `ALIGNMENT-INTERVENTION-PRIORITIZATION-MATRIX.md`
- `ALIGNMENT-COMMAND-CENTER.md`
