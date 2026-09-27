"use client";

import type { CSSProperties } from "react";
import { useId, useRef, useState } from "react";
import { gap } from "@/lib/content";
import { NasaPhoto } from "@/components/media/NasaPhoto";
import { SystemLayers } from "@/components/scenes/SystemLayers";
import { ExposureScan } from "@/components/scenes/ExposureScan";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { splitWords } from "@/lib/splitWords";

// One large, stable image stage (matches the Playbook's pattern) rather than
// three stacked rows of variable height -- the earlier stacked layout left
// the two inactive pressures as empty, dim text blocks with no image, which
// read as broken rather than restrained. Three equal selectors above a
// single crossfading stage give every pressure the same visual weight.
function Visual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <NasaPhoto
        src="/media/nasa/optimized/topography-of-the-world.webp"
        alt="Global topographic relief map derived from Shuttle Radar Topography Mission elevation data (NASA/JPL/NIMA)"
        objectPosition="center"
        gradient="180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%"
        contrast={1.3}
      />
    );
  }
  if (index === 1) return <SystemLayers />;
  return <ExposureScan />;
}

export function Gap() {
  const [active, setActive] = useState(0);
  const hoverCapable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const baseId = useId();
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusStep = (i: number) => {
    setActive(i);
    navRefs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusStep((i + 1) % gap.points.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusStep((i - 1 + gap.points.length) % gap.points.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusStep(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusStep(gap.points.length - 1);
    }
  };

  return (
    <section className="p32-section relative bg-p32-black text-p32-white">
      <div className="p32-container relative flex flex-col items-center text-center">
        <p className="label-glow font-mono text-xs tracking-[0.3em] text-p32-signal md:text-sm">{gap.label}</p>
        <h2
          data-reveal="words"
          className="mt-4 max-w-4xl text-balance font-mono text-2xl font-medium uppercase leading-[1.3] tracking-tight sm:text-4xl md:mt-6 md:text-5xl"
        >
          {splitWords(gap.headline)}
        </h2>
      </div>

      <div className="p32-container mt-8 md:mt-14">
        <div
          role="tablist"
          aria-label="The three pressures"
          className="grid grid-cols-1 gap-4 border-b border-p32-gray-800 pb-5 sm:grid-cols-3 sm:gap-6"
        >
          {gap.points.map((point, i) => {
            const isActive = active === i;
            return (
              <button
                key={point.statement}
                ref={(el) => {
                  navRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`${baseId}-stage`}
                tabIndex={isActive ? 0 : -1}
                onMouseEnter={() => hoverCapable && setActive(i)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                data-reveal="up"
                style={{ "--reveal-index": i } as CSSProperties}
                className={`p32-press block text-left transition-colors duration-300 ${
                  isActive ? "text-p32-white" : "text-p32-gray-400 hover:text-p32-gray-200"
                }`}
              >
                <span className="label-glow block font-mono text-xs text-p32-signal">{`0${i + 1}`}</span>
                <span className="mt-1 block text-sm font-medium uppercase leading-snug tracking-tight sm:text-base">
                  {point.statement}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id={`${baseId}-stage`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active}`}
          data-reveal="up"
          style={{ "--reveal-index": 3 } as CSSProperties}
          className="relative mt-6 min-h-[46vh] overflow-hidden md:mt-8 md:min-h-[56vh]"
        >
          {gap.points.map((point, i) => {
            const isActive = active === i;
            return (
              <div
                key={point.statement}
                aria-hidden={!isActive}
                className="absolute inset-0 transition-opacity duration-500 ease-out"
                style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
              >
                <Visual index={i} />
                <div className="p32-container relative flex h-full flex-col items-center justify-center gap-4 text-center">
                  <p className="max-w-3xl text-balance font-display text-2xl font-medium uppercase leading-[1.15] tracking-tight text-p32-white sm:text-4xl md:text-5xl">
                    {point.statement}
                  </p>
                  <p className="max-w-xl text-pretty text-base leading-relaxed text-p32-gray-300 md:text-lg">
                    {point.context}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
