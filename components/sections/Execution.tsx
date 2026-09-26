"use client";

import { useEffect, useRef, useState } from "react";
import { execution } from "@/lib/content";
import { RedButtonAbstract } from "@/components/scenes/RedButtonAbstract";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";
import { EASE_OUT } from "@/lib/motion";

export function Execution() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const [triggered, setTriggered] = useState(false);
  const armed = reducedMotion || triggered;
  const words = execution.lineOne.split(" ");

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const line = lineRef.current;
    const wordEls = wordRefs.current;
    const sub = subRef.current;
    if (!section || !line || !sub || wordEls.some((w) => !w)) return;

    ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.set(line, { scaleX: 0, transformOrigin: "left" });
      gsap.set(sub, { opacity: 0, y: 10 });
      wordEls.forEach((w, i) => {
        gsap.set(w, {
          y: 18 + (i % 2) * 10,
          rotate: i % 2 === 0 ? -3 : 3,
          opacity: 0,
        });
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        })
        .call(() => setTriggered(true))
        .to(line, { scaleX: 1, duration: 0.5, ease: "back.out(1.6)" }, "<")
        .to(
          wordEls,
          { y: 0, rotate: 0, opacity: 1, duration: 0.55, stagger: 0.045, ease: "back.out(1.3)" },
          "-=0.2"
        )
        .to(sub, { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT }, "-=0.15");
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-p32-black py-24 text-p32-white"
    >
      <div aria-hidden="true" className="opacity-70">
        <RedButtonAbstract armed={armed} />
      </div>
      <div className="p32-container relative flex flex-col items-center text-center">
        <div ref={lineRef} aria-hidden="true" className="mb-10 h-px w-24 bg-p32-signal-deep md:mb-14" />
        <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {words.map((word, i) => (
            <span key={i} className="mr-[0.28em] inline-block overflow-visible">
              <span
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className="inline-block will-change-transform"
              >
                {word}
              </span>
            </span>
          ))}
        </h2>
        <p
          ref={subRef}
          className="mx-auto mt-6 max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight text-p32-gray-400 sm:text-3xl md:mt-8 md:text-4xl"
        >
          {execution.lineTwo}
        </p>
      </div>
    </section>
  );
}
