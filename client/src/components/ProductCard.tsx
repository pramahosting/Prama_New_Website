import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [logoOk, setLogoOk] = useState(true);

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border hairline bg-ink-2 p-6 transition-all hover:-translate-y-1 hover:border-brass/50 hover:shadow-xl"
    >
      <div
        className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-[0.08] blur-2xl transition-opacity group-hover:opacity-[0.16]"
        style={{ background: product.accent }}
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-70"
        style={{ background: product.accent }}
        aria-hidden
      />

      {/* Flexible top block — grows/shrinks so badges & stats always align
          at the same position across cards, regardless of summary length. */}
      <div className="relative flex-1">
        <div className="flex items-center justify-between">
          {logoOk ? (
            <img
              src={product.logo}
              alt={`${product.name} logo`}
              className="h-12 w-12 object-contain"
              style={{ transform: `scale(${product.logoScale})` }}
              onError={() => setLogoOk(false)}
            />
          ) : (
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl shadow-md"
              style={{ background: `linear-gradient(135deg, ${product.badgeColor}, ${product.badgeColorDark})` }}
              aria-hidden
            >
              {product.emoji}
            </div>
          )}
          <span className="font-mono text-[11px] uppercase tracking-wider text-slate-dim">
            {product.category}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl text-paper">{product.name}</h3>
        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(product.url, "_blank", "noopener,noreferrer");
          }}
          className="mt-0.5 inline-block font-mono text-[11px] text-brass-light hover:underline"
        >
          {product.url.replace(/^https?:\/\//, "")}
        </span>
        <p className="mt-2 font-display text-base text-slate">{product.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate">{product.summary}</p>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {product.badges.map((b) => (
          <span
            key={b}
            className="rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white"
            style={{ background: product.accent }}
          >
            {b}
          </span>
        ))}
      </div>

      <div className="relative mt-6 grid grid-cols-3 gap-2 border-t hairline pt-5">
        {product.stats.map((s) => (
          <div key={s.label}>
            <div className="font-display text-lg text-paper">{s.value}</div>
            <div className="mt-1 font-mono text-[9px] uppercase leading-snug tracking-wider text-slate-dim">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <span className="relative mt-5 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-brass opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
        View product →
      </span>
    </Link>
  );
}
