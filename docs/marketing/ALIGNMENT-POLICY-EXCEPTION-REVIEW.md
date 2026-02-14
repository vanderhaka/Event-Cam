# Alignment Policy Exception Review

Use this artifact to review patterns of policy exceptions and determine whether they indicate justified flexibility or systemic control gaps.

Exception volume without periodic review creates shadow policy and erodes governance credibility.

---

## Purpose

This review ensures:
- exceptions remain rare, explicit, and time-bounded,
- repeated exceptions trigger policy redesign instead of silent drift,
- leadership has visibility into exception risk concentration.

---

## Scope

Review exceptions from:
- override register entries,
- expedited decision approvals,
- evidence-expiry waivers,
- temporary control bypasses in incidents/recoveries.

---

## Exception Metrics

| Metric | Definition | Target |
|---|---|---:|
| Open Exception Count | Number of active exceptions not yet closed | low and stable |
| Exception Recurrence Rate | % exceptions repeating same control/topic within 30 days | ≤ 15% |
| Expired Exception Rate | % exceptions past expiry without closure action | 0% |
| Exception-to-Incident Link Rate | % exceptions associated with negative outcomes/incidents | declining trend |
| Policy-Update Yield | % recurring exception themes converted to policy/control updates | ≥ 70% |

---

## Exception Severity Model

| Severity | Meaning | Review Timing |
|---|---|---:|
| EX-1 Critical | Exception affects P0 decisions, legal/compliance, or data integrity | Same-week review |
| EX-2 High | Exception materially weakens decision quality or control reliability | Weekly review |
| EX-3 Moderate | Limited-scope exception with bounded impact | Bi-weekly review |

---

## Canonical Exception Review Table

| Exception ID | Control/Policy Bypassed | Severity | Open Date | Expiry Date | Recurrence (Y/N) | Linked Outcome Risk | Review Decision (Keep Temporary/Update Policy/Cancel) | Owner |
|---|---|---|---|---|---|---|---|---|
| PER-001 |  |  |  |  |  |  |  |  |
| PER-002 |  |  |  |  |  |  |  |  |
| PER-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before accepting exception review output:
- [ ] every open exception has owner and valid expiry date,
- [ ] recurring exceptions have root-cause classification,
- [ ] linked outcomes/incidents are analyzed,
- [ ] policy-update decision is explicit for recurring themes,
- [ ] closure or extension decision is time-bound and approved.

If any item is unchecked, review is incomplete.

---

## Decision Rules

- One-off justified exception with no adverse impact → keep temporary and close on expiry.
- Repeated exception on same control → propose control/policy update packet.
- Exception linked to incident/negative outcome → cancel exception and run immediate corrective action.
- Exception repeatedly extended without closure evidence → escalate as governance incident.

---

## Escalation Triggers

Escalate when:
- 3+ exceptions are simultaneously past expiry,
- same policy is excepted 2+ times in one month,
- any EX-1 exception remains open beyond expiry,
- exception recurrence rises for 2 consecutive cycles.

Escalation output must include:
- policy-gap summary,
- owner and deadline for policy/control correction,
- short-term compensating controls until closure.

---

## Integration Points

Use with:
- `ALIGNMENT-OVERRIDE-REGISTER.md`
- `ALIGNMENT-CONTROL-CHANGE-PROTOCOL.md`
- `ALIGNMENT-CONTROL-PRECEDENCE-RULES.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
