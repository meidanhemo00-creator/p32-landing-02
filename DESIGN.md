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

Hero (dark, cinematic montage settling into a full-screen image, plays
directly on load) → Vision (light) → Gap
(dark, pinned three-pressure sequence) → Uniqueness (light) → Playbook
(dark, per-step imagery) → Execution (dark, full-screen) → Team (dark,
full-screen image-led, single reveal) → Resolution (light, full-bleed
image, no copy) → Contact (dark). Team was rebuilt from an earlier
light/grayscale treatment, then again from a three-crop autoplay crossfade
to one scroll-scrubbed reveal (see "Motion system" below); Resolution was
added as the "large final image before Contact" breath the brief required —
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

- **Hero** (`Hero.tsx`, rebuilt again as a fast cinematic montage — the
  interactive canvas mesh from the previous "Secure System Under Pressure"
  concept was deleted entirely per an explicit instruction not to preserve
  or patch it; no canvas code remains). No video-generation,
  image-generation, or licensed-footage-acquisition capability exists in
  this environment and no user-supplied footage was provided (checked and
  disclosed before building this), so the montage is eight distinct
  crop/zoom "shots" cut from the same four real, credited NASA photographs
  used elsewhere on the page — not fabricated shots of people, traffic,
  crowds, or hardware macro. A single GSAP timeline plays on mount -- the
  page opens directly into this Hero, with no gate in front of it -- and
  cuts through the eight shots (six ~0.6s cuts, two ~1.3s "breath" holds, each with a
  small scale move for a Ken-Burns feel), then settles on a ninth resting
  frame (the Black Marble global view) as the aperture-`clip-path` headline
  reveal plays over it — one coherent choreography, roughly 7–8s, not a
  loop. Reduced motion: the resting frame and headline appear immediately,
  no montage plays. Hero no longer pins the viewport at all (the earlier
  1.3×-viewport-height pin existed to scrub the mesh's deconstruction/
  reconstruction, which no longer exists); it now just recedes slightly
  (opacity/scale) as Vision arrives, non-pinned, scrubbed — a large
  reduction in overall pinned scroll distance sitewide, aimed directly at
  the "scroll feels stuck" rejection.
- **Vision**: a `clip-path` shutter reveal plus a white flash-fade, played
  once on entering (not scrubbed) — a "resolve," not a fade-up.
- **Gap** (`Gap.tsx`, rebuilt with new copy/hierarchy supplied directly by
  the client — see `lib/content.ts`'s `gap` export): a label + primary
  statement reveal once on entering, then, on desktop, a pinned
  (`+=2.0× viewport height`) scrubbed crossfade through three full-screen
  "pressure" panels, each a large statement paired with its own visual —
  real topography imagery for "an evolving technological landscape,"
  procedural misaligned panels (`SystemLayers.tsx`) for "friction between
  disparate systems" (no real photograph fits an abstract systems concept),
  and a procedural sweeping scan line (`ExposureScan.tsx`) for "the security
  risk of exposure" (same reasoning). Mobile: the three panels are plain
  stacked blocks, each revealed once as it scrolls into view — no pin, no
  crossfade. The pin's `ScrollTrigger` trigger is the panels wrapper alone,
  not the whole section — an earlier version pinned the whole section
  (label included), which froze the label at the top of the screen for the
  full pin duration while panels crossfaded in the remaining space, an
  overflow-prone layout bug caught by scrolling through it, not by
  eyeballing a single screenshot. The absolute-overlay positioning the
  crossfade needs is applied by GSAP (`gsap.set(panels, {position:
  "absolute", ...})`) only inside the desktop `matchMedia` branch, not as a
  static `md:absolute` class — this whole effect bails out early under
  reduced motion, so a static class would have left three panels visually
  stacked on top of each other at desktop widths with no JS running to hide
  the inactive ones (a second real bug caught specifically by testing the
  reduced-motion path at a desktop viewport, not just at mobile widths).
- **Uniqueness**: seven scattered "system" dots collapse onto the three
  lifecycle nodes as the section scrolls into place (many disconnected
  systems → one controlled lifecycle), scrubbed, not pinned.
- **Playbook**: pinned on desktop for `1.9× viewport height` (trimmed from
  `2.2×` in the same scroll-tightening pass as Hero's pin removal); scroll position
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
- **Team** (`Team.tsx`, rebuilt again as one strong reveal, replacing an
  earlier three-crop autoplay crossfade that read as several decorative
  animations rather than one): no photograph of "silhouettes, hands,
  screens, hardware" exists or can be generated/licensed here, so — as
  disclosed rather than faked — this continues to use the real, credited
  Black Marble photograph as the visual device (distributed lights standing
  in for the people behind them). A single curtain-style `clip-path`
  (`inset(0 50% 0 50%)` → `inset(0 0% 0 0%)`, distinct from Hero's circular
  iris and Vision's bottom-up mask, for compositional variety) opens on the
  photograph as one scrubbed timeline tied to entering the section; the
  headline's two sentences ("The world sees the outcome." / "It almost
  never sees the people who built it.") resolve as sequential beats within
  that same timeline, not as separate decorative pieces.
- **Contact**: deliberately the calmest motion on the page — one slow
  (1.4s), single opacity/position settle, once, nothing after.
- Every pinned/scrubbed effect is gated to desktop via `gsap.matchMedia()`
  (`min-width: 768px`); mobile always gets a lighter, non-pinned equivalent.
  A `MotionRefresh` component mounts last in `page.tsx` and calls
  `ScrollTrigger.refresh()` after mount and again once webfonts finish
  loading, since stacking pinned triggers (Gap, Playbook — Hero no longer
  pins) means later pin-spacing can shift earlier measurements.
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
