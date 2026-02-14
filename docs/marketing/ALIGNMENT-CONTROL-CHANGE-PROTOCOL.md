# Alignment Control Change Protocol

Use this protocol when modifying active governance controls (rules, thresholds, workflows, or mandatory artifacts).

Control changes alter team behavior; unmanaged changes create confusion, silent non-compliance, and inconsistent decisions.

---

## Purpose

This protocol ensures:
- control changes are proposed with clear rationale,
- expected impact and risk are assessed before rollout,
- every change has verification and rollback conditions.

---

## When This Protocol Applies

Required for any change to:
- control thresholds or SLA targets,
- required weekly/monthly inputs,
- escalation triggers or severity logic,
- active control ownership/accountability rules,
- mandatory templates used in decision governance.

Minor wording-only clarifications may be logged without full protocol if no behavior changes.

---

## Change Workflow

1. **Propose**  
   Submit change with problem statement and intended outcome.

2. **Assess**  
   Evaluate cross-control impact, owner load impact, and failure-mode exposure.

3. **Approve**  
   Obtain approval according to control criticality.

4. **Roll Out**  
   Update affected artifacts and announce effective date.

5. **Verify**  
   Track expected signal changes during verification window.

6. **Retain or Roll Back**  
   Keep change if successful; rollback if signals worsen.

---

## Change Criticality Levels

| Level | Description | Approval Required | Verification Window |
|---|---|---|---:|
| C1 | Minor behavior impact | Control owner + Ops/PMO | 2 weeks |
| C2 | Material process impact | Strategy owner + Leadership delegate | 4 weeks |
| C3 | High-impact governance shift | Leadership approval | 6 weeks |

---

## Canonical Control Change Log

| Change ID | Date | Control(s) Changed | Criticality | Problem Addressed | Expected Benefit | Risk Owner | Approval | Effective Date | Verification Status |
|---|---|---|---|---|---|---|---|---|---|
| CCH-001 |  |  |  |  |  |  |  |  |  |
| CCH-002 |  |  |  |  |  |  |  |  |  |
| CCH-003 |  |  |  |  |  |  |  |  |  |

---

## Required Change Packet

Before approval, include:
- current pain signal (what is broken),
- controls/artifacts impacted,
- expected metric movement if change works,
- rollback trigger and owner,
- communication plan for affected teams.

No C2/C3 change may proceed without this packet.

---

## Rollback Triggers

Rollback or revise control change if during verification:
- decision SLA or quality metrics deteriorate,
- contradictions/slippage/incidents increase,
- owner load risk rises without offsetting benefit,
- adoption/compliance drops below agreed threshold.

---

## Escalation Triggers

Escalate when:
- C2/C3 change is introduced without full packet,
- 2+ control changes overlap with conflicting guidance,
- verification data is inconclusive beyond window.

Escalation output must include:
- keep/revise/rollback decision,
- next owner and due date,
- updated risk notes in control logs.

---

## Integration Points

Use with:
- `ALIGNMENT-CHANGE-IMPACT-ASSESSMENT.md`
- `ALIGNMENT-CHANGELOG.md`
- `ALIGNMENT-CONTROL-PRECEDENCE-RULES.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-CONTROL-PORTFOLIO-REVIEW.md`
