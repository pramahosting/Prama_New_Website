import { Router } from "express";
import { getPool } from "../db.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TO_EMAIL = process.env.TO_EMAIL || "info@prama-ai.com";

// Sends the actual notification email via Resend's REST API (no extra
// dependency needed — same native fetch pattern already used for Groq in
// chat.js). Optional by design: if RESEND_API_KEY isn't set, the lead is
// still saved to the database (or logged) below, just without an email
// alert, so the form keeps working before Resend is configured.
async function sendNotificationEmail({ name, email, company, interest, message, sourcePage }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY not set — skipping email notification.");
    return;
  }
  const fromAddress = process.env.FROM_EMAIL || "Prama AI Website <onboarding@resend.dev>";

  const html = `
    <h2>New enquiry from prama-ai.com</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
    ${interest ? `<p><strong>Interested in:</strong> ${escapeHtml(interest)}</p>` : ""}
    ${sourcePage ? `<p><strong>Submitted from:</strong> ${escapeHtml(sourcePage)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: fromAddress,
        to: TO_EMAIL,
        reply_to: email,
        subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
        html,
      }),
    });
    if (!response.ok) {
      const errText = await response.text();
      console.error("[contact] Resend API error:", response.status, errText);
    }
  } catch (err) {
    console.error("[contact] email send failed:", err.message);
  }
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

router.post("/contact", async (req, res) => {
  const { name, email, company, interest, message, sourcePage } = req.body ?? {};

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please provide a valid name, email and message." });
  }
  if (String(name).length > 200 || String(message).length > 5000) {
    return res.status(400).json({ error: "Input too long." });
  }

  // Fire off the email notification — don't let a slow/failed email block
  // saving the lead, and vice versa; both happen independently below.
  sendNotificationEmail({ name, email, company, interest, message, sourcePage });

  const pool = getPool();
  if (!pool) {
    console.log("[contact] (no DB configured) lead received:", { name, email, company, interest });
    return res.status(200).json({ ok: true, persisted: false });
  }

  try {
    await pool.query(
      `insert into leads (name, email, company, interest, message, source_page)
       values ($1, $2, $3, $4, $5, $6)`,
      [
        String(name).slice(0, 200),
        String(email).slice(0, 200),
        company ? String(company).slice(0, 200) : null,
        interest ? String(interest).slice(0, 100) : null,
        String(message).slice(0, 5000),
        sourcePage ? String(sourcePage).slice(0, 200) : null,
      ]
    );
    res.status(200).json({ ok: true, persisted: true });
  } catch (err) {
    console.error("[contact] insert failed:", err.message);
    res.status(500).json({ error: "Could not save your message right now." });
  }
});

export default router;
