# Pro Account — Deep Dive

> Goal: One model. Simple enough to explain in a sentence. Works for a photographer who bundles it into a $4,000 package AND a celebrant who just mentions it in passing.

---

## The Core Tension

Two very different Pro behaviors need one system:

| Behavior | Example Pro | What They Do | What They Want |
|----------|------------|-------------|----------------|
| **"I run it for my clients"** | Photographer, planner | Creates the event, adds guests, configures watermark, may handle moderation | Control, margin, white-label |
| **"I tell my clients about it"** | Celebrant, DJ, florist | Mentions it in a consultation, maybe shares a link | Passive income, zero effort |

Two separate models (wholesale vs affiliate) solve this cleanly but create confusion: "Which one am I? Can I switch? What if I do both?" One model needs to flex across both behaviors without being complicated.

---

## The Unified Model: Pro Rate

**One concept: Pros get a better rate. How they use it is up to them.**

### The Rate

Every Pro pays **$1.20/guest** instead of $2.

That's it. One number. 40% off retail.

### Two Ways to Use It (Same Account, Same Rate)

#### Path 1: "I'll set it up" — Pro Creates the Event

```
Pro creates event → adds guest list → pays $1.20/guest → 
bills client however they want → keeps the margin
```

- Pro pays $1.20/guest on their card.
- Pro charges the client whatever they want — $2/guest, $2.50/guest, flat $350, bundled invisibly into their photography package, or nothing at all (eats the $1.20 as a cost of doing business).
- The margin is theirs. We don't see or control their client pricing.
- Pro handles event setup, watermark config, and optionally moderation. Can hand off moderation to the couple.

**Economics for the Pro:**
- 150-guest wedding at $1.20/guest = $180 cost to the Pro.
- If they charge client $2/guest = $300 revenue → **$120 margin**.
- If they bundle it into a $4,000 photography package = $180 cost, absorbed. It's 4.5% of their package price for a major value-add feature.
- If they charge $2.50/guest = $375 revenue → **$195 margin**. The client still pays less than a photo booth.

#### Path 2: "I'll send them your way" — Pro Refers, Client Creates

```
Pro shares their unique link → couple clicks and signs up →
couple creates event and pays $2/guest (standard price) → Pro earns 20% as credit
```

- The couple does everything: creates the event, adds guests, pays $2/guest (standard price).
- Pro doesn't touch anything. They just shared a link (or gave the couple a promo code).
- Pro earns **$0.40/guest (20%) as credit** — added to their credit balance.
- Credits are applied to future Path 1 events, reducing the Pro's wholesale cost.
- Credits never expire.
- **Payout option:** Pros with a credit balance of **$100+** can request a cash payout via Stripe Connect Express (monthly). This serves connector Pros (bands, dress shops, florists) who refer couples but never create their own events.
- We keep **$1.60/guest** on referred events.
- Attribution: referral link or promo code with a 90-day cookie.

**Economics for the Pro:**
- 150-guest wedding = $300 paid by the couple (at $2/guest) → **$60 credit earned**.
- Zero effort required. Just share a link.
- That $60 credit covers half the cost of a future 100-guest Pro-created event at $1.20/guest.

### Why This Works

| Property | How It's Achieved |
|----------|------------------|
| **One model** | Every Pro has the same account, same rate, same dashboard. |
| **Flexible** | Pro chooses Path 1 or Path 2 per client. Not locked in. Can do Path 1 for their premium clients and Path 2 for casual referrals. |
| **Credits-first, payout optional** | Path 2 rewards are credits toward future events by default. Pros with $100+ balance can cash out via Stripe Connect — serves connector Pros (bands, dress shops) who never create their own events. |
| **Simple to explain** | "Buy wholesale and resell, or refer clients and earn credit toward your own events." |
| **One thing to build** | One account type, one dashboard, one billing system. Path 1 = Pro pays at checkout. Path 2 = credit tracker. |

---

## Pro-to-Pro Recruitment Discount (3-Tier System)

Instead of volume-based tiers, Pros earn deeper wholesale discounts by recruiting other Pros into the network. This creates a self-reinforcing growth loop: Pros recruit Pros, each recruiting Pro's costs drop, and the network expands without founder-driven outreach.

### How It Works

Every Pro starts at the base rate: **$1.20/guest (40% off retail)**. When a Pro recruits other Pros who become active on the platform, the recruiting Pro's wholesale rate drops — up to 3 tiers deep.

