# 🚀 Kaneo Pro Movers — Master Project Plan
## Next.js Migration + Full SEO + Admin Dashboard

**Live Site:** https://www.kaneopromovers.com  
**Repo:** https://github.com/lloydweb/kaneopromovers  
**New Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS · Prisma · PostgreSQL · Resend · NextAuth.js  
**Design System:** ClickHouse-inspired (https://getdesign.md/clickhouse/design-md)  
**Phone:** +1(587)-378-5954 | **Email:** info@kaneopromovers.com  
**Address:** 1060 Channelside DR, SW, Airdrie, AB, Canada  

---

## PHASE 1 — PROJECT SCAFFOLDING & SETUP ✅

### 1.1 — Initialize Project
- [x] Next.js 16 App Router with TypeScript, Tailwind, ESLint
- [x] All dependencies installed (Prisma, NextAuth, Resend, Framer Motion, etc.)
- [x] Prisma initialized
- [x] `.env.local` configured

### 1.2 — Tailwind Configuration
- [x] Custom design tokens in `globals.css` (CSS variables for light/dark)
- [x] Fonts: Plus Jakarta Sans, Inter, JetBrains Mono via `next/font/google`

### 1.3 — Next.js Configuration
- [x] Image optimization (AVIF, WebP, remote patterns)
- [x] 14 permanent 301 redirects from old `.html` URLs
- [x] Security headers (X-Content-Type-Options, X-Frame-Options, etc.)

### 1.4 — Theme Provider Setup
- [x] `next-themes` ThemeProvider with `defaultTheme="system"`
- [x] `ThemeToggle.tsx` (Sun/Moon icons)
- [x] `suppressHydrationWarning` on `<html>`

### 1.5 — Database Setup
- [x] Prisma schema with 5 models (Admin, Quote, Booking, ContactMessage, Pricing)
- [x] Prisma client singleton with `@prisma/adapter-pg`
- [x] Seed script with admin user + 11 pricing tiers
- [x] `prisma generate` completed
- ⏳ `prisma db push` — requires running PostgreSQL (deployment step)

---

## PHASE 2 — CORE LAYOUT COMPONENTS ✅

### 2.1 — TopBar
- [x] Server component, dark bg, phone/email links, Canada flag, hidden on mobile

### 2.2 — Navbar
- [x] Client component, sticky, scroll detection, theme-aware logo
- [x] Desktop dropdowns (Services, Locations), mobile hamburger drawer
- [x] Active link highlighting, Free Quote CTA, ThemeToggle

### 2.3 — Footer
- [x] 6-column grid (Brand, Quick Links, Services, Locations, Contact Info)
- [x] Social icons (inline SVGs), copyright bar
- [x] NAP schema (JSON-LD in footer)

### 2.4 — Root Layout
- [x] Fonts, ThemeProvider, TopBar + Navbar + Footer
- [x] GA4 script, default metadata with `metadataBase`
- [x] Google verification meta tag

---

## PHASE 3 — PUBLIC PAGES ✅

### 3.1 — Homepage
- [x] HeroSlider (3 slides, auto-advance, arrows, dots, framer-motion)
- [x] Services Grid (4 cards with icons)
- [x] About Section (2-column, bullet points, CTA)
- [x] Stats Row (99%, 5-Star, 100+, 24/7)
- [x] Quick Quote Widget (redirects to /quote with params)
- [x] Cities Grid (8 city cards)
- [x] Testimonials (3 cards, 5-star ratings)
- [x] FAQ Accordion (5 questions, framer-motion)
- [x] CTA Banner
- [x] LocalBusiness + FAQ JSON-LD schemas

### 3.2 — About Page
- [x] Hero with `object-top`, breadcrumb, body text, bullet points
- [x] Vision/Mission/Values tab system
- [x] Stats row, CTA
- [x] Full metadata + OpenGraph

### 3.3 — Services Page
- [x] 8 service cards, 6 feature items, CTA
- [x] Breadcrumb, full metadata + OpenGraph

### 3.4 — Service Detail Pages
- [x] Dynamic route `app/moving-services/[service]/page.tsx` with `generateStaticParams`
- [x] 8 service pages (local-movers, long-distance, residential, commercial, packing, loading, heavy-item, furniture)
- [x] Sidebar with all services links + CTA widget
- [x] Full metadata + OpenGraph per service

### 3.5 — Quote Page
- [x] Full form (4 fieldsets, 11 fields, react-hook-form)
- [x] Suspense boundary for `useSearchParams`
- [x] Sticky sidebar info box, breadcrumb
- [x] Full metadata + OpenGraph

### 3.6 — Success Page
- [x] Green checkmark, phone CTA, return home button
- [x] GA4 `quote_submission` event on mount
- [x] `robots: { index: false }`

### 3.7 — Contact Page
- [x] 3 info cards, contact form (react-hook-form)
- [x] GA4 `contact_form_submitted` event on success
- [x] Breadcrumb, full metadata + OpenGraph

### 3.8 — City Pages (8 pages)
- [x] Dynamic route `app/locations/[city]/page.tsx` with `generateStaticParams`
- [x] All 8 cities with unique 300+ word body text, city-specific FAQs
- [x] Hero, intro, services grid, nearby cities, all-cities links, CTA
- [x] `generateMetadata()` with city-specific SEO
- [x] LocalBusiness + FAQ + Breadcrumb JSON-LD schemas

---

## PHASE 4 — ADMIN SYSTEM ✅

### 4.1 — Authentication
- [x] NextAuth v5 with Credentials provider (`lib/auth/auth.ts`)
- [x] JWT sessions, 24-hour expiry, bcrypt password validation
- [x] Edge-compatible middleware protecting `/admin/*` routes
- [x] Seed script for admin user

### 4.2 — Admin Login
- [x] Standalone dark-themed page, email/password with show/hide toggle
- [x] Error handling, redirect to dashboard on success
- [x] "Back to website" link

### 4.3 — Admin Layout
- [x] Server-side session check, sidebar + content area
- [x] Mobile collapsible sidebar with overlay

### 4.4 — Dashboard
- [x] 4 stat cards (quotes, pending, bookings, messages)
- [x] Recent quotes table with status badges
- [x] Recent messages list with relative timestamps
- ⏳ Recharts charts (line, bar, pie) — enhancement for post-launch

### 4.5 — Bookings Page
- [x] Table with status filter, pagination
- [x] Start/Complete status transitions, call button

### 4.6 — Leads Page
- [x] Table with status/city filters, expandable row details
- [x] Mark Reviewed, Send Quote Email, Convert to Booking (with modal)
- [x] Pagination

### 4.7 — Pricing Page
- [x] Inline editable table, active/inactive toggle
- [x] Save per row with toast notification

### 4.8 — Analytics
- [x] Placeholder page with GA4 link
- ⏳ DB-driven analytics charts — enhancement for post-launch

---

## PHASE 5 — API ROUTES ✅

### 5.1 — Quote API
- [x] POST with Zod validation, pricing lookup, DB save, dual email send

### 5.2 — Contact API
- [x] POST with validation, DB save, admin email notification

### 5.3 — Bookings API
- [x] GET (paginated, filterable), POST (create from quote + email), PATCH, DELETE

### 5.4 — Leads API
- [x] GET (paginated, filterable), PATCH (status update), POST send-quote

### 5.5 — Pricing API
- [x] GET (public), PATCH (admin-only)

---

## PHASE 6 — EMAIL TEMPLATES ✅

- [x] Resend client (`lib/email/resend.ts`)
- [x] Customer Quote Confirmation (branded HTML, price estimate, contact info)
- [x] Admin Quote Notification (full details, click-to-call, admin link)
- [x] Contact Form Notification
- [x] Booking Confirmation
- ⏳ Resend account creation + domain verification — requires account setup

---

## PHASE 7 — SEO IMPLEMENTATION ✅

### 7.1–7.2 — Metadata
- [x] Root metadata with `metadataBase`, title template, OG, robots
- [x] Per-page metadata on all public pages (title, description, canonical, OG)
- [x] Google verification meta tag

### 7.3 — City Data
- [x] Complete data for all 8 cities (slug, meta, body, FAQs, keywords)

### 7.4 — Structured Data
- [x] LocalBusinessSchema (MovingCompany, hasOfferCatalog, areaServed, sameAs)
- [x] FAQSchema (FAQPage type, per-page)
- [x] BreadcrumbSchema (JSON-LD + visible HTML breadcrumb)
- [x] NAP schema in footer

### 7.5 — Technical SEO
- [x] `robots.txt` (blocks /admin/, /api/, /success)
- [x] Dynamic `sitemap.ts` (static pages + 8 cities + 8 services)
- [x] Security headers in `next.config.ts`

### 7.6 — Image Optimization
- [x] All images use `next/image` with AVIF/WebP
- [x] `priority` on hero images, `alt` on all images
- [x] `width`/`height` or `fill`+`sizes` on all images

### 7.7 — Performance
- ⏳ Lighthouse testing — requires live deployment

---

## PHASE 8 — GOOGLE ANALYTICS & SEARCH CONSOLE

### 8.1 — GA4 Integration
- [x] GA4 script in layout with `NEXT_PUBLIC_GA_ID`
- [x] `lib/utils/gtag.ts` helper (pageview, event)
- [x] `quote_submission` event on success page
- [x] `contact_form_submitted` event on contact form success
- ⏳ Phone/email click tracking — enhancement for post-launch

### 8.2 — Google Search Console
- [x] Verification file in `public/`
- [x] Verification meta tag in root metadata
- ⏳ Sitemap submission — requires deployment

### 8.3 — Bing Webmaster Tools
- ⏳ Requires deployment + Bing account

---

## PHASE 9 — LIGHT/DARK MODE ✅

- [x] CSS variables in `:root` and `.dark`
- [x] All components use theme-aware tokens
- [x] ThemeToggle in Navbar
- [x] `next-themes` with system preference detection
- [x] `suppressHydrationWarning`, logo theme switching
- [x] Yellow primary consistent in both modes

---

## PHASE 10 — DEPLOYMENT & LAUNCH

### 10.1 — Pre-Launch Checklist
- [x] All 37 pages/routes render without errors
- [x] All forms validated and submit to API routes
- [x] 14 redirects configured
- [x] All images optimized with next/image
- [x] Dark/light mode works everywhere
- [x] Mobile responsive
- [x] Deployment guide created (`DEPLOYMENT.md`)
- ⏳ Admin login test — requires running PostgreSQL
- ⏳ Lighthouse audit — requires live deployment

### 10.2 — VPS Deployment
- ⏳ All deployment steps documented in `DEPLOYMENT.md`

### 10.3 — Post-Launch SEO
- ⏳ Sitemap submission, GSC, Bing, GA4 verification
