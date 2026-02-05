# Changelog

All notable changes to MuhasibAI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- User authentication system
- Real ZATCA API integration
- Mobile responsive optimization
- Bank reconciliation features

---

## [1.0.0] - 2026-02-05

### Added

#### Landing Page
- Hero section with bilingual content (Arabic/English)
- Language toggle (RTL/LTR support)
- Interactive chat demo preview
- Statistics section (1M+ SMEs, 100% ZATCA compliant, Real-time)
- Two solution cards (With POS / Without POS)
- Core features section with icons
- How it works - 3-step guide
- Pricing plans (Starter, Growth, Pro)
- Waitlist registration form
- Footer with links and social icons

#### Demo: ERP/POS Integration (`demo-erp-pos.html`)
- POS connection simulation (Foodics-style)
- Real-time sales sync visualization
- AI-powered invoice processing
- Expense categorization (suppliers, salaries, rent, misc)
- ZATCA validation simulation
- Accounting dashboard with:
  - Sales panel with invoice list
  - Expenses panel with categorized breakdown
  - VAT reconciliation summary
  - Profit margin calculation
- PDF invoice download functionality
- Customer delivery options (WhatsApp, Email)

#### Demo: No-POS Solution (`demo-no-pos.html`)
- Invoice upload (drag & drop, file select)
- Image preview for uploaded invoices
- AI OCR processing animation
- ZATCA validation simulation
- QR code generation (placeholder)
- Invoice ID display
- PDF download functionality
- Customer delivery options

#### Demo: Business Alerts (`demo-alerts.html`)
- Financial alerts panel:
  - VAT filing reminders
  - Electricity bill due
  - Rent payment alerts
  - Salary payments
- Regulatory alerts panel:
  - Municipality license renewal
  - Commercial registration renewal
  - GOSI payments
- Alert summary statistics (Urgent, Warning, Upcoming, Completed)
- Calendar view with alert markers
- Notification settings (WhatsApp, SMS, Email)

#### Financial Reports
- **Daily Snapshot** (`demo-daily-snapshot.html`)
  - Today's sales, COGS, expenses, profit
  - Activity feed (POS transactions, WhatsApp orders)
  - Revenue sources breakdown
  
- **Income Statement** (`demo-income-statement.html`)
  - Revenue breakdown
  - Cost of Goods Sold (COGS)
  - Operating expenses
  - Net profit calculation
  
- **Balance Sheet** (`demo-balance-sheet.html`)
  - Assets (current, fixed)
  - Liabilities (current, long-term)
  - Equity section
  
- **Cash Flow** (`demo-cash-flow.html`)
  - Operating activities
  - Investing activities
  - Financing activities
  
- **Cash Forecast** (`demo-cash-forecast.html`)
  - Projected inflows/outflows
  - Balance projections
  - Scenario analysis
  
- **Budget vs Actual** (`demo-budget-actual.html`)
  - Variance analysis
  - Category breakdown
  - Performance indicators
  
- **Expense Analysis** (`demo-expense-analysis.html`)
  - Expense by category
  - Trend analysis
  - Top expenses list
  
- **Sales Report** (`demo-sales-report.html`)
  - Revenue by channel
  - Top products/services
  - Growth metrics
  
- **AP Report** (`demo-ap-report.html`)
  - Vendor balances
  - Aging buckets
  - Payment schedule
  
- **AR Aging** (`demo-ar-aging.html`)
  - Customer balances
  - Aging analysis
  - Collection status

#### Sample Invoices (`sample-invoices/`)
- Gallery page with invoice cards
- Instructions for using with demo
- Service invoices:
  - Graphic design services
  - Electrical services
  - Photography services
  - Plumbing services
- Supplier invoices:
  - Building materials
  - Office supplies
  - IT equipment
  - Cleaning supplies
  - Food wholesale
- Utility bills:
  - Electricity (Saudi Electricity Company)
  - Water (National Water Company)
  - Internet (STC/Mobily)
  - Maintenance
  - Office furniture
- Payroll documents
- Rent receipts
- Supplier directory page

#### API Endpoints
- **POST /api/waitlist**
  - Phone, email, business type collection
  - Duplicate prevention
  - Neon database storage
  - Email notification via Resend
  
- **POST /api/ocr**
  - Base64 image input
  - OpenAI GPT-4 Vision integration
  - Structured JSON output
  - Automatic expense categorization
  - Demo mode fallback
  - Support for Arabic & English invoices

#### Infrastructure
- Vercel deployment configuration
- Neon PostgreSQL database
- Environment variables setup
- CORS configuration
- Error handling with fallbacks

### Technical Details

#### Frontend
- Pure HTML5/CSS3/JavaScript (no framework)
- Responsive design (mobile, tablet, desktop)
- RTL (Right-to-Left) support for Arabic
- Lucide icons integration
- Google Fonts (Tajawal, Inter)
- html2pdf.js for PDF generation
- CSS animations and transitions
- Gradient backgrounds and glass morphism effects

#### Backend
- Vercel Serverless Functions
- Node.js runtime
- @neondatabase/serverless for database
- Resend for email delivery
- OpenAI API integration

#### Design System
- Dark theme with slate/gray color palette
- Primary: Emerald (#34d399)
- Secondary: Purple (#a78bfa)
- Warning: Amber (#fbbf24)
- Consistent border radius (8px, 12px, 16px, 20px)
- Status badges (waiting, processing, success, error)

---

## [0.1.0] - 2026-01-15

### Added
- Initial project setup
- Basic landing page structure
- Vercel project configuration

---

## Legend

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements

---

[Unreleased]: https://github.com/muhasib/muhasib-ai/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/muhasib/muhasib-ai/releases/tag/v1.0.0
[0.1.0]: https://github.com/muhasib/muhasib-ai/releases/tag/v0.1.0