| Tier | Relationship | Bonus Discount Per Active Pro |
|------|-------------|-------------------------------|
| **Tier 1** | You recruited them directly | +2% per active Pro |
| **Tier 2** | Your recruit's recruit | +1% per active Pro |
| **Tier 3** | 3rd degree (deepest) | +0.5% per active Pro |

**Cap:** Maximum total discount is **55% ($0.90/guest floor)**. Nobody goes lower.

**"Active" definition:** Completed at least 1 paid event in the trailing 90 days.

**Recalculation:** Monthly, based on trailing 90-day activity.

**Applies to:** Path 1 only (Pro-created events). Path 2 referral credits are fixed at 20%.

**Each Pro has one upline only.** First recruiter wins. No circular chains.

### Scenarios

**Small-time Pro** — recruited 2 photographers, both active.
- Bonus: 2 × 2% = +4%
- Total discount: 44% → **$1.12/guest**
- Saves $0.08/guest vs. base

**Solid networker** — recruited 4 Pros (Tier 1). Two of them each recruited 1 more (Tier 2).
- Bonus: (4×2%) + (2×1%) = +10%
- Total discount: 50% → **$1.00/guest**
- Saves $0.20/guest vs. base

**Power recruiter** — 5 direct (Tier 1), those 5 recruited 4 total (Tier 2), those 4 recruited 3 (Tier 3).
- Bonus: (5×2%) + (4×1%) + (3×0.5%) = +15.5% → capped at +15%
- Total discount: 55% → **$0.90/guest** (floor)
- Saves $0.30/guest vs. base

### Why This Works for Event-Cam

Worst case: power recruiter at the $0.90/guest floor.
- Event-Cam still keeps $0.90/guest on their events (healthy margin).
- That recruiter brought 5+ active Pros, each paying $1.20/guest on their own events.
- One recruited Pro doing 3 events/month × 120 guests = $432/month revenue for Event-Cam.
- Cost of giving the recruiter their $0.30 discount on their own events: ~$108/month (3 events × 120 guests × $0.30).
- **Net gain from just one active recruit: +$324/month.**

### How Credits and Recruitment Discount Stack

A Pro can benefit from both the recruitment discount AND Path 2 referral credits:

1. Calculate recruitment discount (base 40% + network bonuses, max 55%)
2. Calculate event cost at that rate
3. Apply any available credits to reduce the cost further (can go to $0)

**Example:** Pro A has 3 active Tier 1 Pros (46% discount → $1.08/guest) and $150 in credits from referrals. Creates a 120-guest wedding:
- Cost at recruitment rate: 120 × $1.08 = $129.60
- Apply credits: $129.60 − $129.60 = **$0.00** (uses $129.60 of credits, $20.40 remaining)
- Pro charges couple whatever they want — keeps 100% on this event.

---

## The Pro Dashboard

What the Pro sees when they log in.

### Overview Screen

```
┌─────────────────────────────────────────────────────┐
│  Welcome back, Sarah                                │
│  Thompson Photography — Pro Account                 │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │  12         │  │  $184.00    │  │  1,680     │  │
│  │  Events     │  │  Credit     │  │  Guests    │  │
│  │  this year  │  │  balance    │  │  this year │  │
│  └─────────────┘  └─────────────┘  └────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Your rate: $1.08/guest (46% off)              │ │
│  │  3 active Pros in your network                  │ │
│  └─────────────────────────────────────────────────┘ │
│                                                     │
│  Quick Actions:                                     │
│  [ + Create Event for Client ]  [ Share My Link ]   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Client Events Tab

```
┌──────────────────────────────────────────────────────────────┐
│  Client Events                                [ + New Event ] │
│                                                              │
│  ┌─ Active ─────────────────────────────────────────────────┐ │
│  │ Emma & Liam — June 14        140 guests    Pro-created  │ │
│  │ Priya & Raj — June 21        280 guests    Pro-created  │ │
│  │ Maria & David — July 5       100 guests    Referred     │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ Completed ──────────────────────────────────────────────┐ │
│  │ Sarah & James — May 30       160 guests    1,247 uploads│ │
│  │ Anika & Tom — May 17         90 guests      634 uploads │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ Templates ──────────────────────────────────────────────┐ │
│  │ "Standard Wedding" — 150 guests, warm filter, script WM │ │
│  │ [ Clone to New Event ]                                   │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Credits & Savings Tab

