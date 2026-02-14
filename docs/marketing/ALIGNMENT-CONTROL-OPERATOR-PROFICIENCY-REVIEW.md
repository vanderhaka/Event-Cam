# Alignment Control Operator Proficiency Review

Use this artifact to verify that control operators have the practical skill to execute critical controls accurately under normal and stressed conditions.

Well-designed controls still fail when operator proficiency drifts below required execution quality.

---

## Purpose

This review ensures:
- critical-control operators maintain current execution proficiency,
- proficiency gaps are identified before causing control failures,
- retraining and validation close capability gaps quickly.

---

## Scope

Run proficiency review for:
- all operators on CC-1 controls,
- operators on CC-2 controls tied to active P0/P1 decisions,
- newly assigned or recently transitioned control operators.

---

## Proficiency Metrics

| Metric | Definition | Target |
|---|---|---:|
| Operator Certification Coverage Rate | % in-scope operators with current role certification | 100% |
| Proficiency Validation Pass Rate | % in-scope operators passing practical validation checks | ≥ 95% |
| Critical Skill Gap Count | Number of CC-1 operators missing required capabilities | 0 |
| Retraining Completion SLA | % proficiency-gap retraining completed within SLA | ≥ 95% |
| Repeat Proficiency Defect Count | Operators failing validation in consecutive cycles | declining trend |

---

## Status Model

| Status | Meaning |
|---|---|
| Proficient | Operator is certified and passes required practical checks |
| Watch | Minor proficiency gaps detected; low immediate risk |
| At Risk | Material capability gap threatens reliable control execution |
| Recovering | Retraining/revalidation in progress with owner and due date |

---

## Canonical Review Table

| Review ID | Control Artifact | Operator | Certification Current (Y/N) | Practical Validation Passed (Y/N) | Status | Gap Owner | Revalidation Due |
|---|---|---|---|---|---|---|---|
| CPR-001 |  |  |  |  |  |  |  |
| CPR-002 |  |  |  |  |  |  |  |
| CPR-003 |  |  |  |  |  |  |  |

---

## Review Quality Gate

Before closing operator-proficiency review:
- [ ] all in-scope operators are mapped to control responsibilities,
- [ ] certification and validation evidence is current and linked,
- [ ] at-risk operators have retraining owners and due dates,
- [ ] repeat proficiency defects are root-caused,
- [ ] revalidation outcomes are recorded and verified.

If any item is unchecked, review is incomplete.

---

## Escalation Triggers

Escalate when:
- any CC-1 operator is At Risk,
- critical skill gap count >0 for 2 consecutive cycles,
- proficiency validation pass rate drops below target for 2 cycles,
- repeat proficiency defects appear in same control domain.

Escalation output must include:
- at-risk operator/control list and exposure summary,
- retraining + coverage actions with accountable owners,
- dated checkpoint proving restored operator proficiency.

---

## Integration Points

Use with:
- `ALIGNMENT-CONTROL-SUCCESSION-READINESS-REVIEW.md`
- `ALIGNMENT-CONTROL-OWNER-COVERAGE-REVIEW.md`
- `ALIGNMENT-HANDOFF-RELIABILITY-REVIEW.md`
- `ALIGNMENT-OWNER-LOAD-MANAGEMENT.md`
- `ALIGNMENT-COMMAND-CENTER.md`
