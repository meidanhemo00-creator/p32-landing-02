"use client";

import { useEffect, useRef } from "react";
import { team } from "@/lib/content";
import { NasaPhoto } from "@/components/media/NasaPhoto";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";

// One strong cinematic reveal, not a set of decorative animations: a single
// curtain-style clip-path opens on the photograph as the two-beat headline
// resolves alongside it, all as one scrubbed sequence.
//
// No photograph of "silhouettes, hands, screens, hardware, technical work"
// exists in this environment and none can be generated or licensed here
// (confirmed before writing this file) -- so, consistent with the rest of
// the page, this reuses the real, credited Black Marble photograph: many
// quietly lit places standing in for the people behind them, not staged
// portraiture.
const [lineOne, lineTwo] = team.headline.split(/(?<=\.)\s+/);

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const body = bodyRef.current;
    if (!section || !image || !l1 || !l2 || !body || reducedMotion) return;

    ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.set(image, { clipPath: "inset(0 50% 0 50%)" });
      gsap.set([l1, l2], { opacity: 0, y: 16 });
      gsap.set(body, { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 85%", end: "top 20%", scrub: 0.6 },
      });
      tl.to(image, { clipPath: "inset(0 0% 0 0%)", duration: 0.5, ease: "none" }, 0)
        .to(l1, { opacity: 1, y: 0, duration: 0.3, ease: "none" }, 0.32)
        .to(l2, { opacity: 1, y: 0, duration: 0.3, ease: "none" }, 0.52)
        .to(body, { opacity: 1, y: 0, duration: 0.3, ease: "none" }, 0.74);
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-p32-black text-p32-white"
    >
      <div ref={imageRef} className="absolute inset-0">
        <NasaPhoto
          src="/media/nasa/optimized/black-marble-earth-at-night.webp"
          alt="Satellite composite of Earth's city lights at night, scattered across the globe (NASA Black Marble)"
          objectPosition="30% 35%"
          gradient="180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.82) 100%"
        />
      </div>
      <div className="p32-container relative flex flex-col items-center text-center">
        <h2 className="max-w-2xl font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
          <span ref={line1Ref} className="block">
            {lineOne}
          </span>
          <span ref={line2Ref} className="mt-2 block text-p32-gray-300">
            {lineTwo}
          </span>
        </h2>
        <div ref={bodyRef} className="mx-auto mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-p32-gray-300 md:mt-10 md:text-xl">
          <p>{team.bodyOne}</p>
          <p>{team.bodyTwo}</p>
        </div>
      </div>
    </section>
  );
}
