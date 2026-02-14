# Alignment Review Cadence Compliance

Use this artifact to verify that required weekly/monthly/quarterly reviews are actually run on time with complete inputs.

A strong governance design fails if review cadence is inconsistent or skipped under pressure.

---

## Purpose

This compliance tracker ensures:
- mandatory reviews occur at required frequency,
- required inputs are ready before each review,
- missed reviews trigger fast recovery actions.

---

## Reviews in Scope

Track compliance for:
- weekly command-center and executive packet review,
- weekly decision and KPI review loops,
- monthly calibration/ROI/strategy sync reviews,
- quarterly portfolio and reset reviews.

---

## Cadence Compliance Metrics

| Metric | Definition | Target |
|---|---|---:|
| On-Time Review Rate | % scheduled reviews held on or before due date | ≥ 95% |
| Input Completeness Rate | % reviews started with all required inputs ready | ≥ 90% |
| Deferred Review Count | Number of reviews deferred beyond cadence window | 0 |
| Recovery Lead Time | Time from missed review to executed catch-up review | ≤ 5 business days |
| Repeat Miss Rate | % review types missed in consecutive cycles | ≤ 10% |

---

## Compliance Status Model

| Status | Meaning |
|---|---|
| Compliant | Review held on time with complete inputs |
| At Risk | Review scheduled but inputs incomplete or owner missing |
| Missed | Review not held within cadence window |
| Recovered | Catch-up review executed with remediation logged |

---

## Canonical Cadence Table

| Review Type | Required Cadence | Last Due Date | Actual Run Date | Input Complete (Y/N) | Status | Owner | Recovery Action |
|---|---|---|---|---|---|---|---|
| Weekly Command Center | Weekly |  |  |  |  |  |  |
| Weekly Executive Packet | Weekly |  |  |  |  |  |  |
| Monthly Strategy Sync | Monthly |  |  |  |  |  |  |
| Quarterly Portfolio Review | Quarterly |  |  |  |  |  |  |

---

## Pre-Review Readiness Gate

Before each review starts:
- [ ] required artifacts are updated within freshness SLA,
- [ ] all mandatory owners are present or delegated,
- [ ] unresolved critical data-quality blockers are disclosed,
- [ ] prior-cycle action follow-up status is available.

If any item is unchecked, status must be At Risk until resolved.

---

## Missed Review Recovery Protocol

When a review is Missed:
1. log reason class (capacity, data, ownership, dependency),
2. schedule catch-up review within 5 business days,
3. reduce non-critical agenda load for next cycle,
4. assign prevention action for recurrence reduction.

---

## Escalation Triggers

Escalate when:
- any monthly or quarterly review is missed,
- on-time review rate drops below 85% in any month,
- same review type is missed twice consecutively,
- missed review directly delays P0/P1 decision closure.

Escalation output must include:
- root cause class summary,
- owner/accountability correction,
- cadence recovery plan with dated checkpoints.

---

## Integration Points

Use with:
- `ALIGNMENT-MEETING-CADENCE.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-CONTROL-PORTFOLIO-REVIEW.md`
- `ALIGNMENT-QUARTER-RESET-PROTOCOL.md`
