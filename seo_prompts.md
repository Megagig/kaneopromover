# 🤖 Kaneo Pro Movers — AI Coding Agent SEO Prompts
**Website:** https://www.kaneopromovers.com  
**Repo:** https://github.com/lloydweb/kaneopromovers  
**Stack:** Static HTML/CSS/JS + Node.js/Express  

> These prompts are designed to be pasted directly into an AI coding agent (Claude, Cursor, GitHub Copilot, etc.).  
> **Always provide the agent with the current file contents before running each prompt.**  
> **Every prompt includes a "DO NOT BREAK" instruction to preserve all existing functionality.**

---

## 📌 MASTER CONTEXT (Paste this before every prompt session)

```
You are working on the Kaneo Pro Movers website — a moving company website for Airdrie and Calgary, Alberta, Canada.

REPO: https://github.com/lloydweb/kaneopromovers
LIVE DOMAIN: https://www.kaneopromovers.com
STACK: Static HTML/CSS/JS files served via Node.js/Express (server.js)

PROJECT FILES:
- index.html (homepage)
- about.html
- contact.html
- quote.html
- success.html
- moving-services.html
- moving-services-details.html
- airdrie-movers.html
- calgary-movers.html
- crossfield-movers.html
- carstairs-movers.html
- chestermere-movers.html
- cochrane-movers.html
- okotoks-movers.html
- sitemap.xml
- robots.txt (missing - needs to be created)
- server.js
- package.json
- assets/ (CSS, JS, images)

GOLDEN RULE: Do NOT change any CSS styles, layout, visual design, or JavaScript functionality. Do NOT remove any existing HTML elements. Only ADD SEO-related code (meta tags, structured data, etc.) or UPDATE text content where specified. All pages must render identically to how they look now.

TARGET KEYWORDS: airdrie movers, calgary movers, airdrie moving company, calgary moving company, local movers airdrie, local movers calgary, movers near me, moving companies near me, affordable movers airdrie, affordable movers calgary, furniture movers airdrie, same day movers airdrie, residential movers airdrie, residential movers calgary, cheap movers near me

TARGET CITIES: Airdrie AB, Calgary AB, Crossfield AB, Carstairs AB, Chestermere AB, Cochrane AB, Olds AB
```

---

## PHASE 1 PROMPTS — TECHNICAL FOUNDATION

---

### PROMPT 1.1 — Create robots.txt

```
Using the master context above, create a new file called robots.txt in the project root directory.

The robots.txt file must:
1. Allow all search engine crawlers to access all pages
2. Block the /success.html page from being indexed (this is a form thank-you page)
3. Reference the sitemap URL at https://www.kaneopromovers.com/sitemap.xml
4. Be formatted correctly according to Google's robots.txt specification

After creating the file, also check server.js and confirm that static files are being served from the project root so that robots.txt will be accessible at https://www.kaneopromovers.com/robots.txt. If server.js uses express.static(), the file will automatically be served. Show me the final robots.txt content and confirm it will be served correctly.

DO NOT modify any HTML files, CSS, or existing JavaScript. DO NOT change server.js logic — only confirm it serves static files.
```

---

### PROMPT 1.2 — Rebuild the Complete sitemap.xml

```
Using the master context above, completely rewrite the sitemap.xml file in the project root.

The current sitemap.xml only lists 4 pages. The new sitemap must include ALL of these pages:
- https://www.kaneopromovers.com/ (priority: 1.00, changefreq: weekly)
- https://www.kaneopromovers.com/about.html (priority: 0.70, changefreq: monthly)
- https://www.kaneopromovers.com/contact.html (priority: 0.70, changefreq: monthly)
- https://www.kaneopromovers.com/quote.html (priority: 0.90, changefreq: monthly)
- https://www.kaneopromovers.com/moving-services.html (priority: 0.85, changefreq: monthly)
- https://www.kaneopromovers.com/moving-services-details.html (priority: 0.80, changefreq: monthly)
- https://www.kaneopromovers.com/airdrie-movers.html (priority: 0.95, changefreq: weekly)
- https://www.kaneopromovers.com/calgary-movers.html (priority: 0.95, changefreq: weekly)
- https://www.kaneopromovers.com/crossfield-movers.html (priority: 0.85, changefreq: monthly)
- https://www.kaneopromovers.com/carstairs-movers.html (priority: 0.85, changefreq: monthly)
- https://www.kaneopromovers.com/chestermere-movers.html (priority: 0.85, changefreq: monthly)
- https://www.kaneopromovers.com/cochrane-movers.html (priority: 0.85, changefreq: monthly)
- https://www.kaneopromovers.com/okotoks-movers.html (priority: 0.85, changefreq: monthly)

Set all <lastmod> dates to today's date in ISO 8601 format (YYYY-MM-DDT00:00:00+00:00).

Use the proper XML sitemap schema: xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"

Output the complete sitemap.xml file content. Do NOT modify any other files.
```

