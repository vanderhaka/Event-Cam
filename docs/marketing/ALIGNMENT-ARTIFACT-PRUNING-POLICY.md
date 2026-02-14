# Alignment Artifact Pruning Policy

Use this policy to prevent documentation bloat and keep the alignment system operationally usable.

As artifact count grows, unused or overlapping docs become hidden sources of confusion and drift.

---

## Purpose

This policy defines how to:
- identify low-value artifacts,
- merge or retire redundant docs,
- preserve auditability while reducing complexity.

---

## Pruning Principles

1. **Utility over completeness**  
   Keep only artifacts that are actively improving decisions or execution.

2. **One artifact per operating job**  
   If two docs serve the same decision/use case, merge them.

3. **Retire with traceability**  
   Pruned artifacts must leave an audit trail and successor reference.

4. **Protect core controls**  
   Do not prune mandatory governance controls without leadership approval.

---

## Pruning Candidates

An artifact becomes a pruning candidate if any of these are true:

- not updated for 90+ days and not referenced in meetings,
- duplicated content exists in a stronger canonical artifact,
- owners cannot explain current operational use,
- repeated low scores in `ALIGNMENT-DOC-QUALITY-SCORECARD.md`,
- causes conflicting interpretation versus newer canonical docs.

---

## Keep / Merge / Retire Decision Rules

### Keep
Use when artifact is:
- regularly used,
- decision-relevant,
- low-overhead to maintain.

### Merge
Use when:
- two artifacts have >50% overlap,
- one can absorb the other with clearer ownership.

### Retire
Use when:
- artifact has no active operational role,
- content is stale and non-critical,
- successor artifact exists or content is obsolete.

---

## Mandatory Pre-Prune Checklist

Before pruning any artifact:

- [ ] Confirm no active process depends on it.
- [ ] Identify successor artifact (if applicable).
- [ ] Log rationale in `ALIGNMENT-CHANGELOG.md`.
- [ ] Update routing in `ALIGNMENT-ARTIFACTS-INDEX.md`.
- [ ] Mark lifecycle state in `ALIGNMENT-ARTIFACT-LIFECYCLE.md`.
- [ ] Notify affected owners in weekly decision review.

If any item is incomplete, pruning cannot proceed.

---

## Pruning Cadence

### Monthly Light Pass
- Review artifacts with low usage signals.
- Flag candidates for deeper review.

### Quarterly Full Prune Review
- Score all active artifacts for utility and overlap.
- Execute merge/retire actions with owner sign-off.

---

## Pruning Score (0–10)

Use this quick score to prioritize pruning candidates:

- **Usage Frequency (0–3)**
- **Unique Value (0–3)**
- **Maintenance Burden (0–2, reverse-scored)**
- **Conflict Risk if kept (0–2)**

Interpretation:
- **0–3:** Retire candidate
- **4–6:** Merge candidate
- **7–10:** Keep

---

## Protected Artifacts (Default Non-Prunable)

These are protected unless explicitly superseded by approved replacements:

- `ALIGNMENT-ARTIFACTS-INDEX.md`
- `ALIGNMENT-DECISIONS-LOG.md`
- `ALIGNMENT-CHECKLIST.md`
- `ALIGNMENT-DECISION-SLA.md`
- `ALIGNMENT-GOVERNANCE-CHARTER.md`

---

## Escalation Rules

Escalate pruning decisions when:
- owner disagreement persists >7 days,
- candidate is referenced by leadership reporting,
- pruning impacts compliance/risk controls.

Escalation owner: Strategy Owner + Ops / PMO.

---

## Integration Points

Use with:
- `ALIGNMENT-ARTIFACT-LIFECYCLE.md`
- `ALIGNMENT-DOC-QUALITY-SCORECARD.md`
- `ALIGNMENT-CHANGELOG.md`
- `ALIGNMENT-ARTIFACTS-INDEX.md`
