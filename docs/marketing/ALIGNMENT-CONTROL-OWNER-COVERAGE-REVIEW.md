# Alignment Control Owner Coverage Review

Use this artifact to verify that every high-impact control has complete primary/backup/escalation ownership coverage.

Controls fail faster when only one person can operate, verify, or recover them.

---

## Purpose

This review ensures:
- critical controls are never single-owner fragile,
- backup coverage is current and role-appropriate,
- ownership gaps are corrected before incidents occur.

---

## Scope

Required for:
- all CC-1 and CC-2 controls,
- controls with repeated incidents/non-compliance,
- controls in active change or recovery windows.

---

## Coverage Metrics

| Metric | Definition | Target |
|---|---|---:|
| Full Coverage Rate | % in-scope controls with primary + backup + escalation owners | 100% |
| Single-Point-of-Failure Count | In-scope controls missing backup or escalation owner | 0 |
| Stale Ownership Count | Controls with outdated owner assignments after role changes | 0 |
| Coverage Correction Lead Time | Time from coverage gap detection to owner assignment | ≤ 2 business days |
| Coverage Stability Rate | % controls maintaining full coverage across consecutive cycles | ≥ 95% |

---

## Coverage Status Model

| Status | Meaning |
|---|---|
| Fully Covered | Primary, backup, and escalation owners assigned and active |
| Partial Coverage | One role missing or unconfirmed |
| Uncovered | Multiple ownership roles missing |
| Correcting | Coverage gap remediation in progress |

---

## Canonical Coverage Table

| Control Artifact | Criticality | Primary Owner | Backup Owner | Escalation Owner | Coverage Status | Last Verified Date | Gap Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| COC-001 |  |  |  |  |  |  |  |  |
| COC-002 |  |  |  |  |  |  |  |  |
| COC-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing coverage review:
- [ ] all in-scope controls are listed,
- [ ] criticality levels are current,
- [ ] owner roles are validated with current org assignments,
- [ ] partial/uncovered controls have correction owner and due date,
- [ ] updates are synchronized in linked ownership artifacts.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control is not Fully Covered,
- same control remains Partial/Uncovered for 2 cycles,
- owner coverage gaps overlap with active incidents or change windows,
- stale ownership contributes to missed escalations.

Escalation output must include:
- uncovered control list and risk impact,
- owner assignment corrections with due dates,
- verification checkpoint for restored full coverage.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-CRITICALITY-MAP.md`
- `ALIGNMENT-OWNER-LOAD-MANAGEMENT.md`
- `ALIGNMENT-HANDOFF-RELIABILITY-REVIEW.md`
- `ALIGNMENT-KPI-OWNER-MAP.md`
- `ALIGNMENT-COMMAND-CENTER.md`
