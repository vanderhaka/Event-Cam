# Pricing Models — All Event Types & Account Types

> The core challenge: one product serves wildly different use cases — a 150-person wedding where you know every guest, a house party where you have no idea who's coming, a 3-day festival with 5,000 attendees, a pub running weekly events, and a photographer bundling the product into their packages. The pricing needs to feel fair and simple for all of them.

---

## Table of Contents

1. [Pricing Philosophy](#1-pricing-philosophy)
2. [Model 1: Guest List Events (Known Count)](#2-model-1-guest-list-events-known-count)
3. [Model 2: Open Events (Unknown Count)](#3-model-2-open-events-unknown-count)
4. [Model 3: Multi-Day Events & Festivals](#4-model-3-multi-day-events--festivals)
5. [Model 4: Venue Accounts](#5-model-4-venue-accounts)
6. [Model 5: Pro Accounts](#6-model-5-pro-accounts)
7. [Free Tier](#7-free-tier)
8. [Add-Ons (Universal)](#8-add-ons-universal)
9. [Pricing Page Layout](#9-pricing-page-layout)
10. [Comparison: What $2/Guest Actually Buys](#10-comparison-what-2guest-actually-buys)
11. [Open Questions](#11-open-questions)

---

## 1. Pricing Philosophy

A few principles to keep pricing from becoming a mess as the product expands:

- **Simple to explain in one sentence.** If a customer can't understand the price in 5 seconds, it's too complex.
- **Anchored to $2/guest where possible.** This is the core mental model. Other pricing should feel like natural extensions of it, not a totally different system.
- **No surprise bills.** People paying for events (especially weddings) are stressed enough. No overages, no hidden fees, no "you went over your limit" emails.
- **Generous free tier.** Let people try the full product before paying. The product sells itself once someone sees the watermarked album.
- **Upsell through add-ons, not feature gating.** Every plan gets the core features (QR codes, uploads, watermarks, filters, moderation, albums, sharing). Premium add-ons are extras, not unlocks.

---

## 2. Model 1: Guest List Events (Known Count)

> Weddings, corporate events, private parties — any event where the organizer knows approximately how many guests are coming.

This is the bread and butter. The guest count is known upfront because the organizer adds a guest list.

### Pricing: $2 Per Guest

| Example | Guests | Price | Wedding Budget Context |
|---------|--------|-------|----------------------|
| Intimate wedding / dinner party | 25 | $49 (minimum) | Less than a single centerpiece |
| Engagement party | 60 | $120 | Less than the invitations |
| Mid-size wedding | 150 | $300 | Less than the cake |
| Large wedding | 250 | $500 | Less than the DJ's overtime fee |
| Grand / cultural wedding | 500 | $1,000 | Less than one hour of photography |
| Corporate offsite | 80 | $160 | One line item on the expense report |

### Rules

- **Minimum: $49** — Events under 25 guests still pay $49. Positions the product as premium, covers costs, and prevents micro-events from diluting perceived value.
- **No maximum** — Let it scale. A 500-person wedding at $1,000 is still a fraction of the total budget.
- **Charged at event creation** — Pay when you publish the event / generate QR codes. Not after the event.
- **Guest count = QR codes generated** — You pay for the number of unique QR codes, which equals your guest list size.
- **Add guests later:** If the couple adds 10 more guests after paying, they're charged $20 more. Simple top-up.

### What's Included (Everything)

- Unlimited uploads per guest (photos + video)
- AI-generated custom watermark
- Full filter library
- Moderation dashboard
- Curated albums + password-protected sharing
- Unique QR code per guest
- Guest email capture
- 12-month album hosting

### Why $2/Guest Works

- **Dead simple** — "Two dollars per guest." No tiers, no feature matrix.
- **Scales with value** — more guests = more photos = more storage = more value.
- **Feels premium but accessible** — $300 for a 150-person wedding signals quality. $150 was almost suspiciously cheap. $300 is still less than the cake, the flowers, the DJ, or one hour of photography.
- **$49 minimum sets the floor** — Even a 10-person dinner feels like a real purchase at $49, not a throwaway impulse buy.
- **Easy to justify in a wedding budget** — The average US wedding costs $35,000. $300 is 0.86% of the total budget.

---

## 3. Model 2: Open Events (Unknown Count)

> House parties, birthday bashes, bar nights, brand activations, community events, meetups — any event where you don't have a guest list and don't know how many people will show up or participate.

The $2/guest model doesn't work here because there's no guest list. You can't charge per head when you don't know how many heads there are. You need a different model that still feels fair.

### Option A: Flat-Fee Tiers (Recommended)

Simple tiered pricing based on expected event size. The organizer picks the tier that fits, and gets unlimited uploads within that tier.

| Tier | Upload Slots | Price | Best For |
|------|-------------|-------|----------|
| **Small** | Up to 50 uploaders | $49 | House parties, dinners, small meetups |
| **Medium** | Up to 150 uploaders | $99 | Birthday parties, brand events, work socials |
| **Large** | Up to 500 uploaders | $199 | Large parties, club nights, brand activations |
| **Massive** | Up to 2,000 uploaders | $399 | Concerts, large community events |

- **"Uploaders"** = unique people who scan the QR and upload at least one photo. NOT guests invited — people who actually participate.
- **One shared QR code** — Instead of unique QR per guest, the event gets one (or a few) QR codes that anyone can scan. No guest list required.
- **Email captured on scan** — Guest enters email before uploading (same as guest list events, same flywheel).
- **No overage charges** — If you hit the uploader limit, new scanners see a friendly "This event's album is full!" message. No surprise bills.

**Why tiers over pay-per-uploader:**
- Pay-per-uploader creates anxiety: "What if 200 people show up and I only budgeted for 100?" Tiers remove that stress.
- Tiers are easy to compare and choose from. Pay-per-uploader requires math.
- Tiers let you anchor to a flat number that feels manageable.

### Option B: Pay-Per-Uploader With a Cap

If tiers feel too rigid, offer pay-per-uploader with a price cap:

| Uploaders | Price | Cap |
|-----------|-------|-----|
| First 50 | $1.00/uploader | — |
| 51–150 | $1.00/uploader | Cumulative cap: $99 |
| 151–500 | $1.00/uploader | Cumulative cap: $199 |
| 500+ | $1.00/uploader | Cumulative cap: $399 |

- You never pay more than the cap for your tier.
- If only 30 people show up at your "Large" event, you pay $15 — not $99.
- **Downside:** More complex. Requires post-event billing or a deposit + refund model. Creates billing friction.

### Option C: Unlimited Flat Fee

Just charge a flat fee regardless of attendance:

| Duration | Price |
|----------|-------|
| Single event (1 day) | $79 |
| Weekend event (2–3 days) | $129 |

- Simplest possible model. No tiers, no counting, no caps.
- **Downside:** Feels expensive for a 20-person house party. Feels cheap for a 500-person brand activation. One-size-fits-all always leaves money on the table or prices people out. One-size-fits-all always leaves money on the table or prices people out.

### Recommendation: Option A (Flat-Fee Tiers)

Tiers strike the best balance between simplicity and fairness. The organizer picks a size, pays upfront, and never worries about overages. It's also easy to display on a pricing page.

### How Open Events Differ from Guest List Events

| Feature | Guest List Event | Open Event |
|---------|-----------------|------------|
| QR codes | Unique per guest | Shared (one or few QR codes) |
| Guest list required | Yes | No |
| Pricing model | $2/guest | Flat-fee tier by expected size |
| Email capture | Pre-loaded from guest list OR at upload | Always at upload (required) |
| Moderation | Yes | Yes |
| AI watermark | Yes (couple's names/date) | Yes (event name/date/custom text) |
| Filters | Yes | Yes |

---

## 4. Model 3: Multi-Day Events & Festivals

> Music festivals, multi-day conferences, destination wedding weekends, corporate retreats, sporting events, multi-day community celebrations.

Multi-day events are different in three ways: (1) they span multiple days, (2) they can have thousands of attendees, and (3) the organizer is often a business, not an individual — they have budget and expect enterprise-grade features.

### Pricing: Day-Based + Capacity

| Capacity | 1 Day | 2–3 Days | 4–7 Days |
|----------|-------|----------|----------|
| Up to 500 | $149 | $249 | $399 |
| 500–2,000 | $349 | $549 | $799 |
| 2,000–10,000 | $699 | $999 | $1,499 |
| 10,000+ | Custom | Custom | Custom |

### What's Different About Festival/Multi-Day Events

| Feature | Standard Event | Multi-Day / Festival |
|---------|---------------|---------------------|
| Duration | Single day | 1–7+ days |
| QR distribution | Table cards, place cards | Wristbands, signage, stage screens, app links, printed on tickets |
| Uploads per attendee | 5–15 photos | 20–50+ photos across multiple days |
| Storage needs | Moderate | Very high (especially video) |
| Moderation volume | Manageable (one person) | May need team moderation (multiple admins) |
| Branding | Couple's names / watermark | Festival logo, sponsor logos, event branding |
| Albums | 1–3 curated albums | Multiple albums by day, stage, or theme |
| Analytics | Nice to have | Expected (upload volume by day, peak times, popular areas) |
| API access | Not needed | May want to pull content into their own app/site |

### Multi-Day / Festival Features (Included at These Price Points)

- Multiple QR code zones (e.g., Main Stage, Food Court, VIP Area — each with its own QR)
- Multi-admin access (event team can all moderate)
- Day-by-day album organization
- Custom branding (event logo as watermark, branded upload page)
- Extended storage (higher limits for video-heavy festivals)
- Basic analytics dashboard
- Bulk export of approved media

### Enterprise / 10,000+ Custom Pricing Includes

- Everything above, plus:
- API access (pull approved media into the festival's own app or website)
- Sponsor branding (sponsor logos on upload page or watermark)
- Real-time moderation tools (flag/queue system for high volume)
- Dedicated support contact
- SLA for uptime
- Custom data retention and privacy terms
- Invoice billing (not credit card)

### Why Multi-Day Pricing Isn't Just "More Days × Same Price"

- Storage costs are genuinely higher — a 3-day festival with 5,000 people could generate 50,000+ uploads including video.
- Moderation complexity increases — need team tools, not single-user tools.
- The value is higher — a festival is a business generating revenue from tickets, sponsors, and merchandise. $999 for a 3-day, 5,000-person festival is a rounding error in their production budget.
- Branding expectations are higher — festivals want their logo everywhere, not a generic experience.

### Cross-Sell from Festivals Back to Weddings

Festival attendees are a massive guest email pool. A 5,000-person festival generates 5,000 emails of people who just had a great experience with the product. Many of them are in wedding-planning age ranges. This is the guest email flywheel on steroids.

---

## 5. Model 4: Venue Accounts (Future Feature)

> **Note:** Venue accounts are a future feature, not currently live. Pricing below is planned, not active.
>
> Pubs, clubs, bars, hotels, restaurants, event spaces, breweries, wedding venues — any business that hosts events regularly.

Venues need recurring access, not one-time event purchases. They host events weekly or daily. They need multi-admin, venue branding, and permanent QR codes.

### Pricing: Monthly Subscription

| Tier | Events/Month | Uploaders/Event | Price/Month | Annual (20% off) |
|------|-------------|-----------------|-------------|-------------------|
| **Starter** | Up to 4 | Up to 100 each | $99/mo | $950/yr ($79/mo) |
| **Growth** | Up to 12 | Up to 200 each | $199/mo | $1,910/yr ($159/mo) |
| **Unlimited** | Unlimited | Up to 500 each | $399/mo | $3,830/yr ($319/mo) |
| **Enterprise** | Unlimited | Unlimited | Custom | Custom |

### What's Included at Every Tier

- Multi-admin access (Owner + admins + staff roles)
- Venue branding on upload page (logo, colors)
- Permanent QR codes (route to current active event automatically)
- Event templates (clone a setup for recurring events)
- Moderation dashboard
- AI watermark (venue name/logo or custom per event)
- Filters
- Guest email capture (Event Cam retains guest data; venues do not receive guest email lists)
- Album hosting for 6 months per event

### Growth+ Adds

- Analytics dashboard (upload volume, participation rates, peak times)
- Priority support
- Custom domain for upload page (photos.yourvenue.com)

### Unlimited+ Adds

- API access
- Webhook notifications (new upload, event started, etc.)
- Bulk media export
- 12-month album hosting (vs 6 months on lower tiers)

### Venue Pricing Logic

A pub running 4 events/month at $99/mo = $24.75/event. If they average 60 uploaders per event, that's $0.41/uploader. Cheaper than the per-event or per-guest model — which is the point. Venues get volume pricing because they commit to recurring revenue.

A hotel running unlimited events at $399/mo hosting 15 events/month = $26.60/event. At 150 uploaders average = $0.18/uploader. Strong value, and the hotel is paying $4,788/year — a small line item for a hotel's marketing budget.

### Why Monthly (Not Per-Event for Venues)

- Venues think in monthly costs, not per-event costs. They budget monthly.
- Recurring subscription = predictable revenue for us.
- Removes friction — venue staff don't need to create a new payment for every trivia night or birthday party.
- The "permanent QR code" feature only makes sense with an ongoing subscription. If they cancel, the QR codes stop working.

---

## 6. Model 5: Pro Accounts

> Photographers, wedding planners, DJs, celebrants, coordinators — professionals who create events on behalf of their clients.

Pros need two things: (1) a way to manage multiple client events, and (2) a financial incentive to recommend/resell the product.

### Two Models (Pro Chooses)

#### Model A: Wholesale (For Pros Who Bundle)

The Pro buys at a discount and resells at their own price.

**Note:** The Pro account model has been refined — see `PRO-ACCOUNT-DEEP-DIVE.md` for the full unified model.

**Summary:** One flat Pro rate: **$1.20/guest** (40% off the $2 retail price). No volume tiers.

- **No monthly fee** — the Pro only pays when they create events.
- **Pro sets their own client price** — they can charge $2/guest (keep the margin), $2.50/guest (premium markup), or bundle it invisibly into their package.

**Example:**
- Photographer does 40 weddings/year averaging 140 guests = 5,600 guests/year.
- Pro rate: $1.20/guest.
- Annual cost: $6,720.
- If they charge clients $2/guest (bundled into their photography package): $11,200 revenue.
- **Net margin: $4,480/year** from just reselling the product.
- Or they absorb the cost ($168/wedding at $1.20 × 140 guests) as a value-add in their $4,000 package. It's 4.2% of their package price for a major feature.

#### Model B: Referral Credits (For Pros Who Recommend)

The Pro doesn't handle billing. They refer clients and earn credit toward their own future events. **No cash payouts.**

| Structure | Details |
|-----------|---------|
| Credit earned | 20% of event revenue ($0.40/guest) |
| Default use | Applied to future Path 1 events (reduces wholesale cost) |
| Payout option | Cash out via Stripe Connect Express at **$100+ minimum balance** (monthly) |
| Credit expiry | Never expires |
| Attribution | Referral link or promo code, 90-day cookie |
| Dashboard | Track referrals, conversions, credit balance in real-time |

**Note:** In the unified Pro model (see `PRO-ACCOUNT-DEEP-DIVE.md`), referred events are charged at the standard $2/guest rate. The Pro earns $0.40/guest as credit. We keep $1.60/guest.

**Example:**
- Celebrant recommends Event Cam to 50 couples/year.
- 60% convert (30 couples), averaging 130 guests.
- Couple pays $2/guest = $260/event.
- Pro credit: $0.40/guest × 130 = $52/event.
- **$1,560/year in credits** for the celebrant. Enough to cover ~13 of their own events for free (at $1.20/guest × 100 guests = $120/event).

#### Comparison

| Factor | Wholesale (Path 1) | Referral Credits (Path 2) |
|--------|-----------|-----------|
| Who handles billing? | Pro bills their client (or bundles into package) | We bill the couple directly |
| Pro's reward | Margin on markup (potentially very high) | 20% credit ($0.40/guest) toward future events |
| Cash payout? | No — Pro pays wholesale, keeps markup | Optional — cash out at $100+ balance via Stripe Connect |
| Effort for Pro | Medium — they manage the event setup | Low — just share a link |
| Best for | Photographers, planners who want full control | Celebrants, DJs, florists who just recommend |
| White-label available? | Yes (premium add-on) | No (our brand shows) |
| Client relationship | Pro owns it | We own it |
| Guest email data | Pro gets it (their client's event) | We get it |

### Pro Account Features (Both Models)

| Feature | Included |
|---------|----------|
| Multi-client event dashboard | Yes |
| Create events on behalf of clients | Yes |
| Client handoff (transfer ownership to couple) | Yes |
| Event templates (clone your standard setup) | Yes |
| Credit balance & referral tracker | Referral model (Path 2) |
| Marketing materials (badges, graphics, email templates) | Yes |
| Priority support | Yes |
| White-label upload page | Wholesale only, +$49/mo |
| Pro Directory listing (couples find you on our site) | Yes (opt-in) |

### Pro Account Cost

| Component | Price |
|-----------|-------|
| Pro account itself | **Free** — no monthly fee to be a Pro |
| Events | Wholesale rate (per-guest) with recruitment discount; referral credits on Path 2 |
| White-label add-on | $49/month (optional, wholesale Pros only) |

The Pro account should be free to join. The barrier to entry needs to be zero. You want every photographer, planner, and celebrant signed up. Revenue comes from the events they create or refer. **Rewards are wholesale discounts and credits. Credits can be cashed out at $100+ via Stripe Connect — this serves connector Pros (bands, dress shops, florists) who refer but never create events.**

---

## 7. Free Tier

The free tier is critical for all models. It lets people experience the full product, including AI watermarks and filters, before spending anything. The product sells itself — you just need to get it in their hands.

### Free Tier by Account Type

| Account Type | Free Tier | Limitation | Conversion Trigger |
|-------------|-----------|------------|-------------------|
| **Guest list event** | 1 event, up to 10 guests | Only 10 QR codes generated | "Add more guests" → payment |
| **Open event** | 1 event, up to 15 uploaders | 16th scanner sees "upgrade to unlock" | "Upgrade this event" → picks a tier |
| **Multi-day / festival** | Not applicable | These are business buyers; offer a demo instead | Sales call / demo request |
| **Venue** | 14-day trial, 2 events, 50 uploaders each | Trial expires after 14 days | "Subscribe to keep your events live" |
| **Pro** | Account is free; first client event is free (up to 10 guests) | Same as guest list free tier | First real client event → wholesale or affiliate |

### Free Tier Strategy

- **No credit card required** to start. Reduce signup friction to zero.
- **Full features** — watermarks, filters, moderation, albums, sharing. No feature gating. The free tier is the real product, just smaller.
- **The watermark is the conversion hook** — When someone sees a beautiful AI watermark on 10 photos, they immediately want it on 150.
- **Engagement party / bridal shower funnel** — Couples try Event Cam free at a small pre-wedding event. They love it. They pay for the wedding. This is the highest-conversion free-to-paid path.

---

## 8. Add-Ons (Universal)

Add-ons work across all account types. They're extras, not gates — the core product is complete without them.

| Add-On | Price | Available To | Description |
|--------|-------|-------------|-------------|
| **Extended hosting** | $2/month per event | All | Keep albums live beyond the included period (12mo for standard, 6mo for venue) |
| **Photobook order** | $40–$80 | All | One-click print-on-demand from the album. Partner with Shutterfly/Artifact Uprising. |
| **AI slideshow / highlight reel** | $19 | All | Auto-generated video montage from the best uploads. Set to music. Shareable. |
| **Custom filter creation** | $9 | All | Design your own filter — adjust warmth, contrast, grain, color grading. Saved for the event. |
| **Premium watermark pack** | $5 | All | AI generates 10+ watermark options in premium styles (foil, embossed, hand-lettered, etc.) |
| **Full-resolution export** | $9 | All | Download all original files in a ZIP. (Standard includes web-optimized versions.) |
| **Extra storage** | $5 per 5GB | All | For video-heavy events that exceed the base allocation. |
| **White-label** | $49/month | Pro (wholesale) | Remove product branding; Pro's logo on upload page and albums. |
| **Custom domain** | Included at Venue Growth+ | Venue | photos.yourvenue.com instead of product-branded URL. |
| **Analytics** | Included at Venue Growth+ | Venue / Festival | Upload volume, participation rates, peak times, popular uploads. |
| **API access** | Included at Venue Unlimited+ / Festival Enterprise | Venue / Festival | Pull approved media into your own app or website. |

### Add-On Revenue Expectations

Conservative assumption: 10–15% of events purchase at least one add-on.

| Phase | Events/Month | Add-On Rate | Avg Add-On Value | Add-On Revenue/Month |
|-------|-------------|-------------|------------------|---------------------|
| Phase 1 | 50 | 10% | $15 | $75 |
| Phase 2 | 200 | 12% | $18 | $432 |
| Phase 3 | 500 | 15% | $22 | $1,650 |

The photobook and AI slideshow are the highest-value add-ons. As these features mature, add-on attach rates should climb to 20–25%.

---

## 9. Pricing Page Layout

How to present all of this without overwhelming people. The pricing page needs to serve five very different buyers.

### Approach: Tabbed Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│           How many people are celebrating?              │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Weddings │ │ Parties  │ │Festivals │ │  Venues  │   │
│  │& Events  │ │& Open    │ │& Multi-  │ │& Spaces  │   │
│  │          │ │ Events   │ │  Day     │ │          │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                         │
│        ┌─────────────────────────────┐                  │
│        │  Are you a wedding pro?     │                  │
│        │  Photographers, planners,   │                  │
│        │  DJs → Pro Account          │                  │
│        └─────────────────────────────┘                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Tab 1: Weddings & Events (Guest List)**
- Big "$2 per guest" headline
- Slider: "How many guests?" → shows price in real-time
- "Includes everything" feature list
- CTA: "Start free with 10 guests"

**Tab 2: Parties & Open Events**
- 4 tier cards: Small ($49), Medium ($99), Large ($199), Massive ($399)
- "Don't know how many people? No problem."
- CTA: "Start free with 15 uploaders"

**Tab 3: Festivals & Multi-Day**
- Grid: capacity × duration
- "Built for scale" messaging
- CTA: "Get a custom quote" (for 10k+) or "Start setup" (for smaller)

**Tab 4: Venues & Spaces (Future)**
- 3 plan cards: Starter ($99/mo), Growth ($199/mo), Unlimited ($399/mo)
- "For businesses that host events regularly"
- CTA: "Start 14-day free trial"

**Below tabs: Pro Account banner**
- "Wedding pro? Earn money recommending us — or bundle us into your packages at a discount."
- CTA: "Learn about Pro accounts"

### Key Design Principles for the Pricing Page

- **Lead with the wedding tab** — it's the primary market. Default selected.
- **No jargon** — "uploaders" not "seats." "Events" not "instances."
- **Show the math** — "150 guests = $300. That's less than your cake."
- **Social proof under each tab** — "Trusted by 500+ couples" / "Used at 50+ venues" / "200+ wedding pros."
- **FAQ at the bottom** covering: "Can I add guests later?", "What happens if I go over?", "Can I upgrade mid-event?", "What's included free?"

---

## 10. Comparison: What $2/Guest Actually Buys

This section is for the pricing page or a blog post. Anchor the price against what couples already spend.

### $2/Guest vs. Other Wedding Costs

| Item | Cost | What You Get |
|------|------|-------------|
| **Event Cam (150 guests)** | **$300** | **2,000+ photos from every guest, AI watermarked, filtered, moderated, in a private album** |
| Photographer | $3,000–$6,000 | 500 professional shots |
| Photo booth rental | $500–$2,000 | 50–100 posed photos with props |
| 15 disposable cameras | $225–$450 | ~400 low-res photos, 2-week development wait |
| Videographer | $2,000–$5,000 | 1 highlight reel |
| Cake | $500–$1,500 | Gone in 20 minutes |
| Flowers | $1,500–$4,000 | Dead in 3 days |
| DJ | $1,000–$2,500 | Music for the night |
| **Event Cam** | **$300** | **Every memory, forever** |

### $2/Guest vs. Other Photo Solutions

| Solution | Cost for 150 Guests | Photos Collected | Watermarks | Filters | Moderation | Private Sharing |
|----------|--------------------|--------------------|------------|---------|------------|----------------|
| **Event Cam** | **$300** | **2,000+** | **AI custom** | **Yes** | **Yes** | **Yes** |
| The Guest (app) | $100–$200 | 500–800 (requires app download) | No | Limited | Yes | Yes |
| Disposable cameras (15) | $225–$450 | ~400 (low quality) | No | No | No | No |
| Photo booth | $500–$2,000 | 50–100 (posed only) | No | Preset only | No | No |
| Google Photos shared album | $0 | Varies (low participation, need Google account) | No | No | No | No |
| Instagram hashtag | $0 | Varies (public, buried in feed) | No | Yes (public) | No | No |

Even at $2/guest, Event Cam is cheaper than disposable cameras and massively cheaper than a photo booth — while delivering 10–20x more photos with AI watermarks, filters, and moderation.

---

## 11. Open Questions

### Guest List Events
- [ ] Should $2/guest be the forever price, or is it an intro/launch price? Could raise to $2.50 once brand is established.
- [ ] Do couples get a partial refund if they over-estimate? (e.g., paid for 150 but only 120 guests showed up) — Probably not. The value is in the QR generation, not the actual uploads.
- [ ] Should there be a "late add" penalty? (Adding guests within 24 hours of the event?) — Probably not. Keep it frictionless.

### Open Events
- [ ] How do you prevent one person from scanning multiple times and using up uploader slots? Track by email or device fingerprint?
- [ ] Should open events get AI watermarks? (The "couple's names" watermark doesn't apply to a pub trivia night.) — Yes, but the watermark should be event name / date / custom text instead.
- [ ] Is $49 too high for a casual house party? Test $29 as a lower "Tiny" tier if needed.

### Multi-Day / Festivals
- [ ] Should festival pricing include a per-uploader component, or is flat-fee-by-capacity simpler?
- [ ] Do festivals need real-time moderation tools (auto-flag NSFW, queue priority, team assignments)?
- [ ] Is API access a standard need or only for the biggest festivals?
- [ ] Should there be a "festival season pass" for promoters who run multiple festivals/year?

### Venue Accounts
- [ ] Subscription pricing requires handling failed payments, downgrades, and cancellations. Is the billing infrastructure ready?
- [ ] Do venues want to charge their clients for Event Cam, or absorb it as an amenity? This affects whether we need a venue-to-client billing layer.
- [x] ~~Should venue tier limits be based on events/month, uploaders/month, or total uploads/month?~~ Decision (P2-13, 2026-02-15): Events/month. Starter: 4, Growth: 12, Unlimited: unlimited.
- [ ] What happens to past event data if a venue downgrades or cancels? Grace period? Export option?

### Pro Accounts
- [ ] Do we need a vetting/approval process for Pro accounts, or let anyone sign up?
- [x] ~~Should wholesale volume tiers reset annually or be lifetime cumulative?~~ Replaced with 3-tier Pro-to-Pro recruitment discount. See `PRO-ACCOUNT-DEEP-DIVE.md`.
- [ ] How do we handle the case where a Pro creates an event on behalf of a couple, but the couple also wants their own login to moderate/manage albums?
- [x] ~~Is the Pro commission sustainable long-term?~~ No cash payouts. Path 2 earns 20% credit ($0.40/guest). We keep $1.60/guest. Sustainable.
- [ ] Should Pros get early access to new features (beta watermark styles, filters) to keep them engaged?

### General
- [ ] Annual pricing for guest list events? E.g., "Unlimited events for 1 year — $499." Could work for planners who don't want a Pro account.
- [ ] Currency localization — should pricing adjust for international markets? ($2/guest in USD is steep in India, cheap in Norway.)
- [ ] Should we offer "event insurance" — pay $5 extra and if something goes wrong (event date changes, QR codes lost), we regenerate everything for free?

---

## 12. How the Account Types Fit Together

```
                    ┌──────────────┐
                    │   Standard   │  Engaged couples
                    │  $2 / guest  │  One-time purchase
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │                         │
              ▼                         ▼
     ┌────────────────┐       ┌────────────────┐
     │  Venue Account │       │  Pro Account   │
     │  (Subscription)│       │ (Wholesale +   │
     │                │       │  Credits)      │
     └────────┬───────┘       └────────┬───────┘
              │                         │
              │  Hosts events           │  Creates events
              │  with permanent QR      │  for clients
              │                         │
              ▼                         ▼
     ┌────────────────┐       ┌────────────────┐
     │  Guest Email   │       │  Guest Email   │
     │  Flywheel      │◄──────│  Flywheel      │
     │  (venue guests │       │  (wedding      │
     │   → future     │       │   guests →     │
     │   customers)   │       │   future       │
     └────────────────┘       │   couples)     │
                              └────────────────┘
```

All three account types feed the guest email flywheel. Every event, regardless of account type, captures guest emails that become future customers.

### Revenue Mix Target (12-Month View)

| Account Type | % of Revenue | Characteristics |
|-------------|-------------|-----------------|
| Standard (couples) | 60% | High volume, one-time, seasonal |
| Pro (photographers, planners) | 25% | Recurring via client events, steady year-round |
| Venue (pubs, clubs, hotels) | 15% | Recurring subscription, year-round, grows over time |

Over 24 months, the mix should shift toward Pro and Venue as those channels compound:

| Account Type | 12-Month | 24-Month |
|-------------|----------|----------|
| Standard | 60% | 40% |
| Pro | 25% | 35% |
| Venue | 15% | 25% |

---

*Validate all pricing with real users before committing. Run A/B tests on the pricing page once there's traffic. The numbers here are starting points, not gospel.*
