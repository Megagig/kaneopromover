# 🤖 Kaneo Pro Movers — AI Coding Agent Prompts
## Next.js Migration + SEO + Admin Dashboard

> Paste the MASTER CONTEXT before every new coding session.  
> Each prompt is self-contained — give the agent the relevant file(s) before running.  
> Run prompts in order. Each builds on the previous.

---

## 📌 MASTER CONTEXT (Paste this before EVERY prompt session)

```
You are building the Kaneo Pro Movers website — a professional moving company based in Airdrie, Alberta, Canada.

BUSINESS INFO:
- Company: Kaneo Pro Movers
- Phone: +1(587)-378-5954
- Email: info@kaneopromovers.com  
- Address: 1060 Channelside DR, SW, Airdrie, AB, Canada
- Website: https://www.kaneopromovers.com
- Services: Residential Moving, Commercial Moving, Packing/Unpacking, Loading/Unloading, Heavy Item Moving, Furniture Moving, Local Movers, Long Distance Moving
- Cities: Airdrie AB (primary), Calgary AB, Crossfield AB, Carstairs AB, Chestermere AB, Cochrane AB, Okotoks AB, Olds AB (new)

TECH STACK:
- Next.js 14 App Router with TypeScript
- Tailwind CSS (mobile-first, responsive)
- Prisma ORM + PostgreSQL
- NextAuth.js (Credentials provider)
- Resend (email)
- Framer Motion (animations)
- React Hook Form + Zod (forms/validation)
- Recharts (admin charts)
- next-themes (dark/light mode)
- Lucide React (icons)

DESIGN SYSTEM (ClickHouse-inspired from getdesign.md/clickhouse):
- Primary accent: #FFCC00 (golden yellow) — same in light and dark mode
- Light bg: #FFFFFF, Dark bg: #0D0D0D
- Light surface: #F5F5F5, Dark surface: #1A1A1A
- Text light: #111111, Text dark: #F0F0F0
- Border light: #E0E0E0, Border dark: #2E2E2E
- Fonts: Plus Jakarta Sans (headings/display), Inter (body), JetBrains Mono (numbers/mono)
- Buttons: rounded-md, bold text, yellow primary with black text
- Cards: border border-border, rounded-lg, hover:shadow-md transition
- Section padding: py-20 md:py-28
- Max content width: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Animations: subtle fade-in, slide-up on scroll (framer-motion)

GOLDEN RULES:
1. MOBILE FIRST — every component starts with mobile styles, then md: and lg: breakpoints
2. DARK MODE FIRST — every color must work in both dark and light mode using Tailwind dark: prefix
3. SEO BUILT-IN — every page must have generateMetadata(), canonical, JSON-LD schema
4. NO BREAKING CHANGES — preserve all existing content, URLs (with redirects), and functionality
5. TYPESCRIPT STRICT — all components fully typed, no 'any' types
6. ACCESSIBLE — aria labels, semantic HTML, focus states on all interactive elements
```

---

## PHASE 1 PROMPTS — PROJECT SETUP

---

### PROMPT 1.1 — Initialize Next.js Project & Install Dependencies

```
Using the master context above, help me set up the Kaneo Pro Movers Next.js project from scratch.

STEP 1: Run this command and explain each flag:
npx create-next-app@latest kaneopromovers-next --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

STEP 2: After creation, install ALL these dependencies. Show me the exact npm commands:
- @prisma/client prisma
- next-auth@beta  
- resend
- @react-email/components react-email
- bcryptjs @types/bcryptjs
- lucide-react
- next-themes
- clsx tailwind-merge
- @tailwindcss/typography
- framer-motion
- react-hook-form @hookform/resolvers zod
- date-fns
- recharts

STEP 3: Initialize Prisma: npx prisma init

STEP 4: Create the .env.local file with ALL these environment variables (use placeholders where real values are needed):
DATABASE_URL="postgresql://user:password@localhost:5432/kaneopromovers"
NEXTAUTH_URL="https://www.kaneopromovers.com"
NEXTAUTH_SECRET="GENERATE_WITH_OPENSSL"
RESEND_API_KEY="re_REPLACE_ME"
RESEND_FROM_EMAIL="noreply@kaneopromovers.com"
ADMIN_NOTIFICATION_EMAIL="info@kaneopromovers.com"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_SITE_URL="https://www.kaneopromovers.com"
NEXT_PUBLIC_PHONE="+15873785954"
NEXT_PUBLIC_EMAIL="info@kaneopromovers.com"

STEP 5: Add .env.local to .gitignore if not already there.

Show me the exact terminal output to expect at each step.
```

---

### PROMPT 1.2 — Tailwind Config + CSS Variables + Fonts

```
Using the master context above, configure Tailwind CSS and global styles for the Kaneo Pro Movers design system.

FILE 1: tailwind.config.ts
Create a complete Tailwind config that:
- Extends colors with: primary (#FFCC00), primary-hover (#E6B800), background (CSS var), surface (CSS var), surface-2 (CSS var), text-primary (CSS var), text-secondary (CSS var), text-muted (CSS var), border (CSS var), success (#22C55E), error (#EF4444)
- Extends fontFamily with: display (['Plus Jakarta Sans', sans-serif]), body (['Inter', sans-serif]), mono (['JetBrains Mono', monospace])
- Extends animation with: fade-in, slide-up, slide-down (for menu drawers)
- Adds @tailwindcss/typography plugin
- Content paths cover all app/ and components/ directories

FILE 2: app/globals.css
Create complete CSS with:
- @tailwind base/components/utilities imports
- :root variables for light mode (background, surface, surface-2, text-primary, text-secondary, text-muted, border as HSL values)
- .dark variables for dark mode (all same tokens, dark values)
- Base styles: body uses font-body, headings use font-display
- Custom scrollbar styles (thin, yellow thumb)
- Smooth scroll behavior
- Focus ring using yellow primary color

FILE 3: app/layout.tsx
Create the root layout with:
- Import Plus Jakarta Sans (weights: 400, 500, 600, 700, 800) and Inter (weights: 400, 500, 600) via next/font/google
- Import JetBrains Mono (weight: 400, 500) via next/font/google
- Apply fonts as CSS variables: --font-display, --font-body, --font-mono
- ThemeProvider from next-themes wrapping the app (attribute="class", defaultTheme="system", enableSystem)
- suppressHydrationWarning on <html> tag
- lang="en" on <html> tag
- Default metadata object (see SEO phase for full metadata)
- TopBar, Navbar (import placeholders for now)
- children
- Footer (import placeholder)
- Google Analytics script placeholder (G-XXXXXXXXXX)

Show complete file contents for all 3 files.
```

