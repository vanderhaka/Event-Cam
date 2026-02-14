# Alignment Control Risk Transfer Review

Use this artifact to govern cases where control risk is transferred to external parties, systems, or contractual safeguards.

Risk transfer without explicit validation creates false security and hidden operational exposure.

---

## Purpose

This review ensures:
- transferred risks are explicitly defined and approved,
- transfer mechanisms are verifiable, enforceable, and monitored,
- residual internal exposure is understood after transfer.

---

## Scope

Run this review for:
- CC-1 controls with outsourced or vendor-dependent safeguards,
- CC-2 controls where contractual/process transfer is used instead of direct mitigation,
- accepted residual risks relying on partner or third-party commitments.

---

## Transfer Metrics

| Metric | Definition | Target |
|---|---|---:|
| Transfer Documentation Coverage | % in-scope transfers with complete documented terms and responsibilities | 100% |
| Verified Transfer Effectiveness Rate | % transfers with evidence that risk obligations are actively met | ≥ 95% |
| Failed Transfer Count | Transfers where obligations were unmet or unenforceable | 0 |
| Residual Exposure After Transfer Count | Transfers leaving unmanaged internal exposure above threshold | 0 |
| Transfer Revalidation Timeliness | % active transfers revalidated within cadence | 100% |

---

## Status Model

| Status | Meaning |
|---|---|
| Effective Transfer | Transfer terms are valid, enforceable, and performing |
| Watch Transfer | Minor weakness in evidence, coverage, or monitoring |
| Failed Transfer | Material obligation failure or unenforceable transfer terms |
| Recovering | Transfer remediation/replacement underway with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Transferred Risk ID | Transfer Mechanism | Effectiveness Verified (Y/N) | Residual Exposure Acceptable (Y/N) | Status | Owner | Revalidation Due |
|---|---|---|---|---|---|---|---|---|
| CTR-001 |  |  |  |  |  |  |  |  |
| CTR-002 |  |  |  |  |  |  |  |  |
| CTR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing risk-transfer review:
- [ ] all in-scope transfers are listed with current terms,
- [ ] verification evidence is linked for each transfer,
- [ ] failed/watch transfers include exposure impact notes,
- [ ] remediation owners and due dates are assigned,
- [ ] revalidation windows are scheduled and tracked.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 transfer enters Failed Transfer status,
- failed transfer count >0 for two consecutive cycles,
- residual exposure after transfer count >0 in any cycle,
- transfer revalidation timeliness drops below target.

Escalation output must include:
- failed/weak transfer list and exposure summary,
- remediation or replacement package with accountable owners,
- dated checkpoint confirming restored transfer effectiveness.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-RESIDUAL-RISK-REVIEW.md`
- `ALIGNMENT-CONTROL-RISK-ACCEPTANCE-REVIEW.md`
- `ALIGNMENT-POLICY-EXCEPTION-REVIEW.md`
- `ALIGNMENT-DATA-SOURCE-RELIABILITY-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
