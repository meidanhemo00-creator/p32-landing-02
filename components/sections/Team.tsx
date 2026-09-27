import Image from "next/image";
import { team } from "@/lib/content";
import { assetPath } from "@/lib/basePath";
import { splitWords } from "@/lib/splitWords";

// The client's own approved photograph -- real, unstaged, cinematic
// black-and-white. No people/weapons/insignia/effects are added; composition
// is preserved as supplied. Alt text describes only what is visible, and no
// claim about the identity, unit, or employment of the people photographed
// is made anywhere on the page.
//
// This is the one section built entirely around a single photograph: full
// viewport width, a landscape crop close to the source's own ~3:2 ratio on
// mobile (effectively no crop at all) opening to a wider 16:9 on larger
// screens, cropped only into the empty sky above the group -- never into the
// people themselves, whose heads-to-feet all sit safely inside both crops.
// Text sits above and below the frame, never on top of it.
const [lineOne, lineTwo] = team.headline.split(/(?<=\.)\s+/);

export function Team() {
  return (
    <section className="relative bg-p32-black py-14 text-p32-white md:py-20">
      <div className="p32-container flex flex-col items-center text-center">
        <h2
          data-reveal="words"
          className="max-w-4xl text-balance font-display text-3xl font-medium uppercase leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="block">{splitWords(lineOne)}</span>
          <span className="mt-2 block text-p32-gray-300">
            {splitWords(lineTwo, lineOne.split(" ").filter(Boolean).length)}
          </span>
        </h2>
      </div>

      <div
        data-reveal="image"
        className="relative mt-8 aspect-[3/2] w-full overflow-hidden md:mt-12 md:aspect-[16/9]"
      >
        <Image
          src={assetPath("/media/team/optimized/team-desert-silhouettes.webp")}
          alt="Silhouetted figures in tactical gear walking across desert terrain at low sun"
          fill
          sizes="100vw"
          priority={false}
          style={{
            objectFit: "cover",
            objectPosition: "center 80%",
            filter: "grayscale(1) contrast(1.1) brightness(0.92)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 82%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>

      <div className="p32-container relative mt-8 flex flex-col items-center text-center md:mt-12">
        <div
          data-reveal="up"
          className="mx-auto max-w-xl space-y-4 text-pretty text-base leading-relaxed text-p32-gray-300 sm:text-lg md:text-xl"
        >
          <p>{team.bodyOne}</p>
          <p>{team.bodyTwo}</p>
        </div>
      </div>
    </section>
  );
}
