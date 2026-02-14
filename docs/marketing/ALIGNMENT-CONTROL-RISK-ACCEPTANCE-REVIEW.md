# Alignment Control Risk Acceptance Review

Use this artifact to govern when and how residual control risk is explicitly accepted instead of immediately remediated.

Unstructured risk acceptance creates hidden exposure and weakens accountability for high-impact tradeoffs.

---

## Purpose

This review ensures:
- risk-acceptance decisions are explicit, time-bounded, and authority-approved,
- accepted risks are measurable and monitored until closure,
- repeated acceptance patterns trigger structural risk-reduction action.

---

## Scope

Run this review for:
- all CC-1 controls with unresolved exposed residual risk,
- CC-2 controls where mitigation is deferred beyond one cycle,
- risk acceptances tied to active P0/P1 decisions or major dependencies.

---

## Acceptance Metrics

| Metric | Definition | Target |
|---|---|---:|
| Approved Acceptance Coverage Rate | % active accepted risks with documented authority approval | 100% |
| Expired Acceptance Count | Accepted risks past expiry date without re-approval or closure | 0 |
| Unmonitored Accepted Risk Count | Accepted risks lacking active monitoring signals and owners | 0 |
| Acceptance-to-Mitigation Conversion Rate | % accepted risks transitioned to mitigation/closure by target date | improving trend |
| Repeat Acceptance Pattern Count | Same risk class repeatedly accepted across cycles | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| Accepted (Controlled) | Risk accepted with valid approval, monitoring, and expiry |
| Watch | Acceptance nearing expiry or monitoring weakness detected |
| Breached | Acceptance expired, unapproved, or missing monitoring controls |
| Recovering | Acceptance remediation or conversion-to-mitigation underway |

---

## Canonical Review Table

| Review ID | Control Artifact | Risk ID | Authority Approved (Y/N) | Acceptance Expiry Date | Monitoring Active (Y/N) | Status | Owner | Next Decision Date |
|---|---|---|---|---|---|---|---|---|
| CARA-001 |  |  |  |  |  |  |  |  |
| CARA-002 |  |  |  |  |  |  |  |  |
| CARA-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing risk-acceptance review:
- [ ] all active accepted risks are listed with approvals and expiry dates,
- [ ] monitoring owner and signal references are linked,
- [ ] breached acceptances have remediation owners and due dates,
- [ ] repeat acceptance patterns are root-caused,
- [ ] conversion/closure decisions are documented.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 accepted risk enters Breached status,
- expired acceptance count >0 for two consecutive cycles,
- unmonitored accepted risk count >0 in any cycle,
- repeat acceptance pattern grows in same control domain.

Escalation output must include:
- breached acceptance list and exposure summary,
- remediation/conversion plan with accountable owners,
- dated checkpoint confirming restored acceptance governance.

---

## Integration Points

Use with:
- `ALIGNMENT-OVERRIDE-REGISTER.md`
- `ALIGNMENT-CONTROL-RESIDUAL-RISK-REVIEW.md`
- `ALIGNMENT-POLICY-EXCEPTION-REVIEW.md`
- `ALIGNMENT-DECISION-AUTHORITY-COMPLIANCE.md`
- `ALIGNMENT-COMMAND-CENTER.md`
