# Alignment Control Recovery Evidence Quality Review

Use this artifact to verify that declared control recoveries are supported by high-quality, decision-safe evidence.

Recoveries without credible evidence create false closure and repeat failure risk.

---

## Purpose

This review ensures:
- recovery claims are backed by complete, current, and traceable evidence,
- weak recovery evidence is detected before closure decisions are finalized,
- repeated evidence-quality failures trigger stricter recovery standards.

---

## Scope

Run this review for:
- all CC-1 recovery actions,
- CC-2 recoveries tied to active P0/P1 decisions,
- recoveries triggered by incidents, escalations, or repeated drift patterns.

---

## Evidence Quality Metrics

| Metric | Definition | Target |
|---|---|---:|
| Recovery Evidence Pass Rate | % in-scope recoveries meeting all evidence-quality requirements | 100% |
| Insufficient Evidence Count | Recoveries with missing, stale, or non-verifiable evidence | 0 |
| Critical Recovery Evidence Gap Count | CC-1 recoveries lacking mandatory evidence components | 0 |
| Evidence Correction Lead Time | Time from evidence gap detection to verified correction | ≤ 2 business days |
| Repeat Evidence Failure Count | Recoveries failing evidence quality in consecutive cycles | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| Verified | Recovery evidence is complete, current, and auditable |
| Watch | Minor evidence issue with low immediate exposure |
| Unverified | Material evidence gaps prevent trusted recovery closure |
| Recovering | Evidence-quality remediation in progress with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Recovery Action ID | Evidence Complete (Y/N) | Evidence Fresh (Y/N) | Status | Exposure Note | Correction Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| CRQ-001 |  |  |  |  |  |  |  |  |
| CRQ-002 |  |  |  |  |  |  |  |  |
| CRQ-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing recovery-evidence quality review:
- [ ] all in-scope recoveries are listed with linked evidence,
- [ ] evidence freshness and traceability checks are completed,
- [ ] unverified recoveries include impact/exposure notes,
- [ ] correction owners and due dates are assigned,
- [ ] post-correction verification is recorded.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 recovery remains Unverified,
- insufficient evidence count >0 for two consecutive cycles,
- critical recovery evidence gap count >0 in any cycle,
- repeat evidence failures increase across same control family.

Escalation output must include:
- unverified recovery list and exposure summary,
- evidence-remediation package with accountable owners,
- dated checkpoint proving restored recovery evidence quality.

---

## Integration Points

Use with:
- `ALIGNMENT-RECOVERY-WINDOW-COMPLIANCE.md`
- `ALIGNMENT-EVIDENCE-LINKAGE-COMPLIANCE.md`
- `ALIGNMENT-CLOSURE-INTEGRITY-AUDIT.md`
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-COMMAND-CENTER.md`
