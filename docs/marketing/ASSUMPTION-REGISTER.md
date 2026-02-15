# Assumption Register

> Purpose: Catalog every assumption embedded in Event Cam's strategy docs that is being treated as fact without evidence. Each entry includes a confidence rating, what breaks if the assumption is wrong, and a concrete validation plan.
>
> Created: 2026-02-15
> Review date: 2026-05-14
> Status: Living document — update confidence levels as evidence arrives.

---

## How to Read This Register

- **Confidence levels:** HIGH (supported by market data or industry norms), MEDIUM (plausible but unproven for Event Cam specifically), LOW (speculative or wishful), UNKNOWN (never analyzed)
- **Risk tier:** CRITICAL (existential — blocks the business model), HIGH (breaks a major growth lever or revenue line), MEDIUM (degrades performance but survivable), LOW (minor impact)
- **Validation status:** NOT STARTED, IN PROGRESS, VALIDATED, INVALIDATED

---

## Top 10 Assumptions Ranked by Risk

These are the assumptions most likely to be wrong AND most damaging if they are. Validate these first.

| Rank | ID | Assumption | Confidence | Risk Tier |
|------|-----|-----------|------------|-----------|
| 1 | FIN-1 | Cost-to-serve per guest is low enough to sustain the $0.90/guest floor | UNKNOWN | CRITICAL |
| 2 | GUEST-1 | 40-50% of invited guests will scan QR codes and upload photos | LOW | CRITICAL |
| 3 | FLY-1 | 80% of uploading guests will provide a valid email address | LOW | CRITICAL |
| 4 | FLY-2 | 2% of guest emails will convert to future paying customers | LOW | HIGH |
| 5 | PRO-2 | 3-tier recruitment discount will not be perceived as MLM | LOW | HIGH |
| 6 | REV-1 | Revenue ramp from 30 to 500 weddings/month in 12 months | LOW | HIGH |
| 7 | PRO-1 | 50% of Pro signups will activate within 60 days | LOW | HIGH |
| 8 | OPS-1 | A solo founder can execute this plan at the stated scope | LOW | HIGH |
| 9 | LEGAL-1 | Platform content moderation obligations (CSAM) are addressed | UNKNOWN | CRITICAL |
| 10 | LEGAL-2 | Photo uploads do not trigger biometric data laws (BIPA) | UNKNOWN | CRITICAL |

---

## Category 1: Unit Economics & Cost (FIN)

### FIN-1. Cost-to-serve per guest is low enough to sustain $0.90/guest floor
- **Confidence:** UNKNOWN
- **Where it appears:** Implied by every pricing table and margin calculation in PRICING-MODELS.md, PRO-ACCOUNT-DEEP-DIVE.md, and ACCOUNT-TYPES.md. No cost-to-serve analysis exists anywhere.
- **Risk tier:** CRITICAL
- **What breaks if wrong:** If cost-to-serve is $0.60-$1.00/guest (plausible with storage, AI compute, CDN, email, Stripe fees), the $0.90/guest Pro floor is near-zero or negative margin. The more successful the Pro network becomes, the more money Event Cam loses. This is existential.
- **Key cost components never modeled:** Cloud storage per photo/video, AI watermark compute per photo, CDN bandwidth for upload + delivery, email delivery costs, Stripe processing fees (2.9% + $0.30 per transaction), moderation infrastructure.
- **Validation plan:** Build a bottoms-up cost model: price out each component per photo uploaded and per guest served. Model margin at $2.00, $1.20, $1.08, and $0.90/guest.
- **Timeline:** IMMEDIATELY — before building Pro account system.
- **Validation status:** NOT STARTED

### FIN-2. $2/guest is the correct price point
- **Confidence:** MEDIUM
- **Where it appears:** PRICING-MODELS.md Section 2, MARKETING-PLAN.md Section 5
- **Risk tier:** HIGH
- **What breaks if wrong:** If $2/guest causes sticker shock ($500 for a 250-person wedding), conversion dies. If it is too low, significant revenue is left on the table — a couple spending $35K on a wedding might easily pay $3-4/guest.
- **Why it might be wrong:** The "less than the cake" anchoring is compelling but untested. Couples may mentally compare to Google Photos (free) or Instagram hashtag (free) rather than the photographer ($3K+). No willingness-to-pay research exists.
- **Validation plan:** Pre-launch Van Westendorp price sensitivity study with 30-50 engaged couples. Post-launch A/B test $1.50 vs $2.00 vs $2.50 on pricing page. Measure conversion rate, not opinions.
- **Timeline:** Before launch (survey); weeks 1-6 (A/B test).
- **Validation status:** NOT STARTED

### FIN-3. $49 minimum is the right price floor for small events
- **Confidence:** MEDIUM
- **Where it appears:** PRICING-MODELS.md Section 2
- **Risk tier:** MEDIUM
- **What breaks if wrong:** If $49 feels too steep for bridal showers and engagement parties (20-30 guests), Event Cam loses the engagement-party-to-wedding conversion funnel that the docs identify as the highest-conversion free-to-paid path.
- **Validation plan:** Track conversion by event size. Test a $29 "tiny event" tier alongside the $49 minimum.
- **Timeline:** First 30 days.
- **Validation status:** NOT STARTED

### FIN-4. Stripe fees are accounted for in margin calculations
- **Confidence:** LOW — they are NOT currently included
- **Where it appears:** Absent from all margin calculations in PRO-ACCOUNT-DEEP-DIVE.md and PRICING-MODELS.md
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Stripe charges 2.9% + $0.30 per transaction. On a $300 wedding, that is $9.00. At 500 events/month, Stripe fees are $2,500-$4,500/month. At the $0.90/guest floor, a $108 event loses $3.43 to Stripe, making the true floor ~$0.87/guest. The margins are tighter than they appear.
- **Validation plan:** Add a Stripe fee line to every revenue projection. Recalculate the $0.90/guest floor factoring in processing costs.
- **Timeline:** Immediately.
- **Validation status:** NOT STARTED

### FIN-5. Gross margin exceeds 85%
- **Confidence:** MEDIUM at Phase 1, LOW at Phase 3
- **Where it appears:** MARKETING-PLAN.md Section 11
- **Risk tier:** MEDIUM
- **What breaks if wrong:** At Phase 3 scale (500 events/month), costs include: Supabase ($500-$2,000), email ($500), AI compute ($500-$1,000), Stripe fees ($4,000-$5,000), plus Pro credit liability (~$15,600/month at 50% redemption). Margin could compress to 70-80% — still healthy, but changes the financial narrative.
- **Validation plan:** Track actual COGS per event from day one. Include credit redemption as deferred liability.
- **Timeline:** Phase 1 for baseline; remodel at Phase 2.
- **Validation status:** NOT STARTED

