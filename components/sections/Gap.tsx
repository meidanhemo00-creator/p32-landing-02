"use client";

import { useEffect, useRef } from "react";
import { gap } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";
import { EASE_OUT } from "@/lib/motion";

const sizes = ["text-2xl md:text-4xl", "text-xl md:text-3xl", "text-lg md:text-2xl"];
const indents = ["ml-0", "ml-6 md:ml-10", "ml-12 md:ml-20"];
// Each point arrives from a distinct direction, and the arrival windows
// overlap on purpose (0-0.42, 0.3-0.68, 0.56-0.92) so the second point is
// still moving when the first arrives, and the third when the second
// arrives -- a scroll-scrubbed collision, not a sequential reveal.
const FROM = [
  { x: -160, y: 0, rotate: -7 },
  { x: 220, y: -10, rotate: 6 },
  { x: 0, y: 130, rotate: 4 },
];
const WINDOWS: [number, number][] = [
  [0, 0.42],
  [0.3, 0.68],
  [0.56, 0.92],
];

export function Gap() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const items = itemRefs.current;
    if (!section || !line || items.some((el) => !el)) return;
    if (reducedMotion) return;

    ensureGsapRegistered();
    const mm = gsap.matchMedia();

    // Desktop: the pinned, scrubbed collision described above. Mobile: a
    // lighter, non-pinned stagger reveal -- no pin (Safari pin jank risk),
    // no wide translateX offsets (they'd overflow a narrow viewport).
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        items.forEach((el, i) => {
          gsap.set(el, {
            x: FROM[i].x,
            y: FROM[i].y,
            rotate: FROM[i].rotate,
            opacity: 0,
          });
        });
        gsap.set(line, { scaleY: 0, transformOrigin: "top" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 0.9}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        items.forEach((el, i) => {
          const [start, end] = WINDOWS[i];
          tl.to(
            el,
            { x: 0, y: 0, rotate: 0, opacity: 1, duration: end - start, ease: EASE_OUT },
            start
          );
        });
        tl.to(line, { scaleY: 1, duration: 0.3, ease: EASE_OUT }, 0.55);
      }, section);
      return () => ctx.revert();
    });

    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        items.forEach((el) => gsap.set(el, { y: 16, opacity: 0 }));
        gsap.set(line, { scaleY: 0, transformOrigin: "top" });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
        });
        tl.to(line, { scaleY: 1, duration: 0.6, ease: EASE_OUT }).to(
          items,
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: EASE_OUT },
          "-=0.4"
        );
      }, section);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="p32-section tx-grain-dark overflow-x-hidden bg-p32-black text-p32-white"
    >
      <div className="p32-container">
        <h2 className="max-w-3xl font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
          {gap.headline}
        </h2>

        <div className="relative mt-14 max-w-3xl pl-6 md:mt-20 md:pl-8">
          <div
            ref={lineRef}
            aria-hidden="true"
            className="absolute left-0 top-1 bottom-1 w-px bg-p32-gray-700"
          />
          <ul className="flex flex-col gap-7 md:gap-9">
            {gap.points.map((point, i) => (
              <li
                key={point}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`${sizes[i]} ${indents[i]} relative font-medium leading-snug tracking-tight text-p32-gray-100`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-6 top-[0.7em] h-px w-4 bg-p32-gray-700 md:-left-8"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
