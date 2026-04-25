# 🚀 Kaneo Pro Movers — Comprehensive SEO Implementation Plan
**Website:** https://www.kaneopromovers.com  
**Stack:** Static HTML/CSS/JS + Node.js/Express server  
**Goal:** Rank on Google Page 1 for moving-related keywords in Airdrie, Calgary, and surrounding Alberta cities

---

## 📋 TARGET KEYWORDS

| Keyword | Priority |
|---|---|
| movers near me | 🔴 High |
| airdrie moving company | 🔴 High |
| calgary moving company | 🔴 High |
| local movers airdrie | 🔴 High |
| local movers calgary | 🔴 High |
| moving companies near me | 🔴 High |
| affordable movers airdrie | 🟡 Medium |
| affordable movers calgary | 🟡 Medium |
| airdrie movers | 🔴 High |
| calgary movers | 🔴 High |
| furniture movers airdrie | 🟡 Medium |
| same day movers airdrie | 🟡 Medium |
| residential movers airdrie | 🟡 Medium |
| residential movers calgary | 🟡 Medium |
| cheap movers near me | 🟡 Medium |

## 📍 TARGET LOCAL SEO CITIES
- Airdrie, AB *(Primary)*
- Calgary, AB *(Primary)*
- Crossfield, AB
- Carstairs, AB
- Chestermere, AB
- Cochrane, AB
- Olds, AB

---

## PHASE 1 — FOUNDATION & TECHNICAL AUDIT
> **Goal:** Fix all technical issues that prevent Google from crawling and indexing the site properly.  
> **Timeline:** Week 1  
> **⚠️ No visual changes to the site — all pages must remain fully functional**

### 1.1 — Project Setup & Audit
- [ ] Clone the repo locally: `git clone https://github.com/lloydweb/kaneopromovers`
- [ ] Run `npm install` and `npm run dev` to confirm all pages load without errors
- [ ] Audit every page in the browser: `index.html`, `about.html`, `contact.html`, `quote.html`, `success.html`, `moving-services.html`, `moving-services-details.html`, `airdrie-movers.html`, `calgary-movers.html`, `crossfield-movers.html`, `carstairs-movers.html`, `chestermere-movers.html`, `cochrane-movers.html`, `okotoks-movers.html`
- [ ] Note any broken links, missing images, or console errors on each page
- [ ] Confirm the CNAME file contains `www.kaneopromovers.com`

### 1.2 — robots.txt (MISSING — must create)
- [ ] Create `robots.txt` in the project root with:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.kaneopromovers.com/sitemap.xml
  Disallow: /success.html
  ```
- [ ] Serve `robots.txt` statically via `server.js` (it should be auto-served if Express serves static files from root)
- [ ] Verify it is accessible at `https://www.kaneopromovers.com/robots.txt` after deployment

### 1.3 — Sitemap (INCOMPLETE — must fix)
> Current sitemap only lists 4 pages. All 14+ pages must be included.
- [ ] Update `sitemap.xml` to include ALL pages:
  - `/` (index.html)
  - `/index.html`
  - `/about.html`
  - `/contact.html`
  - `/quote.html`
  - `/moving-services.html`
  - `/moving-services-details.html`
  - `/airdrie-movers.html`
  - `/calgary-movers.html`
  - `/crossfield-movers.html`
  - `/carstairs-movers.html`
  - `/chestermere-movers.html`
  - `/cochrane-movers.html`
  - `/okotoks-movers.html`
- [ ] Set `<priority>` values: `1.00` for homepage, `0.90` for city pages, `0.80` for service pages, `0.70` for about/contact
- [ ] Set `<changefreq>` values: `weekly` for homepage, `monthly` for static pages
- [ ] Update all `<lastmod>` dates to today's date
- [ ] Validate sitemap at https://www.xml-sitemaps.com/validate-xml-sitemap.html

### 1.4 — Meta Tags Audit (All Pages)
> Check each HTML file's `<head>` section for these critical tags:
- [ ] Verify `<title>` tag exists and is under 60 characters on every page
- [ ] Verify `<meta name="description">` exists and is under 160 characters on every page
- [ ] Verify `<meta name="viewport" content="width=device-width, initial-scale=1">` exists on every page
- [ ] Verify `<html lang="en">` is set on every page
- [ ] Verify there are NO duplicate `<title>` tags on any page

