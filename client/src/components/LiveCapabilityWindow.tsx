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
    offerings: p.badges.slice(0, 3),
  })),
];

const serviceCount = servicePillars.length;
const productCount = products.length;

export default function LiveCapabilityWindow() {
  const [step, setStep] = useState(0);

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
      {/* Window chrome — vibrant gradient header */}
      <div className="gradient-panel flex items-center gap-2 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
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
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-lg font-semibold"
              style={{
                background: `${accent}1a`,
                borderColor: `${accent}55`,
                color: accent,
              }}
            >
              {card.name.slice(0, 1)}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: accent }}>
              {isService ? card.eyebrow : (card as Extract<Card, { kind: "product" }>).category}
            </div>
            <h3 className="mt-1 truncate font-display text-xl" style={{ color: "#16223f" }}>{card.name}</h3>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {card.offerings.map((o, i) => (
            <div
              key={o}
              className={`tile-icon ${TILE_CLASSES[i % TILE_CLASSES.length]} flex min-h-[4.75rem] items-center justify-center rounded-xl p-2 text-center shadow-sm transition-transform hover:scale-[1.03]`}
            >
              <span className="font-display text-[11px] font-semibold leading-tight text-white">{o}</span>
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
