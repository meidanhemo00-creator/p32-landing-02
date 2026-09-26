"use client";

import { useEffect, useId, useRef, useState } from "react";
import { playbook } from "@/lib/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsapSetup";
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

export function Playbook() {
  const [active, setActive] = useState<number | null>(null);
  const hoverCapable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useReducedMotion();
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const manualRef = useRef(false);
  const stRef = useRef<ScrollTrigger | null>(null);

  // Desktop: pin the section and let scroll drive which step is active,
  // while hover/focus can still override at any time (manualRef wins until
  // the pointer leaves, then scroll resumes from wherever it currently is).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    ensureGsapRegistered();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * 1.9}`,
        scrub: 0.4,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (manualRef.current) return;
          const step = Math.min(3, Math.floor(self.progress * 4));
          setActive(self.progress <= 0 ? null : step);
        },
      });
      stRef.current = st;
      return () => {
        st.kill();
        stRef.current = null;
      };
    });

    return () => mm.revert();
  }, [reducedMotion]);

  const setManual = (i: number | null) => {
    manualRef.current = i !== null;
    setActive(i);
  };

  const clearManual = () => {
    manualRef.current = false;
    const st = stRef.current;
    if (st) {
      const step = Math.min(3, Math.floor(Math.max(st.progress, 0) * 4));
      setActive(st.progress <= 0 ? null : step);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="p32-section tx-grain-dark relative bg-p32-black text-p32-white"
      id="playbook"
    >
      <div className="p32-container">
        <h2 className="text-center font-display text-3xl font-medium tracking-tight sm:text-5xl">
          The Playbook
        </h2>

        <div className="relative mt-14 md:mt-20">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 hidden h-px w-full bg-p32-gray-800 md:block"
          />
          <div
            aria-hidden="true"
            className="absolute top-0 hidden h-px bg-p32-signal transition-transform duration-500 ease-[var(--ease-out)] md:block"
            style={{
              width: "25%",
              transform: `translateX(${active === null ? 0 : active * 100}%)`,
              opacity: active === null ? 0 : 1,
            }}
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
                  onMouseEnter={() => hoverCapable && setManual(i)}
                  onMouseLeave={() => hoverCapable && clearManual()}
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
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setManual(active === i ? null : i)}
                    onFocus={() => setManual(i)}
                    className="relative block w-full pb-8 text-left md:pb-10"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-sm text-p32-signal">{step.index}</span>
                      <Icon active={isOpen} />
                    </div>
                    <span className="mt-4 block font-display text-xl font-medium tracking-tight md:text-2xl">
                      {step.title}
                    </span>
                    <span className="mt-3 block max-w-xs text-sm leading-relaxed text-p32-gray-300 md:text-base">
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
                      <p className="max-w-xs pb-8 text-sm leading-relaxed text-p32-gray-500 md:pb-10">
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