---

### PROMPT 1.3 — Add Canonical Tags to All Pages

```
Using the master context above, I need you to add a canonical link tag to the <head> section of every HTML file in the project.

For each file, insert this line inside the <head> tag, AFTER the existing <meta charset> tag and BEFORE the <title> tag:
<link rel="canonical" href="FULL_URL_OF_THIS_PAGE">

Use these canonical URLs for each file:
- index.html → https://www.kaneopromovers.com/
- about.html → https://www.kaneopromovers.com/about.html
- contact.html → https://www.kaneopromovers.com/contact.html
- quote.html → https://www.kaneopromovers.com/quote.html
- success.html → https://www.kaneopromovers.com/success.html
- moving-services.html → https://www.kaneopromovers.com/moving-services.html
- moving-services-details.html → https://www.kaneopromovers.com/moving-services-details.html
- airdrie-movers.html → https://www.kaneopromovers.com/airdrie-movers.html
- calgary-movers.html → https://www.kaneopromovers.com/calgary-movers.html
- crossfield-movers.html → https://www.kaneopromovers.com/crossfield-movers.html
- carstairs-movers.html → https://www.kaneopromovers.com/carstairs-movers.html
- chestermere-movers.html → https://www.kaneopromovers.com/chestermere-movers.html
- cochrane-movers.html → https://www.kaneopromovers.com/cochrane-movers.html
- okotoks-movers.html → https://www.kaneopromovers.com/okotoks-movers.html

Rules:
- Only add the canonical tag — do NOT remove or rearrange any existing tags
- Do NOT change any CSS, JavaScript, or visual layout
- Do NOT alter any existing meta tags
- If a canonical tag already exists on a page, update it to match the URL above
- Show me the updated <head> section for each file to confirm
```

---

### PROMPT 1.4 — Fix All Image Alt Tags

```
Using the master context above, I need you to audit and fix all <img> tags across all HTML files.

For each <img> tag that is missing an alt attribute, add a descriptive alt text that:
1. Describes what the image shows (e.g., moving truck, team members, boxes)
2. Naturally includes location keywords where relevant (Airdrie, Calgary, Alberta)
3. Includes the brand name "Kaneo Pro Movers" where it naturally fits

Examples of good alt text:
- alt="Kaneo Pro Movers truck ready for a local move in Airdrie AB"
- alt="Professional movers loading furniture in Calgary Alberta"
- alt="Residential moving services in Airdrie by Kaneo Pro"
- alt="Moving boxes packed and ready for delivery in Calgary"

Also add loading="lazy" to all <img> tags that are NOT in the first visible section of the page (i.e., not in the hero/banner area).

Also add width and height attributes to any <img> tags that are missing them (estimate the dimensions from context if needed, or use width="800" height="600" as a placeholder that must be updated to match actual image dimensions).

Rules:
- Do NOT remove, reposition, or restyle any images
- Do NOT change any CSS classes or IDs on the img tags
- Do NOT change the src attribute of any image
- Only add/update: alt, loading, width, height attributes
```

---

### PROMPT 1.5 — Add viewport and lang Attributes (if missing)

```
Using the master context above, perform these two quick fixes across all HTML files:

1. Check every HTML file for the opening <html> tag. If it does not have lang="en", update it to:
   <html lang="en">

2. Check every HTML file's <head> for a viewport meta tag. If it is missing, add this line right after <meta charset="...">:
   <meta name="viewport" content="width=device-width, initial-scale=1.0">

3. Check that every page has <meta charset="UTF-8"> — add it if missing.

Show me the changes made to each file. Do NOT modify anything else.
```

---

## PHASE 2 PROMPTS — ON-PAGE SEO OPTIMIZATION

---

### PROMPT 2.1 — Optimize Homepage (index.html) Meta Tags & Open Graph

