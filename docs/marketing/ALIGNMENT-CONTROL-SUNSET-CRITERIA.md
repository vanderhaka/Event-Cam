# Alignment Control Sunset Criteria

Use this artifact to decide when an active governance control can be safely downgraded, merged, or retired.

Controls should be removed deliberately—not abandoned—once their risk-reduction value no longer justifies operating overhead.

---

## Purpose

This artifact provides:
- objective criteria for retiring controls,
- safeguards against premature removal,
- a standard approval process for control sunset decisions.

---

## Sunset Eligibility Rules

A control is eligible for sunset review only if all are true:

1. Related risk signal has remained stable in Green band for at least 6 consecutive weeks.
2. No Sev-1/Sev-2 incident was linked to that control domain in the same period.
3. Control outcomes are either:
   - duplicated by another active control, or
   - no longer material to current operating mode/path.
4. Control owner provides evidence that retirement will not reduce decision safety.

---

## Sunset Decision Matrix

| Condition | Decision |
|---|---|
| Risk stable + overlap confirmed + low usage | Merge with overlapping control |
| Risk stable + no overlap + low materiality | Retire control |
| Risk unstable or recurring incidents | Keep control active |
| Uncertain evidence | Move to watchlist for 4 more weeks |

---

## Canonical Sunset Log

| Sunset ID | Control Artifact | Sunset Type (Merge/Retire/Watchlist) | Trigger Evidence | Decision Date | Approved By | Success Check Date | Reversal Trigger |
|---|---|---|---|---|---|---|---|
| SUN-001 |  |  |  |  |  |  |  |
| SUN-002 |  |  |  |  |  |  |  |
| SUN-003 |  |  |  |  |  |  |  |

---

## Required Sunset Packet

Before approval, include:
- 6-week risk trend evidence,
- control usage telemetry snapshot,
- overlap assessment (if merge),
- expected effect on weekly operating workload,
- rollback condition if risk reappears.

No sunset action is valid without this packet.

---

## Post-Sunset Verification

Run a 4-week verification window:
- track relevant risk metrics weekly,
- confirm no increase in contradictions, slippage, or incident severity,
- verify decision quality/SLA metrics remain within target range.

If risk worsens, reactivate control immediately.

---

## Escalation Triggers

Escalate sunset decision when:
- control retirement is proposed during Yellow/Red mode,
- control has unresolved owner or incomplete data,
- same domain had major incident in last quarter.

Escalation output must include:
- keep/merge/retire decision,
- explicit accountability owner,
- verification window commitment.

---

## Integration Points

Use with:
- `ALIGNMENT-ARTIFACT-USAGE-TELEMETRY.md`
- `ALIGNMENT-ARTIFACT-PRUNING-POLICY.md`
- `ALIGNMENT-ACTIVE-ARTIFACT-SET.md`
- `ALIGNMENT-OPERATING-MODES.md`
- `ALIGNMENT-SYSTEM-HEALTH-METRICS.md`
