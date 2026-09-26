"use client";

import { useId, useRef, useState } from "react";
import { playbook } from "@/lib/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { BuildIcon, DeconstructIcon, OrchestrateIcon, ScanIcon } from "./PlaybookIcons";
import { NasaPhoto } from "@/components/media/NasaPhoto";

const ICONS = [DeconstructIcon, ScanIcon, BuildIcon, OrchestrateIcon];
// One real photograph per step -- this is what makes the Playbook visibly
// change between steps, not just its text. All four NASA assets are used
// exactly once here (see ASSET_CREDITS.md).
const STEP_PHOTOS = [
  {
    src: "/media/nasa/optimized/tin-bider-crater-algeria.webp",
    alt: "Satellite crop of Tin Bider crater, Algeria",
    objectPosition: "42% 45%",
  },
  {
    src: "/media/nasa/optimized/topography-of-the-world.webp",
    alt: "Global topographic relief map (NASA/JPL/NIMA)",
    objectPosition: "center",
  },
  {
    src: "/media/nasa/optimized/blue-marble-earth.webp",
    alt: "True-color composite of Earth (NASA Blue Marble)",
    objectPosition: "50% 25%",
  },
  {
    src: "/media/nasa/optimized/black-marble-earth-at-night.webp",
    alt: "Satellite composite of Earth's city lights at night (NASA Black Marble)",
    objectPosition: "58% 38%",
  },
];

// An accessible accordion, not a scroll-driven sequence: all four step
// names show at once; hover/focus preview on desktop, click/tap selects,
// and arrow keys move between steps -- no information depends only on
// hover, since focus and click reach the same state.
export function Playbook() {
  const [active, setActive] = useState(0);
  const hoverCapable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const baseId = useId();
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusStep = (i: number) => {
    setActive(i);
    triggerRefs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusStep((i + 1) % playbook.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusStep((i - 1 + playbook.length) % playbook.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusStep(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusStep(playbook.length - 1);
    }
  };

  return (
    <section className="p32-section tx-grain-dark relative bg-p32-black text-p32-white" id="playbook">
      <div className="p32-container">
        <h2 className="text-center text-balance font-display text-3xl font-medium tracking-tight sm:text-5xl">
          The Playbook
        </h2>

        <div className="relative mt-14 md:mt-20">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 hidden h-px w-full bg-p32-gray-800 md:block"
          />
          <div
            aria-hidden="true"
            className="absolute top-0 hidden h-px bg-p32-signal transition-transform duration-300 ease-[var(--ease-out)] md:block"
            style={{ width: "25%", transform: `translateX(${active * 100}%)` }}
          />

          <div className="grid grid-cols-1 divide-y divide-p32-gray-800 md:grid-cols-4 md:divide-x md:divide-y-0">
            {playbook.map((step, i) => {
              const isOpen = active === i;
              const panelId = `${baseId}-panel-${i}`;
              const triggerId = `${baseId}-trigger-${i}`;
              const Icon = ICONS[i];
              const photo = STEP_PHOTOS[i];
              return (
                <div
                  key={step.index}
                  className={`relative overflow-hidden border-l-2 pt-8 pl-4 transition-colors duration-300 md:border-l-0 md:px-6 md:pl-6 md:pt-10 md:first:pl-0 ${
                    isOpen ? "border-p32-signal" : "border-transparent"
                  }`}
                  onMouseEnter={() => hoverCapable && setActive(i)}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                    style={{ opacity: isOpen ? 0.55 : 0.22 }}
                  >
                    <NasaPhoto
                      src={photo.src}
                      alt=""
                      objectPosition={photo.objectPosition}
                      gradient="180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%"
                      sizes="(min-width: 768px) 25vw, 100vw"
                    />
                  </div>
                  <button
                    ref={(el) => {
                      triggerRefs.current[i] = el;
                    }}
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="relative block w-full pb-8 text-left md:pb-10"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-sm text-p32-signal">{step.index}</span>
                      <Icon active={isOpen} />
                    </div>
                    <span className="mt-4 block text-balance font-display text-xl font-medium tracking-tight md:text-2xl">
                      {step.title}
                    </span>
                    <span className="mt-3 block max-w-xs text-pretty text-sm leading-relaxed text-p32-gray-300 md:text-base">
                      {step.statement}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="relative grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xs pb-8 text-pretty text-sm leading-relaxed text-p32-gray-500 md:pb-10">
                        {step.expanded}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