---

### PROMPT 1.3 — Next.js Config (Redirects + Headers + Images)

```
Using the master context above, create the next.config.ts file.

The config must include:

1. IMAGE OPTIMIZATION:
   - remotePatterns for: www.kaneopromovers.com
   - formats: ['image/avif', 'image/webp']
   - deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920]

2. SECURITY HEADERS (applied to all routes):
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: SAMEORIGIN  
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy: geolocation=(), microphone=(), camera=()

3. REDIRECTS (301 — preserve SEO from old URLs):
   - /index.html → / (permanent)
   - /about.html → /about (permanent)
   - /contact.html → /contact (permanent)
   - /quote.html → /quote (permanent)
   - /success.html → /success (permanent)
   - /moving-services.html → /moving-services (permanent)
   - /moving-services-details.html → /moving-services/details (permanent)
   - /airdrie-movers.html → /locations/airdrie (permanent)
   - /calgary-movers.html → /locations/calgary (permanent)
   - /crossfield-movers.html → /locations/crossfield (permanent)
   - /carstairs-movers.html → /locations/carstairs (permanent)
   - /chestermere-movers.html → /locations/chestermere (permanent)
   - /cochrane-movers.html → /locations/cochrane (permanent)
   - /okotoks-movers.html → /locations/okotoks (permanent)

4. TypeScript strict mode in tsconfig.json

Show the complete next.config.ts and updated tsconfig.json.
```

---

### PROMPT 1.4 — Prisma Schema + Seed Script

```
Using the master context above, create the complete Prisma database setup.

FILE 1: prisma/schema.prisma
Create the full schema with these models:
- Admin: id (cuid), email (unique), password (bcrypt hashed), name, role (default: "admin"), createdAt
- Quote: id, bedroomTypeFrom, bedroomTypeTo, movingDate (DateTime), firstName, lastName, email, phone, fromAddress, toAddress, fromCity, toCity, notes (optional), status (enum: PENDING/REVIEWED/QUOTED/BOOKED/COMPLETED/CANCELLED, default PENDING), estimatedPrice (Float optional), source (optional — which city page), createdAt, updatedAt. Has one optional Booking.
- Booking: id, quoteId (unique), relation to Quote, scheduledAt (DateTime), status (enum: CONFIRMED/IN_PROGRESS/COMPLETED/CANCELLED, default CONFIRMED), assignedTo (optional), notes (optional), createdAt, updatedAt
- ContactMessage: id, name, email, phone (optional), subject, message, read (Boolean default false), createdAt
- Pricing: id, label (e.g. "1 Bedroom Apartment"), basePrice (Float), hourlyRate (Float), minHours (Int default 2), isActive (Boolean default true), updatedAt

FILE 2: prisma/seed.ts
Create a seed script that:
- Creates 1 admin user: email="admin@kaneopromovers.com", password="Admin@2024!" (bcrypt hashed), name="Kaneo Admin"
- Creates all 11 pricing tiers:
  - "1 Bedroom Apartment": base $299, hourly $85/hr, min 2hrs
  - "2 Bedroom Apartment": base $399, hourly $95/hr, min 3hrs
  - "3 Bedroom Apartment": base $499, hourly $105/hr, min 4hrs
  - "4 Bedroom Apartment": base $599, hourly $115/hr, min 4hrs
  - "1 Bedroom house": base $349, hourly $90/hr, min 2hrs
  - "2 Bedroom house": base $449, hourly $100/hr, min 3hrs
  - "3 Bedroom house": base $599, hourly $115/hr, min 4hrs
  - "4 Bedroom house": base $749, hourly $130/hr, min 5hrs
  - "1 Bedroom Basement": base $299, hourly $85/hr, min 2hrs
  - "2 Bedroom Basement": base $399, hourly $95/hr, min 3hrs
  - "Commercial": base $799, hourly $150/hr, min 4hrs
- Add seed command to package.json scripts

FILE 3: lib/db/prisma.ts
Create the Prisma client singleton (prevents multiple instances in dev).

Show all 3 files completely.
```

---

## PHASE 2 PROMPTS — LAYOUT COMPONENTS

---

### PROMPT 2.1 — TopBar Component

```
Using the master context above, create components/layout/TopBar.tsx.

This component must:
- Be a Server Component (no 'use client' needed)
- Background: dark navy/black in both modes (bg-gray-900 dark:bg-black)
- Show on md+ screens only (hidden md:flex)
- Layout: flex row, space-between, max-w-7xl mx-auto px-6, py-2

LEFT SIDE:
- Phone link: <a href="tel:+15873785954"> with phone icon (Lucide Phone), text "+1(587)-378-5954", yellow color, onclick GA4 tracking
- Separator: | 
- Email link: <a href="mailto:info@kaneopromovers.com"> with mail icon (Lucide Mail), text "info@kaneopromovers.com", white/gray color

RIGHT SIDE:
- Canada flag image (public/images/flag-canada.png, 20x15px)
- Text "Canada" in white
- Text "Serving Alberta" in yellow (text-primary)

All text: text-sm
All icons: size 14px (h-3.5 w-3.5)
Hover transitions on links: opacity-80 transition

Show the complete TopBar.tsx file.
```

---

### PROMPT 2.2 — Navbar Component (Full with Dropdowns + Mobile)

