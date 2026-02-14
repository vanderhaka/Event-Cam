# Alignment Recovery Window Compliance

Use this artifact to verify that declared recovery actions are completed within agreed stabilization windows after incidents, slippage, or control failures.

Recovery plans lose value when timelines slip without visibility or escalation.

---

## Purpose

This review ensures:
- recovery windows are explicit and time-bounded,
- overdue recoveries are surfaced before risk re-accumulates,
- teams measure recovery reliability, not only recovery intent.

---

## Scope

Track recovery windows for:
- alignment incidents and hotwash actions,
- S2/S3 commitment slippage cases,
- control-failure remediation plans,
- escalated corrective-action packages.

---

## Compliance Metrics

| Metric | Definition | Target |
|---|---|---:|
| On-Time Recovery Completion | % recovery plans completed within declared window | ≥ 85% |
| Overdue Recovery Count | Recovery plans past window with unresolved critical steps | 0 or declining |
| Median Recovery Lag | Median days beyond target window for late recoveries | declining trend |
| Recovery Recurrence Rate | % items requiring repeated recovery window extensions | ≤ 15% |
| Verification Closure Rate | % completed recoveries with verified stabilization evidence | ≥ 90% |

---

## Recovery Window Status Model

| Status | Meaning |
|---|---|
| Active | Recovery plan in progress within window |
| At Risk | Recovery likely to miss window |
| Overdue | Recovery window breached |
| Verified | Recovery completed and stabilization evidence confirmed |
| Reopened | Recovery failed to hold; new window required |

---

## Canonical Recovery Compliance Table

| Recovery ID | Source Event/Artifact | Severity | Recovery Window End | Current Status | Days to/over Window | Verification Evidence Linked (Y/N) | Owner | Next Action Date |
|---|---|---|---|---|---:|---|---|---|
| RWC-001 |  |  |  |  |  |  |  |  |
| RWC-002 |  |  |  |  |  |  |  |  |
| RWC-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing recovery compliance review:
- [ ] all active high-severity recoveries are listed,
- [ ] each recovery has explicit window end date,
- [ ] overdue recoveries have escalation path and owner,
- [ ] completed recoveries include stabilization evidence,
- [ ] reopened recoveries have root-cause note and revised window.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any critical recovery becomes Overdue,
- overdue recovery count rises for 2 consecutive cycles,
- repeated window extensions occur for same owner/team,
- unverified recovery closure is used to unlock high-impact decisions.

Escalation output must include:
- overdue recovery cluster summary,
- owner/accountability corrections,
- revised recovery plan with dated verification checkpoints.

---

## Integration Points

Use with:
- `ALIGNMENT-COMMITMENT-SLIPPAGE-PROTOCOL.md`
- `ALIGNMENT-ESCALATION-EFFECTIVENESS-REVIEW.md`
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-INCIDENT-HOTWASH-TEMPLATE.md`
- `ALIGNMENT-COMMAND-CENTER.md`
