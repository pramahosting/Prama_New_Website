import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" description="This page doesn't exist." path="/404" noindex />
      <section className="container-px mx-auto flex max-w-3xl flex-col items-start py-32">
        <span className="font-mono text-[11px] uppercase tracking-wider text-brass">404</span>
        <h1 className="mt-3 font-display text-5xl text-paper">That page went missing from the ledger.</h1>
        <p className="mt-4 text-base text-slate">
          The page you're looking for doesn't exist, or has moved.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-brass px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
        >
          Back to home
        </Link>
      </section>
    </>
  );
}