### FIN-6. "Unlimited uploads per guest" is sustainable at $2/guest
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md, PRICING-MODELS.md
- **Risk tier:** MEDIUM-HIGH
- **What breaks if wrong:** A single 1-minute 4K video is 300-500MB. If 20 guests each upload 2 videos plus photos, one event could generate 25-30GB. At 500 events/month with 12-month retention, storage costs become significant. The "unlimited" promise in marketing contradicts the storage cap mentioned in the Risks section.
- **Validation plan:** Monitor per-event storage consumption in beta. Define a reasonable per-event allocation. Decide whether "unlimited" means truly unlimited or "unlimited photos + capped video."
- **Timeline:** Before launch.
- **Validation status:** NOT STARTED

### FIN-7. 12-month album hosting is included without incremental cost concern
- **Confidence:** MEDIUM
- **Where it appears:** PRICING-MODELS.md Section 2
- **Risk tier:** LOW-MEDIUM
- **What breaks if wrong:** If each event generates 2,000+ photos plus video, cumulative storage across thousands of events over 12 months becomes significant. No storage budget exists.
- **Validation plan:** Model: (events/month) x (avg photos/event) x (avg file size) x (12 months) x (storage cost/GB). Include CDN egress.
- **Timeline:** Part of FIN-1 cost model.
- **Validation status:** NOT STARTED

---

## Category 2: Guest Behavior (GUEST)

### GUEST-1. 40-50% of invited guests will scan QR codes and upload photos
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md Section 11 (KPIs)
- **Risk tier:** CRITICAL
- **What breaks if wrong:** If participation is 15-20%, the album feels sparse, couples feel they did not get their money's worth, and the "2,000 photos from every angle" marketing claim is dishonest. Word-of-mouth turns negative. The flywheel produces fewer leads.
- **Why it might be wrong:** Guests at weddings are eating, drinking, dancing, and socializing. QR scanning requires a multi-step process (pull phone, scan, enter email, select photos, upload) in competition with a celebration. No public benchmark exists for QR-to-upload at weddings. Disposable camera table participation is highly variable (10-60%).
- **Validation plan:** Run 5-10 real beta weddings. Measure separately: QR scan rate, scan-to-upload-start rate, upload completion rate. Test with and without DJ announcement. Test with and without pre-event SMS/email.
- **Timeline:** Phase 0, first 5-10 events. This is THE metric.
- **Validation status:** NOT STARTED

### GUEST-2. Requiring email before upload will not kill participation
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md Section 7 (Guest Email Flywheel)
- **Risk tier:** HIGH
- **What breaks if wrong:** Every guest who bounces at the email gate is a lost upload AND a lost lead. The friction gate directly contradicts the "no-friction, no-hassle" promise. If email capture kills 30-40% of would-be uploads, participation drops below the critical threshold.
- **Validation plan:** A/B test three flows: email-required-before-upload vs. email-requested-after-upload vs. email-optional. Measure both upload completion rate and email capture rate.
- **Timeline:** Before Phase 1 (weeks 1-4). This is the single most important UX test.
- **Validation status:** NOT STARTED

### GUEST-3. Guests will have a positive experience with the upload flow at a wedding
- **Confidence:** MEDIUM
- **Where it appears:** MARKETING-PLAN.md Section 7
- **Risk tier:** HIGH
- **What breaks if wrong:** If the experience is frustrating (poor WiFi, slow uploads, QR scanning in dim lighting, video uploads failing on cellular), guests have a negative brand impression. The entire flywheel premise depends on positive sentiment from the first interaction.
- **Validation plan:** Run beta weddings across venue types (outdoor, indoor, poor-WiFi venues). Post-event NPS survey to guests. Monitor upload completion rates (started vs. completed).
- **Timeline:** Phase 0, first 5 events.
- **Validation status:** NOT STARTED

### GUEST-4. QR codes at tables are the optimal distribution mechanism
- **Confidence:** MEDIUM
- **Where it appears:** MARKETING-PLAN.md (core product description)
- **Risk tier:** MEDIUM
- **What breaks if wrong:** QR codes get knocked over, covered with plates, confused with venue WiFi codes, or ignored entirely. The physical medium becomes the bottleneck.
- **Validation plan:** Test multiple distribution methods: table QR only, DJ announcement only, pre-event email/SMS only, combination. Measure upload rate for each.
- **Timeline:** Phase 0-1.
- **Validation status:** NOT STARTED

### GUEST-5. Couples will print and physically place QR codes at their venue
- **Confidence:** MEDIUM
- **Where it appears:** MARKETING-PLAN.md, SOCIAL-APP-EXPLORATION.md
- **Risk tier:** MEDIUM
- **What breaks if wrong:** If couples (already overwhelmed with wedding planning) fail to download, print, and arrange QR table tents, zero guests scan. The product fails at the physical distribution step.
- **Validation plan:** Track template download-to-print completion. Ask beta couples what actually happened. Consider offering pre-printed materials as a premium option.
- **Timeline:** Phase 0 beta weddings.
- **Validation status:** NOT STARTED

### GUEST-6. Guests will share/reshare watermarked photos on social media (10% reshare rate)
- **Confidence:** LOW
- **Where it appears:** SOCIAL-APP-EXPLORATION.md (reshare section projecting 1.2M impressions/month)
- **Risk tier:** LOW (nice-to-have channel, not load-bearing)
- **What breaks if wrong:** The "free viral marketing" channel produces nothing. Even viral consumer apps see 1-3% organic reshare rates, not 10%.
- **Validation plan:** Add a "share to Instagram" button. Measure tap rate at beta weddings.
- **Timeline:** Phase 1.
- **Validation status:** NOT STARTED

