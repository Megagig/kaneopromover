# 🚀 Kaneo Pro Movers — Master Project Plan
## Next.js Migration + Full SEO + Admin Dashboard

**Live Site:** https://www.kaneopromovers.com  
**Repo:** https://github.com/lloydweb/kaneopromovers  
**New Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS · Prisma · PostgreSQL · Resend · NextAuth.js  
**Design System:** ClickHouse-inspired (https://getdesign.md/clickhouse/design-md)  
**Phone:** +1(587)-378-5954 | **Email:** info@kaneopromovers.com  
**Address:** 1060 Channelside DR, SW, Airdrie, AB, Canada  

---

## 🎨 DESIGN SYSTEM SPECIFICATION

### Color Palette (ClickHouse-inspired, applied to Kaneo brand)

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `primary` | `#FFCC00` (golden yellow) | `#FFCC00` | CTAs, highlights, brand accent |
| `primary-hover` | `#E6B800` | `#FFD740` | Button hover states |
| `background` | `#FFFFFF` | `#0D0D0D` | Page background |
| `surface` | `#F5F5F5` | `#1A1A1A` | Cards, panels |
| `surface-2` | `#EBEBEB` | `#242424` | Nested cards, inputs |
| `text-primary` | `#111111` | `#F0F0F0` | Body text, headings |
| `text-secondary` | `#555555` | `#999999` | Subtext, captions |
| `text-muted` | `#888888` | `#666666` | Placeholders, meta |
| `border` | `#E0E0E0` | `#2E2E2E` | Card borders, dividers |
| `success` | `#22C55E` | `#22C55E` | Success states |
| `error` | `#EF4444` | `#EF4444` | Error states |
| `nav-bg` | `#FFFFFF` | `#111111` | Navbar background |

### Typography (ClickHouse-inspired)

```css
/* Headings — Bold, tight tracking */
font-family: 'Inter', 'Plus Jakarta Sans', sans-serif;
--font-display: 'Plus Jakarta Sans', sans-serif;  /* Hero, H1, H2 */
--font-body: 'Inter', sans-serif;                  /* Body, UI elements */
--font-mono: 'JetBrains Mono', monospace;          /* Code, stats, numbers */

/* Scale */
h1: 4rem (64px) bold, tracking-tight, leading-none
h2: 2.5rem (40px) bold, tracking-tight
h3: 1.75rem (28px) semibold
h4: 1.25rem (20px) semibold
body: 1rem (16px) regular, leading-relaxed
small: 0.875rem (14px)
```

### Component Patterns (ClickHouse-inspired)

- **Buttons:** Sharp corners (`rounded-md`), bold uppercase or sentence-case, yellow primary with black text, ghost secondary
- **Cards:** Thin border (`border border-border`), subtle shadow on hover, no excessive rounding (`rounded-lg`)
- **Navbar:** Sticky, transparent on scroll → solid on scroll, dark background in dark mode
- **Hero Section:** Full-viewport height, large bold headline, yellow accent word, dark overlay on image
- **Section padding:** `py-20 md:py-28` for major sections, `py-12` for subsections
- **Grid:** 12-column base, content max-width `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Animations:** Subtle fade-in on scroll (`opacity-0 → opacity-100`), slide-up on cards, no heavy animations

### Preserved Brand Assets (copy from current site)
- Logo light: `/assets/img/logo/logo-one.jpg` → `public/images/logo-light.jpg`
- Logo dark: `/assets/img/logo/logo-two.png` → `public/images/logo-dark.png`
- Canada flag: `/assets/img/flag/7-canada.png` → `public/images/flag-canada.png`
- Hero images: all `/assets/img/` → `public/images/`
- All city images (Airdrie Sign, etc.) → `public/images/cities/`

---

## 📁 COMPLETE PROJECT STRUCTURE

```
kaneopromovers-next/
├── app/
│   ├── layout.tsx                    ← Root layout (fonts, GA4, theme provider)
│   ├── globals.css                   ← Tailwind base + CSS variables
│   ├── page.tsx                      ← Homepage
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── quote/
│   │   └── page.tsx
│   ├── success/
│   │   └── page.tsx
│   ├── moving-services/
│   │   ├── page.tsx
│   │   └── [service]/
│   │       └── page.tsx              ← Individual service detail pages
│   ├── locations/
│   │   ├── airdrie/
│   │   │   └── page.tsx
│   │   ├── calgary/
│   │   │   └── page.tsx
│   │   ├── crossfield/
│   │   │   └── page.tsx
│   │   ├── carstairs/
│   │   │   └── page.tsx
│   │   ├── chestermere/
│   │   │   └── page.tsx
│   │   ├── cochrane/
│   │   │   └── page.tsx
│   │   ├── okotoks/
│   │   │   └── page.tsx
│   │   └── olds/
│   │       └── page.tsx              ← NEW city page
│   ├── admin/
│   │   ├── layout.tsx                ← Admin layout (auth guard)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── bookings/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── leads/
│   │   │   └── page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   └── analytics/
│   │       └── page.tsx
│   └── api/
│       ├── quote/
│       │   └── route.ts              ← Quote form handler
│       ├── contact/
│       │   └── route.ts              ← Contact form handler
│       ├── bookings/
│       │   └── route.ts              ← Bookings CRUD
│       ├── leads/
│       │   └── route.ts              ← Leads management
│       ├── pricing/
│       │   └── route.ts              ← Pricing CRUD
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts          ← NextAuth handler
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── TopBar.tsx                ← Phone/email top strip
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   └── ThemeToggle.tsx
│   ├── sections/
│   │   ├── HeroSlider.tsx            ← Carousel hero (3 slides from original)
│   │   ├── ServicesGrid.tsx
│   │   ├── AboutSection.tsx
│   │   ├── QuoteWidget.tsx           ← Inline quote form (homepage)
│   │   ├── TestimonialsSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── CityLinks.tsx
│   │   └── FAQSection.tsx
│   ├── city/
│   │   └── CityPage.tsx              ← Reusable city page template
│   ├── forms/
│   │   ├── QuoteForm.tsx
│   │   └── ContactForm.tsx
│   ├── seo/
│   │   ├── LocalBusinessSchema.tsx
│   │   ├── FAQSchema.tsx
│   │   └── BreadcrumbSchema.tsx
│   └── admin/
│       ├── Sidebar.tsx
│       ├── StatsCard.tsx
│       ├── BookingTable.tsx
│       ├── LeadsTable.tsx
│       └── AnalyticsChart.tsx
├── lib/
│   ├── data/
│   │   ├── cityData.ts               ← All city SEO data
│   │   ├── serviceData.ts            ← All services data
│   │   └── pricingData.ts            ← Moving size pricing tiers
│   ├── db/
│   │   └── prisma.ts                 ← Prisma client singleton
│   ├── email/
│   │   └── resend.ts                 ← Resend client + templates
│   ├── auth/
│   │   └── authOptions.ts            ← NextAuth config
│   └── utils/
│       ├── formatters.ts
│       └── validators.ts
├── prisma/
│   └── schema.prisma                 ← Database schema
├── public/
│   ├── images/
│   │   ├── logo-light.jpg
│   │   ├── logo-dark.png
│   │   ├── cities/
│   │   └── services/
│   ├── sitemap.xml
│   ├── robots.txt
│   └── google3f079748702b6260.html  ← Keep for GSC verification
├── middleware.ts                     ← Auth protection for /admin routes
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env.local
```

---

## 🔗 URL MAPPING (Old → New with 301 Redirects)

| Old URL | New URL | Notes |
|---|---|---|
| `/index.html` | `/` | Homepage |
| `/about.html` | `/about` | |
| `/contact.html` | `/contact` | |
| `/quote.html` | `/quote` | |
| `/success.html` | `/success` | |
| `/moving-services.html` | `/moving-services` | |
| `/moving-services-details.html` | `/moving-services/details` | |
| `/airdrie-movers.html` | `/locations/airdrie` | |
| `/calgary-movers.html` | `/locations/calgary` | |
| `/crossfield-movers.html` | `/locations/crossfield` | |
| `/carstairs-movers.html` | `/locations/carstairs` | |
| `/chestermere-movers.html` | `/locations/chestermere` | |
| `/cochrane-movers.html` | `/locations/cochrane` | |
| `/okotoks-movers.html` | `/locations/okotoks` | |
| *(missing)* | `/locations/olds` | New page |

> ⚠️ All old `.html` URLs must 301 redirect to new clean URLs in `next.config.ts`

---

## 📊 DATABASE SCHEMA (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String
  role      String   @default("admin")
  createdAt DateTime @default(now())
}

model Quote {
  id              String   @id @default(cuid())
  // Property details
  bedroomTypeFrom String   // "1 Bedroom Apartment", "2 Bedroom house", etc.
  bedroomTypeTo   String
  movingDate      DateTime
  // Personal info
  firstName       String
  lastName        String
  email           String
  phone           String
  // Addresses
  fromAddress     String
  toAddress       String
  fromCity        String
  toCity          String
  // Optional
  notes           String?
  // Status
  status          QuoteStatus @default(PENDING)
  estimatedPrice  Float?
  // Meta
  source          String?  // which page/city they came from
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  booking         Booking?
}

model Booking {
  id          String        @id @default(cuid())
  quoteId     String        @unique
  quote       Quote         @relation(fields: [quoteId], references: [id])
  scheduledAt DateTime
  status      BookingStatus @default(CONFIRMED)
  assignedTo  String?       // mover name
  notes       String?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  subject   String
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}

model Pricing {
  id          String   @id @default(cuid())
  label       String   // "1 Bedroom Apartment"
  basePrice   Float
  hourlyRate  Float
  minHours    Int      @default(2)
  isActive    Boolean  @default(true)
  updatedAt   DateTime @updatedAt
}

enum QuoteStatus {
  PENDING
  REVIEWED
  QUOTED
  BOOKED
  COMPLETED
  CANCELLED
}

enum BookingStatus {
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
```

---

## PHASE 1 — PROJECT SCAFFOLDING & SETUP
> **Timeline:** Day 1  
> **Goal:** Create the Next.js project with all tooling configured

### 1.1 — Initialize Project
- [ ] Run: `npx create-next-app@latest kaneopromovers-next --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"`
- [ ] Install core dependencies:
  ```bash
  npm install @prisma/client prisma
  npm install next-auth@beta
  npm install resend
  npm install bcryptjs
  npm install @types/bcryptjs -D
  npm install lucide-react
  npm install next-themes
  npm install clsx tailwind-merge
  npm install @tailwindcss/typography
  npm install framer-motion
  npm install react-hook-form @hookform/resolvers zod
  npm install date-fns
  npm install recharts
  ```
- [ ] Run: `npx prisma init`
- [ ] Configure `.env.local` with all required variables (see Phase 7)

### 1.2 — Tailwind Configuration
- [ ] Update `tailwind.config.ts` with custom design tokens:
  ```typescript
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#FFCC00', hover: '#E6B800' },
        background: 'hsl(var(--background))',
        surface: 'hsl(var(--surface))',
        'text-primary': 'hsl(var(--text-primary))',
        'text-secondary': 'hsl(var(--text-secondary))',
        border: 'hsl(var(--border))',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    }
  }
  ```
- [ ] Add CSS variables for dark/light mode in `globals.css`
- [ ] Install fonts via `next/font/google` in `app/layout.tsx`

### 1.3 — Next.js Configuration
- [ ] Configure `next.config.ts`:
  - Enable image optimization for `kaneopromovers.com` domain
  - Add all 301 redirects from old `.html` URLs to new clean URLs
  - Add security headers
  - Configure `images.formats: ['image/avif', 'image/webp']`

### 1.4 — Theme Provider Setup
- [ ] Wrap app in `next-themes` ThemeProvider in `app/layout.tsx`
- [ ] Create `ThemeToggle.tsx` button component (sun/moon icon toggle)
- [ ] Set `defaultTheme="system"` with `enableSystem`

### 1.5 — Database Setup
- [ ] Set up PostgreSQL database (local or Supabase/Neon for production)
- [ ] Add `DATABASE_URL` to `.env.local`
- [ ] Run `npx prisma db push` to create tables
- [ ] Run `npx prisma generate` to generate client
- [ ] Seed initial admin user and pricing data

---

## PHASE 2 — CORE LAYOUT COMPONENTS
> **Timeline:** Day 1–2  
> **Goal:** Build Navbar, Footer, TopBar that appear on every public page

### 2.1 — TopBar Component
> Matches current site's top strip with phone + email
- [ ] Create `components/layout/TopBar.tsx`
- [ ] Content: phone `+1(587)-378-5954` (with `tel:` link + GA4 click tracking), email `info@kaneopromovers.com`, Canada flag
- [ ] Mobile: hidden on mobile (`hidden md:flex`)
- [ ] Dark/light mode responsive background
- [ ] Yellow accent color for phone number

### 2.2 — Navbar Component
- [ ] Create `components/layout/Navbar.tsx` as a Client Component (`'use client'`)
- [ ] **Logo:** Show `logo-light.jpg` in light mode, `logo-dark.png` in dark mode, using `next/image`
- [ ] **Navigation links:**
  - Home → `/`
  - About Us → `/about`
  - Services (dropdown) → all 8 service types linking to `/moving-services`
  - Locations (dropdown) → all 8 city pages
  - Contact → `/contact`
  - **Free Quote** → `/quote` (yellow CTA button, primary style)
- [ ] **Mobile:** hamburger menu with smooth slide-down drawer
- [ ] **Sticky:** `position: sticky, top: 0, z-50`
- [ ] **Scroll effect:** transparent with border-bottom on scroll
- [ ] **Active link:** yellow underline on current page link
- [ ] Include `ThemeToggle` button in nav

### 2.3 — Footer Component
- [ ] Create `components/layout/Footer.tsx`
- [ ] Match current site footer structure:
  - Column 1: Logo + company description + "Serving Alberta"
  - Column 2: Contact Info (address, email, phone)
  - Column 3: Quick Links (Home, About, Services, Quote, Contact)
  - Column 4: Locations (all 8 cities)
  - Column 5: Services list
- [ ] Bottom bar: Copyright 2025 Kaneo Pro Movers + social icons
- [ ] NAP schema in footer (matching LocalBusiness schema)
- [ ] Dark background footer with yellow accent links

### 2.4 — Root Layout
- [ ] Update `app/layout.tsx` with:
  - Plus Jakarta Sans + Inter fonts via `next/font/google`
  - `ThemeProvider` wrapper
  - `TopBar` + `Navbar` + `Footer` (on all public pages)
  - Google Analytics 4 `<Script>` (using `next/script` with `strategy="afterInteractive"`)
  - Default metadata object (site name, description, OG image)
  - `<html lang="en">`

---

## PHASE 3 — PUBLIC PAGES (Matching Current Site Exactly)
> **Timeline:** Day 2–4  
> **Goal:** Recreate all 14 pages with identical content, improved design, full SEO

### 3.1 — Homepage (`app/page.tsx`)
**Sections to build (in order):**

**A. Hero Slider**
- [ ] 3-slide carousel matching current site's 3 hero states:
  1. "KANEO PRO MOVERS — Movers With Confidence"
  2. "We Are Reliable and Efficient — Moving Company"
  3. "Professional Movers and fair price — Your 1st Choice"
- [ ] Each slide: full-viewport height, dark overlay, background image, centered text
- [ ] CTA buttons on each slide: "Send A Direct Email" + "Call +1(587)-378-5954" + "GET FREE A QUOTE" (yellow, primary)
- [ ] Auto-play with 5s interval, prev/next arrows, dot indicators
- [ ] Built with `framer-motion` AnimatePresence

**B. Services Grid**
- [ ] 4-card grid: Residential Moving, Commercial Moving, Packing & Unpacking, Loading/Unloading
- [ ] Each card: icon (Lucide), title, description, "Learn More" link
- [ ] Hover: card lifts with yellow accent border

**C. About Section**
- [ ] 2-column layout: text left, image right
- [ ] "What Drives Us To Deliver Excellence!" heading
- [ ] All 6 bullet points from original site
- [ ] "About Us" CTA button → `/about`
- [ ] Stats row: 99% Satisfaction, X+ Moves, 5-Star Rating, 24/7 Support

**D. Quick Quote Widget**
- [ ] Inline quote form from homepage (bedroom type from, bedroom type to, date)
- [ ] Background: yellow section with dark text
- [ ] On submit: redirect to `/quote` with pre-filled values via URL params

**E. Testimonials Section**
- [ ] "We Are 5-Star Moving Company" heading
- [ ] Carousel of 3–5 review cards
- [ ] Star ratings (5 yellow stars each)
- [ ] Customer name + city

**F. City Coverage Section**
- [ ] "Areas We Serve" heading
- [ ] Grid of city cards with links to each city page
- [ ] Cities: Airdrie, Calgary, Crossfield, Carstairs, Chestermere, Cochrane, Okotoks, Olds

**G. FAQ Section**
- [ ] Accordion-style FAQ
- [ ] 5 questions from SEO plan

### 3.2 — About Page (`app/about/page.tsx`)
- [ ] Breadcrumb: Home > About Us
- [ ] Hero banner with page title
- [ ] About image (`assets/img/about-img.jpg` → `public/images/about.jpg`)
- [ ] "Reliable And Express Moving Services" section with full body text
- [ ] "Why Choose Us" section
- [ ] Vision / Mission / Values tabs (matching current 3-tab layout)
- [ ] Team or stats section

### 3.3 — Services Page (`app/moving-services/page.tsx`)
- [ ] Breadcrumb: Home > Services
- [ ] All 8 service cards:
  1. Local Movers
  2. Long Distance Moving
  3. Residential Moving
  4. Commercial Moving
  5. Packing and Unpacking
  6. Loading or Unloading
  7. Heavy Item Moving
  8. Furniture Moving
- [ ] "From Start To Finish" process section
- [ ] 6 feature items: Fast & Efficient, Professional Packing, Safe Transportation, Unpacking, 24/7 Support, Warehouse Storage
- [ ] CTA to `/quote`

### 3.4 — Service Detail Page (`app/moving-services/[service]/page.tsx`)
- [ ] Dynamic route for each service
- [ ] Matches content from `moving-services-details.html`
- [ ] Sidebar with quick links to all services
- [ ] CTA widget (mini quote form)

### 3.5 — Quote Page (`app/quote/page.tsx`)
- [ ] Breadcrumb: Home > Get A Free Quote
- [ ] Hero image (quote2.png + quote-img.jpg)
- [ ] Full quote form:
  - Bedroom type (from) — dropdown with all 11 options
  - Bedroom type (to) — dropdown with all 11 options
  - Moving date — date picker
  - First name, Last name
  - Email address
  - Phone number
  - From address (full)
  - To address (full)
  - From city, To city
  - Additional notes (textarea)
- [ ] Price estimate display (calculated from Pricing table in DB)
- [ ] Submit → calls `/api/quote` → sends email via Resend → redirects to `/success`

### 3.6 — Success Page (`app/success/page.tsx`)
- [ ] Confirmation message with green checkmark icon
- [ ] "We'll contact you within 2 hours" message
- [ ] Company phone number prominent
- [ ] "Return to Homepage" button
- [ ] GA4 conversion event fired on page load

### 3.7 — Contact Page (`app/contact/page.tsx`)
- [ ] Breadcrumb: Home > Contact
- [ ] 3 info cards: Location, Call/Text, Email
- [ ] Contact message form: Name, Email, Phone, Subject, Message
- [ ] Submit → calls `/api/contact` → email to admin via Resend
- [ ] Google Maps embed (optional — static map image acceptable)

### 3.8 — City Pages (8 pages)
> Use a shared `CityPage` component with per-city data from `lib/data/cityData.ts`

**Pages:**
- [ ] `app/locations/airdrie/page.tsx`
- [ ] `app/locations/calgary/page.tsx`
- [ ] `app/locations/crossfield/page.tsx`
- [ ] `app/locations/carstairs/page.tsx`
- [ ] `app/locations/chestermere/page.tsx`
- [ ] `app/locations/cochrane/page.tsx`
- [ ] `app/locations/okotoks/page.tsx`
- [ ] `app/locations/olds/page.tsx` ← NEW

**Each city page contains:**
- [ ] Breadcrumb: Home > Locations > [City]
- [ ] Hero with city photo + "Ready To Move in [City]?"
- [ ] Body text from original site (unique per city)
- [ ] "Why Choose Kaneo Pro Movers in [City]?" bullet list
- [ ] 4 service cards (Residential, Commercial, Packing, Loading)
- [ ] Testimonials section (reused component)
- [ ] Internal links to 3 other city pages
- [ ] CTA to `/quote?city=[city]`
- [ ] `generateMetadata()` with city-specific title, description, canonical, OG tags
- [ ] LocalBusiness JSON-LD schema (city-specific)
- [ ] FAQ schema (city-specific)

---

## PHASE 4 — ADMIN SYSTEM
> **Timeline:** Day 4–6  
> **Goal:** Full admin dashboard with authentication

### 4.1 — Authentication (NextAuth.js)
- [ ] Configure NextAuth with Credentials provider in `lib/auth/authOptions.ts`
- [ ] Admin login validates against `Admin` table in DB (bcrypt password comparison)
- [ ] Session: JWT strategy, 24-hour expiry
- [ ] Create `middleware.ts` to protect all `/admin/*` routes — redirect to `/admin/login` if not authenticated
- [ ] Create seed script to create first admin: `npx prisma db seed`

### 4.2 — Admin Login Page (`app/admin/login/page.tsx`)
- [ ] Standalone page (no TopBar/Navbar/Footer — just the admin login)
- [ ] Centered card design: Kaneo Pro logo, email input, password input, "Sign In" button
- [ ] Error messages for wrong credentials
- [ ] Redirect to `/admin/dashboard` on success
- [ ] "Back to website" link

### 4.3 — Admin Layout (`app/admin/layout.tsx`)
- [ ] Auth guard: server-side session check, redirect if not authenticated
- [ ] Sidebar navigation:
  - Dashboard (home icon)
  - Bookings (calendar icon)
  - Leads / Quotes (inbox icon)
  - Pricing (tag icon)
  - Analytics (bar chart icon)
  - Settings (gear icon)
  - Logout button (bottom of sidebar)
- [ ] Top bar: "Admin Panel" breadcrumb + current admin name + dark mode toggle
- [ ] Mobile: collapsible sidebar

### 4.4 — Dashboard Page (`app/admin/dashboard/page.tsx`)
**Stat Cards (top row):**
- [ ] Total Quotes (this month)
- [ ] Pending Quotes
- [ ] Confirmed Bookings
- [ ] New Messages (unread contact forms)

**Charts:**
- [ ] Quote submissions over last 30 days (line chart via Recharts)
- [ ] Quotes by city/source (bar chart)
- [ ] Quote status breakdown (pie chart)

**Recent Activity:**
- [ ] Last 5 quotes (table: name, city, date, status, action)
- [ ] Last 5 contact messages

### 4.5 — Bookings Page (`app/admin/bookings/page.tsx`)
- [ ] Table: all bookings with columns: Customer, From→To, Scheduled Date, Status, Assigned To, Actions
- [ ] Filter by status (Confirmed, In Progress, Completed, Cancelled)
- [ ] Search by customer name or city
- [ ] Click booking row → `/admin/bookings/[id]` for full details
- [ ] Update status dropdown inline
- [ ] Assign mover field
- [ ] Export to CSV button

### 4.6 — Leads / Quotes Page (`app/admin/leads/page.tsx`)
- [ ] Table: all quotes with columns: Name, Email, Phone, Bedroom Type, Moving Date, From City, To City, Source, Status, Received At
- [ ] Status update: PENDING → REVIEWED → QUOTED → BOOKED
- [ ] "Convert to Booking" button on quoted leads
- [ ] "Send Quote Email" button → sends pricing via Resend
- [ ] Filter: by status, by city, by date range
- [ ] Unread indicator (highlight new submissions)

### 4.7 — Pricing Page (`app/admin/pricing/page.tsx`)
- [ ] Table of all pricing tiers (from `Pricing` table)
- [ ] Inline edit: base price, hourly rate, min hours
- [ ] Toggle active/inactive per tier
- [ ] Changes auto-update the quote form's price estimator
- [ ] Save button with success toast notification

### 4.8 — Analytics Page (`app/admin/analytics/page.tsx`)
- [ ] Embedded Google Analytics GA4 iframe/link (or API data display)
- [ ] Site stats from DB: total quotes by month, conversion rate (quotes → bookings)
- [ ] Top source cities (which city pages generate most leads)
- [ ] Peak booking days/times chart

---

## PHASE 5 — API ROUTES
> **Timeline:** Day 4–5 (parallel with admin)

### 5.1 — Quote API (`app/api/quote/route.ts`)
```typescript
// POST /api/quote
// 1. Validate input with Zod schema
// 2. Calculate price estimate from Pricing table
// 3. Save Quote record to DB
// 4. Send customer confirmation email via Resend
// 5. Send admin notification email via Resend
// 6. Return { success: true, quoteId, estimatedPrice }
```
- [ ] Input validation: all required fields, date must be future
- [ ] Price calculation: look up `Pricing` by bedroom type, apply base + hourly estimate
- [ ] Customer email: "We received your quote request" + estimated price + contact details
- [ ] Admin email: full quote details + customer contact + link to admin panel

### 5.2 — Contact API (`app/api/contact/route.ts`)
```typescript
// POST /api/contact
// 1. Validate input
// 2. Save ContactMessage to DB (read: false)
// 3. Send notification email to admin via Resend
// 4. Return { success: true }
```

### 5.3 — Bookings API (`app/api/bookings/route.ts`)
- [ ] `GET /api/bookings` — list all (admin auth required)
- [ ] `POST /api/bookings` — create from quote (admin auth required)
- [ ] `PATCH /api/bookings/[id]` — update status/assignment
- [ ] `DELETE /api/bookings/[id]` — cancel

### 5.4 — Leads API (`app/api/leads/route.ts`)
- [ ] `GET /api/leads` — list all quotes (admin auth required)
- [ ] `PATCH /api/leads/[id]` — update status
- [ ] `POST /api/leads/[id]/send-quote` — trigger quote email via Resend

### 5.5 — Pricing API (`app/api/pricing/route.ts`)
- [ ] `GET /api/pricing` — list all tiers (public, used by quote form)
- [ ] `PATCH /api/pricing/[id]` — update tier (admin auth required)

---

## PHASE 6 — EMAIL TEMPLATES (Resend)
> **Timeline:** Day 5

### 6.1 — Setup Resend
- [ ] Install: `npm install resend`
- [ ] Create account at https://resend.com
- [ ] Verify domain `kaneopromovers.com` in Resend DNS settings
- [ ] Add `RESEND_API_KEY` to `.env.local`
- [ ] Create `lib/email/resend.ts` with Resend client

### 6.2 — Email Templates (React Email)
- [ ] Install: `npm install @react-email/components react-email`
- [ ] **Customer Quote Confirmation Email:**
  - Subject: "Your Moving Quote Request — Kaneo Pro Movers"
  - Body: Customer name, move details, estimated price range, "We'll call you within 2 hours", company phone
  - Kaneo Pro branded header (yellow accent)
- [ ] **Admin Quote Notification Email:**
  - Subject: "🔔 New Quote Request — [Customer Name]"
  - Body: All form fields, customer phone (click-to-call), link to admin panel
  - Sent to: `info@kaneopromovers.com`
- [ ] **Contact Form Notification Email:**
  - Subject: "New Contact Message — [Subject]"
  - Body: Name, email, phone, message, timestamp
- [ ] **Booking Confirmation Email:**
  - Subject: "Your Move is Confirmed! — Kaneo Pro Movers"
  - Body: Move date, time, what to expect, contact details

---

## PHASE 7 — SEO IMPLEMENTATION
> **Timeline:** Day 6–7  
> **Goal:** Full technical + on-page + local SEO

### 7.1 — Root Metadata (`app/layout.tsx`)
- [ ] Default metadata object:
  ```typescript
  export const metadata: Metadata = {
    metadataBase: new URL('https://www.kaneopromovers.com'),
    title: { default: 'Kaneo Pro Movers | Airdrie & Calgary Moving Company', template: '%s | Kaneo Pro Movers' },
    description: 'Trusted moving company in Airdrie and Calgary, AB. Affordable residential, furniture & same-day movers. Free quote available.',
    openGraph: { siteName: 'Kaneo Pro Movers', locale: 'en_CA', type: 'website' },
    robots: { index: true, follow: true },
    verification: { google: '3f079748702b6260' },
  }
  ```

### 7.2 — Per-Page Metadata
- [ ] Homepage: title, description, OG image, canonical
- [ ] About: title, description, canonical
- [ ] Services: title, description, canonical
- [ ] Quote: title, description, noindex (quote thank-you = success page noindex)
- [ ] All 8 city pages: `generateMetadata()` from `cityData.ts`

### 7.3 — City Data (`lib/data/cityData.ts`)
```typescript
// Complete data for all 8 cities
export const cities = [
  {
    slug: 'airdrie',
    city: 'Airdrie',
    province: 'AB',
    title: 'Airdrie Movers | Local Moving Company in Airdrie, AB | Kaneo Pro',
    description: 'Need airdrie movers? Kaneo Pro offers affordable residential, furniture & same-day moving services in Airdrie, AB. Trusted by Airdrie families. Free quote!',
    h1: 'Airdrie Movers — Your Trusted Local Moving Company',
    heroImage: '/images/cities/airdrie.jpg',
    keywords: ['airdrie movers', 'local movers airdrie', 'affordable movers airdrie', 'same day movers airdrie', 'residential movers airdrie', 'furniture movers airdrie', 'airdrie moving company'],
    bodyText: '...full body text from original airdrie-movers.html...',
    whyChoose: ['Professionalism', 'Reliability', 'Clear Pricing', 'Full Service', '24/7 support'],
    nearbyCities: ['Calgary', 'Crossfield', 'Carstairs', 'Cochrane'],
    faq: [
      { q: 'How much do movers cost in Airdrie?', a: '...' },
      // ...
    ]
  },
  // ... all 8 cities
]
```

### 7.4 — Structured Data Components

**LocalBusiness Schema (`components/seo/LocalBusinessSchema.tsx`)**
- [ ] MovingCompany type
- [ ] Includes: name, url, logo, telephone, address, areaServed (all 7 cities), services, priceRange, openingHours
- [ ] City-specific version for city pages

**FAQ Schema (`components/seo/FAQSchema.tsx`)**
- [ ] FAQPage type
- [ ] Rendered on: homepage, airdrie page, calgary page
- [ ] City-specific questions per city page

**Breadcrumb Schema (`components/seo/BreadcrumbSchema.tsx`)**
- [ ] BreadcrumbList type
- [ ] Every page except homepage

### 7.5 — Technical SEO Files

**`public/robots.txt`**
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /success
Sitemap: https://www.kaneopromovers.com/sitemap.xml
```

**`app/sitemap.ts`** (dynamic, auto-generated)
- [ ] Returns all 14+ page URLs with lastmod, changefreq, priority
- [ ] Auto-updates when new city pages are added

**`next.config.ts` Headers**
```typescript
headers: [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=()' },
]
```

### 7.6 — Image Optimization
- [ ] Convert all images to WebP/AVIF using `next/image`
- [ ] Add `priority` prop to hero images (LCP optimization)
- [ ] Add `alt` text to every image (descriptive + keyword-rich)
- [ ] Add `width` + `height` to all images (prevent layout shift)
- [ ] Compress originals before adding to `public/`

### 7.7 — Performance Targets
- [ ] Lighthouse Mobile: 90+
- [ ] Lighthouse Desktop: 95+
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] FID < 100ms

---

## PHASE 8 — GOOGLE ANALYTICS & SEARCH CONSOLE
> **Timeline:** Day 7 (after deployment)

### 8.1 — GA4 Integration
- [ ] Add GA4 `<Script>` in `app/layout.tsx` using `next/script` with `strategy="afterInteractive"`
- [ ] Measurement ID stored in `NEXT_PUBLIC_GA_ID` env variable
- [ ] Create `lib/utils/gtag.ts` helper for event tracking
- [ ] Track conversions:
  - `quote_form_submitted` — fire on `/success` page load
  - `phone_click` — fire on any `tel:` link click
  - `email_click` — fire on any `mailto:` link click
  - `contact_form_submitted` — fire on contact form success

### 8.2 — Google Search Console
- [ ] Keep `public/google3f079748702b6260.html` in `public/` folder
- [ ] Add `verification.google` to root metadata
- [ ] Submit new sitemap after first deployment

### 8.3 — Bing Webmaster Tools
- [ ] Add Bing verification meta tag to root metadata
- [ ] Submit sitemap at https://www.bing.com/webmasters

---

## PHASE 9 — LIGHT/DARK MODE
> Implemented throughout all phases

### Implementation Pattern
- [ ] CSS variables defined in `globals.css` under `:root` (light) and `.dark` (dark)
- [ ] All components use `bg-background`, `text-text-primary`, `border-border` Tailwind tokens
- [ ] `ThemeToggle` button in Navbar — sun icon (light mode) / moon icon (dark mode)
- [ ] `next-themes` handles `localStorage` persistence + system preference detection
- [ ] No flash of wrong theme on load (use `suppressHydrationWarning` on `<html>`)
- [ ] Images: logo changes with theme (`useTheme()` hook)
- [ ] Yellow primary color stays the same in both modes

---

## PHASE 10 — DEPLOYMENT & LAUNCH
> **Timeline:** Day 8

### 10.1 — Pre-Launch Checklist
- [ ] All 14+ pages render without console errors
- [ ] All forms submit correctly and emails arrive
- [ ] Admin login works, all dashboard tables populate
- [ ] 301 redirects from old `.html` URLs all work (test each one)
- [ ] All images load with correct alt text
- [ ] Dark/light mode toggle works on every page
- [ ] Mobile responsive on 375px, 768px, 1280px viewports
- [ ] Lighthouse scores meet targets

### 10.2 — VPS Deployment (Recommended)
- [ ] Set up VPS (DigitalOcean/Hetzner ~$6–12/month)
- [ ] Install Node.js 20+, Nginx, PM2
- [ ] Install PostgreSQL (or use Supabase/Neon)
- [ ] Configure Nginx as reverse proxy to Next.js on port 3000
- [ ] Set up SSL via Let's Encrypt (Certbot)
- [ ] Configure PM2 for process management + auto-restart
- [ ] Set all production environment variables
- [ ] Run `npm run build` and `npx prisma db push`
- [ ] Start: `pm2 start npm --name "kaneopromovers" -- start`

### 10.3 — Post-Launch SEO Actions
- [ ] Submit sitemap in Google Search Console
- [ ] Check Coverage tab for indexing errors
- [ ] Verify GA4 is receiving live traffic data
- [ ] Set up Google Business Profile (if not done)
- [ ] Test all 301 redirects live
- [ ] Submit to Bing Webmaster Tools
- [ ] Run final Lighthouse audit on live URL

---

## 🔐 ENVIRONMENT VARIABLES

```bash
# .env.local

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/kaneopromovers"

# NextAuth
NEXTAUTH_URL="https://www.kaneopromovers.com"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Resend Email
RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_FROM_EMAIL="noreply@kaneopromovers.com"
ADMIN_NOTIFICATION_EMAIL="info@kaneopromovers.com"

# Google Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# App
NEXT_PUBLIC_SITE_URL="https://www.kaneopromovers.com"
NEXT_PUBLIC_PHONE="+15873785954"
NEXT_PUBLIC_EMAIL="info@kaneopromovers.com"
```

---

## 📊 SUCCESS METRICS

| Metric | 1 Month | 3 Months | 6 Months |
|---|---|---|---|
| Lighthouse Mobile | 90+ | 92+ | 95+ |
| All pages indexed | 15/15 | 15/15 | 15/15 |
| Organic clicks/month | 50+ | 200+ | 500+ |
| "airdrie movers" ranking | Top 20 | Top 10 | Top 5 |
| "calgary movers" ranking | Top 30 | Top 15 | Top 8 |
| Quote form submissions/month | 10+ | 30+ | 60+ |
| Admin bookings managed | Live | Live | Live |
| Google reviews | 5+ | 20+ | 50+ |
