# Alignment Closure Integrity Audit

Use this artifact to validate that “closed” statuses across alignment workflows are evidence-backed and audit-safe.

False closures hide unresolved risk and create decision confidence that is not real.

---

## Purpose

This audit ensures:
- closures are allowed only when quality-gate criteria are met,
- closure evidence is linked, current, and reproducible,
- reopened-item patterns are detected and corrected quickly.

---

## Workflows in Scope

Run closure-integrity checks for:
- decisions,
- escalations,
- corrective actions,
- blockers/dependencies,
- incident hotwash actions.

---

## Closure Integrity Metrics

| Metric | Definition | Target |
|---|---|---:|
| Valid Closure Rate | % closed items passing all required closure checks | ≥ 95% |
| Reopen After Close Rate | % closed items reopened within 30 days | ≤ 10% |
| Evidence-Linked Closure Rate | % closed items with explicit evidence link | 100% |
| Stale-Evidence Closure Count | Closed items supported by expired evidence | 0 |
| Closure Audit Lag | Time from closure event to audit verification | ≤ 3 business days |

---

## Closure Failure Classes

| Class | Description | Example |
|---|---|---|
| CF-1 Evidence Gap | Item closed without required proof | “Done” note but no metric/outcome link |
| CF-2 Process Gap | Mandatory closure steps skipped | No owner sign-off on high-severity item |
| CF-3 Data Freshness Gap | Closure validated with expired/contaminated data | Dependent anomaly still unresolved |
| CF-4 Traceability Gap | Closure not linked to source issue/workflow | Orphan closed row in tracker |

---

## Canonical Closure Audit Table

| Audit ID | Item Type | Item ID | Close Date | Auditor | Integrity Result (Pass/Fail) | Failure Class | Correction Needed | Correction Owner | Recheck Date |
|---|---|---|---|---|---|---|---|---|---|
| CIA-001 |  |  |  |  |  |  |  |  |  |
| CIA-002 |  |  |  |  |  |  |  |  |  |
| CIA-003 |  |  |  |  |  |  |  |  |  |

---

## Mandatory Closure Checks

Before accepting closure as valid:
- [ ] closure criteria for that workflow are fully met,
- [ ] linked evidence is present and current,
- [ ] source issue/action linkage is complete,
- [ ] accountable owner sign-off is captured,
- [ ] recurrence watch date is assigned (for high-severity items).

If any box is unchecked, mark closure invalid and reopen item.

---

## Weekly Audit Routine

1. Sample all high-severity closures from current week.
2. Random-sample at least 20% of medium/low-severity closures.
3. Log pass/fail result and correction actions.
4. Track failure-class trend month-over-month.

---

## Escalation Triggers

Escalate when:
- valid closure rate drops below 90% in any week,
- same closure failure class appears 3+ times in one month,
- stale-evidence closures are detected in P0/P1 workflows,
- reopen-after-close rate worsens for 2 consecutive months.

Escalation output must include:
- failure-class root cause summary,
- control/process update owner and due date,
- target closure-integrity metric recovery plan.

---

## Integration Points

Use with:
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-ESCALATION-EFFECTIVENESS-REVIEW.md`
- `ALIGNMENT-EVIDENCE-REFRESH-SCHEDULE.md`
- `ALIGNMENT-TRACEABILITY-MATRIX.md`
- `ALIGNMENT-COMMAND-CENTER.md`