```
Using the master context above, create components/layout/Navbar.tsx.

This is a 'use client' component. It must be sticky (sticky top-0 z-50) with scroll detection.

STATE:
- isScrolled (boolean) — changes bg when scrolled past 50px
- isMobileOpen (boolean) — mobile menu open/close
- activeDropdown (string | null) — which dropdown is open

DESKTOP LAYOUT:
- Height: h-16
- Background: transparent when at top → bg-background/95 backdrop-blur border-b border-border when scrolled
- Left: Logo image (use next/image, show logo-light in light mode, logo-dark in dark mode using useTheme())
- Center: Navigation links
- Right: ThemeToggle button + "Free Quote" yellow CTA button

NAVIGATION LINKS:
1. Home → /
2. About Us → /about
3. Services (dropdown trigger) → dropdown appears on hover (desktop) or click (mobile)
   Dropdown items: Services(/moving-services), Local Movers, Long Distance Moving, Residential Moving, Commercial Moving, Packing and Unpacking, Loading or Unloading, Heavy Item Moving, Furniture Moving — all link to /moving-services
4. Locations (dropdown trigger)
   Dropdown items: Airdrie(/locations/airdrie), Calgary(/locations/calgary), Cochrane(/locations/cochrane), Chestermere(/locations/chestermere), Okotoks(/locations/okotoks), Crossfield(/locations/crossfield), Carstairs(/locations/carstairs), Olds(/locations/olds)
5. Contact → /contact

Active link: yellow underline (border-b-2 border-primary)
Dropdown: bg-background border border-border rounded-lg shadow-xl, slide down animation

MOBILE LAYOUT:
- Hamburger button (Lucide Menu icon → X icon when open)
- Full-screen drawer slides down from top
- All nav items as stacked links
- Accordion for Services and Locations dropdowns
- "Free Quote" button full-width yellow at bottom of drawer
- Smooth slide animation using framer-motion AnimatePresence

FREE QUOTE BUTTON:
- bg-primary text-black font-semibold px-5 py-2 rounded-md
- hover:bg-primary-hover transition
- href="/quote"

Show the complete Navbar.tsx file with all TypeScript types.
```

---

### PROMPT 2.3 — Footer Component

```
Using the master context above, create components/layout/Footer.tsx.

This is a Server Component.

DESIGN:
- Background: bg-gray-900 dark:bg-black
- Text: text-gray-300, headings text-white
- Accent: text-primary (yellow) for links on hover and key info

TOP SECTION (py-16):
5-column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8):

COLUMN 1 — Brand (lg:col-span-2):
- Logo (logo-light.jpg, white version — or logo-dark.png, 120px wide)
- Company description: "Kaneo Pro Movers offers professional local moving services in Airdrie, Calgary, and surrounding Alberta communities."
- Phone (yellow, with Phone icon): +1(587)-378-5954
- Email: info@kaneopromovers.com
- Social icons row (Facebook, Instagram — placeholder hrefs for now)

COLUMN 2 — Quick Links:
- Heading: "Quick Links" (text-white, font-semibold)
- Links: Home, About Us, Services, Locations, Contact, Get Free Quote
- Each link: hover:text-primary transition text-sm

COLUMN 3 — Our Services:
- Heading: "Our Services"
- All 8 service types listed as links → /moving-services
- text-sm, hover:text-primary

COLUMN 4 — Locations:
- Heading: "Areas We Serve"
- All 8 cities listed as links to their city pages
- text-sm, hover:text-primary

COLUMN 5 — Contact Info:
- Heading: "Contact Info"
- Address with MapPin icon: 1060 Channelside DR, SW, Airdrie, AB, Canada
- Phone with Phone icon: +1(587)-378-5954
- Email with Mail icon: info@kaneopromovers.com
- Hours: Mon–Fri 8am–6pm, Sat 8am–4pm

BOTTOM BAR (border-t border-gray-800, py-6):
- Left: "© 2025 Kaneo Pro Movers. All rights reserved."
- Right: "Serving Airdrie, Calgary & surrounding Alberta communities"
- Both text-sm text-gray-500

Show complete Footer.tsx file.
```

---

### PROMPT 2.4 — ThemeToggle + UI Button Components

```
Using the master context above, create these UI utility components:

FILE 1: components/ui/ThemeToggle.tsx
- 'use client' component using useTheme() from next-themes
- Renders Sun icon (light mode) or Moon icon (dark mode) from lucide-react
- Button: rounded-md p-2, bg-surface hover:bg-surface-2 transition, border border-border
- Tooltip: "Toggle dark mode" (aria-label)
- Handles mounted state to prevent hydration mismatch (show nothing until mounted)

FILE 2: components/ui/Button.tsx
- Reusable button component with variants:
  - primary: bg-primary text-black hover:bg-primary-hover (yellow CTA)
  - secondary: bg-transparent border border-border text-text-primary hover:bg-surface
  - ghost: bg-transparent text-text-primary hover:bg-surface (no border)
  - danger: bg-error text-white hover:bg-red-600
- Sizes: sm (px-3 py-1.5 text-sm), md (px-5 py-2.5), lg (px-8 py-3.5 text-lg)
- Props: variant, size, isLoading (shows spinner), disabled, href (renders as Link if provided), className, all standard button props
- TypeScript: ButtonProps interface, exported

FILE 3: components/ui/Card.tsx
- Reusable card wrapper
- bg-surface border border-border rounded-lg
- hover variant: hover:shadow-md hover:border-primary/30 transition-all duration-200
- Props: className, hover (boolean), children

FILE 4: lib/utils/cn.ts
- Create the cn() utility using clsx + tailwind-merge:
  import { clsx, type ClassValue } from 'clsx'
  import { twMerge } from 'tailwind-merge'
  export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

Show all 4 files completely.
```

---

## PHASE 3 PROMPTS — PUBLIC PAGES

---

### PROMPT 3.1 — Homepage Hero Slider Section

```
Using the master context above, create components/sections/HeroSlider.tsx.

This is a 'use client' component using framer-motion AnimatePresence.

SLIDES DATA (hardcoded):
[
  {
    headline: "KANEO PRO MOVERS",
    subheadline: "Movers With Confidence",
    bg: "/images/hero-1.jpg" (use existing hero image from original site)
  },
  {
    headline: "We Are Reliable and Efficient",
    subheadline: "Moving Company",
    bg: "/images/hero-2.jpg"
  },
  {
    headline: "Professional Movers and Fair Price",
    subheadline: "Your 1st Choice",
    bg: "/images/hero-3.jpg"
  }
]

LAYOUT:
- Full viewport height: min-h-screen or h-[90vh]
- Each slide: relative, overflow-hidden
- Background: next/image with fill, objectFit="cover", priority on first slide
- Dark overlay: absolute inset-0 bg-black/60
- Content: absolute centered, text-center, text-white, z-10

CONTENT PER SLIDE:
- Small label: "Kaneo Pro Movers" in yellow (text-primary), uppercase tracking-widest text-sm font-semibold
- Main headline: text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight
- Sub headline: text-xl md:text-2xl text-gray-200 mt-4
- 3 CTA buttons in a flex-wrap row (justify-center, gap-4, mt-8):
  1. "Send A Direct Email" → mailto:kaneopromovers@gmail.com (ghost/outline style, white border)
  2. "Call +1(587)-378-5954" → tel:+15873785954 (ghost/outline style)
  3. "GET FREE A QUOTE" → /quote (primary yellow button, larger)

SLIDE CONTROLS:
- Auto-advance every 5 seconds (clear interval on manual navigation)
- Prev/Next arrow buttons (left/right sides, semi-transparent black circles)
- Dot indicators at bottom-center (yellow dot = active, gray = inactive)
- AnimatePresence slide transition: x: 100 → x: 0 → x: -100 (slide left/right)

Show complete HeroSlider.tsx with all animations.
```

