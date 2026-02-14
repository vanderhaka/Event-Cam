# Alignment Evidence Linkage Compliance

Use this artifact to verify that decisions, escalations, recoveries, and corrective actions are linked to concrete evidence.

Unlinked actions create narrative-driven governance where conclusions cannot be audited or reproduced.

---

## Purpose

This compliance review ensures:
- every high-impact action is evidence-traceable,
- evidence links remain current and accessible,
- unlinked decisions are blocked from closure when required.

---

## Scope

Check evidence linkage for:
- P0/P1 decision packets and closures,
- escalation and recovery outcomes,
- corrective-action closures,
- control-change approvals and verification claims.

---

## Linkage Metrics

| Metric | Definition | Target |
|---|---|---:|
| Evidence-Linked Item Rate | % in-scope items with valid evidence references | ≥ 95% |
| Broken Evidence Link Count | Number of evidence links missing/invalid at review time | 0 |
| Unlinked Critical Item Count | Critical items lacking required evidence links | 0 |
| Link Freshness Compliance | % evidence links within freshness window | ≥ 90% |
| Linkage Correction Lead Time | Time to repair broken/unlinked items | ≤ 2 business days |

---

## Compliance Status Model

| Status | Meaning |
|---|---|
| Linked | Required evidence links present and valid |
| At Risk | Links present but stale/partially invalid |
| Unlinked | Required evidence missing |
| Correcting | Linkage remediation in progress |

---

## Canonical Linkage Table

| Linkage ID | Item Type | Item ID | Required Evidence Source | Link Valid (Y/N) | Fresh (Y/N) | Status | Correction Owner | Correction Due |
|---|---|---|---|---|---|---|---|---|
| ELC-001 |  |  |  |  |  |  |  |  |
| ELC-002 |  |  |  |  |  |  |  |  |
| ELC-003 |  |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing linkage review:
- [ ] all in-scope critical items are sampled,
- [ ] required evidence source is explicitly named per item,
- [ ] broken/unlinked items have owner and due date,
- [ ] stale links include freshness recovery plan,
- [ ] corrected links are revalidated.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any critical item remains Unlinked beyond due date,
- broken-link count increases for 2 cycles,
- stale evidence linkage affects active P0/P1 decisions,
- repeated linkage failures occur in same workflow.

Escalation output must include:
- impacted item set and exposure summary,
- owner/accountability correction actions,
- dated linkage recovery checkpoints.

---

## Integration Points

Use with:
- `ALIGNMENT-EVIDENCE-STANDARDS.md`
- `ALIGNMENT-EVIDENCE-REFRESH-SCHEDULE.md`
- `ALIGNMENT-DECISION-PACKET-COMPLIANCE.md`
- `ALIGNMENT-CLOSURE-INTEGRITY-AUDIT.md`
- `ALIGNMENT-COMMAND-CENTER.md`