### 1.5 — Canonical Tags (All Pages)
- [ ] Add `<link rel="canonical" href="https://www.kaneopromovers.com/PAGE_NAME.html">` to every page's `<head>`
- [ ] Homepage canonical should point to `https://www.kaneopromovers.com/` (not `/index.html`)
- [ ] Confirm no two pages point to the same canonical URL

### 1.6 — Heading Structure Audit (All Pages)
- [ ] Verify each page has exactly ONE `<h1>` tag
- [ ] Ensure `<h1>` contains the primary keyword for that page
- [ ] Verify heading hierarchy: `h1 → h2 → h3` (no skipping levels)
- [ ] Check that `<h1>` is not used for decorative elements like the logo

### 1.7 — Image Alt Tags (All Pages)
- [ ] Audit every `<img>` tag across all pages
- [ ] Add descriptive `alt` text to every image (e.g., `alt="Kaneo Pro Movers truck in Airdrie AB"`)
- [ ] Compress any images larger than 200KB using https://squoosh.app
- [ ] Add `width` and `height` attributes to all `<img>` tags to prevent layout shift

### 1.8 — Page Speed & Core Web Vitals
- [ ] Run all pages through Google PageSpeed Insights: https://pagespeed.web.dev
- [ ] Target score: 85+ on Mobile, 90+ on Desktop
- [ ] Fix any render-blocking scripts (move `<script>` tags to bottom of `<body>`)
- [ ] Add `loading="lazy"` attribute to all images below the fold
- [ ] Minify CSS files in the `assets/` folder if not already minified
- [ ] Add `<link rel="preconnect">` tags for any external fonts or CDNs used

### 1.9 — HTTPS & Security Headers (server.js)
- [ ] Confirm the live site uses HTTPS (check padlock in browser)
- [ ] Add security headers in `server.js`:
  ```js
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  ```

---

## PHASE 2 — ON-PAGE SEO OPTIMIZATION
> **Goal:** Optimize every page's content and metadata for the target keywords.  
> **Timeline:** Week 1–2  
> **⚠️ Text changes only — no layout or style changes**

### 2.1 — Homepage (`index.html`)
**Primary Keyword:** `airdrie moving company` + `calgary moving company`
- [ ] Set `<title>` to: `Kaneo Pro Movers | Airdrie & Calgary Moving Company`
- [ ] Set `<meta name="description">` to: `Kaneo Pro Movers — your trusted moving company in Airdrie and Calgary, AB. Affordable, reliable residential and furniture movers. Get a free quote today!`
- [ ] Ensure `<h1>` contains "Airdrie Moving Company" or "Moving Company in Airdrie & Calgary"
- [ ] Naturally include these keywords in body text: `airdrie moving company`, `calgary moving company`, `local movers`, `moving companies near me`, `movers near me`
- [ ] Add a short intro paragraph mentioning Airdrie, AB and Calgary, AB by name
- [ ] Add internal links to: `/airdrie-movers.html`, `/calgary-movers.html`, `/moving-services.html`, `/quote.html`
- [ ] Add Open Graph meta tags for social sharing:
  ```html
  <meta property="og:title" content="Kaneo Pro Movers | Airdrie & Calgary Moving Company">
  <meta property="og:description" content="Trusted movers in Airdrie and Calgary, AB. Affordable, reliable moving services.">
  <meta property="og:url" content="https://www.kaneopromovers.com/">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://www.kaneopromovers.com/assets/images/og-image.jpg">
  ```

### 2.2 — Airdrie City Page (`airdrie-movers.html`)
**Primary Keyword:** `airdrie movers` + `local movers airdrie`
- [ ] Set `<title>` to: `Airdrie Movers | Local Moving Company in Airdrie, AB | Kaneo Pro`
- [ ] Set `<meta name="description">` to: `Looking for affordable airdrie movers? Kaneo Pro offers local, residential, furniture, and same-day moving services in Airdrie, AB. Call for a free quote!`
- [ ] Ensure `<h1>` is: `Airdrie Movers — Trusted Local Moving Company`
- [ ] Add `<h2>` sections targeting: `affordable movers airdrie`, `same day movers airdrie`, `residential movers airdrie`, `furniture movers airdrie`
- [ ] Body text must naturally mention: Airdrie, AB, local movers, affordable movers, furniture movers, same day, residential
- [ ] Add a "Service Areas" section listing: Airdrie, Crossfield, Carstairs, Cochrane, Calgary
- [ ] Add a link back to the homepage and to `/quote.html`

