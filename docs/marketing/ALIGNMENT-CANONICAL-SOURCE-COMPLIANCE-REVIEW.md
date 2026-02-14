# Alignment Canonical Source Compliance Review

Use this artifact to verify that teams are using the declared canonical source for each operating domain.

When teams pull values from non-canonical docs, contradictions and decision drift reappear quickly.

---

## Purpose

This review ensures:
- canonical source rules are followed in weekly operations,
- source-of-truth violations are detected and corrected early,
- repeated non-canonical usage triggers stronger governance intervention.

---

## Scope

Review source usage across:
- decision packets and review notes,
- dashboard and executive packet inputs,
- escalation and corrective-action references,
- strategy and pricing narrative updates.

---

## Compliance Metrics

| Metric | Definition | Target |
|---|---|---:|
| Canonical Source Compliance Rate | % sampled references that use declared canonical source | ≥ 95% |
| Non-Canonical Reference Count | Number of sampled references using non-canonical source | 0 or declining |
| Contradiction Reintroduction Rate | % contradictions tied to non-canonical source usage | ≤ 10% |
| Correction Lead Time | Time from violation detection to corrected reference | ≤ 2 business days |
| Repeat Violation Count | Repeated violations by same team/workflow in one cycle | declining trend |

---

## Compliance Status Model

| Status | Meaning |
|---|---|
| Compliant | Canonical source used correctly |
| Minor Violation | Non-canonical reference with low immediate impact |
| Material Violation | Non-canonical reference with decision/KPI impact risk |
| Correcting | Violation identified and update in progress |

---

## Canonical Compliance Table

| Review ID | Domain | Declared Canonical Source | Observed Source Used | Violation Level | Impacted Artifact | Correction Owner | Correction Due Date | Verified Fixed (Y/N) |
|---|---|---|---|---|---|---|---|---|
| CSRV-001 |  |  |  |  |  |  |  |  |
| CSRV-002 |  |  |  |  |  |  |  |  |
| CSRV-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before finalizing compliance review:
- [ ] all high-impact domains are sampled,
- [ ] canonical map references are current,
- [ ] material violations include decision-impact note,
- [ ] correction owners and due dates are assigned,
- [ ] fixes are revalidated after updates.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- material source violations affect active P0/P1 decisions,
- same domain shows repeated source violations in 2+ cycles,
- correction due dates are missed for material violations,
- non-canonical usage reintroduces previously closed contradictions.

Escalation output must include:
- violating domains and impact summary,
- canonical-source reinforcement actions,
- owner accountability updates and verification dates.

---

## Integration Points

Use with:
- `ALIGNMENT-CANONICAL-SOURCE-MAP.md`
- `ALIGNMENT-CONTRADICTION-REGISTER.md`
- `ALIGNMENT-DECISION-PACKET-COMPLIANCE.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
