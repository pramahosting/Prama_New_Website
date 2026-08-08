import { servicePillars } from "../data/services";

export default function CapabilityTicker() {
  const items = [
    ...servicePillars.map((s) => `${s.eyebrow.toUpperCase()} · ${s.name}`),
    "IP-RICH ACCELERATORS · SAVE 30–40% DELIVERY EFFORT",
    "60–90 DAY DELIVERY DROPS · SUCCEED QUICK OR FAIL FAST",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y hairline bg-ink-2 py-3">
      <div className="ticker-track scrollbar-thin">
        {doubled.map((line, i) => (
          <div key={i} className="flex items-center gap-3 px-8 font-mono text-[12px] uppercase tracking-wider text-slate whitespace-nowrap">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
