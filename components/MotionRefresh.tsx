"use client";

import { useEffect } from "react";
import { ensureGsapRegistered, ScrollTrigger } from "@/lib/gsapSetup";

// Mounted last in the page so its effect runs after every section's own
// ScrollTrigger has been created. Stacking several pinned triggers (Hero,
// Gap, Playbook) means each one adds pin-spacing that can shift the
// positions earlier triggers already measured -- one refresh here, once
// everything exists, keeps all of them accurate.
export function MotionRefresh() {
  useEffect(() => {
    ensureGsapRegistered();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    // Font swap can reflow text after the first layout pass; refresh again
    // once webfonts have actually loaded so pin distances stay accurate.
    if ("fonts" in document) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    return () => cancelAnimationFrame(id);
  }, []);

  return null;
}
