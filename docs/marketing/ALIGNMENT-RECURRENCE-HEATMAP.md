# Alignment Recurrence Heatmap

Use this artifact to visualize where issues are repeatedly recurring across workflows, owners, and control domains.

Single-issue resolution metrics can look healthy while chronic recurrence silently concentrates risk.

---

## Purpose

This heatmap helps teams:
- identify chronic recurrence clusters quickly,
- focus interventions where recurrence intensity is highest,
- track whether recurrence is shifting or truly declining.

---

## Scope

Include recurrence events from:
- decision reopen analysis,
- control failure modes,
- escalation effectiveness review,
- commitment slippage protocol,
- backlog aging critical-stale items.

---

## Heatmap Dimensions

Track recurrence intensity across:
1. **Workflow Domain** (decision, execution, control, data, governance),
2. **Cause Category** (from root-cause taxonomy),
3. **Owner Group** (team or role cluster),
4. **Severity Band** (low/medium/high/critical).

---

## Recurrence Metrics

| Metric | Definition | Target |
|---|---|---:|
| Recurrence Density | Number of repeat events per domain per cycle | declining trend |
| Chronic Cluster Count | Domains with recurrence above defined threshold for 2+ cycles | 0 or declining |
| High-Severity Recurrence Rate | % recurring events classified High/Critical | declining trend |
| Owner Concentration Ratio | % recurrence attributable to top 2 owner groups | declining trend |
| Recurrence Burn-Down Rate | % reduction in total recurrence vs prior cycle | improving trend |

---

## Heatmap Intensity Bands

| Band | Recurrence Signal | Interpretation |
|---|---|---|
| H1 (Low) | Isolated repeats, no cluster | Normal monitoring |
| H2 (Moderate) | Repeats in same domain or owner group | Targeted intervention |
| H3 (High) | Multi-cycle recurrence cluster | Priority correction plan |
| H4 (Critical) | High-severity recurring cluster across domains | Immediate cross-functional escalation |

---

## Canonical Recurrence Table

| Cycle | Domain | Cause Category | Owner Group | Event Count | High/Critical % | Heat Band | Action Owner | Next Review |
|---|---|---|---|---:|---:|---|---|---|
| [YYYY-MM] |  |  |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |  |  |
| [YYYY-MM] |  |  |  |  |  |  |  |  |

---

## Quality Gate

Before publishing heatmap:
- [ ] all recurrence source artifacts are included,
- [ ] cause categories are normalized to shared taxonomy,
- [ ] severity mapping is consistent across workflows,
- [ ] chronic clusters have explicit owners and action plans,
- [ ] prior-cycle actions are evaluated for recurrence reduction.

If any item is unchecked, heatmap is incomplete.

---

## Escalation Triggers

Escalate when:
- any H4 cluster appears,
- same H3/H4 cluster persists for 2 consecutive cycles,
- recurrence burn-down is flat/negative for 2 cycles,
- chronic cluster delays P0/P1 path commitments.

Escalation output must include:
- cluster-level intervention package,
- owner/accountability changes where needed,
- expected recurrence reduction target for next cycle.

---

## Integration Points

Use with:
- `ALIGNMENT-ROOT-CAUSE-PATTERN-REVIEW.md`
- `ALIGNMENT-DECISION-REOPEN-ANALYSIS.md`
- `ALIGNMENT-CONTROL-FAILURE-MODES.md`
- `ALIGNMENT-COMMITMENT-SLIPPAGE-PROTOCOL.md`
- `ALIGNMENT-COMMAND-CENTER.md`
