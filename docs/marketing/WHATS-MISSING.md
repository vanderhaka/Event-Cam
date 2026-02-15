# What's Missing — Marketing Doc Gap Analysis

> Audit of the current marketing doc set. What's covered, what's not, and what to prioritise next.

---

## What's Covered

| Doc | What It Covers |
|-----|---------------|
| `MARKETING-PLAN.md` | Core strategy, audience (wedding-focused), messaging pillars, competitive landscape, $2/guest pricing, go-to-market channels, launch phases, content strategy, email sequences, partnerships, guest email flywheel, metrics/KPIs, budget, risks |
| `PRICING-MODELS.md` | Pricing for all event types (guest list, open, multi-day/festival) and all account types (standard, venue, Pro). Free tier, add-ons, pricing page layout, cost comparisons |
| `PRO-ACCOUNT-DEEP-DIVE.md` | Unified Pro model ($1.20/guest wholesale, $0.60/guest commission), two paths, promo code math, dashboard wireframes, client handoff, white-label, Pro Directory, earnings mechanics, revenue projections |
| `ACCOUNT-TYPES.md` | Venue accounts (multi-admin, permanent QR, subscription tiers) and Pro accounts (overview). Account structure diagrams, revenue mix targets, open questions |
| `PURPLE-COW-CHANNELS.md` | 14 unconventional growth channels, categorised by cost (free/low/paid), with priority matrix and quick-start timeline |
| `NAMING-BRAINSTORM.md` | 5 Tier 1 names (Afterglow, Confetti, Toast, Heirloom, Mosaic), brand direction concepts with palettes/typography/voice for each, scoring matrix, recommendation |

---

## What's Missing

### High Priority — Would Strengthen the Plan Significantly

#### 1. Referral Program Specifics — RESOLVED

**Status:** Decided (P1-10, 2026-02-15). See `PRO-ACCOUNT-DEEP-DIVE.md` for full details.

**Decisions:**
- **Couple-to-couple referral:** Eliminated. Not part of the model.
- **Guest-to-couple conversion:** No referral reward. Guests convert organically via the email flywheel — no incentive structure needed.
- **Pro-to-Pro recruitment:** 3-tier discount system. Recruiting active Pros deepens your wholesale rate: +2% (Tier 1), +1% (Tier 2), +0.5% (Tier 3). Cap: 55% ($0.90/guest floor).
- **Pro-to-couple referral:** 20% credit ($0.40/guest). Never expires, applied to future events.
- **Payout option:** Credits above $100 can be cashed out via Stripe Connect Express (monthly). Serves connector Pros (bands, dress shops, florists) who refer but never create their own events.
- **Attribution:** 90-day cookie for client referrals. Pro-to-Pro recruitment is permanent (first recruiter wins).
- **Anti-abuse:** "Active" = 1 paid event in 90 days. One upline per Pro. Different payment method required on self-referral attempts.

---

#### 2. Competitive Moat / Defensibility

**Why it matters:** The product is buildable. What stops a well-funded competitor from cloning it in 3 months? Important for strategic clarity and essential if you ever raise money.

**What's needed:**
- Network effects: How does the Pro network, venue installs, and guest email list create defensibility over time?
- Brand moat: First-mover advantage in "AI watermarked wedding guest photos" — how quickly can you own this category?
- Data advantages: The guest email list compounds. Every wedding makes the next one cheaper to acquire.
- Switching costs: Once a venue installs permanent QR stands and trains staff, they don't switch. Once a Pro has 50 client events in the dashboard, they don't migrate.
- Distribution lock-in: If you're integrated with Zola, The Knot, or built into venue packages, you're embedded in the wedding planning workflow.
- What's NOT a moat: Features (AI watermarks are replicable), pricing (anyone can charge $2/guest), technology (Next.js + Supabase is standard).
- Honest assessment: Where are you vulnerable? What would you do if The Guest app dropped the download requirement tomorrow?

---

#### 3. Launch Playbook

**Why it matters:** The marketing plan has phases, but no day-by-day tactical plan for the actual launch. When you flip the switch, what happens hour by hour?

**What's needed:**
- Pre-launch countdown (2 weeks out): What's ready? What's queued?
- Launch day timeline: Product Hunt submission timing, social posts (what, where, when), email blast to waitlist, Reddit/Facebook posts, founder outreach
- Launch week plan: Day 1–7 follow-up, responding to comments, press outreach, community engagement
- Post-launch (week 2–4): What to measure, what to iterate, when to scale up
- Product Hunt specific: Optimal day/time to launch, how to rally upvotes, maker comment strategy, what assets to prepare (video, screenshots, description)
- Contingency: What if the launch flops? What's the backup plan?

---

#### 4. Retention Strategy for Recurring Accounts

**Why it matters:** Venue and Pro accounts are recurring revenue. If they churn, revenue drops. One-time wedding customers don't churn (they just don't come back), but recurring accounts can cancel any month.

