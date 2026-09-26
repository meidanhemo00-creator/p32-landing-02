"use client";

import { useEffect, useRef } from "react";
import { team } from "@/lib/content";
import { MachinedMacroFrame, ScreenSilhouetteFrame, WorkLightFrame } from "@/components/scenes/MaterialFrames";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";

// A large central image with generous negative space -- a cinematic
// three-frame sequence (work light / screen silhouette / material macro)
// that crossfades as the section scrolls past, standing in for "the people
// behind the systems" without portraiture.
export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const frames = frameRefs.current;
    if (!section || frames.some((f) => !f) || reducedMotion) return;

    ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.set(frames[1], { opacity: 0 });
      gsap.set(frames[2], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 70%", end: "bottom 40%", scrub: 0.6 },
      });
      tl.to(frames[0], { opacity: 0, duration: 0.3 }, 0.28)
        .to(frames[1], { opacity: 1, duration: 0.3 }, 0.28)
        .to(frames[1], { opacity: 0, duration: 0.3 }, 0.64)
        .to(frames[2], { opacity: 1, duration: 0.3 }, 0.64);
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="tx-grain-light relative overflow-hidden bg-p32-white text-p32-black p32-section">
      <div className="p32-container relative flex flex-col items-center text-center">
        <h2 className="max-w-2xl font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
          {team.headline}
        </h2>
        <div className="mx-auto mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-p32-gray-700 md:mt-10 md:text-xl">
          <p>{team.bodyOne}</p>
          <p>{team.bodyTwo}</p>
        </div>

        <div className="relative mx-auto mt-16 aspect-video w-full max-w-3xl overflow-hidden md:mt-20">
          <div ref={(el) => { frameRefs.current[0] = el; }} className="absolute inset-0">
            <WorkLightFrame />
          </div>
          <div ref={(el) => { frameRefs.current[1] = el; }} className="absolute inset-0">
            <ScreenSilhouetteFrame />
          </div>
          <div ref={(el) => { frameRefs.current[2] = el; }} className="absolute inset-0">
            <MachinedMacroFrame />
          </div>
        </div>
      </div>
    </section>
  );
}