---

### PROMPT 3.2 — Homepage Full Page Assembly

```
Using the master context above, create the complete app/page.tsx homepage.

This is a Server Component (the page itself). Client child components can be 'use client'.

INCLUDE THESE SECTIONS IN ORDER:

1. HeroSlider (import from components/sections/HeroSlider.tsx) — already built

2. SERVICES GRID SECTION:
   - Heading: "Our Moving Services" with yellow underline accent
   - 4-card grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6)
   - Cards: Residential Moving (Home icon), Commercial Moving (Building icon), Packing & Unpacking (Package icon), Loading/Unloading (Truck icon)
   - Each card: icon in yellow circle, title (h3), 2-sentence description from original site, "Learn More →" link to /moving-services
   - Hover: card lifts, yellow left border appears

3. ABOUT SECTION:
   - 2-column layout (md:grid-cols-2 gap-16 items-center)
   - LEFT: Label "Know About Us" (yellow, uppercase), H2 "What Drives Us To Deliver Excellence!", full body text from original site, 6 bullet points with CheckCircle icons (yellow), "About Us" Button → /about
   - RIGHT: Image (assets/img/about-img.jpg → public/images/about.jpg), use next/image, rounded-2xl with subtle shadow

4. STATS ROW:
   - 4 stats: "99% Customer Satisfaction", "5-Star Rating", "100+ Happy Customers", "24/7 Support"
   - bg-primary (yellow) background section
   - Dark text, each stat: large number + label, centered
   - Icon per stat (Star, ThumbsUp, Users, Clock from lucide-react)

5. QUICK QUOTE WIDGET:
   - bg-surface section with border-t border-b border-border
   - Heading: "Get Your Free Moving Quote"
   - Side-by-side (md:flex): left info text + image, right the mini quote form
   - Mini form fields: "Moving From" dropdown (11 bedroom options), "Moving To" dropdown (same), "Moving Date" date input
   - Button: "Get Free Quote →" (primary yellow, full width on mobile)
   - On submit: redirect to /quote?from=VALUE&to=VALUE&date=VALUE

6. CITY COVERAGE SECTION:
   - Heading: "Cities We Serve"
   - 4-column grid of city cards (grid-cols-2 md:grid-cols-4)
   - Each: city name, "AB" province badge, "View Services →" link to /locations/[city]
   - Cities: Airdrie, Calgary, Crossfield, Carstairs, Chestermere, Cochrane, Okotoks, Olds

7. TESTIMONIALS SECTION:
   - Heading: "We Are 5-Star Moving Company"
   - 3 testimonial cards side by side
   - Each: 5 yellow stars, quote text, customer name, city
   - Use placeholder testimonials (realistic for a moving company)

8. FAQ SECTION:
   - Heading: "Frequently Asked Questions"
   - 5 accordion items (click to expand) using framer-motion AnimatePresence for smooth open/close
   - Questions from SEO plan (how much do movers cost, same-day service, areas served, insurance, how to get quote)

9. CTA BANNER:
   - Full-width bg-primary (yellow) section
   - Text: "Ready To Move? Get Your Free Quote Today!"
   - Subtext: "Serving Airdrie, Calgary, and all of Alberta"
   - Button: "Get Free Quote" (black bg, white text — inverted CTA)

PAGE METADATA (export from this file):
export const metadata: Metadata = {
  title: 'Kaneo Pro Movers | Airdrie & Calgary Moving Company',
  description: 'Trusted moving company in Airdrie and Calgary, AB. Affordable residential, furniture & same-day movers. Call +1(587)-378-5954 for a free quote!',
  openGraph: { title: '...', description: '...', url: 'https://www.kaneopromovers.com/', images: [{ url: '/images/og-home.jpg' }] },
  alternates: { canonical: 'https://www.kaneopromovers.com/' }
}

Also add LocalBusinessSchema and FAQSchema components at the bottom (JSON-LD).

Show the complete app/page.tsx.
```

---

### PROMPT 3.3 — City Data + Reusable City Page Template

```
Using the master context above, create the city data system and reusable city page component.

FILE 1: lib/data/cityData.ts
Create the complete cityData array with ALL 8 cities. Each city object must have:
- slug: string (e.g., 'airdrie')
- city: string (e.g., 'Airdrie')
- province: 'AB'
- metaTitle: string (SEO-optimized, under 60 chars)
- metaDescription: string (SEO-optimized, under 160 chars)
- canonicalUrl: string (full URL)
- h1: string (SEO-optimized heading)
- heroImage: string (path in /images/cities/)
- bodyText: string (unique 300-400 word body content for each city — unique, NOT copy-pasted)
- whyChooseUs: string[] (5 bullet points, can be the same for all cities)
- nearbyAreas: string[] (3-4 nearby cities from the list)
- keywords: string[] (target keywords for each city)
- faq: Array<{ question: string, answer: string }> (5 FAQs per city, city-specific)
- addressLocality: string (same as city)

Include ALL 8 cities: airdrie, calgary, crossfield, carstairs, chestermere, cochrane, okotoks, olds

The bodyText for Airdrie must match the original site text:
"If you're living in Airdrie, and you need quick, affordable and friendly moving, then Kaneo Pro Movers is for you..."

Other city bodytexts should be unique, 300+ words, and contain city-specific keywords.

FILE 2: components/city/CityPage.tsx
Create a fully typed reusable Server Component that accepts a CityData object as prop and renders:
- Hero section: city image (next/image, fill), dark overlay, h1 text, "Ready To Move in [City]?" label, "Get A Quote →" button
- Intro section: 2-column, bodyText left, why-choose-us bullet list right (CheckCircle icons in yellow)
- Services section: same 4 service cards as homepage (Residential, Commercial, Packing, Loading/Unloading) 
- Testimonials: same component as homepage
- Nearby cities: "Also serving near [City]" — links to other city pages
- Internal links section: links to all other cities
- Quote CTA banner

This component accepts: cityData: CityData (the typed city object)

Show both files completely.
```

