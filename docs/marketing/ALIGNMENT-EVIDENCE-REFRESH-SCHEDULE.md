# Alignment Evidence Refresh Schedule

Use this artifact to ensure decision evidence remains current as market conditions and performance signals change.

Stale evidence is a silent failure mode: teams keep making decisions as if old assumptions are still true.

---

## Purpose

This schedule defines:
- when evidence must be refreshed,
- who owns evidence updates,
- what happens when evidence expires before a decision review.

---

## Refresh Cadence by Evidence Type

| Evidence Type | Default Refresh Cadence | Owner |
|---|---:|---|
| KPI trend snapshots | Weekly | Growth / Analytics |
| Channel CAC/payback analysis | Bi-weekly | Growth + Finance |
| Pricing performance evidence | Monthly | Strategy + Finance |
| Partner/referral conversion evidence | Bi-weekly | Partnerships + Growth |
| Narrative/channel fit signals | Monthly | Marketing Lead |
| Regulatory/compliance assumptions | Quarterly or on policy change | Legal/Compliance |

---

## Evidence Expiry Rules

Evidence is considered expired when:
- refresh cadence window is exceeded,
- major market/context shift invalidates baseline,
- source reliability drops below agreed threshold,
- metric anomaly remains unresolved for dependent evidence.

Expired evidence cannot be used for High-confidence approvals.

---

## Canonical Refresh Register

| Evidence ID | Evidence Type | Last Refresh Date | Next Refresh Due | Current Status (Current/Warning/Expired) | Owner | Dependent Decisions | Notes |
|---|---|---|---|---|---|---|---|
| EVR-001 |  |  |  |  |  |  |  |
| EVR-002 |  |  |  |  |  |  |  |
| EVR-003 |  |  |  |  |  |  |  |

---

## Decision Gating Rules

- **Current:** decision can proceed normally.
- **Warning (due within 3 business days):** decision can proceed with caution note.
- **Expired:** block high-impact approval until evidence is refreshed or override is logged.

Any override must include:
- rationale,
- risk owner,
- forced refresh due date.

---

## Weekly Review Checklist

- [ ] No expired evidence linked to open P0 decisions.
- [ ] Warning-status evidence has owner and refresh date.
- [ ] Refresh failures are reflected in decision confidence scoring.
- [ ] Evidence source reliability issues escalated.

---

## Escalation Triggers

Escalate in weekly review when:
- 2+ open P0/P1 decisions depend on expired evidence,
- same evidence item misses refresh date twice consecutively,
- evidence expiry contributes to low-confidence or reversal events.

Escalation output must include:
- refresh recovery owner,
- decision-impact assessment,
- revised due dates and fallback controls.

---

## Integration Points

Use with:
- `ALIGNMENT-EVIDENCE-STANDARDS.md`
- `ALIGNMENT-DECISION-CONFIDENCE-INDEX.md`
- `ALIGNMENT-WEEKLY-DATA-CONTRACT.md`
- `ALIGNMENT-DATA-SOURCE-CATALOG.md`
- `ALIGNMENT-COMMAND-CENTER.md`
