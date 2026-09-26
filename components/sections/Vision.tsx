import { vision } from "@/lib/content";
import { NasaPhoto } from "@/components/media/NasaPhoto";

// Bright white section, centered typography, no card. The large atmospheric
// image (a real orbital sunrise, not a procedural diagram) is the visual
// moment -- static, present from first paint, one restrained non-scroll
// entrance reveal only.
export function Vision() {
  return (
    <section className="p32-section relative bg-p32-white text-p32-black">
      <div className="p32-container relative flex flex-col items-center text-center">
        <h2 className="reveal-heading max-w-4xl text-balance font-display text-3xl font-medium uppercase leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          {vision.headline}
        </h2>
        <p className="reveal-body mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-p32-gray-700 md:mt-10 md:text-xl">
          {vision.body}
        </p>
      </div>
      <div className="relative mt-16 h-[50vh] w-full overflow-hidden md:mt-20 md:h-[65vh]">
        <NasaPhoto
          src="/media/nasa/optimized/orbital-sunrise.webp"
          alt="Orbital sunrise: the sun's first rays above Earth's limb, highlighting the thin blue atmosphere, seen from the International Space Station (NASA)"
          objectPosition="center 60%"
          gradient="180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 100%"
          contrast={1.1}
        />
      </div>
    </section>
  );
}
