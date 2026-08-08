import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { getProduct, products } from "../data/products";
import { site } from "../data/site";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug ?? "");

  if (!product) return <NotFound />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: product.category,
    operatingSystem: "Web",
    url: product.url,
    description: product.summary,
    creator: { "@type": "Organization", name: site.name, url: site.domain },
  };

  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <SEO
        title={`${product.name} — ${product.tagline}`}
        description={product.summary}
        path={`/products/${product.slug}`}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background: `linear-gradient(135deg, ${product.accent} 0%, #0f1626 130%)`,
        }}
      >
        <div className="container-px relative mx-auto max-w-5xl">
          <Link to="/products" className="font-mono text-xs uppercase tracking-wider text-white/70 hover:text-white">
            ← Portfolio
          </Link>

          <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-wider text-white/70">
            {product.category}
          </span>

          <h1 className="mt-3 font-display text-5xl leading-tight text-white">{product.name}</h1>
          <p className="mt-3 max-w-2xl font-display text-2xl text-white/85">{product.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white backdrop-blur"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={product.url}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full bg-brass px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
            >
              Visit {product.name} ↗
            </a>
            <Link
              to="/contact"
              className="rounded-full bg-brass px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
            >
              Discuss a similar build
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-4">
            {product.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <div className="font-display text-2xl text-white sm:text-3xl">{s.value}</div>
                <div className="mt-2 text-xs leading-snug text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-5xl py-20">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
          <div>
            {product.description.map((para, i) => (
              <p key={i} className="mb-5 text-base leading-relaxed text-slate">
                {para}
              </p>
            ))}

            <h2 className="mt-10 font-display text-2xl text-paper">Inside the platform</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {product.features.map((f) => (
                <div key={f.title} className="rounded-xl border hairline bg-ink-2 p-5">
                  <h3 className="font-display text-lg text-paper">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border hairline bg-ink-2 p-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-brass">Built with</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border hairline px-3 py-1 font-mono text-[11px] text-slate"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-6 border-t hairline pt-6">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-brass">Want something like this?</h3>
              <p className="mt-2 text-sm text-slate">
                We build products like {product.name} on 60–90 day delivery drops.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-block rounded-full bg-brass px-5 py-2.5 font-mono text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
              >
                Start a project
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t hairline bg-ink-2/60 py-20">
          <div className="container-px mx-auto max-w-7xl">
            <h2 className="font-display text-2xl text-paper">More from the portfolio</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className="rounded-xl border hairline bg-ink p-5 transition-colors hover:border-brass/40"
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: p.accent }} />
                  <h3 className="mt-3 font-display text-lg text-paper">{p.name}</h3>
                  <p className="mt-2 text-sm text-slate">{p.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