---

### PROMPT 3.4 — All 8 City Pages + generateMetadata

```
Using the master context above, create all 8 city page files. Each is a Next.js App Router Server Component.

For each city page, the structure is IDENTICAL — only the cityData import changes:

FILE PATTERN (repeat for all 8 cities):
// app/locations/[city]/page.tsx

import { Metadata } from 'next'
import CityPage from '@/components/city/CityPage'
import { cities } from '@/lib/data/cityData'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import FAQSchema from '@/components/seo/FAQSchema'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

const cityData = cities.find(c => c.slug === '[city-slug]')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  alternates: { canonical: cityData.canonicalUrl },
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: cityData.canonicalUrl,
    images: [{ url: cityData.heroImage }],
    locale: 'en_CA',
    type: 'website',
  }
}

export default function [City]MoversPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: cityData.city }]} />
      <LocalBusinessSchema city={cityData.city} />
      <FAQSchema faqs={cityData.faq} />
      <CityPage cityData={cityData} />
    </>
  )
}

CREATE ALL 8 FILES:
- app/locations/airdrie/page.tsx (slug: 'airdrie')
- app/locations/calgary/page.tsx (slug: 'calgary')
- app/locations/crossfield/page.tsx (slug: 'crossfield')
- app/locations/carstairs/page.tsx (slug: 'carstairs')
- app/locations/chestermere/page.tsx (slug: 'chestermere')
- app/locations/cochrane/page.tsx (slug: 'cochrane')
- app/locations/okotoks/page.tsx (slug: 'okotoks')
- app/locations/olds/page.tsx (slug: 'olds')

Show all 8 files.
```

---

### PROMPT 3.5 — Quote Page (Full Form + Price Estimator)

```
Using the master context above, create the complete quote page.

FILE 1: app/quote/page.tsx (Server Component wrapper with metadata)
Metadata:
- title: 'Get a Free Moving Quote | Kaneo Pro Movers Airdrie & Calgary'
- description: 'Request a free quote from Kaneo Pro Movers. Serving Airdrie, Calgary, Crossfield, and all of Alberta. Instant estimate + same-day response.'
- canonical: https://www.kaneopromovers.com/quote
- robots: index: true (this page SHOULD be indexed for "get moving quote airdrie" searches)

FILE 2: components/forms/QuoteForm.tsx ('use client' form component)

FORM FIELDS (using react-hook-form + zod validation):
Section 1 — "About Your Move":
- Moving From (bedroom type): dropdown with 11 options (1 Bedroom Apartment, 2 Bedroom Apartment, 3 Bedroom Apartment, 4 Bedroom Apartment, 1 Bedroom house, 2 Bedroom house, 3 Bedroom house, 4 Bedroom house, 1 Bedroom Basement, 2 Bedroom Basement, Commercial)
- Moving To (bedroom type): same dropdown
- Moving Date: date input (min: today, no past dates)

Section 2 — "Your Details":
- First Name, Last Name (side by side on md+)
- Email address (validated)
- Phone number (validated)

Section 3 — "Addresses":
- From Address (full street address)
- To Address (full street address)
- From City (pre-filled if ?city= param exists)
- To City

Section 4 — "Additional Info":
- Notes/Special requests (textarea, optional)

PRICE ESTIMATOR:
- When "Moving From" bedroom type is selected, fetch /api/pricing to get base price + hourly rate for that type
- Display: "Estimated Price: $299 – $450" (base to base + 2hrs extra)
- Show below the first dropdown with a yellow info box
- Update dynamically as selection changes

SUBMIT BEHAVIOR:
- POST to /api/quote
- Show loading spinner on button
- On success: redirect to /success
- On error: show inline error message in red
- Zod schema validates all required fields before submit

DESIGN:
- 2-column layout on desktop: large form left, sticky info box right
- Info box right: company phone, email, "We'll respond within 2 hours" message, 5-star badge
- Images from original site (quote2.png and quote-img.jpg) used as decorative elements
- All inputs: bg-surface-2 border border-border rounded-md p-3 focus:border-primary focus:ring-1 focus:ring-primary
- Submit button: full-width, primary yellow, "Get My Free Quote →"

Show both files completely.
```

---

### PROMPT 3.6 — Contact, About, Services, Success Pages

```
Using the master context above, create these 4 pages:

FILE 1: app/contact/page.tsx + components/forms/ContactForm.tsx
- Metadata: title "Contact Kaneo Pro Movers | Airdrie & Calgary Movers", canonical /contact
- 3 info cards at top: Location (MapPin), Phone (Phone icon, yellow, click tracking), Email (Mail icon)
- ContactForm: Name, Email, Phone, Subject, Message fields with react-hook-form + zod
- POST to /api/contact on submit → success message inline (no page redirect)
- Page heading: "24/7 Customer Service and Fast Response"

FILE 2: app/about/page.tsx
- Metadata: title "About Kaneo Pro Movers | Airdrie & Calgary Moving Company", canonical /about
- Breadcrumb: Home > About Us
- Hero image (about-img.jpg) with overlay and page title
- "Reliable And Express Moving Services" main heading (H1)
- Full body text from original about.html
- "Why Choose Us" section with the 3 tabs: Our Vision, Our Mission, Our Values
  - Tab system: 'use client' TabGroup component, click to switch
  - Vision text: "The following principles reflect our values..."
  - Mission text: "To provide dependable, efficient, and stress-free moving services..."
  - Values text: "We believe in integrity, respect, and reliability..."
- Stats row (same as homepage stats section)
- CTA → /quote

FILE 3: app/moving-services/page.tsx
- Metadata: title "Moving Services | Residential, Furniture & Local Movers | Kaneo Pro", canonical /moving-services
- Breadcrumb: Home > Services  
- All 8 service cards in a grid (icon, title, description, "Learn More" link)
- "From Start To Finish" section heading
- 6-item features list: Fast & Efficient, Professional Packing, Safe Transportation, Unpacking & Setup, 24/7 Support, Warehouse Storage (each with icon + short description)
- CTA to /quote

FILE 4: app/success/page.tsx
- Metadata: robots: { index: false } (noindex — thank you pages should not be indexed)
- Large CheckCircle icon (green, 80px)
- Heading: "Thank You! We've Received Your Request"
- Body: "Our team will contact you within 2 hours at the number you provided."
- Company phone displayed prominently (click-to-call)
- "Return to Homepage" Button → /
- GA4 conversion event: use useEffect to fire gtag('event', 'quote_submission', ...) on mount

Show all 4 files completely.
```