**What's needed:**
- Onboarding success criteria: What does a "healthy" venue or Pro look like in the first 30 days? (e.g., 3+ events created, first payout received)
- Health scoring: Metrics that predict churn (declining events/month, no login in 30 days, support tickets)
- Re-engagement triggers: Automated emails when activity drops ("You haven't created an event in 3 weeks — need help?")
- Feature drip: Introduce new features over time to keep the product feeling fresh (new watermark styles, new filters, analytics improvements)
- Annual lock-in: Incentivise annual billing (20% discount) to reduce monthly churn decision points
- Venue-specific: Seasonal slowdowns are normal (venues have quiet months). Don't treat seasonal inactivity as churn.
- Pro-specific: Wedding season is May–Oct. A Pro going quiet in November isn't churning — they're in off-season. Adjust expectations.

---

#### 5. Legal / Compliance

**Why it matters:** Guest email collection at scale has real legal implications. One complaint to a data protection authority could be a problem. Photo consent and UGC rights need to be clear.

**What's needed:**
- **GDPR compliance:** For EU-based weddings, destination weddings in Europe, or EU guests at any wedding. Consent for email capture, right to deletion, data processing agreements.
- **CAN-SPAM / CASL:** US and Canadian email marketing laws. Transactional emails (album delivery) are exempt, but marketing emails (guest nurture) require opt-in and easy unsubscribe.
- **Photo consent / UGC rights:** Who owns the photos? The guest who took them? The couple who paid? Event Cam? Need clear Terms of Service. Mandatory consent screen before upload (already built, but needs legal review).
- **Data retention policies:** How long do we store photos? Guest emails? What happens when an event is deleted? What about the 12-month album hosting limit?
- **Privacy policy:** Needs to cover: what data we collect (photos, emails, device info), how we use it (album delivery, marketing with opt-in, anonymised analytics), who we share it with (no one, unless required by law).
- **Terms of Service:** Prohibited content (NSFW, illegal), content moderation responsibilities, liability limitations, refund policy.
- **Age restrictions:** Minors at weddings uploading photos — any COPPA implications?
- **International considerations:** Different countries have different rules. India's DPDP Act, UK's post-Brexit GDPR, Australia's Privacy Act.

---

### Medium Priority — Would Be Nice to Have

#### 6. Growth Loops Diagram

**Why it matters:** The guest email flywheel is the core thesis, but it's never been drawn as a connected system showing how every channel feeds into the next.

**What's needed:**
- Visual map: Couple pays → guests upload → emails captured → guests become couples → they pay → more guests
- Pro loop: Pro refers couple → couple uses product → guests get emails → some become couples → Pro gets credit for more referrals
- Venue loop: Venue hosts events → guests experience product → some book the venue for their own event → venue gets more events
- Content loop: Real wedding photos → social content → new couples discover product → their wedding photos become content
- Quantified: Attach conversion rates to each step. What's the viral coefficient? Does each wedding generate > 1 future wedding customer?

---

#### 7. Onboarding Flows

**Why it matters:** The first 5 minutes after signup determine whether someone activates or bounces. Different for each account type.

**What's needed:**
- **Couple onboarding:** Signup → create event → add guest list → choose watermark → pick filter → preview → pay → generate QR codes. Where do people drop off? What nudges them forward?
- **Pro onboarding:** Signup → set up business profile → create first client event (free) OR share referral link → first payout. How quickly do they see value?
- **Venue onboarding:** Signup → 14-day trial → create first event → invite team members → set up permanent QR → first real event. What makes them convert to paid?
- Screen-by-screen wireframes for each flow
- Empty states: What does the dashboard look like before the first event? (Not blank — helpful prompts and CTAs)

---

#### 8. PR / Media Strategy

**Why it matters:** The "disposable camera killer" and "AI watermark" angles are inherently newsworthy. Free press coverage could be worth more than months of paid ads.

**What's needed:**
- **Story angles:** "This startup is replacing disposable cameras at weddings with AI." / "How AI is changing wedding photography." / "The $300 alternative to a $2,000 photo booth."
- **Target outlets:**
  - Tech press: TechCrunch, The Verge, Product Hunt (for launch)
  - Wedding press: Brides, Martha Stewart Weddings, The Knot blog, WeddingWire blog
  - Business press: Forbes (startup angle), Business Insider
  - Niche: PetaPixel (photography angle), Fstoppers
  - Podcasts: Wedding planning podcasts, photography business podcasts, startup podcasts
- **Press kit:** One-pager, founder bio, product screenshots, watermark examples, key stats, high-res logo
- **Pitch templates:** Tailored for each outlet type
- **Timing:** Align with engagement season (Dec–Feb) or wedding season kickoff (April–May) for maximum relevance

---

#### 9. Seasonal Marketing Calendar

**Why it matters:** Weddings are seasonal. Marketing spend and messaging should follow the cycle, not fight it.

