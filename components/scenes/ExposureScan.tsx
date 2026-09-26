"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

// Abstract and procedural, deliberately: standing in for "the security risk
// of exposure" as a controlled scan line sweeping a dark panel, not a
// literal photograph (none exists for this concept). The sweep animates
// `top` on one small, self-contained, absolutely-positioned element -- a
// deliberate, scoped exception to the transform/opacity-only rule, made
// because it is a tiny, isolated element on an ambient (non-scroll-linked)
// loop, not a scroll-driven animation of costly scope.
export function ExposureScan() {
  const reducedMotion = useReducedMotion();
  return (
    <div aria-hidden="true" className="tx-topo absolute inset-0 overflow-hidden bg-p32-near-black">
      <div
        className="absolute inset-x-0"
        style={{
          height: "2px",
          background: "var(--p32-signal-deep)",
          boxShadow: "0 0 40px 18px rgba(157,210,226,0.16), 0 0 8px rgba(157,210,226,0.6)",
          animation: reducedMotion ? undefined : "p32-exposure-scan 4.5s ease-in-out infinite",
          top: reducedMotion ? "50%" : "6%",
        }}
      />
    </div>
  );
}
