# MuhasibAI (مُحاسِب)

> AI-Powered Smart Accounting Platform for Saudi SMEs - ZATCA Compliant

<p align="center">
  <strong>محاسبة ذكية بالذكاء الاصطناعي للمنشآت السعودية</strong>
</p>

---

## Overview

MuhasibAI is a comprehensive AI-powered accounting platform designed specifically for Small and Medium Enterprises (SMEs) in Saudi Arabia. The platform is fully compliant with ZATCA (Zakat, Tax and Customs Authority) e-invoicing regulations and provides intelligent automation for accounting workflows.

### Key Value Proposition

- **For Businesses WITH POS**: "Your POS handles sales. We handle everything else."
- **For Businesses WITHOUT POS**: "Your complete AI-powered accounting system."

---

## Table of Contents

- [Features](#features)
- [Target Market](#target-market)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Demo Pages](#demo-pages)
- [Sample Invoices](#sample-invoices)
- [Deployment](#deployment)
- [Pricing Plans](#pricing-plans)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Core Features

| Feature | Description |
|---------|-------------|
| **ZATCA E-Invoicing** | Fully compliant electronic invoicing with automatic QR code generation |
| **AI-Powered OCR** | Scan invoices/receipts and automatically extract data using GPT-4 Vision |
| **POS Integration** | Seamless integration with existing Point of Sale systems |
| **VAT Reconciliation** | Automatic input/output VAT tracking and reconciliation reports |
| **Live Profit Margins** | Real-time margin calculation and cash flow monitoring |
| **Business Alerts** | Smart reminders for payments, licenses, and regulatory deadlines |

### Financial Reports

- **Daily Snapshot** - Quick overview of daily business performance
- **Income Statement (P&L)** - Profit and Loss statement
- **Balance Sheet** - Assets, liabilities, and equity overview
- **Cash Flow Statement** - Cash inflows and outflows analysis
- **Cash Forecast** - Predictive cash flow forecasting
- **Budget vs Actual** - Variance analysis between budget and actuals
- **Expense Analysis** - Detailed expense breakdown by category
- **Sales Report** - Sales performance and trends
- **Accounts Payable (AP)** - Vendor payments tracking
- **Accounts Receivable (AR) Aging** - Customer payment tracking

### Two Product Solutions

#### Solution A: Smart Accounting Add-on (With POS)

For businesses that already have a POS system:
- Easy input cost capture
- Auto-reconciliation with POS
- Live margin calculation
- Input VAT tracking & credit
- Full P&L reports

#### Solution B: Complete AI Accounting (Without POS)

For businesses without a POS system:
- ZATCA-compliant e-invoicing
- AI-powered expense tracking
- Automatic VAT calculation
- Client & payment management
- Comprehensive financial reports

---

## Target Market

### Primary Industries

| With POS | Without POS |
|----------|-------------|
| Restaurants | Contractors |
| Cafés | Consultants |
| Supermarkets | Electricians |
| Mini Markets | Plumbers |
| Clinics | Designers |
| Pharmacies | Photographers |

### Geographic Focus

- **Primary Market**: Kingdom of Saudi Arabia (KSA)
- **Language Support**: Arabic (RTL) and English

---

## Technology Stack

### Frontend

- **HTML5/CSS3** - Modern, responsive design
- **JavaScript (ES6+)** - Client-side interactivity
- **Lucide Icons** - Icon library
- **html2pdf.js** - PDF generation for invoices
- **Google Fonts** - Tajawal (Arabic) & Inter (English)

### Backend

- **Vercel Serverless Functions** - API endpoints
- **Node.js** - Runtime environment

### Database

- **Neon** - Serverless PostgreSQL database
- **@neondatabase/serverless** - Database client

### AI/ML

- **OpenAI GPT-4o-mini** - Vision API for OCR and invoice data extraction

### Email Services

- **Resend** - Transactional email for notifications

### Hosting & Deployment

- **Vercel** - Hosting and serverless functions

---

## Project Structure

```
MuhasibAI/
├── api/
│   ├── ocr.js              # OCR API endpoint (OpenAI Vision)
│   └── waitlist.js         # Waitlist signup API
├── sample-invoices/
│   ├── index.html          # Sample invoices gallery
│   ├── invoice-*.html      # Service invoices (design, electrical, etc.)
│   ├── misc-*.html         # Utility bills (electricity, water, internet)
│   ├── payroll-*.html      # Payroll documents
│   ├── rent-*.html         # Rent receipts
│   ├── supplier-*.html     # Supplier invoices
│   └── suppliers.html      # Supplier directory
├── index.html              # Landing page with waitlist
├── demo-erp-pos.html       # Demo: ERP/POS integration
├── demo-no-pos.html        # Demo: Without POS system
├── demo-alerts.html        # Demo: Business alerts & reminders
├── demo-daily-snapshot.html # Demo: Daily financial snapshot
├── demo-income-statement.html # Demo: P&L statement
├── demo-balance-sheet.html # Demo: Balance sheet
├── demo-cash-flow.html     # Demo: Cash flow statement
├── demo-cash-forecast.html # Demo: Cash forecasting
├── demo-budget-actual.html # Demo: Budget vs actual
├── demo-expense-analysis.html # Demo: Expense analysis
├── demo-sales-report.html  # Demo: Sales report
├── demo-ap-report.html     # Demo: Accounts Payable
├── demo-ar-aging.html      # Demo: AR Aging report
├── package.json            # Node.js dependencies
├── vercel.json             # Vercel configuration
├── .env.example            # Environment variables template
└── .gitignore              # Git ignore rules
```

---

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Vercel CLI (optional, for local development)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/MuhasibAI.git
   cd MuhasibAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials (see [Configuration](#configuration))

4. **Run locally with Vercel CLI**
   ```bash
   vercel dev
   ```

5. **Or serve static files**
   ```bash
   npx serve .
   ```

---

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Neon Database Connection String
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require

# Resend API Key (for email notifications)
RESEND_API_KEY=re_xxxxxxxxxx

# Email to receive waitlist notifications (optional)
NOTIFICATION_EMAIL=your-email@example.com

# OpenAI API Key (for OCR/Vision processing)
OPENAI_API_KEY=sk-xxxxxxxxxx
```

### Getting API Keys

| Service | URL | Purpose |
|---------|-----|---------|
| Neon | https://neon.tech | PostgreSQL database |
| Resend | https://resend.com | Email notifications |
| OpenAI | https://platform.openai.com/api-keys | AI OCR processing |

---

## API Endpoints

### POST `/api/waitlist`

Register a new user on the waitlist.

**Request Body:**
```json
{
  "phone": "05xxxxxxxx",
  "email": "user@example.com",
  "business": "restaurant"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully joined the waitlist!"
}
```

**Response (Already Registered):**
```json
{
  "error": "already_registered",
  "message": "This phone or email is already on the waitlist"
}
```

### POST `/api/ocr`

Process an invoice image and extract data using AI.

**Request Body:**
```json
{
  "image": "base64_encoded_image_data",
  "filename": "invoice.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "vendor_name": "ABC Supplies Co.",
    "vendor_name_en": "ABC Supplies Co.",
    "invoice_number": "INV-123456",
    "date": "2026-01-15",
    "subtotal": 1000,
    "vat_amount": 150,
    "vat_rate": 15,
    "total": 1150,
    "currency": "SAR",
    "category": "suppliers",
    "category_reason": "Material purchase invoice",
    "items": [
      {"description": "Office Supplies", "quantity": 10, "price": 100}
    ],
    "confidence": 95,
    "demo": false
  }
}
```

**Expense Categories:**
- `suppliers` - Material purchases, inventory, goods from vendors
- `salaries` - Payroll, wages, employee payments
- `rent` - Rental payments, lease payments, property
- `misc` - Utilities (electricity, water, internet), maintenance, services

---

## Demo Pages

### Main Demos

| Page | URL | Description |
|------|-----|-------------|
| Landing Page | `/index.html` | Product overview and waitlist |
| ERP/POS Demo | `/demo-erp-pos.html` | For businesses WITH POS systems |
| No-POS Demo | `/demo-no-pos.html` | For businesses WITHOUT POS |
| Alerts Demo | `/demo-alerts.html` | Business alerts and reminders |

### Financial Reports

| Report | URL | Description |
|--------|-----|-------------|
| Daily Snapshot | `/demo-daily-snapshot.html` | Daily business overview |
| Income Statement | `/demo-income-statement.html` | Profit & Loss statement |
| Balance Sheet | `/demo-balance-sheet.html` | Financial position |
| Cash Flow | `/demo-cash-flow.html` | Cash movement analysis |
| Cash Forecast | `/demo-cash-forecast.html` | Future cash projections |
| Budget vs Actual | `/demo-budget-actual.html` | Variance analysis |
| Expense Analysis | `/demo-expense-analysis.html` | Cost breakdown |
| Sales Report | `/demo-sales-report.html` | Revenue analysis |
| AP Report | `/demo-ap-report.html` | Accounts Payable |
| AR Aging | `/demo-ar-aging.html` | Receivables aging |

---

## Sample Invoices

The `/sample-invoices/` directory contains HTML invoices for testing the OCR functionality:

### Service Invoices
- `invoice-design.html` - Graphic design services
- `invoice-electrical.html` - Electrical services
- `invoice-photography.html` - Photography services
- `invoice-plumbing.html` - Plumbing services

### Supplier Invoices
- `supplier-1-building-materials.html` - Building materials
- `supplier-2-office-supplies.html` - Office supplies
- `supplier-3-it-equipment.html` - IT equipment
- `supplier-4-cleaning-supplies.html` - Cleaning supplies
- `supplier-5-food-wholesale.html` - Food wholesale

### Utility Bills
- `misc-1-electricity.html` - Electricity bill
- `misc-2-water.html` - Water bill
- `misc-3-internet.html` - Internet bill
- `misc-4-maintenance.html` - Maintenance invoice
- `misc-5-office-furniture.html` - Office furniture

### Other
- `payroll-january-2026.html` - Payroll document
- `rent-receipt-january-2026.html` - Rent receipt

---

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.example`

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

### Manual Deployment

The project consists of static HTML files and serverless functions:

1. **Static Files**: Can be hosted on any static hosting (Netlify, GitHub Pages, S3, etc.)
2. **API Functions**: Require Node.js serverless runtime (Vercel, AWS Lambda, etc.)

---

## Pricing Plans

| Plan | Price | Features |
|------|-------|----------|
| **Starter** | 99 SAR/month | 50 invoices/month, expense tracking, monthly VAT report |
| **Growth** | 199 SAR/month | Unlimited invoices, POS integration, live margins, auto VAT reconciliation |
| **Pro** | 399 SAR/month | All Growth features + multi-branch, accountant access, custom reports |

### Early Adopter Benefits
- 2 months free
- 30% lifetime discount

---

## Internationalization (i18n)

The application supports bilingual content (Arabic and English):

### Language Toggle

```javascript
function setLang(lang) {
  const html = document.getElementById('html-root');
  if (lang === 'ar') {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
  }
}
```

### CSS Classes

```css
/* Show/hide based on language */
.en { display: none; }
.ar { display: inline; }
[dir="ltr"] .en { display: inline; }
[dir="ltr"] .ar { display: none; }
```

### Usage in HTML

```html
<span class="ar">عربي</span>
<span class="en">English</span>
```

---

## Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Background | `#020617` | Page background |
| Card Background | `#0f172a` | Card surfaces |
| Border | `#1e293b` | Borders, dividers |
| Primary (Emerald) | `#34d399` | Success, primary actions |
| Cyan | `#22d3d1` | Accent, gradients |
| Purple | `#a78bfa` | Secondary solution |
| Amber | `#fbbf24` | Warnings, ZATCA branding |
| Text Primary | `#fff` | Headings |
| Text Secondary | `#94a3b8` | Body text |
| Text Muted | `#64748b` | Labels, hints |

### Typography

| Font | Usage |
|------|-------|
| Tajawal | Arabic text |
| Inter | English text |

### Gradients

```css
/* Primary Gradient */
background: linear-gradient(to left, #34d399, #22d3d1);

/* Purple Gradient */
background: linear-gradient(to right, #a78bfa, #818cf8);

/* Amber Gradient */
background: linear-gradient(to right, #fbbf24, #f59e0b);
```

---

## Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use Vercel's environment variable management for production

### API Security
- CORS headers configured for public access
- Input validation on all API endpoints
- Duplicate registration prevention

### Data Privacy
- User data stored securely in Neon PostgreSQL
- ZATCA compliance for invoice data handling

---

## Roadmap

### Phase 1 - MVP (Current)
- [x] Landing page with waitlist
- [x] Interactive demos
- [x] OCR API with OpenAI Vision
- [x] Sample invoice library
- [x] Bilingual support (AR/EN)

### Phase 2 - Beta
- [ ] User authentication
- [ ] Real POS integrations (Foodics, etc.)
- [ ] Live ZATCA API integration
- [ ] Mobile responsive optimization

### Phase 3 - Launch
- [ ] Full accounting module
- [ ] Bank reconciliation
- [ ] Inventory management
- [ ] Multi-branch support

### Phase 4 - Growth
- [ ] Mobile apps (iOS/Android)
- [ ] AI-powered financial insights
- [ ] Accountant marketplace
- [ ] API for third-party integrations

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Add bilingual support for new UI text
- Test both RTL and LTR layouts

---

## Support

- **Email**: support@muhasib.ai
- **Website**: https://muhasib.ai

---

## License

This project is proprietary software. All rights reserved.

© 2026 MuhasibAI. Made with ❤️ in Saudi Arabia.

---

<p align="center">
  <strong>مُحاسِب - محاسبة ذكية للأعمال السعودية</strong><br>
  <em>Smart Accounting for Saudi Businesses</em>
</p>
