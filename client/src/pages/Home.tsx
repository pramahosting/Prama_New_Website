import { Link } from "react-router-dom";
import { Users, Rocket, Clock3, TrendingUp } from "lucide-react";
import SEO from "../components/SEO";
import LiveCapabilityWindow from "../components/LiveCapabilityWindow";
import ProductCard from "../components/ProductCard";
import { servicePillars } from "../data/services";
import { products } from "../data/products";
import { site } from "../data/site";
import { getIcon } from "../lib/icons";

const TILE_CLASSES = ["tile-0", "tile-1", "tile-2", "tile-3", "tile-4", "tile-5"];

const stats = [
  { value: "30–40%", label: "Effort saved by IP-rich accelerators & ML models" },
  { value: "20+", label: "Developers & architects" },
  { value: "50+", label: "Yrs combined open-source & cloud experience" },
  { value: "60–90", label: "Day delivery drops" },
];

const aboutStats = [
  { icon: Users, value: "20+", label: "Developers & architects" },
  { icon: Clock3, value: "50+", label: "Yrs combined experience" },
  { icon: Rocket, value: "60–90", label: "Day delivery drops" },
  { icon: TrendingUp, value: "30–40%", label: "Effort saved by accelerators" },
];

const process = [
  { step: "Discover", icon: "Search", detail: "We assess your data, capability and the decision you actually need to make." },
  { step: "Architect", icon: "Compass", detail: "A target architecture and roadmap, sized to your team and timeline." },
  { step: "Build", icon: "Cog", detail: "IP-rich accelerators and reusable ML models cut delivery effort by 30–40%." },
  { step: "Run", icon: "TrendingUp", detail: "We stay accountable for outcomes — monitoring impact, not just shipping code." },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.domain,
    logo: `${site.domain}${site.logo}`,
    description: site.description,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "11 York Street",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      postalCode: "2000",
      addressCountry: "AU",
    },
    sameAs: [site.linkedin],
  };

  return (
    <>
      <SEO
        title="Prama AI — Data, Analytics & AI Consultancy, Sydney"
        description="Prama AI is a Sydney-based data, analytics and AI consultancy. AI solutions, cloud data architecture, chatbot orchestration, RAG architecture, agentic solutions, and cloud & FinOps — for Australian businesses."
        path="/"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="hero-vibrant relative overflow-hidden">
        <div className="container-px relative mx-auto max-w-7xl py-10 md:py-14">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-stretch">
            <div className="animate-rise flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-1.5 self-start rounded-full border border-white/25 px-2.5 py-1 font-mono text-[13px] font-bold uppercase tracking-wider text-white">
                <span aria-hidden="true">✨</span> Innovative Analytics and Agentic AI Solutions
              </span>
              <h1 className="mt-6 font-display text-[2.6rem] leading-[1.05] text-white sm:text-6xl">
                Secure high performance
                <br />
                <span className="text-brass-light">with intelligence.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80">
                From strategy consulting on advanced analytics to delivery of AI and ML solutions,
                Prama AI's services are designed to solve your most challenging business needs —
                across Australia.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="rounded-full bg-brass px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
                >
                  Start a project
                </Link>
                <Link
                  to="/services"
                  className="rounded-full bg-brass px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
                >
                  Explore our services
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <LiveCapabilityWindow />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <div className="font-display text-2xl text-brass-light sm:text-3xl">{s.value}</div>
                <div className="mt-2 text-xs leading-snug text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="container-px mx-auto max-w-7xl py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-brass">What we do</span>
            <h2 className="mt-3 font-display text-4xl text-paper">Capability, end to end.</h2>
          </div>
          <Link to="/services" className="font-mono text-sm uppercase tracking-wider text-brass hover:text-paper">
            All services →
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicePillars.map((s, i) => {
            const Icon = getIcon(s.items[0].icon);
            const tileClass = TILE_CLASSES[i % TILE_CLASSES.length];
            return (
              <Link
                key={s.slug}
                to={`/services#${s.slug}`}
                className="group rounded-2xl border hairline bg-ink-2 p-7 transition-all hover:-translate-y-1 hover:border-brass/30 hover:shadow-xl"
              >
                <div className={`tile-icon ${tileClass} flex h-12 w-12 items-center justify-center rounded-xl shadow-sm`}>
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <span className="mt-4 block font-mono text-[11px] uppercase tracking-wider text-slate-dim">{s.eyebrow}</span>
                <h3 className="mt-1 font-display text-xl text-paper">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{s.summary}</p>
                <div className="mt-5 flex items-center justify-between border-t hairline pt-4">
                  <span className="font-display text-base text-brass">{s.items[0].impact}</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-brass opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Product portfolio teaser */}
      <section className="border-t hairline bg-ink-2/60 py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-brass">Proof, not promises</span>
              <h2 className="mt-3 font-display text-4xl text-paper">Products we build and run.</h2>
              <p className="mt-3 max-w-xl text-sm text-slate">
                Everything we sell as consulting, we run ourselves first — real users, real data.
              </p>
            </div>
            <Link to="/products" className="font-mono text-sm uppercase tracking-wider text-brass hover:text-paper">
              Full portfolio →
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="container-px mx-auto max-w-7xl">
          <span className="font-mono text-[11px] uppercase tracking-wider text-brass">How we work</span>
          <h2 className="mt-3 font-display text-4xl text-paper">Succeed quick, or fail fast.</h2>
          <p className="mt-3 max-w-xl text-sm text-slate">
            Every engagement runs in 60–90 day drops — enough time to prove real value, not enough
            to drift.
          </p>

          <div className="relative mt-14">
            {/* Connecting flow line behind the badges (desktop only) */}
            <div className="pointer-events-none absolute left-7 right-7 top-7 hidden h-px bg-line md:block" aria-hidden />

            <div className="relative grid gap-10 md:grid-cols-4 md:gap-8">
              {process.map((p, i) => {
                const Icon = getIcon(p.icon);
                const tileClass = TILE_CLASSES[i % TILE_CLASSES.length];
                return (
                  <div key={p.step} className="group relative">
                    <div className="flex items-center gap-3 md:block">
                      <div
                        className={`tile-icon ${tileClass} relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-md transition-transform group-hover:scale-105`}
                      >
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <span className="font-mono text-xs text-slate-dim md:absolute md:-top-1 md:left-16">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl text-paper">{p.step}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{p.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="border-t hairline bg-ink-2/60 py-24">
        <div className="container-px mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div className="gradient-panel order-2 overflow-hidden rounded-2xl border hairline p-8 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              {aboutStats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                  <s.icon className="text-white" size={20} strokeWidth={1.75} />
                  <div className="mt-3 font-display text-2xl text-white">{s.value}</div>
                  <div className="mt-1 text-xs leading-snug text-white/80">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-brass">About us</span>
            <h2 className="mt-3 font-display text-4xl text-paper">
              Our vision is decisions made better, with AI.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              Founded by a group of experts in Business Intelligence, Data Management, Machine
              Learning and Artificial Intelligence, Prama AI helps clients make better decisions
              across the full spectrum of their business — and realise the value of their data.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-block font-mono text-sm uppercase tracking-wider text-brass hover:text-paper"
            >
              More about us →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t hairline bg-ink-2">
        <div className="container-px mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl text-paper sm:text-4xl">
              Have a data problem worth solving properly?
            </h2>
            <p className="mt-3 max-w-lg text-sm text-slate">
              Tell us what you're working with. We'll tell you honestly whether it's a 90-day build
              or a bigger conversation.
            </p>
          </div>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="shrink-0 rounded-full bg-brass px-8 py-4 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
          >
            Book a discovery call
          </a>
        </div>
      </section>
    </>
  );
}