```
Using the master context above, make the following SEO changes to index.html ONLY.

STEP 1 — Update the <title> tag to exactly:
Kaneo Pro Movers | Airdrie & Calgary Moving Company

STEP 2 — Update (or add if missing) the meta description to exactly:
<meta name="description" content="Kaneo Pro Movers — your trusted moving company in Airdrie and Calgary, AB. Affordable, reliable residential and furniture movers serving all of Alberta. Get a free quote!">

STEP 3 — Add these Open Graph meta tags inside <head> (after the description):
<meta property="og:title" content="Kaneo Pro Movers | Airdrie & Calgary Moving Company">
<meta property="og:description" content="Trusted movers in Airdrie and Calgary, AB. Affordable residential, furniture, and same-day moving services. Free quotes available.">
<meta property="og:url" content="https://www.kaneopromovers.com/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Kaneo Pro Movers">
<meta property="og:image" content="https://www.kaneopromovers.com/assets/images/og-image.jpg">
<meta property="og:locale" content="en_CA">

STEP 4 — Add Twitter Card meta tags:
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Kaneo Pro Movers | Airdrie & Calgary Moving Company">
<meta name="twitter:description" content="Trusted movers in Airdrie and Calgary, AB. Affordable residential, furniture, and same-day moving services.">

STEP 5 — Check if there is already a <h1> tag on the page. 
- If the <h1> does NOT contain any of our target keywords, update only the TEXT inside the <h1> to: "Trusted Moving Company in Airdrie & Calgary, AB"
- If the <h1> ALREADY contains relevant keywords (airdrie, calgary, movers, moving), leave it unchanged.

Rules:
- Do NOT change any CSS styles, classes, IDs, or layout
- Do NOT remove any existing tags — only add new ones or update text inside existing tags
- Do NOT touch any JavaScript
- Show me the full updated <head> section to confirm
```

---

### PROMPT 2.2 — Optimize Airdrie City Page (airdrie-movers.html)

```
Using the master context above, make the following SEO changes to airdrie-movers.html ONLY.

STEP 1 — Update <title> to:
Airdrie Movers | Local Moving Company in Airdrie, AB | Kaneo Pro

STEP 2 — Update/add meta description:
<meta name="description" content="Need airdrie movers? Kaneo Pro offers affordable local, residential, furniture, and same-day moving services in Airdrie, AB. Trusted by Airdrie families. Free quote!">

STEP 3 — Add Open Graph tags (same structure as homepage prompt, but with Airdrie-specific content and URL: https://www.kaneopromovers.com/airdrie-movers.html)

STEP 4 — Check the <h1> tag:
- If it doesn't contain "Airdrie Movers" or similar, update the TEXT to: "Airdrie Movers — Your Trusted Local Moving Company"
- Leave the tag's classes, ID, and all attributes unchanged

STEP 5 — Check if there are <h2> tags on the page. If the page has section headings, ensure at least one <h2> contains keywords from this list (update text content only, not attributes):
- "Affordable Movers in Airdrie, AB"
- "Residential Moving Services in Airdrie"
- "Same Day Movers Airdrie"
- "Furniture Movers Airdrie"
- "Local Movers Airdrie — Areas We Serve"

STEP 6 — If there is a services or areas section on the page, add text mentioning nearby cities Kaneo Pro serves: Crossfield, Carstairs, Cochrane, Calgary, Chestermere.

Rules:
- Do NOT remove or rearrange any HTML elements
- Do NOT change CSS, images, or JS
- Only update text content inside existing tags where specifically instructed
- Show me all changed sections
```

---

### PROMPT 2.3 — Optimize Calgary City Page (calgary-movers.html)

```
Using the master context above, make the following SEO changes to calgary-movers.html ONLY.

STEP 1 — Update <title> to:
Calgary Movers | Trusted Calgary Moving Company | Kaneo Pro

STEP 2 — Update/add meta description:
<meta name="description" content="Kaneo Pro is your reliable calgary moving company. Affordable local, residential, and furniture movers in Calgary, AB. Serving all of Calgary and nearby cities. Free quote!">

STEP 3 — Add Open Graph tags with URL: https://www.kaneopromovers.com/calgary-movers.html

STEP 4 — Check and update <h1> text (attributes unchanged) to:
"Calgary Movers — Reliable Moving Company in Calgary, AB"

STEP 5 — Check <h2> tags and ensure at least one covers each of:
- "Residential Movers Calgary"
- "Affordable Movers in Calgary, AB"  
- "Local Movers Calgary — Our Service Areas"

STEP 6 — Add or update a service area mention to include: Chestermere, Airdrie, Cochrane, Crossfield, Carstairs.

Rules: Same as Prompt 2.2 — no layout, CSS, or JS changes. Text content updates only.
```

