# Alignment Override Register

Use this artifact to log and govern exceptions to standard alignment controls.

Overrides are sometimes necessary, but unlogged exceptions destroy trust in governance rules.

---

## Purpose

This register ensures:
- every control override is explicit and time-bounded,
- override rationale and risk ownership are documented,
- temporary exceptions do not become permanent shadow policy.

---

## When an Override Is Required

Create an override entry whenever a team bypasses a required rule, such as:
- approving with expired evidence,
- closing low-confidence decisions without full mitigation,
- exceeding WIP limits,
- bypassing normal decision SLA timing,
- running without required packet inputs.

---

## Override Principles

1. **Explicit** — no implicit exceptions.
2. **Temporary** — every override has expiry date.
3. **Owned** — a single accountable risk owner is required.
4. **Compensating Control** — mitigation must be defined before approval.
5. **Auditable** — all outcomes reviewed after expiry.

---

## Canonical Override Register

| Override ID | Date Opened | Control Bypassed | Reason | Risk Owner | Compensating Control | Expiry Date | Status (Open/Closed/Expired) | Outcome Review Date |
|---|---|---|---|---|---|---|---|---|
| OVR-001 |  |  |  |  |  |  |  |  |
| OVR-002 |  |  |  |  |  |  |  |  |
| OVR-003 |  |  |  |  |  |  |  |  |

---

## Override Approval Rules

- P0-related overrides require leadership approval.
- No override may exceed 14 calendar days without re-approval.
- Open overrides must be reviewed weekly in decision review.
- Expired overrides without closure are treated as governance incidents.

---

## Outcome Review Requirements

At override closure, record:
- whether compensating control worked,
- any adverse impact observed,
- whether base policy should be changed,
- whether a reversal or incident hotwash is required.

---

## Escalation Triggers

Escalate immediately when:
- 3+ overrides are open simultaneously,
- same control is overridden twice in one month,
- override expires without closure action,
- override contributed to contradiction, KPI anomaly, or decision reversal.

Escalation output must include:
- decision to close/extend/cancel override,
- owner accountability update,
- policy correction if systemic gap is confirmed.

---

## Integration Points

Use with:
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-DECISION-CONFIDENCE-INDEX.md`
- `ALIGNMENT-EVIDENCE-REFRESH-SCHEDULE.md`
- `ALIGNMENT-INCIDENT-HOTWASH-TEMPLATE.md`
