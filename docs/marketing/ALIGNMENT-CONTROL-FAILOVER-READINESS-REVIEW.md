# Alignment Control Failover Readiness Review

Use this artifact to verify that critical controls can continue operating when primary owners, systems, or data paths fail.

Without tested failover paths, small disruptions can become multi-day execution outages.

---

## Purpose

This review ensures:
- critical controls have explicit failover paths and activation criteria,
- failover ownership and decision rights are clear before incidents occur,
- failover actions are validated and recover operations within target windows.

---

## Scope

Required for:
- all CC-1 controls,
- CC-2 controls supporting active P0 decisions,
- controls with recent dependency or availability incidents.

---

## Readiness Metrics

| Metric | Definition | Target |
|---|---|---:|
| Failover Coverage Rate | % in-scope controls with documented failover path | 100% |
| Validated Failover Rate | % in-scope controls with failover tested in current cadence | ≥ 95% |
| Failover Activation Success Rate | % failover activations completing without material service gap | ≥ 95% |
| Median Failover Recovery Time | Time from failover trigger to restored control operation | improving trend |
| Unplanned Control Outage Count | In-scope outages caused by missing or failed failover plan | 0 |

---

## Readiness Status Model

| Status | Meaning |
|---|---|
| Ready | Failover path exists, tested, and meets recovery expectations |
| Partial Ready | Failover path exists but untested or below target performance |
| Not Ready | No valid failover path for in-scope control |
| Recovering | Readiness gaps under active remediation with owner and due date |

---

## Canonical Readiness Table

| Review ID | Control Artifact | Criticality | Failover Path Linked (Y/N) | Last Validation Date | Activation Success (Y/N) | Recovery Time | Status | Remediation Owner | Remediation Due |
|---|---|---|---|---|---|---|---|---|---|
| CFR-001 |  |  |  |  |  |  |  |  |  |
| CFR-002 |  |  |  |  |  |  |  |  |  |
| CFR-003 |  |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing failover-readiness review:
- [ ] every in-scope control is mapped to a failover path,
- [ ] activation criteria and ownership are explicit,
- [ ] failed/untested failovers have remediation owners and due dates,
- [ ] readiness evidence is linked in control and incident artifacts,
- [ ] unresolved failover gaps on CC-1 controls are escalated.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 control is Not Ready,
- unplanned outage occurs due to missing/failed failover,
- failover validation rate stays below target for 2 cycles,
- median failover recovery time worsens for 2 consecutive cycles.

Escalation output must include:
- affected controls and outage exposure summary,
- remediations with owners and dates,
- verification checkpoint showing restored readiness.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-CRITICALITY-MAP.md`
- `ALIGNMENT-CONTROL-DEPENDENCY-MAP.md`
- `ALIGNMENT-RECOVERY-WINDOW-COMPLIANCE.md`
- `ALIGNMENT-CONTROL-DRILL-EFFECTIVENESS-REVIEW.md`
- `ALIGNMENT-COMMAND-CENTER.md`