---

## PHASE 4 PROMPTS — API ROUTES

---

### PROMPT 4.1 — Quote API Route + Email Templates

```
Using the master context above, create the quote API route and its email templates.

FILE 1: app/api/quote/route.ts
POST handler that:
1. Parses and validates request body with this Zod schema:
   { bedroomTypeFrom, bedroomTypeTo, movingDate, firstName, lastName, email, phone, fromAddress, toAddress, fromCity, toCity, notes?, source? }
2. Fetches the Pricing record for bedroomTypeFrom from DB
3. Calculates estimated price: basePrice + (hourlyRate * minHours)
4. Saves Quote to DB with status PENDING
5. Sends customer email (template below)
6. Sends admin notification email (template below)
7. Returns: { success: true, quoteId: string, estimatedPrice: number }

On validation error: return 400 with { error: 'Validation failed', details: zodErrors }
On server error: return 500 with { error: 'Failed to submit quote' }

FILE 2: lib/email/resend.ts
- Initialize Resend client: const resend = new Resend(process.env.RESEND_API_KEY)
- Export sendCustomerQuoteEmail(quote: Quote, estimatedPrice: number): Promise<void>
- Export sendAdminQuoteNotification(quote: Quote, estimatedPrice: number): Promise<void>
- Export sendContactNotification(message: ContactMessage): Promise<void>

The customer email HTML (inline, no external template needed for now):
- Subject: "Your Moving Quote — Kaneo Pro Movers"
- Yellow header bar with logo text "KANEO PRO MOVERS"
- "Hi [firstName]," then quote details table (move type, date, from/to city)
- "Estimated Price: $XXX – $XXX"
- "We'll call you within 2 hours at [phone]"
- Company contact info footer
- Professional HTML email, mobile-friendly

The admin notification email:
- Subject: "🔔 New Quote — [firstName] [lastName] | [fromCity] → [toCity]"
- All form data in a clear table
- "Click to call: [phone]" button
- "View in Admin: https://www.kaneopromovers.com/admin/leads" link

FILE 3: app/api/pricing/route.ts
GET handler (public):
- Returns all active Pricing records from DB
- Used by the quote form frontend for dynamic price estimation

Show all 3 files completely.
```

---

### PROMPT 4.2 — Contact API + Bookings API + Leads API

```
Using the master context above, create the remaining API routes.

FILE 1: app/api/contact/route.ts
POST handler:
- Validate: name, email, phone?, subject, message (all required except phone)
- Save ContactMessage to DB (read: false)
- Send admin notification email via Resend
- Return { success: true }

FILE 2: app/api/bookings/route.ts
GET handler (admin auth required — check session):
- Return all Bookings with related Quote data (include: { quote: true })
- Support query params: ?status=CONFIRMED&page=1&limit=20

POST handler (admin auth required):
- Create Booking from a Quote: { quoteId, scheduledAt, assignedTo?, notes? }
- Update Quote status to BOOKED
- Send booking confirmation email to customer via Resend
- Return created Booking

PATCH handler at app/api/bookings/[id]/route.ts:
- Update status, assignedTo, notes
- Admin auth required
- Return updated Booking

FILE 3: app/api/leads/route.ts
GET handler (admin auth required):
- Return all Quotes with optional filters: ?status=PENDING&city=Airdrie&page=1
- Order by createdAt DESC

PATCH handler at app/api/leads/[id]/route.ts:
- Update Quote status
- Admin auth required

POST handler at app/api/leads/[id]/send-quote/route.ts:
- Send a pricing email to the customer (quote the job)
- Update status to QUOTED

All admin routes must check: const session = await getServerSession(authOptions); if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

Show all files completely.
```

---

## PHASE 5 PROMPTS — AUTHENTICATION

---

### PROMPT 5.1 — NextAuth Setup + Admin Login Page

```
Using the master context above, set up authentication.

FILE 1: lib/auth/authOptions.ts
Configure NextAuth with:
- Credentials provider
- Authorize function: find Admin by email, compare password with bcrypt.compare(), return admin object or null
- Session strategy: 'jwt'
- JWT expiry: 24 hours (maxAge: 24 * 60 * 60)
- Session callback: add user.id and user.role to session
- Pages: signIn: '/admin/login'

FILE 2: app/api/auth/[...nextauth]/route.ts
Standard NextAuth handler:
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth/authOptions'
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

FILE 3: middleware.ts
Protect all /admin/* routes (except /admin/login):
- Use next-auth middleware pattern
- If no session: redirect to /admin/login
- Keep /admin/login public

FILE 4: app/admin/login/page.tsx
Standalone login page (NO Navbar/Footer — admin-only design):
- Full-screen centered layout: bg-background
- Card (max-w-md mx-auto, mt-24): 
  - Logo at top (text "KANEO PRO MOVERS" in yellow or image)
  - "Admin Login" heading
  - Email input (react-hook-form)
  - Password input with show/hide toggle (Eye/EyeOff icons)
  - "Sign In" button (primary yellow, full width)
  - Error message display (wrong credentials)
  - "← Back to website" link at bottom
- On submit: call signIn('credentials', { email, password, redirect: false })
- On success: router.push('/admin/dashboard')
- On error: show "Invalid email or password"

FILE 5: app/admin/layout.tsx
Admin layout (no TopBar/Navbar/Footer from public site):
- Server component: check session, redirect to /admin/login if none
- Render: AdminSidebar + main content area
- Dark sidebar always (even in light mode — professional admin feel)
- Main area: bg-surface

Show all 5 files completely.
```

---

## PHASE 6 PROMPTS — ADMIN DASHBOARD

---

### PROMPT 6.1 — Admin Sidebar + Dashboard Page

