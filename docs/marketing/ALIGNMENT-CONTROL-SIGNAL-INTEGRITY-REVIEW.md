# Alignment Control Signal Integrity Review

Use this artifact to verify that control signals are complete, accurate, and not distorted by data or instrumentation defects.

If signal integrity degrades, teams make high-confidence decisions from unreliable control telemetry.

---

## Purpose

This review ensures:
- critical control signals remain trustworthy and definition-consistent,
- signal corruption or drift is detected before control decisions are affected,
- integrity defects are corrected with traceable ownership and SLA.

---

## Scope

Run this review for:
- all CC-1 control signals,
- CC-2 signals used in P0/P1 decision gating,
- signals with recent anomalies, contradictions, or source changes.

---

## Integrity Metrics

| Metric | Definition | Target |
|---|---|---:|
| Signal Integrity Pass Rate | % in-scope signals passing all integrity checks in-cycle | ≥ 98% |
| Corrupted Signal Count | Signals with missing, malformed, or contradictory values | 0 |
| Definition Drift Count | Signals whose formula/logic differs from canonical definition | 0 |
| Integrity Correction Lead Time | Time from integrity defect detection to verified correction | ≤ 2 business days |
| Repeat Integrity Defect Count | Signals recurring with same integrity defect across cycles | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| Trusted | Signal passes integrity checks and matches canonical definition |
| Watch | Minor integrity concern detected; limited decision exposure |
| Untrusted | Material integrity defect present; signal should not drive critical decisions |
| Recovering | Integrity remediation underway with owner and due date |

---

## Canonical Review Table

| Review ID | Signal ID | Control Artifact | Integrity Check Result | Definition Match (Y/N) | Status | Exposure Note | Correction Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| CSI-001 |  |  |  |  |  |  |  |  |
| CSI-002 |  |  |  |  |  |  |  |  |
| CSI-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing signal-integrity review:
- [ ] all in-scope signals are checked against canonical definitions,
- [ ] integrity defects include impact/exposure notes,
- [ ] untrusted signals are removed from critical decision use until corrected,
- [ ] correction owners and due dates are assigned,
- [ ] post-fix verification evidence is linked.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 signal is Untrusted,
- corrupted signal count >0 for two consecutive cycles,
- definition drift affects active P0/P1 decisions,
- repeat integrity defects increase in same signal family.

Escalation output must include:
- untrusted/corrupted signal list and exposure summary,
- correction package with accountable owners,
- dated verification checkpoint for restored signal trust.

---

## Integration Points

Use with:
- `ALIGNMENT-METRIC-DEFINITION-CONSISTENCY-REVIEW.md`
- `ALIGNMENT-SIGNAL-CORRELATION-REVIEW.md`
- `ALIGNMENT-DATA-SOURCE-RELIABILITY-REVIEW.md`
- `ALIGNMENT-METRIC-ANOMALY-PROTOCOL.md`
- `ALIGNMENT-COMMAND-CENTER.md`
