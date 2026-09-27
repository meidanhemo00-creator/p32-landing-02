"use client";

import { useEffect } from "react";

// Mounted once (app/page.tsx). Finds every [data-reveal] element in the
// document and flips it to revealed the first time it crosses into the
// viewport, then stops watching it -- a one-time scroll-triggered entrance,
// not scroll-scrubbed or pinned motion. Renders nothing; only ever runs when
// `html.js-reveal` is present (see the bootstrap script in app/layout.tsx),
// which is itself skipped under prefers-reduced-motion, so this effect
// simply has nothing to do in that case.
//
// Revealed state is a plain `data-in-view` ATTRIBUTE, deliberately not a
// `class`. React fully owns the `class` attribute on any element that has a
// `className` prop (which every interactive element here does, since their
// classes also depend on active/hover state) -- on every re-render where
// that computed string changes, React overwrites the whole `class`
// attribute wholesale, silently deleting a class added from outside React,
// like this observer would. A `data-*` attribute React never references in
// JSX is never touched by its reconciler, so it survives every re-render.
// (Caught live: clicking a Gap/Playbook selector re-renders every sibling
// button, and any whose isActive-driven className string changed lost a
// `.in-view` class the instant it was clicked elsewhere on the page --
// exactly the "text goes missing after interaction" bug class.)
//
// IntersectionObserver is the primary trigger, but it is not trusted as the
// ONLY path to visibility -- essential content must never depend on an
// animation system succeeding. Three extra layers guarantee that:
//   1. An immediate manual sweep right after `observe()`, covering the case
//      where the page loads (or a browser restores scroll position) already
//      mid-document, before the very first intersection callback lands.
//   2. Re-sweeps on `pageshow` (bfcache restores, which do not always re-run
//      effects or re-fire intersections), `visibilitychange` (returning to
//      a backgrounded tab), and `resize`/`orientationchange` (layout shifts
//      that can move an element into view without a scroll event).
//   3. A single hard timeout that force-reveals anything still hidden after
//      4s, no matter what -- the absolute floor against a silently broken
//      observer (a known class of mobile Safari flakiness) leaving content
//      permanently invisible.
export function RevealObserver() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("js-reveal")) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    const reveal = (el: HTMLElement) => el.setAttribute("data-in-view", "true");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => io.observe(el));

    // Manual fallback sweep: reveals anything already inside (or close
    // below) the viewport that IntersectionObserver hasn't reported yet.
    const manualSweep = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (const el of targets) {
        if (el.hasAttribute("data-in-view")) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.9 && rect.bottom > 0) {
          reveal(el);
          io.unobserve(el);
        }
      }
    };

    // Covers page loads/restores that land mid-document before the first
    // IntersectionObserver callback fires.
    manualSweep();
    const raf = requestAnimationFrame(manualSweep);

    window.addEventListener("pageshow", manualSweep);
    window.addEventListener("visibilitychange", manualSweep);
    window.addEventListener("resize", manualSweep);
    window.addEventListener("orientationchange", manualSweep);

    const hardFallback = window.setTimeout(() => {
      targets.forEach((el) => {
        if (!el.hasAttribute("data-in-view")) reveal(el);
      });
    }, 4000);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(hardFallback);
      window.removeEventListener("pageshow", manualSweep);
      window.removeEventListener("visibilitychange", manualSweep);
      window.removeEventListener("resize", manualSweep);
      window.removeEventListener("orientationchange", manualSweep);
    };
  }, []);

  return null;
}