```
Using the master context above, create the admin sidebar and dashboard.

FILE 1: components/admin/Sidebar.tsx ('use client')
- Fixed left sidebar: w-64, bg-gray-900, h-screen, overflow-y-auto
- Top: Logo + "Admin Panel" text (small, yellow)
- Navigation items with icons (lucide-react):
  - Dashboard → /admin/dashboard (LayoutDashboard icon)
  - Bookings → /admin/bookings (Calendar icon)
  - Leads & Quotes → /admin/leads (Inbox icon)
  - Pricing → /admin/pricing (Tag icon)
  - Analytics → /admin/analytics (BarChart icon)
  - Settings → /admin/settings (Settings icon, placeholder)
- Active state: bg-primary/10 text-primary border-l-2 border-primary
- Inactive state: text-gray-400 hover:text-white hover:bg-gray-800
- Bottom: current admin name (from session) + Logout button (LogOut icon, text-red-400)
- Mobile: transforms to hidden sidebar with overlay (collapsible)

FILE 2: app/admin/dashboard/page.tsx
Server Component — fetch all data server-side.

DATA TO FETCH:
- totalQuotesThisMonth: count of Quotes where createdAt >= start of current month
- pendingQuotes: count where status = PENDING
- confirmedBookings: count where status = CONFIRMED
- unreadMessages: count of ContactMessage where read = false
- recentQuotes: last 5 Quotes (include fields: firstName, lastName, fromCity, toCity, status, createdAt)
- recentMessages: last 5 ContactMessages

LAYOUT:
- Page heading: "Dashboard" + current date

TOP STATS ROW (4 cards, grid-cols-2 lg:grid-cols-4):
Each StatsCard: icon, large number, label, trend indicator
1. Total Quotes (Inbox icon, blue)
2. Pending Review (Clock icon, yellow)  
3. Confirmed Bookings (Calendar icon, green)
4. Unread Messages (MessageSquare icon, red)

RECENT QUOTES TABLE:
- Columns: Customer Name, From City, To City, Move Date, Status badge, Action
- Status badge colors: PENDING=yellow, REVIEWED=blue, QUOTED=purple, BOOKED=green
- Action: "View" link to /admin/leads

RECENT MESSAGES:
- List of last 5 contact messages with name, subject, time ago (use date-fns formatDistanceToNow)

Show both files completely.
```

---

### PROMPT 6.2 — Leads, Bookings, and Pricing Admin Pages

```
Using the master context above, create the remaining admin pages.

FILE 1: app/admin/leads/page.tsx
Server Component + client-side filter controls.

DATA: Fetch all Quotes from DB, ordered by createdAt DESC.

FILTERS BAR (client component): Status dropdown (All/PENDING/REVIEWED/QUOTED/BOOKED/COMPLETED/CANCELLED), city search input, date range picker. Filters update URL params and page re-fetches.

TABLE COLUMNS:
- Customer (first + last name)
- Contact (email + phone)
- Move Details (bedroomTypeFrom → bedroomTypeTo)
- Moving Date (formatted)
- From City → To City
- Source (which page they came from)
- Status (colored badge with dropdown to change)
- Received (relative time)
- Actions: "View", "Mark Reviewed", "Send Quote Email", "Convert to Booking"

Each row: click to expand inline detail panel (no separate page needed)
"Send Quote Email" button: POST to /api/leads/[id]/send-quote
"Convert to Booking" button: opens a small modal to pick scheduledAt date

FILE 2: app/admin/bookings/page.tsx
Similar table structure for Bookings.

TABLE COLUMNS: Customer, Scheduled Date, Move Type, Status, Assigned To, Actions (Update Status, View Quote)
Filter by status.
"Mark In Progress" / "Mark Completed" status buttons.

FILE 3: app/admin/pricing/page.tsx
Inline editable pricing table.

TABLE: each row = one Pricing tier
Columns: Label, Base Price ($), Hourly Rate ($/hr), Min Hours, Active toggle, Save button
Clicking any price field makes it an input (inline edit)
"Save" button: PATCH /api/pricing/[id]
Active toggle: enables/disables that tier from appearing on the quote form
Show success toast on save (simple fixed-bottom toast notification)

Show all 3 files completely.
```

---

## PHASE 7 PROMPTS — SEO COMPONENTS

---

### PROMPT 7.1 — All JSON-LD Schema Components + Dynamic Sitemap

```
Using the master context above, create all SEO schema components and the dynamic sitemap.

FILE 1: components/seo/LocalBusinessSchema.tsx
Server Component that renders a <script type="application/ld+json"> tag.
Props: city?: string (if provided, renders city-specific schema)
Full MovingCompany schema with:
- name, url, logo, telephone, email, address (dynamic city if prop provided)
- areaServed: all 8 cities
- hasOfferCatalog: all 8 services
- priceRange: "$$"
- openingHoursSpecification: Mon-Fri 8am-6pm, Sat 8am-4pm
- sameAs: social media URLs (placeholder)

FILE 2: components/seo/FAQSchema.tsx
Props: faqs: Array<{ question: string, answer: string }>
Renders FAQPage JSON-LD schema from the faq array.

FILE 3: components/seo/BreadcrumbSchema.tsx
Props: items: Array<{ name: string, url?: string }>
Renders BreadcrumbList JSON-LD. Last item has no url (current page).
Also renders a visible HTML breadcrumb (small nav, gray text, chevron separators) above the page heading.

FILE 4: app/sitemap.ts (Next.js dynamic sitemap)
Export default async function sitemap(): Promise<MetadataRoute.Sitemap>
Returns entries for:
- / (priority 1.0, changeFrequency 'weekly')
- /about (0.7, 'monthly')
- /contact (0.7, 'monthly')
- /quote (0.9, 'monthly')
- /moving-services (0.85, 'monthly')
- /moving-services/details (0.8, 'monthly')
- All 8 /locations/[city] pages (0.95, 'weekly')
lastModified: new Date() for all

FILE 5: public/robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /success
Sitemap: https://www.kaneopromovers.com/sitemap.xml

FILE 6: lib/utils/gtag.ts
GA4 event tracking utilities:
- export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID
- export function pageview(url: string): void
- export function event({ action, category, label, value }: GtagEvent): void
- Type: GtagEvent interface

Show all 6 files completely.
```

---

## PHASE 8 PROMPTS — FINAL INTEGRATION & TESTING

---

### PROMPT 8.1 — Full Page Audit & Final Checks

