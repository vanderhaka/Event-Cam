# Alignment Assumption Drift Review

Use this artifact to detect when core strategic assumptions have drifted away from current evidence and operating reality.

Assumptions silently going stale is a common cause of mispriced decisions, weak forecasts, and repeated rework.

---

## Purpose

This review ensures:
- high-impact assumptions are periodically revalidated,
- assumption drift is detected before major decisions are finalized,
- decision confidence is adjusted when assumption quality degrades.

---

## Scope

Review assumption drift for:
- pricing and conversion assumptions,
- channel efficiency and payback assumptions,
- partner/referral behavior assumptions,
- operating-capacity and governance-effort assumptions.

---

## Drift Metrics

| Metric | Definition | Target |
|---|---|---:|
| Revalidated Assumption Rate | % in-scope assumptions rechecked within planned cadence | ≥ 90% |
| Material Drift Count | Number of assumptions with evidence shift beyond tolerance | low and declining |
| Decision Exposure Rate | % active P0/P1 decisions dependent on drifted assumptions | ≤ 15% |
| Drift-to-Action Lag | Time from drift detection to mitigation/reforecast action | ≤ 5 business days |
| Assumption Stability Index | % assumptions remaining within expected variance band | stable trend |

---

## Drift Status Model

| Status | Meaning |
|---|---|
| Stable | Assumption remains supported by current evidence |
| Watch | Minor variance from baseline; monitor closely |
| Drifted | Material variance requiring mitigation or decision adjustment |
| Rebased | Assumption formally updated with new baseline |

---

## Canonical Drift Table

| Assumption ID | Domain | Baseline Statement | Current Evidence Signal | Drift Status | Decision Exposure (Y/N) | Owner | Mitigation/Rebase Due |
|---|---|---|---|---|---|---|---|
| ADR-001 |  |  |  |  |  |  |  |
| ADR-002 |  |  |  |  |  |  |  |
| ADR-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing drift review:
- [ ] all high-impact assumptions were evaluated,
- [ ] supporting evidence is current and source-linked,
- [ ] drifted assumptions include decision exposure mapping,
- [ ] mitigation/rebase actions have owners and dates,
- [ ] confidence/forecast updates are reflected in dependent artifacts.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- 3+ high-impact assumptions are Drifted in same cycle,
- drifted assumptions remain unmitigated beyond due date,
- drift affects active P0/P1 decisions without packet updates,
- repeated drift occurs in same domain for 2+ cycles.

Escalation output must include:
- drift concentration summary by domain,
- assumption rebase/decision-adjustment plan,
- verification date for stabilized baseline.

---

## Integration Points

Use with:
- `ALIGNMENT-ASSUMPTION-REGISTRY.md`
- `ALIGNMENT-EVIDENCE-REFRESH-SCHEDULE.md`
- `ALIGNMENT-DECISION-CONFIDENCE-INDEX.md`
- `ALIGNMENT-DECISION-PACKET-COMPLIANCE.md`
- `ALIGNMENT-COMMAND-CENTER.md`
