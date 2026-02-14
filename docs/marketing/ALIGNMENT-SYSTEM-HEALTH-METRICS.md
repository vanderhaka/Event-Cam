# Alignment System Health Metrics

Use this artifact to measure whether the alignment system itself is functioning—not just whether business KPIs are moving.

Strong business metrics can still hide weak operating discipline; this file tracks the discipline layer directly.

---

## Purpose

This metric set answers:
- Are decisions moving fast enough?
- Are artifacts being maintained reliably?
- Are contradictions and blockers being resolved on time?
- Is the system improving or accumulating hidden debt?

---

## Metric Families

1. **Decision Throughput & Latency**
2. **Documentation Integrity**
3. **Execution Friction**
4. **Signal Quality**
5. **Control Compliance**

Track all families weekly and review trend monthly.

---

## Core Weekly Metrics

| Metric | Formula | Target | Owner |
|---|---|---|---|
| P0 On-Time Close Rate | P0 decisions closed by SLA / total P0 due | ≥90% | Strategy Owner |
| P1 On-Time Close Rate | P1 decisions closed by SLA / total P1 due | ≥85% | Strategy Owner |
| Median Decision Cycle Time | median(days open→closed) | ≤7 days (P0), ≤10 days (P1) | Ops / PMO |
| Contradiction SLA Compliance | contradictions resolved within SLA / total resolved | ≥90% | Strategy Owner |
| Blocker Resolution SLA | blockers resolved within SLA / total resolved | ≥85% | Ops / PMO |
| Dependency On-Time Rate | dependencies resolved by due date / total due | ≥85% | Ops / PMO |
| Active Artifact Freshness | active artifacts updated within cadence / active artifacts | ≥90% | Documentation Owner |
| Canonical Conflict Age | avg days unresolved canonical-source conflicts | ≤3 days | Strategy + Docs |
| ID Hygiene Pass Rate | new entries passing ID/format/link checks / total new entries | 100% | Documentation Owner |
| Invalid State Transition Count | invalid transitions detected per week | 0 | Ops / PMO |

---

## Monthly Health Metrics

| Metric | Definition | Target |
|---|---|---|
| Alignment Debt Index | weighted count of overdue decisions + stale artifacts + unresolved contradictions | Downward trend |
| Reopened Issue Rate | previously resolved items reopened / total resolved | <15% |
| Reversal Frequency | reversal requests opened / closed decisions | Contextual; stable or falling |
| Quality Repair Lead Time | median days to repair weak/critical doc-quality issues | ≤14 days |
| Active-Set Stability | number of active-set changes per month | Controlled; justified changes only |

---

## Health Bands

Compute a weekly health band from the core metrics:

- **Green:** 8+ metrics on target, no critical breaches.
- **Yellow:** 5–7 metrics on target or 1 critical breach.
- **Red:** <5 metrics on target or multiple critical breaches.

Critical breaches include:
- P0 on-time close rate <70%,
- invalid state transitions >0 for two weeks,
- canonical conflict age >7 days,
- active artifact freshness <70%.

---

## Escalation Protocol by Band

### Green
- Continue current mode.
- Focus on trend improvement and selective optimization.

### Yellow
- Freeze non-essential artifact additions.
- Run focused corrective plan with owners and deadlines.

### Red
- Switch to Diagnostic Mode.
- Trigger leadership escalation in next decision review.
- Run 2-week stabilization sprint with daily check-ins.

---

## Reporting Template (Weekly)

- Week of:
- Health band:
- Metrics on target: X / 10
- Top 3 failing metrics:
  1.
  2.
  3.
- Root causes:
- Corrective actions (owner + due date):

---

## Integration Points

Use with:
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-SCORECARD.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-ACTIVE-ARTIFACT-SET.md`
- `ALIGNMENT-OPERATING-MODES.md`