```
┌──────────────────────────────────────────────────────────────┐
│  Credits & Savings                                           │
│                                                              │
│  ┌─ Credit Balance ─────────────────────────────────────────┐ │
│  │  Available credit: $184.00                               │ │
│  │  Credits earned this month: $52.00 (from 1 referral)     │ │
│  │  Credits used this month: $0.00                          │ │
│  │  Credits never expire.                                   │ │
│  │  [ Request Payout — $184.00 available ]                  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ Your Rate ──────────────────────────────────────────────┐ │
│  │  Base rate: $1.20/guest (40% off)                        │ │
│  │  Network bonus: +6% (3 active Tier 1 Pros)              │ │
│  │  Your rate: $1.08/guest (46% off)                        │ │
│  │  Next recalculation: Mar 1                               │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ Wholesale Savings (Lifetime) ───────────────────────────┐ │
│  │  12 events  |  1,680 guests  |  $1,344 saved vs retail   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ Credit History ─────────────────────────────────────────┐ │
│  │  Jan 2026   Referral: Kim & Dan (130 guests)   +$52.00  │ │
│  │  Jan 2026   Used on: Priya & Raj event         −$129.60 │ │
│  │  Dec 2025   Referral: Alex & Jordan (110 guests) +$44.00│ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Referral / Link Tab

```
┌──────────────────────────────────────────────────────────────┐
│  Your Referral Tools                                         │
│                                                              │
│  Client referral link (earns 20% credit):                    │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  https://[product].com/r/thompson-photo    [ Copy ]      │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  Pro recruitment link (grows your network):                   │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  https://[product].com/pro/thompson-photo  [ Copy ]      │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  Client referral stats:                                      │
│  │  Link clicks: 47  |  Signups: 12  |  Paid events: 8     │ │
│  │  Conversion rate: 17%                                     │ │
│  │  Credits earned from referrals: $184.00                   │ │
│                                                              │
│  Pro network stats:                                          │
│  │  Tier 1: 3 active  |  Tier 2: 0  |  Tier 3: 0           │ │
│  │  Network bonus: +6% discount                              │ │
│                                                              │
│  Marketing kit:                                              │
│  [ Download "I use [product]" badge ]                        │
│  [ Download social media graphics ]                          │
│  [ Copy client pitch email template ]                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Earnings Mechanics

**Core principle: Credits-first.** All Pro rewards are wholesale discounts or credits. Pros who run their own events spend credits on cheaper wholesale rates. Pros who only refer (connector Pros — bands, dress shops, florists) can cash out credits above $100 via Stripe Connect Express.

### How the Pro Earns on Path 1 (Pro-Created Events)

The "earnings" on Pro-created events are implicit — it's the margin between what the Pro pays and what they charge the client. The Pro's wholesale rate depends on their recruitment network:

> **Retail value:** $300 (150 guests × $2)
> **You paid:** $162 (150 guests × $1.08 — with 46% discount from 3 active recruits)
> **Your savings:** $138

This makes the Pro feel good even if they're absorbing the cost rather than marking it up. They "saved" $138 vs. retail.

### How the Pro Earns on Path 2 (Referred Events)

Referral credits (not cash):

- Client pays $2/guest → $300 for a 150-guest wedding.
- Pro earns $0.40/guest (20%) → **$60 credit** added to their balance.
- Credits appear in real-time on the credits dashboard.
- Credits are applied to future Path 1 events, reducing wholesale cost.
- Credits never expire.
- **Payout option:** balance of $100+ can be cashed out via Stripe Connect Express (monthly).

### What About the Promo Code?

The Pro's promo code (e.g., THOMPSON) is a referral attribution tool. No couple discount — the couple pays standard $2/guest. The Pro earns credit.

| Path | Couple Pays | Pro Gets | We Keep |
|------|------------|---------|--------|
| **Pro creates event (Path 1)** | Whatever the Pro charges | Margin on markup | $0.90–$1.20/guest (depending on recruitment discount) |
| **Pro refers via code (Path 2)** | $2.00/guest | $0.40/guest credit (20%) | $1.60/guest |
| **Pro recruits a Pro** | N/A | Deeper wholesale discount (+2%/+1%/+0.5% per tier) | Unchanged — discount comes from our margin |

```
Standard price:        $2.00/guest  → we keep $2.00
Pro code applied:      $2.00/guest  → Pro earns $0.40 credit, we keep $1.60
Pro creates directly:  $0.90–$1.20/guest  → Pro pays wholesale, charges client whatever
```

---

## Client Handoff

A key workflow: the Pro sets up the event, but the couple takes over for moderation and album creation.

### How It Works

1. Pro creates the event and configures everything (guest list, watermark, filters).
2. Pro clicks "Invite Client" → enters the couple's email.
3. Couple receives an email: "Sarah Thompson Photography set up your wedding album! Click here to take ownership."
4. Couple creates a (free) account and gets access to the event.
5. Both the Pro and the couple can now access the event. Permissions:

| Action | Pro | Couple |
|--------|-----|--------|
| View uploads | Yes | Yes |
| Moderate (approve/reject) | Yes | Yes |
| Create albums | Yes | Yes |
| Share album links | Yes | Yes |
| Edit event settings | Yes | Yes |
| Add/remove guests | Yes | Yes |
| Delete event | No | Yes (owner) |
| Access billing | Yes (they paid) | No |

The Pro retains access so they can help if needed, pull content for their portfolio (with permission), or manage things if the couple is on their honeymoon.

### Optional: Full Transfer

If the Pro wants to fully hand off and remove themselves:
- "Transfer & Remove My Access" → Pro loses access, couple becomes sole owner.
- Useful for Pros who don't want to maintain a relationship post-wedding.

---

## White-Label

White-label is the premium feature for Pros who want full brand control. It removes all product branding and replaces it with the Pro's brand.

### What Changes With White-Label

| Element | Standard Pro | White-Label Pro |
|---------|-------------|----------------|
| Upload page header | Product logo + Pro attribution | Pro's logo only |
| Upload page URL | [product].com/scan/[token] | Custom subdomain possible (photos.sarahthompson.com) |
| Album page | Product branding | Pro's branding |
| Watermark credit | "Collected with [Product]" small text | No product mention |
| Guest emails (album delivery) | From: Product | From: Pro's business name |
| Marketing link to product | Small "Powered by" footer | None |

### White-Label Pricing

- **$49/month** as an add-on to the Pro account.
- Or **$399/year** (32% savings).
- Only available to Pros on Path 1 (Pro-created events). Doesn't make sense for Path 2 referrals — if the couple creates the event, the Pro doesn't control the branding.

### White-Label Trade-Offs