---

### PROMPT 2.4 — Optimize Remaining City Pages (Batch)

```
Using the master context above, make SEO improvements to these files one by one:

FILE: crossfield-movers.html
- Title: Crossfield Movers | Moving Company in Crossfield, AB | Kaneo Pro
- Description: "Looking for movers in Crossfield, AB? Kaneo Pro Movers offers affordable, reliable local moving services near Crossfield. Serving Crossfield, Airdrie, and Calgary. Get a free quote!"
- H1 text (update text only): "Crossfield Movers — Local Moving Services Near You"

FILE: carstairs-movers.html
- Title: Carstairs Movers | Moving Company in Carstairs, AB | Kaneo Pro
- Description: "Kaneo Pro Movers provides professional moving services in Carstairs, AB. Affordable, local movers serving Carstairs, Didsbury, Olds, and Calgary. Free moving quote!"
- H1 text (update text only): "Carstairs Movers — Affordable Local Moving Company"

FILE: chestermere-movers.html
- Title: Chestermere Movers | Moving Company in Chestermere, AB | Kaneo Pro
- Description: "Need movers in Chestermere, AB? Kaneo Pro offers residential, furniture, and local moving services in Chestermere and Calgary. Reliable and affordable. Get a free quote!"
- H1 text (update text only): "Chestermere Movers — Trusted Local Moving Services"

FILE: cochrane-movers.html
- Title: Cochrane Movers | Moving Company in Cochrane, AB | Kaneo Pro
- Description: "Kaneo Pro Movers provides affordable, professional moving services in Cochrane, AB. Local movers serving Cochrane, Calgary, and Airdrie. Call today for a free quote!"
- H1 text (update text only): "Cochrane Movers — Reliable Moving Company in Cochrane, AB"

FILE: okotoks-movers.html
- Title: Okotoks Movers | Moving Company in Okotoks, AB | Kaneo Pro
- Description: "Looking for movers in Okotoks, AB? Kaneo Pro offers affordable local and residential moving services in Okotoks and Calgary. Experienced, insured movers. Free quote!"
- H1 text (update text only): "Okotoks Movers — Professional Local Moving Services"

For ALL files above:
- Add Open Graph tags with the correct URL for each page
- Do NOT change any CSS, JS, layout, or existing attributes
- Only update: <title>, <meta description>, <h1> text content, og: tags
```

---

### PROMPT 2.5 — Optimize About, Contact, Quote, Services Pages

```
Using the master context above, update meta tags for these supporting pages:

FILE: about.html
- Title: About Kaneo Pro Movers | Airdrie & Calgary Moving Company
- Description: Learn about Kaneo Pro Movers — your trusted local moving company serving Airdrie, Calgary, and all surrounding Alberta communities. Experienced, insured, and affordable.

FILE: contact.html
- Title: Contact Kaneo Pro Movers | Airdrie & Calgary Movers
- Description: Contact Kaneo Pro Movers for a free moving quote in Airdrie, Calgary, Crossfield, Carstairs, Cochrane, and more. Call us or complete our quick online form.

FILE: quote.html
- Title: Get a Free Moving Quote | Kaneo Pro Movers Airdrie & Calgary
- Description: Request a free, no-obligation moving quote from Kaneo Pro Movers. Serving Airdrie, Calgary, Crossfield, Carstairs, Cochrane, Chestermere, and Olds, AB.

FILE: moving-services.html
- Title: Moving Services | Residential, Furniture & Local Movers | Kaneo Pro
- Description: Kaneo Pro Movers offers a full range of moving services: residential moving, furniture moving, same-day moves, and local moves in Airdrie and Calgary, AB.

FILE: moving-services-details.html
- Title: Moving Service Details | Professional Movers Airdrie & Calgary | Kaneo Pro
- Description: Explore Kaneo Pro Movers' complete service details. From packing to delivery, we handle every step of your move in Airdrie, Calgary, and surrounding Alberta cities.

For all files: add canonical tag, add og: tags, do NOT change CSS/layout/JS.
```

