# Alignment Control Intervention Durability Review

Use this artifact to verify that control interventions remain effective over time instead of regressing after initial improvement.

Short-term wins can mask fragile fixes; without durability checks, teams repeatedly pay for the same intervention.

---

## Purpose

This review ensures:
- intervention gains persist across multiple operating cycles,
- regression is detected before it reintroduces prior risk exposure,
- repeat intervention cost is reduced through durable control design.

---

## Scope

Run this review for:
- all CC-1 control interventions,
- CC-2 interventions tied to active P0/P1 decisions,
- interventions with prior recurrence, reopen, or slippage history.

---

## Durability Metrics

| Metric | Definition | Target |
|---|---|---:|
| Durability Coverage Rate | % in-scope interventions with post-fix durability checks | 100% |
| Regression Count | Interventions where performance deteriorates after initial stabilization | 0 |
| Durable Intervention Rate | % interventions that maintain target performance through verification window | ≥ 95% |
| Durability Correction On-Time Rate | % regression corrections closed by due date | ≥ 95% |
| Repeat Regression Pattern Count | Interventions regressing in consecutive review windows | 0 |

---

## Status Model

| Status | Meaning |
|---|---|
| Durable | Intervention remains effective through verification window |
| Watch | Early weakness signals observed but target still met |
| Regressing | Performance has dropped below required threshold |
| Recovering | Regression correction actions active with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Intervention ID | Verification Window | Current Status | Regression Detected (Y/N) | Durability Owner | Correction Due |
|---|---|---|---|---|---|---|---|
| CID-001 |  |  |  |  |  |  |  |
| CID-002 |  |  |  |  |  |  |  |
| CID-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing intervention-durability review:
- [ ] all in-scope interventions have defined verification windows,
- [ ] durability evidence is linked to canonical signals,
- [ ] regressing interventions have correction owners and due dates,
- [ ] repeat regression patterns are root-caused,
- [ ] post-correction run confirms durable recovery.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 intervention is Regressing for two cycles,
- regression count >0 for two cycles,
- durable intervention rate drops below target,
- repeat regression pattern count >0 in any cycle.

Escalation output must include:
- regressing intervention list with exposure summary,
- durability-hardening package with accountable owners,
- dated checkpoint proving sustained recovery.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-INTERVENTION-EFFECT-LAG-REVIEW.md`
- `ALIGNMENT-RECOVERY-WINDOW-COMPLIANCE.md`
- `ALIGNMENT-CONTROL-ESCAPE-DEFECT-REVIEW.md`
- `ALIGNMENT-CONTROL-EFFECTIVENESS-SCORECARD.md`
- `ALIGNMENT-COMMAND-CENTER.md`
