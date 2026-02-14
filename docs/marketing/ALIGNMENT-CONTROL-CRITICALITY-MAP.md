# Alignment Control Criticality Map

Use this artifact to classify active controls by criticality so operating effort and escalation rigor match real risk impact.

Treating all controls as equally critical creates either overload (too much rigor) or exposure (too little rigor).

---

## Purpose

This map ensures:
- critical controls receive priority monitoring and faster recovery,
- moderate/low controls are governed proportionally,
- portfolio decisions preserve required risk coverage.

---

## Criticality Levels

| Level | Definition | Required Operating Discipline |
|---|---|---|
| CC-1 (Mission-Critical) | Failure can compromise P0 decisions, legal/compliance posture, or core data integrity | Daily/weekly monitoring + immediate escalation on breach |
| CC-2 (High) | Failure materially degrades decision quality, execution reliability, or escalation response | Weekly monitoring + rapid remediation |
| CC-3 (Moderate) | Failure causes inefficiency or minor quality drift without immediate major impact | Weekly/bi-weekly review with planned correction |
| CC-4 (Low) | Optimization control with limited near-term risk if degraded | Monthly review and backlog-based improvement |

---

## Criticality Criteria

Score each control against:
1. decision impact severity,
2. incident/exposure potential,
3. dependency centrality (how many controls rely on it),
4. reversibility if failure occurs,
5. detection speed of failure.

Controls with highest aggregate risk should be mapped to CC-1/CC-2.

---

## Canonical Criticality Table

| Control Artifact | Criticality Level | Primary Risk Domain | Dependency Centrality (High/Med/Low) | Monitoring Cadence | Escalation SLA | Owner |
|---|---|---|---|---|---|---|
| [Artifact 1] |  |  |  |  |  |  |
| [Artifact 2] |  |  |  |  |  |  |
| [Artifact 3] |  |  |  |  |  |  |

---

## Required Rules by Criticality

- **CC-1 controls**
  - must have backup owner,
  - must be included in weekly executive packet,
  - cannot be retired without leadership sign-off and verification window.

- **CC-2 controls**
  - must be reviewed weekly,
  - must have documented remediation path for non-compliance.

- **CC-3/CC-4 controls**
  - may be optimized/merged with lighter cadence if risk remains stable.

---

## Change and Reclassification Rules

- Reclassify criticality when:
  - dependency centrality changes materially,
  - incident linkage indicates higher/lower impact,
  - operating mode shifts alter risk tolerance.

- Any CC-1 downgrade requires:
  - evidence of stable risk for at least one full cycle,
  - approval via control-change protocol.

---

## Escalation Triggers

Escalate when:
- any CC-1 control is non-compliant or broken beyond one business day,
- 2+ CC-1/CC-2 controls are simultaneously at risk,
- criticality map is not updated after portfolio review or major mode shift,
- control retirement is proposed for CC-1 without full packet.

Escalation output must include:
- criticality decision and rationale,
- immediate risk-containment actions,
- updated owners and cadence commitments.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-PORTFOLIO-REVIEW.md`
- `ALIGNMENT-CONTROL-DEPENDENCY-MAP.md`
- `ALIGNMENT-CONTROL-CHANGE-PROTOCOL.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-COMMAND-CENTER.md`
