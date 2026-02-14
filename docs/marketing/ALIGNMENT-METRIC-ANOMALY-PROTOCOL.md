# Alignment Metric Anomaly Protocol

Use this protocol when KPI behavior deviates unexpectedly from normal ranges or expected decision impact.

Anomalies must be triaged quickly so teams do not make strategic decisions on corrupted or misunderstood signals.

---

## Purpose

This protocol standardizes:
- anomaly detection criteria,
- triage workflow,
- owner responsibilities,
- decision gating while anomaly is unresolved.

---

## What Counts as an Anomaly

Treat a metric as anomalous if any of the following occur:

1. sudden movement beyond expected threshold bands without known intervention,
2. divergence between related metrics (e.g., conversion up while revenue down unexpectedly),
3. data freshness or completeness gaps in a critical metric,
4. value discrepancy across two reporting views for the same metric definition,
5. metric movement inconsistent with traceability expectations for recent decisions.

---

## Severity Levels

| Severity | Description | Triage Start SLA | Stabilization Target |
|---|---|---:|---:|
| A1 | Critical metric unreliable for current high-impact decisions | 1 hour | 24 hours |
| A2 | Significant uncertainty with near-term decision risk | 4 hours | 48 hours |
| A3 | Limited scope anomaly; does not block core decisions | 1 business day | 5 business days |

---

## Triage Workflow

### Step 1 — Detect and Log
- Open anomaly entry with metric ID, timestamp, and observed behavior.
- Assign anomaly owner (usually Growth/Data owner).

### Step 2 — Contain
- Mark affected metric status as **Provisional**.
- Freeze decisions directly dependent on this metric if severity is A1/A2.

### Step 3 — Verify Source Integrity
- Check data source freshness, schema, and extraction pipeline.
- Validate metric formula against canonical metric definitions.

### Step 4 — Isolate Cause
- Classify root cause category:
  - source failure,
  - definition drift,
  - transformation bug,
  - legitimate behavior shift,
  - unknown (needs deeper investigation).

### Step 5 — Resolve and Communicate
- Publish corrected value/range or explain legitimate shift.
- Update all impacted reporting artifacts.
- Declare status restored or continue provisional status with ETA.

---

## Decision Gating Rules

If anomaly severity is:

- **A1:** Block all high-impact decisions tied to metric until resolved.
- **A2:** Allow only conditional decisions with explicit risk note and mitigation owner.
- **A3:** Proceed with caution; include anomaly note in weekly packet.

---

## Required Anomaly Log Fields

- Anomaly ID:
- Metric name / ID:
- Detection timestamp:
- Severity:
- Owner:
- Dependent decisions impacted:
- Root cause category:
- Resolution action:
- Resolution timestamp:
- Prevention action:

---

## Recovery Verification Checklist

Before marking anomaly resolved:

- [ ] source reliability revalidated,
- [ ] metric formula confirmed unchanged or updated with approval,
- [ ] impacted dashboards/packets synchronized,
- [ ] affected decisions rechecked if needed,
- [ ] prevention action assigned with due date.

---

## Escalation Rules

Escalate to leadership when:
- A1 anomaly remains unresolved beyond 24 hours,
- same metric has 2+ anomalies in one month,
- anomaly impacts active pricing, path, or investor-facing reporting.

---

## Integration Points

Use with:
- `ALIGNMENT-DATA-SOURCE-CATALOG.md`
- `ALIGNMENT-WEEKLY-DATA-CONTRACT.md`
- `ALIGNMENT-METRIC-DEFINITIONS.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-COMMAND-CENTER.md`
