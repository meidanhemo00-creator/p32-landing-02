import { team } from "@/lib/content";
import { NasaPhoto } from "@/components/media/NasaPhoto";

// One powerful static image, not a complicated animation. No photograph of
// "silhouettes, hands, screens, hardware, technical work" exists in this
// environment and none can be generated or licensed here (confirmed before
// writing this file) -- so, consistent with the rest of the page, this
// reuses the real, credited Black Marble photograph: many quietly lit
// places standing in for the people behind them, not staged portraiture.
// Already grayscale via NasaPhoto's treatment, per the brief's "light or
// grayscale image-led section."
const [lineOne, lineTwo] = team.headline.split(/(?<=\.)\s+/);

export function Team() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-p32-black text-p32-white">
      <div className="absolute inset-0">
        <NasaPhoto
          src="/media/nasa/optimized/black-marble-earth-at-night.webp"
          alt="Satellite composite of Earth's city lights at night, scattered across the globe (NASA Black Marble)"
          objectPosition="30% 35%"
          gradient="180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.82) 100%"
        />
      </div>
      <div className="p32-container relative flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-balance font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
          <span className="block">{lineOne}</span>
          <span className="mt-2 block text-p32-gray-300">{lineTwo}</span>
        </h2>
        <div className="mx-auto mt-8 max-w-xl space-y-5 text-pretty text-lg leading-relaxed text-p32-gray-300 md:mt-10 md:text-xl">
          <p>{team.bodyOne}</p>
          <p>{team.bodyTwo}</p>
        </div>
      </div>
    </section>
  );
}
