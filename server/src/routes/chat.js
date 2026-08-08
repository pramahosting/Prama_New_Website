import { Router } from "express";
import { getPool } from "../db.js";

const router = Router();

const SYSTEM_PROMPT = `You are the website concierge for Prama AI (www.prama-ai.com), a Sydney-based data,
analytics and AI consultancy. Answer visitor questions helpfully, briefly (2-4 sentences unless asked
for more), and steer relevant conversations toward booking a discovery call via /contact.

Ground every answer in this information — do not invent facts, pricing, or claims beyond it:

SERVICES (Australia-wide), organised in four pillars:
- Agentic AI Systems: AI & automation, machine learning solutions, optimisation (workforce,
  resource, supply chain), cyber analytics, chatbot orchestration, RAG architecture, Model
  Context Protocol, agentic solutions.
- Data Solutions: cloud data architecture, feature engineering, data visualisation, analytics
  consulting & architecture, data governance.
- Cloud & FinOps: cloud migration & DevOps, Kubernetes & serverless, infrastructure as code &
  security, AI-native FinOps (cloud/AI spend visibility and cost control).
- Web and Digital Applications: web and digital applications, CMS & event platforms, e-commerce &
  booking integrations, SEO/analytics/growth tooling.

Engagements typically run as 60-90 day delivery drops ("succeed quick or fail fast"), using
IP-rich accelerators and reusable ML models that save 30-40% of delivery effort versus building
from scratch.

PRODUCT PORTFOLIO (live products built and run by Prama AI):
- AccFino (www.accfino.com): AI-native accounting platform for Australian small business — AI
  bank reconciliation, ML cash-flow forecasting, crypto & equity CGT, open banking, GST
  invoicing. Grew out of Prama AI's earlier SAAR expense-classification engine.
- TalentIQ (talentiq.prama-ai.com): AI-powered job hunting, market intelligence and candidate
  search platform for recruiters and job seekers.
- MindKaar (mindkaar.prama-ai.com): a "mind gym" — guided mental-fitness sessions and adaptive
  progress tracking.

COMPANY: Founded 2018, HQ at 11 York Street, Sydney NSW 2000, Australia. 20+ developers and
architects, 50+ years combined open-source & cloud experience. Contact: info@prama-ai.com.

If asked something outside this scope (legal, pricing guarantees, or anything you're unsure of),
say you don't have that detail and suggest the contact form or info@prama-ai.com. Never make up
statistics, client names, or prices that aren't listed above.`;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

router.post("/chat", async (req, res) => {
  const { messages, sessionId } = req.body ?? {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array required" });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: "Concierge is not configured on this deployment yet." });
  }

  const trimmed = messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content ?? "").slice(0, 2000),
  }));

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: trimmed,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[chat] Anthropic API error:", response.status, errText);
      return res.status(502).json({ error: "Concierge is temporarily unavailable." });
    }

    const data = await response.json();
    const reply = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim() || "Sorry, I don't have an answer for that right now.";

    res.status(200).json({ reply });

    // best-effort logging, never blocks the response
    const pool = getPool();
    if (pool && sessionId) {
      const last = trimmed[trimmed.length - 1];
      pool
        .query(
          `insert into chat_logs (session_id, role, content) values ($1,'user',$2),($1,'assistant',$3)`,
          [String(sessionId).slice(0, 100), last.content, reply]
        )
        .catch((err) => console.error("[chat] log insert failed:", err.message));
    }
  } catch (err) {
    console.error("[chat] request failed:", err.message);
    res.status(502).json({ error: "Concierge is temporarily unavailable." });
  }
});

export default router;
