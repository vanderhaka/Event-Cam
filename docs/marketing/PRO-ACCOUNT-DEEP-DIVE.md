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

Every Pro pays **$0.60/guest** instead of $1.

That's it. One number. 40% off retail.

### Two Ways to Use It (Same Account, Same Rate)

#### Path 1: "I'll set it up" — Pro Creates the Event

```
Pro creates event → adds guest list → pays $0.60/guest → 
bills client however they want → keeps the margin
```

- Pro pays $0.60/guest on their card.
- Pro charges the client whatever they want — $1/guest, $1.50/guest, flat $200, bundled invisibly into their photography package, or nothing at all (eats the $0.60 as a cost of doing business).
- The margin is theirs. We don't see or control their client pricing.
- Pro handles event setup, watermark config, and optionally moderation. Can hand off moderation to the couple.

**Economics for the Pro:**
- 150-guest wedding at $0.60/guest = $90 cost to the Pro.
- If they charge client $1/guest = $150 revenue → **$60 margin**.
- If they bundle it into a $4,000 photography package = $90 cost, absorbed. The feature makes their package more valuable and helps close the sale.
- If they charge $1.50/guest = $225 revenue → **$135 margin**. The client still pays less than a photo booth.

#### Path 2: "I'll send them your way" — Pro Refers, Client Creates

```
Pro shares their unique link → couple clicks and signs up → 
couple creates event and pays $1/guest → Pro earns $0.40/guest
```

- The couple does everything: creates the event, adds guests, pays $1/guest at standard retail.
- Pro doesn't touch anything. They just shared a link (or gave the couple a promo code).
- Pro earns **$0.40/guest** as commission — credited to their Pro account, paid out monthly.
- Attribution: referral link or promo code with a 90-day cookie.

**Economics for the Pro:**
- 150-guest wedding = $150 paid by the couple → **$60 commission to the Pro**.
- Same $60 whether the Pro creates the event (Path 1 margin) or refers it (Path 2 commission).
- Zero effort required. Just share a link.

### Why This Works

| Property | How It's Achieved |
|----------|------------------|
| **One model** | Every Pro has the same account, same rate, same dashboard. |
| **Flexible** | Pro chooses Path 1 or Path 2 per client. Not locked in. Can do Path 1 for their premium clients and Path 2 for casual referrals. |
| **Same economics both ways** | $0.40/guest margin (Path 1) ≈ $0.40/guest commission (Path 2). The Pro earns roughly the same regardless of which path they choose. The choice is about effort and control, not money. |
| **Simple to explain** | "You get 40% off. Set it up yourself and keep the margin, or refer clients and we'll pay you $0.40/guest." |
| **One thing to build** | One account type, one dashboard, one billing system. Path 1 = Pro pays at checkout. Path 2 = commission tracker + payout. |

---

## Should There Be Volume Tiers?

The question: does a photographer doing 50 weddings/year deserve a better rate than a celebrant doing 5?

### Argument For Tiers

- Rewards loyalty and volume — the biggest Pros feel valued.
- Incentivizes Pros to push more events through the platform.
- Standard SaaS practice.

### Argument Against Tiers

- Adds complexity. "What tier am I on? When do I level up?"
- The Pro rate ($0.60) is already generous. 40% off is a lot.
- Tiers create anxiety: a Pro at 990 guests/year might delay events or game the system to hit the 1,000 threshold.
- The simplicity of "one rate for everyone" is itself a selling point. "No tiers. No thresholds. Just 40% off, always."
- Most Pros won't do enough volume for tiers to matter. The median photographer does 25–40 weddings × 140 guests = 3,500–5,600 guests. The difference between $0.60 and $0.50/guest on 4,000 guests is $400/year. Nice, but not life-changing. Not worth the complexity.

### Recommendation: No Tiers (For Now)

Start with one flat rate: **$0.60/guest for everyone**. It's clean, easy to communicate, and removes a decision point.

If a Pro is doing 10,000+ guests/year and asks for a better rate, handle it manually with a custom agreement. You'll know who these people are — there won't be many in the first year. Don't build infrastructure for edge cases.

Revisit tiers once you have 100+ active Pros and can see the actual volume distribution.

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
│  │  12         │  │  $720       │  │  1,680     │  │
│  │  Events     │  │  Earned     │  │  Guests    │  │
│  │  this year  │  │  this year  │  │  this year │  │
│  └─────────────┘  └─────────────┘  └────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Next payout: $180.00 — Feb 28                 │ │
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

### Earnings Tab

```
┌──────────────────────────────────────────────────────────────┐
│  Earnings                                                    │
│                                                              │
│  ┌─ This Month ─────────────────────────────────────────────┐ │
│  │  3 events completed                                      │ │
│  │  Pro-created events: 2 × margin earned = $120            │ │
│  │  Referred events:    1 × commission     = $60            │ │
│  │  Total earned: $180                                      │ │
│  │  Payout: Feb 28 via Stripe → **** 4242                   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ Lifetime ───────────────────────────────────────────────┐ │
│  │  12 events  |  1,680 guests  |  $720 earned              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ History ────────────────────────────────────────────────┐ │
│  │  Jan 2026    4 events    560 guests    $240    Paid ✓    │ │
│  │  Dec 2025    3 events    420 guests    $180    Paid ✓    │ │
│  │  Nov 2025    2 events    280 guests    $120    Paid ✓    │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Referral / Link Tab

```
┌──────────────────────────────────────────────────────────────┐
│  Your Referral Tools                                         │
│                                                              │
│  Your link:                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  https://[product].com/r/thompson-photo    [ Copy ]      │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  Your promo code:                                            │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  THOMPSON40                                  [ Copy ]     │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  Referral stats:                                             │
│  │  Link clicks: 47  |  Signups: 12  |  Paid events: 8     │ │
│  │  Conversion rate: 17%                                     │ │
│  │  Commissions earned: $480                                 │ │
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

