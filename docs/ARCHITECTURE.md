# MuhasibAI Architecture Documentation

> System architecture and design decisions

---

## System Overview

MuhasibAI is a serverless web application built with static frontend files and Vercel serverless functions for backend processing.

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Browser   │  │  Mobile Web │  │   Future: iOS/Android│  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
└─────────┼────────────────┼───────────────────┼──────────────┘
          │                │                   │
          └────────────────┴───────────────────┘
                           │
                    ┌──────▼──────┐
                    │   Vercel    │
                    │    Edge     │
                    └──────┬──────┘
                           │
    ┌──────────────────────┼──────────────────────┐
    │                      │                      │
┌───▼───┐           ┌──────▼──────┐         ┌────▼────┐
│Static │           │  Serverless │         │   API   │
│Assets │           │  Functions  │         │ Gateway │
└───────┘           └──────┬──────┘         └─────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌─────▼─────┐     ┌─────▼─────┐
    │  Neon   │      │  OpenAI   │     │  Resend   │
    │ (Postgres)│    │  (GPT-4)  │     │  (Email)  │
    └─────────┘      └───────────┘     └───────────┘
```

---

## Component Architecture

### Frontend Architecture

```
frontend/
├── Landing Page (index.html)
│   ├── Hero Section
│   ├── Demo Banners
│   ├── Feature Cards
│   ├── Pricing Section
│   └── Waitlist Form
│
├── Demo: ERP/POS (demo-erp-pos.html)
│   ├── POS Connection Panel
│   ├── AI Processing Agent
│   ├── ZATCA Validation
│   └── Accounting Dashboard
│
├── Demo: No-POS (demo-no-pos.html)
│   ├── Invoice Upload
│   ├── AI OCR Processing
│   └── ZATCA Compliance
│
├── Demo: Alerts (demo-alerts.html)
│   ├── Financial Alerts
│   ├── Regulatory Alerts
│   └── Calendar View
│
└── Financial Reports
    ├── Daily Snapshot
    ├── Income Statement
    ├── Balance Sheet
    ├── Cash Flow
    └── Other Reports
```

### Backend Architecture

```
api/
├── /api/waitlist (waitlist.js)
│   ├── Input Validation
│   ├── Duplicate Check
│   ├── Database Insert
│   └── Email Notification
│
└── /api/ocr (ocr.js)
    ├── Image Validation
    ├── OpenAI Vision API
    ├── JSON Parsing
    └── Demo Fallback
```

---

## Data Flow Diagrams

### Waitlist Registration Flow

```
User                   Frontend              API               Database           Email
 │                        │                   │                    │                │
 │    Fill Form           │                   │                    │                │
 │───────────────────────>│                   │                    │                │
 │                        │   POST /waitlist  │                    │                │
 │                        │──────────────────>│                    │                │
 │                        │                   │  Check Duplicate   │                │
 │                        │                   │───────────────────>│                │
 │                        │                   │   Not Found        │                │
 │                        │                   │<───────────────────│                │
 │                        │                   │  INSERT Record     │                │
 │                        │                   │───────────────────>│                │
 │                        │                   │     Success        │                │
 │                        │                   │<───────────────────│                │
 │                        │                   │      Send Notification              │
 │                        │                   │─────────────────────────────────────>│
 │                        │   200 Success     │                    │                │
 │                        │<──────────────────│                    │                │
 │   Show Success         │                   │                    │                │
 │<───────────────────────│                   │                    │                │
 │                        │                   │                    │                │
```

### OCR Processing Flow

```
User                   Frontend              API               OpenAI
 │                        │                   │                    │
 │   Upload Image         │                   │                    │
 │───────────────────────>│                   │                    │
 │                        │  Convert Base64   │                    │
 │                        │──────────────────>│                    │
 │                        │                   │                    │
 │                        │   POST /api/ocr   │                    │
 │                        │──────────────────>│                    │
 │                        │                   │  Vision API Call   │
 │                        │                   │───────────────────>│
 │                        │                   │    JSON Response   │
 │                        │                   │<───────────────────│
 │                        │                   │   Parse & Format   │
 │                        │   Extracted Data  │                    │
 │                        │<──────────────────│                    │
 │   Display Results      │                   │                    │
 │<───────────────────────│                   │                    │
 │                        │                   │                    │
