"use client";

import { useEffect, useRef } from "react";
import { team } from "@/lib/content";
import { NasaPhoto } from "@/components/media/NasaPhoto";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";

// Full-screen, image-led: three crops of the same Black Marble photograph
// (many places, quietly lit, no faces) crossfade as the section scrolls --
// "the world sees the outcome, it almost never sees the people," rendered
// as distributed lights rather than portraiture.
const CROPS = ["12% 30%", "70% 62%", "45% 15%"];

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
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      tl.to(frames[0], { opacity: 0, duration: 0.3 }, 0.28)
        .to(frames[1], { opacity: 1, duration: 0.3 }, 0.28)
        .to(frames[1], { opacity: 0, duration: 0.3 }, 0.64)
        .to(frames[2], { opacity: 1, duration: 0.3 }, 0.64);
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-p32-black text-p32-white"
    >
      {CROPS.map((pos, i) => (
        <div
          key={i}
          ref={(el) => {
            frameRefs.current[i] = el;
          }}
          className="absolute inset-0"
        >
          <NasaPhoto
            src="/media/nasa/optimized/black-marble-earth-at-night.webp"
            alt={i === 0 ? "Satellite composite of Earth's city lights at night, scattered across the globe (NASA Black Marble)" : ""}
            objectPosition={pos}
            gradient="180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.8) 100%"
          />
        </div>
      ))}
      <div className="p32-container relative flex flex-col items-center text-center">
        <h2 className="max-w-2xl font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
          {team.headline}
        </h2>
        <div className="mx-auto mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-p32-gray-300 md:mt-10 md:text-xl">
          <p>{team.bodyOne}</p>
          <p>{team.bodyTwo}</p>
        </div>
      </div>
    </section>
  );
}