### 2.3 — Calgary City Page (`calgary-movers.html`)
**Primary Keyword:** `calgary movers` + `calgary moving company`
- [ ] Set `<title>` to: `Calgary Movers | Trusted Calgary Moving Company | Kaneo Pro`
- [ ] Set `<meta name="description">` to: `Kaneo Pro is your reliable calgary moving company. We offer local, residential, and affordable movers in Calgary, AB. Get a free moving quote today!`
- [ ] Ensure `<h1>` is: `Calgary Movers — Reliable Moving Company in Calgary, AB`
- [ ] Add `<h2>` sections targeting: `residential movers calgary`, `affordable movers calgary`, `local movers calgary`
- [ ] Body text must naturally mention: Calgary, AB, moving company, local movers, cheap movers
- [ ] Add a "Service Areas" section linking to other city pages

### 2.4 — Other City Pages (Crossfield, Carstairs, Chestermere, Cochrane, Okotoks)
> Repeat for each city page:
- [ ] `crossfield-movers.html`: Title `Crossfield Movers | Kaneo Pro Moving Company` + unique body content about Crossfield, AB
- [ ] `carstairs-movers.html`: Title `Carstairs Movers | Kaneo Pro Moving Company` + unique body content about Carstairs, AB
- [ ] `chestermere-movers.html`: Title `Chestermere Movers | Kaneo Pro Moving Company` + unique body content about Chestermere, AB
- [ ] `cochrane-movers.html`: Title `Cochrane Movers | Kaneo Pro Moving Company` + unique body content about Cochrane, AB
- [ ] `okotoks-movers.html`: Title `Okotoks Movers | Kaneo Pro Moving Company` + unique body content about Okotoks, AB
- [ ] Each city page must have UNIQUE content (not copy-pasted from another city page)
- [ ] Each city page must internally link back to `index.html`, `airdrie-movers.html`, `calgary-movers.html`

### 2.5 — About Page (`about.html`)
- [ ] Set `<title>` to: `About Kaneo Pro Movers | Airdrie & Calgary Moving Company`
- [ ] Set `<meta name="description">` to: `Learn about Kaneo Pro Movers — your friendly, experienced local moving company serving Airdrie, Calgary, and surrounding Alberta communities.`
- [ ] Mention service areas (all 7 cities) naturally in the body text

### 2.6 — Contact Page (`contact.html`)
- [ ] Set `<title>` to: `Contact Kaneo Pro Movers | Airdrie & Calgary Movers`
- [ ] Set `<meta name="description">` to: `Contact Kaneo Pro Movers for a free moving quote in Airdrie, Calgary, and surrounding AB cities. Call us or fill out our form today.`
- [ ] Ensure the contact page shows: full business name, phone number, email, and service area

### 2.7 — Quote Page (`quote.html`)
- [ ] Set `<title>` to: `Get a Free Moving Quote | Kaneo Pro Movers Airdrie & Calgary`
- [ ] Set `<meta name="description">` to: `Request a free quote from Kaneo Pro Movers — serving Airdrie, Calgary, Crossfield, Carstairs, Cochrane, and more in Alberta.`

### 2.8 — Services Pages
- [ ] `moving-services.html`: Title `Moving Services | Residential, Furniture & Local Movers | Kaneo Pro`
- [ ] `moving-services-details.html`: Title `Moving Service Details | Kaneo Pro Movers Airdrie & Calgary`
- [ ] Ensure services pages link to all city pages

---

## PHASE 3 — LOCAL SEO & STRUCTURED DATA
> **Goal:** Dominate local searches and appear in Google Maps / Local Pack results.  
> **Timeline:** Week 2–3

