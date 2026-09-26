"use client";

import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/Nav";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hero } from "@/lib/content";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { EASE_OUT } from "@/lib/motion";

// ---------------------------------------------------------------------------
// Hero concept: "Secure System Under Pressure."
//
// The visitor operates a scan over a live defense system, not a decoration.
// A satellite/terrain field carries a global infrastructure mesh. Some
// nodes are secure; some are compromised, and their threat paths stay
// almost invisible until the visitor's pointer (or, on touch, an automatic
// sweep) passes near them -- a real reveal, not a glow that follows the
// cursor. Scrolling compresses time: the system separates under pressure
// (deconstruction), then threats are neutralized and the architecture
// locks into one calm, secured structure (reconstruction).
//
// No image-generation capability exists in this environment (confirmed
// before writing this file), so the terrain/mesh/nodes are procedural
// Canvas 2D, not photography. See ASSETS.md.
// ---------------------------------------------------------------------------

type NodeSpec = { fx: number; fy: number; secure: boolean; seed: number };

// Hand-placed, not procedural: composition quality over algorithmic
// coverage. A quiet band around the centre keeps the headline legible.
const NODES: NodeSpec[] = [
  { fx: 0.12, fy: 0.18, secure: true, seed: 0.2 },
  { fx: 0.24, fy: 0.32, secure: true, seed: 0.7 },
  { fx: 0.09, fy: 0.52, secure: false, seed: 1.4 },
  { fx: 0.18, fy: 0.72, secure: true, seed: 2.1 },
  { fx: 0.33, fy: 0.83, secure: true, seed: 2.8 },
  { fx: 0.42, fy: 0.15, secure: true, seed: 3.4 },
  { fx: 0.46, fy: 0.9, secure: false, seed: 4.0 },
  { fx: 0.58, fy: 0.12, secure: false, seed: 4.6 },
  { fx: 0.67, fy: 0.28, secure: true, seed: 5.2 },
  { fx: 0.62, fy: 0.86, secure: true, seed: 5.8 },
  { fx: 0.78, fy: 0.2, secure: true, seed: 6.4 },
  { fx: 0.88, fy: 0.4, secure: false, seed: 7.0 },
  { fx: 0.91, fy: 0.62, secure: true, seed: 7.6 },
  { fx: 0.8, fy: 0.78, secure: true, seed: 8.2 },
  { fx: 0.7, fy: 0.55, secure: false, seed: 8.8 },
  { fx: 0.35, fy: 0.5, secure: true, seed: 9.4 },
];

// Secure links: a plausible mesh, hand-authored. Threat links point every
// insecure node at its nearest neighbour -- an "interrupted connection".
const SECURE_LINKS: [number, number][] = [
  [0, 1], [1, 5], [5, 8], [8, 10], [10, 12], [12, 13], [13, 9], [9, 4],
  [4, 3], [3, 0], [1, 15], [15, 9], [8, 15],
];
const THREAT_LINKS: [number, number][] = [
  [2, 1], [6, 4], [7, 5], [11, 10], [14, 13],
];

// Each layer separates along its own fixed vector during "deconstruction",
// scaled by a triangular tension value -- controlled depth, not random
// parallax.
const LAYER_VECTORS = {
  terrain: { x: 0, y: 22 },
  mesh: { x: -16, y: -10 },
  secure: { x: 4, y: -4 },
  threat: { x: 14, y: 10 },
};