---

## PHASE 3 PROMPTS — STRUCTURED DATA & LOCAL SEO

---

### PROMPT 3.1 — Add LocalBusiness JSON-LD Schema to Homepage

```
Using the master context above, add a JSON-LD structured data script to index.html.

Insert the following <script> block immediately BEFORE the closing </head> tag:

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "name": "Kaneo Pro Movers",
  "url": "https://www.kaneopromovers.com",
  "description": "Professional moving company serving Airdrie, Calgary, and surrounding Alberta cities. Offering residential moving, furniture moving, same-day moves, and local moving services.",
  "telephone": "REPLACE_WITH_ACTUAL_PHONE_NUMBER",
  "email": "REPLACE_WITH_ACTUAL_EMAIL",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Airdrie",
    "addressRegion": "AB",
    "addressCountry": "CA"
  },
  "areaServed": [
    {"@type": "City", "name": "Airdrie", "containedInPlace": {"@type": "AdministrativeArea", "name": "Alberta"}},
    {"@type": "City", "name": "Calgary", "containedInPlace": {"@type": "AdministrativeArea", "name": "Alberta"}},
    {"@type": "City", "name": "Crossfield", "containedInPlace": {"@type": "AdministrativeArea", "name": "Alberta"}},
    {"@type": "City", "name": "Carstairs", "containedInPlace": {"@type": "AdministrativeArea", "name": "Alberta"}},
    {"@type": "City", "name": "Chestermere", "containedInPlace": {"@type": "AdministrativeArea", "name": "Alberta"}},
    {"@type": "City", "name": "Cochrane", "containedInPlace": {"@type": "AdministrativeArea", "name": "Alberta"}},
    {"@type": "City", "name": "Olds", "containedInPlace": {"@type": "AdministrativeArea", "name": "Alberta"}}
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Moving Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Residential Moving"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Furniture Moving"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Same-Day Moving"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Local Moving"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Packing Services"}}
    ]
  },
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "08:00",
      "closes": "16:00"
    }
  ]
}
</script>

IMPORTANT: Replace REPLACE_WITH_ACTUAL_PHONE_NUMBER and REPLACE_WITH_ACTUAL_EMAIL with the real business phone and email before deploying. Do NOT modify any other part of index.html.
```

---

### PROMPT 3.2 — Add City-Specific JSON-LD to All City Pages

```
Using the master context above, add city-specific LocalBusiness JSON-LD structured data to each city page.

For each file below, add a <script type="application/ld+json"> block BEFORE the closing </head> tag. The schema should be the same MovingCompany type but with the city-specific address and a city-specific description.

FILE: airdrie-movers.html
"addressLocality": "Airdrie"
"description": "Kaneo Pro Movers — professional, affordable movers in Airdrie, AB. Residential moving, furniture moving, and same-day moving services."

FILE: calgary-movers.html
"addressLocality": "Calgary"
"description": "Kaneo Pro Movers — trusted Calgary moving company offering residential, furniture, and local moving services across Calgary, AB."

FILE: crossfield-movers.html
"addressLocality": "Crossfield"
"description": "Kaneo Pro Movers provides affordable, professional moving services in Crossfield, AB and surrounding communities."

FILE: carstairs-movers.html
"addressLocality": "Carstairs"
"description": "Kaneo Pro Movers — your local movers in Carstairs, AB. Residential and furniture moving services at affordable rates."

FILE: chestermere-movers.html
"addressLocality": "Chestermere"
"description": "Kaneo Pro Movers serves Chestermere, AB with professional residential and local moving services. Affordable and reliable."

FILE: cochrane-movers.html
"addressLocality": "Cochrane"
"description": "Kaneo Pro Movers — professional movers in Cochrane, AB. Residential, furniture, and same-day moving services."

FILE: okotoks-movers.html
"addressLocality": "Okotoks"
"description": "Kaneo Pro Movers provides affordable local moving services in Okotoks, AB. Experienced, insured residential movers."

Use the same schema structure from Prompt 3.1 (MovingCompany type, same areaServed, same services) but update addressLocality and description per city.

Do NOT modify CSS, layout, or JavaScript on any page.
```

---

### PROMPT 3.3 — Add FAQ Schema to Homepage and Airdrie/Calgary Pages

