import type { CSSProperties } from "react";
import Link from "next/link";
import { cyberTeaser } from "@/lib/content";
import { NasaPhoto } from "@/components/media/NasaPhoto";
import { splitWords } from "@/lib/splitWords";

// Homepage bridge into the Cyber Intelligence & Exposure page, placed just
// before Team: a full-width cinematic beat, not a promo card. The image is
// its own close crop of NASA's Black Marble over Europe, the Mediterranean
// and the Middle East (see ASSET_CREDITS.md) -- deliberately a different
// composition from both the homepage Hero's global Earth-at-night framing
// and the Cyber page's satellite hero. Top and bottom fade to true black so
// it joins Execution above and Team below without a hard seam.
//
// Motion is the site's existing one-time reveal system only: the image
// settles from a slight scale, the headline words stagger in, the copy and
// CTA follow. Reduced motion shows everything immediately.
export function CyberTeaser() {
  return (
    <section
      id="cyber-capability"
      aria-labelledby="cyber-teaser-title"
      className="relative flex min-h-[520px] items-center overflow-hidden bg-p32-black py-20 text-p32-white sm:min-h-[560px] md:min-h-[78vh] md:py-28"
    >
      <NasaPhoto
        src="/media/nasa/optimized/black-marble-europe-mideast.webp"
        alt="City lights across Europe, the Mediterranean and the Middle East at night, from NASA's Black Marble satellite composite"
        objectPosition="47% 55%"
        contrast={1.3}
        gradient="180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.15) 24%, rgba(0,0,0,0.2) 62%, rgba(0,0,0,0.92) 100%"
        reveal
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 38%, rgba(0,0,0,0) 60%)" }}
      />

      <div className="p32-container relative flex flex-col items-center text-center">
        <div data-reveal="up" className="flex flex-col items-center">
          <span aria-hidden="true" className="h-px w-12 bg-p32-signal-deep" />
          <p className="label-glow mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-p32-signal sm:text-sm sm:tracking-[0.24em]">
            {cyberTeaser.label}
          </p>
        </div>
        <h2
          id="cyber-teaser-title"
          data-reveal="words"
          className="mt-5 max-w-5xl text-balance font-mono text-[7.4vw] font-medium uppercase leading-[1.12] tracking-tight sm:text-4xl md:mt-7 md:text-5xl lg:text-6xl"
        >
          {splitWords(cyberTeaser.headline)}
        </h2>
        <p
          data-reveal="up"
          style={{ "--reveal-index": 3 } as CSSProperties}
          className="mt-6 max-w-[34rem] text-pretty text-base leading-relaxed text-p32-gray-300 sm:text-lg md:mt-8 md:text-xl"
        >
          {cyberTeaser.body}
        </p>
        <div data-reveal="up" style={{ "--reveal-index": 5 } as CSSProperties} className="mt-9 md:mt-12">
          <Link href="/cyber-intelligence" className="cyber-cta p32-press">
            <span>{cyberTeaser.cta}</span>
            <span aria-hidden="true" className="cyber-cta-rule" />
          </Link>
        </div>
      </div>
    </section>
  );
}
