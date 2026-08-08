import { Router } from "express";
import { getPool } from "../db.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/contact", async (req, res) => {
  const { name, email, company, interest, message, sourcePage } = req.body ?? {};

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please provide a valid name, email and message." });
  }
  if (String(name).length > 200 || String(message).length > 5000) {
    return res.status(400).json({ error: "Input too long." });
  }

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
