import { execution } from "@/lib/content";
import { RedButtonAbstract } from "@/components/scenes/RedButtonAbstract";

// Static: no scroll-triggered word-by-word "lock" animation. Stable,
// confident, centered typography over a full-screen abstract visual.
export function Execution() {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-p32-black py-24 text-p32-white">
      <div aria-hidden="true" className="opacity-70">
        <RedButtonAbstract armed />
      </div>
      <div className="p32-container relative flex flex-col items-center text-center">
        <div aria-hidden="true" className="mb-10 h-px w-24 bg-p32-signal-deep md:mb-14" />
        <h2 className="text-balance font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {execution.lineOne}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-balance font-display text-2xl font-medium leading-snug tracking-tight text-p32-gray-400 sm:text-3xl md:mt-8 md:text-4xl">
          {execution.lineTwo}
        </p>
      </div>
    </section>
  );
}
