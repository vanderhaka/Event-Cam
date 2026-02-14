# Alignment Decision Reversal Protocol

Use this protocol when a previously closed decision is no longer producing acceptable outcomes and must be modified, rolled back, or replaced.

---

## Why This Exists

Teams often hesitate to reverse decisions because reversal feels like failure.
In reality, disciplined reversal is a core alignment capability.

This protocol ensures reversals are:
- evidence-based,
- fast,
- auditable,
- synchronized across affected artifacts.

---

## Reversal Triggers

A reversal workflow must be opened when any of these occur:

1. **Sustained KPI underperformance**  
   The decision-linked KPI is Off Track for 2+ consecutive weekly reviews.

2. **Guardrail breach**  
   A defined guardrail metric crosses a red threshold.

3. **Assumption failure**  
   A high-impact assumption linked to the decision is marked Rejected.

4. **Contradiction escalation**  
   Decision introduces unresolved contradictions across active artifacts beyond SLA.

5. **Execution infeasibility**  
   Dependency or operational constraints make delivery non-viable within agreed window.

---

## Reversal States

Track each reversal request in one state:

- **Proposed** — Trigger identified, request opened.
- **Evaluating** — Options being assessed.
- **Approved** — Reversal choice selected with owner sign-off.
- **Executing** — Changes being rolled out across artifacts/process.
- **Verified** — Post-reversal signals confirm stabilization.
- **Closed** — Final documentation complete.

---

## Reversal Request Template

### Metadata
- Reversal ID:
- Original Decision ID:
- Reversal Owner:
- Date Opened:
- Required Decision Date:

### Trigger Context
- Trigger type(s):
- Evidence summary:
- Severity:
- Immediate business risk if unchanged:

### Options Considered
1. Keep as-is + mitigation
2. Partial rollback
3. Full rollback
4. Replace with alternative decision

### Chosen Path
- Selected option:
- Why selected:
- Expected KPI impact:
- Risks introduced by reversal:

### Implementation Scope
- Docs to update:
- Workstreams impacted:
- Dependencies:
- Effective date:

### Verification Plan
- Primary KPI to watch:
- Guardrails:
- Verification window:
- Closure criteria:

---

## SLA Expectations

| Reversal Severity | Evaluation Complete | Approval Due | Execution Start | Verification Window |
|---|---|---|---|---|
| Critical | 1 business day | 2 business days | same day as approval | 7 days |
| High | 2 business days | 4 business days | within 1 business day | 14 days |
| Medium | 5 business days | 10 business days | within 3 business days | 21 days |
| Low | next monthly review | next monthly review | planned cycle | next monthly cycle |

---

## Mandatory Update Sequence

After reversal approval, update in this order:

1. `ALIGNMENT-DECISIONS-LOG.md` (new superseding decision entry)
2. `ALIGNMENT-TRACEABILITY-MATRIX.md` (mark prior chain and add reversal chain)
3. `ALIGNMENT-CONTRADICTION-REGISTER.md` (close or reclassify contradiction links)
4. `ALIGNMENT-DASHBOARD-TEMPLATE.md` (updated expected KPI direction)
5. affected strategy/operating artifacts

No reversal is complete until this sequence is done.

---

## Verification Checklist

Before closing reversal:

- [ ] Superseding decision logged.
- [ ] All impacted docs synced.
- [ ] New KPI direction explicitly tracked.
- [ ] No unresolved Critical contradiction remains.
- [ ] Owner confirms stabilization or next-step escalation.

If any item fails, keep status at Executing or Verified (not Closed).

---

## Escalation Rules

Escalate to leadership immediately when:
- a Priority 0 decision requires full rollback,
- reversal introduces new Critical risk,
- verification window ends without stabilization.

Leadership must choose one path by next decision review:
- extend verification,
- execute second reversal,
- freeze affected workstream.

---

## Learning Capture

For every closed reversal, log:
- root cause category,
- earliest missed signal,
- prevention action for future decisions.

Feed these learnings into:
- `ALIGNMENT-RETROSPECTIVE-TEMPLATE.md`
- `ALIGNMENT-ASSUMPTION-REGISTRY.md`
- `ALIGNMENT-DECISION-CRITERIA.md`
