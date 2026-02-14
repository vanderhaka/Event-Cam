# Alignment Decision Outcome Lag Review

Use this artifact to measure how long it takes for closed decisions to produce observable outcome signals.

If outcome visibility lags too long, teams cannot distinguish good decisions from delayed/no-impact decisions.

---

## Purpose

This review ensures:
- expected outcome windows are explicit per decision type,
- lag from decision close to measurable signal is tracked,
- delayed outcome visibility triggers investigation or instrumentation fixes.

---

## Scope

Track lag for:
- all P0 decisions,
- high-impact P1 decisions,
- decisions linked to major KPI or pricing shifts.

---

## Lag Metrics

| Metric | Definition | Target |
|---|---|---:|
| Median Outcome Lag | Median days from decision close to first measurable outcome signal | within decision-type standard |
| Overdue Outcome Visibility Count | Decisions past expected signal window with no measurable outcome | 0 or declining |
| Signal-Ambiguity Rate | % decisions with inconclusive first outcome due to weak signal quality | ≤ 15% |
| Lag-to-Action Time | Time from overdue outcome lag detection to corrective action | ≤ 5 business days |
| Outcome Visibility Stability | % decisions with clear signal by second review checkpoint | ≥ 90% |

---

## Outcome Lag Bands

| Band | Condition | Action |
|---|---|---|
| On-Time | Signal appears within expected window | Continue normal review |
| Delayed | Signal appears after window but before escalation threshold | Investigate instrumentation/causal noise |
| Overdue | No usable signal beyond escalation threshold | Escalate and open lag-correction action |

---

## Canonical Lag Table

| Decision ID | Priority | Close Date | Expected Signal Date | First Observable Signal Date | Lag Days | Lag Band | Outcome Status at First Review | Owner | Corrective Action |
|---|---|---|---|---|---:|---|---|---|---|
| DOL-001 |  |  |  |  |  |  |  |  |  |
| DOL-002 |  |  |  |  |  |  |  |  |  |
| DOL-003 |  |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing outcome-lag review:
- [ ] expected signal windows are defined per decision,
- [ ] first observable signals are linked to canonical metrics,
- [ ] delayed/overdue items have owner + next action,
- [ ] ambiguous signals include explicit cause hypothesis,
- [ ] follow-up checkpoint date is scheduled.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- overdue outcome visibility count rises for 2 cycles,
- any P0 decision remains Overdue at second checkpoint,
- delayed outcome lag repeatedly ties to same data path,
- lag prevents reinforcement/modification/reversal decision on schedule.

Escalation output must include:
- dominant lag-source diagnosis,
- instrumentation or decision-review correction plan,
- next-cycle lag-reduction target.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-OUTCOME-REVIEWS.md`
- `ALIGNMENT-TRACEABILITY-MATRIX.md`
- `ALIGNMENT-METRIC-DEFINITIONS.md`
- `ALIGNMENT-DATA-SOURCE-RELIABILITY-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
