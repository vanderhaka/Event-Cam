# Compliance Pre-flight (Launch)

Last updated: 2026-02-15

## Status matrix

| Item | Status | Owner | Notes |
|---|---|---|---|
| Upload consent and legal basis | APPROVED | Product (James) | Upload flow requires consent checkbox before submit in `src/app/scan/[inviteToken]/page.tsx`; API enforces consent in `src/app/api/invite/[inviteToken]/media/route.ts`. |
| Marketing opt-in boundary | APPROVED | Product (James) | Marketing email path requires explicit opt-in before persist in `src/app/api/invite/[inviteToken]/contact/route.ts`. |
| Event media deletion path | APPROVED | Platform (James) | Owner media/event delete and album hide routes exist and are host-authenticated; documented incidentally in API routing. |
| Retention policy | TODO | Compliance owner TBD | Time-based retention and purge policy not yet finalized; policy doc is pending legal review. |
| Takedown support path | APPROVED | Support owner TBD | Abusive report path exists in `src/app/api/events/[eventId]/media/[mediaId]/report/route.ts`; host controls are available in dashboard flows. |
| Abuse triage SLA | TODO | Compliance owner TBD | Default launch SLA and escalation contacts to be added before public promotion. |

## Launch checklist

- [x] Confirm consent model is documented and enforced.
- [x] Confirm marketing opt-in boundaries are separate from mandatory upload consent.
- [x] Confirm a deletion path exists for contributor media and host-owned event content.
- [ ] Confirm retention policy is approved and implemented.
- [ ] Confirm compliance/legal signoff for launch copy and policy language.
- [ ] Confirm abuse-response support SLA and escalation chain with named owner.

## Takedown response process

- Intake: in-app report action or support email.
- Triage: within same business day, classify report by policy category.
- Mitigation: disable visibility path (event or media) immediately if risk is clear.
- Closure: record action and follow up with requester where required.
- Escalation: repeated abuse/serious complaint escalated to `James` immediately.

