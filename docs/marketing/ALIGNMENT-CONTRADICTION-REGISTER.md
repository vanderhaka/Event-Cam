# Alignment Contradiction Register

Use this register to track, resolve, and audit contradictions across strategy, pricing, channel, and operating docs.

This is the canonical place to prevent “two truths” from persisting in parallel.

---

## Why This Exists

Contradictions are a primary source of alignment failure:
- teams execute different assumptions,
- leadership reads conflicting narratives,
- channels communicate mismatched offers.

This register forces explicit ownership and closure deadlines for every contradiction.

---

## Contradiction Definition

A contradiction exists when two or more active artifacts assert incompatible statements about:
- target audience,
- pricing model,
- account architecture,
- operating priority,
- KPI definitions,
- product capability timing.

---

## Register Fields

Each contradiction entry must include:

- **CID** (Contradiction ID)
- **Status** (`Open`, `Under Review`, `Resolved`, `Superseded`)
- **Domain** (Strategy, Pricing, Channel, Product, Metrics, Governance)
- **Conflicting Statement A** (with source doc + section)
- **Conflicting Statement B** (with source doc + section)
- **Impact Severity** (Low / Medium / High / Critical)
- **Decision Owner**
- **Docs Owner(s)**
- **Resolution Decision ID** (from decision log)
- **Target Resolution Date**
- **Actual Resolution Date**
- **Verification Complete** (`Yes` / `No`)
- **Notes**

---

## Contradiction Register Table (Canonical)

| CID | Status | Domain | Statement A | Statement B | Severity | Decision Owner | Target Date | Decision ID | Verified |
|---|---|---|---|---|---|---|---|---|---|
| CID-001 | Open | Pricing | [Doc + quote] | [Doc + quote] | High | [Owner] | [Date] | [Pending] | No |
| CID-002 | Open | Strategy |  |  | Medium |  |  |  | No |
| CID-003 | Open | Channel |  |  | Medium |  |  |  | No |

---

## Resolution Workflow

### Step 1 — Log
Add contradiction within 24 hours of discovery.

### Step 2 — Classify
Assign severity and domain.

### Step 3 — Decide
Route to decision meeting using:
- `ALIGNMENT-DECISION-CRITERIA.md`
- `ALIGNMENT-PRIORITY0-DECISION-BRIEF.md` (if path-defining)

### Step 4 — Update Docs
Synchronize all affected artifacts within 48 hours of decision closure.

### Step 5 — Verify
Run contradiction check:
- source docs updated,
- index references still accurate,
- no remaining conflicting language.

Mark **Verified = Yes** only when all checks pass.

---

## Severity Guidance

- **Critical**: Blocks current-quarter path execution or creates direct commercial/legal risk.
- **High**: Likely to degrade conversion, team focus, or leadership decision quality.
- **Medium**: Creates confusion but not immediate execution blockage.
- **Low**: Terminology mismatch with minimal operational impact.

Critical and High contradictions must appear in:
- `ALIGNMENT-BLOCKERS-LOG.md`
- weekly decision review notes.

---

## SLA for Contradiction Closure

| Severity | Owner Assignment | Decision Due | Sync Complete |
|---|---|---|---|
| Critical | same day | 3 business days | +2 business days |
| High | 1 business day | 5 business days | +3 business days |
| Medium | 3 business days | 10 business days | +5 business days |
| Low | 5 business days | 20 business days | next monthly sync |

If Sync Complete date slips, open escalation in blockers log.

---

## Weekly Review Protocol

In weekly decision review:
1. Count open contradictions by severity.
2. Highlight overdue critical/high items.
3. Force owner confirmation and updated dates.
4. Escalate any contradiction unresolved beyond SLA.

---

## Monthly Audit Protocol

At month-end:
- Sample at least 5 resolved contradictions,
- verify decision → doc update traceability,
- log false closures (marked resolved but still conflicting),
- publish contradiction closure rate.

---

## KPI Suggestions

- **Open Contradictions by Severity**
- **Median Time to Resolve**
- **SLA Breach Rate**
- **False Closure Rate**
- **Repeat Contradiction Rate** (same domain recurring)

Track these in dashboard/scorecard when contradiction volume is non-trivial.