### How the Pro Earns on Path 1 (Pro-Created Events)

The "earnings" on Pro-created events are implicit — it's the margin between what the Pro pays ($0.60/guest) and what they charge the client. We don't track this directly because we don't know what the Pro charges.

But for the dashboard, we can show it as:

> **Retail value:** $150 (150 guests × $1)
> **You paid:** $90 (150 guests × $0.60)
> **Your savings:** $60

This makes the Pro feel good even if they're absorbing the cost rather than marking it up. They "saved" $60 vs. retail.

### How the Pro Earns on Path 2 (Referred Events)

Direct commission:

- Client pays $1/guest → $150 for a 150-guest wedding.
- Pro earns $0.40/guest → $60 commission.
- Commission is tracked in real-time and appears in the earnings dashboard.
- Payout: monthly, via Stripe Connect.
- Minimum payout threshold: $25 (rolls over if not met).

### What About the Promo Code?

The Pro's promo code (e.g., THOMPSON40) could give the couple a small discount too, making it a win-win:

| Option | Couple Gets | Pro Gets | We Get |
|--------|------------|---------|--------|
| **No couple discount** | Pays $1/guest | $0.40/guest commission | $0.60/guest |
| **Couple gets 10% off** | Pays $0.90/guest | $0.30/guest commission | $0.60/guest |
| **Couple gets 15% off** | Pays $0.85/guest | $0.25/guest commission | $0.60/guest |

Giving the couple a discount makes the promo code more shareable ("Use my code for 10% off!") but reduces the Pro's commission. The Pro is more likely to share a code that benefits their client — it makes them look good.

**Recommendation:** Give the couple 10% off when they use a Pro's code. The Pro earns $0.30/guest (still meaningful), the couple feels they're getting a deal, and the Pro looks generous. Our revenue stays at $0.60/guest — the same as Path 1 wholesale.

```
Standard price:        $1.00/guest  → we keep $1.00
Pro code applied:      $0.90/guest  → couple saves $0.10, Pro earns $0.30, we keep $0.60
Pro creates directly:  $0.60/guest  → Pro pays us $0.60, charges client whatever
```

We always keep $0.60/guest. Clean.

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
- Calculator: "If you do 30 weddings/year at 140 guests, you'll earn $1,680/year."
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

### Revenue to Us (What We Keep)

| Phase | Pro Events/Mo | Guests/Mo | Our Rev @ $0.60/guest | White-Label Rev | Total |
|-------|--------------|-----------|----------------------|-----------------|-------|
| Phase 1 | 90 | 11,700 | $7,020 | $147 | $7,167 |
| Phase 2 | 400 | 52,000 | $31,200 | $490 | $31,690 |
| Phase 3 | 1,500 | 195,000 | $117,000 | $1,470 | $118,470 |

### Revenue to Pros (What They Earn)

| Phase | Path 1 Savings | Path 2 Commissions | Total Pro Earnings |
|-------|---------------|-------------------|-------------------|
| Phase 1 | $2,808 | $1,872 | $4,680/mo across all Pros |
| Phase 2 | $12,480 | $8,320 | $20,800/mo |
| Phase 3 | $46,800 | $31,200 | $78,000/mo |

Pros collectively earning $78k/month by Phase 3 creates a very sticky, very motivated distribution network.

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

- [ ] **$0.60 or $0.70?** $0.60/guest (40% off) feels generous. $0.70 (30% off) is still attractive and gives us more margin. Test both and see what drives Pro adoption.
- [ ] **Promo code discount for couples — 10% or 0%?** Giving couples 10% off via the Pro's code makes the code more shareable but reduces Pro commission from $0.40 to $0.30. Test whether Pros prefer higher commission (no couple discount) or more conversions (couple gets a deal).
- [ ] **Minimum payout threshold:** $25 feels right. Low enough that small-volume Pros can cash out. High enough to avoid micro-transactions.
- [ ] **Payout frequency:** Monthly is standard. Weekly could be attractive for high-volume Pros but increases operational overhead.
- [ ] **Pro vetting:** Should anyone be able to create a Pro account, or require approval? Open signup is better for growth. Maybe add verification later (proof of business, portfolio link) for the directory listing only.
- [ ] **Can a couple become a Pro?** If someone uses the product for their own wedding and loves it, they might want to start referring friends. Allow upgrade from Standard to Pro with one click.
- [ ] **Pro-to-Pro referrals:** Should Pros earn a bonus for referring other Pros? E.g., "Refer a photographer, get $50 credit when they complete their first event." Creates a viral loop within the wedding vendor network.

---

*Ship the simplest version first: Pro account (free), $0.60/guest wholesale, referral link with commission, basic dashboard. Add white-label, Pro Directory, and marketing kit in v2.*
