import { Nav } from "@/components/Nav";
import { P32LogoOnDark } from "@/components/Logo";
import { hero } from "@/lib/content";
import { NasaPhoto } from "@/components/media/NasaPhoto";
import { assetPath } from "@/lib/basePath";

// ---------------------------------------------------------------------------
// Hero: a cinematic opening film -- no scroll-linked motion, no GSAP, no
// custom client-side JavaScript at all. The shot sequence is pure CSS
// (@keyframes p32-hero-shot / p32-hero-rest in app/globals.css): it
// autoplays like a native browser animation the instant this HTML paints,
// and the sitewide prefers-reduced-motion rule already collapses every
// animation-duration to ~0 -- so reduced motion lands on the settled final
// frame automatically, no special-case code needed here.
//
// Two shots are now real <video> clips, not <video>-in-name-only: the user
// supplied two source video files directly (a real, unstaged street shot of
// a traffic light turning green, and a stock/motion-graphics render of a
// stylised city seen from above -- the latter is disclosed here as CGI, not
// a photograph, since everything else on this page has been real). Both
// were transcoded locally with macOS's built-in AVFoundation encoder
// (avconvert -- no ffmpeg in this environment) from multi-hundred-MB
// sources down to short 1280x720 clips actually used on the page; the huge
// originals are not committed to the repository, only referenced by path in
// ASSET_CREDITS.md. Video shots use plain autoplay+muted+loop+playsInline
// attributes -- no JS needed to start or drive them -- and a CSS rule (see
// app/globals.css) swaps each to its poster frame under reduced motion.
//
// Four more shots are user-supplied stock/cinematic still images (a lone
// figure in a crowded terminal, an overhead crosswalk, a stadium crowd, and
// a satellite render) for "scale of people from afar" -- added on top of,
// not replacing, the nine real NASA photographs already in the sequence.
// ---------------------------------------------------------------------------

type ImageShot = {
  kind: "image";
  src: string;
  objectPosition: string;
  contrast?: number;
  delay: number;
  hold: number;
};
type VideoShot = {
  kind: "video";
  src: string;
  poster: string;
  delay: number;
  hold: number;
};
type Shot = ImageShot | VideoShot;

const SHOTS: Shot[] = [
  { kind: "image", src: "/media/nasa/optimized/black-marble-earth-at-night.webp", objectPosition: "18% 28%", delay: 0, hold: 0.5 },
  { kind: "image", src: "/media/stock/optimized/crowd-terminal-silhouette.webp", objectPosition: "center", delay: 0.5, hold: 0.5 },
  { kind: "image", src: "/media/nasa/optimized/city-lights-lahore.webp", objectPosition: "center", contrast: 1.25, delay: 1.0, hold: 0.5 },
  { kind: "image", src: "/media/stock/optimized/crosswalk-crowd-overhead.webp", objectPosition: "center", delay: 1.5, hold: 0.5 },
  { kind: "image", src: "/media/nasa/optimized/topography-of-the-world.webp", objectPosition: "62% 70%", contrast: 1.35, delay: 2.0, hold: 0.5 },
  { kind: "video", src: "/media/video/optimized/city-traffic-light-green.mp4", poster: "/media/video/optimized/city-traffic-light-green-poster.webp", delay: 2.5, hold: 1.3 },
  { kind: "image", src: "/media/nasa/optimized/blue-marble-earth.webp", objectPosition: "48% 18%", delay: 3.8, hold: 0.5 },
  { kind: "image", src: "/media/stock/optimized/stadium-crowd-night.webp", objectPosition: "center", delay: 4.3, hold: 0.5 },
  { kind: "image", src: "/media/nasa/optimized/tin-bider-crater-algeria.webp", objectPosition: "55% 45%", contrast: 1.3, delay: 4.8, hold: 0.5 },
  { kind: "image", src: "/media/nasa/optimized/orbital-sunrise.webp", objectPosition: "center", delay: 5.3, hold: 0.5 },
  { kind: "image", src: "/media/stock/optimized/satellite-orbit.webp", objectPosition: "center", delay: 5.8, hold: 0.5 },
  { kind: "image", src: "/media/nasa/optimized/earths-limb-pacific.webp", objectPosition: "center 55%", delay: 6.3, hold: 0.5 },
  { kind: "image", src: "/media/nasa/optimized/city-lights-lucknow.webp", objectPosition: "center", contrast: 1.25, delay: 6.8, hold: 0.5 },
  { kind: "video", src: "/media/video/optimized/city-skyscrapers-top-view.mp4", poster: "/media/video/optimized/city-skyscrapers-top-view-poster.webp", delay: 7.3, hold: 1.4 },
  { kind: "image", src: "/media/nasa/optimized/atmospheric-glow-milkyway.webp", objectPosition: "center 40%", delay: 8.7, hold: 1.2 },
  { kind: "image", src: "/media/nasa/optimized/black-marble-earth-at-night.webp", objectPosition: "78% 62%", delay: 9.9, hold: 1.2 },
  { kind: "image", src: "/media/nasa/optimized/topography-of-the-world.webp", objectPosition: "30% 35%", contrast: 1.35, delay: 11.1, hold: 1.2 },
  { kind: "image", src: "/media/nasa/optimized/tin-bider-crater-algeria.webp", objectPosition: "42% 45%", contrast: 1.4, delay: 12.3, hold: 1.2 },
];

const REST_SHOT = {
  src: "/media/nasa/optimized/black-marble-earth-at-night.webp",
  objectPosition: "35% 40%",
};

const REST_DELAY = 13.3; // seconds -- after the last shot, settle here and stay.

function HeroVideoShot({ src, poster }: { src: string; poster: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={assetPath(poster)}
        data-hero-video
        className="h-full w-full object-cover"
        style={{ filter: "grayscale(1) contrast(1.15) brightness(0.85)" }}
      >
        <source src={assetPath(src)} type="video/mp4" />
      </video>
      {/* Reduced-motion fallback: a plain <img>, hidden by default, shown
          in place of the <video> by the CSS rule in app/globals.css. */}
      <img
        src={assetPath(poster)}
        alt=""
        data-hero-video-poster
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "grayscale(1) contrast(1.15) brightness(0.85)", display: "none" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)" }}
      />
    </div>
  );
}

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
          {shot.kind === "video" ? (
            <HeroVideoShot src={shot.src} poster={shot.poster} />
          ) : (
            <NasaPhoto
              src={shot.src}
              alt=""
              objectPosition={shot.objectPosition}
              contrast={shot.contrast}
              gradient="180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%"
            />
          )}
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
