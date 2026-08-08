import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import ServiceCard from "../components/ServiceCard";
import { servicePillars } from "../data/services";
import { site } from "../data/site";
import { getIcon } from "../lib/icons";

const proof = [
  { value: "30–40%", label: "Less delivery effort from IP-rich accelerators" },
  { value: "60–90", label: "Day delivery drops — succeed quick or fail fast" },
  { value: "20+", label: "Developers & architects on the ground" },
  { value: "50+", label: "Yrs combined open-source & cloud experience" },
];

const TILE_CLASSES = ["tile-0", "tile-1", "tile-2", "tile-3", "tile-4", "tile-5"];

export default function Services() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: { "@type": "Organization", name: site.name, url: site.domain },
    serviceType: servicePillars.flatMap((p) => p.items.map((i) => i.name)),
    areaServed: "AU",
  };

  return (
    <>
      <SEO
        title="Data, Analytics & AI Services"
        description="Cloud data architecture, chatbot orchestration, RAG architecture, agentic solutions, data science, analytics consulting, data governance, cloud & FinOps — the full range of Prama AI's services for Australian businesses."
        path="/services"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="hero-vibrant relative overflow-hidden">
        <div className="container-px relative mx-auto max-w-7xl py-20 md:py-28">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 px-2.5 py-1 font-mono text-[13px] font-bold uppercase tracking-wider text-white">
            <span aria-hidden="true">⚙️</span> Services
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] text-white sm:text-6xl">
            Real impact, engineered — not promised.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80">
            From strategy consulting on advanced analytics to delivery of AI, ML and generative AI
            solutions, Prama AI's services are designed to solve Australian businesses' most
            challenging data problems — with the accelerators to prove it, not just the pitch.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="rounded-full bg-brass px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
            >
              Start a project
            </Link>
            <a
              href="#pillars"
              className="rounded-full bg-brass px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
            >
              See every service
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {proof.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <div className="font-display text-2xl text-brass-light sm:text-3xl">{s.value}</div>
                <div className="mt-2 text-xs leading-snug text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group quick-jump */}
      <section id="pillars" className="scroll-mt-20 border-t hairline bg-ink-2/60 py-10">
        <div className="container-px mx-auto max-w-7xl">
          <span className="font-mono text-[11px] uppercase tracking-wider text-brass">Jump to a group</span>
          <nav aria-label="Service groups" className="mt-4 flex flex-wrap gap-3">
            {servicePillars.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="rounded-full border hairline bg-ink px-4 py-2 font-mono text-xs uppercase tracking-wider text-slate hover:border-brass hover:text-brass"
              >
                {p.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Each pillar as its own distinct, alternating-background group section */}
      {servicePillars.map((pillar, pi) => {
        const GroupIcon = getIcon(pillar.icon);
        const tileClass = TILE_CLASSES[pi % TILE_CLASSES.length];
        const alt = pi % 2 === 1;
        return (
          <section
            key={pillar.slug}
            id={pillar.slug}
            className={`scroll-mt-20 border-t hairline py-20 ${alt ? "bg-ink-2/60" : "bg-ink"}`}
          >
            <div className="container-px mx-auto max-w-7xl">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className={`tile-icon ${tileClass} flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-md`}>
                  <GroupIcon size={28} strokeWidth={1.75} />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-teal">
                    Group {pi + 1} of {servicePillars.length} · {pillar.eyebrow}
                  </span>
                  <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">{pillar.name}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate">{pillar.summary}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {pillar.keywords.map((k) => (
                      <span
                        key={k}
                        className="rounded-full border hairline bg-ink px-3 py-1.5 font-mono text-[11px] text-slate-dim"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pillar.items.map((item, i) => (
                  <ServiceCard key={item.slug} item={item} index={i} />
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4 border-t hairline pt-8">
                <p className="text-sm text-slate">
                  Want to talk through a {pillar.name.toLowerCase()} engagement?
                </p>
                <Link
                  to="/contact"
                  className="rounded-full bg-brass px-6 py-2.5 font-mono text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="flex flex-col items-start gap-6 rounded-2xl border hairline bg-ink-2 p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl text-paper">Not sure which service fits?</h2>
            <p className="mt-2 text-sm text-slate">
              Most engagements start as a two-week discovery to scope the right architecture.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 rounded-full bg-brass px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
          >
            Talk to the team
          </Link>
        </div>
      </section>
    </>
  );
}
