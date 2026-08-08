import { Link } from "react-router-dom";
import { Users, Rocket, Clock3, Wrench, Timer, Unlock } from "lucide-react";
import SEO from "../components/SEO";
import { site } from "../data/site";

const values = [
  {
    title: "Ship, don't just advise",
    detail: "We build the accelerators and reusable ML models ourselves — every recommendation we make to a client has been proven on real delivery work first.",
    icon: Wrench,
    tile: "tile-0",
  },
  {
    title: "Accelerators over billables",
    detail: "IP-rich accelerators and reusable ML models save 30–40% of delivery effort — we're not incentivised by hours on the clock.",
    icon: Rocket,
    tile: "tile-1",
  },
  {
    title: "60–90 day drops",
    detail: "Succeed quick or fail fast. Every engagement is scoped to prove real value inside a quarter, not a multi-year roadmap.",
    icon: Timer,
    tile: "tile-2",
  },
  {
    title: "Open, not locked in",
    detail: "Built on open-source foundations and standard cloud infrastructure — no proprietary lock-in dressed up as a platform.",
    icon: Unlock,
    tile: "tile-3",
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Prama AI"
        description="Prama AI is a Sydney-based data, analytics and AI consultancy founded by specialists in business intelligence, data management, machine learning and artificial intelligence."
        path="/about"
      />

      <section className="hero-vibrant relative overflow-hidden">
        <div className="container-px relative mx-auto max-w-7xl py-20 md:py-28">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 px-2.5 py-1 font-mono text-[13px] font-bold uppercase tracking-wider text-white">
            <span aria-hidden="true">👋</span> About us
          </span>
          <div className="mt-8 grid gap-12 md:grid-cols-2 md:items-start">
            <h1 className="font-display text-5xl leading-tight text-white sm:text-6xl">
              Built by specialists who'd rather ship the model than write about it.
            </h1>
            <div className="space-y-5 text-base leading-relaxed text-white/80">
              <p>
                Prama AI was founded by a group of experts in Business Intelligence, Data
                Management, Machine Learning and Artificial Intelligence, across a range of
                industry verticals. The team brings more than fifty years of combined experience
                in open-source engineering and cloud platforms.
              </p>
              <p>
                Our vision is to build AI-empowered, innovative solutions that help clients make
                decisions across the full spectrum of their business and personal financial needs
                — alongside the strategic consulting that turns advanced analytics capability into
                realised business value.
              </p>
              <p>
                Founded in {site.founded} and based at {site.address}, Prama AI works with
                Australian businesses who need their data to do more than sit in a dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="gradient-panel relative overflow-hidden rounded-2xl border hairline p-10">
            <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                <Users className="text-white" size={22} strokeWidth={1.75} />
                <div className="mt-3 font-display text-2xl text-white">20+</div>
                <div className="mt-1 text-xs text-white/80">Developers & architects</div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                <Clock3 className="text-white" size={22} strokeWidth={1.75} />
                <div className="mt-3 font-display text-2xl text-white">50+</div>
                <div className="mt-1 text-xs text-white/80">Yrs combined experience</div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                <Rocket className="text-white" size={22} strokeWidth={1.75} />
                <div className="mt-3 font-display text-2xl text-white">60–90</div>
                <div className="mt-1 text-xs text-white/80">Day delivery drops</div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl text-paper">Who we are</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Prama AI is supported by a team with extensive industry experience across data
              platforms, machine learning and enterprise delivery — 20+ developers and architects
              working across Australia's financial services, government and mid-market sectors.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border hairline bg-line sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="bg-ink-2 p-8">
              <div className={`tile-icon ${v.tile} flex h-11 w-11 items-center justify-center rounded-xl shadow-sm`}>
                <v.icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-xl text-paper">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{v.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-2xl border hairline bg-ink-2 p-10">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-brass">Headquarters</h3>
              <p className="mt-3 text-sm text-slate">{site.address}</p>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-brass">Reach us</h3>
              <p className="mt-3 text-sm text-slate">
                <a href={`mailto:${site.email}`} className="hover:text-paper">{site.email}</a>
              </p>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-brass">Elsewhere</h3>
              <p className="mt-3 text-sm text-slate">
                <a href={site.linkedin} target="_blank" rel="noreferrer noopener" className="hover:text-paper">
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl text-paper">Want to work with us?</h2>
          <Link
            to="/contact"
            className="shrink-0 rounded-full bg-brass px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
