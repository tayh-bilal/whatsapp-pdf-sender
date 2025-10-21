// api/send-pdf.js
import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { to, pdfUrl } = req.body;

  if (!to || !pdfUrl) {
    return res.status(400).json({ error: "Missing 'to' or 'pdfUrl' field" });
  }

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio Sandbox Number
      to: `whatsapp:${to}`,
      body: "📄 חשבונית מס",
      mediaUrl: [pdfUrl],
    });

    res.status(200).json({ success: true, message: "WhatsApp sent ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
