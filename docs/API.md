# MuhasibAI API Documentation

> Complete API reference for MuhasibAI backend services

---

## Base URL

```
Production: https://muhasib.ai/api
Development: http://localhost:3000/api
```

---

## Authentication

Currently, the API endpoints are public and do not require authentication. Authentication will be added in future versions.

---

## Endpoints

### 1. Waitlist Registration

Register a new user on the product waitlist.

#### Endpoint

```
POST /api/waitlist
```

#### Headers

| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `phone` | string | Yes | Saudi phone number (e.g., "05xxxxxxxx") |
| `email` | string | Yes | Valid email address |
| `business` | string | Yes | Business type (e.g., "restaurant", "clinic", "contractor") |

#### Example Request

```bash
curl -X POST https://muhasib.ai/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "0512345678",
    "email": "owner@mybusiness.com",
    "business": "restaurant"
  }'
```

#### Responses

**Success (200 OK)**
```json
{
  "success": true,
  "message": "Successfully joined the waitlist!"
}
```

**Already Registered (400 Bad Request)**
```json
{
  "error": "already_registered",
  "message": "This phone or email is already on the waitlist"
}
```

**Missing Fields (400 Bad Request)**
```json
{
  "error": "Phone, email and business type are required"
}
```

**Server Error (500 Internal Server Error)**
```json
{
  "error": "server_error",
  "message": "Something went wrong. Please try again."
}
```

#### Notes

- The test phone number `0549251252` bypasses duplicate checking (for testing purposes)
- An email notification is sent to the admin when a new user registers (if Resend is configured)

---

### 2. Invoice OCR Processing

Process an invoice/receipt image using AI to extract structured data.

#### Endpoint

```
POST /api/ocr
```

#### Headers

| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | string | Yes | Base64-encoded image data (with or without data URI prefix) |
| `filename` | string | No | Original filename (used for demo categorization) |

#### Maximum File Size

10 MB

#### Supported Image Formats

- JPEG/JPG
- PNG
- WebP
- GIF

#### Example Request

```bash
curl -X POST https://muhasib.ai/api/ocr \
  -H "Content-Type: application/json" \
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "filename": "supplier-invoice.jpg"
  }'
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether the request was processed |
| `data` | object | Extracted invoice data |
| `error` | string | Error message (if any) |

#### Data Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `vendor_name` | string | Name of the vendor/supplier |
| `vendor_name_en` | string | English translation (if Arabic) |
| `invoice_number` | string | Invoice/receipt number |
| `date` | string | Date in YYYY-MM-DD format |
| `subtotal` | number | Amount before VAT |
| `vat_amount` | number | VAT/tax amount |
| `vat_rate` | number | VAT percentage (typically 15 in Saudi) |
| `total` | number | Total amount including VAT |
| `currency` | string | Currency code (e.g., "SAR") |
| `category` | string | Expense category |
| `category_reason` | string | Reason for categorization |
| `items` | array | Line items on the invoice |
| `confidence` | number | AI confidence score (0-100) |
| `filename` | string | Original filename |
| `processed_at` | string | ISO timestamp |
| `demo` | boolean | Whether demo data was returned |

#### Expense Categories

| Category | Description | Examples |
|----------|-------------|----------|
| `suppliers` | Material purchases, inventory | Building materials, office supplies, goods |
| `salaries` | Employee payments | Payroll, wages, bonuses |
| `rent` | Property payments | Rent, lease payments |
| `misc` | Other expenses | Utilities, maintenance, services |

#### Example Success Response

```json
{
  "success": true,
  "data": {
    "vendor_name": "شركة التوريدات المتحدة",
    "vendor_name_en": "United Supplies Company",
    "invoice_number": "INV-2026-001234",
    "date": "2026-01-15",
    "subtotal": 5000,
    "vat_amount": 750,
    "vat_rate": 15,
    "total": 5750,
    "currency": "SAR",
    "category": "suppliers",
    "category_reason": "Building materials purchase from vendor",
    "items": [
      {"description": "Cement bags (50kg)", "quantity": 20, "price": 150},
      {"description": "Steel rods", "quantity": 10, "price": 200}
    ],
    "confidence": 92,
    "filename": "supplier-invoice.jpg",
    "processed_at": "2026-01-15T10:30:00.000Z",
    "demo": false
  }
}
```

#### Demo Mode Response

When the OpenAI API key is not configured, the API returns demo data based on the filename:

```json
{
  "success": true,
  "error": "OpenAI API key not configured",
  "data": {
    "vendor_name": "ABC Supplies Co.",
    "invoice_number": "INV-123456",
    "date": "2026-01-15",
    "subtotal": 3500,
    "vat_amount": 525,
    "vat_rate": 15,
    "total": 4025,
    "currency": "SAR",
    "category": "suppliers",
    "category_reason": "Categorized based on filename: supplier-invoice.jpg",
    "confidence": 60,
    "demo": true
  }
}
```

#### Error Handling

The API gracefully handles errors by returning demo data:

1. **Missing OpenAI API Key**: Returns demo data with `demo: true`
2. **OpenAI API Error**: Returns demo data with error message
3. **JSON Parse Error**: Returns demo data as fallback
4. **Network Error**: Returns demo data as fallback

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 405 | Method Not Allowed - Wrong HTTP method |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently, there are no rate limits. Rate limiting will be implemented in production.

---

## CORS

The API allows cross-origin requests from any domain:

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

---

## Database Schema

### Waitlist Table

```sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  business VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Integration Examples

### JavaScript (Fetch API)

```javascript
// Waitlist Registration
async function joinWaitlist(phone, email, business) {
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, email, business })
  });
  return response.json();
}

// OCR Processing
async function processInvoice(imageFile) {
  const reader = new FileReader();
  reader.readAsDataURL(imageFile);
  
  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      const response = await fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: reader.result,
          filename: imageFile.name
        })
      });
      resolve(response.json());
    };
    reader.onerror = reject;
  });
}
```

### Python (Requests)

```python
import requests
import base64

# Waitlist Registration
def join_waitlist(phone, email, business):
    response = requests.post(
        'https://muhasib.ai/api/waitlist',
        json={
            'phone': phone,
            'email': email,
            'business': business
        }
    )
    return response.json()

# OCR Processing
def process_invoice(image_path):
    with open(image_path, 'rb') as f:
        image_data = base64.b64encode(f.read()).decode('utf-8')
    
    response = requests.post(
        'https://muhasib.ai/api/ocr',
        json={
            'image': f'data:image/jpeg;base64,{image_data}',
            'filename': image_path.split('/')[-1]
        }
    )
    return response.json()
```

### cURL

```bash
# Waitlist Registration
curl -X POST https://muhasib.ai/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"phone":"0512345678","email":"test@test.com","business":"restaurant"}'

# OCR Processing (with base64 file)
curl -X POST https://muhasib.ai/api/ocr \
  -H "Content-Type: application/json" \
  -d "{\"image\":\"$(base64 -i invoice.jpg)\",\"filename\":\"invoice.jpg\"}"
```

---

## Webhooks (Future)

Webhooks will be available in future versions for:

- New invoice processed
- ZATCA validation complete
- Payment reminders
- VAT report ready

---

## Versioning

The API does not currently use versioning. When versioning is introduced:

```
https://muhasib.ai/api/v1/waitlist
https://muhasib.ai/api/v2/ocr
```

---

## Support

For API support, contact:

- **Email**: api-support@muhasib.ai
- **Documentation**: https://docs.muhasib.ai

---

© 2026 MuhasibAI
