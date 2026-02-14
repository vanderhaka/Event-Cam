# Alignment ID Standards

Use this standard to keep identifiers consistent across all alignment artifacts.

Inconsistent IDs break traceability between decisions, experiments, blockers, dependencies, and outcomes.

---

## Purpose

This document defines:
- canonical ID prefixes,
- formatting rules,
- generation and ownership conventions,
- cross-artifact reference requirements.

---

## Canonical ID Prefixes

| Object | Prefix | Example |
|---|---|---|
| Decision | `DEC-` | `DEC-042` |
| Priority 0 Decision Brief | `P0-` | `P0-007` |
| Experiment | `EXP-` | `EXP-019` |
| Assumption | `ASM-` | `ASM-033` |
| Contradiction | `CID-` | `CID-014` |
| Blocker | `BLK-` | `BLK-021` |
| Dependency | `DEP-` | `DEP-015` |
| Traceability Row | `TR-` | `TR-026` |
| Reversal Request | `REV-` | `REV-004` |
| Risk Item | `RSK-` | `RSK-030` |

Do not invent additional prefixes without updating this standard and the index.

---

## Format Rules

1. Use uppercase prefix + 3-digit sequence minimum.
   - Valid: `DEC-001`, `EXP-128`
   - Invalid: `dec1`, `Exp_02`, `DEC42`

2. IDs are immutable.
   - Never rename an existing ID after publication.

3. IDs are unique within their object type.
   - Duplicate IDs are not allowed even across archived records.

4. Use zero padding for readability and sorting.
   - `DEC-009` before `DEC-010`.

---

## ID Generation Rules

### Manual generation (default)
- Use next sequential number in the relevant artifact log.
- Reserve IDs only when the item is expected to be entered in same cycle.

### Optional automated generation
- If automation is introduced, it must preserve prefix and sequence format.
- Automated IDs must still be human-readable.

---

## Cross-Reference Rules

When one object depends on another, include explicit ID links:

- Experiment rows should reference `DEC-` and/or `ASM-` when applicable.
- Traceability rows must include a `DEC-` ID.
- Reversal requests must include original `DEC-` ID.
- Contradictions closed by decision must include `DEC-` link.
- Blockers tied to dependencies should include both `BLK-` and `DEP-` links.

If ID references are missing, the item is considered partially invalid.

---

## ID Lifecycle Handling

- **Active** IDs stay in active tables.
- **Closed/Resolved** IDs remain visible for audit history.
- **Superseded** IDs must reference successor ID in notes.
- **Archived** IDs are never reused.

---

## Error Handling

If duplicate or malformed IDs are found:

1. Open a blocker in `ALIGNMENT-BLOCKERS-LOG.md`.
2. Freeze affected entries until corrected.
3. Log correction in `ALIGNMENT-CHANGELOG.md`.
4. Re-run cross-reference checks in affected artifacts.

---

## Weekly ID Hygiene Check

During weekly operations:

- scan for duplicates,
- scan for malformed formats,
- scan for missing cross-links.

Record defects and owner in the command center notes.

---

## Integration Points

Use with:
- `ALIGNMENT-DECISIONS-LOG.md`
- `ALIGNMENT-EXPERIMENT-REGISTRY.md`
- `ALIGNMENT-ASSUMPTION-REGISTRY.md`
- `ALIGNMENT-CONTRADICTION-REGISTER.md`
- `ALIGNMENT-TRACEABILITY-MATRIX.md`
- `ALIGNMENT-DECISION-REVERSAL-PROTOCOL.md`
