# Alignment KPI Owner Map

> Single reference for KPI ownership, backup ownership, and data source accountability.

---

## Core KPI Ownership Matrix

| KPI | Primary Owner | Backup Owner | Data Source | Review Cadence |
|---|---|---|---|---|
| Visitor → Signup Conversion | Growth Lead | Marketing Lead | Analytics platform + auth/signup events | Weekly |
| Signup → Event Creation Conversion | Growth Lead | Product Lead | App/API event creation logs | Weekly |
| Event Creation → Paid Conversion | Growth + Finance | Product Lead | Billing/checkout status logs | Weekly |
| Upload Participation Rate | Product Lead | Growth Lead | Invitee + uploader event data | Weekly |
| Median Uploads per Event | Product Analytics | Product Lead | Media upload event logs | Weekly |
| Guest Email Capture Rate | Growth Ops | Marketing Ops | Upload flow capture records | Weekly |
| Marketing Opt-In Rate | Growth Ops | Legal/Compliance | Consent/opt-in capture records | Weekly |
| Guest → Creator Conversion (cohort) | Growth Lead | Product Analytics | Cohort tracking model | Monthly |
| Pro Activation Rate | Partnerships Lead | Growth Lead | Pro account activity logs | Weekly |
| Pro Repeat Rate | Partnerships Lead | Growth Ops | Partner activity cohort data | Monthly |
| Referral Conversion Rate | Growth Lead | Partnerships Lead | Referral attribution records | Weekly |
| CAC by Channel | Finance + Growth | Marketing Lead | Spend + attributed conversion data | Weekly/Monthly |
| Payback Period | Finance Owner | Growth Lead | CAC + contribution margin model | Monthly |
| Contribution Margin per Event | Finance Owner | Ops/PMO | Revenue + variable cost model | Monthly |
| Alignment Score (/20) | Ops/PMO | Growth Lead | Alignment scorecard | Weekly |
| Decision Closure Rate | Ops/PMO | Strategy Owner | Decision log vs due dates | Weekly |
| Documentation Sync SLA | Ops/PMO | Marketing Ops | Decision log + doc update timestamps | Weekly |

---

## Owner Accountability Rules

1. Every KPI must have both primary and backup owner.
2. If primary owner is unavailable, backup assumes reporting responsibility immediately.
3. Any KPI without an owner is considered a blocker for scaling decisions.
4. KPI ownership changes require:
   - decision log entry,
   - artifacts index sync (if process impact),
   - communication in next weekly dashboard.

---

## Data Integrity Checks

Before weekly KPI reviews, confirm:

- [ ] data source is available and updated,
- [ ] formula matches canonical definitions,
- [ ] no undocumented metric definition changes,
- [ ] outliers are annotated with context.

