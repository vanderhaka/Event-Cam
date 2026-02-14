# Alignment Commitment Slippage Protocol

Use this protocol when weekly commitments miss due dates or fail quality standards.

Unmanaged slippage compounds into decision debt, owner overload, and unreliable planning.

---

## Purpose

This protocol standardizes:
- how missed commitments are classified,
- required response timing,
- owner accountability and escalation,
- prevention actions to reduce repeat misses.

---

## Slippage Classification

| Class | Definition | Response Window |
|---|---|---:|
| S1 (Minor) | Missed by ≤2 business days with low downstream impact | 2 business days |
| S2 (Material) | Missed by 3–5 business days or blocks one critical dependency | 24 hours |
| S3 (Critical) | Missed by >5 business days or impacts P0 decisions/KPI integrity | Same business day |

---

## Detection Rule

A commitment is considered slipped if:
- due date passes without completion, or
- output exists but fails agreed quality gate, or
- completion is claimed but not reflected in required artifacts.

---

## Response Workflow

1. **Log**  
   Record slipped commitment with class and impact summary.

2. **Contain**  
   Identify blocked downstream decisions/dependencies.

3. **Correct**  
   Assign revised due date, owner support, and minimum recovery steps.

4. **Escalate (if needed)**  
   Trigger escalation by slippage class rules.

5. **Prevent recurrence**  
   Record root cause and one prevention action.

---

## Canonical Slippage Log

| Slip ID | Week | Commitment ID/Title | Original Due Date | Slip Class | Root Cause Category | Downstream Impact | Recovery Owner | New Due Date | Status |
|---|---|---|---|---|---|---|---|---|---|
| CSL-001 |  |  |  |  |  |  |  |  |  |
| CSL-002 |  |  |  |  |  |  |  |  |  |
| CSL-003 |  |  |  |  |  |  |  |  |  |

---

## Root Cause Categories

Use one primary cause:
- unrealistic planning scope,
- ownership overload,
- unresolved dependency,
- unclear definition of done,
- data/evidence delay,
- execution quality failure.

---

## Escalation Rules

Escalate immediately when:
- any S3 slippage occurs,
- same owner has 2+ S2/S3 slips in 2 weeks,
- slippage blocks active pricing/path decisions.

Escalation outcome must include:
- explicit re-prioritization decision,
- owner support or reassignment,
- revised commitment set for current week.

---

## Weekly Slippage Metrics

Track in weekly review:
- total slipped commitments,
- S2/S3 slippage count,
- repeat-slip rate,
- recovery-on-time rate,
- top recurring root cause.

If S2/S3 slippage trend worsens for 2 weeks, run corrective operating-mode review.

---

## Integration Points

Use with:
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-OWNER-LOAD-MANAGEMENT.md`
- `ALIGNMENT-DEPENDENCY-TRACKER.md`
- `ALIGNMENT-OPERATING-MODES.md`
