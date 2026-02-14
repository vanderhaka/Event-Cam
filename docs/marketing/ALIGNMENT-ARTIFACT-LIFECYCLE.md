# Alignment Artifact Lifecycle

> Defines how alignment artifacts are created, updated, versioned, and retired.

---

## Lifecycle States

| State | Meaning | Typical Action |
|---|---|---|
| Draft | New artifact or major revision under active development | Build and validate with core stakeholders |
| Active | Approved artifact in current operational use | Maintain and reference in cadence |
| Superseded | Replaced by a newer artifact/version | Keep for audit, point to replacement |
| Archived | No longer operationally relevant | Retain historical record, remove from active routing |

---

## State Transition Rules

1. **Draft → Active**
   - Requires owner assignment
   - Requires index inclusion
   - Requires initial usage guidance

2. **Active → Superseded**
   - Requires explicit replacement artifact
   - Requires changelog entry with rationale
   - Requires routing updates in artifacts index

3. **Superseded → Archived**
   - Requires confirmation artifact is unused in active cadence
   - Requires archive note with retirement date

---

## Change Types

| Change Type | Description | Required Controls |
|---|---|---|
| Minor | Formatting/clarity updates, no process change | Optional changelog note |
| Material | Changes to process, ownership, metrics, cadence | Mandatory changelog entry + decision log link |
| Structural | New artifact or retirement of active artifact | Changelog entry + index update + owner communication |

---

## Ownership & Review

- Every active artifact must have:
  - owner role,
  - review cadence,
  - last reviewed date.

- Suggested review rhythm:
  - Tactical artifacts (weekly): review every 2 weeks
  - Strategic artifacts (monthly/quarterly): review monthly
  - Retrospective/maturity artifacts: review quarterly

---

## Deprecation Checklist

Before deprecating an active artifact:

- [ ] Replacement exists (or explicit rationale for removal)
- [ ] Dependencies are identified (which docs/processes reference it)
- [ ] Index is updated
- [ ] Changelog entry added
- [ ] Owners are notified

---

## Auditability Rule

No active artifact should be silently replaced.

Every material change must be traceable through:
- `ALIGNMENT-CHANGELOG.md`
- `ALIGNMENT-DECISIONS-LOG.md` (if decision-linked)
- updated references in `ALIGNMENT-ARTIFACTS-INDEX.md`

