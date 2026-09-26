"use client";

import { useEffect, useRef } from "react";
import { vision } from "@/lib/content";
import { GlobalRoutes } from "@/components/scenes/GlobalRoutes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";

export function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const mask = maskRef.current;
    const flash = flashRef.current;
    const body = bodyRef.current;
    if (!section || !mask || !flash || !body) return;

    if (reducedMotion) return;

    ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.set(mask, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(flash, { opacity: 0.9 });
      gsap.set(body, { opacity: 0, y: 14 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        })
        .to(mask, { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: EASE_IN_OUT })
        .to(flash, { opacity: 0, duration: 0.9, ease: EASE_OUT }, "<")
        .to(body, { opacity: 1, y: 0, duration: 0.7, ease: EASE_OUT }, "-=0.35");
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="p32-section relative overflow-hidden bg-p32-white text-p32-black">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40">
        <GlobalRoutes />
      </div>
      <div
        ref={flashRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-p32-white opacity-0"
      />
      <div className="p32-container relative flex flex-col items-center text-center">
        <div ref={maskRef} className="max-w-4xl">
          <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            {vision.headline}
          </h2>
        </div>
        <p
          ref={bodyRef}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-p32-gray-700 md:mt-10 md:text-xl"
        >
          {vision.body}
        </p>
      </div>
    </section>
  );
}
