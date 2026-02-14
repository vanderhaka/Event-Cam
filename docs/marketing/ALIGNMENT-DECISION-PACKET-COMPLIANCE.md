# Alignment Decision Packet Compliance

Use this artifact to verify that high-impact decision packets are complete, evidence-backed, and approval-ready before closure.

Incomplete packets create low-quality approvals, rework, and avoidable reversal risk.

---

## Purpose

This compliance review ensures:
- required decision packet sections are present and current,
- approval quality is consistent across owners and cycles,
- missing packet elements are corrected before decision closure.

---

## Scope

Required for:
- all P0 decisions,
- high-impact P1 decisions,
- any decision requiring override or exception.

Optional for lower-impact decisions.

---

## Packet Compliance Metrics

| Metric | Definition | Target |
|---|---|---:|
| Complete Packet Rate | % in-scope decisions with all required sections complete | ≥ 95% |
| Evidence-Linked Packet Rate | % packets with traceable evidence links for key claims | 100% |
| First-Pass Approval Rate | % packets accepted without major rework request | ≥ 80% |
| Missing-Critical-Section Count | Number of packets lacking required high-risk sections | 0 |
| Rework Cycle Time | Time to correct packet deficiencies after review | ≤ 3 business days |

---

## Required Packet Sections (Baseline)

- decision question and scope,
- expected outcome and threshold,
- evidence summary and freshness check,
- premortem summary (for P0),
- confidence score and mitigation plan,
- dependency and owner-load implications,
- reversal trigger and outcome-review schedule.

---

## Compliance Status Model

| Status | Meaning |
|---|---|
| Compliant | All required sections complete and validated |
| Partial | Minor missing items not blocking initial review |
| Non-Compliant | Critical sections missing; packet cannot be approved |
| Correcting | Deficiencies logged and remediation in progress |

---

## Canonical Compliance Table

| Packet ID | Decision ID | Priority | Reviewed Date | Compliance Status | Missing Sections | Reviewer | Correction Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| DPC-001 |  |  |  |  |  |  |  |  |
| DPC-002 |  |  |  |  |  |  |  |  |
| DPC-003 |  |  |  |  |  |  |  |  |

---

## Quality Gate

Before decision can be marked approval-ready:
- [ ] packet passes required section checklist,
- [ ] evidence links are current and valid,
- [ ] confidence and premortem fields are completed when required,
- [ ] dependencies and reversal trigger are explicit,
- [ ] reviewer sign-off is recorded.

If any item is unchecked, decision remains Non-Compliant/Correcting.

---

## Escalation Triggers

Escalate when:
- any P0 packet is Non-Compliant at scheduled decision date,
- missing-critical-section count >0 for two consecutive weeks,
- packet compliance trend declines for 2 cycles,
- repeated packet deficiencies are concentrated by owner/workflow.

Escalation output must include:
- deficiency pattern summary,
- owner enablement or accountability adjustments,
- due-dated remediation and verification plan.

---

## Integration Points

Use with:
- `ALIGNMENT-PRIORITY0-DECISION-BRIEF.md`
- `ALIGNMENT-EVIDENCE-STANDARDS.md`
- `ALIGNMENT-DECISION-CONFIDENCE-INDEX.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
