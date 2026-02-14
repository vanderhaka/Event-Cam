# Event Cam — Account Types & Partner Models

> Account types for Event Cam. Standard accounts serve weddings and private celebrations (birthdays, engagements, etc.). Pro accounts are the primary growth channel. Venue accounts are a future feature.

---

## Table of Contents

1. [Overview](#overview)
2. [Venue Accounts](#venue-accounts)
3. [Pro Accounts (Photographers & Wedding Professionals)](#pro-accounts)
4. [How They Fit Together](#how-they-fit-together)
5. [Open Questions](#open-questions)

---

## Overview

The current model is simple: someone creates an event (wedding, birthday, engagement party, etc.), pays $2/guest ($49 minimum). That works for the primary use case. Two additional account types serve different audiences:

| Account Type | Who | Core Need | Revenue Model |
|-------------|-----|-----------|---------------|
| **Standard** (current) | Couples, party hosts | One event, one-time purchase | $2/guest ($49 min) |
| **Pro** | Photographers, planners, DJs, celebrants, coordinators | Resell or bundle Event Cam into their own packages; earn commission | 40% discount ($1.20/guest) or 40% referral commission ($0.80/guest) |
| **Venue** (future) | Pubs, clubs, hotels, banquet halls, event spaces, restaurants | Host many events across many clients; need multi-admin, recurring, always-on | Monthly subscription ($39/$89/$179/mo) |

---

## Venue Accounts (Future Feature)

> **Note:** Venue accounts are planned for a future release. The details below are directional, not live.

### Who This Is For

Any business that hosts events regularly and wants to offer Event Cam as a built-in amenity:

- **Pubs & bars** — Live music nights, trivia, private parties, tap takeovers
- **Clubs & nightlife** — Theme nights, NYE events, VIP events
- **Wedding venues** — Banquet halls, estates, barns, hotels, rooftops
- **Restaurants** — Private dining, birthday celebrations, corporate dinners
- **Event spaces** — Coworking event rooms, conference centers, community halls
- **Breweries & wineries** — Tastings, launch parties, private events
- **Hotels & resorts** — Weddings, conferences, retreats

### What They Need

| Feature | Why |
|---------|-----|
| **Multiple admins** | Owner, manager, event coordinator all need access. Staff turnover means you can't tie it to one person's email. |
| **Role-based permissions** | Owner (billing, settings, add/remove admins), Admin (create/manage events, moderation), Staff (view-only, or limited to specific events) |
| **Recurring events** | A pub running weekly trivia doesn't want to create a new event every time. Templates or recurring event support. |
| **Venue branding** | Logo, colors, custom upload page that matches the venue's brand. Guests see the venue's identity, not just Event Cam. |
| **Always-on QR codes** | Permanent QR codes on tables or walls that route to the current active event. No reprinting between events. |
| **Centralized billing** | One invoice, one payment method, one dashboard. Not 50 separate Stripe checkouts. |
| **Event archive** | Browse past events, pull up old albums, re-share links. Useful for marketing ("check out last week's event!"). |
| **Analytics** | Upload volume, participation rates, peak times, popular events. Venues love data for marketing. |
| **Guest email access** | Venues want the guest email list for their own marketing (with appropriate consent). |

### Pricing Ideas

**Option A: Monthly subscription**

| Tier | Events/Month | Price/Month | Notes |
|------|-------------|-------------|-------|
| **Starter** | Up to 4 | $39/mo | Small pub doing weekly events |
| **Growth** | Up to 15 | $89/mo | Active venue, multiple events/week |
| **Unlimited** | Unlimited | $179/mo | Large venue or hotel with daily events |

- All tiers include unlimited guests per event (no per-guest charge — the venue is paying for access, not per-head).
- Venue branding included at Growth+.
- Analytics included at all tiers.

**Option B: Hybrid — monthly base + per-event**

| Component | Price |
|-----------|-------|
| Base fee | $19/mo (platform access, multi-admin, branding) |
| Per event | $15/event |

- More aligned with usage for venues that host events irregularly.
- A venue doing 8 events/month pays $19 + $120 = $139/mo.

**Option C: Per-guest (same as couples, but discounted)**

| Volume | Per-Guest Rate |
|--------|---------------|
| 1–500 guests/month | $0.75/guest |
| 500–2,000 | $1.00/guest |
| 2,000+ | $0.35/guest |

- Keeps the pricing model consistent with the core product.
- Scales naturally — bigger venues with more guests pay more but get a better rate.
- A pub with 200 guests/month across 4 events = $150/mo. A wedding venue with 1,500 guests/month = $750/mo.

### Venue Account Structure

```
Venue Account
├── Settings (name, branding, billing)
├── Team
│   ├── Owner (full access, billing)
│   ├── Admin 1 (events, moderation, albums)
│   ├── Admin 2 (events, moderation, albums)
│   └── Staff (view-only or event-specific)
├── Events
│   ├── Active Event: "Friday Night Live — Feb 14"
│   ├── Upcoming: "Valentine's Day Party — Feb 14"
│   ├── Past: "Trivia Night — Feb 7"
│   └── Templates: "Weekly Trivia" (clone to create new)
├── Permanent QR Codes
│   ├── Table 1 → routes to current active event
│   ├── Table 2 → routes to current active event
│   └── Bar QR → routes to current active event
├── Albums & Media Archive
└── Analytics Dashboard
```

### Why Venues Are Valuable

- **Recurring revenue** — Couples use Event Cam once. Venues use it every week, forever.
- **Built-in distribution** — Every event at the venue exposes new guests to Event Cam. The guest email flywheel runs on autopilot.
- **Social proof** — "Used by 50+ venues" is a powerful trust signal for couples too.
- **Defensibility** — Once a venue installs permanent QR stands and trains staff, switching costs are high. They don't leave.

---

## Pro Accounts

### Who This Is For

Wedding and event professionals who work with multiple clients and want to include Event Cam as part of their service offering:

- **Wedding photographers** — Bundle guest photos alongside their professional shots
- **Wedding planners / coordinators** — Include Event Cam in their planning packages
- **Wedding DJs / MCs** — Add photo collection as a value-add service
- **Videographers** — Supplement their footage with guest-captured content
- **Celebrants / officiants** — Recommend to every couple they marry
- **Photo booth operators** — Offer Event Cam as an upgrade or add-on to their booth rental
- **Florists, caterers, stationery designers** — Any vendor with a direct line to engaged couples

### The Core Idea

A Pro doesn't use Event Cam for their own events — they resell or bundle it for their clients' events. They need:

1. A way to create events on behalf of clients
2. A discounted rate (since they're driving volume)
3. A commission or margin they can keep
4. A dashboard to manage all their client events in one place
5. Optional white-labeling so the client sees the Pro's brand

### How It Works

```
Pro signs up → gets a Pro dashboard → creates events for clients → 
client's guests use Event Cam as normal → Pro earns margin on every event
```

**Two models to consider:**

#### Model A: Wholesale + Markup (Pro sets their own price)

- Pro buys Event Cam at a discounted rate: **$1.20/guest** (40% discount off $2)
- Pro sells to their client at whatever price they want — $2/guest, $2.50/guest, flat $350, bundled into their photography package, whatever.
- Pro keeps the margin.
- Event Cam doesn't control or see the end price.

**Example:** Photographer charges a couple $4,000 for their package. Package now includes "guest photo collection powered by Event Cam." Photographer pays Event Cam $1.20 × 150 guests = $180. Photographer either absorbs it (4.5% of their package) or marks it up to $2/guest ($300) and pockets $120.

#### Model B: Affiliate Commission (Pro earns a cut)

- Couple pays $2/guest (standard pricing).
- Pro gets a **40% commission** on every event they refer: **$0.80/guest**.
- Pro shares a referral link or code with clients.
- Event Cam handles billing, the Pro just drives the sale.
- We keep $1.20/guest — same as the wholesale path.

**Example:** Photographer recommends Event Cam to 30 couples/year. Average 140 guests. Commission = 30 × 140 × $0.80 = **$3,360/year** passive income for the photographer. Real money for just mentioning the product.

#### Model C: Hybrid (Wholesale for bundlers, Affiliate for recommenders)

- **Pros who bundle** Event Cam into their packages → Wholesale model (buy at $1.20, sell at their price)
- **Pros who just recommend** → Affiliate model (40% commission, no billing hassle)
- Let the Pro choose which model fits their business.

### Pro Account Features

| Feature | Why |
|---------|-----|
| **Multi-event dashboard** | See all client events in one place. Filter by date, status, client name. |
| **Create events on behalf of clients** | Pro sets up the event, adds guests, configures watermark/filters. Client may never log in. |
| **Client handoff** | Option to transfer event ownership to the couple after setup (they take over moderation, albums). |
| **White-label (premium)** | Replace "Event Cam" branding with the Pro's logo on the upload page and album. |
| **Bulk event creation** | Template an event setup and clone it for each client. |
| **Earnings dashboard** | Track commissions, payouts, referral performance. |
| **Marketing materials** | Downloadable assets: "We use Event Cam" badge, social media graphics, email templates for pitching to clients. |
| **Priority support** | Pros are recommending this to paying clients — they need reliability and fast help. |

### Pro Account Structure

```
Pro Account
├── Profile & Branding
│   ├── Business name, logo, website
│   ├── Referral link / code
│   └── Payout settings (Stripe Connect or similar)
├── Client Events
│   ├── Active: "Sarah & James — June 14"
│   ├── Active: "Priya & Raj — June 21"
│   ├── Upcoming: "Emma & Liam — July 5"
│   ├── Completed: "Maria & David — May 30"
│   └── Templates: "Standard Wedding Setup"
├── Earnings
│   ├── This month: $180 (3 weddings)
│   ├── Lifetime: $840
│   └── Pending payout: $180
├── Marketing Kit
│   ├── "We use Event Cam" badge (PNG, SVG)
│   ├── Social media graphics
│   └── Client pitch email template
└── Settings
    ├── Pricing model: Wholesale / Affiliate
    ├── White-label: On / Off
    └── Default event settings (watermark style, filters)
```

### Naming

"Contractor" doesn't feel right. Options:

| Name | Vibe | Pros | Cons |
|------|------|------|------|
| **Pro** | Professional, elevated | Clean, simple, widely understood | Generic |
| **Partner** | Collaborative, mutual benefit | Feels like a relationship, not a transaction | Vague — could mean anything |
| **Studio** | Creative, professional | Appeals to photographers and creative pros | Excludes DJs, planners, celebrants |
| **Vendor** | Industry-standard wedding term | Couples and planners already think in "vendors" | Feels transactional, cold |
| **Affiliate** | Clear about the commercial relationship | Honest, transparent | Sounds like internet marketing, not weddings |
| **Creator** | Modern, inclusive | Broad, trendy | Might confuse with content creators |

**Recommendation:** Use **"Pro"** as the account type name. It's clean, aspirational, and works across all professional types (photographers, planners, DJs, celebrants). Internally you can distinguish between "Pro — Wholesale" and "Pro — Affiliate" models.

Marketing it as: **"Event Cam Pro — For wedding professionals."**

### Why Pros Are Valuable

- **Recurring volume** — A photographer does 30–50 weddings/year. A planner does 15–40. One Pro account = dozens of events.
- **Zero acquisition cost per event** — You acquire the Pro once, and they bring you customers for years.
- **Trust transfer** — When a photographer recommends Event Cam, the couple trusts it implicitly. This is the highest-conversion referral channel possible.
- **Network effects** — Pros talk to other pros. A photographer recommends it to a planner, who recommends it to a DJ. One Pro account seeds an entire local wedding vendor network.
- **Content generation** — Pros produce high-quality content from real weddings. Their Instagram posts, blog features, and portfolio entries become organic marketing for Event Cam.

### Pro Acquisition Strategy

1. **Start with photographers** — They're the most natural fit (guest photos supplement their work) and the most active on social media.
2. **Seed 20–30 Pros in the first 3 months** — Offer the first 5 events free. Let them experience it with real clients.
3. **Build a "Pro Directory"** on the Event Cam website — Couples can find local Pros who use Event Cam. This gives Pros an incentive to join (free lead generation) and gives couples confidence (the Pro they're hiring already uses the tool).
4. **Pro referral chain** — Pros who refer other Pros get a bonus. Photographers refer planners, planners refer DJs, etc.

---

## How They Fit Together

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
     │  (Subscription)│       │ (Wholesale or  │
     │                │       │   Affiliate)   │
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

## Open Questions

### Venue
- [ ] What's the right pricing model? Subscription vs. per-event vs. per-guest? Need to talk to 5–10 venue owners.
- [ ] Do venues want guest email data for their own marketing? If yes, how do we handle consent/GDPR?
- [ ] Should venue events support the AI watermark? (Venue logo instead of couple's names?)
- [ ] How do "always-on" QR codes work technically? Does the QR route to a venue landing page that redirects to the active event?
- [ ] Do venues want a public-facing gallery ("See photos from last Friday's event") or is everything private?

### Pro
- [ ] Wholesale vs. affiliate — which do photographers actually prefer? Need to interview 10+ photographers.
- [ ] How does white-labeling affect the guest email flywheel? If it's the Pro's brand, do we still capture guest emails for Event Cam marketing? (Probably not for white-label — the Pro owns that relationship.)
- [ ] What's the minimum viable Pro dashboard? Start with just a referral link + earnings tracker, then build up?
- [ ] How do payouts work? Stripe Connect? Monthly bank transfer? Minimum threshold?
- [ ] Should Pros get access to a shared media library across their client events? (Useful for portfolio building, with client permission.)

### General
- [ ] Build priority: Which account type ships first? Pro is probably simpler (referral link + commission tracking) and has faster payback. Venue accounts are more complex but higher long-term value.
- [ ] Do Standard accounts need an upgrade path? ("You started as a couple, now you're planning events professionally — upgrade to Pro.")
- [ ] How do we prevent Pros from gaming the system? (e.g., creating "fake" events to harvest guest emails)

---

*This is a planning document. Validate assumptions with real users before building.*
