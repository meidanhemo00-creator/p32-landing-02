"use client";

import { useId, useState } from "react";
import { playbook } from "@/lib/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Playbook() {
  const [active, setActive] = useState<number | null>(null);
  const hoverCapable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const baseId = useId();

  return (
    <section className="p32-section bg-p32-black text-p32-white" id="playbook">
      <div className="p32-container">
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-5xl">
          The Playbook
        </h2>

        <div className="relative mt-14 md:mt-20">
          {/* connecting rail */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 hidden h-px w-full bg-p32-gray-800 md:block"
          />
          <div
            aria-hidden="true"
            className="absolute top-0 hidden h-px bg-p32-signal transition-transform duration-500 ease-out md:block"
            style={{
              width: "25%",
              transform: `translateX(${active === null ? 0 : active * 100}%)`,
              opacity: active === null ? 0 : 1,
            }}
          />

          <div className="grid grid-cols-1 divide-y divide-p32-gray-800 md:grid-cols-4 md:divide-x md:divide-y-0">
            {playbook.map((step, i) => {
              const isOpen = active === i;
              const panelId = `${baseId}-panel-${i}`;
              const triggerId = `${baseId}-trigger-${i}`;
              return (
                <div
                  key={step.index}
                  className={`relative border-l-2 pt-8 pl-4 transition-colors duration-300 md:border-l-0 md:px-6 md:pl-6 md:pt-10 md:first:pl-0 ${
                    isOpen ? "border-p32-signal" : "border-transparent"
                  }`}
                  onMouseEnter={() => hoverCapable && setActive(i)}
                  onMouseLeave={() =>
                    hoverCapable && setActive((cur) => (cur === i ? null : cur))
                  }
                >
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setActive((cur) => (cur === i ? null : i))}
                    onFocus={() => setActive(i)}
                    className="block w-full pb-8 text-left md:pb-10"
                  >
                    <span className="font-mono text-sm text-p32-signal">
                      {step.index}
                    </span>
                    <span className="mt-4 block font-display text-xl font-medium tracking-tight md:text-2xl">
                      {step.title}
                    </span>
                    <span className="mt-3 block max-w-xs text-sm leading-relaxed text-p32-gray-300 md:text-base">
                      {step.statement}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="grid transition-[grid-template-rows] duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xs pb-8 text-sm leading-relaxed text-p32-gray-500 md:pb-10">
                        {step.expanded}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
