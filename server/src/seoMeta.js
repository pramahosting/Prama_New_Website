const DOMAIN = "https://www.prama-ai.com";

const products = [
  {
    slug: "accfino",
    name: "AccFino",
    tagline: "Accounting that thinks ahead of your books",
    summary:
      "An AI-native accounting platform for Australian small business — reconciliation, cash-flow forecasting, and crypto CGT in one login.",
  },
  {
    slug: "talentiq",
    name: "TalentIQ",
    tagline: "AI-powered job hunting and candidate intelligence",
    summary:
      "A talent intelligence platform pairing job-market analytics with AI-assisted candidate search for recruiters and job seekers.",
  },
  {
    slug: "mindkaar",
    name: "MindKaar",
    tagline: "A mind gym for everyday mental fitness",
    summary:
      "A guided mental-fitness platform — structured exercises and adaptive progress tracking.",
  },
];

export const staticRoutes = [
  {
    path: "/",
    title: "Prama AI — Data, Analytics & AI Consultancy, Sydney",
    description:
      "Prama AI is a Sydney-based data, analytics and AI consultancy. AI solutions, cloud data architecture, chatbot orchestration, RAG architecture, agentic solutions, and cloud & FinOps — for Australian businesses.",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    path: "/services",
    title: "Data, Analytics & AI Services | Prama AI",
    description:
      "Cloud data architecture, chatbot orchestration, RAG architecture, agentic solutions, data science, analytics consulting, data governance, cloud & FinOps — the full range of Prama AI's services for Australian businesses.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/products",
    title: "Product Portfolio | Prama AI",
    description:
      "Live products built and run by Prama AI: AccFino, TalentIQ and MindKaar — across fintech, talent and wellbeing.",
    changefreq: "monthly",
    priority: 0.85,
  },
  {
    path: "/about",
    title: "About Prama AI",
    description:
      "Prama AI is a Sydney-based data, analytics and AI consultancy founded by specialists in business intelligence, data management, machine learning and artificial intelligence.",
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    path: "/contact",
    title: "Contact Prama AI",
    description:
      "Talk to Prama AI about a data, analytics or AI engagement in Australia.",
    changefreq: "yearly",
    priority: 0.7,
  },
  ...products.map((p) => ({
    path: `/products/${p.slug}`,
    title: `${p.name} — ${p.tagline} | Prama AI`,
    description: p.summary,
    changefreq: "monthly",
    priority: 0.75,
  })),
];

export function findMeta(pathname) {
  return staticRoutes.find((r) => r.path === pathname);
}

export function buildHeadTags(meta) {
  const url = `${DOMAIN}${meta.path}`;
  const desc = escapeHtml(meta.description);
  const title = escapeHtml(meta.title);
  return `
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Prama AI" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${DOMAIN}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${DOMAIN}/og-image.png" />
  `.trim();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const DOMAIN_URL = DOMAIN;
