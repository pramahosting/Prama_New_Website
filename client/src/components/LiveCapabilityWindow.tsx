import { useEffect, useState } from "react";
import { servicePillars } from "../data/services";
import { products } from "../data/products";
import { getIcon } from "../lib/icons";

const CYCLE_MS = 2600;

const TILE_CLASSES = ["tile-0", "tile-1", "tile-2", "tile-3", "tile-4", "tile-5"];
// Matches the start colour of each .tile-N gradient in index.css, for inline accents.
const TILE_HEX = ["#7c3aed", "#06b6d4", "#f97316", "#10b981", "#395194", "#ec4899"];

type Card =
  | {
      kind: "service";
      key: string;
      name: string;
      eyebrow: string;
      icon: string;
      tileClass: string;
      accent: string;
      offerings: string[];
    }
  | {
      kind: "product";
      key: string;
      name: string;
      category: string;
      accent: string;
      badgeColor: string;
      badgeColorDark: string;
      emoji: string;
      logo: string;
      logoScale: number;
      offerings: string[];
    };

const cards: Card[] = [
  ...servicePillars.map((p, i) => ({
    kind: "service" as const,
    key: p.slug,
    name: p.name,
    eyebrow: p.eyebrow,
    icon: p.icon,
    tileClass: TILE_CLASSES[i % TILE_CLASSES.length],
    accent: TILE_HEX[i % TILE_HEX.length],
    offerings: p.items.slice(0, 3).map((it) => it.name),
  })),
  ...products.map((p) => ({
    kind: "product" as const,
    key: p.slug,
    name: p.name,
    category: p.category,
    accent: p.accent,
    badgeColor: p.badgeColor,
    badgeColorDark: p.badgeColorDark,
    emoji: p.emoji,
    logo: p.logo,
    logoScale: p.logoScale,
    offerings: p.badges.slice(0, 3),
  })),
];

const serviceCount = servicePillars.length;
const productCount = products.length;

export default function LiveCapabilityWindow() {
  const [step, setStep] = useState(0);
  const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set());

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % cards.length), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const card = cards[step];
  const isService = card.kind === "service";
  const posInGroup = isService ? step + 1 : step - serviceCount + 1;
  const groupTotal = isService ? serviceCount : productCount;
  const Icon = isService ? getIcon(card.icon) : null;
  const accent = card.accent;

  return (
    <div className="window-glossy flex h-full w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/25 bg-[#eaf3fc]">
      {/* Window chrome — vibrant gradient header, classic traffic-light dots */}
      <div className="gradient-panel flex items-center gap-2 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 truncate font-mono text-[11px] uppercase tracking-wider text-white/85">
          prama-ai · live capabilities
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
          <span className="flash-dot h-1.5 w-1.5 rounded-full bg-white" />
          Live
        </span>
      </div>

      {/* Group tabs */}
      <div className="flex items-center gap-4 border-b px-4 pt-4" style={{ borderColor: "rgba(22,34,63,0.12)" }}>
        <span
          className={`flex items-center gap-1.5 pb-3 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors ${
            isService ? "border-b-2" : ""
          }`}
          style={{ borderColor: isService ? accent : undefined, color: isService ? "#16223f" : "#8993b3" }}
        >
          {isService && <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />}
          Services
        </span>
        <span
          className={`flex items-center gap-1.5 pb-3 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors ${
            !isService ? "border-b-2" : ""
          }`}
          style={{ borderColor: !isService ? accent : undefined, color: !isService ? "#16223f" : "#8993b3" }}
        >
          {!isService && <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />}
          Products
        </span>
      </div>

      {/* Single flashing card */}
      <div key={card.key} className="card-flash flex flex-1 flex-col justify-center p-5">
        <div className="flex items-start gap-4">
          {isService ? (
            <div className={`tile-icon ${card.tileClass} flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm`}>
              {Icon && <Icon size={24} strokeWidth={1.75} />}
            </div>
          ) : (
            (() => {
              const productCard = card as Extract<Card, { kind: "product" }>;
              return failedLogos.has(productCard.key) ? (
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-md"
                  style={{ background: `linear-gradient(135deg, ${productCard.badgeColor}, ${productCard.badgeColorDark})` }}
                >
                  {productCard.emoji}
                </span>
              ) : (
                <img
                  src={productCard.logo}
                  alt={`${productCard.name} logo`}
                  className="h-14 w-14 shrink-0 object-contain"
                  style={{ transform: `scale(${productCard.logoScale})` }}
                  onError={() => setFailedLogos((prev) => new Set(prev).add(productCard.key))}
                />
              );
            })()
          )}
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: accent }}>
              {isService ? card.eyebrow : (card as Extract<Card, { kind: "product" }>).category}
            </div>
            <h3 className="mt-1 truncate font-display text-xl" style={{ color: "#16223f" }}>{card.name}</h3>
          </div>
        </div>

        {/* Offering tiles — transparent, single accent colour, glowing outline,
            each one popping in a beat after the last (sequential reveal). */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {card.offerings.map((o, i) => (
            <div
              key={o}
              className="tile-pop flex min-h-[4.75rem] items-center justify-center rounded-xl p-2 text-center transition-transform hover:scale-[1.04]"
              style={{
                animationDelay: `${i * 0.18}s`,
                background: `${accent}14`,
                border: `1px solid ${accent}66`,
                boxShadow: `0 0 16px ${accent}40, inset 0 0 12px ${accent}1f`,
              }}
            >
              <span className="font-display text-[11px] font-semibold leading-tight" style={{ color: accent }}>
                {o}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots for current group */}
      <div className="flex items-center justify-center gap-1.5 pb-4">
        {Array.from({ length: groupTotal }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={
              i === posInGroup - 1
                ? { width: "1.25rem", background: accent }
                : { width: "0.375rem", background: "rgba(22,34,63,0.15)" }
            }
          />
        ))}
      </div>

      <div
        className="border-t border-white/60 bg-white/50 px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider"
        style={{ color: "#8993b3" }}
      >
        {serviceCount} service groups · {productCount} live products
      </div>
    </div>
  );
}