```
Using the master context above, add FAQ structured data to these 3 pages: index.html, airdrie-movers.html, calgary-movers.html.

For EACH of these pages, add a second <script type="application/ld+json"> block (in addition to the LocalBusiness one) BEFORE the closing </head> tag.

Use this FAQ schema for index.html:
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much do movers cost in Airdrie, AB?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Moving costs in Airdrie vary based on the size of your move and distance. Kaneo Pro Movers offers competitive, affordable rates. Contact us for a free, no-obligation quote tailored to your specific move."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer same-day moving services in Airdrie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Kaneo Pro Movers offers same-day moving services in Airdrie, AB subject to availability. Call us early in the day to check our schedule and secure your spot."
      }
    },
    {
      "@type": "Question",
      "name": "What areas does Kaneo Pro Movers serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve Airdrie, Calgary, Crossfield, Carstairs, Chestermere, Cochrane, Olds, and surrounding areas in Alberta, Canada."
      }
    },
    {
      "@type": "Question",
      "name": "Are Kaneo Pro Movers insured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Kaneo Pro Movers is fully insured. Your belongings are protected throughout the entire moving process."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get a free moving quote?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can get a free moving quote by visiting our quote page at kaneopromovers.com/quote.html or by calling us directly. We respond quickly and offer transparent pricing."
      }
    }
  ]
}
</script>

For airdrie-movers.html and calgary-movers.html, create similar FAQ schemas with the same questions but updated to be city-specific (e.g., replace "Airdrie" with "Calgary" in the Calgary page FAQ).

Do NOT modify anything else on these pages.
```

---

### PROMPT 3.4 — Add Google Analytics 4 Snippet to All Pages

```
Using the master context above, add the Google Analytics 4 tracking snippet to the <head> section of ALL HTML files.

The snippet to add is (replace G-XXXXXXXXXX with the actual Measurement ID once you have it from Google Analytics):

<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

Place this snippet as the FIRST thing inside <head>, BEFORE any other tags (before charset, viewport, title, etc.).

Add this to ALL of these files:
- index.html
- about.html
- contact.html
- quote.html
- success.html
- moving-services.html
- moving-services-details.html
- airdrie-movers.html
- calgary-movers.html
- crossfield-movers.html
- carstairs-movers.html
- chestermere-movers.html
- cochrane-movers.html
- okotoks-movers.html

IMPORTANT: Use the placeholder G-XXXXXXXXXX. The actual ID will be replaced manually after setting up Google Analytics. Do NOT modify any other part of any file.

After adding to all files, show me a confirmation list of which files were updated.
```

---

### PROMPT 3.5 — Add Phone Click Tracking to All Pages

```
Using the master context above, find every phone number link (<a href="tel:...">)  across all HTML files and add click tracking for Google Analytics.

For each <a href="tel:..."> element found, add this onclick attribute:
onclick="gtag('event', 'phone_click', {'event_category': 'Contact', 'event_label': 'Phone Number Click'})"

Example: 
BEFORE: <a href="tel:+14031234567">Call Us</a>
AFTER:  <a href="tel:+14031234567" onclick="gtag('event', 'phone_click', {'event_category': 'Contact', 'event_label': 'Phone Number Click'})">Call Us</a>

Also find any <a href="mailto:..."> links and add:
onclick="gtag('event', 'email_click', {'event_category': 'Contact', 'event_label': 'Email Click'})"

Do NOT change any other attributes (href, class, id, style) on these links.
Do NOT change any CSS or layout.
Show me the exact lines that were modified.
```

---

### PROMPT 3.6 — Create Missing Olds, AB City Page

```
Using the master context above, create a new file called olds-movers.html in the project root.

The page must:
1. Use the EXACT SAME HTML structure, CSS classes, navigation, header, footer, and layout as the existing okotoks-movers.html (or any other city page)
2. Replace all instances of the existing city name with "Olds" and "Olds, AB"
3. Have unique body content about moving services in Olds — do NOT copy-paste from another city page
4. Include these elements:
   - <title>: Olds Movers | Moving Company in Olds, AB | Kaneo Pro
   - <meta description>: Professional movers in Olds, AB. Kaneo Pro offers affordable residential and local moving services in Olds and surrounding Alberta towns. Get a free quote today!
   - <link rel="canonical" href="https://www.kaneopromovers.com/olds-movers.html">
   - <h1>: Olds Movers — Trusted Local Moving Company in Olds, AB
   - Google Analytics snippet (same G-XXXXXXXXXX placeholder)
   - LocalBusiness JSON-LD with "addressLocality": "Olds"
   - Open Graph tags with URL: https://www.kaneopromovers.com/olds-movers.html

5. Link back to: index.html, airdrie-movers.html, calgary-movers.html, quote.html

After creating olds-movers.html, also:
- Add it to sitemap.xml: <url><loc>https://www.kaneopromovers.com/olds-movers.html</loc><priority>0.85</priority><changefreq>monthly</changefreq></url>
- Add a link to it from index.html's service area section (if one exists)

Show me the complete olds-movers.html content.
```

