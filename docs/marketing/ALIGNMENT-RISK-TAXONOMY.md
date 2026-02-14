# Alignment Risk Taxonomy

> Shared risk language for identifying, classifying, and responding to alignment failures.

---

## Risk Categories

## 1) Strategic Risks
Definition: threats that break path focus or create conflicting priorities.

Examples:
- Multiple primary paths active simultaneously
- Unresolved Priority 0 decisions
- Expansion work launched before core path stability

Primary owner: Founder / Strategy Owner

---

## 2) Commercial Risks
Definition: threats caused by inconsistent pricing, economics, or incentive design.

Examples:
- Contradictory pricing values across docs
- Commission model changes without downstream sync
- CAC/payback misinterpretation driving poor spend allocation

Primary owner: Finance + Growth

---

## 3) Execution Risks
Definition: threats caused by weak ownership, cadence breakdowns, or over-capacity.

Examples:
- Ownerless KPI or experiment
- No scale/hold/kill decisions in recurring reviews
- More than 5 concurrent experiments

Primary owner: Ops / PMO + Growth

---

## 4) Measurement Risks
Definition: threats caused by inconsistent metric definitions or low data quality.

Examples:
- Different teams using different KPI formulas
- Missing instrumentation for core funnel steps
- Trend breaks due to undocumented metric definition changes

Primary owner: Growth Analytics + Product

---

## 5) Compliance Risks
Definition: legal/policy threats in capture, messaging, or retention workflows.

Examples:
- Marketing outreach without proper consent handling
- Transactional vs marketing message ambiguity
- Data retention/deletion policy drift

Primary owner: Legal / Compliance

---

## 6) Communication Risks
Definition: threats caused by inconsistent internal or external narrative.

Examples:
- Old and new positioning active simultaneously
- Team confusion on “what we are not doing”
- External messaging outruns actual product readiness

Primary owner: Marketing Lead

---

## Severity Model

| Severity | Definition | Required Response Window |
|---|---|---|
| Critical | Likely to break core path execution or create major compliance/financial exposure | Immediate (same day) |
| High | Materially degrades execution quality or creates significant rework | 24 hours |
| Medium | Localized risk with manageable short-term impact | 72 hours |
| Low | Minor risk or early-warning signal | Weekly review |

---

## Escalation Triggers

Escalate automatically when:

1. Any Priority 0 decision remains blocked beyond due date.
2. Contradictory pricing appears in active strategy docs.
3. Alignment score drops below 13.
4. Compliance-sensitive decision is executed without sign-off.
5. Two consecutive weekly cycles close with no explicit decisions.

---

## Taxonomy Usage Rule

Every blocker in `ALIGNMENT-BLOCKERS-LOG.md` should include:
- risk category,
- severity level,
- owner,
- escalation deadline.

If category or severity is unknown, classify as **Execution / Medium** by default until reviewed.

