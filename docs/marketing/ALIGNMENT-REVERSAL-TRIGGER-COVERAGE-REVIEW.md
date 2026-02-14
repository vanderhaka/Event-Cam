# Alignment Reversal Trigger Coverage Review

Use this artifact to verify that high-impact decisions have explicit, measurable reversal triggers before adverse outcomes compound.

Without defined reversal triggers, underperforming decisions remain active too long and increase recovery cost.

---

## Purpose

This review ensures:
- reversal triggers are defined during decision approval,
- trigger thresholds are measurable and linked to canonical metrics,
- trigger coverage gaps are corrected before decision closure.

---

## Scope

Required for:
- all P0 decisions,
- high-impact P1 decisions,
- decisions with pricing, path, or operating-mode impact.

---

## Coverage Metrics

| Metric | Definition | Target |
|---|---|---:|
| Trigger Coverage Rate | % in-scope decisions with defined reversal trigger set | 100% |
| Trigger Measurability Rate | % trigger sets using measurable canonical metrics | ≥ 95% |
| Missing Trigger Count | In-scope decisions with no reversal triggers | 0 |
| Trigger Drift Count | Trigger thresholds no longer aligned with current metric definitions | 0 or declining |
| Trigger Activation Response Time | Time from trigger breach to reversal-path decision | ≤ 3 business days |

---

## Trigger Status Model

| Status | Meaning |
|---|---|
| Covered | Trigger set complete and measurable |
| Partial | Trigger exists but missing threshold clarity or metric linkage |
| Uncovered | No valid reversal trigger set |
| Correcting | Trigger coverage remediation in progress |

---

## Canonical Coverage Table

| Decision ID | Priority | Trigger Set Defined (Y/N) | Trigger Metric Link Valid (Y/N) | Trigger Threshold Clarity (Y/N) | Status | Owner | Correction Due |
|---|---|---|---|---|---|---|---|
| RTR-001 |  |  |  |  |  |  |  |
| RTR-002 |  |  |  |  |  |  |  |
| RTR-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before finalizing trigger coverage review:
- [ ] all in-scope decisions are checked,
- [ ] trigger metrics map to canonical definitions,
- [ ] threshold values are explicit and auditable,
- [ ] uncovered/partial items have owner and due date,
- [ ] trigger updates are synced in decision artifacts.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any active P0 decision is Uncovered,
- missing trigger count >0 for two consecutive cycles,
- trigger breach occurs without documented response decision,
- repeated trigger drift appears in same decision domain.

Escalation output must include:
- uncovered/partial decision list,
- owner accountability and correction timeline,
- verification checkpoint for full coverage recovery.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-REVERSAL-PROTOCOL.md`
- `ALIGNMENT-PRIORITY0-DECISION-BRIEF.md`
- `ALIGNMENT-DECISION-PACKET-COMPLIANCE.md`
- `ALIGNMENT-METRIC-DEFINITIONS.md`
- `ALIGNMENT-COMMAND-CENTER.md`