```
Using the master context above, perform a final integration audit.

Check and fix all of the following across the entire project:

1. METADATA AUDIT — List every page file (app/*/page.tsx) and confirm each has:
   - export const metadata OR export async function generateMetadata()
   - title, description, alternates.canonical, openGraph tags
   - If any are missing, generate the complete metadata for that page

2. DARK MODE AUDIT — Check every component file and confirm:
   - No hardcoded colors (e.g., bg-white, text-gray-900) — all use dark: variant or CSS variables
   - ThemeToggle appears in Navbar
   - Logo switches correctly between light/dark

3. MOBILE AUDIT — Confirm every layout/section has:
   - Started with mobile-first styles (no desktop-only classes without md: prefix)
   - Navbar mobile drawer works
   - All forms are usable on 375px screen
   - Tables in admin have horizontal scroll on mobile

4. FORM VALIDATION — Confirm both QuoteForm and ContactForm:
   - Show inline error messages per field
   - Disable submit button while loading
   - Clear form and show success message after submission
   - Handle network errors gracefully

5. REDIRECTS TEST — List all 14 redirect rules from next.config.ts and confirm each source URL correctly maps to its destination

6. IMAGE OPTIMIZATION — Confirm:
   - All <Image> components have alt, width/height or fill+sizes
   - Hero images have priority={true}
   - No raw <img> tags anywhere (use next/image)

7. ACCESSIBILITY — Confirm:
   - All interactive elements have aria-label or visible label
   - Color contrast ratio meets WCAG AA (yellow #FFCC00 on black = passes, yellow on white = check)
   - Tab order is logical
   - Form inputs have associated labels

8. ENVIRONMENT VARIABLES — List every env variable used in the project and confirm:
   - All NEXT_PUBLIC_ vars are safe (not secret)
   - All secret vars (DATABASE_URL, RESEND_API_KEY, NEXTAUTH_SECRET) are NOT prefixed with NEXT_PUBLIC_
   - .env.local is in .gitignore

For each issue found, provide the exact fix.
```

---

### PROMPT 8.2 — Deployment Setup (VPS + Nginx + PM2 + SSL)

```
Using the master context above, provide complete step-by-step deployment instructions for a VPS (DigitalOcean or Hetzner Ubuntu 22.04).

Walk me through EVERY step as if I am a beginner:

STEP 1: Server preparation
- Update system: sudo apt update && sudo apt upgrade -y
- Install Node.js 20 (via nvm, explain what nvm is)
- Install PM2 globally: npm install -g pm2
- Install Nginx: sudo apt install nginx -y
- Install Certbot for SSL: sudo apt install certbot python3-certbot-nginx -y

STEP 2: PostgreSQL setup
- Install PostgreSQL: sudo apt install postgresql postgresql-contrib -y
- Create database user and database for kaneopromovers
- Set DATABASE_URL in production

STEP 3: Deploy the app
- Clone repo (or upload via scp/rsync)
- Install dependencies: npm install
- Create .env.local with all production values (explain each one)
- Run: npx prisma db push
- Run: npx prisma db seed (to create admin user)
- Build: npm run build
- Start with PM2: pm2 start npm --name "kaneopromovers" -- start
- Save PM2 config: pm2 save && pm2 startup

STEP 4: Nginx config
- Create Nginx site config at /etc/nginx/sites-available/kaneopromovers
- Reverse proxy to localhost:3000
- Handle www and non-www (redirect www → non-www or vice versa — pick one)
- Enable the site: sudo ln -s ... && sudo nginx -t && sudo systemctl reload nginx

STEP 5: SSL with Let's Encrypt
- Run: sudo certbot --nginx -d kaneopromovers.com -d www.kaneopromovers.com
- Confirm auto-renewal: sudo certbot renew --dry-run

STEP 6: Post-deployment verification
- Visit https://www.kaneopromovers.com — confirm it loads
- Test https://www.kaneopromovers.com/airdrie-movers.html → should redirect to /locations/airdrie
- Test admin login at /admin/login
- Submit a test quote form — confirm email arrives
- Run Lighthouse audit on live URL

Show exact terminal commands for every step. Explain what each command does.
```

---

## 📋 MANUAL STEPS (Cannot be automated — must do yourself)

### M.1 — Resend Domain Verification
1. Sign up at https://resend.com
2. Go to Domains → Add Domain → enter `kaneopromovers.com`
3. Add the DNS records Resend provides (TXT + MX records) to your domain registrar
4. Wait for verification (up to 24 hours)
5. Copy your API key → add to `.env.local` as `RESEND_API_KEY`

### M.2 — Google Analytics 4
1. Go to https://analytics.google.com
2. Create account: "Kaneo Pro Movers", property: "kaneopromovers.com", timezone: Edmonton (MT), currency: CAD
3. Choose Web → enter https://www.kaneopromovers.com
4. Copy Measurement ID (G-XXXXXXXXXX)
5. Replace `G-XXXXXXXXXX` in `.env.local` with your real ID
6. Redeploy

### M.3 — Google Search Console
1. Go to https://search.google.com/search-console
2. Add property → URL prefix → https://www.kaneopromovers.com
3. Verify via HTML file (google3f079748702b6260.html is already in public/)
4. Submit sitemap: enter `sitemap.xml`
5. Check Coverage tab after 48 hours

### M.4 — Google Business Profile
1. Go to https://business.google.com
2. Business name: Kaneo Pro Movers
3. Category: Moving Company
4. Service area: Airdrie, Calgary, Crossfield, Carstairs, Chestermere, Cochrane, Olds (no physical storefront needed)
5. Add phone: +1(587)-378-5954, website: https://www.kaneopromovers.com
6. Complete verification (phone or postcard)
7. Add 10+ photos and full business description

### M.5 — Replace ALL Placeholders in Deployed Code
Search the entire codebase for these strings and replace with real values:
- `G-XXXXXXXXXX` → your real GA4 Measurement ID
- `re_REPLACE_ME` → your real Resend API key
- `GENERATE_WITH_OPENSSL` → run `openssl rand -base64 32` and use that output
- `https://www.facebook.com/kaneopromovers` → real Facebook URL (or remove if not set up)
- `admin@kaneopromovers.com` + `Admin@2024!` → change in seed script before running in production

### M.6 — Change Default Admin Password
After deployment, immediately log into /admin/login with the seeded credentials (admin@kaneopromovers.com / Admin@2024!) and update the password. Add a "Change Password" form to /admin/settings.
```
