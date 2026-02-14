# Alignment Data Source Catalog

Use this catalog to document where alignment metrics and decision signals come from, who owns them, and how trustworthy they are.

Metric definitions are not enough if source lineage is unclear.

---

## Purpose

This artifact ensures:
- each metric has an auditable source,
- source reliability is explicit,
- data ownership is unambiguous,
- reporting disputes can be resolved quickly.

---

## Catalog Fields

For each data source, capture:

- **Source ID**
- **Source Name**
- **System / Tool**
- **Primary Owner**
- **Backup Owner**
- **Data Scope**
- **Update Cadence**
- **Latency**
- **Known Limitations**
- **Reliability Rating (A/B/C)**
- **Dependent Metrics**

---

## Reliability Rating

| Rating | Meaning | Usage Guidance |
|---|---|---|
| A | Highly reliable, routinely validated | Safe for high-impact decisions |
| B | Generally reliable, occasional quality gaps | Use with verification checks |
| C | Low reliability or incomplete coverage | Use for directional signals only |

No Priority 0 decision should rely solely on C-rated sources.

---

## Canonical Source Table

| Source ID | Source Name | System | Owner | Cadence | Reliability | Dependent Metrics | Notes |
|---|---|---|---|---|---|---|---|
| SRC-001 | [Events + payments ledger] | [System] | [Owner] | Daily | A | [Metric list] | [Notes] |
| SRC-002 | [Experiment tracking sheet] | [System] | [Owner] | Weekly | B | [Metric list] | [Notes] |
| SRC-003 | [Partner referral exports] | [System] | [Owner] | Weekly | C | [Metric list] | [Notes] |

---

## Source Validation Checklist

Run before weekly KPI review:

- [ ] Source refreshed within expected cadence.
- [ ] No missing fields for decision-critical metrics.
- [ ] Metric formula still matches source schema.
- [ ] Reliability downgrade needed? (if incidents detected)
- [ ] Owner confirms no unresolved extraction/transformation errors.

---

## Source Incident Handling

If a source fails or degrades:

1. Log incident in blockers log.
2. Downgrade reliability rating if needed.
3. Mark dependent metrics as “provisional” until stabilized.
4. Reconfirm decisions made during degraded window.

For A-rated source outages >24h, trigger on-call escalation.

---

## Monthly Source Review

Monthly, review:
- reliability trends by source,
- recurring source incidents,
- owner coverage gaps,
- dependency concentration risk (too many metrics tied to one fragile source).

Output:
- sources to upgrade,
- sources to deprecate,
- sources requiring fallback mechanisms.

---

## Integration Points

Use with:
- `ALIGNMENT-METRIC-DEFINITIONS.md`
- `ALIGNMENT-DATA-QUALITY-CHECKLIST.md`
- `ALIGNMENT-SYSTEM-HEALTH-METRICS.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-ONCALL-ESCALATION-MATRIX.md`
