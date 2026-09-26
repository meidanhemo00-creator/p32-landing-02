"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";
import { EASE_OUT } from "@/lib/motion";
import { P32LogoOnDark } from "@/components/Logo";

// ---------------------------------------------------------------------------
// Cinematic discovery entrance -- NOT authentication. This is a one-time
// (per browser session) interactive moment before the site: a field of
// drifting system vocabulary hides the word PROJECT32; a pointer (or, on
// touch, direct tap) acts as a scanner that sharpens nearby words, and
// selecting PROJECT32 resolves it into the real P32 logo before the Hero
// montage begins. No server-side access-code gate exists or is implied here
// -- that is a separate, future requirement pending a spec from Amit.
// ---------------------------------------------------------------------------

const VOCAB = [
  "SYSTEMS",
  "ARCHITECTURE",
  "INTEGRATION",
  "MISSION",
  "SIGNAL",
  "THREAT",
  "TERRAIN",
  "INTELLIGENCE",
  "SENSOR",
  "EXECUTION",
  "PROTOCOL",
  "DECONSTRUCTION",
  "RECONSTRUCTION",
  "GRID-07",
  "REF Δ-14",
  "34.02°N 118.24°W",
  "SECTOR 9",
  "NODE_014",
  "CH//09",
  "SCAN ACTIVE",
  "VECTOR 271",
  "UNIT 0X4F",
  "ORBIT 3.2",
  "PHASE II",
];

const STORAGE_KEY = "p32-entrance-complete";
const HINT_DELAY_MS = 7000;
const TARGET_ID = -1;
const TARGET_POS = { x: 58, y: 46 };

type WordItem = {
  id: number;
  label: string;
  x: number;
  y: number;
  size: number;
  rotate: number;
  driftX: number;
  driftY: number;
  driftDur: number;
  driftDelay: number;
};