```

---

## Technology Decisions

### Why Static HTML?

| Decision | Rationale |
|----------|-----------|
| No Build Step | Faster iteration, simpler deployment |
| Direct Browser Support | No transpilation needed |
| Easy i18n | Simple show/hide for bilingual content |
| Performance | No JavaScript framework overhead |
| SEO Friendly | Content immediately available |

### Why Vercel Serverless?

| Decision | Rationale |
|----------|-----------|
| Zero Config | Automatic scaling, no server management |
| Edge Network | Global CDN for static assets |
| Serverless Functions | Pay-per-use, auto-scaling |
| Free Tier | Cost-effective for MVP |

### Why Neon (PostgreSQL)?

| Decision | Rationale |
|----------|-----------|
| Serverless | Matches Vercel's serverless model |
| PostgreSQL | Reliable, feature-rich RDBMS |
| Auto-scaling | Scales with demand |
| Branching | Database branching for development |

### Why OpenAI GPT-4 Vision?

| Decision | Rationale |
|----------|-----------|
| Accuracy | State-of-the-art OCR capabilities |
| Bilingual | Excellent Arabic + English support |
| Structured Output | Returns JSON directly |
| Categorization | Can classify expense types |

---

## Security Architecture

### Frontend Security

```
┌────────────────────────────────────────┐
│           Browser Security              │
├────────────────────────────────────────┤
│ • HTTPS only (via Vercel)              │
│ • No sensitive data in localStorage    │
│ • Form validation                       │
│ • XSS prevention (no eval, innerHTML)  │
└────────────────────────────────────────┘
```

### Backend Security

```
┌────────────────────────────────────────┐
│           API Security                  │
├────────────────────────────────────────┤
│ • Environment variables for secrets    │
│ • Input validation                     │
│ • CORS configuration                   │
│ • Request size limits (10MB)           │
│ • Duplicate registration prevention    │
└────────────────────────────────────────┘
```

### Data Security

```
┌────────────────────────────────────────┐
│           Data Security                 │
├────────────────────────────────────────┤
│ • SSL/TLS for database connections     │
│ • No PII logging                       │
│ • Minimal data collection              │
│ • Secure credential storage            │
└────────────────────────────────────────┘
```

---

## Scalability Considerations

### Current Architecture (MVP)

- **Capacity**: ~1,000 concurrent users
- **Database**: Neon serverless (auto-scales)
- **Functions**: Vercel serverless (auto-scales)
- **Static**: Vercel Edge CDN (global)

### Future Architecture (Production)

```
┌─────────────────────────────────────────────────────────────┐
│                      Load Balancer                           │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────▼────┐          ┌─────▼─────┐        ┌─────▼─────┐
   │  Auth   │          │    API    │        │   Queue   │
   │ Service │          │  Gateway  │        │  (Redis)  │
   └─────────┘          └───────────┘        └───────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
    ┌────▼────┐         ┌─────▼─────┐       ┌─────▼─────┐
    │Microservices│     │  Primary  │       │  Replica  │
    │           │       │    DB     │       │    DB     │
    └───────────┘       └───────────┘       └───────────┘
