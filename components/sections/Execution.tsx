import type { CSSProperties } from "react";
import { execution } from "@/lib/content";
import { NasaPhoto } from "@/components/media/NasaPhoto";
import { RedButtonAbstract } from "@/components/scenes/RedButtonAbstract";
import { splitWords } from "@/lib/splitWords";

// Full-width real imagery, no card, no complicated animation -- stable,
// confident, centered typography over a real atmospheric/orbital photograph.
export function Execution() {
  return (
    <section className="relative flex min-h-0 items-center justify-center overflow-hidden bg-p32-black py-20 text-p32-white md:min-h-[100dvh] md:py-24">
      <NasaPhoto
        src="/media/nasa/optimized/atmospheric-glow-milkyway.webp"
        alt="Atmospheric glow above Earth's limb with the Milky Way's stars, seen from the International Space Station (NASA)"
        objectPosition="center 40%"
        gradient="180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.75) 100%"
        reveal
      />
      <div aria-hidden="true" className="absolute inset-0 opacity-50">
        <RedButtonAbstract armed />
      </div>
      <div className="p32-container relative flex flex-col items-center text-center">
        <div aria-hidden="true" className="mb-8 h-px w-24 bg-p32-signal-deep md:mb-14" />
        <h2
          data-reveal="scale"
          className="text-balance font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {splitWords(execution.lineOne)}
        </h2>
        <p
          data-reveal="scale"
          style={{ "--reveal-index": 1 } as CSSProperties}
          className="mx-auto mt-5 max-w-2xl text-balance font-display text-2xl font-medium leading-snug tracking-tight text-p32-gray-300 sm:text-3xl md:mt-8 md:text-4xl"
        >
          {splitWords(execution.lineTwo, execution.lineOne.split(" ").filter(Boolean).length)}
        </p>
      </div>
    </section>
  );
}
