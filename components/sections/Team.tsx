"use client";

import { useEffect, useRef } from "react";
import { team } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";

// Layered, obscured planes standing in for "the people behind the systems"
// -- depth and material, not portraits. Each layer parallaxes at its own
// rate as the section scrolls past.
export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const layers = layerRefs.current;
    if (!section || layers.some((l) => !l) || reducedMotion) return;

    ensureGsapRegistered();
    const rates = [18, 42, 70];
    const ctx = gsap.context(() => {
      layers.forEach((layer, i) => {
        gsap.fromTo(
          layer,
          { y: -rates[i] },
          {
            y: rates[i],
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="tx-grain-dark relative overflow-hidden bg-p32-black text-p32-white p32-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--p32-gray-100) 0px, var(--p32-gray-100) 1px, transparent 1px, transparent 64px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[10%] hidden w-px bg-p32-signal/25 md:block"
      />

      <div className="p32-container relative grid gap-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-8">
        <div>
          <h2 className="max-w-xl font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
            {team.headline}
          </h2>
          <div className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-p32-gray-300 md:mt-14 md:text-xl">
            <p>{team.bodyOne}</p>
            <p>{team.bodyTwo}</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative hidden h-[420px] md:block"
          style={{ perspective: "800px" }}
        >
          <div
            ref={(el) => {
              layerRefs.current[0] = el;
            }}
            className="tx-machined absolute inset-x-6 top-4 h-64 border border-p32-gray-800 bg-p32-panel/60"
          />
          <div
            ref={(el) => {
              layerRefs.current[1] = el;
            }}
            className="absolute inset-x-0 top-20 h-56 border border-p32-gray-700 bg-p32-near-black/80 backdrop-blur-[1px]"
          />
          <div
            ref={(el) => {
              layerRefs.current[2] = el;
            }}
            className="absolute inset-x-10 bottom-4 h-48 border border-p32-signal/30 bg-p32-black"
          >
            <div className="absolute inset-4 border border-p32-gray-800" />
          </div>
        </div>
      </div>
    </section>
  );
}
