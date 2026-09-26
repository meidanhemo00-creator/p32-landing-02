"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Nav } from "@/components/Nav";
import { HeroAssembly } from "./HeroAssembly";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hero } from "@/lib/content";

export function Hero() {
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const l1 = lineOneRef.current;
    const l2 = lineTwoRef.current;
    if (!l1 || !l2) return;

    const ctx = gsap.context(() => {
      gsap.set([l1, l2], { yPercent: 115 });
      gsap
        .timeline({ delay: 0.35 })
        .to(l1, { yPercent: 0, duration: 0.9, ease: "power3.out" })
        .to(l2, { yPercent: 0, duration: 0.9, ease: "power3.out" }, "-=0.62");
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-p32-black text-p32-white"
    >
      <Nav />
      <HeroAssembly />
      <div className="p32-container relative z-10 pb-16 pt-24 md:pb-24">
        <h1 className="max-w-4xl font-display text-[13vw] leading-[0.98] font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <span className="block overflow-hidden">
            <span ref={lineOneRef} className="block">
              {hero.lineOne}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span ref={lineTwoRef} className="block text-p32-gray-300">
              {hero.lineTwo}
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
