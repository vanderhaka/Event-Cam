# Alignment Decision Authority Compliance

Use this artifact to verify that high-impact decisions are approved by the correct authority level and routed through the proper governance path.

When decision authority is bypassed, teams create reversals, ownership disputes, and trust erosion.

---

## Purpose

This review ensures:
- authority requirements are explicit by decision class,
- approvals are executed by authorized roles only,
- unauthorized decisions are identified and corrected quickly.

---

## Scope

Track authority compliance for:
- all P0 decisions,
- high-impact P1 decisions,
- override-linked and policy-impacting decisions,
- decisions affecting pricing, path, or operating mode.

---

## Authority Compliance Metrics

| Metric | Definition | Target |
|---|---|---:|
| Authorized Approval Rate | % in-scope decisions approved by required authority role | 100% |
| Unauthorized Approval Count | In-scope decisions approved without required authority | 0 |
| Authority-Route Compliance Rate | % decisions routed through correct decision forum/cadence | ≥ 95% |
| Correction Lead Time | Time to correct/ratify unauthorized decisions | ≤ 2 business days |
| Repeat Authority Violation Count | Repeated violations by same workflow/owner pair | declining trend |

---

## Authority Status Model

| Status | Meaning |
|---|---|
| Compliant | Correct authority approved and route followed |
| Minor Violation | Route deviation with low impact; authority still valid |
| Material Violation | Required authority missing or incorrect |
| Correcting | Ratification/correction in progress |

---

## Canonical Compliance Table

| Review ID | Decision ID | Required Authority | Actual Approver | Route Correct (Y/N) | Status | Impact Note | Correction Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| DAC-001 |  |  |  |  |  |  |  |  |
| DAC-002 |  |  |  |  |  |  |  |  |
| DAC-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing authority compliance review:
- [ ] authority requirements are current and role-mapped,
- [ ] all in-scope decisions are checked,
- [ ] material violations include impact disclosure,
- [ ] correction owners and due dates are assigned,
- [ ] corrected decisions are revalidated in log/packet artifacts.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any P0 decision has Material Violation status,
- unauthorized approval count >0 for two consecutive cycles,
- same authority violation pattern repeats in one month,
- material violation affects active path commitments.

Escalation output must include:
- violating decision list and exposure summary,
- authority route correction actions,
- dated verification checkpoint for restored compliance.

---

## Integration Points

Use with:
- `ALIGNMENT-PRIORITY0-DECISION-BRIEF.md`
- `ALIGNMENT-DECISIONS-LOG.md`
- `ALIGNMENT-DECISION-PACKET-COMPLIANCE.md`
- `ALIGNMENT-CONTROL-PRECEDENCE-RULES.md`
- `ALIGNMENT-COMMAND-CENTER.md`