---

## PHASE 4 PROMPTS — INTERNAL LINKING

---

### PROMPT 4.1 — Audit and Improve Internal Links Across All Pages

```
Using the master context above, I need you to audit and improve the internal linking structure across all HTML files.

STEP 1 — In index.html:
Find any section that lists cities or service areas. Ensure there are clickable links using keyword-rich anchor text to ALL city pages. If such a section doesn't exist, add a paragraph (before the closing </main> or before </body>) with this exact HTML:

<p>We proudly serve <a href="/airdrie-movers.html">Airdrie movers</a>, <a href="/calgary-movers.html">Calgary movers</a>, <a href="/crossfield-movers.html">Crossfield</a>, <a href="/carstairs-movers.html">Carstairs</a>, <a href="/chestermere-movers.html">Chestermere</a>, <a href="/cochrane-movers.html">Cochrane</a>, <a href="/okotoks-movers.html">Okotoks</a>, and <a href="/olds-movers.html">Olds</a>, AB.</p>

STEP 2 — In each city page (airdrie-movers.html, calgary-movers.html, etc.):
Check if there is a "Related Services" or "Other Areas" section. If yes, ensure it has links to at least 3 other city pages using keyword-rich anchor text.
If no such section exists, add this block before the footer:

<p>Kaneo Pro also offers moving services in <a href="/airdrie-movers.html">Airdrie</a>, <a href="/calgary-movers.html">Calgary</a>, <a href="/crossfield-movers.html">Crossfield</a>, and other Alberta communities. <a href="/quote.html">Get your free moving quote today!</a></p>

(Adjust the city links so each page doesn't link to itself.)

STEP 3 — In moving-services.html and moving-services-details.html:
Add links to airdrie-movers.html and calgary-movers.html using text like "serving Airdrie movers" and "Calgary moving company".

Rules:
- Add links naturally within the page content — do NOT break any existing layout
- Do NOT modify any CSS, JavaScript, or existing navigation menus
- Keep all new links within the existing page design
```

---

### PROMPT 4.2 — Add Security Headers to server.js

```
Using the master context above, open server.js and add the following security and SEO-related HTTP headers to ALL responses.

After the line where Express is configured (usually after `const app = express()`), add this middleware:

app.use((req, res, next) => {
  // Security headers (also good for SEO trust signals)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

Also check if there is already a redirect from HTTP to HTTPS. If not, add:

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, 'https://' + req.headers.host + req.url);
  }
  next();
});

Place the HTTPS redirect BEFORE the security headers middleware.

Do NOT change the static file serving logic, route handlers, or any other server configuration.
Show me the updated server.js.
```

---

## PHASE 5 PROMPTS — PERFORMANCE

---

### PROMPT 5.1 — Add Preconnect Tags for External Resources

```
Using the master context above, inspect the <head> section of index.html and identify all external domains used for fonts, CDNs, or scripts (e.g., Google Fonts, Cloudflare, Bootstrap CDN, jQuery CDN, etc.).

For each external domain found, add a <link rel="preconnect"> tag and a <link rel="dns-prefetch"> tag at the TOP of the <head> section (right after the charset meta tag):

Example:
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://fonts.googleapis.com">

Also check all other HTML pages for additional external domains and add the same preconnect tags.

Do NOT change any existing tags. Only ADD the preconnect/dns-prefetch tags.
Do NOT change CSS, JavaScript, or layout.
List all external domains you found and the preconnect tags added.
```

---

### PROMPT 5.2 — Move Render-Blocking Scripts to Bottom of Body

