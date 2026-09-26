"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";
import { EASE_OUT } from "@/lib/motion";

// Abstract and procedural, deliberately: "disparate systems" has no real
// photographic subject, so rather than stage or fabricate one, this stays a
// diagram -- three panels that sit misaligned and disconnected from one
// another, standing in for the friction the copy describes.
const LAYERS = [
  { y: 16, w: 78, x: 4, rotate: -1.6 },
  { y: 42, w: 62, x: 24, rotate: 1.2 },
  { y: 68, w: 86, x: -4, rotate: -0.7 },
];

export function SystemLayers() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const layers = layerRefs.current;
    if (!wrap || layers.some((l) => !l) || reducedMotion) return;

    ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.set(layers, {
        opacity: 0,
        rotate: (i: number) => LAYERS[i].rotate,
        x: (i: number) => (i % 2 === 0 ? -24 : 24),
      });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap, start: "top 80%", toggleActions: "play none none none" },
      });
      layers.forEach((l, i) => {
        tl.to(l, { opacity: 1, x: 0, duration: 0.7, ease: EASE_OUT }, i * 0.12);
      });
    }, wrap);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0 overflow-hidden bg-p32-near-black">
      {LAYERS.map((l, i) => (
        <div
          key={i}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          className="tx-machined absolute border border-p32-gray-800 bg-p32-panel/60"
          style={{
            top: `${l.y}%`,
            left: `${l.x}%`,
            width: `${l.w}%`,
            height: "22%",
            transform: reducedMotion ? `rotate(${l.rotate}deg)` : undefined,
            opacity: reducedMotion ? 1 : undefined,
          }}
        />
      ))}
    </div>
  );
}