| We Gain | We Lose |
|---------|---------|
| $49/mo recurring revenue per white-label Pro | Brand visibility on the upload page (guests don't see our name) |
| Stickier Pro relationship (invested in the integration) | Guest email flywheel attribution (guests don't know about us) |
| Premium positioning | Organic word-of-mouth from guests |

**Is it worth it?** Yes, but only for Pros who are creating 5+ events/month. At $49/mo, a Pro needs to be doing enough volume for it to make sense. Don't push white-label on small Pros — the lost brand exposure isn't worth $49/mo.

**Compromise:** Even on white-label, capture guest emails (they're entering their email to get the album). The album delivery email comes from the Pro's name, but we still have the email in our database. We just don't send marketing emails to guests from white-label events — that's the Pro's relationship. Fair trade.

---

## Pro Directory

A page on the website where couples can find local Pros who use the product.

### Why It Matters

- **For Pros:** Free lead generation. "Sign up as a Pro and get listed in our directory. Couples looking for photographers in your area will find you." This alone justifies signing up.
- **For couples:** Social proof. "These professionals use and trust Event Cam."
- **For us:** Keeps Pros engaged, drives event volume, and creates a network effect (more Pros listed → more couples find them → more events).

### Directory Listing Includes

- Business name and photo/logo
- Location (city/region)
- Category (Photographer, Planner, DJ, Celebrant, etc.)
- Short bio (50–100 words)
- Link to their website/Instagram
- Number of events run with the product (social proof)
- "Contact" or "Visit Website" CTA

### Directory is Opt-In

- Pros choose whether to be listed. Some may not want to (if they're white-label, they might prefer to keep the relationship invisible).
- Listed Pros get a "Featured Pro" badge they can display on their own website.

---

## Onboarding Flow

How a Pro goes from "I've heard of this" to "I'm creating events for clients."

### Step 1: Landing Page

"For Wedding Professionals" page with:
- "Set it up for your clients, or just share a link. Either way, you earn."
- Calculator: "If you do 30 weddings/year at 140 guests, you'll earn $3,360/year."
- Testimonials from other Pros (once available).
- CTA: "Create Your Pro Account — Free"

### Step 2: Signup

- Name, email, password (standard)
- Business name
- Category (Photographer / Planner / DJ / Celebrant / Other)
- Website (optional)
- "How many weddings do you do per year?" (helps us segment, not a commitment)
- No credit card required.

### Step 3: First Event

- Immediately prompted: "Create your first client event — it's free for up to 10 guests."
- Guided setup: event name → guest list → watermark → filters → done.
- Or: "Not ready to create an event? Share your link instead." → shows referral link + promo code.

### Step 4: Activation

The Pro is "activated" when they complete their first paid event (Path 1) or their first referred event converts (Path 2).

Target: 50% of Pro signups should activate within 60 days.

---

## Revenue Projections

### Assumptions

- Phase 1 (months 1–3): 30 active Pros, avg 3 events/month each
- Phase 2 (months 3–8): 100 active Pros, avg 4 events/month each
- Phase 3 (months 8–14): 300 active Pros, avg 5 events/month each
- Average 130 guests per event
- Split: 60% Path 1 (Pro-created), 40% Path 2 (referred)
- White-label adoption: 10% of Pros
- Average recruitment discount: ~44% in Phase 1, ~47% in Phase 2, ~50% in Phase 3 (as networks deepen)

### Revenue to Us (What We Keep)

| Phase | Path 1 Events/Mo | Path 1 Rev (avg rate) | Path 2 Events/Mo | Path 2 Rev @ $1.60/guest | White-Label | Total |
|-------|-----------------|----------------------|-----------------|-------------------------|-------------|-------|
| Phase 1 | 54 | $7,581 (@ ~$1.08 avg) | 36 | $7,488 | $147 | $15,216 |
| Phase 2 | 240 | $30,264 (@ ~$0.97 avg) | 160 | $33,280 | $490 | $64,034 |
| Phase 3 | 900 | $95,940 (@ ~$0.82 avg) | 600 | $124,800 | $1,470 | $222,210 |

**Note:** Path 2 revenue is higher per guest ($1.60 vs. variable Path 1) because we keep more on referred events. The credit cost ($0.40/guest) is deferred and some credits are never redeemed.

### Value to Pros (Savings + Credits)

| Phase | Path 1 Wholesale Savings | Path 2 Credits Issued | Total Pro Value |
|-------|------------------------|-----------------------|----------------|
| Phase 1 | $6,459 | $1,872 | $8,331/mo across all Pros |
| Phase 2 | $31,736 | $8,320 | $40,056/mo |
| Phase 3 | $141,960 | $31,200 | $173,160/mo |

A photographer doing 40 weddings/year at a 46% network discount saves ~$5,600/year on wholesale costs. Add referral credits from casual recommendations and they're running some events nearly free. That's real, tangible value — without Event-Cam ever writing a check.

---

## Guest Email Flywheel Impact

Pro-created events generate guest emails just like standard events. But there's a nuance:

| Event Type | Who owns the guest relationship? | Do we market to guests? |
|-----------|--------------------------------|------------------------|
| Standard (couple-created) | Us | Yes (with opt-in) |
| Pro-created (non-white-label) | Shared — we capture, Pro has access | Yes (with opt-in) |
| Pro-created (white-label) | Pro owns it | No — Pro's relationship. We store the email but don't market to it. |
| Pro-referred (couple-created via link) | Us | Yes (with opt-in) |

**Key rule:** White-label = Pro owns the guest relationship. We respect that. Everything else = shared, and we can market (with consent).

At Phase 3, Pro events generate ~195,000 guest emails/month. Even excluding white-label events (~10%), that's 175,000 marketable emails/month from the Pro channel alone.

---

## Open Questions

- [x] **$1.20 or $1.40?** Decision: $1.20/guest (40% off). This is the canonical base Pro rate.
- [x] **Promo code discount for couples — 10% or 0%?** Decision: No couple discount. Pro earns 20% credit ($0.40/guest). Couple pays standard $2/guest.
- [x] **Payout model?** Decision: **Credits-first.** All Pro rewards are wholesale discounts (via recruitment) or credits (via referrals). Credits can be cashed out via Stripe Connect Express at $100+ minimum balance (monthly). Serves connector Pros who never create their own events.
- [x] **Pro-to-Pro referrals?** Decision: **Yes — 3-tier recruitment discount system.** Tier 1: +2%, Tier 2: +1%, Tier 3: +0.5% per active downstream Pro. Cap: 55% ($0.90/guest floor). Active = 1 paid event in 90 days.
- [x] **Referral credit rate?** Decision: **20% ($0.40/guest)**. Conservative — can increase later. Credits never expire, not cashable.
- [ ] **Pro vetting:** Should anyone be able to create a Pro account, or require approval? Open signup is better for growth. Maybe add verification later (proof of business, portfolio link) for the directory listing only.
- [ ] **Can a couple become a Pro?** If someone uses the product for their own wedding and loves it, they might want to start referring friends. Allow upgrade from Standard to Pro with one click.

---

*Ship the simplest version first: Pro account (free), $1.20/guest wholesale, referral link with credit tracking, recruitment tracking, basic dashboard. Add white-label, Pro Directory, and marketing kit in v2.*
