# Alignment Control Adoption Compliance

Use this artifact to verify whether newly introduced or recently changed controls are being adopted in real operating workflows.

A control can be documented and “active” but still fail if teams do not execute it consistently.

---

## Purpose

This compliance review ensures:
- mandatory control steps are followed in practice,
- adoption gaps are identified by team/workflow,
- low-adoption controls trigger enablement or redesign quickly.

---

## Scope

Track adoption for:
- new controls launched in last 90 days,
- C2/C3 control changes in verification windows,
- controls with repeated override or non-compliance patterns.

---

## Adoption Metrics

| Metric | Definition | Target |
|---|---|---:|
| Control Adoption Rate | % required workflows correctly executing control steps | ≥ 90% |
| First-Cycle Compliance Rate | % teams compliant in first full cycle after control launch/change | ≥ 80% |
| Repeat Non-Compliance Rate | % workflows failing same control 2+ cycles in a row | ≤ 15% |
| Enablement Coverage | % affected owners receiving control brief/training | 100% |
| Time-to-Adoption | Time from control effective date to stable compliance | ≤ 4 weeks |

---

## Compliance Status Model

| Status | Meaning |
|---|---|
| Compliant | Control followed with no material deviation |
| Partial | Control partially followed; quality/reliability at risk |
| Non-Compliant | Required control steps missing or bypassed |
| Recovering | Remediation active after non-compliance |

---

## Canonical Adoption Table

| Control Artifact | Effective Date | Workflow/Team | Required Step | Compliance Result (Compliant/Partial/Non-Compliant) | Owner | Remediation Action | Target Recovery Date |
|---|---|---|---|---|---|---|---|
| [Control 1] |  |  |  |  |  |  |  |
| [Control 2] |  |  |  |  |  |  |  |
| [Control 3] |  |  |  |  |  |  |  |

---

## Adoption Quality Gate

Before declaring a control stably adopted:
- [ ] compliance ≥ target for 2 consecutive cycles,
- [ ] no critical workflow remains non-compliant,
- [ ] owners confirm control steps are operationally clear,
- [ ] non-compliance root causes are documented and addressed,
- [ ] exception/override volume is within expected range.

If any item is unchecked, status should remain Recovering.

---

## Remediation Playbook

When non-compliance is detected:
1. classify cause (clarity, training, load, dependency, tooling),
2. apply focused enablement and ownership reset,
3. run one-cycle recheck with explicit evidence requirements,
4. escalate to control redesign if failures persist.

---

## Escalation Triggers

Escalate when:
- control adoption rate drops below 75% in any cycle,
- same control remains non-compliant for 2+ cycles,
- non-compliance affects P0/P1 decisions or critical signals,
- C2/C3 control change shows declining adoption during verification.

Escalation output must include:
- root-cause class summary,
- owner support/reassignment decision,
- keep/revise/rollback recommendation for affected control.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-CHANGE-PROTOCOL.md`
- `ALIGNMENT-OVERRIDE-REGISTER.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WORKING-AGREEMENTS.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