```
Using the master context above, inspect all HTML files for <script src="..."> tags that are in the <head> section (excluding Google Analytics and structured data scripts, which must stay in <head>).

For any <script src="..."> tags found in <head> that load JavaScript files (NOT inline scripts, NOT async/defer scripts, NOT Google Analytics), move them to immediately before the closing </body> tag.

Rules:
- Scripts that already have async or defer attribute can stay in <head>
- The Google Analytics gtag scripts MUST stay in <head>
- The JSON-LD structured data <script type="application/ld+json"> blocks MUST stay in <head>
- Preserve the ORDER of the moved scripts relative to each other
- Do NOT remove any scripts
- Do NOT change any script's src, attributes (other than moving position), or content

Show me which scripts were moved from which files.
```

---

## ✅ POST-IMPLEMENTATION VERIFICATION PROMPTS

---

### PROMPT V.1 — Final SEO Audit Check

```
Using the master context above, perform a final audit of all HTML files and check:

1. Does every page have a unique <title> tag? (list any duplicates)
2. Does every page have a <meta name="description"> tag? (list any missing)
3. Does every page have a <link rel="canonical"> tag? (list any missing)
4. Does every page have exactly ONE <h1> tag? (list any with 0 or 2+)
5. Does every page have the Google Analytics snippet? (list any missing)
6. Does every page have <html lang="en">? (list any missing)
7. Does every page have <meta name="viewport">? (list any missing)
8. Does every <img> tag have an alt attribute? (list any missing)
9. Does every page have LocalBusiness or MovingCompany JSON-LD schema? (list any missing)
10. Does sitemap.xml include all 15 pages (including olds-movers.html)?

Output a checklist table showing PASS/FAIL for each check on each page. For any FAIL, show the exact line to fix.
```

---

### PROMPT V.2 — Confirm No Visual or Functional Changes

```
Using the master context above, review the changes made across all HTML files and confirm that:

1. No CSS classes have been added, removed, or modified on any existing HTML elements
2. No inline styles have been added or changed
3. No existing HTML elements have been removed
4. No JavaScript event handlers on existing elements have been changed
5. All existing <a href="..."> links still point to the correct destinations
6. The navigation menu on every page still links to the same pages as before
7. No form action attributes have been changed
8. All img src attributes are unchanged

If you find any unintended changes, list them and provide the fix to restore the original behavior.
```

---

## 📖 MANUAL STEPS GUIDE (Not code — must be done by you)

### Step M.1 — Set Up Google Analytics 4
1. Go to https://analytics.google.com
2. Click **Start measuring**
3. Account name: `Kaneo Pro Movers`
4. Property name: `kaneopromovers.com`
5. Time zone: `America/Edmonton` (Calgary/Airdrie)
6. Currency: `CAD`
7. Click **Web** → enter `https://www.kaneopromovers.com`
8. Copy the **Measurement ID** (G-XXXXXXXXXX)
9. Replace `G-XXXXXXXXXX` in all HTML files with your real ID
10. Commit and push to GitHub

### Step M.2 — Verify Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: `https://www.kaneopromovers.com`
3. Choose **HTML file** verification
4. The file `google3f079748702b6260.html` is already in the repo — click Verify
5. Once verified, go to **Sitemaps** → enter `sitemap.xml` → Submit

### Step M.3 — Set Up Google Business Profile
1. Go to https://business.google.com
2. Add business: **Kaneo Pro Movers**
3. Category: **Moving Company**
4. Service areas: Airdrie AB, Calgary AB, Crossfield AB, Carstairs AB, Chestermere AB, Cochrane AB, Olds AB
5. Complete phone verification or postcard verification

### Step M.4 — Submit to Local Directories
- Yelp Canada: https://biz.yelp.ca
- Yellow Pages: https://www.yellowpages.ca
- HomeStars: https://homestars.com
- BBB: https://www.bbb.org
- Bing Places: https://www.bingplaces.com

### Step M.5 — Replace All Placeholder Values in Code
After running all prompts, search the entire project for these placeholders and replace with real values:
- `G-XXXXXXXXXX` → Your actual GA4 Measurement ID
- `REPLACE_WITH_ACTUAL_PHONE_NUMBER` → Real phone number (format: +1-403-XXX-XXXX)
- `REPLACE_WITH_ACTUAL_EMAIL` → Real business email
- `https://www.facebook.com/kaneopromovers` → Real Facebook URL
- `https://www.instagram.com/kaneopromovers` → Real Instagram URL
