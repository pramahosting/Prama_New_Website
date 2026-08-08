export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  description: string[];
  url: string;
  accent: string; // hex
  accentDark: string; // darker partner shade, used for hero gradients
  badgeColor: string; // distinct colour per product for the emoji badge — deliberately
  badgeColorDark: string; // different from `accent`, so AccFino/TalentIQ/MindKaar don't all read as "blue"
  emoji: string; // kept as an accessible text fallback if the logo image fails to load
  logo: string; // real product logo, shown everywhere this product appears
  logoScale: number; // compensates for differing amounts of transparent margin
  // baked into each source badge's rounded corners, so all three logos read
  // as the same visual size inside an identical-sized container.
  badges: string[]; // short capability pills, hero-style
  stats: { value: string; label: string }[]; // 3-stat highlight strip
  features: { title: string; detail: string }[]; // main functions
  technical: { title: string; icon: string; detail: string }[]; // product-specific deep-dive tiles — different count/headings per product, reflecting what's actually distinctive about each one
  stack: string[];
};

// Prama AI's own live products. (Kutumb, Headstart Finances and HS Education are newer,
// separately branded ventures and are intentionally not listed here.)
export const products: Product[] = [
  {
    slug: "accfino",
    name: "AccFino",
    category: "Fintech · Accounting AI",
    emoji: "🧾",
    logo: "/img/products/accfino.png?v=10",
    logoScale: 1.30,
    tagline: "Accounting that thinks ahead of your books",
    summary:
      "An AI-native accounting platform for Australian small business — reconciliation, cash-flow forecasting, capital gains and smart lending analysis in one login.",
    description: [
      "AccFino unifies AI bank reconciliation, ML cash-flow forecasting, crypto and equity CGT reporting, open banking feeds, and a smart lending readiness engine in a single platform built for Australian small business and the accountants who serve them.",
      "Every transaction is classified by a Groq-hosted LLM call, layered under a Ripple Down Rules (RDR) exception system — accountants can override any specific case, and that override becomes a permanent rule that takes priority next time, without retraining anything.",
      "AccFino grew out of Prama AI's earlier SAAR expense-classification engine, rebuilt as a full accounting platform for the Australian market.",
    ],
    url: "https://www.accfino.com",
    accent: "#395194",
    accentDark: "#192442",
    badgeColor: "#d6a553",
    badgeColorDark: "#6b5229",
    badges: ["AI Reconciliation", "ML Forecasting", "Crypto & Equity CGT", "Smart Lending"],
    stats: [
      { value: "10+", label: "Forecasting models leaderboarded per run" },
      { value: "Mins", label: "BAS-ready output, not hours" },
      { value: "AU", label: "Data residency, always" },
    ],
    features: [
      { title: "AI bank reconciliation", detail: "Groq LLM classification layered under an RDR exception system accountants can correct and refine directly." },
      { title: "ML cash-flow forecasting", detail: "A leaderboard of 10+ scikit-learn regressors is cross-validated on time-series splits; the current best performer is used automatically." },
      { title: "Crypto & equity CGT", detail: "Multi-exchange and broker file import with cost-base tracking for ATO-ready capital gains reporting." },
      { title: "Smart lending analysis", detail: "Multi-file statement upload (PDF/CSV/image) with gap detection and deduplication to assess lending readiness." },
    ],
    technical: [
      {
        title: "Ripple Down Rules Classification",
        icon: "GitBranch",
        detail: "Groq-hosted LLM calls (openai/gpt-oss-20b, drawn from a rotating pool of API keys for resilience) classify each transaction, layered under a Ripple Down Rules exception system — every accountant correction becomes a permanent rule that takes priority next time, with no retraining step.",
      },
      {
        title: "ML Forecasting Leaderboard",
        icon: "BarChart3",
        detail: "Cash-flow forecasting runs a leaderboard of 10+ scikit-learn regressors — Random Forest, Extra Trees, Ridge, Lasso, SVR, a small MLP neural net and more — cross-validated on time-series splits, automatically selecting whichever is currently forecasting best rather than committing to one algorithm permanently.",
      },
      {
        title: "Multi-Format Document Extraction",
        icon: "FileText",
        detail: "Bank statements and receipts arrive as CSV, PDF or photographed images; Tesseract OCR (and Claude for harder image extractions in the lending module) reads all three into the same transaction pipeline.",
      },
      {
        title: "Smart Lending Engine",
        icon: "Wallet",
        detail: "A dedicated module accepts multi-file statement uploads, detects gaps in statement history, deduplicates overlapping transactions, and computes the metrics an accountant needs to assess lending readiness.",
      },
      {
        title: "Dual-Database Strategy",
        icon: "Database",
        detail: "SQLite for local development with zero setup, Neon Postgres in production — the same schema and code path either way, so what works on a laptop works in production unchanged.",
      },
      {
        title: "Single-Container Cloud Deployment",
        icon: "CloudCog",
        detail: "One Docker container serves both the FastAPI backend and the compiled React frontend on Northflank behind Cloudflare DNS; entrypoint.sh automatically switches between 1 worker (dev) and 2 workers (production) based on whether a production database is configured.",
      },
    ],
    stack: ["React", "FastAPI", "SQLAlchemy 2.0", "scikit-learn", "Groq LLM", "Tesseract OCR", "Neon Postgres", "Docker"],
  },
  {
    slug: "talentiq",
    name: "TalentIQ",
    category: "HR Tech · Talent Intelligence",
    emoji: "⚡",
    logo: "/img/products/talentiq.png?v=11",
    logoScale: 1,
    tagline: "AI-powered job hunting and candidate intelligence",
    summary:
      "Three purpose-built AI agents in one platform: resume-to-job matching, live market intelligence, and LinkedIn candidate search at scale.",
    description: [
      "TalentIQ combines three distinct AI agents into one product: JobHunt scrapes live roles and scores resume-to-job fit; JobIntel reasons over market data conversationally; LinkLens searches and extracts LinkedIn candidate profiles at scale.",
      "JobHunt deliberately doesn't ask an LLM for a match score directly — it extracts structured facts from resumes and job ads via Groq, then computes the ATS score with plain deterministic Python, so formatting drift in a model response can never silently corrupt a candidate's score.",
      "Every search, match and market-intelligence run is persisted, so a user's results compound over time rather than resetting each session.",
    ],
    url: "https://talentiq.prama-ai.com",
    accent: "#2a4a8f",
    accentDark: "#122140",
    badgeColor: "#3689ed",
    badgeColorDark: "#1b4476",
    badges: ["JobHunt Matching", "JobIntel Agent", "LinkLens Search"],
    stats: [
      { value: "3", label: "Purpose-built AI agents" },
      { value: "Live", label: "Adzuna market data, not a snapshot" },
      { value: "5", label: "ATS-weighted scoring factors" },
    ],
    features: [
      { title: "JobHunt", detail: "Scrapes live Adzuna listings, parses resumes, computes a weighted ATS match score, and drafts cover letters." },
      { title: "JobIntel", detail: "A ReAct LangChain agent with its own tool set reasons over freshly scraped market data conversationally." },
      { title: "LinkLens", detail: "Playwright-driven LinkedIn search that extracts name, headline, experience, skills and contact details at scale." },
    ],
    technical: [
      {
        title: "Deterministic ATS Scoring",
        icon: "ShieldCheck",
        detail: "JobHunt extracts structured facts from resumes and job ads via Groq, then computes the match score with deterministic Python (60% skills + 25% experience + 10% good-to-have + 5% baseline) — deliberately avoiding asking the LLM for a score directly, since formatting drift in a model response would silently corrupt it.",
      },
      {
        title: "ReAct Agent Reasoning",
        icon: "Sparkles",
        detail: "JobIntel runs a genuine ReAct LangChain agent (create_react_agent) with its own Tool set, reasoning over freshly scraped Adzuna listings conversationally rather than answering from a fixed training snapshot.",
      },
      {
        title: "Playwright Web Automation",
        icon: "Search",
        detail: "LinkLens drives a headless browser via Playwright to search LinkedIn at scale, then parses the resulting profile HTML with dedicated extraction functions for name, headline, experience, skills, certifications and education.",
      },
      {
        title: "Async Data Pipeline",
        icon: "Database",
        detail: "Fully async SQLAlchemy over PostgreSQL 16, with Alembic-managed migrations; every JobHunt match, JobIntel run and LinkLens search is persisted so a user's results compound over time instead of resetting each session.",
      },
      {
        title: "Router-Per-Agent Architecture",
        icon: "Network",
        detail: "FastAPI backend structured as one router per agent (jobhunt / jobintel / linklens / dashboard), React 18 + TypeScript + Vite frontend, JWT auth via python-jose.",
      },
      {
        title: "Containerised Multi-Service Deployment",
        icon: "Boxes",
        detail: "Docker Compose ties the async FastAPI backend, React frontend and PostgreSQL together for one-command deployment, with the backend and frontend containerised independently via their own Dockerfiles.",
      },
    ],
    stack: ["React", "TypeScript", "FastAPI (async)", "LangChain", "Groq LLM", "Playwright", "PostgreSQL 16", "Alembic"],
  },
  {
    slug: "mindkaar",
    name: "MindKaar",
    category: "Wellbeing · Applied AI",
    emoji: "🧠",
    logo: "/img/products/mindkaar.png?v=11",
    logoScale: 1,
    tagline: "A mind gym for everyday mental fitness",
    summary:
      "A mental-wellness platform pairing a deterministic 6-domain assessment with progressive mini-games, plus a live voice-roleplay simulation with an emotionally reactive AI character.",
    description: [
      "MindKaar (\"Mind Gym\") opens with a 24-question, 6-domain intake — Stress, Anxiety, Conflict, Unrest, Burnout, Loneliness — styled after established screeners like PSS-10, GAD-7 and UCLA-3, then routes each person to a progressive-difficulty mini-game that matches their identified scenario.",
      "A separate \"Run Simulation\" mode goes further: a real spoken conversation with an AI character whose emotional state — anger, frustration, trust, calmness — updates live from Groq's turn-by-turn analysis and animates an SVG avatar in response.",
      "Deliberately, the part that matters most for reliability — which scenario someone is routed to — is computed directly from their assessment answers with no model call at all, so a Groq outage can never affect it.",
    ],
    url: "https://mindkaar.prama-ai.com",
    accent: "#4d68ad",
    accentDark: "#222e4d",
    badgeColor: "#3eb3d6",
    badgeColorDark: "#7f69f1",
    badges: ["6-Domain Assessment", "Progressive Mini-Games", "Voice Roleplay Sim"],
    stats: [
      { value: "24", label: "Questions across 6 wellbeing domains" },
      { value: "0", label: "LLM calls to identify your scenario" },
      { value: "5", label: "Dimensions scored live in Run Simulation" },
    ],
    features: [
      { title: "Guided assessment", detail: "A 24-item, 6-domain intake deterministically identifies the scenario that matters most right now." },
      { title: "Progressive mini-games", detail: "Scenario-flavoured games with rising difficulty, 3 lives, and per-user level progress that only ever goes up." },
      { title: "Run Simulation", detail: "A spoken roleplay with an AI character whose emotional state reacts live to what you say." },
    ],
    technical: [
      {
        title: "Deterministic Assessment Engine",
        icon: "ShieldCheck",
        detail: "Scenario identification from the 6-domain intake is computed directly from a person's answers with no model call at all — fully deterministic and Groq-free by design, so an AI outage can never affect whether someone is correctly routed.",
      },
      {
        title: "Live Voice Roleplay Simulation",
        icon: "Mic",
        detail: "In \"Run Simulation\", Groq scores each spoken response across five dimensions — empathy, relevance, communication, active listening, de-escalation — and updates a live emotional state (anger, frustration, trust, calmness) that animates an SVG character in real time.",
      },
      {
        title: "3NF Normalised Schema",
        icon: "Database",
        detail: "Catalog tables (scenario categories, assessment items, games, roleplay characters) are fully separated from fact tables (answers, scores, sessions, transcripts) — a scenario's label lives in exactly one place, with no duplicated descriptive text anywhere.",
      },
      {
        title: "Resilient Fallback Pattern",
        icon: "ShieldAlert",
        detail: "Every Groq-dependent step — reflection questions, the mental-status readout, live conversation scoring — has a deterministic rule-based fallback, so the app keeps working end-to-end even if GROQ_API_KEY is unset or a call fails.",
      },
      {
        title: "Browser-Native Voice",
        icon: "MessagesSquare",
        detail: "Voice input and output run entirely in the browser — SpeechSynthesis for the character's spoken lines, the Web Speech API to transcribe the user's replies — so no separate speech-processing service is required in the backend.",
      },
      {
        title: "Lightweight Consumer Deployment",
        icon: "CloudCog",
        detail: "FastAPI backend with SQLite by default (swappable for Neon Postgres), React (Vite) frontend, JWT + bcrypt auth — intentionally lean infrastructure sized for a personal, everyday tool rather than an enterprise workload.",
      },
    ],
    stack: ["React", "FastAPI", "Groq LLM", "Web Speech API", "SQLite / Neon Postgres", "JWT + bcrypt"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
