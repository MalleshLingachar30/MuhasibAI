// Vercel Serverless Function for Invoice OCR using OpenAI Vision
// POST /api/ocr - Process invoice image and extract data

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, filename } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // Check for OpenAI API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'OpenAI API key not configured',
      demo: true,
      // Return demo data if no API key
      data: getDemoData(filename)
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert invoice/receipt analyzer for Saudi Arabian businesses. 
Extract data from invoices and receipts accurately. 
Support both Arabic and English text.
Always respond with valid JSON only, no markdown.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this invoice/receipt image and extract the following information.
Return ONLY a JSON object with these fields:

{
  "vendor_name": "Name of the vendor/supplier (Arabic or English)",
  "vendor_name_en": "English translation if Arabic",
  "invoice_number": "Invoice/receipt number if visible",
  "date": "Date in YYYY-MM-DD format",
  "subtotal": number (amount before VAT),
  "vat_amount": number (VAT/tax amount, 0 if not applicable),
  "vat_rate": number (VAT percentage, typically 15 in Saudi),
  "total": number (total amount including VAT),
  "currency": "SAR" or other currency code,
  "category": "suppliers" | "salaries" | "rent" | "misc",
  "category_reason": "Brief reason for categorization",
  "items": [{"description": "item name", "quantity": 1, "price": 100}],
  "confidence": number (0-100, your confidence in extraction accuracy)
}

Category guidelines:
- "suppliers": Material purchases, inventory, goods from vendors
- "salaries": Payroll, wages, employee payments
- "rent": Rental payments, lease payments, property
- "misc": Utilities (electricity, water, internet), maintenance, services, other

If you cannot read something clearly, use null for that field.
Respond with JSON only, no explanation.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return res.status(500).json({ 
        error: 'Failed to process image',
        details: errorData.error?.message || 'Unknown error'
      });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ error: 'No response from AI' });
    }

    // Parse JSON response
    let extractedData;
    try {
      // Remove any markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      extractedData = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        raw: content
      });
    }

    // Add metadata
    extractedData.filename = filename;
    extractedData.processed_at = new Date().toISOString();
    extractedData.demo = false;

    return res.status(200).json({
      success: true,
      data: extractedData
    });

  } catch (error) {
    console.error('OCR processing error:', error);
    return res.status(500).json({ 
      error: 'Failed to process image',
      details: error.message
    });
  }
}

// Demo data generator when no API key is configured
function getDemoData(filename) {
  const name = (filename || 'unknown').toLowerCase();
  
  let category = 'misc';
  let vendor = 'Unknown Vendor';
  let amount = 1000;
  let hasVat = true;
  
  // Determine category from filename
  if (name.includes('supplier') || name.includes('vendor') || name.includes('مورد')) {
    category = 'suppliers';
    vendor = 'ABC Supplies Co.';
    amount = 3500 + Math.floor(Math.random() * 5000);
  } else if (name.includes('payroll') || name.includes('salary') || name.includes('راتب')) {
    category = 'salaries';
    vendor = 'Payroll - January 2026';
    amount = 4000 + Math.floor(Math.random() * 4000);
    hasVat = false;
  } else if (name.includes('rent') || name.includes('إيجار')) {
    category = 'rent';
    vendor = 'Property Management LLC';
    amount = 3000 + Math.floor(Math.random() * 3000);
    hasVat = false;
  } else if (name.includes('electric') || name.includes('كهرباء')) {
    category = 'misc';
    vendor = 'Saudi Electricity Company';
    amount = 500 + Math.floor(Math.random() * 1000);
  } else if (name.includes('water') || name.includes('nwc') || name.includes('ماء')) {
    category = 'misc';
    vendor = 'National Water Company';
    amount = 200 + Math.floor(Math.random() * 400);
  } else if (name.includes('internet') || name.includes('stc') || name.includes('mobily')) {
    category = 'misc';
    vendor = 'STC / Mobily';
    amount = 300 + Math.floor(Math.random() * 500);
  }
  
  const vatAmount = hasVat ? Math.round(amount * 0.15) : 0;
  
  return {
    vendor_name: vendor,
    vendor_name_en: vendor,
    invoice_number: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    subtotal: amount,
    vat_amount: vatAmount,
    vat_rate: hasVat ? 15 : 0,
    total: amount + vatAmount,
    currency: 'SAR',
    category: category,
    category_reason: `Categorized based on filename: ${filename}`,
    items: [{ description: 'Invoice item', quantity: 1, price: amount }],
    confidence: 60,
    filename: filename,
    processed_at: new Date().toISOString(),
    demo: true
  };
}
