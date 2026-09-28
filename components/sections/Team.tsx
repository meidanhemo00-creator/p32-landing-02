import Image from "next/image";
import { team } from "@/lib/content";
import { assetPath } from "@/lib/basePath";
import { splitWords } from "@/lib/splitWords";
import { Personnel } from "@/components/sections/Personnel";

// The client's own approved photograph -- real, unstaged, cinematic
// black-and-white. No people/weapons/insignia/effects are added. Alt text
// describes only what is visible, and no claim about the identity, unit, or
// employment of the people photographed is made anywhere on the page.
//
// The photograph is now a supporting introduction to the personnel register
// below it, not the section's subject: a controlled editorial frame (~85%
// of the content width, 240-330px tall on mobile, 380-480px on desktop)
// instead of a full-bleed viewport-height image. The source is 3:2 with the
// group's helmets at ~18% from the top; `center 28%` keeps every head and
// torso inside the wider frame and trims only legs and empty ground.
const [lineOne, lineTwo] = team.headline.split(/(?<=\.)\s+/);

export function Team() {
  return (
    <section id="team" className="relative bg-p32-black pt-14 pb-16 text-p32-white md:pt-20 md:pb-24">
      <div className="p32-container flex flex-col items-center text-center">
        <h2
          data-reveal="words"
          className="max-w-4xl text-balance font-display text-3xl font-medium uppercase leading-[1.12] tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="block">{splitWords(lineOne)}</span>
          <span className="mt-2 block text-p32-gray-300">
            {splitWords(lineTwo, lineOne.split(" ").filter(Boolean).length)}
          </span>
        </h2>
      </div>

      <div className="p32-container mt-8 md:mt-12">
        <div
          data-reveal="up"
          className="relative mx-auto h-[clamp(240px,72vw,330px)] w-full max-w-6xl overflow-hidden md:h-[clamp(380px,40vw,480px)] md:w-[86%]"
        >
          <Image
            src={assetPath("/media/team/optimized/team-desert-silhouettes.webp")}
            alt="Silhouetted figures in tactical gear walking across desert terrain at low sun"
            fill
            sizes="(min-width: 768px) 86vw, 100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 28%",
              filter: "grayscale(1) contrast(1.1) brightness(0.92)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.28) 100%)",
            }}
          />
        </div>
        <div
          data-reveal="up"
          className="mx-auto mt-6 max-w-2xl space-y-3 text-center text-pretty text-base leading-relaxed text-p32-gray-300 sm:text-lg md:mt-8"
        >
          <p>{team.bodyOne}</p>
          <p>{team.bodyTwo}</p>
        </div>
      </div>

      <Personnel />
    </section>
  );
}
