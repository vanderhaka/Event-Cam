# Event Cam Launch Playbook

**Created:** 2026-02-15
**Status:** Active
**Scope:** Validation-first launch, solo founder, 10-20 hrs/week
**Markets:** AU (immediate, tail of Oct-Apr season) + US/UK (ramp for May-Oct season)

---

## Growth loops

### Primary: Guest email flywheel

Every event generates warm leads at zero acquisition cost.

```
Couple pays for event
  -> Guests scan QR and upload photos
    -> Guests optionally provide email after upload
      -> Album delivery email (transactional)
        -> Nurture sequence (opt-in marketing)
          -> Guest plans own event -> pays -> new guests -> repeat
```

**Why primary:** Zero marginal cost. Compounds over time. Already built (email capture, consent flow, metrics tracking all implemented). Every paying event feeds it automatically.

**Key metrics to validate:**
- Email capture rate (target: 40%+, stretch: 80%)
- Email validity rate (non-fake addresses)
- Album email open rate (target: 50%+)
- Guest-to-customer conversion (unknown — treat as 0% baseline until 6mo cohort data)

### Secondary: Pro referral network

Wedding professionals (photographers, planners) recommend Event Cam to clients.

```
Pro signs up (free)
  -> Pro recommends to client couple
    -> Couple pays for event ($2/guest)
      -> Pro earns credit ($0.40/guest)
        -> Pro recommends to more clients -> repeat
```

**Why secondary:** Higher potential volume per Pro (20-40 weddings/year each), but entirely unvalidated. Zero Pros have been contacted. This loop is activated only after Pro interviews confirm willingness.

**Key metrics to validate:**
- Pro interview sentiment (7+/10 positive = proceed)
- Pro activation rate (signup to first client event)
- Events per Pro per month

---

## Stop-loss and pass gates

Hard thresholds that trigger decisions. No ambiguity.

### Validation gates (Weeks 1-6)

