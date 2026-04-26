import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL || "noreply@kaneopromovers.com";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "info@kaneopromovers.com";

interface QuoteEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bedroomTypeFrom: string;
  bedroomTypeTo: string;
  movingDate: Date | string;
  fromCity: string;
  toCity: string;
  fromAddress: string;
  toAddress: string;
  notes?: string | null;
}

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}

export async function sendCustomerQuoteEmail(
  quote: QuoteEmailData,
  estimatedPrice: number
) {
  const date = new Date(quote.movingDate).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const priceHigh = Math.round(estimatedPrice * 1.5);

  await resend.emails.send({
    from: FROM,
    to: quote.email,
    subject: "Your Moving Quote — Kaneo Pro Movers",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#FFCC00;padding:20px;text-align:center">
          <h1 style="margin:0;color:#000;font-size:22px">KANEO PRO MOVERS</h1>
        </div>
        <div style="padding:24px;background:#fff">
          <p>Hi ${quote.firstName},</p>
          <p>Thank you for requesting a moving quote. Here are your details:</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Move Type</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">${quote.bedroomTypeFrom} → ${quote.bedroomTypeTo}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Moving Date</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">${date}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">From</td><td style="padding:8px;border-bottom:1px solid #eee">${quote.fromAddress}, ${quote.fromCity}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">To</td><td style="padding:8px;border-bottom:1px solid #eee">${quote.toAddress}, ${quote.toCity}</td></tr>
          </table>
          <div style="background:#FFF9E0;border:1px solid #FFCC00;border-radius:8px;padding:16px;text-align:center;margin:16px 0">
            <p style="margin:0;color:#666;font-size:14px">Estimated Price</p>
            <p style="margin:4px 0 0;font-size:28px;font-weight:bold;color:#000">$${estimatedPrice} – $${priceHigh}</p>
          </div>
          <p>We'll call you within <strong>2 hours</strong> at <strong>${quote.phone}</strong> to confirm details and finalize your quote.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
          <p style="color:#666;font-size:13px">Kaneo Pro Movers<br>+1(587)-378-5954<br>info@kaneopromovers.com<br>1060 Channelside DR, SW, Airdrie, AB</p>
        </div>
      </div>
    `,
  });
}

export async function sendAdminQuoteNotification(
  quote: QuoteEmailData,
  estimatedPrice: number
) {
  const date = new Date(quote.movingDate).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `🔔 New Quote — ${quote.firstName} ${quote.lastName} | ${quote.fromCity} → ${quote.toCity}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#111;padding:16px 20px">
          <h2 style="margin:0;color:#FFCC00;font-size:18px">New Quote Request</h2>
        </div>
        <div style="padding:20px;background:#fff">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 8px;color:#666;width:140px">Name</td><td style="padding:6px 8px;font-weight:bold">${quote.firstName} ${quote.lastName}</td></tr>
            <tr><td style="padding:6px 8px;color:#666">Email</td><td style="padding:6px 8px">${quote.email}</td></tr>
            <tr><td style="padding:6px 8px;color:#666">Phone</td><td style="padding:6px 8px;font-weight:bold">${quote.phone}</td></tr>
            <tr><td style="padding:6px 8px;color:#666">Move Type</td><td style="padding:6px 8px">${quote.bedroomTypeFrom} → ${quote.bedroomTypeTo}</td></tr>
            <tr><td style="padding:6px 8px;color:#666">Date</td><td style="padding:6px 8px">${date}</td></tr>
            <tr><td style="padding:6px 8px;color:#666">From</td><td style="padding:6px 8px">${quote.fromAddress}, ${quote.fromCity}</td></tr>
            <tr><td style="padding:6px 8px;color:#666">To</td><td style="padding:6px 8px">${quote.toAddress}, ${quote.toCity}</td></tr>
            <tr><td style="padding:6px 8px;color:#666">Estimated</td><td style="padding:6px 8px;font-weight:bold;color:#FFCC00">$${estimatedPrice}</td></tr>
            ${quote.notes ? `<tr><td style="padding:6px 8px;color:#666">Notes</td><td style="padding:6px 8px">${quote.notes}</td></tr>` : ""}
          </table>
          <div style="margin-top:20px;text-align:center">
            <a href="tel:${quote.phone}" style="display:inline-block;background:#FFCC00;color:#000;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:bold;margin-right:8px">Call ${quote.phone}</a>
            <a href="https://www.kaneopromovers.com/admin/leads" style="display:inline-block;background:#111;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:bold">View in Admin</a>
          </div>
        </div>
      </div>
    `,
  });
}

export async function sendContactNotification(message: ContactEmailData) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Contact Message — ${message.subject}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#111;padding:16px 20px">
          <h2 style="margin:0;color:#FFCC00;font-size:18px">New Contact Message</h2>
        </div>
        <div style="padding:20px;background:#fff">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 8px;color:#666;width:100px">Name</td><td style="padding:6px 8px;font-weight:bold">${message.name}</td></tr>
            <tr><td style="padding:6px 8px;color:#666">Email</td><td style="padding:6px 8px">${message.email}</td></tr>
            ${message.phone ? `<tr><td style="padding:6px 8px;color:#666">Phone</td><td style="padding:6px 8px">${message.phone}</td></tr>` : ""}
            <tr><td style="padding:6px 8px;color:#666">Subject</td><td style="padding:6px 8px">${message.subject}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f5f5f5;border-radius:8px">
            <p style="margin:0;white-space:pre-wrap">${message.message}</p>
          </div>
        </div>
      </div>
    `,
  });
}

export async function sendBookingConfirmationEmail(
  customerEmail: string,
  customerName: string,
  scheduledAt: Date | string,
  fromCity: string,
  toCity: string
) {
  const date = new Date(scheduledAt).toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  await resend.emails.send({
    from: FROM,
    to: customerEmail,
    subject: "Your Move is Confirmed! — Kaneo Pro Movers",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#FFCC00;padding:20px;text-align:center">
          <h1 style="margin:0;color:#000;font-size:22px">KANEO PRO MOVERS</h1>
        </div>
        <div style="padding:24px;background:#fff">
          <h2 style="color:#22C55E">✅ Your Move is Confirmed!</h2>
          <p>Hi ${customerName},</p>
          <p>Your move from <strong>${fromCity}</strong> to <strong>${toCity}</strong> is confirmed for:</p>
          <div style="background:#f5f5f5;border-radius:8px;padding:16px;text-align:center;margin:16px 0">
            <p style="margin:0;font-size:20px;font-weight:bold">${date}</p>
          </div>
          <p><strong>What to expect:</strong></p>
          <ul>
            <li>Our crew will arrive on time with all necessary equipment</li>
            <li>We'll do a walkthrough before starting</li>
            <li>All furniture will be wrapped and protected</li>
            <li>We'll set up furniture at your new location</li>
          </ul>
          <p>Questions? Call us at <strong>+1(587)-378-5954</strong></p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
          <p style="color:#666;font-size:13px">Kaneo Pro Movers<br>1060 Channelside DR, SW, Airdrie, AB</p>
        </div>
      </div>
    `,
  });
}