// Deterministic PRNG so the field doesn't reshuffle between renders within
// the same mount -- it only needs to vary across page loads, not frames.
function mulberry32(seed: number) {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildField(): WordItem[] {
  const rand = mulberry32(Date.now() & 0xffffffff);
  const items: WordItem[] = [];
  for (let i = 0; i < 46; i++) {
    items.push({
      id: i,
      label: VOCAB[Math.floor(rand() * VOCAB.length)],
      x: 4 + rand() * 92,
      y: 6 + rand() * 88,
      size: 0.75 + rand() * 1.1,
      rotate: (rand() - 0.5) * 6,
      driftX: (rand() - 0.5) * 18,
      driftY: (rand() - 0.5) * 18,
      driftDur: 7 + rand() * 6,
      driftDelay: -rand() * 6,
    });
  }
  items.push({
    id: TARGET_ID,
    label: "PROJECT32",
    x: TARGET_POS.x,
    y: TARGET_POS.y,
    size: 1.05,
    rotate: -2,
    driftX: 10,
    driftY: -8,
    driftDur: 9,
    driftDelay: -2,
  });
  return items;
}

type Vars = CSSProperties & Record<string, string | number | undefined>;

export function Entrance({ onComplete }: { onComplete: () => void }) {
  const reducedMotion = useReducedMotion();
  const coarsePointer = useMediaQuery("(hover: none), (pointer: coarse)");
  const [ready, setReady] = useState(false);
  const [skip, setSkip] = useState(false);
  const [words, setWords] = useState<WordItem[]>([]);

  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef(new Map<number, HTMLElement>());
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hintActive = useRef(false);
  const completedRef = useRef(false);

  // Resolve, once on mount, whether the entrance should show at all: skip
  // entirely under reduced motion (the interaction is inherently
  // motion-based) or if this session already completed it. This is a
  // one-time client-only check (sessionStorage doesn't exist on the
  // server), so the resulting setState-in-effect is necessary here, not
  // incidental -- the entrance intentionally renders nothing until this
  // resolves, so there is no visible cascade.
  useEffect(() => {
    let already = false;
    try {
      already = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      already = false;
    }
    if (already || reducedMotion) {
      completedRef.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSkip(true);
      onComplete();
    } else {
      setWords(buildField());
    }
    setReady(true);
  }, [reducedMotion, onComplete]);

  const finish = useCallback(
    (instant: boolean) => {
      if (completedRef.current) return;
      completedRef.current = true;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* sessionStorage unavailable (private mode) -- the intro will just replay */
      }
      if (hintTimer.current) clearTimeout(hintTimer.current);

      const root = rootRef.current;
      ensureGsapRegistered();

      if (instant) {
        if (!root) {
          setSkip(true);
          onComplete();
          return;
        }
        gsap.to(root, {
          opacity: 0,
          duration: 0.25,
          ease: EASE_OUT,
          onComplete: () => {
            setSkip(true);
            onComplete();
          },
        });
        return;
      }

      const targetEl = wordRefs.current.get(TARGET_ID);
      const logo = logoRef.current;
      const tl = gsap.timeline({
        onComplete: () => {
          setSkip(true);
          onComplete();
        },
      });
      wordRefs.current.forEach((el, id) => {
        if (id === TARGET_ID) return;
        tl.to(el, { opacity: 0, duration: 0.5, ease: EASE_OUT }, 0);
      });
      if (targetEl) {
        tl.to(targetEl, { scale: 1.15, opacity: 1, duration: 0.4, ease: EASE_OUT }, 0);
        tl.to(targetEl, { opacity: 0, duration: 0.25, ease: EASE_OUT }, 0.45);
      }
      if (logo) {
        tl.set(logo, { opacity: 0, scale: 0.92 }, 0.4);
        tl.to(logo, { opacity: 1, scale: 1, duration: 0.5, ease: EASE_OUT }, 0.5);
      }
      if (root) {
        tl.to(root, { opacity: 0, duration: 0.5, ease: EASE_OUT }, 1.2);
      }
    },
    [onComplete]
  );

  // Pointer scanner: desktop/fine-pointer only. Reads distance directly off
  // each word's DOM rect and writes style straight to the element (no React
  // state) so this stays cheap at ~47 nodes on every pointermove.
  useEffect(() => {
    if (reducedMotion || coarsePointer || skip || !ready || words.length === 0) return;
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    let px = -9999;
    let py = -9999;

    function apply() {
      wordRefs.current.forEach((el, id) => {
        if (id === TARGET_ID && hintActive.current) {
          el.style.opacity = "0.95";
          el.style.filter = "blur(0px)";
          el.style.textShadow = "0 0 16px rgba(157,210,226,0.6)";
          el.style.color = "#eaf6fa";
          return;
        }
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(px - cx, py - cy);
        const near = Math.max(0, 1 - dist / 220);
        const isTarget = id === TARGET_ID;
        el.style.opacity = String(isTarget ? 0.35 + near * 0.6 : 0.18 + near * 0.7);
        el.style.filter = `blur(${(1 - near) * 1.6}px)`;
        if (isTarget) {
          el.style.textShadow = near > 0.3 ? `0 0 ${6 + near * 14}px rgba(157,210,226,${0.3 + near * 0.5})` : "none";
          el.style.color = near > 0.3 ? "#eaf6fa" : "";
        }
      });
      raf = 0;
    }
    function onMove(e: PointerEvent) {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    }
    root.addEventListener("pointermove", onMove);
    return () => {
      root.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion, coarsePointer, skip, ready, words]);

  // After a while, the system gives up a subtle signal so a visitor who
  // hasn't found it (or isn't scanning) isn't left stuck. Skipped on touch,
  // where the target is already prominent from the start.
  useEffect(() => {
    if (skip || !ready || reducedMotion || coarsePointer || words.length === 0) return;
    hintTimer.current = setTimeout(() => {
      hintActive.current = true;
      const el = wordRefs.current.get(TARGET_ID);
      if (el && coarsePointer === false) {
        el.style.opacity = "0.95";
        el.style.filter = "blur(0px)";
        el.style.textShadow = "0 0 16px rgba(157,210,226,0.6)";
        el.style.color = "#eaf6fa";
      }
    }, HINT_DELAY_MS);
    return () => {
      if (hintTimer.current) clearTimeout(hintTimer.current);
    };
  }, [skip, ready, reducedMotion, coarsePointer, words]);

  if (!ready || skip) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-p32-black text-p32-white"
    >
      <p className="sr-only">
        A short interactive discovery sequence precedes the site. Press Tab to reach the hidden
        PROJECT32 control and press Enter or Space to begin, or use the Skip intro control to go
        straight to the site.
      </p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.65) 100%)" }}
      />
      <div className="absolute inset-0">
        {words.map((w) => {
          const isTarget = w.id === TARGET_ID;
          const baseVars: Vars = {
            left: `${w.x}%`,
            top: `${w.y}%`,
            fontSize: `${w.size}rem`,
          };
          if (reducedMotion) {
            baseVars.transform = `translate(-50%, -50%) rotate(${w.rotate}deg)`;
          } else {
            baseVars["--p32-rot"] = `${w.rotate}deg`;
            baseVars["--drift-x"] = `${w.driftX}px`;
            baseVars["--drift-y"] = `${w.driftY}px`;
            baseVars.animation = `p32-entrance-drift ${w.driftDur}s ease-in-out ${w.driftDelay}s infinite alternate`;
          }
          if (isTarget) {
            return (
              <button
                key={w.id}
                ref={(el) => {
                  if (el) wordRefs.current.set(w.id, el);
                }}
                type="button"
                onClick={() => finish(false)}
                className="absolute whitespace-nowrap font-mono font-medium tracking-wide text-p32-gray-100 outline-none"
                style={{
                  ...baseVars,
                  opacity: coarsePointer ? 0.9 : 0.35,
                  filter: coarsePointer ? "none" : "blur(1.5px)",
                }}
              >
                PROJECT32
              </button>
            );
          }
          return (
            <span
              key={w.id}
              ref={(el) => {
                if (el) wordRefs.current.set(w.id, el);
              }}
              aria-hidden="true"
              className="absolute whitespace-nowrap font-mono text-p32-gray-600"
              style={{ ...baseVars, opacity: 0.22, filter: "blur(1.5px)" }}
            >
              {w.label}
            </span>
          );
        })}
      </div>

      <div
        ref={logoRef}
        aria-hidden="true"
        className="pointer-events-none absolute opacity-0"
        style={{ left: `${TARGET_POS.x}%`, top: `${TARGET_POS.y}%`, transform: "translate(-50%, -50%)" }}
      >
        <P32LogoOnDark height={40} />
      </div>

      <div className="pointer-events-none relative z-10 flex flex-col items-center gap-6 text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-p32-gray-500 md:text-sm">
          LOCATE PROJECT32 TO INITIALIZE
        </p>
      </div>

      <button
        type="button"
        onClick={() => finish(true)}
        className="absolute bottom-6 right-6 z-20 font-mono text-[11px] tracking-wide text-p32-gray-600 transition-colors hover:text-p32-gray-300 focus-visible:text-p32-gray-100 md:bottom-8 md:right-8"
      >
        Skip intro
      </button>
    </div>
  );
}
