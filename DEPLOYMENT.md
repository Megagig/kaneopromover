# Kaneo Pro Movers — VPS Deployment Guide
## Ubuntu 22.04 + Node.js + PM2 + Nginx + SSL

---

## Step 1: Server Preparation

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

# Install Node.js 20 LTS
nvm install 20
nvm use 20
node --version  # Should show v20.x.x

# Install PM2 (process manager — keeps your app running)
npm install -g pm2

# Install Nginx (reverse proxy — routes traffic to your app)
sudo apt install nginx -y

# Install Certbot (free SSL certificates from Let's Encrypt)
sudo apt install certbot python3-certbot-nginx -y
```

---

## Step 2: PostgreSQL Setup

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Switch to postgres user and create database
sudo -u postgres psql

# Inside psql, run these commands:
CREATE USER kaneoadmin WITH PASSWORD 'YOUR_STRONG_PASSWORD_HERE';
CREATE DATABASE kaneopromovers OWNER kaneoadmin;
GRANT ALL PRIVILEGES ON DATABASE kaneopromovers TO kaneoadmin;
\q
```

Your DATABASE_URL will be:
```
postgresql://kaneoadmin:YOUR_STRONG_PASSWORD_HERE@localhost:5432/kaneopromovers
```

---

## Step 3: Deploy the App

```bash
# Clone the repo
git clone https://github.com/lloydweb/kaneopromovers.git
cd kaneopromovers

# Install dependencies
npm install

# Create production .env.local
nano .env.local
```

Paste these values (replace placeholders):
```bash
DATABASE_URL="postgresql://kaneoadmin:YOUR_STRONG_PASSWORD_HERE@localhost:5432/kaneopromovers"
NEXTAUTH_URL="https://www.kaneopromovers.com"
NEXTAUTH_SECRET="PASTE_OUTPUT_OF: openssl rand -base64 32"
RESEND_API_KEY="re_YOUR_REAL_KEY"
RESEND_FROM_EMAIL="noreply@kaneopromovers.com"
ADMIN_NOTIFICATION_EMAIL="info@kaneopromovers.com"
NEXT_PUBLIC_GA_ID="G-YOUR_GA_ID"
NEXT_PUBLIC_SITE_URL="https://www.kaneopromovers.com"
NEXT_PUBLIC_PHONE="+15873785954"
NEXT_PUBLIC_EMAIL="info@kaneopromovers.com"
```

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Push database schema
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed admin user and pricing data
npm run db:seed

# Build the production app
npm run build

# Start with PM2
pm2 start npm --name "kaneopromovers" -- start

# Save PM2 config so it restarts on reboot
pm2 save
pm2 startup  # Follow the printed command
```

---

## Step 4: Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/kaneopromovers
```

Paste this config:
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
# Enable the site
sudo ln -s /etc/nginx/sites-available/kaneopromovers /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## Step 5: SSL with Let's Encrypt

```bash
# Get SSL certificate (Certbot auto-configures Nginx)
sudo certbot --nginx -d kaneopromovers.com -d www.kaneopromovers.com

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## Step 6: Post-Deployment Verification

1. Visit https://www.kaneopromovers.com — confirm it loads
2. Test redirect: https://www.kaneopromovers.com/airdrie-movers.html → should redirect to /locations/airdrie
3. Test admin login at /admin/login (admin@kaneopromovers.com / Admin@2024!)
4. Submit a test quote form — confirm email arrives
5. Check https://www.kaneopromovers.com/sitemap.xml
6. Check https://www.kaneopromovers.com/robots.txt
7. Run Lighthouse audit on the live URL

---

## Useful PM2 Commands

```bash
pm2 status              # Check app status
pm2 logs kaneopromovers # View logs
pm2 restart kaneopromovers  # Restart app
pm2 stop kaneopromovers     # Stop app
pm2 delete kaneopromovers   # Remove from PM2
```

## Updating the Site

```bash
cd ~/kaneopromovers
git pull
npm install
npm run build
pm2 restart kaneopromovers
```
