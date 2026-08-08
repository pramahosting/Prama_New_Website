import { Link } from "react-router-dom";
import { servicePillars } from "../data/services";
import { getIcon } from "../lib/icons";

const TILE_CLASSES = ["tile-0", "tile-1", "tile-2", "tile-3", "tile-4", "tile-5"];

export default function ImpactGrid({ limit }: { limit?: number }) {
  const flat = servicePillars.flatMap((pillar) =>
    pillar.items.map((item) => ({ ...item, pillarSlug: pillar.slug }))
  );
  const items = limit ? flat.slice(0, limit) : flat;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Icon = getIcon(item.icon);
        const tileClass = TILE_CLASSES[i % TILE_CLASSES.length];
        return (
          <Link
            key={item.slug}
            to={`/services#${item.pillarSlug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border hairline bg-ink-2 p-6 transition-all hover:-translate-y-1 hover:border-brass/40 hover:shadow-xl"
          >
            <div>
              <div className={`tile-icon ${tileClass} flex h-12 w-12 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-105`}>
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-lg text-paper">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{item.detail}</p>
            </div>
            <div className="mt-6 border-t hairline pt-4">
              <span className="font-display text-xl text-brass">{item.impact}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
