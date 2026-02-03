import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone, email, business } = req.body;

  if (!phone || !email || !business) {
    return res.status(400).json({ error: 'Phone, email and business type are required' });
  }

  try {
    // Initialize Neon
    const sql = neon(process.env.DATABASE_URL);

    // Create table if not exists (with email column)
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        business VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Add email column if it doesn't exist (for existing tables)
    await sql`
      ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS email VARCHAR(255)
    `;

    // Check for duplicate phone or email (allow test number to bypass)
    const testNumbers = ['0549251252'];
    if (!testNumbers.includes(phone)) {
      const existing = await sql`SELECT id FROM waitlist WHERE phone = ${phone} OR email = ${email}`;
      if (existing.length > 0) {
        return res.status(400).json({ error: 'already_registered', message: 'This phone or email is already on the waitlist' });
      }
    }

    // Insert into database
    await sql`
      INSERT INTO waitlist (phone, email, business)
      VALUES (${phone}, ${email}, ${business})
    `;

    // Send notification email via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: 'Muhasib <onboarding@resend.dev>',
        to: process.env.NOTIFICATION_EMAIL || 'zamil@feedbacknfc.com',
        subject: 'New Waitlist Signup - Muhasib',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">New Waitlist Signup!</h2>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Business Type:</strong> ${business}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString('en-SA', { timeZone: 'Asia/Riyadh' })}</p>
            </div>
          </div>
        `
      });
    }

    return res.status(200).json({ success: true, message: 'Successfully joined the waitlist!' });

  } catch (error) {
    console.error('Waitlist error:', error);
    return res.status(500).json({ error: 'server_error', message: 'Something went wrong. Please try again.' });
  }
}
