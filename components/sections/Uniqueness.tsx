"use client";

import { useEffect, useRef } from "react";
import { P32Logo } from "@/components/Logo";
import { uniqueness } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";
import { EASE_OUT } from "@/lib/motion";

function Headline() {
  const [before, after] = uniqueness.headline.split("P32");
  return (
    <h2 className="max-w-4xl font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
      {before}
      <span className="inline-flex items-center align-baseline">
        <P32Logo height={34} className="inline-block h-[0.62em] w-auto translate-y-[0.05em]" />
      </span>
      {after}
    </h2>
  );
}

// Seven independent system dots (many disconnected systems) collapse onto
// the three lifecycle nodes (one controlled lifecycle) as the section
// scrolls into place.
const SCATTER = [
  { cx: 40, cy: -46, target: 0 },
  { cx: 140, cy: -60, target: 0 },
  { cx: 260, cy: -50, target: 1 },
  { cx: 320, cy: -68, target: 1 },
  { cx: 380, cy: -44, target: 1 },
  { cx: 480, cy: -58, target: 2 },
  { cx: 560, cy: -46, target: 2 },
];
const NODE_X = [4, 300, 596];

function LifecycleTrace() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const stages = uniqueness.lifecycle;
  const pathLength = 600;

  useEffect(() => {
    const wrap = wrapRef.current;
    const line = lineRef.current;
    const dots = dotRefs.current;
    const nodes = nodeRefs.current;
    if (!wrap || !line || dots.some((d) => !d) || nodes.some((n) => !n)) return;
    if (reducedMotion) return;

    ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.set(line, { strokeDashoffset: pathLength });
      gsap.set(nodes, { opacity: 0, scale: 0.6, transformOrigin: "center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 85%",
          end: "top 25%",
          scrub: 0.5,
        },
      });

      dots.forEach((dot, i) => {
        const targetX = NODE_X[SCATTER[i].target];
        tl.to(dot, { cx: targetX, cy: 20, opacity: 0, duration: 1, ease: EASE_OUT }, 0);
      });
      tl.to(line, { strokeDashoffset: 0, duration: 0.6, ease: EASE_OUT }, 0.35);
      tl.to(nodes, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: EASE_OUT }, 0.55);
    }, wrap);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className="mx-auto mt-16 flex max-w-2xl flex-col items-center md:mt-24">
      <svg viewBox="-20 -90 640 130" className="w-full max-w-2xl overflow-visible" aria-hidden="true">
        <line x1="4" y1="20" x2="596" y2="20" stroke="var(--p32-gray-300)" strokeWidth="1" />
        <line
          ref={lineRef}
          x1="4"
          y1="20"
          x2="596"
          y2="20"
          stroke="var(--p32-signal-deep)"
          strokeWidth="1.5"
          strokeDasharray={pathLength}
          strokeDashoffset={reducedMotion ? 0 : pathLength}
        />
        {!reducedMotion &&
          SCATTER.map((d, i) => (
            <circle
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              cx={d.cx}
              cy={d.cy}
              r="2.5"
              fill="var(--p32-gray-500)"
            />
          ))}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            cx={NODE_X[i]}
            cy="20"
            r="4.5"
            fill="var(--p32-black)"
            stroke="var(--p32-signal-deep)"
            strokeWidth="1.5"
            opacity={reducedMotion ? 1 : undefined}
          />
        ))}
      </svg>
      <div className="mt-4 flex w-full max-w-2xl justify-between text-sm text-p32-gray-600">
        {stages.map((stage) => (
          <span key={stage}>{stage}</span>
        ))}
      </div>
    </div>
  );
}

export function Uniqueness() {
  return (
    <section className="p32-section tx-grain-light bg-p32-white text-p32-black">
      <div className="p32-container flex flex-col items-center text-center">
        <Headline />
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-p32-gray-700 md:mt-10 md:text-xl">
          {uniqueness.body}
        </p>
        <LifecycleTrace />
      </div>
    </section>
  );
}
