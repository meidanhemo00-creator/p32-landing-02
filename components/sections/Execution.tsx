"use client";

import { execution } from "@/lib/content";
import { useInView } from "@/hooks/useInView";

export function Execution() {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);

  return (
    <section className="flex min-h-[70vh] items-center bg-p32-white py-24 text-p32-black md:min-h-[85vh]">
      <div ref={ref} className="p32-container">
        <div
          aria-hidden="true"
          className="mb-10 h-px bg-p32-signal-deep transition-transform duration-[900ms] ease-out md:mb-14"
          style={{
            transform: inView ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
          }}
        />
        <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {execution.lineOne}
        </h2>
        <p className="mt-6 max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight text-p32-gray-600 sm:text-3xl md:mt-8 md:text-4xl">
          {execution.lineTwo}
        </p>
      </div>
    </section>
  );
}
