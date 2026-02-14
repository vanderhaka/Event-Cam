# Alignment Data Quality Checklist

> Use before weekly KPI review to ensure decisions are based on trustworthy data.

---

## Pre-Review Validation (Required)

- [ ] Data extraction window matches reporting window.
- [ ] All KPI formulas match `ALIGNMENT-METRIC-DEFINITIONS.md`.
- [ ] Event timestamps are normalized to the agreed timezone.
- [ ] Duplicate records and obvious outliers are reviewed and annotated.
- [ ] Any missing source feed is documented before KPI meeting.

---

## Funnel Data Checks

- [ ] Visitor counts sourced from the same analytics environment each week.
- [ ] Signup counts reconcile with auth/user creation logs.
- [ ] Event creation counts reconcile with API/app event logs.
- [ ] Paid status reconciles with canonical billing source.

---

## Loop & Partner Data Checks

- [ ] Guest capture records are valid (no malformed email inflation).
- [ ] Opt-in counts reflect consent logic correctly (regional rules respected).
- [ ] Referral attribution windows are applied consistently.
- [ ] Partner activation metrics exclude test/internal accounts.

---

## Economics Data Checks

- [ ] Spend inputs include only eligible channel costs for CAC.
- [ ] Revenue attribution follows agreed source-of-truth rules.
- [ ] Variable cost assumptions are current and versioned.
- [ ] Payback calculations use current contribution margin assumptions.

---

## Exception Logging

If any check fails:

1. Log issue in `ALIGNMENT-BLOCKERS-LOG.md` (Measurement category).
2. Mark severity and owner.
3. Note impacted KPI(s) in weekly dashboard.
4. Apply correction before making scale/hold/kill decisions.

---

## Review Sign-off

| Role | Name | Sign-off | Date |
|---|---|---|---|
| Data owner |  |  |  |
| Growth lead |  |  |  |
| Ops / PMO |  |  |  |