function fbm(x: number, seed: number) {
  return (
    Math.sin(x * 1.3 + seed * 1.7) * 0.5 +
    Math.sin(x * 2.7 + seed * 3.1) * 0.28 +
    Math.sin(x * 5.1 + seed * 0.6) * 0.14
  );
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

// Rises 0->1 over [0.12,0.45], falls 1->0 over [0.45,0.85], 0 after --
// the system is under pressure mid-scroll and calm at both ends.
function tensionAt(progress: number) {
  if (progress < 0.12) return 0;
  if (progress < 0.45) return (progress - 0.12) / 0.33;
  if (progress < 0.85) return 1 - (progress - 0.45) / 0.4;
  return 0;
}

// A deliberately broken path: the midpoint is offset off-axis, and a gap
// straddles it, so a "threat" link reads as interrupted rather than merely
// dashed. closeGap 0 = fully interrupted, 1 = the gap fully closes (the
// visitor has traced the whole connection).
function drawInterruptedLine(
  ctx: CanvasRenderingContext2D,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  seed: number,
  closeGap: number
) {
  const mx = (ax + bx) / 2 + fbm(seed, 1) * 26;
  const my = (ay + by) / 2 + fbm(seed, 4) * 26;
  const gapHalf = lerp(0.16, 0, closeGap);
  const e1 = clamp01(1 - 2 * gapHalf);
  const s2 = clamp01(2 * gapHalf);

  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(lerp(ax, mx, e1), lerp(ay, my, e1));
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(lerp(mx, bx, s2), lerp(my, by, s2));
  ctx.lineTo(bx, by);
  ctx.stroke();
}

type DrawState = {
  progress: number;
  scanX: number;
  scanY: number;
  scanActive: boolean;
  // 0-1: engaging the scan is instant (snaps to 1 on pointer move), but
  // disengaging eases out over ~300ms instead of cutting the reveal dead --
  // the system's own response calms down, it doesn't glitch off.
  scanStrength: number;
  hoveredThreat: number;
};

function drawScene(ctx: CanvasRenderingContext2D, w: number, h: number, s: DrawState) {
  ctx.clearRect(0, 0, w, h);
  const tension = tensionAt(s.progress);
  const secured = clamp01((s.progress - 0.6) / 0.35); // 0 -> 1 across reconstruction
  const threatOpacity = Math.max(0, (1 - secured) * (0.35 + tension * 0.65));

  // --- Terrain: an oblique, grained field standing in for satellite/
  // terrain imagery (no image-generation capability is available; see
  // ASSETS.md). Grain is drawn once per frame at low cost (sparse dots).
  ctx.save();
  ctx.translate(LAYER_VECTORS.terrain.x * tension, LAYER_VECTORS.terrain.y * tension);
  const bands = 10;
  for (let b = 0; b < bands; b++) {
    const t = b / (bands - 1);
    const y0 = h * (0.08 + t * 0.92);
    const amp = 10 + t * 30;
    ctx.beginPath();
    const samples = 40;
    for (let i = 0; i <= samples; i++) {
      const xt = i / samples;
      const x = xt * w;
      const y = y0 + fbm(xt * 2.6 + b * 0.5, b * 2.3) * amp;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(255,255,255,${0.025 + t * 0.02})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  for (let i = 0; i < 90; i++) {
    const gx = (i * 197.3) % w;
    const gy = (i * 131.7 + 60) % h;
    ctx.fillStyle = `rgba(255,255,255,${0.03 + 0.04 * Math.abs(fbm(i, 9))})`;
    ctx.fillRect(gx, gy, 1, 1);
  }
  ctx.restore();

  // --- Global infrastructure mesh: faint great-circle arcs, brightening
  // slightly as the system secures.
  ctx.save();
  ctx.translate(LAYER_VECTORS.mesh.x * tension, LAYER_VECTORS.mesh.y * tension);
  const meshAlpha = 0.05 + secured * 0.05;
  ctx.strokeStyle = `rgba(157,210,226,${meshAlpha})`;
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const ry = h * (0.15 + i * 0.18);
    ctx.beginPath();
    ctx.ellipse(w * 0.5, ry, w * 0.62, h * 0.14, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  const nodePx = NODES.map((n) => ({
    ...n,
    x: n.fx * w,
    y: n.fy * h,
  }));

  // --- Secure links: the stable structure. Barely moves under tension.
  ctx.save();
  ctx.translate(LAYER_VECTORS.secure.x * tension, LAYER_VECTORS.secure.y * tension);
  ctx.strokeStyle = `rgba(157,210,226,${0.28 + secured * 0.32})`;
  ctx.lineWidth = 1.1 + secured * 0.3;
  for (const [a, b] of SECURE_LINKS) {
    const na = nodePx[a];
    const nb = nodePx[b];
    ctx.beginPath();
    ctx.moveTo(na.x, na.y);
    ctx.lineTo(nb.x, nb.y);
    ctx.stroke();
  }
  ctx.restore();

  // --- Threat links: interrupted, revealed only near the scan, fading out
  // entirely once the system is reconstructed.
  if (threatOpacity > 0.002) {
    ctx.save();
    ctx.translate(LAYER_VECTORS.threat.x * tension, LAYER_VECTORS.threat.y * tension);
    THREAT_LINKS.forEach(([a, b], i) => {
      const na = nodePx[a];
      const nb = nodePx[b];
      const mx = (na.x + nb.x) / 2;
      const my = (na.y + nb.y) / 2;
      const dist = s.scanActive ? Math.hypot(s.scanX - mx, s.scanY - my) : Infinity;
      const reveal = s.scanActive ? clamp01(1 - (dist - 90) / 130) * s.scanStrength : 0;
      const isHovered = s.hoveredThreat === i;
      // The scan strongly amplifies a direct hit, but stays multiplied by
      // threatOpacity: once the system is reconstructed (threatOpacity 0)
      // there is nothing left to reveal, scanned or not.
      const alpha = clamp01(threatOpacity * (0.12 + reveal * 3 + (isHovered ? 0.6 : 0)));
      if (alpha < 0.01) return;
      ctx.strokeStyle = `rgba(235,238,238,${alpha})`;
      ctx.lineWidth = 1.2 + (isHovered ? 0.6 : 0);
      drawInterruptedLine(ctx, na.x, na.y, nb.x, nb.y, na.seed, isHovered ? 1 : reveal);
    });
    ctx.restore();
  }

  // --- Nodes: secure nodes are always visible (the known-good structure).
  // Anomalous nodes stay near-invisible until the scan (or the mobile
  // sweep) passes near them -- a genuine reveal, not a decorative glow.
  for (const n of nodePx) {
    const vec = n.secure ? LAYER_VECTORS.secure : LAYER_VECTORS.threat;
    const x = n.x + vec.x * tension;
    const y = n.y + vec.y * tension;

    if (n.secure) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(230,235,236,${0.55 + secured * 0.3})`;
      ctx.arc(x, y, 2.6, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const dist = s.scanActive ? Math.hypot(s.scanX - x, s.scanY - y) : Infinity;
      const reveal = s.scanActive ? clamp01(1 - (dist - 70) / 120) * s.scanStrength : 0;
      const alpha = clamp01(threatOpacity * (0.1 + reveal * 3));
      if (alpha < 0.01) continue;
      const size = 4 + reveal * 3;
      ctx.save();
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 1.4;
      ctx.strokeRect(x - size / 2, y - size / 2, size, size);
      if (reveal > 0.4) {
        ctx.fillStyle = `rgba(157,210,226,${(reveal - 0.4) * 0.9})`;
        ctx.fillRect(x - 1, y - 1, 2, 2);
      }
      ctx.restore();
    }
  }

}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [uses, setUses] = useState<"pointer" | "sweep">("sweep");

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const iris = irisRef.current;
    if (!canvas || !section || !iris) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    function resize() {
      const rect = section!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    requestAnimationFrame(() => requestAnimationFrame(() => (canvas!.style.opacity = "1")));

    // One deliberate aperture reveal for the headline, decoupled from
    // scroll: the statement must be legible without requiring a scroll.
    if (reducedMotion) {
      iris.style.clipPath = "circle(150% at 50% 50%)";
    } else {
      // Starts at a small but non-zero aperture -- an iris opens from
      // "nearly closed," not from a literal zero-size point (nothing
      // appears from nothing).
      gsap.set(iris, { clipPath: "circle(6% at 50% 50%)" });
      gsap.to(iris, {
        clipPath: "circle(75% at 50% 50%)",
        duration: 1.3,
        delay: 0.25,
        ease: EASE_OUT,
      });
    }

    if (reducedMotion) {
      drawScene(ctx, width, height, {
        progress: 1,
        scanX: 0,
        scanY: 0,
        scanActive: false,
        scanStrength: 0,
        hoveredThreat: -1,
      });
      const onResize = () => {
        resize();
        drawScene(ctx, width, height, {
          progress: 1,
          scanX: 0,
          scanY: 0,
          scanActive: false,
          scanStrength: 0,
          hoveredThreat: -1,
        });
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    ensureGsapRegistered();

    const state: DrawState = {
      progress: 0,
      scanX: 0,
      scanY: 0,
      scanActive: false,
      scanStrength: 0,
      hoveredThreat: -1,
    };
    let rafId = 0;
    let visible = true;
    let sweeping = false;
    let sweepStart: number | null = null;
    // A "controlled" scan sequence has an end, not an indefinite loop: on
    // touch, the automatic sweep runs a bounded number of passes and then
    // settles, rather than animating forever for as long as the Hero is
    // in view.
    const SWEEP_CYCLE_MS = 9000;
    const SWEEP_MAX_CYCLES = 3;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(section);

    function nearestThreatIndex(x: number, y: number) {
      let best = -1;
      let bestDist = 60;
      THREAT_LINKS.forEach(([a, b], i) => {
        const na = NODES[a];
        const nb = NODES[b];
        const nx = ((na.fx + nb.fx) / 2) * width;
        const ny = ((na.fy + nb.fy) / 2) * height;
        const d = Math.hypot(x - nx, y - ny);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      return best;
    }

    function disengageScan() {
      // Eases out instead of cutting the reveal dead: the system's own
      // response calms down, it doesn't glitch off.
      gsap.killTweensOf(state);
      gsap.to(state, {
        scanStrength: 0,
        duration: 0.3,
        ease: EASE_OUT,
        onComplete: () => {
          state.scanActive = false;
          state.hoveredThreat = -1;
        },
      });
    }

    // Redraw only when something actually changed since the last frame --
    // a continuous 60fps redraw of the whole scene while the pointer is
    // still and the page isn't scrolling is exactly the "excessive GPU
    // usage" a defense-technology Hero shouldn't cost.
    let lastSignature = "";
    function frame(time: number) {
      if (sweeping) {
        if (sweepStart === null) sweepStart = time;
        const elapsed = time - sweepStart;
        if (elapsed > SWEEP_CYCLE_MS * SWEEP_MAX_CYCLES) {
          sweeping = false;
          disengageScan();
        } else {
          const t = (time % SWEEP_CYCLE_MS) / SWEEP_CYCLE_MS;
          state.scanX = width * (0.15 + 0.7 * (0.5 + 0.5 * Math.sin(t * Math.PI * 2)));
          state.scanY = height * (0.2 + 0.6 * (0.5 + 0.5 * Math.sin(t * Math.PI * 2 * 1.7 + 1)));
          state.scanActive = true;
          state.scanStrength = 1;
          state.hoveredThreat = nearestThreatIndex(state.scanX, state.scanY);
        }
      }
      const signature = `${state.progress.toFixed(4)}|${Math.round(state.scanX)}|${Math.round(
        state.scanY
      )}|${state.scanActive}|${state.scanStrength.toFixed(3)}|${state.hoveredThreat}`;
      if (visible && !document.hidden && signature !== lastSignature) {
        drawScene(ctx!, width, height, state);
        lastSignature = signature;
      }
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    const onPointerMove = (e: PointerEvent) => {
      const rect = section!.getBoundingClientRect();
      state.scanX = e.clientX - rect.left;
      state.scanY = e.clientY - rect.top;
      state.scanActive = true;
      // Engaging is instant -- only disengaging eases.
      gsap.killTweensOf(state);
      state.scanStrength = 1;
      state.hoveredThreat = nearestThreatIndex(state.scanX, state.scanY);
    };
    const onPointerLeave = () => {
      disengageScan();
    };

    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: "(min-width: 768px)", hoverFine: "(hover: hover) and (pointer: fine)" },
      (context) => {
        const { isDesktop, hoverFine } = context.conditions as {
          isDesktop: boolean;
          hoverFine: boolean;
        };

        if (hoverFine) {
          setUses("pointer");
          section!.addEventListener("pointermove", onPointerMove);
          section!.addEventListener("pointerleave", onPointerLeave);
        } else {
          setUses("sweep");
          sweeping = true;
        }

        if (isDesktop) {
          const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.3}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              state.progress = self.progress;
            },
          });
          return () => st.kill();
        } else {
          const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              state.progress = self.progress;
            },
          });
          return () => st.kill();
        }
      }
    );

    const ro = new ResizeObserver(() => {
      resize();
      ScrollTrigger.refresh();
    });
    ro.observe(section);

    return () => {
      cancelAnimationFrame(rafId);
      gsap.killTweensOf(state);
      io.disconnect();
      ro.disconnect();
      section!.removeEventListener("pointermove", onPointerMove);
      section!.removeEventListener("pointerleave", onPointerLeave);
      mm.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-p32-black text-p32-white"
    >
      <Nav />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[900ms] ease-[var(--ease-out)]"
      />
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
      <span className="sr-only">
        {uses === "pointer"
          ? "Move your pointer over the scene to reveal system activity."
          : ""}
      </span>
    </section>
  );
}
