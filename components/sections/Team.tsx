import Image from "next/image";
import { team } from "@/lib/content";

// The client's own approved photograph, full-bleed, cinematic black-and-
// white -- not the earlier NASA stand-in. No people/weapons/insignia/effects
// are added; composition is preserved as supplied. Alt text describes only
// what is visible, and no claim about the identity, unit, or employment of
// the people photographed is made anywhere on the page.
const [lineOne, lineTwo] = team.headline.split(/(?<=\.)\s+/);

export function Team() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-p32-black text-p32-white">
      <div className="absolute inset-0">
        <Image
          src="/media/team/optimized/team-desert-silhouettes.webp"
          alt="Silhouetted figures in tactical gear walking across desert terrain at low sun"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 42%", filter: "grayscale(1) contrast(1.1) brightness(0.85)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.85) 100%)" }}
        />
      </div>
      <div className="p32-container relative flex flex-col items-center text-center">
        <h2 className="reveal-heading max-w-2xl text-balance font-display text-3xl font-medium uppercase leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
          <span className="block">{lineOne}</span>
          <span className="mt-2 block text-p32-gray-300">{lineTwo}</span>
        </h2>
        <div className="reveal-body mx-auto mt-8 max-w-xl space-y-5 text-pretty text-lg leading-relaxed text-p32-gray-300 md:mt-10 md:text-xl">
          <p>{team.bodyOne}</p>
          <p>{team.bodyTwo}</p>
        </div>
      </div>
    </section>
  );
}