### GUEST-7. "No app required" is the primary friction reducer guests care about
- **Confidence:** HIGH
- **Where it appears:** MARKETING-PLAN.md (throughout), SOCIAL-APP-EXPLORATION.md
- **Risk tier:** LOW
- **What breaks if wrong:** If the real friction is social (guests don't care, feel awkward photographing) rather than technical (app downloads), removing the download barrier doesn't help.
- **Validation plan:** Survey 50+ recent wedding guests: "Did you use a photo-sharing tool at a recent wedding? If not, why not?" See if "didn't want to download an app" is a top-3 answer.
- **Timeline:** Weeks 1-4.
- **Validation status:** NOT STARTED

---

## Category 3: Flywheel & Viral Growth (FLY)

### FLY-1. 80% of uploading guests will provide a valid email address
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md Section 7 (flywheel math table)
- **Risk tier:** CRITICAL
- **What breaks if wrong:** The entire flywheel math is built on this number. At a realistic 40% capture rate, annual list growth halves. The $3.5M/year flywheel revenue projection could shrink below $1M. Additionally, some percentage of captured emails will be fake/throwaway (test@test.com).
- **Validation plan:** Measure in first 10 beta events. Run email validation (format + MX record check) at point of entry. Track fake email rates separately.
- **Timeline:** Phase 0 beta weddings.
- **Validation status:** NOT STARTED

### FLY-2. 2% of guest emails will convert to future paying customers
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md Section 7: "Even a conservative 2% conversion rate"
- **Risk tier:** HIGH
- **What breaks if wrong:** At 0.5% (more typical for warm email-to-purchase), Phase 3 flywheel revenue drops from $3.5M/year to ~$875K. The "zero-CAC flywheel" narrative weakens. The blended CAC target of <$15 depends on the flywheel producing near-free customers.
- **Why it might be wrong:** Called "conservative" with zero basis. Conversion requires the guest to (1) remember the product months later, (2) be planning an event, (3) recall a positive experience, (4) seek it out, (5) purchase. Typical email-to-purchase for consumer products: 0.1-0.5%. The conversion window (6+ months) is a life-stage trigger, not a marketing-influenceable decision.
- **Validation plan:** Tag every guest email with source event date. Track cohorted conversion at 6, 12, and 18 months. Use email engagement rates (open, click) as leading indicators.
- **Timeline:** 6-12 months for real data. Track leading indicators from month 1.
- **Validation status:** NOT STARTED

### FLY-3. The guest email flywheel "compounds" within the planning horizon
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md Section 7: "This is a true flywheel"
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Wedding-to-wedding cycles are 1-3 years (time from attending as guest to having your own wedding). The flywheel barely completes one cycle within 12 months. It is a long-term asset, not a near-term growth engine. Over-relying on it for near-term projections is dangerous.
- **Validation plan:** Reframe internally as "long-term lead pipeline," not "compounding flywheel." Plan revenue around paid channels and Pro referrals. Treat flywheel conversion as bonus.
- **Timeline:** Conceptual reframe now; data in 12-24 months.
- **Validation status:** NOT STARTED

### FLY-4. Wedding guests are in the right demographic to become future customers
- **Confidence:** HIGH
- **Where it appears:** MARKETING-PLAN.md Section 7
- **Risk tier:** LOW
- **What breaks if wrong:** Low risk. Guests do tend to be in similar life stages. However, a meaningful percentage are parents, older relatives, children, and out-of-market guests.
- **Validation plan:** Track which guest cohorts actually convert (if demographic data is available).
- **Timeline:** 6-12 months.
- **Validation status:** NOT STARTED

### FLY-5. Guests will opt in to marketing emails (not just transactional)
- **Confidence:** MEDIUM
- **Where it appears:** MARKETING-PLAN.md Section 7
- **Risk tier:** MEDIUM
- **What breaks if wrong:** If marketing opt-in is 20-30%, the marketable flywheel list is much smaller than projected. In GDPR regions (default opt-out), the rate could be 10-15%.
- **Validation plan:** Track opt-in rates by region. Separately track US (default opt-in) vs. EU/UK (default opt-out).
- **Timeline:** Phase 1, first events.
- **Validation status:** NOT STARTED

---

## Category 4: Pro Network (PRO)

### PRO-1. 50% of Pro signups will activate (first paid event) within 60 days
- **Confidence:** LOW
- **Where it appears:** PRO-ACCOUNT-DEEP-DIVE.md, Onboarding section
- **Risk tier:** HIGH
- **What breaks if wrong:** SaaS activation rates for freemium B2B products: typically 10-25%. If activation is 20%, you need 2.5x more signups. All Phase 1-3 Pro projections drop proportionally. Wedding professionals are risk-averse — using an unproven tool on a paying client's wedding is a big ask.
- **Validation plan:** Track activation funnel: signup -> first free event -> first paid event. Identify drop-off points. If fewer than 30% complete first event unassisted, add onboarding support.
- **Timeline:** 60 days from first Pro signups.
- **Validation status:** NOT STARTED

### PRO-2. 3-tier recruitment discount will not be perceived as MLM
- **Confidence:** LOW
- **Where it appears:** PRO-ACCOUNT-DEEP-DIVE.md (Pro-to-Pro Recruitment)
- **Risk tier:** HIGH
- **What breaks if wrong:** The structure is literally a 3-tier downline compensation model. Wedding professionals are reputation-sensitive. If early Pros perceive this as MLM, word spreads through tight-knit vendor networks, poisoning the brand. This is irreversible trust loss.
- **Validation plan:** Before launching tiers, show the structure to 10-15 wedding professionals. Ask: "Does this look like an MLM to you?" If more than 2/10 react negatively, simplify to flat single-tier referral. Consider launching Tier 1 only initially.
- **Timeline:** Before Pro program launch.
- **Validation status:** NOT STARTED

### PRO-3. Credits-first model will retain Pros better than cash payouts
- **Confidence:** LOW-MEDIUM
- **Where it appears:** PRO-ACCOUNT-DEEP-DIVE.md (credits-first model)
- **Risk tier:** HIGH
- **What breaks if wrong:** If Pros perceive credits as "funny money," they won't actively refer. Competitors offering cash commissions will be more attractive. Pros with high unused credit balances may reduce referral activity.
- **Validation plan:** Interview 10-15 wedding professionals: "Would you prefer a $60 credit toward a product you use a few times a year, or $60 cash?" If 70%+ say cash, the credits-first model is wrong. Track credit redemption vs. issuance rates post-launch.
- **Timeline:** Before building Pro dashboard.
- **Validation status:** NOT STARTED

### PRO-4. Photographers will frame Event Cam as a "free second shooter" and promote it
- **Confidence:** LOW-MEDIUM
- **Where it appears:** PURPLE-COW-CHANNELS.md, MARKETING-PLAN.md
- **Risk tier:** HIGH
- **What breaks if wrong:** If photographers view guest phone photos as diluting their professional brand (amateur photos alongside $4K professional work), the primary Pro segment resists. Photographers who charge $3K-$6K may actively dislike a tool that floods clients with amateur alternatives.
- **Validation plan:** Interview 10-15 wedding photographers: "Would you recommend a tool that collects guest phone photos alongside your professional shots? Why or why not?" Listen for resistance.
- **Timeline:** 2-4 weeks (pre-launch).
- **Validation status:** NOT STARTED

### PRO-5. Wedding planners will actively recommend Event Cam to clients
- **Confidence:** LOW-MEDIUM
- **Where it appears:** MARKETING-PLAN.md (Planner Priya persona), QUESTIONS-THAT-NEED-ANSWERS.md (P0-4)
- **Risk tier:** HIGH
- **What breaks if wrong:** The entire primary growth loop (P0-4 decision) depends on Pros referring paying clients. Planners billing $5K-$15K per wedding may not be motivated by $60 in credit. They are conservative, brand-sensitive, and won't risk recommending unproven tools.
- **Validation plan:** Contact 20 wedding planners. Pitch the product and Pro economics. Track: (a) how many express interest, (b) how many recommend to a client, (c) how many result in a paid event.
- **Timeline:** IMMEDIATE — this is a path-defining assumption.
- **Validation status:** NOT STARTED

### PRO-6. 60% conversion rate on Pro referrals
- **Confidence:** LOW
- **Where it appears:** PRICING-MODELS.md Section 6 (Path 2 example)
- **Risk tier:** MEDIUM
- **What breaks if wrong:** 60% conversion from a verbal recommendation to a paid purchase is extraordinary. Industry referral conversion: 5-15%. Even warm vendor referrals rarely exceed 25-30%. At 15% real conversion, a celebrant referring 50 couples gets 7-8 conversions (~$390/year credits) instead of the projected 30 ($1,560/year). The referral program is far less compelling.
- **Validation plan:** Track actual referral link click-through and conversion. The 90-day attribution cookie is already planned.
- **Timeline:** First 60-90 days.
- **Validation status:** NOT STARTED

### PRO-7. Each recruited Pro generates ~$432/month in revenue
- **Confidence:** LOW
- **Where it appears:** PRO-ACCOUNT-DEEP-DIVE.md ("Why This Works")
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Assumes 3 events/month (36/year) at 120 guests — the optimistic end of the range. If average is 1.5 events/month (18/year, more realistic for mixed Pro types), revenue per recruit drops to $216/month. The "net gain +$324/month" calculation drops to +$108/month.
- **Validation plan:** Collect actual event frequency data from early Pros. Segment by type (photographer vs. planner vs. DJ).
- **Timeline:** First 60-90 days.
- **Validation status:** NOT STARTED

### PRO-8. Pros will recruit other Pros (20%+ referral rate)
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md Section 6
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Wedding professionals are typically competitors, not collaborators. A photographer won't recruit other photographers. Cross-category referrals (photographer -> DJ) are plausible but require enthusiasm. If referrals are negligible, the tiered discount system is wasted complexity.
- **Validation plan:** After first 20 active Pros, measure organic referral behavior before introducing incentives.
- **Timeline:** 3-6 months.
- **Validation status:** NOT STARTED

### PRO-9. 40 weddings/year at 140 guests is a realistic Pro profile
- **Confidence:** MEDIUM
- **Where it appears:** PRICING-MODELS.md Section 6, PRO-ACCOUNT-DEEP-DIVE.md (uses 130 guests), ACCOUNT-TYPES.md (says 30-50 weddings)
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Full-time US wedding photographers do 25-40/year. 40 is the high end. Using the high end flatters the economics. Docs inconsistently use 120, 130, and 140 guests. If average Pro does 25 weddings at 110 guests, annual Pro cost drops from $6,720 to $3,300.
- **Validation plan:** During Pro onboarding, collect: "How many weddings last year?" and "Average guest count?" Use real data within 60 days.
- **Timeline:** First 30-60 days of Pro program.
- **Validation status:** NOT STARTED

---

## Category 5: Revenue Projections (REV)

### REV-1. Revenue ramp from 30 to 500 weddings/month in 12 months
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md Section 5
- **Risk tier:** HIGH
- **What breaks if wrong:** This is a 16x growth rate for a bootstrapped solo-founder startup with no existing brand. Phase 3 revenue of $154K/month is the number that justifies the entire business trajectory. If reality is 10 -> 50 -> 150 weddings/month (still impressive), revenue at month 12 is ~$46K/month — a 70% miss.
- **Validation plan:** Track month-over-month growth rate. Set a realistic internal target (50% of stated projections) alongside the aspirational one. Revise quarterly.
- **Timeline:** Ongoing from launch. Recalibrate at month 3.
- **Validation status:** NOT STARTED

### REV-2. 30 paid weddings/month achievable in Phase 1 (months 1-3)
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md Section 5
- **Risk tier:** HIGH
- **What breaks if wrong:** 30 weddings/month = 1 new paying customer per day from cold start with no brand, no testimonials, no case studies. If actual is 5-10/month, Phase 1 revenue is $1,000-$2,500/month instead of $7,920.
- **Validation plan:** Track weekly event creation. Set conservative internal target of 10-15 weddings/month.
- **Timeline:** Months 1-2.
- **Validation status:** NOT STARTED

### REV-3. Phase 3 projection of 300 active Pros averaging 5 events/month
- **Confidence:** LOW
- **Where it appears:** PRO-ACCOUNT-DEEP-DIVE.md, Revenue Projections
- **Risk tier:** HIGH
- **What breaks if wrong:** 5 events/month = 60 events/year, exceeding even the busiest photographers. This only makes sense if "events" includes non-weddings, contradicting the P0-1 focus decision. Phase 3 revenue of $222K/month would likely be closer to $74K (150 Pros at 3 events).
- **Validation plan:** Revisit projections monthly. Set plan-vs-actual dashboard from month 1.
- **Timeline:** Ongoing from launch.
- **Validation status:** NOT STARTED

### REV-4. Venue accounts will be 15% of revenue at month 12
- **Confidence:** LOW
- **Where it appears:** ACCOUNT-TYPES.md, Revenue Mix Target
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Venues are explicitly "not live" and excluded from current quarter (P0-1). Including them in 12-month projections as if they'll have meaningful adoption is premature.
- **Validation plan:** Remove venue revenue from near-term projections. Revisit when venue feature enters development.
- **Timeline:** Immediate correction.
- **Validation status:** NOT STARTED

### REV-5. 10-15% add-on attach rate
- **Confidence:** LOW-MEDIUM
- **Where it appears:** MARKETING-PLAN.md Section 5, PRICING-MODELS.md Section 8
- **Risk tier:** LOW
- **What breaks if wrong:** Several add-ons don't exist yet (photobooks, AI slideshows). Can't upsell products not built. Impact is small (add-on revenue is a minor portion of total).
- **Validation plan:** Build and launch one add-on. Measure actual attach rate on first 50 events.
- **Timeline:** Phase 2.
- **Validation status:** NOT STARTED

---

## Category 6: Channel & Marketing (CHAN)

### CHAN-1. Pro outreach yields 8+ qualified leads/week with 10%+ converting to draft events
- **Confidence:** MEDIUM-LOW
- **Where it appears:** QUESTIONS-THAT-NEED-ANSWERS.md P1-7
- **Risk tier:** MEDIUM
- **What breaks if wrong:** If the Pro outreach channel underperforms, the primary growth loop stalls. A brand-new product with no case studies or testimonials faces a high bar for professional adoption.
- **Validation plan:** Track outreach-to-response, response-to-signup, signup-to-first-event separately. Identify where the funnel breaks.
- **Timeline:** 4-6 weeks.
- **Validation status:** NOT STARTED

### CHAN-2. Organic social produces 5+ signups/week within 8 weeks
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md Section 6
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Organic reach for new accounts is near zero on most platforms. Converting TikTok viewers to paying customers is a long attribution chain. 4x/week posting is a big time commitment for a solo founder with nothing to show for it.
- **Validation plan:** Track UTM-attributed signups per platform.
- **Timeline:** 8 weeks (already defined as kill window).
- **Validation status:** NOT STARTED

### CHAN-3. Google Ads CPC of $1.50-$4.00 for wedding keywords
- **Confidence:** MEDIUM
- **Where it appears:** MARKETING-PLAN.md Section 6
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Wedding keywords are competitive. Real CPC may be $5-$8+. At $8 CPC with 3% conversion, CAC is $267.
- **Validation plan:** Run a small ($500) Google Ads test before committing Phase 2 budget.
- **Timeline:** Pre-Phase 2 (month 2-3).
- **Validation status:** NOT STARTED

### CHAN-4. CAC under $30 on paid channels, blended under $15
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md Section 11
- **Risk tier:** HIGH
- **What breaks if wrong:** Wedding-related digital products commonly see $50-$80 CAC. The $15 blended figure depends on the flywheel producing free customers (itself unvalidated). Real blended CAC could be $40-$60.
- **Validation plan:** Track actual CAC by channel from first paid spend.
- **Timeline:** Phase 2, months 4-5.
- **Validation status:** NOT STARTED

### CHAN-5. Emotional fear-of-loss messaging outperforms feature messaging
- **Confidence:** MEDIUM
- **Where it appears:** MARKETING-PLAN.md Section 3, P0-5 decision
- **Risk tier:** MEDIUM
- **What breaks if wrong:** If couples respond better to practical messaging ("collect all guest photos in one place") than fear ("photos you'll never see"), ad spend on emotional copy underperforms. Wedding planning is already stressful — adding fear may backfire.
- **Validation plan:** A/B test fear-framed vs. aspiration-framed vs. practical headlines. Measure through to payment, not just clicks.
- **Timeline:** First 2-4 weeks of live traffic.
- **Validation status:** NOT STARTED

### CHAN-6. "Photo Booth Killer" positioning is accurate
- **Confidence:** LOW-MEDIUM
- **Where it appears:** PURPLE-COW-CHANNELS.md Section 11
- **Risk tier:** LOW
- **What breaks if wrong:** Photo booths are entertainment/experience vendors (props, instant prints). Event Cam is a utility tool. Different value propositions. Couples may want both, and the budgets aren't directly substitutable. Positioning against photo booths may alienate potential partnership opportunities.
- **Validation plan:** Survey 30 couples: "Would you choose Event Cam instead of a photo booth, in addition to one, or neither?"
- **Timeline:** Months 2-4.
- **Validation status:** NOT STARTED

### CHAN-7. Disposable cameras are the right competitive frame
- **Confidence:** MEDIUM
- **Where it appears:** MARKETING-PLAN.md executive summary, PURPLE-COW-CHANNELS.md
- **Risk tier:** LOW
- **What breaks if wrong:** Disposable cameras are experiencing a Gen Z nostalgia revival. Positioning against them could make Event Cam seem less cool. Better frame might be "supplement to everything" rather than "replacement for analog."
- **Validation plan:** Test "alongside disposable cameras" vs. "instead of disposable cameras" messaging. Measure CTR.
- **Timeline:** Phase 1, first 4 weeks of content.
- **Validation status:** NOT STARTED

---

## Category 7: Operations & Capacity (OPS)

### OPS-1. A solo founder can execute this plan at the stated scope
- **Confidence:** LOW
- **Where it appears:** QUESTIONS-THAT-NEED-ANSWERS.md P1-8, P1-9
- **Risk tier:** HIGH
- **What breaks if wrong:** The plan calls for: building AI features, building Pro dashboards, building email sequences, running 4+ social channels (4x/week posting), conducting Pro outreach (8+ leads/week), managing community posts, handling customer support, running beta weddings, setting up Stripe integrations, and tracking KPIs. This is a multi-person workload. The most likely failure mode is everything getting 30% of needed attention.
- **Validation plan:** Time-block a real week. Track hours per activity. If total exceeds 60 hours/week by week 3, cut scope aggressively.
- **Timeline:** First 2 weeks of execution.
- **Validation status:** NOT STARTED

### OPS-2. The 30-day launch checklist is achievable for one person in 30 days
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md (Summary: First 30 Days Checklist) — 18 distinct deliverables
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Launch slips. Partial delivery means going to market with an incomplete experience. Rushing produces low-quality output that hurts first impressions.
- **Validation plan:** Break each item into estimated hours. Sum them. If total exceeds 200 hours, it cannot be done in 30 days.
- **Timeline:** Before starting Phase 0.
- **Validation status:** NOT STARTED

### OPS-3. Support volume is manageable at 50, 100, 500 events/month
- **Confidence:** LOW
- **Where it appears:** Absent from all docs — this is itself the assumption
- **Risk tier:** MEDIUM
- **What breaks if wrong:** At 50 events/month, each wedding generates 2-5 support contacts (setup issues, QR problems, upload failures, moderation questions). That is 100-250 support interactions/month. Unresolved tickets on someone's wedding day are catastrophic for reputation.
- **Validation plan:** Track support volume per event in first 10 beta weddings. Multiply by projected event volume.
- **Timeline:** During beta.
- **Validation status:** NOT STARTED

### OPS-4. Wedding season timing aligns with product readiness
- **Confidence:** MEDIUM
- **Where it appears:** MARKETING-PLAN.md Section 8
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Peak wedding season is May-October. Phase 0 (4 weeks) + Phase 1 (8 weeks) = 12 weeks before Phase 2. Starting February 2026 means Phase 2 hits May — which aligns IF the product features are built. If not, the entire wedding season window is missed.
- **Validation plan:** Assess current product readiness against Phase 0 checklist. If fewer than 50% of items are done, the timeline needs to slip or scope must be cut.
- **Timeline:** This week.
- **Validation status:** NOT STARTED

---

## Category 8: Legal & Compliance (LEGAL)

### LEGAL-1. Platform content moderation obligations (CSAM detection) are addressed
- **Confidence:** UNKNOWN — not discussed in any document
- **Where it appears:** Absent from all docs
- **Risk tier:** CRITICAL
- **What breaks if wrong:** As a platform accepting user-uploaded photos, Event Cam has legal obligations to detect and report CSAM (18 USC 2258A). At scale (millions of photos), automated detection (PhotoDNA or similar) is not optional — it is a legal requirement.
- **Validation plan:** Research NCMEC reporting obligations. Implement automated CSAM detection before launch. Establish content moderation policy and reporting procedure.
- **Timeline:** Before launch. Legal requirement.
- **Validation status:** NOT STARTED

### LEGAL-2. Photo uploads do not trigger biometric data laws (Illinois BIPA)
- **Confidence:** UNKNOWN — not addressed
- **Where it appears:** Absent from all docs
- **Risk tier:** CRITICAL
- **What breaks if wrong:** If any current or planned AI feature (watermarks, filters, auto-curation) processes faces in photos, it could constitute biometric data collection under BIPA. Penalties: $1,000-$5,000 per violation with class action exposure. BIPA has generated billions in settlements.
- **Validation plan:** Confirm whether any feature performs facial recognition or facial geometry analysis. If not, document this clearly and require BIPA review before adding face-related AI. If yes, get a BIPA compliance assessment immediately.
- **Timeline:** Before launch.
- **Validation status:** NOT STARTED

### LEGAL-3. 3-tier recruitment discount structure is legally distinct from pyramid/MLM
- **Confidence:** MEDIUM — leans acceptable but with real risk
- **Where it appears:** PRO-ACCOUNT-DEEP-DIVE.md (Pro-to-Pro Recruitment)
- **Risk tier:** HIGH
- **What breaks if wrong:** FTC evaluates structures based on whether compensation derives primarily from recruiting vs. selling to end consumers. Mitigating: no cash paid for recruitment itself, real product sold, cap at 55%. But: multi-tier, compensation tied to recruitment, very low "active" threshold.
- **Validation plan:** Get a legal opinion from an attorney specializing in FTC compliance and MLM/referral program law. Specifically ask about Koscot and Amway safeguard requirements.
- **Timeline:** Before launching the recruitment tier system.
- **Validation status:** NOT STARTED

### LEGAL-4. GDPR "baseline" is sufficient for current operations
- **Confidence:** LOW
- **Where it appears:** QUESTIONS-THAT-NEED-ANSWERS.md P0-6
- **Risk tier:** HIGH
- **What breaks if wrong:** Photos are personal data under GDPR. Photos of identifiable people are third-party personal data. Event Cam is a data processor needing a DPA with the couple (data controller). The "baseline" approach doesn't address DPAs, DSARs, right to deletion, or cross-border transfer. Any EU-based wedding triggers obligations.
- **Validation plan:** Commission a GDPR compliance audit covering: photo uploads with third-party faces, processor/controller responsibilities, DPA requirements, cross-border data transfer.
- **Timeline:** Before marketing to EU-based couples.
- **Validation status:** NOT STARTED

### LEGAL-5. Transactional email classification covers follow-up reminder emails
- **Confidence:** MEDIUM for email 1 (album delivery), LOW for email 2 (3-day "did you see your photos?" reminder)
- **Where it appears:** MARKETING-PLAN.md Section 7
- **Risk tier:** MEDIUM
- **What breaks if wrong:** The 3-day follow-up is a re-engagement nudge, not service fulfillment. If classified as marketing under CAN-SPAM/GDPR, sending without opt-in is a violation. Email providers may flag the account for mixing transactional and marketing.
- **Validation plan:** Get legal opinion on classification of each email in Sequence 1. Check email provider terms for transactional/marketing mixing.
- **Timeline:** Before building email sequences.
- **Validation status:** NOT STARTED

### LEGAL-6. Stripe Connect Express is viable for Pro credit cashouts
- **Confidence:** MEDIUM-HIGH
- **Where it appears:** PRO-ACCOUNT-DEEP-DIVE.md
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Connect Express is for marketplace payouts; credit cashouts are more like affiliate payouts. Stripe may classify differently. Onboarding friction (identity verification) could cause Pro abandonment. Tax reporting obligations (1099 at $600+/year) add operational complexity.
- **Validation plan:** Confirm with Stripe that referral credit cashouts are permitted under Connect Express. Build prototype and test onboarding with 5 Pros. Consult tax professional about 1099 obligations.
- **Timeline:** Before building payout feature.
- **Validation status:** NOT STARTED

### LEGAL-7. The "active = 1 paid event in 12 months" threshold prevents gaming
- **Confidence:** LOW
- **Where it appears:** PRO-ACCOUNT-DEEP-DIVE.md
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Gaming economics are favorable: 5 fake Pro accounts x $49/year = $245 cost. Benefit: moves discount from 40% to 50%, saving $1,120/year on 40 weddings. Net gain from gaming: $875/year.
- **Validation plan:** Add identity/business verification for Pro accounts. Consider minimum event size (25+ guests) to count as "active." Flag accounts with same payment method/IP.
- **Timeline:** Before recruitment discount launch.
- **Validation status:** NOT STARTED

---

## Category 9: Competitive & Market (MKT)

### MKT-1. No well-funded competitor is preparing to enter this space
- **Confidence:** LOW
- **Where it appears:** WHATS-MISSING.md explicitly asks this question with no documented answer
- **Risk tier:** HIGH
- **What breaks if wrong:** If Event Cam demonstrates product-market fit, larger platforms (The Knot, Zola, Google, Instagram) could clone the core features. The 3-month build estimate is realistic for the core product. A well-funded competitor offering the same product at lower prices (or free, as a loss leader) makes the pricing model obsolete.
- **Validation plan:** Conduct thorough competitive scan now. Monitor for new entrants monthly. Prioritize building switching costs (Pro network, venue installs) over optimizing pricing.
- **Timeline:** Before launch and ongoing.
- **Validation status:** NOT STARTED

### MKT-2. Competitors requiring app downloads have a durable disadvantage
- **Confidence:** MEDIUM
- **Where it appears:** PRICING-MODELS.md Section 10
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Progressive web apps, universal links, and app clips can reduce download friction for competitors. If The Guest moves to web-first, this differentiator evaporates.
- **Validation plan:** Monitor competitor product changes quarterly. Build durable moats (Pro network, guest database) that don't depend on a single UX advantage.
- **Timeline:** Ongoing quarterly review.
- **Validation status:** NOT STARTED

### MKT-3. The competitive analysis is complete
- **Confidence:** LOW
- **Where it appears:** MARKETING-PLAN.md Section 4 (only 6 competitors analyzed)
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Multiple QR-based guest photo tools exist (FotoShare, Wedshoots, Guests Shot, Joy, others) that aren't analyzed. Some may already offer no-app experiences.
- **Validation plan:** Search "wedding guest photo QR code," "wedding photo sharing no download" across Google, App Store, Product Hunt, Capterra. Profile top 15 results.
- **Timeline:** Before launch (1-2 weeks of research).
- **Validation status:** NOT STARTED

### MKT-4. The wedding market is the right beachhead
- **Confidence:** HIGH
- **Where it appears:** P0-1 decision
- **Risk tier:** LOW
- **What breaks if wrong:** Low risk. Weddings have high emotional stakes, clear buyer intent, and a budget that makes $300 trivial. The main risk is seasonality and opportunity cost.
- **Validation plan:** Track signup-to-purchase velocity by event type. If birthday parties convert 3x faster, reconsider focus.
- **Timeline:** 3 months.
- **Validation status:** NOT STARTED

### MKT-5. AI watermarks are the "single most marketable differentiator"
- **Confidence:** LOW-MEDIUM
- **Where it appears:** MARKETING-PLAN.md Appendix
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Watermarks have negative associations with stock photos. If couples prefer clean photos, the feature is a liability. If AI generation produces mediocre results, the "premium" positioning collapses. Any competitor could add this in weeks.
- **Validation plan:** Show watermarked vs. un-watermarked albums to 20 engaged couples. Track watermark opt-in rate.
- **Timeline:** Phase 0 beta weddings.
- **Validation status:** NOT STARTED

---

## Category 10: Social App Future (APP)

### APP-1. Users want a social layer on top of event photos
- **Confidence:** LOW
- **Where it appears:** SOCIAL-APP-EXPLORATION.md (entire document)
- **Risk tier:** MEDIUM (deferred investment, not current execution risk)
- **What breaks if wrong:** The social app vision (Phase 3-4 roadmap, native app, long-term defensibility) is a solution looking for a problem. Building the app wastes 12-18 months and significant capital.
- **Validation plan:** Add reactions/comments to browser albums first. If fewer than 10% of guests engage with social features, do not build the app.
- **Timeline:** Month 6-9.
- **Validation status:** NOT STARTED

### APP-2. 20%+ of guests will download a native app
- **Confidence:** LOW
- **Where it appears:** SOCIAL-APP-EXPLORATION.md
- **Risk tier:** LOW (deferred)
- **What breaks if wrong:** If install rate is 3-5% (more realistic), the user base grows at 1/4 to 1/6 projected rate. The "personal event hub" vision never reaches critical mass.
- **Validation plan:** Measure install rate from post-album "download the app" prompts. Compare with industry benchmarks (2-8%).
- **Timeline:** Month 12+ (when app exists).
- **Validation status:** NOT STARTED

### APP-3. "No app required" and "download our app" can coexist without confusing the market
- **Confidence:** MEDIUM
- **Where it appears:** SOCIAL-APP-EXPLORATION.md (Risks section)
- **Risk tier:** MEDIUM
- **What breaks if wrong:** Messaging becomes incoherent. The positioning that differentiates from The Guest disappears.
- **Validation plan:** Perception testing with 20 people: show both messages and ask if they feel contradictory.
- **Timeline:** Before app launch (Month 12+).
- **Validation status:** NOT STARTED

---

## Validation Priority Roadmap

### Validate IMMEDIATELY (before writing more code)
1. **FIN-1** — Build cost-to-serve model. This determines whether the Pro program is viable.
2. **LEGAL-1** — Research CSAM obligations. Legal requirement.
3. **LEGAL-2** — Assess BIPA exposure. Legal requirement.
4. **FIN-4** — Add Stripe fees to all margin calculations.

### Validate before launch (next 2-4 weeks)
5. **GUEST-1** — Guest upload rate at 5-10 beta weddings
6. **GUEST-2** — Email gate A/B test (required vs. optional vs. post-upload)
7. **FLY-1** — Email capture rate at beta weddings
8. **PRO-2** — MLM perception test with 10-15 wedding professionals
9. **PRO-4** — Photographer "second shooter" reaction interviews
10. **PRO-5** — Planner willingness-to-recommend interviews
11. **PRO-3** — Credits vs. cash preference interviews
12. **MKT-3** — Complete competitive audit
13. **LEGAL-3** — Legal opinion on recruitment structure
14. **FIN-2** — Price sensitivity survey with 30-50 engaged couples

### Validate in first 60 days
15. **PRO-1** — Pro activation rate funnel tracking
16. **CHAN-1** — Pro outreach lead quality and conversion
17. **CHAN-5** — Emotional vs. practical messaging A/B test
18. **REV-2** — Actual events/month vs. projections
19. **OPS-1** — Solo founder capacity tracking

### Validate in first 6 months
20. **FLY-2** — Guest-to-customer conversion (leading indicators)
21. **CHAN-4** — Actual CAC by channel
22. **REV-1** — Growth trajectory vs. projections
23. **PRO-6** — Referral conversion rates
24. **PRO-8** — Pro-to-Pro recruitment behavior

### Validate in 6-12 months
25. **FLY-2** — Guest-to-customer conversion (cohort data)
26. **FLY-3** — Flywheel cycle timing
27. **APP-1** — Social feature engagement

---

## Cross-Cutting Patterns

Five systemic patterns emerged across all assumptions:

### 1. Revenue projections are built on a foundation of unvalidated unit economics
Every pricing decision, discount structure, and margin calculation floats without an anchor until we know what it actually costs to serve one guest at one event. **No cost-to-serve analysis exists anywhere in the docs.**

### 2. Specific numbers appear without empirical basis
80% email capture, 40% upload rate, 2% flywheel conversion, 60% referral conversion, 10% reshare rate — these are embedded in financial projections as if measured, but they are guesses. They need to be labeled as hypotheses until validated.

### 3. The flywheel is a long-term asset, not a near-term growth engine
The wedding-to-wedding cycle is 1-3 years. The flywheel barely completes one cycle within the 12-month planning horizon. Treating it as a compounding growth engine in near-term projections is misleading.

### 4. The Pro adoption thesis is untested
The chosen primary growth loop (P0-4) depends entirely on wedding professionals adopting and recommending an unproven product. Zero professionals have been interviewed. This is the single highest-priority validation.

### 5. Legal/compliance gaps exist in domains that marketing-focused planning naturally under-weights
CSAM obligations, BIPA exposure, GDPR processor requirements, MLM classification, and tax reporting are unaddressed but carry existential risk (class actions, regulatory enforcement).

---

## Founder Interview Findings (2026-02-15)

A structured interview with the founder revealed that the gap between the strategy docs and ground-level reality is wider than the docs suggest. This is not a failure — it is a common and correctable state for a pre-launch product. The key findings are:

### What we now know for certain

| Factor | Reality | What the docs assume |
|--------|---------|---------------------|
| **Product status** | Partially built (event creation, QR gen, photo upload work; album view NOT done) | Ready for beta in 30 days |
| **Real-world testing** | Zero — no real people have used it at any event | 5-10 beta weddings planned |
| **Time commitment** | Side project, 10-20 hrs/week | Full-time execution |
| **Total investment** | Under $500 | Marketing budget of $1,450-$2,400/mo Phase 1 |
| **Founder location** | Australia | All docs assume US market |
| **Target market** | All English-speaking markets (AU, US, UK, NZ) | US-only |
| **Wedding pro conversations** | Zero — none contacted | 20-30 Pro signups in 3 months |
| **Competitor research** | Saw one on Instagram reel; no products tested | 6 competitors analyzed in docs |
| **Price validation** | $2/guest is gut feel / anchoring | Treated as decided and justified |
| **Upload rate basis** | Gut feel / aspiration | 40-50% treated as KPI target |
| **Flywheel 2% conversion** | Aspiration / placeholder | "Conservative" estimate driving $3.5M projection |
| **"No app required" claim** | Not verified against current competitors | Primary differentiator in all messaging |
| **Revenue projections** | Founder says "optimistic but possible" (stretch targets) | Treated as base-case planning numbers |
| **AI watermark** | Gemini Nano/Banana API, one-time gen, client-side overlay | Unspecified; cost risk flagged |
| **Video policy** | 20-second clips (smart cap) | "Unlimited uploads" in marketing |
| **Email service** | Resend (decided) | Undecided |
| **Storage** | Supabase Storage, Pro plan ($25/mo), overages not modeled | Not analyzed |
| **CSAM obligations** | Aware but not planned | Not discussed |
| **BIPA risk** | No face processing (confirmed) — risk reduced | Unknown |
| **Legal counsel** | Plans to consult before launch | Not discussed |
| **AU compliance** | Not researched (Privacy Act, Spam Act) | Not discussed (US-centric docs) |
| **Stripe Connect AU** | Not verified for AU use case | Assumed available |
| **MLM structure** | Open to simplifying to flat referral | 3-tier decided |
| **Credits vs. cash** | Flexible — hybrid is fine | Credits-first decided |
| **Wedding season** | AU season is NOW (Oct-Apr); wants to catch tail end | US season (May-Oct) |

### Updated confidence levels based on interview

| ID | Original Confidence | Updated Confidence | Reason |
|----|--------------------|--------------------|--------|
| FIN-1 | UNKNOWN | PARTIALLY KNOWN | Watermark cost is near-zero (client-side). Video capped at 20s. Storage still unmodeled. |
| FIN-2 | MEDIUM | LOW | Price is gut feel with zero validation |
| FIN-6 | LOW | MEDIUM | 20-second video cap significantly reduces storage risk |
| GUEST-1 | LOW | LOW | Confirmed: gut feel basis |
| FLY-1 | LOW | LOW-MEDIUM | Email will be optional (asked after upload), not a gate — reduces friction concern |
| FLY-2 | LOW | LOW | Confirmed: aspiration/placeholder |
| PRO-1 through PRO-9 | Various | All downgraded | Zero professional contact = zero signal |
| LEGAL-2 | UNKNOWN | MEDIUM | No face processing confirmed — BIPA risk reduced substantially |
| OPS-1 | LOW | VERY LOW | 10-20 hrs/week makes full plan execution impossible at stated scope |
| OPS-4 | MEDIUM | LOW | AU season is Feb-Apr (2 months left); product is 1-2 months from MVP |
| REV-1 through REV-5 | LOW | VERY LOW | Side project + no market validation + stretch targets |

### Decisions made during interview

1. **Email gate:** Will be optional (asked after upload, not before). This is the right call — maximizes uploads, uses "send you the album" as value exchange.
2. **MLM structure:** Open to simplifying to flat single-tier referral. Will decide after talking to actual Pros.
3. **Credits vs. cash:** Flexible. Will let Pro interviews inform the model.
4. **Flywheel revenue:** Agreed to halve as baseline. Recommendation: treat as $0 baseline / upside scenario until cohort data exists.
5. **Priority:** Finish the MVP. This is correct.

---

## Revised Action Plan (Calibrated to Reality)

The original validation roadmap assumed full-time execution and a near-launch product. Here is the revised plan for a side-project founder with a partially built MVP and 10-20 hours/week.

### Phase A: Ship the MVP (Next 4-6 weeks, ~60-80 hrs)
**Goal:** Get to a product that works end-to-end so a real person can use it at a real event.

1. Build the album/gallery view (the missing critical piece)
2. Build a basic event setup flow that produces printable QR codes
3. Skip: AI watermarks, filters, Pro dashboards, email sequences, moderation tools
4. Skip: All multi-tier Pro discount infrastructure
5. Ship the simplest possible version that delivers the core promise: guests scan QR, upload photos, couple sees album

### Phase B: First Real Test (Week 6-8)
**Goal:** Get the product in front of real humans at a real event.

1. Arrange a test event (birthday party, dinner, small gathering — doesn't need to be a wedding)
2. Measure: What percentage of guests actually scan and upload? How many photos? What breaks?
3. This single test validates or invalidates: GUEST-1, GUEST-2, GUEST-3, GUEST-4, GUEST-5, FLY-1
4. After this test, you will know more than all 11 strategy docs combined

### Phase C: Talk to 10 Wedding Pros (Weeks 4-8, parallel with Phase A)
**Goal:** Validate or invalidate the Pro growth loop before building any Pro features.

1. Find 10 wedding photographers/planners (AU market first — it's your home turf)
2. Show them the product concept (even screenshots or a demo video)
3. Ask: Would you use this? Would you recommend it to clients? Would credits motivate you? Does the multi-tier structure feel like MLM?
4. This validates or invalidates: PRO-1 through PRO-8
5. Cost: $0, time only. This is the highest-ROI activity possible.

### Phase D: Competitive Reality Check (Week 2-3, 3-4 hours)
**Goal:** Know what you're actually competing against.

1. Sign up for The Guest, Joy, and 2-3 other competitors
2. Test their guest flow end-to-end (create event, scan QR/download app, upload photo)
3. Document what they do well, what they charge, and whether they require app downloads
4. This validates or invalidates: MKT-1, MKT-2, MKT-3

### Phase E: Cost Model (Week 3-4, 2-3 hours)
**Goal:** Know your actual margins before setting prices.

1. Calculate Supabase storage/bandwidth cost per event (est. photos x avg file size x 12 months)
2. Calculate Stripe fees per transaction
3. Calculate Resend email cost per event
4. Calculate AI watermark cost per event (when built)
5. Model margin at $2/guest, $1.20/guest, and $0.90/guest
6. This validates or invalidates: FIN-1, FIN-4, FIN-5

### Phase F: Legal Baseline (Before any public launch)
**Goal:** Don't get sued.

1. Research Australian Privacy Act obligations for user-uploaded photos
2. Research CSAM detection obligations (likely less onerous than US at small scale, but research it)
3. Consult a lawyer (even a 1-hour consultation) about: privacy policy, terms of service, email compliance under AU Spam Act
4. Document: "No face processing in any AI feature" as a policy (protects against BIPA-equivalent claims)

### What to DEFER entirely

- 3-tier Pro recruitment discount system → simplify to flat referral, validate need first
- Pro credit/cashout via Stripe Connect → don't build until you have 10+ active Pros
- Email nurture sequences → don't build until you have 500+ guest emails
- Venue accounts → deferred (already decided in P2-13)
- Social app → deferred (already decided)
- All revenue projections beyond "how many events this month" → not useful yet
- Flywheel revenue modeling → treat as $0 until you have 6 months of cohort data
- Multi-currency pricing → start with AUD, add USD when US traction justifies it

---

## Document Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-02-15 | Initial register created with 48 assumptions across 10 categories | Strategy team review |
| 2026-02-15 | Added founder interview findings, updated confidence levels, revised action plan calibrated to side-project reality | Founder interview |
