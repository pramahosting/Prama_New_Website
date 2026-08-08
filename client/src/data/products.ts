export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  description: string[];
  url: string;
  accent: string; // hex
  emoji: string; // shown consistently everywhere this product appears
  badges: string[]; // short capability pills, hero-style
  stats: { value: string; label: string }[]; // 3-stat highlight strip
  features: { title: string; detail: string }[];
  stack: string[];
};

// Prama AI's own live products. (Kutumb, Headstart Finances and HS Education are newer,
// separately branded ventures and are intentionally not listed here.)
export const products: Product[] = [
  {
    slug: "accfino",
    name: "AccFino",
    category: "Fintech · Accounting AI",
    emoji: "💰",
    tagline: "Accounting that thinks ahead of your books",
    summary:
      "An AI-native accounting platform for Australian small business — reconciliation, cash-flow forecasting, and crypto CGT in one login.",
    description: [
      "AccFino unifies AI bank reconciliation, ML cash-flow forecasting, crypto and equity CGT, open banking feeds, and GST invoicing in a single platform built for Australian small business and the accountants who serve them.",
      "A dual-engine classifier pairs an LLM's contextual understanding with a deterministic rules engine, so every transaction is categorised, GST is computed, and BAS-ready output is produced in minutes rather than hours — with accuracy that compounds as rules are trained.",
      "AccFino grew out of Prama AI's earlier SAAR expense-classification engine, rebuilt as a full accounting platform for the Australian market.",
    ],
    url: "https://www.accfino.com",
    accent: "#395194",
    badges: ["AI Reconciliation", "ML Forecasting", "Crypto CGT", "Open Banking"],
    stats: [
      { value: "95%", label: "Transactions auto-classified" },
      { value: "Mins", label: "BAS-ready output, not hours" },
      { value: "AU", label: "Data residency, always" },
    ],
    features: [
      { title: "AI bank reconciliation", detail: "LLM + rules-engine classification with duplicate and anomaly detection." },
      { title: "ML cash-flow forecasting", detail: "An ensemble model forecasts next month's cash position from transaction history." },
      { title: "Crypto & equity CGT", detail: "Multi-exchange import with ATO-ready capital gains calculation." },
      { title: "Open banking + GST invoicing", detail: "Live bank feeds, PDF invoice OCR, and compliant GST invoicing in one screen." },
    ],
    stack: ["React", "FastAPI", "PostgreSQL", "Ollama LLM", "Docker"],
  },
  {
    slug: "talentiq",
    name: "TalentIQ",
    category: "HR Tech · Talent Intelligence",
    emoji: "🎯",
    tagline: "AI-powered job hunting and candidate intelligence",
    summary:
      "A talent intelligence platform that pairs job-market analytics with AI-assisted candidate search, built for recruiters and job seekers alike.",
    description: [
      "TalentIQ applies machine learning to two sides of the same problem: helping job seekers understand where the market is moving, and helping recruiters find the right candidate faster through AI-assisted search and market intelligence.",
      "Built on the same analytics foundation Prama AI uses for enterprise clients — structured data pipelines, ranking models, and a conversational interface over both.",
    ],
    url: "https://talentiq.prama-ai.com",
    accent: "#2a4a8f",
    badges: ["AI Candidate Search", "Market Intelligence", "Job-Seeker Copilot"],
    stats: [
      { value: "3x", label: "Faster candidate shortlisting" },
      { value: "Live", label: "Salary & demand analytics" },
      { value: "AI", label: "Ranked role-fit matching" },
    ],
    features: [
      { title: "AI candidate search", detail: "Natural-language search across public profiles, ranked by role fit." },
      { title: "Market intelligence", detail: "Live salary, demand, and skills-trend analytics by role and region." },
      { title: "Job-seeker copilot", detail: "Tailored role matching and application guidance powered by LLMs." },
    ],
    stack: ["React", "Node.js", "PostgreSQL", "LLM ranking models"],
  },
  {
    slug: "mindkaar",
    name: "MindKaar",
    category: "Wellbeing · Applied AI",
    emoji: "🧘",
    tagline: "A mind gym for everyday mental fitness",
    summary:
      "A guided mental-fitness platform — structured exercises and progress tracking that treat the mind like something you train, not just something you rest.",
    description: [
      "MindKaar (\"Mind Gym\") brings a workout-studio structure to mental wellbeing: short, guided sessions, progress tracking, and adaptive recommendations that respond to how each person is actually doing.",
      "It's a proof point for Prama AI's consumer product craft — the same data and personalisation techniques used in enterprise recommendation systems, applied to something personal.",
    ],
    url: "https://mindkaar.prama-ai.com",
    accent: "#4d68ad",
    badges: ["Guided Sessions", "Adaptive Plans", "Progress Tracking"],
    stats: [
      { value: "Daily", label: "Adaptive session plans" },
      { value: "3", label: "Focus, calm & resilience tracks" },
      { value: "Visual", label: "Streaks & progress tracking" },
    ],
    features: [
      { title: "Guided sessions", detail: "Structured mental-fitness routines across focus, calm, and resilience." },
      { title: "Progress tracking", detail: "Visual streaks and trends so improvement is visible, not just felt." },
      { title: "Adaptive plans", detail: "Recommendations that adjust to recent activity and stated goals." },
    ],
    stack: ["React", "Node.js", "PostgreSQL"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