| Gate | Metric | Pass | Pivot | Kill |
|------|--------|------|-------|------|
| **Guest upload rate** | % of guests who upload at test event | 25%+ | 15-24% (fix friction, retest) | <15% (fundamental problem) |
| **Upload flow completion** | % who start upload and finish | 80%+ | 60-79% (UX fix needed) | <60% (flow is broken) |
| **Email capture rate** | % of uploaders who provide email | 30%+ | 15-29% (adjust placement/copy) | <15% (value exchange isn't working) |
| **Pro sentiment** | Positive reaction in interviews | 7+/10 | 4-6/10 (refine pitch) | 3 or fewer (drop Pro loop) |
| **Cost margin at $2/guest** | Gross margin per guest | 70%+ | 50-69% (review costs) | <50% (reprice) |
| **"No app" differentiator** | Competitors require app download | Confirmed | Partial (some web-based) | False (messaging must change) |

### Growth gates (Weeks 7-12)

| Gate | Metric | Scale up | Hold | Stop channel |
|------|--------|----------|------|-------------|
| **Organic social** | Signups/week from social | 5+ | 2-4 (iterate content) | <2 after 6 weeks |
| **Community posts** | Paying events from Reddit/FB groups | 2+/month | 1/month (keep posting) | 0 after 20+ posts |
| **Pro outreach** | Pro signups with client events | 5+ active Pros | 2-4 (refine pitch) | <2 after 50 outreach attempts |
| **First 10 paid events** | Time to reach 10 paid events | Under 8 weeks | 8-12 weeks (adjust) | 12+ weeks (reprice or reposition) |

### Revenue stop-loss (Months 3+)

| Scenario | Action |
|----------|--------|
| <5 paid events/month after 3 months | Pause all marketing spend. Diagnose: product, pricing, or distribution problem? |
| CAC > $50 on any paid channel | Kill that channel immediately |
| Guest upload rate consistently <20% across 5+ events | Product redesign needed before more spend |
| Pro referral conversion <5% after 3 months | Simplify to direct-to-couple only |
| Monthly burn exceeds 2x monthly revenue for 2 consecutive months | Cut all paid channels, go organic-only |

---

## Week-by-week execution plan

### Week 1-2: Validate foundations (10-20 hrs)

**Objective:** Get real data from a real event and know your competition.

| Task | Hours | Output |
|------|-------|--------|
| Arrange a test event (birthday, dinner, BBQ — 15+ people) | 2 | Event scheduled |
| Run test event: print QR codes, observe, don't intervene | 3 | Raw participation data |
| Post-event analysis: upload rate, photos/guest, friction points | 2 | Test event report |
| Sign up for The Guest, Joy, and 1 other competitor | 3 | Competitor comparison table |
| Test each competitor's full guest flow end-to-end | - | (included above) |
| Build cost-to-serve spreadsheet (storage, bandwidth, Stripe, email) | 3 | Cost model draft |

**Pass gate:** Test event completed. Upload rate measured. Competitors tested.

**Deliverables:**
- [ ] Test event report (guest count, upload rate, friction points, surprise findings)
- [ ] Competitor comparison table (pricing, app requirement, guest flow, features)
- [ ] Cost model v1 (margin at $2.00, $1.20, $0.90/guest)

---

### Week 3-4: Pro validation + first content (10-20 hrs)

**Objective:** Validate the Pro growth loop. Start organic presence.

| Task | Hours | Output |
|------|-------|--------|
| Identify and message 15 wedding Pros (AU first, then US/UK) | 3 | Outreach sent |
| Conduct 8-10 Pro interviews (15 min each) | 3 | Interview notes |
| Synthesize Pro findings: sentiment, objections, path preference | 2 | Pro validation report |
| Set up Instagram + TikTok accounts with wedding branding | 2 | Accounts live |
| Create 3-5 pieces of content (use test event photos if possible) | 4 | First posts published |
| Write first Reddit/community post (r/weddingplanning, FB groups) | 1 | First community post |

**Pass gate:** Pro interviews complete. Growth loop decision made.

**Deliverables:**
- [ ] Pro interview synthesis (10 interviews, sentiment score, top objections)
- [ ] Decision: proceed with Pro features or direct-to-couple only
- [ ] Social accounts live with first content
- [ ] First genuine community post published

---

### Week 5-6: First paying customers (10-20 hrs)

**Objective:** Get 1-5 real paying customers. Prove the full funnel.

| Task | Hours | Output |
|------|-------|--------|
| Refine landing page based on test event + competitor insights | 4 | Updated landing page |
| Set up Stripe checkout if not already live | 2 | Payment flow working |
| Post 2x/week on social (Instagram, TikTok) | 3 | 4+ posts |
| Post 1-2 more community contributions (Reddit, FB groups) | 2 | Community presence |
| Reach out to 5 wedding Pros with "free first event" offer (if validated) | 2 | Pro pipeline started |
| Handle first customer support interactions | 2 | Support learnings |
| Second test event or first real customer event | 3 | Second data point |

**Pass gate:** At least 1 paid event completed. Full funnel proven.

**Deliverables:**
- [ ] First paying customer event completed
- [ ] Post-event metrics: uploads, email capture, album views
- [ ] Support log: what questions/issues came up

---

### Week 7-8: AU season push + US/UK prep (10-20 hrs)

**Objective:** Maximize remaining AU season. Prepare US/UK content for May.

| Task | Hours | Output |
|------|-------|--------|
| Pursue 3-5 more AU events (direct outreach, Pros, community) | 4 | Pipeline of 3-5 events |
| Content: film/collect "morning after" reactions from customers | 2 | UGC content for social |
| Content: "unseen photo" format posts from real events | 2 | Daily/weekly post series |
| Create US/UK-targeted social content (different hashtags, references) | 3 | Content bank for May |
| Design downloadable QR table tent template ("Powered by Event Cam") | 2 | Free template on site |
| Collect first 1-2 testimonials from real customers | 1 | Social proof |
| Review and update cost model with real event data | 1 | Cost model v2 |

**Pass gate:** 3+ paid events completed. Real metrics available.

**Deliverables:**
- [ ] 3+ events completed with metrics
- [ ] At least 1 testimonial
- [ ] QR table tent template live
- [ ] US/UK content bank ready

---

### Week 9-10: Growth channel testing (10-20 hrs)

**Objective:** Test organic channels systematically. Identify what works.

| Task | Hours | Output |
|------|-------|--------|
| Organic social: increase to 3-4x/week posting | 4 | Engagement data |
| Community: 2+ genuine posts in wedding forums/groups | 2 | Response/conversion data |
| Pro outreach: contact 10 more Pros (US/UK market) | 3 | Expanded Pro pipeline |
| DJ/celebrant outreach: pitch 5 DJs on QR announcement partnership | 2 | DJ channel test |
| Create 1 blog post targeting wedding SEO keyword | 3 | First SEO content |
| Track UTM-attributed signups per channel | 1 | Channel performance data |

**Pass gate:** At least 2 channels showing traction signals.

**Deliverables:**
- [ ] Channel performance table (signups, events, revenue per channel)
- [ ] Decision: which channels to double down on, which to pause

---

### Week 11-12: US/UK launch + scale what works (10-20 hrs)

**Objective:** Go live for US/UK wedding season. Double down on winning channels.

| Task | Hours | Output |
|------|-------|--------|
| Launch US/UK-targeted landing page content | 2 | Localized messaging |
| Double posting frequency on winning social channel | 4 | Increased reach |
| If Pros validated: launch Pro signup page | 3 | Pro acquisition funnel |
| Create case study from best real event | 3 | Case study published |
| Evaluate: is paid spend justified yet? (only if CAC <$30 projected) | 1 | Paid channel decision |
| Write guest email nurture sequence (if 100+ emails captured) | 3 | Nurture automation |
| Full metrics review: events, revenue, CAC, upload rates, channel mix | 2 | Month 3 report |

**Pass gate:** 10+ total paid events. Revenue trajectory clear.

**Deliverables:**
- [ ] Month 3 report: events, revenue, CAC by channel, upload metrics
- [ ] Decision: scale spend, stay organic, or pivot

---

## Monthly review template (Month 3+)

Run this review on the 1st of each month.

```
## Month [X] Review — [Date]

### Events
- Total events this month: ___
- Paid events: ___
- Free tier events: ___
- Total revenue: $___
- Average revenue per event: $___

### Guest metrics
- Total guests across all events: ___
- Average upload rate: ___%
- Average photos per uploader: ___
- Email capture rate: ___%
- Total emails captured this month: ___

### Channels
- Events from organic social: ___
- Events from community posts: ___
- Events from Pro referrals: ___
- Events from direct/organic: ___
- Events from paid (if active): ___
- CAC by channel: ___

### Flywheel
- Cumulative guest emails: ___
- Album email open rate: ___%
- Nurture email open rate: ___%
- Guest-to-customer conversions this month: ___

### Costs
- Supabase: $___
- Stripe fees: $___
- Email (Resend): $___
- Marketing spend: $___
- Total costs: $___
- Gross margin: ___%

### Stop-loss check
- [ ] Monthly burn < 2x monthly revenue?
- [ ] CAC < $50 on all active paid channels?
- [ ] Upload rate > 20% across events?
- [ ] No unresolved legal/compliance blockers?

### Decisions for next month
- Scale: ___
- Hold: ___
- Cut: ___
```

---

## What is explicitly deferred

These items are documented in strategy docs but **not in scope** until validation gates pass:

| Item | Trigger to activate |
|------|-------------------|
| Pro dashboard / credit system | Pro interviews positive + 5 active Pros |
| Multi-tier Pro recruitment discounts | 20+ active Pros + legal review passed |
| Paid advertising (Google, Meta, Pinterest) | 10+ organic events/month + CAC model validated |
| AI watermarks / filters marketing push | Core product validated at 3+ events |
| Venue subscription accounts | Core wedding product at 50+ events/month |
| Email nurture automation | 500+ guest emails captured |
| Photobook / upsell add-ons | 50+ completed events with album engagement data |
| International expansion beyond EN markets | 20+ events/month in primary markets |
| Festival / multi-day pricing | Inbound demand or strategic partnership |

---

## Key reference documents

| Document | Purpose |
|----------|---------|
| `MARKETING-PLAN.md` | Full marketing strategy, messaging, channels, KPIs |
| `PRICING-MODELS.md` | All pricing models and tier structures |
| `ASSUMPTION-REGISTER.md` | 48 cataloged assumptions with confidence levels |
| `NEXT-STEPS.md` | Pre-launch validation checklist (5 steps) |
| `PURPLE-COW-CHANNELS.md` | Unconventional growth channel ideas |
| `COMPLIANCE-PREFLIGHT.md` | Legal and compliance checklist |
| `IMPLEMENTATION-ROADMAP.md` | Technical build status (Steps 1-18 DONE) |

---

*Review this playbook monthly. Update stop-loss gates with real data. The playbook is only as good as the data feeding it.*
