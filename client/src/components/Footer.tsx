import { useState } from "react";
import { Link } from "react-router-dom";
import { site, navLinks } from "../data/site";
import { servicePillars } from "../data/services";
import { products } from "../data/products";

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="border-t hairline bg-ink-2">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center">
              {!logoError ? (
                <span className="relative inline-block h-8">
                  <img
                    src={site.logo}
                    alt={site.name}
                    className="h-8 w-auto"
                    onError={() => setLogoError(true)}
                  />
                  <img
                    src={site.logo}
                    alt=""
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-8 w-auto"
                    style={{ filter: "brightness(0) invert(1)", clipPath: "inset(0 0 0 23.62%)" }}
                  />
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brass">
                    <span className="font-display text-base italic text-white">P</span>
                  </span>
                  <span className="font-display text-lg font-bold text-white">rama AI</span>
                </span>
              )}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">
              {site.description}
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-slate-dim">
              {site.address}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-brass-light">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate">
              {servicePillars.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services#${s.slug}`} className="transition-colors hover:text-paper">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-brass-light">Products</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link to={`/products/${p.slug}`} className="transition-colors hover:text-paper">
                    {p.name}
                  </Link>
                </li>
              ))}
              {navLinks
                .filter((l) => l.to === "/about" || l.to === "/contact")
                .map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="transition-colors hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-brass-light">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-paper">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-paper">
                  LinkedIn
                </a>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-paper">
                  Book a discovery call
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t hairline pt-6 font-mono text-xs uppercase tracking-wider text-slate-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <span>Sydney, Australia · Est. {site.founded}</span>
        </div>
      </div>
    </footer>
  );
}
