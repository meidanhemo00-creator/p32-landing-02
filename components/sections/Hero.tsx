import { Nav } from "@/components/Nav";
import { P32LogoOnDark } from "@/components/Logo";
import { hero } from "@/lib/content";
import { NasaPhoto } from "@/components/media/NasaPhoto";

// ---------------------------------------------------------------------------
// Hero: a cinematic opening film -- no scroll-linked motion, no GSAP, no
// client-side JavaScript at all. The shot sequence is pure CSS
// (@keyframes p32-hero-shot / p32-hero-rest in app/globals.css): it
// autoplays like a native browser animation the instant this HTML paints,
// and the sitewide prefers-reduced-motion rule already collapses every
// animation-duration to ~0 -- so reduced motion lands on the settled final
// frame automatically, no special-case code needed here.
//
// No video-generation, image-generation, licensed-footage-acquisition, or
// video-encoding (no ffmpeg in this environment) capability exists here,
// and no user-supplied footage was provided for this sequence -- confirmed
// and disclosed before building this. So this is not a <video> element: it
// is a real cinematic-movement-over-imagery sequence (the brief's own
// sanctioned fallback), built entirely from seven real, credited NASA
// photographs (see ASSET_CREDITS.md) -- Black Marble, Blue Marble, SRTM
// topography, a Tin Bider crater crop, and three orbital/atmospheric ISS
// photographs (orbital sunrise, Earth's limb over the Pacific, atmospheric
// glow). It moves between orbital, atmospheric, and terrestrial scale, but
// does not include shots of people, traffic, crowds, dense cities, or
// technical personnel, because no real or licensed source for those exists
// here -- rather than fabricate them, they are simply not part of the
// sequence.
// ---------------------------------------------------------------------------

type Shot = {
  src: string;
  objectPosition: string;
  contrast?: number;
  delay: number; // seconds
  hold: number; // seconds
};

const SHOTS: Shot[] = [
  { src: "/media/nasa/optimized/black-marble-earth-at-night.webp", objectPosition: "18% 28%", delay: 0, hold: 0.6 },
  { src: "/media/nasa/optimized/topography-of-the-world.webp", objectPosition: "62% 70%", contrast: 1.35, delay: 0.55, hold: 0.6 },
  { src: "/media/nasa/optimized/blue-marble-earth.webp", objectPosition: "48% 18%", delay: 1.1, hold: 0.6 },
  { src: "/media/nasa/optimized/tin-bider-crater-algeria.webp", objectPosition: "55% 45%", contrast: 1.3, delay: 1.65, hold: 0.6 },
  { src: "/media/nasa/optimized/orbital-sunrise.webp", objectPosition: "center", delay: 2.2, hold: 0.6 },
  { src: "/media/nasa/optimized/earths-limb-pacific.webp", objectPosition: "center 55%", delay: 2.75, hold: 0.6 },
  { src: "/media/nasa/optimized/atmospheric-glow-milkyway.webp", objectPosition: "center 40%", delay: 3.3, hold: 0.6 },
  { src: "/media/nasa/optimized/black-marble-earth-at-night.webp", objectPosition: "78% 62%", delay: 3.85, hold: 0.6 },
  { src: "/media/nasa/optimized/topography-of-the-world.webp", objectPosition: "30% 35%", contrast: 1.35, delay: 4.4, hold: 1.4 },
  { src: "/media/nasa/optimized/tin-bider-crater-algeria.webp", objectPosition: "42% 45%", contrast: 1.4, delay: 5.8, hold: 1.4 },
];

const REST_SHOT = {
  src: "/media/nasa/optimized/black-marble-earth-at-night.webp",
  objectPosition: "35% 40%",
};

const REST_DELAY = 7.0; // seconds -- after the last shot, settle here and stay.

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-p32-black text-p32-white"
    >
      <Nav />
      <div
        className="absolute inset-0"
        style={{ animation: `p32-hero-rest 1s ease-out ${REST_DELAY}s 1 both` }}
      >
        <NasaPhoto
          src={REST_SHOT.src}
          alt="Satellite composite of Earth's city lights at night (NASA Black Marble)"
          objectPosition={REST_SHOT.objectPosition}
          priority
          gradient="165deg, rgba(0,0,0,0.25) 10%, rgba(2,6,8,0.72) 65%, rgba(0,0,0,0.85) 100%"
        />
      </div>
      {SHOTS.map((shot, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ animation: `p32-hero-shot ${shot.hold}s ease-out ${shot.delay}s 1 both` }}
        >
          <NasaPhoto
            src={shot.src}
            alt=""
            objectPosition={shot.objectPosition}
            contrast={shot.contrast}
            gradient="180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%"
          />
        </div>
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)" }}
      />
      <div className="p32-container relative z-10 flex flex-col items-center py-24 text-center">
        <P32LogoOnDark height={34} priority className="mb-8 md:mb-10" />
        <h1 className="max-w-4xl text-balance font-display text-[8.6vw] font-medium uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.75rem]">
          <span className="block">{hero.lineOne}</span>
          <span className="block text-p32-gray-300">{hero.lineTwo}</span>
        </h1>
      </div>
    </section>
  );
}
