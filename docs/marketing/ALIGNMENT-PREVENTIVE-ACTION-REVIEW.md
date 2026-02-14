# Alignment Preventive Action Review

Use this artifact to verify whether preventive actions triggered by leading indicators actually prevented downstream incidents and degradations.

Preventive work has value only when it measurably reduces future escalation, slippage, and decision-quality failures.

---

## Purpose

This review ensures:
- preventive actions are tracked to observable risk outcomes,
- low-value preventive routines are redesigned or removed,
- teams prioritize prevention methods with proven impact.

---

## Scope

Review preventive actions initiated from:
- leading indicator watchlist transitions,
- early warning signal lag alerts,
- pre-threshold decision flow stress signals,
- pre-escalation owner-load and closure-integrity warnings.

---

## Preventive Effectiveness Metrics

| Metric | Definition | Target |
|---|---|---:|
| Preventive Completion Rate | % preventive actions completed by due date | ≥ 85% |
| Prevention Success Rate | % completed preventive actions followed by no related escalation within 30 days | ≥ 75% |
| False-Positive Prevention Rate | % preventive actions triggered where no real risk pattern was present | ≤ 20% |
| Preventive-to-Corrective Ratio | Preventive actions completed / corrective actions opened | improving trend |
| Repeat-Prevention Count | Number of identical preventive actions repeated without outcome improvement | declining trend |

---

## Preventive Action Status Model

| Status | Meaning |
|---|---|
| Planned | Action defined but not yet started |
| Active | Preventive action underway |
| Completed | Action delivered and awaiting impact check |
| Effective | Action delivered and risk did not escalate in watch window |
| Ineffective | Action delivered but risk escalated anyway |
| Retired | Action pattern removed/replaced |

---

## Canonical Review Table

| Prevention ID | Trigger Indicator | Action Summary | Owner | Due Date | Completion Date | 30-Day Outcome | Result (Effective/Ineffective) | Follow-up Decision |
|---|---|---|---|---|---|---|---|---|
| PAR-001 |  |  |  |  |  |  |  |  |
| PAR-002 |  |  |  |  |  |  |  |  |
| PAR-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before marking a preventive action Effective:
- [ ] trigger indicator and threshold are explicitly linked,
- [ ] action completion evidence is logged,
- [ ] related escalation/corrective channels remained stable during watch window,
- [ ] no hidden severity increase occurred in adjacent domain,
- [ ] follow-up decision recorded (keep/refine/retire action pattern).

If any item is unchecked, effectiveness classification is invalid.

---

## Decision Rules

- **Effective actions** → standardize into playcards/checklists.
- **Ineffective actions** → redesign trigger logic or action content within one cycle.
- **Repeated ineffective actions** → retire pattern and require alternative prevention design.

---

## Escalation Triggers

Escalate when:
- prevention success rate falls below 60% in any month,
- same preventive pattern is ineffective 3+ times in 60 days,
- preventive completion drops below 70% for 2 consecutive weeks,
- preventive actions increase while downstream incidents also increase.

Escalation output must include:
- top ineffective prevention patterns,
- redesign owner + due date,
- expected metric recovery target for next cycle.

---

## Integration Points

Use with:
- `ALIGNMENT-LEADING-INDICATOR-WATCHLIST.md`
- `ALIGNMENT-SIGNAL-LAG-ANALYSIS.md`
- `ALIGNMENT-CORRECTIVE-ACTION-TRACKER.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