**What's needed:**
- 12-month calendar mapping:
  - **Dec–Feb:** Engagement season (Christmas, NYE, Valentine's proposals). Heavy top-of-funnel: "Just got engaged? Here's a wedding hack your guests will love."
  - **Mar–Apr:** Wedding planning peak. Couples booking vendors, making decisions. Conversion-focused: "Set up your wedding album in 5 minutes."
  - **May–Oct:** Wedding season. Events happening. Focus on guest experience, real-time content from real weddings, case studies.
  - **Nov:** Off-season starts. Target destination/winter weddings. Holiday party push for venues.
  - **Dec:** Engagement season begins again. Plus holiday parties for venues and corporate events.
- Channel mix by season: When to ramp paid ads, when to lean on organic, when to push partnerships
- Content themes by month
- Budget allocation by quarter

---

#### 10. Customer Support Playbook

**Why it matters:** Wedding day is the highest-stakes moment for the product. If QR codes don't work or uploads fail during the reception, the couple doesn't get a second chance. Trust requires knowing support exists.

**What's needed:**
- Support channels: Email? Live chat? In-app? Phone (for wedding day emergencies)?
- Response time SLAs: Different for different account types (Standard vs. Pro vs. Venue)
- Wedding day protocol: Is there a real-time support option for the day of? Even just a "wedding day hotline" feels reassuring.
- Common issues playbook: QR code not scanning, upload failing, guest can't find the event, couple locked out, photos not appearing in moderation queue
- Self-service: FAQ, help center, troubleshooting guides, video tutorials
- Escalation path: Tier 1 (FAQ/bot) → Tier 2 (human) → Tier 3 (founder, for now)
- Proactive support: Pre-wedding checklist email, "test your QR codes before the big day" prompt

---

### Lower Priority — Eventually Needed

#### 11. Investor / Fundraising Narrative

**Why it matters:** If you ever pitch investors, you need the story condensed into a 10-slide deck. The guest email flywheel alone is a compelling pitch.

**What's needed:**
- Problem → Solution → Market size → Business model → Traction → Growth engine (flywheel) → Team → Ask
- The "why now" angle: AI watermarks, no-app-download becoming expected, disposable camera nostalgia trend, wedding spend recovering post-pandemic
- TAM/SAM/SOM: Total addressable market (all weddings globally), serviceable (English-speaking markets), obtainable (realistic year 1–3)

---

#### 12. Localisation Strategy

**Why it matters:** Weddings are global. $2/guest in USD is steep in India (where weddings are 300–1,000 guests), cheap in Norway.

**What's needed:**
- Which markets first? (UK/Australia = English-speaking + similar wedding culture. India = massive weddings but different price sensitivity.)
- Pricing by region: PPP-adjusted pricing? Regional tiers?
- Language: Guest upload flow in Spanish, French, Hindi, Portuguese — which first?
- Cultural differences: Wedding customs vary hugely. QR codes on tables might not make sense everywhere.
- Payment methods: Not everyone uses credit cards. UPI in India, iDEAL in Netherlands, etc.

---

#### 13. Unit Economics Deep Dive by Channel

**Why it matters:** Not all customers are equal. A wedding acquired via Google Ads has a different CAC and LTV than one acquired via the guest email flywheel or a Pro referral.

**What's needed:**
- CAC by channel: Google Ads, Meta Ads, Pinterest, organic/SEO, referral, Pro, guest email, venue
- LTV by segment: Standard couple, Pro client, venue event
- Payback period by cohort
- Channel efficiency ranking: Which channels produce the most revenue per dollar spent?
- Diminishing returns analysis: At what spend level does each paid channel start to become inefficient?

---

## Prioritisation Matrix

| Doc | Priority | Impact | Effort | Suggested Timing |
|-----|----------|--------|--------|-----------------|
| Referral Program | High | High | Medium | Before launch |
| Competitive Moat | High | High | Low | Before launch / fundraising |
| Launch Playbook | High | Very High | Medium | 2–4 weeks before launch |
| Retention Strategy | High | High | Medium | Before venue/Pro accounts ship |
| Legal / Compliance | High | Critical | High | Before launch (consult a lawyer) |
| Growth Loops Diagram | Medium | Medium | Low | Anytime — useful for clarity |
| Onboarding Flows | Medium | High | Medium | Before launch |
| PR / Media Strategy | Medium | High | Medium | 2–4 weeks before launch |
| Seasonal Calendar | Medium | Medium | Low | Before first wedding season |
| Customer Support Playbook | Medium | High | Medium | Before launch |
| Investor Narrative | Low | High (if raising) | Medium | When needed |
| Localisation Strategy | Low | Medium | High | After product-market fit in primary market |
| Unit Economics by Channel | Low | Medium | Medium | After 3–6 months of data |

---

## Suggested Next Steps

**Before launch (must-haves):**
1. Referral program specifics
2. Legal / compliance review (at minimum: privacy policy, ToS, consent flow, email compliance)
3. Launch playbook (week-by-week)

**Before launch (strong-to-haves):**
4. Competitive moat doc (clarifies strategy, useful for any investor conversations)
5. Onboarding flows (directly impacts conversion)
6. Customer support playbook (trust = willingness to pay)

**First 3 months post-launch:**
7. PR / media strategy (time it with real wedding case studies)
8. Seasonal calendar (plan ahead for engagement season)
9. Growth loops diagram (useful once you have real data to attach)
10. Retention strategy (once venue/Pro accounts are live)

---

*This is a living checklist. Check off items as they're completed. Reprioritise as the product and market evolve.*
