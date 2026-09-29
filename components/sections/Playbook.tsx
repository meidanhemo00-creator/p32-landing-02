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
    // Real, unstaged workshop photograph (NASA public domain, see
    // ASSET_CREDITS.md): an engineering technician at a milling machine --
    // hands-on breakdown of a problem into parts. No logos in frame.
    src: "/media/nasa/optimized/fabrication-shop-milling.webp",
    alt: "An engineering technician operating a milling machine in a fabrication workshop",
    objectPosition: "62% 40%",
  },
  {
    src: "/media/nasa/optimized/blue-marble-earth.webp",
    alt: "Blue Marble composite of Earth's full disc, land and cloud cover (NASA)",
    objectPosition: "48% 22%",
  },
  {
    src: "/media/nasa/optimized/city-lights-lucknow.webp",
    alt: "Satellite view of dense urban infrastructure and lights, Lucknow (NASA)",
    objectPosition: "center",
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
          className="text-center text-balance font-mono text-2xl font-medium uppercase tracking-tight sm:text-4xl"
        >
          {splitWords("The Playbook")}
        </h2>

        {/* Explicit prompt: without it, visitors on touch screens had no cue
            that the four steps are selectable. */}
        <p
          data-reveal="up"
          className="mx-auto mt-6 max-w-[22rem] text-center text-balance font-mono text-xs uppercase leading-relaxed tracking-[0.16em] text-p32-signal sm:max-w-none md:mt-10 md:text-sm"
        >
          <span aria-hidden="true" className="playbook-cue-dot" />
          Select a step to explore more capabilities
        </p>

        {/* Four equal cells -- 2x2 on phones, 1x4 from sm -- divided by
            hairlines (the 1px gap over a gray background), each centered with
            its index above its title, so every step carries the same weight
            and the grid reads symmetrically at every width. */}
        <div
          role="tablist"
          aria-label="Playbook steps"
          className="mt-5 grid grid-cols-2 gap-px border border-p32-gray-800 bg-p32-gray-800 sm:grid-cols-4 md:mt-6"
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
                className={`p32-press relative flex min-h-[5.5rem] flex-col items-center justify-center gap-1.5 bg-p32-black px-3 py-4 text-center text-sm font-medium leading-snug tracking-tight transition-colors md:min-h-[6rem] md:text-base ${
                  isActive ? "text-p32-white" : "text-p32-gray-500 hover:bg-p32-panel hover:text-p32-gray-300"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-0.5 origin-center bg-p32-signal transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <span className="label-glow font-mono text-xs text-p32-signal">{step.index}</span>
                <span className="text-balance">{step.title}</span>
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
