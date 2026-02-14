# Alignment Narrative Guardrails

This document defines the non-negotiable narrative rules that keep strategy, messaging, and execution consistent across docs and channels.

Use this with:
- `MARKETING-DOCS-REVIEW.md`
- `ALIGNMENT-README.md`
- `ALIGNMENT-GLOSSARY.md`
- `ALIGNMENT-GOVERNANCE-CHARTER.md`

---

## Why This Exists

Most alignment drift starts as narrative drift:
- teams describing different priorities in different places,
- pricing and positioning language diverging across docs,
- channel messaging promising things the product path cannot support.

These guardrails create one source of narrative truth.

---

## Narrative Stack (Top to Bottom)

All communication should cascade through this stack in order:

1. **Strategic Thesis**  
   What market problem we are solving and why this path is chosen now.
2. **Core Promise**  
   What outcome users should expect from the product.
3. **Proof Points**  
   What evidence supports the promise (features, metrics, customer signal).
4. **Offer Mechanics**  
   How pricing/account structure maps to value delivery.
5. **Channel Framing**  
   How message is adapted for acquisition channels without changing meaning.

If lower layers contradict upper layers, update the lower layer first.

---

## Non-Negotiable Narrative Rules

### Rule 1 — One Primary Path Narrative
At any given time, only one primary strategic path may be presented as “current.”

Allowed:
- one primary path + clearly labeled future options.

Not allowed:
- presenting multiple active paths with equal priority.

### Rule 2 — One Canonical Pricing Story
All pricing references must map to a single canonical structure.

If exceptions exist (promo, partner, legacy), they must be explicitly labeled as exceptions.

### Rule 3 — Promise-Proof Integrity
Every high-confidence claim must have at least one proof reference:
- metric,
- user evidence,
- product capability,
- operating process.

### Rule 4 — ICP Specificity
All strategic docs must specify:
- primary ICP,
- secondary ICP,
- exclusion criteria (who this path is *not* for right now).

### Rule 5 — Channel-Message Coherence
Channel copy can vary in tone, but must not alter:
- target ICP,
- value hierarchy,
- pricing architecture,
- success definition.

### Rule 6 — Temporal Clarity
Every major narrative statement must be tagged as one of:
- **Now** (current quarter),
- **Next** (next quarter),
- **Later** (future exploration).

---

## Canonical Narrative Template

Use this short form at the top of strategic and operating docs.

### Current Narrative Snapshot
- Strategic thesis:
- Primary ICP:
- Core promise:
- Pricing story:
- Primary channel priority:
- KPI definition of success:
- Valid through (date):

---

## Narrative Drift Triggers

Treat these as immediate review triggers:

- Two docs describe different primary ICPs.
- Pricing numbers differ across active docs.
- Channel plan assumes a different product path than decision log.
- Public messaging promises “future” capability as if current.
- Decision log closes a path change but docs remain unchanged after 48 hours.

When any trigger appears, open an item in `ALIGNMENT-BLOCKERS-LOG.md`.

---

## Review Cadence

### Weekly (light)
- Check active campaign copy against current narrative snapshot.
- Verify no new contradictory wording in decision notes.

### Monthly (full)
- Compare strategic docs and templates against:
  - decision log,
  - KPI thresholds,
  - active channel strategy.
- Record pass/fail in monthly review notes.

### Quarterly (reset)
- Re-issue narrative snapshot with effective date and owner sign-off.

---

## Narrative QA Checklist

Before publishing or sharing any strategic doc, confirm:

- [ ] Primary path is explicit and singular.
- [ ] ICP is named and exclusion criteria are clear.
- [ ] Pricing language matches canonical model.
- [ ] Claims are supported by proof points.
- [ ] “Now / Next / Later” labels are present.
- [ ] Success metric is named and measurable.
- [ ] Owner + validity date are included.

---

## Ownership

- **Primary owner:** Marketing Lead
- **Co-owner:** Strategy Owner
- **Consulted:** Growth Lead, Product Lead
- **Escalation owner:** Founder / CEO

If narrative conflicts persist for more than 5 business days, escalate in the weekly decision review and force a close date.
