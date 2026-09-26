# P32 — Design & Build Notes (V1)

## Type substitution

Key Grotesk was specified as the display face but no licensed files were
supplied. **Archivo** (next/font/google) is used in its place: a grotesk with
the same controlled, engineered character (tight apertures, a true medium/bold
weight for large statements). Body copy uses **Inter** and technical metadata
(Playbook step indices) uses **JetBrains Mono**, both as specified.

If Key Grotesk license files are supplied later, swap the `Archivo` import in
`app/layout.tsx` for a `next/font/local` declaration; the `--font-archivo` CSS
variable and every `font-display` usage stay unchanged.

## Color tokens

Defined in `app/globals.css`. True black/white plus a six-step neutral gray
scale, and a single signal blue sampled directly from the official logo's
star (measured average `#9dd2e2`), with a deeper same-hue variant
(`#288eae`) used only where text-level contrast is required (links, focus
rings). Blue never fills a background or large surface.

## Logo

Two confirmed source files are the only sources of truth, both copied
byte-identical into `public/brand/` and never edited:
- `p32-logo-star-source.png` — black lockup, for light surfaces.
- `p32-logo-star-source-white.png` — official reversed/white lockup
  (confirmed asset, originally supplied as `ORDO (1).png`), for dark
  surfaces.

Derivatives generated from them (all committed alongside their sources):
- `p32-lockup-black.png` / `.webp` and `p32-lockup-white.png` / `.webp` — each
  lockup cropped to its content bounding box. `P32Logo` renders the black
  lockup, `P32LogoOnDark` renders the white one (`components/Logo.tsx`).
- `p32-mark-p-only.png` — the "P" glyph alone, cropped from the black source,
  used only to build the favicon and app icons (`app/icon.png`,
  `app/apple-icon.png`, `app/favicon.ico`); the star is never used outside
  the primary lockup, per the brand rules.

## Section sequence

Hero (dark) → Vision (light) → Gap (dark) → Uniqueness (light) → Playbook
(dark) → Execution (light, deliberately inverted for impact) → Team (dark) →
Contact (dark). Team and Contact break the strict alternation on purpose: one
sustained dark movement carries the discretion motif into the closing moment
rather than diluting it with another contrast flip.

## Motion system

- Hero: one signature interaction (`HeroAssembly`) — a silhouette of panels
  resolves from a scattered state into a deliberate, engineered curve on
  load, synced with a two-line masked headline reveal and a single blue
  seam-line pulse (fires once, not looping).
- Gap / Uniqueness / Execution: one-shot scroll reveals via
  `IntersectionObserver` (`hooks/useInView.ts`) driving CSS transitions, not
  GSAP — lighter, and reduced-motion falls out of it for free via the global
  transition-duration override.
- Playbook: its own distinct interaction — hover/focus expand on desktop
  (pointer-fine only, via `useMediaQuery`), tap-accordion on mobile, same
  underlying state and ARIA either way.
- Every animated component renders a complete, correct static fallback with
  no JavaScript at all (SSR output = final resolved state); JS only adds the
  transient animated path on top of it, gated by
  `prefers-reduced-motion` (`hooks/useReducedMotion.ts`, backed by
  `useSyncExternalStore`).

## What's deliberately not built yet

- No access-code/entry gate (pending spec from Amit) — no routing or UI
  scaffolding for it exists yet, by instruction.
- No photography/video: no image-generation capability was available in this
  environment, so every visual (hero panels, lifecycle trace, team texture)
  is code-driven (CSS/SVG), not a placeholder image.
