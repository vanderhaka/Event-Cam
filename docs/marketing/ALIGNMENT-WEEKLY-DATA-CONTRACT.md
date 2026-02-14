# Alignment Weekly Data Contract

Use this contract to define the minimum dataset required before any weekly KPI, decision, or executive alignment review.

If required fields are missing, weekly conclusions should be treated as provisional.

---

## Purpose

This contract creates consistency across weekly reporting by enforcing:
- required field availability,
- source lineage clarity,
- freshness expectations,
- owner accountability.

---

## Contract Rule

A weekly alignment review is considered **data-ready** only when all **Critical Fields** pass validation.

If one or more Critical Fields fail:
- mark packet as **Provisional**,
- block high-impact decisions dependent on failed fields,
- open remediation item in blockers log.

---

## Critical Weekly Fields

| Field ID | Field Name | Why It Matters | Source Reference | Freshness SLA | Owner |
|---|---|---|---|---|---|
| WF-001 | Active path status | Confirms execution context | Path worksheet / active set | Weekly | Strategy Owner |
| WF-002 | P0 decision status | Detects strategic bottlenecks | Decisions log | Weekly | Ops / PMO |
| WF-003 | P1 decision status | Detects execution lag | Decisions log | Weekly | Ops / PMO |
| WF-004 | Top-line KPI snapshot | Core performance signal | Dashboard template | Weekly | Growth Lead |
| WF-005 | KPI threshold state (G/Y/R) | Action trigger integrity | Metric thresholds | Weekly | Growth Lead |
| WF-006 | Open High/Critical blockers | Execution risk visibility | Blockers log | Weekly | Ops / PMO |
| WF-007 | Open High/Critical contradictions | Narrative/commercial integrity | Contradiction register | Weekly | Strategy Owner |
| WF-008 | Active experiment states | Learning velocity and risk | Experiment registry | Weekly | Growth Lead |
| WF-009 | Decision SLA compliance | Decision system health | Decision SLA | Weekly | Ops / PMO |
| WF-010 | Active artifact freshness | Governance quality | Active artifact set + quality scorecard | Weekly | Documentation Owner |

---

## Optional (But Recommended) Weekly Fields

| Field ID | Field Name | Use Case |
|---|---|---|
| WF-011 | Assumption state deltas | Detect hidden confidence shifts |
| WF-012 | Dependency at-risk count | Forecast near-term delivery drag |
| WF-013 | Reversal requests open | Detect strategy instability |
| WF-014 | Data source reliability downgrades | Detect metric trust risks |

---

## Validation Status Codes

Use one status per field:

- **PASS** — field present, fresh, and reliable.
- **WARN** — field present but quality/freshness concern exists.
- **FAIL** — field missing, stale, or not trustworthy.

---

## Weekly Validation Table

| Field ID | Status (PASS/WARN/FAIL) | Notes | Action Owner | Remediation Due |
|---|---|---|---|---|
| WF-001 |  |  |  |  |
| WF-002 |  |  |  |  |
| WF-003 |  |  |  |  |
| WF-004 |  |  |  |  |
| WF-005 |  |  |  |  |
| WF-006 |  |  |  |  |
| WF-007 |  |  |  |  |
| WF-008 |  |  |  |  |
| WF-009 |  |  |  |  |
| WF-010 |  |  |  |  |

---

## Decision Gating Rules

### Automatically blocked decisions
Block high-impact approvals if any of these are FAIL:
- WF-002 (P0 decision status),
- WF-004 (top-line KPI snapshot),
- WF-005 (threshold state),
- WF-006 (critical blockers),
- WF-007 (critical contradictions).

### Caution decisions
If any relevant field is WARN:
- decision may proceed only with explicit confidence note and mitigation owner.

---

## Escalation Rules

Escalate immediately when:
- 2+ Critical Fields are FAIL in same week,
- same Critical Field fails for 2 consecutive weeks,
- data-ready status is not achieved before executive review.

Escalation owner: Ops / PMO.

---

## Weekly Output Requirement

Include contract status in weekly executive packet:
- Data-ready: Yes/No
- Critical field fails: count + IDs
- Decision blocks applied: Yes/No
- Remediation commitments: owner + due date

---

## Integration Points

Use with:
- `ALIGNMENT-WEEKLY-EXECUTIVE-PACKET.md`
- `ALIGNMENT-DATA-SOURCE-CATALOG.md`
- `ALIGNMENT-DATA-QUALITY-CHECKLIST.md`
- `ALIGNMENT-COMMAND-CENTER.md`
- `ALIGNMENT-BLOCKERS-LOG.md`
