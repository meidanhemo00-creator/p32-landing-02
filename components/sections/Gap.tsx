"use client";

import { useState } from "react";
import { gap } from "@/lib/content";
import { NasaPhoto } from "@/components/media/NasaPhoto";
import { SystemLayers } from "@/components/scenes/SystemLayers";
import { ExposureScan } from "@/components/scenes/ExposureScan";

// Three large full-width statements, not cards. Hover (desktop), keyboard
// focus, or a tap all select a statement the same way -- no information
// depends only on hover. The other two stay visible and readable, just
// quieter, so they're always discoverable.
function Visual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <NasaPhoto
        src="/media/nasa/optimized/topography-of-the-world.webp"
        alt="Global topographic relief map derived from Shuttle Radar Topography Mission elevation data (NASA/JPL/NIMA)"
        objectPosition="center"
        gradient="180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.6) 100%"
        contrast={1.3}
      />
    );
  }
  if (index === 1) return <SystemLayers />;
  return <ExposureScan />;
}

export function Gap() {
  const [active, setActive] = useState(0);

  return (
    <section className="p32-section tx-grain-dark relative overflow-x-hidden bg-p32-black text-p32-white">
      <div className="p32-container relative flex flex-col items-center text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-p32-signal md:text-sm">{gap.label}</p>
        <h2 className="mt-5 max-w-4xl text-balance font-display text-3xl font-medium uppercase leading-[1.1] tracking-tight sm:text-5xl md:mt-6 md:text-6xl">
          {gap.headline}
        </h2>
      </div>

      <div className="mt-14 flex flex-col divide-y divide-p32-gray-800 md:mt-20">
        {gap.points.map((point, i) => {
          const isActive = active === i;
          return (
            <button
              key={point.statement}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className="group relative block w-full overflow-hidden text-left"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: isActive ? 0.55 : 0 }}
              >
                <Visual index={i} />
              </div>
              <div className="p32-container relative flex flex-col items-center gap-4 py-10 text-center md:py-12">
                <span className="font-mono text-sm text-p32-signal">{`0${i + 1}`}</span>
                <p
                  className={`max-w-3xl text-balance font-display font-medium uppercase leading-[1.15] tracking-tight transition-[color,opacity] duration-300 ${
                    isActive ? "text-p32-white" : "text-p32-gray-500 group-hover:text-p32-gray-300"
                  }`}
                  style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
                >
                  {point.statement}
                </p>
                <div
                  className="grid w-full max-w-xl transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pt-2 text-pretty text-base leading-relaxed text-p32-gray-300 md:text-lg">
                      {point.context}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
