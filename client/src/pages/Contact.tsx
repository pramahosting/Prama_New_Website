import { useEffect } from "react";
import { Mail, MapPin, MessageCircle, CalendarClock } from "lucide-react";
import SEO from "../components/SEO";
import ContactForm from "../components/ContactForm";
import { site } from "../data/site";

// Calendly's global object, attached to window once its widget script loads.
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";

export default function Contact() {
  // Load Calendly's popup-widget script once, only on this page, so the
  // booking buttons below can open it as an overlay instead of a new tab.
  useEffect(() => {
    if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CALENDLY_CSS;
      document.head.appendChild(link);
    }
    if (!document.querySelector(`script[src="${CALENDLY_JS}"]`)) {
      const script = document.createElement("script");
      script.src = CALENDLY_JS;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  function openBookingPopup(e: React.MouseEvent<HTMLAnchorElement>) {
    if (window.Calendly) {
      e.preventDefault();
      window.Calendly.initPopupWidget({ url: site.bookingUrl });
    }
    // If the script hasn't finished loading yet, the click falls through to
    // the normal href and opens Calendly in a new tab instead — so the
    // button always works, popup or not.
  }

  return (
    <>
      <SEO
        title="Contact Prama AI"
        description="Talk to Prama AI about a data, analytics or AI engagement in Australia."
        path="/contact"
      />

      <section className="hero-vibrant relative overflow-hidden">
        <div className="container-px relative mx-auto max-w-7xl py-20 md:py-28">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 px-2.5 py-1 font-mono text-[13px] font-bold uppercase tracking-wider text-white">
            <span aria-hidden="true">✉️</span> Contact
          </span>
          <h1 className="mt-6 font-display text-5xl leading-tight text-white sm:text-6xl">Let's talk.</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
            Thank you for your interest in Prama AI. Fill out the form and we'll get back to you
            within one business day.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={openBookingPopup}
              className="rounded-full bg-brass px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
            >
              Book a discovery call
            </a>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="grid gap-4">
              <div className="flex items-start gap-4 rounded-2xl border hairline bg-ink-2 p-5">
                <div className="tile-icon tile-0 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm">
                  <Mail size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-wider text-slate-dim">Email</h3>
                  <a href={`mailto:${site.email}`} className="mt-1 block font-display text-lg text-paper hover:text-brass">
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border hairline bg-ink-2 p-5">
                <div className="tile-icon tile-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm">
                  <MapPin size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-wider text-slate-dim">Office</h3>
                  <p className="mt-1 font-display text-lg text-paper">{site.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border hairline bg-ink-2 p-5">
                <div className="tile-icon tile-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm">
                  <CalendarClock size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-wider text-slate-dim">Skip the form</h3>
                  <p className="mt-1 text-sm text-slate">
                    Pick a time that suits you and we'll call you directly.
                  </p>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={openBookingPopup}
                    className="mt-3 inline-block rounded-full bg-brass px-5 py-2.5 font-mono text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-brass-light"
                  >
                    Book a discovery call
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border hairline bg-ink-2 p-5">
                <div className="tile-icon tile-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm">
                  <MessageCircle size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-wider text-slate-dim">Prefer to chat?</h3>
                  <p className="mt-1 text-sm text-slate">
                    Use the "Ask" concierge in the bottom corner for a quick answer on any
                    of our services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-2xl border hairline bg-ink-2 p-8">
            <ContactForm sourcePage="/contact" />
          </div>
        </div>
      </section>
    </>
  );
}
