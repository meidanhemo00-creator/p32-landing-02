"use client";

import { useEffect, useRef } from "react";
import { Nav } from "@/components/Nav";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hero } from "@/lib/content";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsapSetup";

// ---------------------------------------------------------------------------
// A single Canvas 2D scene: an oblique satellite/terrain view with a
// fragmented sensor-node network that resolves into one connected structure
// as the user scrolls. No photography is used — no image-generation
// capability was available in this environment, so every visual here is
// procedural (Canvas + math), not a placeholder photograph.
// ---------------------------------------------------------------------------

type Node = { fx: number; fy: number; sx: number; sy: number; depth: number; r: number };

const NODE_COUNT = 9;
const HUB = { fx: 0.63, fy: 0.4 };

function fbm(x: number, seed: number) {
  return (
    Math.sin(x * 1.3 + seed * 1.7) * 0.5 +
    Math.sin(x * 2.7 + seed * 3.1) * 0.28 +
    Math.sin(x * 5.1 + seed * 0.6) * 0.14
  );
}

function buildNodes(): Node[] {
  const nodes: Node[] = [{ fx: HUB.fx, fy: HUB.fy, sx: HUB.fx - 0.22, sy: HUB.fy - 0.16, depth: 1, r: 5.5 }];
  const spokes = NODE_COUNT - 1;
  for (let i = 0; i < spokes; i++) {
    const angle = (i / spokes) * Math.PI * 2 + 0.35;
    const radius = 0.15 + (i % 3) * 0.05;
    const fx = HUB.fx + Math.cos(angle) * radius * 1.5;
    const fy = HUB.fy + Math.sin(angle) * radius * 0.95;
    nodes.push({
      fx,
      fy,
      sx: fx + fbm(i, 2.1) * 0.3,
      sy: fy + fbm(i, 5.4) * 0.24 - 0.08,
      depth: 0.35 + (i % 4) * 0.16,
      r: 2 + (i % 3) * 0.8,
    });
  }
  return nodes;
}

const NODES = buildNodes();
const EDGES: [number, number, number][] = [];
for (let i = 1; i < NODES.length; i++) EDGES.push([0, i, 0.42 + i * 0.03]);
for (let i = 1; i < NODES.length - 1; i++) EDGES.push([i, i + 1, 0.62 + i * 0.02]);

function drawScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  progress: number,
  px: number,
  py: number,
  time: number
) {
  ctx.clearRect(0, 0, w, h);

  // Deep field: a handful of fixed, near-static points (orbital context,
  // not decorative drifting particles).
  ctx.save();
  ctx.translate(px * 3, py * 2);
  for (let i = 0; i < 40; i++) {
    const sx = ((i * 137.5) % w);
    const sy = ((i * 71.3 + 40) % (h * 0.55));
    const tw = 0.35 + 0.35 * Math.sin(time * 0.0006 + i);
    ctx.fillStyle = `rgba(255,255,255,${0.05 + tw * 0.06})`;
    ctx.fillRect(sx, sy, 1, 1);
  }
  ctx.restore();

  // Terrain: oblique contour bands, lower two-thirds. Amplitude settles as
  // progress approaches 1 (the ground resolves along with the network).
  const settle = 1 - progress * 0.82;
  const bands = 9;
  ctx.save();
  ctx.translate(px * 7, py * 5);
  for (let b = 0; b < bands; b++) {
    const t = b / (bands - 1);
    const y0 = h * (0.42 + t * 0.62);
    const amp = (10 + t * 46) * settle;
    ctx.beginPath();
    const samples = 48;
    for (let s = 0; s <= samples; s++) {
      const xt = s / samples;
      const x = xt * w;
      const y = y0 + fbm(xt * 3 + b * 0.6, b * 3.7) * amp;
      if (s === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    const alpha = 0.05 + t * 0.05;
    ctx.strokeStyle = `rgba(157,210,226,${alpha * (0.5 + progress * 0.5)})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();

  // Scan sweep: a single pass, once, early in the sequence.
  const scanStart = 0.05;
  const scanEnd = 0.32;
  if (progress > scanStart && progress < scanEnd) {
    const st = (progress - scanStart) / (scanEnd - scanStart);
    const sy = st * h;
    const grad = ctx.createLinearGradient(0, sy - 60, 0, sy + 60);
    grad.addColorStop(0, "rgba(157,210,226,0)");
    grad.addColorStop(0.5, "rgba(157,210,226,0.16)");
    grad.addColorStop(1, "rgba(157,210,226,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, sy - 60, w, 120);
  }

  // Edges: each connects once progress crosses its threshold, drawing from
  // the hub outward with its own short window (a scroll-driven stagger).
  ctx.save();
  ctx.translate(px * 12, py * 8);
  for (const [a, b, start] of EDGES) {
    const t = Math.min(Math.max((progress - start) / 0.16, 0), 1);
    if (t <= 0) continue;
    const na = NODES[a];
    const nb = NODES[b];
    const ax = lerp(na.sx, na.fx, progress) * w;
    const ay = lerp(na.sy, na.fy, progress) * h;
    const bx = lerp(nb.sx, nb.fx, progress) * w;
    const by = lerp(nb.sy, nb.fy, progress) * h;
    const ex = lerp(ax, bx, t);
    const ey = lerp(ay, by, t);
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = `rgba(157,210,226,${0.35 + progress * 0.35})`;
    ctx.lineWidth = 1.1;
    ctx.stroke();
  }
  ctx.restore();

  // Nodes: scattered -> resolved position, blur/size settle with depth.
  ctx.save();
  ctx.translate(px * 16, py * 10);
  for (const n of NODES) {
    const x = lerp(n.sx, n.fx, progress) * w;
    const y = lerp(n.sy, n.fy, progress) * h;
    const blur = (1 - progress) * 6 * (1 - n.depth * 0.5);
    ctx.beginPath();
    ctx.shadowColor = "rgba(157,210,226,0.9)";
    ctx.shadowBlur = blur;
    ctx.fillStyle = n === NODES[0]
      ? `rgba(157,210,226,${0.7 + progress * 0.3})`
      : `rgba(230,235,236,${0.55 + progress * 0.35})`;
    ctx.arc(x, y, n.r + n.depth, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineWrapRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!canvas || !section || !l1 || !l2) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      const rect = section!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        canvas!.style.opacity = "1";
      });
    });

    // Headline reveal is an independent load-time intro, not gated behind
    // scroll: the hero's statement must be legible without requiring the
    // user to scroll first. Scroll only drives the background scene below.
    if (reducedMotion) {
      l1.style.transform = "translateY(0%)";
      l2.style.transform = "translateY(0%)";
    } else {
      gsap.set([l1, l2], { yPercent: 115 });
      gsap
        .timeline({ delay: 0.3 })
        .to(l1, { yPercent: 0, duration: 0.9, ease: "power3.out" })
        .to(l2, { yPercent: 0, duration: 0.9, ease: "power3.out" }, "-=0.62");
    }

    if (reducedMotion) {
      drawScene(ctx, width, height, 1, 0, 0, 0);
      const onResize = () => {
        resize();
        drawScene(ctx, width, height, 1, 0, 0, 0);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    ensureGsapRegistered();

    const state = { progress: 0, px: 0, py: 0, tpx: 0, tpy: 0 };
    let rafId = 0;
    let visible = true;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(section);

    function frame(time: number) {
      state.px = lerp(state.px, state.tpx, 0.08);
      state.py = lerp(state.py, state.tpy, 0.08);
      if (visible && !document.hidden) {
        drawScene(ctx!, width, height, state.progress, state.px, state.py, time);
      }
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    const onPointerMove = (e: PointerEvent) => {
      const rect = section!.getBoundingClientRect();
      state.tpx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      state.tpy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        hoverFine: "(hover: hover) and (pointer: fine)",
      },
      (context) => {
        const { isDesktop, hoverFine } = context.conditions as {
          isDesktop: boolean;
          hoverFine: boolean;
        };

        if (hoverFine) {
          section!.addEventListener("pointermove", onPointerMove);
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
          // progress 0 at load (section top at viewport top), 1 once the
          // user has scrolled roughly one section-height past it.
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
      io.disconnect();
      ro.disconnect();
      section!.removeEventListener("pointermove", onPointerMove);
      mm.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-p32-black text-p32-white"
    >
      <Nav />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[900ms] ease-[var(--ease-out)]"
      />
      <div ref={headlineWrapRef} className="p32-container relative z-10 pb-16 pt-24 md:pb-24">
        <h1 className="max-w-4xl font-display text-[13vw] leading-[0.98] font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <span className="block overflow-hidden">
            <span ref={line1Ref} className="block will-change-transform">
              {hero.lineOne}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span ref={line2Ref} className="block text-p32-gray-300 will-change-transform">
              {hero.lineTwo}
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
