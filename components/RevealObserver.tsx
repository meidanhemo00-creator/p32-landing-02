"use client";

import { useEffect } from "react";

// Mounted once (app/page.tsx). Finds every [data-reveal] element in the
// document and flips it to `.in-view` the first time it crosses into the
// viewport, then stops watching it -- a one-time scroll-triggered entrance,
// not scroll-scrubbed or pinned motion. Renders nothing; only ever runs when
// `html.js-reveal` is present (see the bootstrap script in app/layout.tsx),
// which is itself skipped under prefers-reduced-motion, so this effect
// simply has nothing to do in that case.
export function RevealObserver() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("js-reveal")) return;

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
