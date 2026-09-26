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

Hero (dark, full-screen image) → Vision (light) → Gap (dark, full-bleed
imagery) → Uniqueness (light) → Playbook (dark, per-step imagery) →
Execution (dark, full-screen) → Team (dark, full-screen image-led) →
Resolution (light, full-bleed image, no copy) → Contact (dark). Team was
rebuilt from an earlier light/grayscale treatment to a full-screen dark
photographic section (see "Real photography" below); Resolution was added
as the "large final image before Contact" breath the brief required —
the one light beat among three consecutive dark image-led sections
(Playbook, Execution, Team).

## Composition: centered axis + image-led (V3)

A later revision required the page move to a strong central axis and become
image-led. Applied:

- **Centered**: Hero headline (both axes, not just horizontally), Vision
  headline/body, Gap's headline (its three-point collision list stays
  left-aligned below the centered headline -- an intentional grid-break),
  Uniqueness headline/body/lifecycle diagram, Playbook's headline, Execution
  statement, Team headline/body/image sequence, Contact (logo, email, phone,
  address, copyright row all centered, not the old split layout).
- **Image-led (V4: real photography)**: four official NASA satellite images
  (Black Marble, Blue Marble, SRTM topography, a Tin Bider crater crop) —
  see `ASSET_CREDITS.md` for exact sourcing and `ASSETS.md` for the
  placement map — replace the earlier procedural stand-ins entirely via the
  shared `NasaPhoto` component (`components/media/NasaPhoto.tsx`), which
  applies one consistent duotone treatment (grayscale, contrast, a
  directional darkening gradient, a low-opacity pale-blue color-blend tint)
  so raw satellite photography reads as part of the brand system rather
  than stock imagery. Rhythm varies deliberately: full-screen (Hero, Team,
  Execution), full-bleed background (Gap), a distinct photo per step
  (Playbook), and one large wordless full-bleed image as the pacing beat
  before Contact (Resolution). `Vision`'s `GlobalRoutes` and `Execution`'s
  `RedButtonAbstract` remain procedural — they were not part of the
  required real-image placement list, and the brief did not ask for a
  photograph in either slot.

## Motion system (V2: GSAP/ScrollTrigger scroll choreography)

Motion tokens live in `app/globals.css` (`--ease-out`, `--ease-in-out`,
`--ease-drawer`) and are mirrored as literal cubic-beziers in `lib/motion.ts`
(GSAP cannot resolve CSS custom properties in its `ease` option, so both must
stay in sync). `lib/gsapSetup.ts` registers `ScrollTrigger` once.

