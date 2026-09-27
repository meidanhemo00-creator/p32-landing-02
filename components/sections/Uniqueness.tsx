import type { CSSProperties } from "react";
import { P32Logo } from "@/components/Logo";
import { uniqueness } from "@/lib/content";
import { splitWords } from "@/lib/splitWords";

function Headline() {
  const [before, after] = uniqueness.headline.split("P32");
  const logoIndex = before.trim().split(" ").filter(Boolean).length;
  return (
    <h2 className="max-w-4xl text-balance font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
      {splitWords(before)}{" "}
      <span
        className="word-reveal inline-flex items-center align-baseline"
        style={{ "--word-index": logoIndex } as CSSProperties}
      >
        <P32Logo height={34} className="inline-block h-[0.62em] w-auto translate-y-[0.05em]" />
      </span>{" "}
      {splitWords(after, logoIndex + 1)}
    </h2>
  );
}

const NODE_X = [4, 300, 596];

// One strong static systems visual: three lifecycle nodes on a single
// resolved line -- no scroll-linked collapse animation, just the settled
// end state (many disconnected systems is the copy's job, not the diagram's).
function LifecycleTrace() {
  const stages = uniqueness.lifecycle;
  return (
    <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center md:mt-24">
      <svg viewBox="-20 -10 640 50" className="w-full max-w-2xl overflow-visible" aria-hidden="true">
        <line x1="4" y1="20" x2="596" y2="20" stroke="var(--p32-signal-deep)" strokeWidth="1.5" />
        {NODE_X.map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy="20"
            r="4.5"
            fill="var(--p32-black)"
            stroke="var(--p32-signal-deep)"
            strokeWidth="1.5"
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
        <p className="reveal-body mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-p32-gray-700 md:mt-10 md:text-xl">
          {uniqueness.body}
        </p>
        <LifecycleTrace />
      </div>
    </section>
  );
}
