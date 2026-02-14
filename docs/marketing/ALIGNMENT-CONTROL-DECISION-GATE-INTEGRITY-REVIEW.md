# Alignment Control Decision-Gate Integrity Review

Use this artifact to verify that control-based decision gates are enforced consistently and not bypassed under pressure.

If gates can be bypassed informally, governance quality collapses exactly when decision risk is highest.

---

## Purpose

This review ensures:
- critical decision gates are explicit, measurable, and enforced,
- gate bypasses are detected and corrected quickly,
- recurring gate failures trigger structural policy and workflow fixes.

---

## Scope

Run this review for:
- all CC-1-linked decision gates,
- gates tied to P0/high-impact P1 decisions,
- gates affected by overrides, exceptions, or emergency routing.

---

## Integrity Metrics

| Metric | Definition | Target |
|---|---|---:|
| Gate Enforcement Rate | % in-scope decisions that passed through required gates before approval | 100% |
| Gate Bypass Count | Decisions approved without required gate completion | 0 |
| Critical Gate Bypass Count | Bypasses involving CC-1-linked or P0 decision gates | 0 |
| Bypass Correction Lead Time | Time from bypass detection to correction/ratification | ≤ 2 business days |
| Repeat Bypass Pattern Count | Recurring bypass in same gate path across cycles | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| Enforced | Gate applied correctly with required evidence |
| Watch | Minor gate inconsistency with low immediate risk |
| Breached | Material gate bypass or invalid gate evidence |
| Recovering | Gate-integrity remediation underway with owner and due date |

---

## Canonical Review Table

| Review ID | Decision ID | Required Gate | Gate Completed (Y/N) | Evidence Valid (Y/N) | Status | Exposure Note | Correction Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| CGI-001 |  |  |  |  |  |  |  |  |
| CGI-002 |  |  |  |  |  |  |  |  |
| CGI-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing decision-gate integrity review:
- [ ] all in-scope decisions are checked against required gates,
- [ ] gate evidence validity is verified for each sampled decision,
- [ ] breached cases include impact and exposure notes,
- [ ] correction owners and due dates are assigned,
- [ ] repeat bypass causes are root-caused and actioned.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any critical gate bypass occurs,
- gate bypass count >0 for two consecutive cycles,
- gate enforcement rate drops below target for 2 cycles,
- repeat bypass pattern appears in same decision path.

Escalation output must include:
- breached gate list and risk exposure summary,
- remediation package with accountable owners,
- dated verification checkpoint proving restored gate integrity.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISION-PACKET-COMPLIANCE.md`
- `ALIGNMENT-DECISION-AUTHORITY-COMPLIANCE.md`
- `ALIGNMENT-OVERRIDE-REGISTER.md`
- `ALIGNMENT-CONTROL-PRECEDENCE-RULES.md`
- `ALIGNMENT-COMMAND-CENTER.md`