### 3.1 — Google Business Profile (GBP)
> ⚠️ This is done OUTSIDE the codebase — manual setup required.
- [ ] Go to https://business.google.com and sign in with a Google account
- [ ] Click "Add your business" and enter: **Kaneo Pro Movers**
- [ ] Set business category to: **Moving Company**
- [ ] Add service area cities: Airdrie AB, Calgary AB, Crossfield AB, Carstairs AB, Chestermere AB, Cochrane AB, Olds AB
- [ ] Add business phone number
- [ ] Add website URL: `https://www.kaneopromovers.com`
- [ ] Complete Google's verification process (postcard or phone)
- [ ] Upload at least 10 high-quality photos (truck, team, moves in progress)
- [ ] Write a business description using keywords: "moving company", "airdrie movers", "calgary movers", "local movers", "residential movers", "affordable"
- [ ] Add business hours
- [ ] Add all services: Residential Moving, Furniture Moving, Same-Day Moving, Local Moving
- [ ] Confirm NAP (Name, Address, Phone) is IDENTICAL on GBP and website

### 3.2 — NAP Consistency on Website
- [ ] Add NAP (Name, Address, Phone) in the footer of EVERY page in consistent format:
  ```
  Kaneo Pro Movers
  Airdrie, AB
  Phone: [PHONE NUMBER]
  ```
- [ ] Ensure the phone number format is consistent everywhere (e.g., always `(403) 555-0000`)
- [ ] Ensure business name is always spelled "Kaneo Pro Movers" (never abbreviated differently)

### 3.3 — LocalBusiness JSON-LD Schema (Homepage + All City Pages)
- [ ] Add JSON-LD structured data to `index.html`:
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "name": "Kaneo Pro Movers",
    "url": "https://www.kaneopromovers.com",
    "logo": "https://www.kaneopromovers.com/assets/images/logo.png",
    "description": "Trusted moving company serving Airdrie, Calgary, and surrounding Alberta cities.",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Airdrie",
      "addressRegion": "AB",
      "addressCountry": "CA"
    },
    "areaServed": [
      {"@type": "City", "name": "Airdrie"},
      {"@type": "City", "name": "Calgary"},
      {"@type": "City", "name": "Crossfield"},
      {"@type": "City", "name": "Carstairs"},
      {"@type": "City", "name": "Chestermere"},
      {"@type": "City", "name": "Cochrane"},
      {"@type": "City", "name": "Olds"}
    ],
    "sameAs": [
      "https://www.facebook.com/kaneopromovers",
      "https://www.instagram.com/kaneopromovers"
    ]
  }
  </script>
  ```
- [ ] Add city-specific JSON-LD to `airdrie-movers.html` with `addressLocality: "Airdrie"`
- [ ] Add city-specific JSON-LD to `calgary-movers.html` with `addressLocality: "Calgary"`
- [ ] Add city-specific JSON-LD to all other city pages
- [ ] Validate all schema at https://validator.schema.org

### 3.4 — FAQ Schema (Homepage & Service Pages)
- [ ] Add FAQ section to `index.html` with common questions:
  - "How much do movers cost in Airdrie?"
  - "Do you offer same-day moving in Airdrie?"
  - "What areas do you serve?"
  - "Are you insured and licensed?"
- [ ] Wrap FAQ in JSON-LD `FAQPage` schema
- [ ] Add FAQ section and schema to `airdrie-movers.html` and `calgary-movers.html`

### 3.5 — Review Schema
- [ ] If the business has Google reviews, add `AggregateRating` to the LocalBusiness schema:
  ```json
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47"
  }
  ```

### 3.6 — Olds, AB City Page (MISSING — must create)
> Olds, AB is a target city but there is no `olds-movers.html` page in the repo.
- [ ] Create `olds-movers.html` using the same layout/template as other city pages
- [ ] Set title: `Olds Movers | Moving Company in Olds, AB | Kaneo Pro`
- [ ] Write unique content about moving services in Olds, AB
- [ ] Add to sitemap and internal links

---

## PHASE 4 — GOOGLE ANALYTICS & SEARCH CONSOLE SETUP
> **Goal:** Track all traffic and measure SEO performance.  
> **Timeline:** Week 2 (parallel with Phase 3)  
> **⚠️ Requires a Google Account**

### 4.1 — Google Analytics 4 (GA4) Setup
**Step-by-step for beginners:**
- [ ] Go to https://analytics.google.com and sign in with a Google account
- [ ] Click **"Start measuring"**
- [ ] **Account Name:** `Kaneo Pro Movers`
- [ ] **Property Name:** `kaneopromovers.com`
- [ ] Set **Reporting time zone:** `(GMT-07:00) Mountain Time – Calgary`
- [ ] Set **Currency:** `Canadian Dollar (CAD)`
- [ ] Click **"Next"** → Select **"Web"** as your platform
- [ ] Enter website URL: `https://www.kaneopromovers.com`
- [ ] Click **"Create stream"**
- [ ] Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`)
- [ ] Add this snippet to the `<head>` of EVERY HTML page (replace `G-XXXXXXXXXX` with your real ID):
  ```html
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  ```
- [ ] Confirm this snippet is added to ALL 14 HTML pages in the project

### 4.2 — GA4 Conversion Tracking Setup
> Track when someone submits the quote form or visits the success page.
- [ ] In GA4, go to **Configure → Events → Create Event**
- [ ] Create event: `quote_form_submitted` — trigger when user visits `/success.html`
- [ ] In GA4, go to **Configure → Conversions** and mark `quote_form_submitted` as a conversion
- [ ] Create event: `phone_click` — trigger when user clicks the phone number link (add `onclick="gtag('event', 'phone_click')"` to any `<a href="tel:...">` links)
- [ ] Create event: `contact_form_submitted` — for any contact page form

### 4.3 — Google Search Console (GSC) Setup
**Step-by-step for beginners:**
- [ ] Go to https://search.google.com/search-console and sign in
- [ ] Click **"Add property"**
- [ ] Choose **"URL prefix"** and enter: `https://www.kaneopromovers.com`
- [ ] The file `google3f079748702b6260.html` is already in the repo — this verifies ownership
- [ ] Click **"Verify"** (choose HTML file method)
- [ ] Once verified, click **"Sitemaps"** in the left sidebar
- [ ] Enter `sitemap.xml` and click **"Submit"**
- [ ] Wait 24–48 hours for Google to crawl the site
- [ ] Check **"Coverage"** tab for any indexing errors
- [ ] Check **"Core Web Vitals"** tab for performance issues

