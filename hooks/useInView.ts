"use client";

import { useEffect, useRef, useState } from "react";

// One-shot "has this entered the viewport" flag, used to trigger a single
// scroll-linked reveal (SVG line draws, etc). Intentionally not a
// scroll-progress tracker: no per-frame state, no window scroll listeners.
export function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
