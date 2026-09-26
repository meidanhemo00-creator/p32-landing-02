"use client";

import { P32Logo } from "@/components/Logo";
import { uniqueness } from "@/lib/content";
import { useInView } from "@/hooks/useInView";

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

function LifecycleTrace() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const stages = uniqueness.lifecycle;
  const pathLength = 600;

  return (
    <div ref={ref} className="mt-16 md:mt-24">
      <svg
        viewBox="0 0 600 40"
        className="w-full max-w-2xl"
        aria-hidden="true"
      >
        <line
          x1="4"
          y1="20"
          x2="596"
          y2="20"
          stroke="var(--p32-gray-300)"
          strokeWidth="1"
        />
        <line
          x1="4"
          y1="20"
          x2="596"
          y2="20"
          stroke="var(--p32-signal-deep)"
          strokeWidth="1.5"
          strokeDasharray={pathLength}
          strokeDashoffset={inView ? 0 : pathLength}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)" }}
        />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={4 + i * 296}
            cy="20"
            r="4.5"
            fill="var(--p32-black)"
            stroke="var(--p32-signal-deep)"
            strokeWidth="1.5"
            style={{
              opacity: inView ? 1 : 0,
              transition: `opacity 0.4s ease ${0.3 + i * 0.5}s`,
            }}
          />
        ))}
      </svg>
      <div className="mt-4 flex max-w-2xl justify-between text-sm text-p32-gray-600">
        {stages.map((stage) => (
          <span key={stage}>{stage}</span>
        ))}
      </div>
    </div>
  );
}

export function Uniqueness() {
  return (
    <section className="p32-section bg-p32-white text-p32-black">
      <div className="p32-container">
        <Headline />
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-p32-gray-700 md:mt-10 md:text-xl">
          {uniqueness.body}
        </p>
        <LifecycleTrace />
      </div>
    </section>
  );
}
