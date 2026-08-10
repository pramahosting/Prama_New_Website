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
- AccFino (www.accfino.com): AI-native Accounting & Finance platform for SME — Groq
  LLM + Ripple Down Rules bank reconciliation, a leaderboard of ML models for cash-flow
  forecasting, crypto & equity CGT, open banking, and smart lending readiness analysis. Grew out
  of Prama AI's earlier SAAR expense-classification engine.
- TalentIQ (talentiq.prama-ai.com): six modules split by user — two for individuals (CVAnalysis
  for resume review, Jobhunter for live job matching) and four for businesses (MarketIntel for
  live salary/demand data, Linkexplore for LinkedIn sourcing, JD Creator for job descriptions,
  Candidatelens for detailed candidate evaluation).
- MindKaar (mindkaar.prama-ai.com): a "mind gym" — a deterministic 6-domain wellbeing assessment
  paired with progressive mini-games, plus a live voice-roleplay simulation with an emotionally
  reactive AI character.

COMPANY: Founded 2018, HQ at 11 York Street, Sydney NSW 2000, Australia. 20+ developers and
architects, 50+ years combined open-source & cloud experience. Contact: info@prama-ai.com.

If asked something outside this scope (legal, pricing guarantees, or anything you're unsure of),
say you don't have that detail and suggest the contact form or info@prama-ai.com. Never make up
statistics, client names, or prices that aren't listed above.`;

// Groq deprecated the llama-3.x chat models (announced June 2026); this default
// is the currently-recommended replacement. Override with GROQ_MODEL if needed —
// see https://console.groq.com/docs/models for the current list.
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

// Deterministic fallback, grounded in the same website content as the system
// prompt above. Used whenever Groq can't answer (no API key configured, the
// API call fails, or a network error) — so the concierge stays useful and
// on-topic instead of just failing outright, similar to the deterministic
// fallback pattern MindKaar's own app uses for its Groq-dependent features.
const FALLBACK_ANSWERS = [
  {
    keywords: ["data architecture", "cloud data", "data governance", "feature engineering", "data visualisation", "data visualization", "analytics consulting"],
    answer:
      "Yes — Data Solutions is one of our four service pillars: cloud data architecture, feature engineering, data visualisation, analytics consulting & architecture, and data governance. Get in touch via /contact for specifics on your setup.",
  },
  {
    keywords: ["agentic", "automation", "machine learning", "ml solution", "chatbot", "rag", "model context protocol", "mcp", "cyber analytics", "optimisation", "optimization"],
    answer:
      "Yes — our Agentic AI Systems pillar covers AI & automation, machine learning solutions, workforce/resource/supply-chain optimisation, cyber analytics, chatbot orchestration, RAG architecture, Model Context Protocol, and agentic solutions. Reach out via /contact to discuss your use case.",
  },
  {
    keywords: ["cloud migration", "devops", "kubernetes", "serverless", "infrastructure as code", "finops", "cloud cost", "cloud spend"],
    answer:
      "Yes — Cloud & FinOps is one of our four pillars: cloud migration & DevOps, Kubernetes & serverless, infrastructure as code & security, and AI-native FinOps for cloud/AI spend visibility. Get in touch via /contact for details.",
  },
  {
    keywords: ["website", "web application", "digital application", "cms", "e-commerce", "ecommerce", "booking", "seo"],
    answer:
      "Yes — our Web and Digital Applications pillar covers web/digital builds, CMS & event platforms, e-commerce & booking integrations, and SEO/analytics/growth tooling. Contact us via /contact to discuss your project.",
  },
  {
    keywords: ["accfino"],
    answer:
      "AccFino (www.accfino.com) is our AI-native Accounting & Finance platform built for SME — AI bank reconciliation, ML cash-flow forecasting, crypto & equity CGT, open banking, and smart lending analysis.",
  },
  {
    keywords: ["talentiq"],
    answer:
      "TalentIQ (talentiq.prama-ai.com) is our talent-intelligence platform with six modules: CVAnalysis and Jobhunter for individual job seekers; MarketIntel, Linkexplore, JD Creator and Candidatelens for businesses hiring.",
  },
  {
    keywords: ["mindkaar", "mind gym"],
    answer:
      "MindKaar (mindkaar.prama-ai.com) is our mental-wellness platform — a 6-domain assessment, progressive mini-games, and a live voice-roleplay simulation.",
  },
  {
    keywords: ["product", "portfolio"],
    answer:
      "We build and run three live products: AccFino (AI accounting), TalentIQ (talent intelligence), and MindKaar (mental wellness). See /products for details.",
  },
  {
    keywords: ["price", "pricing", "cost", "how much"],
    answer:
      "We don't publish fixed pricing since every engagement is scoped to the work involved — typically delivered as 60-90 day drops. The best next step is a discovery call via /contact.",
  },
  {
    keywords: ["contact", "email", "reach", "get in touch", "phone", "address", "location", "office"],
    answer:
      "You can reach us at info@prama-ai.com or through the contact form at /contact. We're based at 11 York Street, Sydney NSW 2000, Australia.",
  },
  {
    keywords: ["about", "founded", "history", "team", "who are you", "company"],
    answer:
      "Prama AI is a Sydney-based data, analytics and AI consultancy, founded in 2018, with 20+ developers and architects and 50+ years of combined open-source & cloud experience.",
  },
];

function fallbackAnswer(userText) {
  const text = (userText || "").toLowerCase();
  let best = null;
  let bestHits = 0;
  for (const entry of FALLBACK_ANSWERS) {
    const hits = entry.keywords.filter((k) => text.includes(k)).length;
    if (hits > bestHits) {
      bestHits = hits;
      best = entry;
    }
  }
  if (best) return best.answer;
  return "I don't have that detail on hand right now — for anything beyond our core services and products, the best next step is the contact form at /contact or info@prama-ai.com.";
}

router.post("/chat", async (req, res) => {
  const { messages, sessionId } = req.body ?? {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array required" });
  }

  const trimmed = messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content ?? "").slice(0, 2000),
  }));
  const lastUserMessage = trimmed[trimmed.length - 1]?.content || "";

  function logAndRespond(reply) {
    res.status(200).json({ reply });
    const pool = getPool();
    if (pool && sessionId) {
      pool
        .query(
          `insert into chat_logs (session_id, role, content) values ($1,'user',$2),($1,'assistant',$3)`,
          [String(sessionId).slice(0, 100), lastUserMessage, reply]
        )
        .catch((err) => console.error("[chat] log insert failed:", err.message));
    }
  }

  // No Groq key configured — answer from website content instead of failing.
  if (!process.env.GROQ_API_KEY) {
    console.warn("[chat] GROQ_API_KEY not set — using website-content fallback.");
    return logAndRespond(fallbackAnswer(lastUserMessage));
  }

  try {
    // Groq's Chat Completions API is OpenAI-compatible: the system prompt is
    // just the first message in the array (unlike Anthropic's separate
    // top-level `system` field), and the reply comes back as
    // choices[0].message.content rather than a content-blocks array.
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_completion_tokens: 500,
        temperature: 0.6,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[chat] Groq API error, using website-content fallback:", response.status, errText);
      return logAndRespond(fallbackAnswer(lastUserMessage));
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || fallbackAnswer(lastUserMessage);

    logAndRespond(reply);
  } catch (err) {
    console.error("[chat] request failed, using website-content fallback:", err.message);
    logAndRespond(fallbackAnswer(lastUserMessage));
  }
});

export default router;
