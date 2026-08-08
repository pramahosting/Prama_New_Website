import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks, site } from "../data/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-ink/95 backdrop-blur transition-colors ${
        scrolled ? "hairline shadow-sm" : "border-transparent"
      }`}
    >
      <nav className="container-px mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link to="/" className="flex items-center">
          {!logoError ? (
            <span className="relative inline-block h-9">
              <img
                src={site.logo}
                alt={site.name}
                className="h-9 w-auto"
                onError={() => setLogoError(true)}
              />
              {/* "rama AI" recoloured white: a second copy of the same image,
                  colour-inverted to solid white, clipped to only reveal the
                  text portion (past the "P" badge) so the badge underneath
                  is untouched. Split point measured from the actual PNG
                  pixels — the gap between the badge and the text sits at
                  23.62% of the image width. */}
              <img
                src={site.logo}
                alt=""
                aria-hidden="true"
                className="absolute left-0 top-0 h-9 w-auto"
                style={{ filter: "brightness(0) invert(1)", clipPath: "inset(0 0 0 23.62%)" }}
              />
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brass">
                <span className="font-display text-lg italic text-white">P</span>
              </span>
              <span className="font-display text-xl font-bold text-white">rama AI</span>
            </span>
          )}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-mono text-[11.5px] font-bold uppercase tracking-wide transition-colors ${
                  isActive ? "text-brass-light" : "text-white hover:text-brass-light"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="rounded-full bg-brass px-5 py-2 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
          >
            🤝 Let's Start
          </Link>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1.5">
            <span className={`h-px w-6 bg-paper transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-paper transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-paper transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t hairline bg-ink md:hidden">
          <div className="container-px mx-auto flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-md px-2 py-3 font-mono text-[12.5px] font-bold uppercase tracking-wide ${
                    isActive ? "text-brass-light" : "text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-2 rounded-full bg-brass px-5 py-3 text-center font-mono text-[13px] font-bold uppercase tracking-wider text-white"
            >
              🤝 Let's Start
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
