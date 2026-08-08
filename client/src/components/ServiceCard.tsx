import type { ServiceItem } from "../data/services";
import { getIcon } from "../lib/icons";

const TILE_CLASSES = ["tile-0", "tile-1", "tile-2", "tile-3", "tile-4", "tile-5"];

export default function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  const Icon = getIcon(item.icon);
  const tileClass = TILE_CLASSES[index % TILE_CLASSES.length];

  return (
    <div className="group rounded-2xl border hairline bg-ink-2 p-7 transition-all hover:-translate-y-1 hover:border-brass/30 hover:shadow-xl">
      <div className={`tile-icon ${tileClass} flex h-12 w-12 items-center justify-center rounded-xl shadow-sm`}>
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 font-display text-xl text-paper">{item.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate">{item.detail}</p>
      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brass/10 px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-brass" />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-brass">
          {item.impact}
        </span>
      </div>
    </div>
  );
}
