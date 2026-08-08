import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { site } from "../data/site";

export default function Products() {
  const [featured, ...rest] = products;
  const [featuredLogoOk, setFeaturedLogoOk] = useState(true);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.domain}/products/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <>
      <SEO
        title="Product Portfolio"
        description="Live products built and run by Prama AI: AccFino, TalentIQ and MindKaar — across fintech, talent and wellbeing."
        path="/products"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="hero-vibrant relative overflow-hidden">
        <div className="container-px relative mx-auto max-w-7xl py-20 md:py-28">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 px-2.5 py-1 font-mono text-[13px] font-bold uppercase tracking-wider text-white">
            <span aria-hidden="true">💼</span> Portfolio
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] text-white sm:text-6xl">
            We don't just consult on AI. <span className="text-brass-light">We ship it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80">
            Every product below is live, in front of real users, built on the same architecture and
            delivery discipline we bring to enterprise clients — proof, not a pitch deck.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="rounded-full bg-brass px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
            >
              Build something like this
            </Link>
          </div>
        </div>
      </section>

      {/* Featured product spotlight */}
      <section className="container-px mx-auto max-w-5xl py-20">
        <span className="font-mono text-[11px] uppercase tracking-wider text-brass">Flagship</span>
        <Link
          to={`/products/${featured.slug}`}
          className="group mt-4 block overflow-hidden rounded-3xl border hairline transition-shadow hover:shadow-xl"
        >
          <div
            className="relative p-10 md:p-14"
            style={{ background: `linear-gradient(135deg, ${featured.accent} 0%, #0f1626 140%)` }}
          >
            <div className="max-w-2xl">
              {featuredLogoOk ? (
                <img
                  src={featured.logo}
                  alt={`${featured.name} logo`}
                  className="h-14 w-14 object-contain"
                  style={{ transform: `scale(${featured.logoScale})` }}
                  onError={() => setFeaturedLogoOk(false)}
                />
              ) : (
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-md"
                  style={{ background: `linear-gradient(135deg, ${featured.badgeColor}, ${featured.badgeColorDark})` }}
                  aria-hidden
                >
                  {featured.emoji}
                </div>
              )}
              <span className="mt-4 block font-mono text-[11px] uppercase tracking-wider text-white/70">
                {featured.category}
              </span>
              <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">{featured.name}</h2>
              <p className="mt-2 font-display text-xl text-white/85">{featured.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{featured.summary}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {featured.badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white backdrop-blur"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <span className="mt-8 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-wider text-white">
                Explore {featured.name}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 sm:max-w-lg">
              {featured.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <div className="font-display text-xl text-white sm:text-2xl">{s.value}</div>
                  <div className="mt-1 text-[11px] leading-snug text-white/75">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </section>

      {/* Rest of the portfolio */}
      {rest.length > 0 && (
        <section className="container-px mx-auto max-w-5xl pb-24">
          <span className="font-mono text-[11px] uppercase tracking-wider text-brass">More from the studio</span>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {rest.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t hairline bg-ink-2">
        <div className="container-px mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl text-paper sm:text-4xl">Got a product idea worth shipping?</h2>
            <p className="mt-3 max-w-lg text-sm text-slate">
              We build our own products with the same 60–90 day delivery discipline we bring to
              client work. Tell us what you're building.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 rounded-full bg-brass px-8 py-4 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
          >
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}
