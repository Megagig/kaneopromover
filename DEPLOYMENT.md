# Kaneo Pro Movers — Deployment Guide

---

## OPTION A: Deploy to Vercel (Recommended)

Vercel is the company that makes Next.js. It's the easiest and best way to deploy a Next.js app. Free tier is generous enough for this project.

### Prerequisites

Before you start, make sure you have:
- [x] A GitHub account (you already have: github.com/lloydweb)
- [x] Your code pushed to GitHub
- [x] A Neon database (you already have this set up)
- [ ] A Vercel account (we'll create one below)
- [ ] A Resend account for emails (we'll set up below)

---

### Step 1: Push Your Code to GitHub

If you haven't already, push your latest code:

```bash
cd ~/Documents/PROJECTS/CLIENTS/kaneopromovers
git add .
git commit -m "Ready for Vercel deployment"
git push origin develop
```

Then on GitHub, merge `develop` into `main`:
1. Go to https://github.com/lloydweb/kaneopromovers
2. Click "Pull requests" → "New pull request"
3. Set base: `main` ← compare: `develop`
4. Click "Create pull request" → "Merge pull request"

---

### Step 2: Create a Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account
5. You're now on the Vercel dashboard

---

### Step 3: Import Your Project

1. On the Vercel dashboard, click "Add New..." → "Project"
2. You'll see a list of your GitHub repos
3. Find `kaneopromovers` and click "Import"
4. Vercel auto-detects it's a Next.js project

**Configure the project:**
- Framework Preset: `Next.js` (auto-detected)
- Root Directory: `.` (leave as is)
- Build Command: `npm run build` (auto-detected)
- Output Directory: leave blank (auto-detected)

**DO NOT click Deploy yet — first add environment variables (Step 4).**

---

### Step 4: Add Environment Variables

On the same import page, scroll down to "Environment Variables" and add each one:

| Key | Value | Notes |
|-----|-------|-------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_7NHDKpmzPZ2r@ep-damp-river-ajbfdfkr-pooler.c-3.us-east-2.aws.neon.tech/kaneopromoversdb?sslmode=require&channel_binding=require` | Your Neon connection string (copy from .env.local) |
| `NEXTAUTH_URL` | `https://www.kaneopromovers.com` | Your live domain |
| `NEXTAUTH_SECRET` | *(generate one — see below)* | Secret key for auth |
| `AUTH_SECRET` | *(same value as NEXTAUTH_SECRET)* | NextAuth v5 also reads this |
| `RESEND_API_KEY` | `re_REPLACE_WITH_REAL_KEY` | Get from Resend (Step 5) |
| `RESEND_FROM_EMAIL` | `noreply@kaneopromovers.com` | Sender email |
| `ADMIN_NOTIFICATION_EMAIL` | `info@kaneopromovers.com` | Where admin emails go |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Your Google Analytics ID (Step 8) |
| `NEXT_PUBLIC_SITE_URL` | `https://www.kaneopromovers.com` | Your live domain |
| `NEXT_PUBLIC_PHONE` | `+15873785954` | Company phone |
| `NEXT_PUBLIC_EMAIL` | `info@kaneopromovers.com` | Company email |

**To generate NEXTAUTH_SECRET**, run this in your terminal:
```bash
openssl rand -base64 32
```
Copy the output and paste it as the value for both `NEXTAUTH_SECRET` and `AUTH_SECRET`.

---

### Step 5: Set Up Resend (Email Service)

1. Go to https://resend.com and click "Sign Up"
2. Verify your email address
3. Go to "API Keys" in the sidebar
4. Click "Create API Key"
   - Name: `kaneopromovers`
   - Permission: `Full access`
5. Copy the key (starts with `re_`) — paste it as `RESEND_API_KEY` in Vercel
6. Go to "Domains" in the sidebar
7. Click "Add Domain" → enter `kaneopromovers.com`
8. Resend will show you DNS records to add. Go to your domain registrar (where you bought kaneopromovers.com) and add these records:
   - Usually 1 MX record and 1-2 TXT records
   - This lets Resend send emails from `@kaneopromovers.com`
9. Wait for verification (usually 5-30 minutes)

---

### Step 6: Deploy

1. Go back to Vercel and click "Deploy"
2. Wait 2-3 minutes for the build to complete
3. Vercel gives you a URL like `kaneopromovers-xxxx.vercel.app`
4. Visit that URL to verify the site works

---

### Step 7: Connect Your Custom Domain

1. In Vercel, go to your project → "Settings" → "Domains"
2. Type `kaneopromovers.com` and click "Add"
3. Vercel will show you DNS records to configure

**At your domain registrar (where you bought kaneopromovers.com):**

You need to update your DNS settings. Remove any old A records or CNAME records pointing to your old hosting, then add:

**Option A — If using the root domain (kaneopromovers.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Back in Vercel, click "Verify" next to each domain
5. Vercel automatically provisions a free SSL certificate
6. Wait 5-30 minutes for DNS to propagate

**To check if DNS has propagated:**
- Go to https://dnschecker.org
- Enter `kaneopromovers.com`
- Check that it shows the Vercel IP (76.76.21.21)

**Set your preferred domain:**
- In Vercel Domains settings, set `www.kaneopromovers.com` as primary
- This means `kaneopromovers.com` will redirect to `www.kaneopromovers.com`

---

### Step 8: Seed the Database

After deployment, you need to seed the admin user and pricing data. You already did this locally, but verify it's there:

1. Go to your Neon dashboard: https://console.neon.tech
2. Click on your database → "SQL Editor"
3. Run: `SELECT * FROM admins;`
4. You should see the admin user. If not, run the seed locally again:
```bash
npx tsx prisma/seed.ts
```

---

### Step 9: Test Everything

1. Visit https://www.kaneopromovers.com — homepage should load
2. Test old URL redirect: https://www.kaneopromovers.com/airdrie-movers.html → should go to /locations/airdrie
3. Go to https://www.kaneopromovers.com/admin/login
   - Email: `admin@kaneopromovers.com`
   - Password: `Admin@2024!`
4. Submit a test quote at /quote — check if email arrives
5. Submit a test contact message at /contact
6. Check /sitemap.xml loads
7. Check /robots.txt loads
8. Toggle dark/light mode
9. Test on your phone (mobile responsiveness)

---

### Updating the Site After Deployment

Every time you push to `main` on GitHub, Vercel automatically rebuilds and deploys:

```bash
git add .
git commit -m "Your change description"
git push origin main
```

Vercel will deploy in ~2 minutes. No manual steps needed.

---

---

## OPTION B: Deploy to VPS (DigitalOcean/Hetzner)

<details>
<summary>Click to expand VPS deployment instructions</summary>

### Step 1: Server Preparation

```bash
sudo apt update && sudo apt upgrade -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
npm install -g pm2
sudo apt install nginx certbot python3-certbot-nginx -y
```

### Step 2: Deploy the App

```bash
git clone https://github.com/lloydweb/kaneopromovers.git
cd kaneopromovers
npm install
nano .env.local  # Paste all env variables
npx prisma db push
npx prisma generate
npm run db:seed
npm run build
pm2 start npm --name "kaneopromovers" -- start
pm2 save && pm2 startup
```

### Step 3: Nginx Config

```bash
sudo nano /etc/nginx/sites-available/kaneopromovers
```

```nginx
server {
    listen 80;
    server_name kaneopromovers.com www.kaneopromovers.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/kaneopromovers /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d kaneopromovers.com -d www.kaneopromovers.com
```

### Updating

```bash
cd ~/kaneopromovers && git pull && npm install && npm run build && pm2 restart kaneopromovers
```

</details>

---

---

## SEO SETUP — Complete Step-by-Step Guide

Everything below needs to be done AFTER the site is live on your domain.

---

### SEO Step 1: Google Search Console (GSC)

Google Search Console tells Google your site exists and lets you monitor how it appears in search results.

1. Go to https://search.google.com/search-console
2. Click "Start now" (sign in with your Google account)
3. Click "Add property"
4. Choose "URL prefix" and enter: `https://www.kaneopromovers.com`
5. For verification, choose "HTML file" method
   - Your file is already at: `public/google3f079748702b6260.html`
   - Visit `https://www.kaneopromovers.com/google3f079748702b6260.html` to confirm it loads
   - Click "Verify" in GSC
6. After verification, go to "Sitemaps" in the left sidebar
7. Enter: `sitemap.xml` and click "Submit"
   - This tells Google about all your pages
8. Google will start crawling your site within 24-48 hours

**Check back in 3-5 days:**
- Go to "Pages" to see which pages are indexed
- Go to "Performance" to see search impressions and clicks

---

### SEO Step 2: Google Business Profile

This is CRITICAL for local SEO. It makes you appear in Google Maps and the local "3-pack" results.

1. Go to https://business.google.com
2. Click "Manage now"
3. Search for "Kaneo Pro Movers" — if it exists, claim it. If not, create new.
4. Fill in ALL details:
   - Business name: `Kaneo Pro Movers`
   - Category: `Moving Company` (primary), `Mover` (additional)
   - Address: `1060 Channelside DR, SW, Airdrie, AB, Canada`
   - Service area: Add all 8 cities (Airdrie, Calgary, Cochrane, Chestermere, Okotoks, Crossfield, Carstairs, Olds)
   - Phone: `+1(587)-378-5954`
   - Website: `https://www.kaneopromovers.com`
   - Hours: Mon-Fri 8am-6pm, Sat 8am-4pm
5. Add photos (use the hero images from your site)
6. Write a business description (use the homepage meta description)
7. Google will verify by mail (postcard to your address) — takes 5-14 days
8. Once verified, your business appears on Google Maps

**After verification:**
- Post weekly updates (e.g., "Now serving Olds, AB!")
- Ask every happy customer to leave a Google review
- Respond to every review (positive and negative)

---

### SEO Step 3: Google Analytics (GA4)

This tracks how many people visit your site, which pages they view, and where they come from.

1. Go to https://analytics.google.com
2. Click "Start measuring"
3. Account name: `Kaneo Pro Movers`
4. Property name: `kaneopromovers.com`
5. Select your country (Canada) and timezone (Mountain Time)
6. Choose "Web" as the platform
7. Enter your website URL: `https://www.kaneopromovers.com`
8. Stream name: `Kaneo Pro Movers Website`
9. Copy the Measurement ID (starts with `G-`)
10. Go to Vercel → your project → Settings → Environment Variables
11. Update `NEXT_PUBLIC_GA_ID` with your real `G-XXXXXXX` ID
12. Redeploy (push any small change to trigger a rebuild, or click "Redeploy" in Vercel)

**Verify it works:**
- Visit your site
- In GA4, go to "Realtime" — you should see yourself as an active user

**Set up conversion tracking:**
- In GA4, go to "Events"
- Find `quote_submission` and `contact_form_submitted` events
- Click the toggle to mark them as "Key events" (conversions)
- This lets you track how many people submit forms

---

### SEO Step 4: Bing Webmaster Tools

Bing is the #2 search engine. Easy to set up and brings extra traffic.

1. Go to https://www.bing.com/webmasters
2. Sign in with your Microsoft account (or create one)
3. Click "Add your site manually"
4. Enter: `https://www.kaneopromovers.com`
5. Choose "Import from Google Search Console" (easiest method)
   - This copies all your GSC settings to Bing
6. Or manually verify with the HTML meta tag method
7. Submit your sitemap: `https://www.kaneopromovers.com/sitemap.xml`

---

### SEO Step 5: Local Directory Listings (Citations)

These help Google trust that your business is real and located where you say it is. Create profiles on ALL of these:

**Must-have (do these first):**
1. **Google Business Profile** (done in Step 2)
2. **Yelp** — https://biz.yelp.com (create business page)
3. **Yellow Pages Canada** — https://www.yellowpages.ca (submit listing)
4. **Canada411** — https://www.canada411.ca
5. **BBB (Better Business Bureau)** — https://www.bbb.org (apply for listing)

**Also recommended:**
6. **Facebook Business Page** — create one, link to website
7. **Instagram Business** — create one, link to website
8. **Nextdoor** — https://nextdoor.com (claim business)
9. **HomeStars** — https://homestars.com (important for Canadian home services)
10. **TrustPilot** — https://www.trustpilot.com (create business profile)

**For EVERY listing, use EXACTLY the same info:**
- Name: `Kaneo Pro Movers`
- Address: `1060 Channelside DR, SW, Airdrie, AB, Canada`
- Phone: `+1(587)-378-5954`
- Website: `https://www.kaneopromovers.com`

Consistency is critical. Google cross-references these listings.

---

### SEO Step 6: Get Google Reviews

Reviews are the #1 factor for local SEO ranking. Here's how to get them:

1. In Google Business Profile, find your "Review link"
   - Go to your profile → "Ask for reviews" → copy the link
2. After every successful move, text or email the customer:
   ```
   Hi [Name], thank you for choosing Kaneo Pro Movers!
   If you had a great experience, we'd really appreciate a Google review:
   [paste your review link]
   It only takes 30 seconds and helps us a lot. Thank you!
   ```
3. Aim for 5+ reviews in the first month, 20+ by month 3
4. Respond to EVERY review within 24 hours
5. Never offer incentives for reviews (against Google policy)

---

### SEO Step 7: Monthly SEO Maintenance

Do these every month to keep improving your rankings:

**Week 1:**
- [ ] Check Google Search Console for errors (Pages → Not indexed)
- [ ] Fix any crawl errors
- [ ] Check which keywords you're ranking for (Performance tab)

**Week 2:**
- [ ] Post an update on Google Business Profile
- [ ] Share a post on Facebook/Instagram linking to your site
- [ ] Ask 2-3 recent customers for Google reviews

**Week 3:**
- [ ] Check Google Analytics for traffic trends
- [ ] See which city pages get the most traffic
- [ ] Consider adding more content to low-traffic pages

**Week 4:**
- [ ] Check competitor rankings for "airdrie movers", "calgary movers"
- [ ] Update any outdated content on the site
- [ ] Plan next month's improvements

---

### SEO Timeline — What to Expect

| Timeframe | What Happens |
|-----------|-------------|
| Week 1 | Google discovers your sitemap, starts crawling |
| Week 2-3 | Pages start appearing in Google index |
| Month 1 | You appear for long-tail keywords ("movers airdrie ab", "moving company near airdrie") |
| Month 2-3 | Rankings improve as Google trusts your site more |
| Month 3-6 | With reviews and citations, you enter top 10 for "airdrie movers" |
| Month 6-12 | With consistent effort, top 5 for primary keywords |

**Key factors that speed up ranking:**
1. Google reviews (most important)
2. Consistent NAP citations across directories
3. Regular Google Business Profile posts
4. Mobile-friendly site (you have this)
5. Fast page speed (you have this with Next.js)
6. SSL certificate (you have this)
7. Structured data / schema markup (you have this)

---

### Quick Reference — What's Already Done (Built Into Your Site)

- [x] SEO-optimized meta titles and descriptions on every page
- [x] OpenGraph tags for social media sharing
- [x] Canonical URLs to prevent duplicate content
- [x] JSON-LD structured data (LocalBusiness, FAQ, Breadcrumb)
- [x] Dynamic sitemap.xml with all pages
- [x] robots.txt blocking admin/API routes
- [x] 301 redirects from old URLs preserving SEO juice
- [x] Mobile-responsive design (Google's #1 ranking factor)
- [x] Fast page loads with Next.js static generation
- [x] Image optimization (WebP/AVIF, lazy loading)
- [x] Semantic HTML with proper heading hierarchy
- [x] Accessible (aria labels, focus states)
- [x] SSL-ready (Vercel provides free SSL)
- [x] Google Analytics tracking code
- [x] Google Search Console verification file
