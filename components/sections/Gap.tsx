"use client";

import { gap } from "@/lib/content";
import { useInView } from "@/hooks/useInView";

const sizes = [
  "text-2xl md:text-4xl",
  "text-xl md:text-3xl",
  "text-lg md:text-2xl",
];
const indents = ["ml-0", "ml-6 md:ml-10", "ml-12 md:ml-20"];

export function Gap() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="p32-section bg-p32-black text-p32-white">
      <div className="p32-container">
        <h2 className="max-w-3xl font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
          {gap.headline}
        </h2>

        <div ref={ref} className="relative mt-14 max-w-3xl pl-6 md:mt-20 md:pl-8">
          <div
            className="absolute left-0 top-1 w-px bg-p32-gray-700 transition-transform duration-[1400ms] ease-out"
            style={{
              transform: inView ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top",
              bottom: "0.25rem",
            }}
          />
          <ul className="flex flex-col gap-7 md:gap-9">
            {gap.points.map((point, i) => (
              <li
                key={point}
                className={`${sizes[i]} ${indents[i]} relative font-medium leading-snug tracking-tight text-p32-gray-100 transition-all duration-700 ease-out`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(-12px)",
                  transitionDelay: inView ? `${200 + i * 220}ms` : "0ms",
                }}
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