- **Hero** (`Hero.tsx`, rebuilt as "Secure System Under Pressure," replacing
  an earlier hub-and-spoke network concept entirely — no code from that
  version was preserved): a full-screen real NASA Black Marble photograph
  (Earth's city lights at night, see `ASSET_CREDITS.md`) sits beneath a
  Canvas 2D infrastructure-mesh overlay — a hand-placed 16-node mesh, some
  nodes secure, some compromised (the earlier procedurally-drawn terrain
  layer was removed once the real photograph took over that role).
  Compromised nodes and their "threat" links (drawn as a deliberately
  interrupted line, not a dash pattern) render at near-zero opacity until a
  scan reveals them — the pointer, on desktop (`hover:hover` +
  `pointer:fine`), or an automatic slow sweep path otherwise — which is a
  genuine reveal keyed to distance-from-scan, not a glow that follows the
  cursor. `ScrollTrigger` (pinned on desktop, `+=1.3× viewport height`; a
  plain non-pinned progress mapping on mobile) drives a triangular
  "tension" value: 0 at both ends, peaking mid-scroll, so the
  mesh/secure-links/threat-links layers separate along fixed per-layer
  vectors (deconstruction) and realign as tension returns to 0 while threat
  opacity fades to nothing (reconstruction) — controlled depth, not random
  parallax. Reveal alpha is multiplied by that same fade, not added on top
  of it, so a direct scan over a since-secured node correctly shows
  nothing. The headline (uppercase, centered on both axes)
  reveals once via a single aperture `clip-path` iris on load (starting at
  a non-zero 6% radius, not a literal zero-size point), independent of
  scroll progress — the statement must be legible without scrolling.
  Reduced motion: one static draw of the fully secured end state, headline
  visible immediately, no RAF loop, no pin, no scan.

  **Fixed after a `/review-animations` pass** (see chat for the full
  findings table): engaging the scan is still instant, but disengaging
  (`onPointerLeave`, or the automatic sweep reaching its cycle cap) now
  eases `scanStrength` from 1 to 0 over 300ms via a small `gsap.to()` on
  the draw-state object, instead of cutting the reveal dead — confirmed
  by sampling the canvas's own pixel alpha at the reveal point across the
  fade (102 → 16 → 1), not just by eyeballing a screenshot. The mobile/
  no-hover automatic sweep is now bounded to 3 cycles (27s) and then
  settles via the same eased disengage, rather than looping indefinitely
  for as long as the Hero is in view. The rAF loop now skips `drawScene()`
  entirely when nothing in the draw state changed since the last frame
  (a signature string comparison), instead of redrawing the full scene at
  60fps unconditionally. The three per-step scenes and the lifecycle trace
  in Uniqueness had SVG geometry attributes (`x`/`y`, `cx`/`cy`, `r`)
  animated directly in three independent places — none composited, all
  effectively `top`/`left` in SVG costume — and are now `transform`-based
  (`translate`/`scale`) throughout. A few CSS transitions reached for
  Tailwind's bare `ease-out` instead of the project's own `--ease-out`
  token; fixed to use the token everywhere.
- **Vision**: a `clip-path` shutter reveal plus a white flash-fade, played
  once on entering (not scrubbed) — a "resolve," not a fade-up.
- **Gap**: desktop — pinned, scrubbed collision. The three challenges fly in
  from three different directions with **overlapping arrival windows** (each
  point is still moving when the next starts), so they visibly interrupt each
  other before settling into the asymmetric layout. Mobile — a simple
  non-pinned stagger reveal (no wide translateX offsets, which would
  overflow a narrow viewport; the desktop version is clipped with
  `overflow-x-hidden` on the section for the same reason at in-between
  breakpoints).
- **Uniqueness**: seven scattered "system" dots collapse onto the three
  lifecycle nodes as the section scrolls into place (many disconnected
  systems → one controlled lifecycle), scrubbed, not pinned.
- **Playbook**: pinned on desktop for `2.2× viewport height`; scroll position
  drives which of the four steps is active, while hover/focus/click can
  override at any time (a ref-based manual-override flag; scroll resumes
  from the current `ScrollTrigger.progress` on pointer-leave). Each step has
  its own small generative SVG mark (`PlaybookIcons.tsx`) that changes state
  when active — a splitting square, a scanning sweep, stacking blocks, a
  converging node cluster — rather than a shared icon. Mobile: unchanged
  tap-accordion, no pin, no scroll-driven index.
- **Execution**: a decisive one-shot "lock" — words enter individually
  rotated/offset and snap into place with `back.out` easing (a mechanical
  overshoot, distinct from every other section's pure ease-out), timed with
  the underline's own snap.
- **Team**: rebuilt as full-screen and image-led (`min-h-[100dvh]`, dark).
  Three crops of the same Black Marble photograph (different
  `objectPosition`s — many places, quietly lit, no faces) crossfade as the
  section scrolls, scrubbed via the same `gsap.timeline` +
  `ScrollTrigger`-scrub mechanism used elsewhere: distributed lights
  standing in for "the world sees the outcome, it almost never sees the
  people who built it," rather than portraiture.
- **Contact**: deliberately the calmest motion on the page — one slow
  (1.4s), single opacity/position settle, once, nothing after.
- Every pinned/scrubbed effect is gated to desktop via `gsap.matchMedia()`
  (`min-width: 768px`); mobile always gets a lighter, non-pinned equivalent.
  A `MotionRefresh` component mounts last in `page.tsx` and calls
  `ScrollTrigger.refresh()` after mount and again once webfonts finish
  loading, since stacking three pinned triggers (Hero, Gap, Playbook) means
  later pin-spacing can shift earlier measurements.
- Every animated component renders a complete, correct static fallback with
  no JavaScript at all (SSR/no-JS output = the final resolved state); JS only
  adds the transient animated path on top of it, gated by
  `prefers-reduced-motion` (`hooks/useReducedMotion.ts`, via
  `useSyncExternalStore`) — reduced motion skips every pin and RAF loop
  entirely rather than just shortening durations.

No image- or video-generation capability is available in this environment
(checked directly). Every photograph on the page is real official NASA
satellite imagery (see `ASSET_CREDITS.md` and `ASSETS.md`), not generated;
the network mesh, lifecycle trace, `GlobalRoutes`, and `RedButtonAbstract`
remain procedural (Canvas/SVG/CSS) by design, layered on top of or beside
the real photography rather than replaced by it.

## What's deliberately not built yet

- No access-code/entry gate (pending spec from Amit) — no routing or UI
  scaffolding for it exists yet, by instruction.
- No video: only static photography is used. No video-generation or
  video-sourcing capability was available in this environment, and none was
  requested.
