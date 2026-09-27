"use client";

import { useId, useRef, useState } from "react";
import { playbook } from "@/lib/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { NasaPhoto } from "@/components/media/NasaPhoto";
import { SectionBlend } from "@/components/SectionBlend";

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
      <SectionBlend from="white" />
      <div className="p32-container">
        <h2 className="reveal-heading text-center text-balance font-display text-3xl font-medium uppercase tracking-tight sm:text-5xl">
          The Playbook
        </h2>

        <div
          role="tablist"
          aria-label="Playbook steps"
          className="reveal-body mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 border-b border-p32-gray-800 pb-5 md:mt-16 md:gap-x-12"
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
                className={`whitespace-nowrap pb-1 text-sm font-medium tracking-tight transition-colors md:text-base ${
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
          className="relative mt-4 min-h-[62vh] overflow-hidden md:min-h-[68vh]"
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
                <div className="p32-container relative flex h-full flex-col items-center justify-center text-center">
                  <div className="glass-dark flex flex-col items-center gap-5 rounded-3xl px-8 py-10 md:px-16 md:py-14">
                    <h3 className="text-balance font-display text-2xl font-medium tracking-tight md:text-4xl">
                      {step.title}
                    </h3>
                    <p className="max-w-2xl text-balance text-lg font-medium leading-snug text-p32-gray-100 md:text-2xl">
                      {step.statement}
                    </p>
                    <p className="max-w-xl text-pretty text-sm leading-relaxed text-p32-gray-400 md:text-base">
                      {step.expanded}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
