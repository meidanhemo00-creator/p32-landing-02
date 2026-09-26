"use client";

import { useEffect, useRef } from "react";
import { Nav } from "@/components/Nav";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hero } from "@/lib/content";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";
import { EASE_OUT } from "@/lib/motion";
import { NasaPhoto } from "@/components/media/NasaPhoto";

// ---------------------------------------------------------------------------
// Hero: a fast cinematic montage, not a decoration loop.
//
// No video-generation, image-generation, or licensed-footage-acquisition
// capability exists in this environment (confirmed before writing this
// file), and no user-supplied footage was provided. So this montage is built
// entirely from the four real, credited NASA photographs already in the
// project (see ASSET_CREDITS.md) -- eight distinct crops/zooms of those four
// images, cut together like shots rather than shown as one static
// background. It does not fabricate shots of people, traffic, crowds, or
// hardware macro that no real or licensed source exists for.
//
// The sequence plays once on mount -- the page opens directly into this
// Hero -- and settles into a calm resting frame that the headline resolves
// over -- it does not loop indefinitely.
// ---------------------------------------------------------------------------

type Shot = {
  src: string;
  objectPosition: string;
  contrast?: number;
  hold: number; // seconds
};

const SHOTS: Shot[] = [
  { src: "/media/nasa/optimized/black-marble-earth-at-night.webp", objectPosition: "18% 28%", hold: 0.6 },
  { src: "/media/nasa/optimized/topography-of-the-world.webp", objectPosition: "62% 70%", contrast: 1.35, hold: 0.6 },
  { src: "/media/nasa/optimized/blue-marble-earth.webp", objectPosition: "48% 18%", hold: 0.6 },
  { src: "/media/nasa/optimized/tin-bider-crater-algeria.webp", objectPosition: "55% 45%", contrast: 1.3, hold: 0.6 },
  { src: "/media/nasa/optimized/black-marble-earth-at-night.webp", objectPosition: "78% 62%", hold: 0.6 },
  { src: "/media/nasa/optimized/blue-marble-earth.webp", objectPosition: "40% 72%", hold: 0.6 },
  { src: "/media/nasa/optimized/topography-of-the-world.webp", objectPosition: "30% 35%", contrast: 1.35, hold: 1.3 },
  { src: "/media/nasa/optimized/tin-bider-crater-algeria.webp", objectPosition: "42% 45%", contrast: 1.4, hold: 1.3 },
];

const REST_SHOT: Shot = {
  src: "/media/nasa/optimized/black-marble-earth-at-night.webp",
  objectPosition: "35% 40%",
  hold: 0,
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const restRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const iris = irisRef.current;
    const rest = restRef.current;
    const layers = layerRefs.current;
    if (!section || !iris || !rest) return;

    if (reducedMotion) {
      gsap.set(rest, { opacity: 1 });
      iris.style.clipPath = "circle(150% at 50% 50%)";
      return;
    }

    gsap.set(layers, { opacity: 0, scale: 1.08 });
    gsap.set(rest, { opacity: 0 });
    gsap.set(iris, { clipPath: "circle(6% at 50% 50%)" });

    ensureGsapRegistered();
    const tl = gsap.timeline();
    let t = 0.1;
    layers.forEach((layer, i) => {
      if (!layer) return;
      const shot = SHOTS[i];
      tl.to(layer, { opacity: 1, duration: 0.12, ease: "none" }, t);
      tl.to(layer, { scale: 1.14, duration: shot.hold, ease: "none" }, t);
      tl.to(layer, { opacity: 0, duration: 0.12, ease: "none" }, t + shot.hold - 0.1);
      t += shot.hold;
    });
    tl.to(rest, { opacity: 1, duration: 0.5, ease: EASE_OUT }, t - 0.1);
    tl.to(
      iris,
      { clipPath: "circle(75% at 50% 50%)", duration: 1.2, ease: EASE_OUT },
      t + 0.1
    );

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  // A light, non-pinned scroll-out: Hero no longer holds the viewport
  // hostage the way a pinned deconstruction/reconstruction sequence did --
  // it just quietly recedes as Vision arrives.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.to(section, {
        opacity: 0.55,
        scale: 0.98,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-p32-black text-p32-white"
    >
      <Nav />
      <div ref={restRef} className="absolute inset-0">
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
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          className="absolute inset-0"
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
      <div ref={irisRef} className="p32-container relative z-10 flex flex-col items-center py-24 text-center">
        <h1 className="max-w-4xl font-display text-[8.6vw] font-medium uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.75rem]">
          <span className="block">{hero.lineOne}</span>
          <span className="block text-p32-gray-300">{hero.lineTwo}</span>
        </h1>
      </div>
    </section>
  );
}