### 4.4 — Link GA4 to Google Search Console
- [ ] In GA4, go to **Admin → Property Settings → Search Console Links**
- [ ] Click **"Link"** and connect your Search Console property
- [ ] This allows you to see keyword rankings directly inside GA4

### 4.5 — Google Tag Manager (Optional but recommended)
- [ ] Go to https://tagmanager.google.com and create an account for `kaneopromovers.com`
- [ ] Create a new **Container** for the website
- [ ] Install GTM code in all HTML pages (replace the direct GA4 snippet)
- [ ] Manage all tracking tags through GTM without touching code again

### 4.6 — Bing Webmaster Tools
- [ ] Go to https://www.bing.com/webmasters and sign in
- [ ] Add site: `https://www.kaneopromovers.com`
- [ ] Verify ownership and submit sitemap
- [ ] This captures searches from Bing/Microsoft Edge users

---

## PHASE 5 — CONTENT & LINK BUILDING
> **Goal:** Build authority through quality content and backlinks.  
> **Timeline:** Week 3–8 (ongoing)

### 5.1 — Content Quality Audit
- [ ] Each city page must have at minimum 400 words of unique content
- [ ] Check that no two city pages have identical or near-identical body text (duplicate content penalizes SEO)
- [ ] Rewrite any thin or duplicate city page content with unique, helpful text about that specific city

### 5.2 — Internal Linking Strategy
- [ ] Every city page must link to at least 3 other city pages
- [ ] Every city page must link to the homepage and quote page
- [ ] The homepage must link to ALL city pages
- [ ] Use keyword-rich anchor text (e.g., `<a href="/airdrie-movers.html">Airdrie movers</a>`)
- [ ] Services pages must link to relevant city pages

### 5.3 — Local Citations & Directory Listings
> These are external sites where you list your business — critical for Local SEO.
- [ ] Submit to **Yelp Canada**: https://biz.yelp.ca
- [ ] Submit to **Yellow Pages Canada**: https://www.yellowpages.ca
- [ ] Submit to **Canada411**: https://www.canada411.ca
- [ ] Submit to **Better Business Bureau (BBB)**: https://www.bbb.org
- [ ] Submit to **Homestars** (local services Canada): https://homestars.com
- [ ] Submit to **Houzz** (if applicable): https://www.houzz.com
- [ ] Submit to **Facebook Business Page**: https://www.facebook.com/business
- [ ] Ensure NAP is IDENTICAL on all directory listings and website

