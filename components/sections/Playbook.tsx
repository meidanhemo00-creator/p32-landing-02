"use client";

import type { CSSProperties } from "react";
import { useId, useRef, useState } from "react";
import { playbook } from "@/lib/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { NasaPhoto } from "@/components/media/NasaPhoto";
import { splitWords } from "@/lib/splitWords";

// One large cinematic image stage, not four boxes: a slim step-name strip
// selects which step is active, and one shared stage below crossfades its
// image and text -- the section's height never changes between steps.
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
    src: "/media/nasa/optimized/earths-limb-pacific.webp",
    alt: "The sun illuminates Earth's limb above the Pacific Ocean, seen from the International Space Station (NASA)",
    objectPosition: "center 55%",
  },
  {
    src: "/media/nasa/optimized/black-marble-earth-at-night.webp",
    alt: "Satellite composite of Earth's city lights at night (NASA Black Marble)",
    objectPosition: "58% 38%",
  },
];

export function Playbook() {
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
    <section className="p32-section relative bg-p32-black text-p32-white" id="playbook">
      <div className="p32-container">
        <h2
          data-reveal="words"
          className="text-center text-balance font-display text-3xl font-medium uppercase tracking-tight sm:text-5xl"
        >
          {splitWords("The Playbook")}
        </h2>

        <div
          role="tablist"
          aria-label="Playbook steps"
          className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 border-b border-p32-gray-800 pb-5 md:mt-16 md:gap-x-12"
        >
          {playbook.map((step, i) => {
            const isActive = active === i;
            return (
              <button
                key={step.index}
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
                className={`p32-press whitespace-nowrap pb-1 text-sm font-medium tracking-tight transition-colors md:text-base ${
                  isActive ? "text-p32-white" : "text-p32-gray-500 hover:text-p32-gray-300"
                }`}
              >
                <span className="label-glow mr-2 font-mono text-xs text-p32-signal">{step.index}</span>
                {step.title}
              </button>
            );
          })}
        </div>

        <div
          id={`${baseId}-stage`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active}`}
          data-reveal="up"
          className="relative mt-4 min-h-[58vh] overflow-hidden md:min-h-[68vh]"
        >
          {playbook.map((step, i) => {
            const isActive = active === i;
            const photo = STEP_PHOTOS[i];
            return (
              <div
                key={step.index}
                aria-hidden={!isActive}
                className="absolute inset-0 transition-opacity duration-300 ease-out"
                style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
              >
                <NasaPhoto
                  src={photo.src}
                  alt={photo.alt}
                  objectPosition={photo.objectPosition}
                  gradient="180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%"
                />
                <div className="p32-container relative flex h-full flex-col items-center justify-center gap-5 text-center">
                  <h3 className="text-balance font-display text-2xl font-medium tracking-tight md:text-4xl">
                    {splitWords(step.title)}
                  </h3>
                  <p className="max-w-2xl text-balance text-lg font-medium leading-snug text-p32-gray-100 md:text-2xl">
                    {splitWords(step.statement)}
                  </p>
                  <p className="max-w-xl text-pretty text-sm leading-relaxed text-p32-gray-400 md:text-base">
                    {step.expanded}
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
