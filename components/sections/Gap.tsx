"use client";

import { useEffect, useRef } from "react";
import { gap } from "@/lib/content";
import { NasaPhoto } from "@/components/media/NasaPhoto";
import { SystemLayers } from "@/components/scenes/SystemLayers";
import { ExposureScan } from "@/components/scenes/ExposureScan";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";
import { EASE_OUT } from "@/lib/motion";

// Three pressures, three distinct visual devices: real satellite imagery for
// the landscape statement, an abstract procedural diagram for "disparate
// systems" (no real photograph fits that concept), and an abstract
// procedural scan for "exposure" (same reasoning). See ASSETS.md.
function Visual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <NasaPhoto
        src="/media/nasa/optimized/topography-of-the-world.webp"
        alt="Global topographic relief map derived from Shuttle Radar Topography Mission elevation data (NASA/JPL/NIMA)"
        objectPosition="center"
        gradient="180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.68) 100%"
        contrast={1.3}
      />
    );
  }
  if (index === 1) return <SystemLayers />;
  return <ExposureScan />;
}

const WINDOWS: [number, number][] = [
  [0, 0.36],
  [0.3, 0.68],
  [0.62, 1],
];

export function Gap() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const panelsWrapRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const panelsWrap = panelsWrapRef.current;
    const panels = panelRefs.current;
    if (!section || !intro || !panelsWrap || panels.some((p) => !p) || reducedMotion) return;

    ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.set(intro, { opacity: 0, y: 16 });
      gsap
        .timeline({
          scrollTrigger: { trigger: section, start: "top 78%", toggleActions: "play none none none" },
        })
        .to(intro, { opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT });
    }, section);

    const mm = gsap.matchMedia();

    // Desktop: pinned crossfade through the three pressures -- smooth and
    // scrubbed, no per-step snapping. The absolute-overlay layout that the
    // crossfade needs is applied here, by JS, rather than as a static `md:`
    // class -- so a reduced-motion visitor (this whole effect bails out
    // above when reducedMotion is true) always gets the plain stacked
    // document-flow layout instead of three panels silently overlapping
    // with no JS running to hide the inactive ones.
    mm.add("(min-width: 768px)", () => {
      const dctx = gsap.context(() => {
        gsap.set(panelsWrap, { height: "100vh" });
        gsap.set(panels, { position: "absolute", inset: 0, minHeight: 0, opacity: 0 });
        gsap.set(panels[0], { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panelsWrap,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.0}`,
            scrub: 0.5,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        panels.forEach((panel, i) => {
          const [start, end] = WINDOWS[i];
          const fade = Math.min(0.06, end - start);
          if (i > 0) tl.to(panel, { opacity: 1, duration: fade, ease: "none" }, start);
          if (i < panels.length - 1) tl.to(panel, { opacity: 0, duration: fade, ease: "none" }, end - fade);
        });
      }, section);
      return () => dctx.revert();
    });

    // Mobile: each pressure is its own stacked block, revealed once as it
    // scrolls into view -- no pin (jank risk on touch), no crossfade.
    mm.add("(max-width: 767px)", () => {
      const mctx = gsap.context(() => {
        panels.forEach((panel) => {
          if (!panel) return;
          gsap.set(panel, { opacity: 1 });
          const text = panel.querySelector("[data-statement]");
          if (!text) return;
          gsap.set(text, { opacity: 0, y: 14 });
          gsap
            .timeline({
              scrollTrigger: { trigger: panel, start: "top 78%", toggleActions: "play none none none" },
            })
            .to(text, { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT });
        });
      }, section);
      return () => mctx.revert();
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="p32-section tx-grain-dark relative overflow-x-hidden bg-p32-black text-p32-white"
    >
      <div ref={introRef} className="p32-container relative flex flex-col items-center text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-p32-signal md:text-sm">{gap.label}</p>
        <h2 className="mt-5 max-w-4xl font-display text-3xl font-medium uppercase leading-[1.1] tracking-tight sm:text-5xl md:mt-6 md:text-6xl">
          {gap.headline}
        </h2>
      </div>

      <div
        ref={panelsWrapRef}
        className="relative mt-14 flex flex-col gap-6 overflow-hidden md:mt-20"
      >
        {gap.points.map((point, i) => (
          <div
            key={point}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="relative min-h-[60vh] w-full overflow-hidden"
          >
            <Visual index={i} />
            <div className="p32-container relative z-10 flex h-full min-h-[60vh] flex-col items-center justify-center text-center">
              <span className="font-mono text-sm text-p32-signal">{`0${i + 1}`}</span>
              <p
                data-statement
                className="mt-4 max-w-3xl font-display text-3xl font-medium uppercase leading-[1.12] tracking-tight sm:text-5xl md:text-6xl"
              >
                {point}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