### 5.4 — Review Generation Strategy
> Reviews are critical for Google Local Pack ranking.
- [ ] Set up a Google review link (found in your GBP dashboard under "Get more reviews")
- [ ] After each successful move, send customers a link to leave a Google review
- [ ] Respond to ALL reviews (positive and negative) within 48 hours
- [ ] Target: 10+ reviews in first 3 months, 4.5+ average rating

### 5.5 — Social Media Profiles (Local Signals)
- [ ] Create/claim Facebook page: `facebook.com/kaneopromovers` — add website link
- [ ] Create Instagram account: `instagram.com/kaneopromovers` — add website link in bio
- [ ] Add social links to website footer
- [ ] Post locally targeted content weekly (before/after move photos, tips, local references)

### 5.6 — Blog / Content Creation (Optional but powerful)
- [ ] Add a `blog/` directory to the project
- [ ] Create blog post: `how-to-choose-a-moving-company-in-airdrie-ab.html`
- [ ] Create blog post: `moving-checklist-calgary.html`
- [ ] Create blog post: `best-neighborhoods-in-airdrie-for-families.html`
- [ ] Each post must be 600+ words and target a long-tail keyword

---

## PHASE 6 — PERFORMANCE MONITORING & ONGOING SEO
> **Goal:** Track rankings and continuously improve.  
> **Timeline:** Week 4 onwards (monthly)

### 6.1 — Rank Tracking Setup
- [ ] Sign up for a free rank tracker: **Google Search Console** (free) or **Ubersuggest** (free tier)
- [ ] Add all 15 target keywords to tracking
- [ ] Record baseline positions before any SEO changes
- [ ] Check rankings weekly for first 3 months, monthly after

### 6.2 — Monthly SEO Audit Checklist
- [ ] Check Google Search Console for new crawl errors each month
- [ ] Check for any new 404 (broken page) errors and fix them
- [ ] Review GA4 for top traffic pages and top traffic sources
- [ ] Review which keywords are getting impressions in Search Console
- [ ] Add/update content on any page getting impressions but low click-through rate (CTR)
- [ ] Check Core Web Vitals report monthly

### 6.3 — Backlink Monitoring
- [ ] Sign up for **Google Search Console** links report (free)
- [ ] Optionally use **Ahrefs** or **Semrush** free tier to monitor backlinks
- [ ] Disavow any spammy links if needed (rare)

### 6.4 — Competitor Analysis
- [ ] Identify top 3 competitors ranking for `airdrie moving company`
- [ ] Analyze their pages: content length, keywords used, number of reviews, backlinks
- [ ] Improve Kaneo Pro pages to be more thorough than competitors

### 6.5 — Ongoing Content Updates
- [ ] Update city pages with seasonal content (e.g., "winter moving tips in Airdrie")
- [ ] Update `<lastmod>` dates in sitemap when pages are updated
- [ ] Resubmit sitemap in Google Search Console after major updates

---

## 📊 SUCCESS METRICS

| Metric | 1-Month Goal | 3-Month Goal | 6-Month Goal |
|---|---|---|---|
| Google Search Console - Indexed Pages | 14/14 pages | 14/14 pages | 14/14 pages |
| Organic Clicks/Month | 50+ | 200+ | 500+ |
| Google ranking - "airdrie movers" | Top 20 | Top 10 | Top 5 |
| Google ranking - "calgary movers" | Top 30 | Top 15 | Top 10 |
| Google Business Profile Views | 100+ | 300+ | 700+ |
| Total Google Reviews | 5+ | 20+ | 50+ |
| Website PageSpeed Score (Mobile) | 80+ | 85+ | 90+ |

---

## 🔧 TOOLS CHECKLIST (All Free)

- [ ] **Google Search Console** — https://search.google.com/search-console
- [ ] **Google Analytics 4** — https://analytics.google.com
- [ ] **Google PageSpeed Insights** — https://pagespeed.web.dev
- [ ] **Google Business Profile** — https://business.google.com
- [ ] **Schema Validator** — https://validator.schema.org
- [ ] **Sitemap Validator** — https://www.xml-sitemaps.com/validate-xml-sitemap.html
- [ ] **Image Compressor** — https://squoosh.app
- [ ] **Ubersuggest (free)** — https://neilpatel.com/ubersuggest/
- [ ] **Bing Webmaster Tools** — https://www.bing.com/webmasters
