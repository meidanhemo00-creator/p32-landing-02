"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PANEL_COUNT = 15;

// Deterministic pseudo-random (same value on server and client, no
// hydration mismatch) used only to compute the transient "scattered"
// starting positions that GSAP animates away from after mount.
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 999 + salt * 37.13) * 10000;
  return x - Math.floor(x);
}

// The resolved, final silhouette is a deliberate curve, not noise: this is
// what renders by default (no-JS / reduced-motion fallback) and what the
// panels animate into. It reads as engineered, not random.
function finalHeightPercent(i: number, total: number) {
  const t = i / (total - 1);
  const peak = Math.exp(-Math.pow((t - 0.62) * 2.6, 2));
  // Fixed precision keeps the server-rendered and client-hydrated style
  // strings byte-identical regardless of tiny cross-engine float variance.
  return Number((28 + peak * 62).toFixed(3));
}

export function HeroAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container) return;

    const panels = Array.from(
      container.querySelectorAll<HTMLDivElement>("[data-panel]")
    );

    const ctx = gsap.context(() => {
      // Scatter: set the transient pre-animation state synchronously,
      // before first paint, so there is no flash of the resolved state.
      panels.forEach((panel, i) => {
        const jitterY = (seeded(i, 1) - 0.5) * 220;
        const rotate = (seeded(i, 2) - 0.5) * 10;
        const opacity = 0.18 + seeded(i, 3) * 0.22;
        gsap.set(panel, { y: jitterY, rotate, opacity, scaleY: 0.82 });
      });
      if (line) gsap.set(line, { scaleX: 0, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(panels, {
        y: 0,
        rotate: 0,
        opacity: 1,
        scaleY: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: { each: 0.035, from: "edges" },
      }).to(
        line,
        { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.35"
      ).to(
        line,
        { opacity: 0.18, duration: 0.8, ease: "power1.out" },
        "+=0.05"
      );
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[34vh] items-end gap-[3px] px-4 md:h-[42vh] md:gap-[6px] md:px-0"
    >
      {Array.from({ length: PANEL_COUNT }).map((_, i) => {
        const h = finalHeightPercent(i, PANEL_COUNT);
        return (
          <div
            key={i}
            data-panel
            className="flex-1 origin-bottom rounded-t-[1px] bg-gradient-to-t from-p32-panel to-p32-near-black"
            style={{ height: `${h}%` }}
          />
        );
      })}
      <div
        ref={lineRef}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-p32-signal"
      />
    </div>
  );
}
