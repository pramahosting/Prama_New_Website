export type ServiceItem = {
  slug: string;
  name: string;
  detail: string;
  impact: string; // punchy outcome metric, e.g. "Reduce support costs by 60%"
  icon: string; // lucide icon name — see src/lib/icons.ts
};

export type ServicePillar = {
  slug: string;
  eyebrow: string;
  name: string;
  summary: string;
  icon: string; // group-level lucide icon — see src/lib/icons.ts
  keywords: string[]; // tag-cloud style related concepts, prama.ai-style
  items: ServiceItem[];
};

// Four pillars, matching Prama AI's Australian service line end to end —
// consolidated from the current prama-ai.com service list and prama.ai's broader capability set.
export const servicePillars: ServicePillar[] = [
  {
    slug: "ai-solutions",
    eyebrow: "Intelligence",
    name: "Agentic AI Systems",
    summary:
      "Intelligent machines, machine learning models, and autonomous agents that plan, predict and act — from workforce optimisation and cyber analytics through to RAG-grounded chatbots and multi-step agentic workflows.",
    icon: "Bot",
    keywords: ["Machine Learning", "LLMs", "Agents", "Automation", "RAG", "Predictive Models"],
    items: [
      {
        slug: "ai-automation",
        name: "Artificial Intelligence & Automation",
        detail: "AI and RPA combined with cognitive bots for more intelligent, automated solutions that boost productivity.",
        impact: "Boost productivity up to 40%",
        icon: "Bot",
      },
      {
        slug: "machine-learning-solutions",
        name: "Machine Learning Solutions",
        detail: "Problem definition & discovery, model development & evaluation, and insight deployment.",
        impact: "Decisions in weeks, not quarters",
        icon: "FlaskConical",
      },
      {
        slug: "optimisation",
        name: "Optimisation Solutions",
        detail: "The right combination of prediction and optimisation for workforce, resourcing, and supply-chain & plant-network planning.",
        impact: "Cut planning cycles by 50%",
        icon: "SlidersHorizontal",
      },
      {
        slug: "cyber-analytics",
        name: "Cyber Analytics",
        detail: "Industry-specific threat intelligence and advanced security analytics that help SecOps teams get ahead of emerging threats.",
        impact: "Detect threats 3x faster",
        icon: "ShieldAlert",
      },
      {
        slug: "chatbot-orchestration",
        name: "Chatbot Orchestration",
        detail: "Conversational AI that understands context and orchestrates across tools, systems and channels to deliver enterprise-grade responses.",
        impact: "Reduce support costs by 60%",
        icon: "MessagesSquare",
      },
      {
        slug: "rag-architecture",
        name: "RAG Architecture",
        detail: "Retrieval-augmented generation architecture grounded in your own enterprise data, not the open web.",
        impact: "Increase answer accuracy by 85%",
        icon: "Search",
      },
      {
        slug: "model-context-protocol",
        name: "Model Context Protocol",
        detail: "Context management that keeps AI consistent across complex, multi-step workflows.",
        impact: "Enhance reliability by 95%",
        icon: "Network",
      },
      {
        slug: "agentic-solutions",
        name: "Agentic Solutions",
        detail: "Autonomous agents that plan, execute and adapt toward a business objective.",
        impact: "Automate 70% of workflows",
        icon: "Sparkles",
      },
    ],
  },
  {
    slug: "data-solutions",
    eyebrow: "Foundation",
    name: "Data Solutions",
    summary:
      "Cloud data architecture, feature engineering and governance — identifying, sourcing, cleaning and modelling the right data without losing granularity or value.",
    icon: "Database",
    keywords: ["Data Lake", "Warehouse", "Feature Store", "Pipelines", "Governance", "Insights"],
    items: [
      {
        slug: "cloud-data-architecture",
        name: "Cloud Data Architecture",
        detail: "Cloud-native data lakes, lakehouses and platforms across internal/external, structured/unstructured sources — designed for scale, security and cost.",
        impact: "Cut infrastructure cost by 30%",
        icon: "Database",
      },
      {
        slug: "data-visualisation",
        name: "Data Visualisation",
        detail: "Deriving patterns and values for KPI reporting so insight actually drives a decision.",
        impact: "Insight discovery 5x faster",
        icon: "BarChart3",
      },
      {
        slug: "analytics-consulting",
        name: "Analytics Consulting & Architecture",
        detail: "Capability assessment, target-state architecture, and a BI modernisation roadmap to get there.",
        impact: "30–40% less delivery effort",
        icon: "Compass",
      },
      {
        slug: "data-governance",
        name: "Data Governance",
        detail: "A proven framework that turns data into action — ownership, quality and access, done on offense.",
        impact: "Audit-ready data, always",
        icon: "ShieldCheck",
      },
    ],
  },
  {
    slug: "cloud",
    eyebrow: "Infrastructure",
    name: "Cloud & FinOps",
    summary:
      "Cloud-native architecture, DevOps and FinOps that keep systems fast, secure and cost-aware — with real-time visibility into cloud and AI spend.",
    icon: "CloudCog",
    keywords: ["Kubernetes", "Serverless", "CI/CD", "IaC", "Cost Governance"],
    items: [
      {
        slug: "cloud-migration",
        name: "Cloud Migration & DevOps",
        detail: "Migration, CI/CD and infrastructure-as-code built for continuous, safe delivery.",
        impact: "Ship releases 2x faster",
        icon: "CloudCog",
      },
      {
        slug: "kubernetes-serverless",
        name: "Kubernetes & Serverless",
        detail: "The right compute model for the workload — containers or serverless, not a default.",
        impact: "Right-sized compute, lower cost",
        icon: "Boxes",
      },
      {
        slug: "security-iac",
        name: "Infrastructure as Code & Security",
        detail: "Reproducible, auditable environments with security built in, not bolted on.",
        impact: "Zero-drift, audit-ready environments",
        icon: "Lock",
      },
      {
        slug: "finops",
        name: "AI-Native FinOps",
        detail: "Unified visibility, token intelligence and automated cost controls across cloud, SaaS and AI workloads.",
        impact: "Cut cloud & AI spend waste by 30%",
        icon: "Wallet",
      },
    ],
  },
  {
    slug: "smart-website",
    eyebrow: "Digital",
    name: "Web and Digital Applications",
    summary:
      "Modern, data-connected web and digital applications — from marketing sites to membership, booking and event-management platforms — built on the same engineering discipline as our enterprise work.",
    icon: "Globe",
    keywords: ["CMS", "SEO", "Payments", "Bookings", "Analytics"],
    items: [
      {
        slug: "websites-cms",
        name: "Web and Digital Applications, CMS & Event Platforms",
        detail: "Fast, SEO-ready web and digital applications with content management and event/registration tooling built in.",
        impact: "Launch in weeks, not months",
        icon: "Globe",
      },
      {
        slug: "ecommerce-booking",
        name: "E-commerce & Booking Integrations",
        detail: "Payments, bookings and membership workflows connected directly to your data.",
        impact: "Zero-friction checkout & booking",
        icon: "ShoppingCart",
      },
      {
        slug: "seo-growth",
        name: "SEO, Analytics & Growth Tooling",
        detail: "Structured data, sitemaps and analytics wired in from launch — not bolted on later.",
        impact: "Search-ready from day one",
        icon: "TrendingUp",
      },
    ],
  },
];
