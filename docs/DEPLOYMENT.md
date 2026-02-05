# MuhasibAI Deployment Guide

> Step-by-step guide to deploy MuhasibAI to production

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Vercel Deployment](#vercel-deployment)
- [Environment Configuration](#environment-configuration)
- [Database Setup (Neon)](#database-setup-neon)
- [Email Setup (Resend)](#email-setup-resend)
- [OpenAI Setup](#openai-setup)
- [Custom Domain](#custom-domain)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account (for repository hosting)
- [ ] Vercel account (free tier is sufficient for MVP)
- [ ] Neon account (for PostgreSQL database)
- [ ] Resend account (for email notifications)
- [ ] OpenAI account with API access (for OCR functionality)

---

## Vercel Deployment

### Option 1: Deploy via Vercel Dashboard

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the MuhasibAI repository

2. **Configure Project**
   - Framework Preset: `Other`
   - Root Directory: `./` (leave as is)
   - Build Command: Leave empty (static site)
   - Output Directory: `.`

3. **Add Environment Variables**
   - Click "Environment Variables"
   - Add each variable from the [Environment Configuration](#environment-configuration) section

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

### Option 2: Deploy via CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd MuhasibAI
   vercel
   ```

4. **Follow Prompts**
   ```
   ? Set up and deploy "~/MuhasibAI"? [Y/n] y
   ? Which scope do you want to deploy to? Your Account
   ? Link to existing project? [y/N] n
   ? What's your project's name? muhasib-ai
   ? In which directory is your code located? ./
   ```

5. **Add Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add RESEND_API_KEY
   vercel env add NOTIFICATION_EMAIL
   vercel env add OPENAI_API_KEY
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@ep-xxx.aws.neon.tech/dbname?sslmode=require` |
| `OPENAI_API_KEY` | OpenAI API key for OCR | `sk-...` |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `RESEND_API_KEY` | Resend API key for emails | None (emails disabled) |
| `NOTIFICATION_EMAIL` | Email for admin notifications | `zamil@feedbacknfc.com` |

### Setting Environment Variables

**Via Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add each variable with its value
3. Select environments: Production, Preview, Development

**Via CLI:**
```bash
# Add for all environments
vercel env add VARIABLE_NAME

# Add for specific environment
vercel env add VARIABLE_NAME production
```

---

## Database Setup (Neon)

### Create Neon Account

1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub or email
3. Create a new project

### Create Database

1. **Create Project**
   - Project name: `muhasib-ai`
   - Region: Choose nearest to your users (e.g., `aws-eu-central-1` for Middle East)
   - PostgreSQL version: 16 (latest)

2. **Get Connection String**
   - Go to Dashboard → Connection Details
   - Copy the connection string
   - Format: `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`

3. **Initialize Database**
   The waitlist table is auto-created on first API call, but you can create it manually:
   
   ```sql
   CREATE TABLE IF NOT EXISTS waitlist (
     id SERIAL PRIMARY KEY,
     phone VARCHAR(20) NOT NULL,
     email VARCHAR(255),
     business VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### Database Configuration

Add to Vercel environment variables:
```
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
```

---

## Email Setup (Resend)

### Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Verify your email

### Get API Key

1. Go to API Keys section
2. Create new API key
3. Copy the key (starts with `re_`)

### Configure Domain (Optional)

For custom sender domain:
1. Go to Domains
2. Add your domain
3. Add DNS records as instructed
4. Verify domain

### Add to Environment

```
RESEND_API_KEY=re_xxxxxxxxxx
NOTIFICATION_EMAIL=admin@yourdomain.com
```

---

## OpenAI Setup

### Create OpenAI Account

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or login
3. Add payment method (required for API access)

### Generate API Key

1. Go to API Keys section
2. Create new secret key
3. Copy immediately (shown only once)

### Configure Billing

1. Go to Usage limits
2. Set monthly budget limit
3. Enable usage alerts

### Estimated Costs

| Usage | Cost |
|-------|------|
| OCR per invoice (GPT-4o-mini) | ~$0.01-0.05 |
| 100 invoices/month | ~$1-5 |
| 1000 invoices/month | ~$10-50 |

### Add to Environment

```
OPENAI_API_KEY=sk-xxxxxxxxxx
```

---

## Custom Domain

### Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `muhasib.ai`)
3. Choose configuration:
   - `muhasib.ai` → Primary domain
   - `www.muhasib.ai` → Redirect to primary

### Configure DNS

Add these records at your DNS provider:

| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

Or use Vercel nameservers:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt. No action required.

---

## Post-Deployment Checklist

### Functionality Tests

- [ ] Landing page loads correctly
- [ ] Language toggle works (Arabic ↔ English)
- [ ] Waitlist form submits successfully
- [ ] Demo pages load without errors
- [ ] OCR API returns demo data (without OpenAI key)
- [ ] OCR API processes images (with OpenAI key)

### Security Tests

- [ ] HTTPS is enforced
- [ ] Environment variables are not exposed
- [ ] CORS is properly configured
- [ ] No sensitive data in client-side code

### Performance Tests

- [ ] Page load time < 3 seconds
- [ ] Images load properly
- [ ] API response time < 5 seconds
- [ ] Mobile responsive design works

### SEO Tests

- [ ] Page titles are correct
- [ ] Meta descriptions are set
- [ ] robots.txt is accessible
- [ ] Sitemap is available (if created)

---

## Troubleshooting

### Common Issues

#### "Module not found" error in serverless functions

**Cause:** Dependencies not installed
**Solution:**
```bash
npm install
vercel --prod
```

#### Database connection fails

**Cause:** Invalid connection string or network issues
**Solution:**
1. Verify DATABASE_URL is correct
2. Check Neon dashboard for connection issues
3. Ensure `?sslmode=require` is in connection string

#### OCR returns demo data even with API key

**Cause:** Invalid or missing OpenAI API key
**Solution:**
1. Verify OPENAI_API_KEY is set in Vercel
2. Check OpenAI dashboard for API key status
3. Ensure billing is set up on OpenAI

#### Email notifications not sending

**Cause:** Invalid Resend API key or domain not verified
**Solution:**
1. Verify RESEND_API_KEY is correct
2. Check Resend dashboard for errors
3. Verify sender domain if using custom domain

#### Arabic text displays incorrectly

**Cause:** Font not loading or RTL not applied
**Solution:**
1. Check Google Fonts CDN is accessible
2. Verify `dir="rtl"` is set on HTML element
3. Clear browser cache

### Logs and Debugging

**View Function Logs:**
```bash
vercel logs
```

**View in Dashboard:**
1. Go to Vercel Dashboard
2. Select project
3. Click "Deployments"
4. Select deployment
5. Click "Functions" tab
6. View logs for each function

### Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Neon Docs:** https://neon.tech/docs
- **Resend Docs:** https://resend.com/docs
- **OpenAI Docs:** https://platform.openai.com/docs

---

## Rollback

### Via Dashboard

1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Via CLI

```bash
# List deployments
vercel list

# Promote specific deployment
vercel alias <deployment-url> <production-domain>
```

---

## Monitoring

### Vercel Analytics

Enable in Project Settings → Analytics

### Custom Monitoring (Future)

Consider adding:
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Uptime monitoring (UptimeRobot)

---

## Security Best Practices

1. **Rotate API keys regularly**
2. **Use environment variables for all secrets**
3. **Enable 2FA on all service accounts**
4. **Monitor usage and set alerts**
5. **Review access logs periodically**

---

© 2026 MuhasibAI
