# Alignment Definition of Done Compliance

Use this artifact to verify that items marked **Done/Closed** satisfy explicit completion criteria before closure.

When teams close work without a shared definition of done, execution quality drops and reopen churn increases.

---

## Purpose

This review ensures:
- closure criteria are explicit and consistent across workflows,
- items are not marked done before evidence and quality checks are complete,
- premature closure patterns are detected and corrected quickly.

---

## Scope

Apply this review to:
- all P0 and high-impact P1 decisions,
- corrective actions and recovery plans,
- policy exceptions and control-change packets,
- any workflow with reopen/rework trend above threshold.

---

## Compliance Metrics

| Metric | Definition | Target |
|---|---|---:|
| Done-Criteria Coverage Rate | % in-scope item types with explicit, current done criteria | 100% |
| Verified Closure Rate | % in-scope closed items meeting all done criteria on first audit | ≥ 95% |
| Premature Closure Count | Closed items failing one or more mandatory done checks | 0 |
| Reopen-after-Close Rate | % items reopened due to incomplete closure quality | declining trend |
| Closure Correction Lead Time | Time to remediate premature closure findings | ≤ 3 business days |

---

## Compliance Status Model

| Status | Meaning |
|---|---|
| Compliant | All required done checks passed with valid evidence |
| Minor Gap | Low-risk done-check omission with no material impact |
| Material Gap | Mandatory done checks missing or invalid |
| Correcting | Gap remediation in progress with owner and due date |

---

## Canonical Compliance Table

| Review ID | Item ID | Workflow Type | Required Done Criteria Complete (Y/N) | Evidence Linked (Y/N) | Status | Gap Summary | Correction Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| DOD-001 |  |  |  |  |  |  |  |  |
| DOD-002 |  |  |  |  |  |  |  |  |
| DOD-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing definition-of-done compliance review:
- [ ] done criteria are documented and current for every in-scope workflow type,
- [ ] sampled in-scope closed items are fully checked against criteria,
- [ ] all Material Gap items include impact notes,
- [ ] correction owners and due dates are assigned for each gap,
- [ ] corrected items are revalidated in canonical logs.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any P0 item closes with Material Gap status,
- premature closure count is >0 for two consecutive cycles,
- reopen-after-close rate worsens for two cycles,
- repeated done-criteria gaps affect active quarter commitments.

Escalation output must include:
- non-compliant item list and impact summary,
- criteria and workflow fixes with accountable owners,
- dated verification checkpoint proving restored closure integrity.

---

## Integration Points

Use with:
- `ALIGNMENT-CLOSURE-INTEGRITY-AUDIT.md`
- `ALIGNMENT-STATE-MACHINE.md`
- `ALIGNMENT-EVIDENCE-LINKAGE-COMPLIANCE.md`
- `ALIGNMENT-DECISION-PACKET-COMPLIANCE.md`
- `ALIGNMENT-COMMAND-CENTER.md`