```

---

## Performance Optimizations

### Frontend Performance

| Optimization | Implementation |
|--------------|----------------|
| Font Loading | Google Fonts with `display=swap` |
| Icons | Lucide (tree-shakeable) |
| Images | Lazy loading, optimized formats |
| CSS | Inline critical CSS |
| JavaScript | Minimal, no framework |

### Backend Performance

| Optimization | Implementation |
|--------------|----------------|
| Edge Functions | Vercel Edge Runtime |
| Connection Pooling | Neon serverless driver |
| Caching | CDN caching for static assets |
| Image Processing | Client-side base64 conversion |

---

## Monitoring & Observability

### Current Monitoring

- Vercel Analytics (basic)
- Browser console logging
- Error fallbacks (demo mode)

### Future Monitoring

```
┌─────────────────────────────────────────────────────────────┐
│                     Observability Stack                      │
├─────────────────────────────────────────────────────────────┤
│  Logging    │ Structured logs → Log aggregation (ELK/Loki)  │
│  Metrics    │ Custom metrics → Prometheus/Grafana           │
│  Tracing    │ Request tracing → Jaeger/Zipkin               │
│  Alerting   │ Threshold alerts → PagerDuty/Slack            │
│  APM        │ Performance monitoring → Datadog/New Relic    │
└─────────────────────────────────────────────────────────────┘
```

---

## Disaster Recovery

### Current Strategy

- **Code**: Git repository (GitHub)
- **Database**: Neon automatic backups
- **Secrets**: Vercel environment variables

### Future Strategy

| Component | RTO | RPO | Strategy |
|-----------|-----|-----|----------|
| Frontend | 5 min | 0 | Multi-region CDN |
| API | 15 min | 0 | Multi-region functions |
| Database | 1 hour | 15 min | Point-in-time recovery |
| Secrets | 30 min | 0 | Vault replication |

---

## Integration Points

### Current Integrations

```
┌─────────────────────────────────────────────────────────────┐
│                     External Services                        │
├─────────────────────────────────────────────────────────────┤
│  OpenAI       │ GPT-4 Vision for OCR                        │
│  Resend       │ Transactional email                         │
│  Neon         │ PostgreSQL database                         │
│  Google Fonts │ Typography                                  │
│  Lucide       │ Icon library                                │
│  html2pdf.js  │ PDF generation                              │
└─────────────────────────────────────────────────────────────┘
```

### Future Integrations

```
┌─────────────────────────────────────────────────────────────┐
│                     Planned Integrations                     │
├─────────────────────────────────────────────────────────────┤
│  ZATCA         │ E-invoicing API                            │
│  Foodics       │ POS integration                            │
│  Marn          │ POS integration                            │
│  STC Pay       │ Payment processing                         │
│  Mada          │ Payment processing                         │
│  WhatsApp      │ Business notifications                     │
│  Bank APIs     │ Account reconciliation                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Development Workflow

### Git Workflow

```
main ─────────────────────────────────────────────> Production
  │
  └── feature/xxx ──> PR Review ──> Merge ──> Auto Deploy
  │
  └── fix/xxx ──────> PR Review ──> Merge ──> Auto Deploy
```

### CI/CD Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│   Push   │───>│  Build   │───>│  Test    │───>│  Deploy  │
│          │    │          │    │          │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                     │
                                              ┌──────▼──────┐
                                              │   Vercel    │
                                              │  Production │
                                              └─────────────┘
```

---

## Future Architecture Considerations

### Microservices Migration

When the system grows, consider splitting into:

1. **Auth Service** - User authentication and authorization
2. **Invoice Service** - Invoice creation and management
3. **OCR Service** - Document processing
4. **Reporting Service** - Financial report generation
5. **Notification Service** - Alerts and reminders
6. **Integration Service** - Third-party integrations

### Event-Driven Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Event Bus (Kafka/Redis)                 │
├─────────────────────────────────────────────────────────────┤
│  invoice.created    │ → OCR Service → ZATCA Service         │
│  invoice.processed  │ → Accounting Service                  │
│  payment.due        │ → Notification Service                │
│  report.requested   │ → Reporting Service                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Appendix

### Environment Setup

```bash
# Development
cp .env.example .env
npm install
vercel dev

# Production
vercel --prod
```

### Key Files

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel configuration |
| `package.json` | Dependencies |
| `.env.example` | Environment template |
| `api/*.js` | Serverless functions |

---

© 2026 MuhasibAI
