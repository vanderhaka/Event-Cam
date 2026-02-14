# Alignment Control Coverage Matrix

Use this matrix to verify that each common alignment failure mode has an explicit preventive and corrective control.

If a failure mode has no mapped control, treat it as an open governance gap.

---

## Purpose

This artifact helps teams:
- detect control blind spots,
- avoid duplicated controls with no ownership,
- confirm incident and prevention loops are connected.

---

## How to Use

1. Identify the relevant failure mode.
2. Confirm a preventive control exists and is active.
3. Confirm a corrective/escalation control exists.
4. Confirm owner and review cadence.
5. If any field is missing, open remediation in blockers log.

---

## Coverage Matrix (Canonical)

| Failure Mode | Preventive Control | Corrective Control | Escalation Control | Primary Owner | Coverage Status |
|---|---|---|---|---|---|
| Pricing contradictions in active comms | `ALIGNMENT-CANONICAL-SOURCE-MAP.md` | `ALIGNMENT-CONTRADICTION-REGISTER.md` | `ALIGNMENT-ONCALL-ESCALATION-MATRIX.md` | Strategy Owner | Covered |
| P0 decisions stall beyond SLA | `ALIGNMENT-DECISION-SLA.md` | `ALIGNMENT-DECISIONS-LOG.md` | `ALIGNMENT-ESCALATION-PLAYCARDS.md` | Ops / PMO | Covered |
| KPI signal uncertainty before review | `ALIGNMENT-WEEKLY-DATA-CONTRACT.md` | `ALIGNMENT-METRIC-ANOMALY-PROTOCOL.md` | `ALIGNMENT-ONCALL-ESCALATION-MATRIX.md` | Growth/Data Owner | Covered |
| Artifact sprawl and stale docs | `ALIGNMENT-ACTIVE-ARTIFACT-SET.md` | `ALIGNMENT-DOC-QUALITY-SCORECARD.md` | `ALIGNMENT-ARTIFACT-PRUNING-POLICY.md` | Documentation Owner | Covered |
| Mode thrash / unstable process intensity | `ALIGNMENT-OPERATING-MODES.md` | `ALIGNMENT-MODE-TRANSITION-LOG.md` | `ALIGNMENT-COMMAND-CENTER.md` | Ops / PMO | Covered |
| Incident handled but no learning captured | `ALIGNMENT-ONCALL-ESCALATION-MATRIX.md` | `ALIGNMENT-INCIDENT-HOTWASH-TEMPLATE.md` | `ALIGNMENT-RETROSPECTIVE-TEMPLATE.md` | Ops / PMO | Covered |
| Weak evidence behind major changes | `ALIGNMENT-EVIDENCE-STANDARDS.md` | `ALIGNMENT-CHANGE-IMPACT-ASSESSMENT.md` | `ALIGNMENT-DECISION-CRITERIA.md` | Strategy Owner | Covered |
| Priority conflicts consume bandwidth | `ALIGNMENT-PRIORITY-RULES.md` | `ALIGNMENT-COMMAND-CENTER.md` | `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md` | Ops / PMO | Covered |

Add rows for newly observed failure modes each month.

---

## Coverage Status Definitions

- **Covered**: preventive + corrective + escalation controls all present and owned.
- **Partial**: one or more controls exist but ownership/cadence unclear.
- **Gap**: no usable control exists.

Any **Gap** status must create a blocker within 24 hours.

---

## Monthly Control Coverage Review

During monthly strategy sync:

1. Review all existing failure modes.
2. Update status (Covered / Partial / Gap).
3. Add newly observed failure modes from incident/hotwash logs.
4. Assign owners for all Partial/Gap items.

---

## Metrics

Track monthly:
- % failure modes fully covered,
- number of Partial/Gaps,
- average time to close control gaps,
- repeated incidents in supposedly Covered modes.

If repeated incidents occur in a Covered mode, reassess control quality, not just coverage.

---

## Integration Points

Use with:
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-ONCALL-ESCALATION-MATRIX.md`
- `ALIGNMENT-INCIDENT-HOTWASH-TEMPLATE.md`
- `ALIGNMENT-DOC-QUALITY-SCORECARD.md`
- `ALIGNMENT-CHANGELOG.md`
