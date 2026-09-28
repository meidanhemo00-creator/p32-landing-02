# P32 — Design & Build Notes (V1)

## Typography (V6: Instrument Sans + JetBrains Mono)

Inter and the Archivo display substitute were both removed at the client's
request. The site now runs on two families, both via `next/font/google`
(self-hosted, preloaded, with metric-matched fallbacks so the swap causes no
layout shift) in `app/layout.tsx`:

- **Instrument Sans** (`--font-instrument`, mapped to both `font-sans` and
  `font-display`) — body copy, descriptions, buttons, names, role titles,
  and the large statements. Headings stay at weight 500, never bold.
- **JetBrains Mono** (`--font-jbmono`, `font-mono`) — section titles,
  indexes, numbers, metadata, small navigation labels, process-stage names.

Archivo was only ever a stand-in for Key Grotesk (no licensed files were
supplied), so it did not meet the "keep a licensed display grotesk" bar and
was dropped rather than kept for the hero. If Key Grotesk files arrive,
load them with `next/font/local` and point `--font-display` at them.

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

Hero (dark, cinematic opening film, plays directly on load) → Vision
(light) → Gap (dark, three hover/focus/tap-selectable statements) →
Uniqueness (light) → Playbook (dark, four-step accessible accordion) →
Execution (dark, full-screen, static) → Team (dark, one static image-led
reveal) → Resolution (light, full-bleed image, no copy) → Contact (dark,
static). Resolution was added as the "large final image before Contact"
breath an earlier brief required — the one light beat among three
consecutive dark image-led sections (Playbook, Execution, Team). Every
section is now static-by-default and interaction-driven rather than
scroll-driven — see "Motion system (V3)" below for why and how.

## Composition: centered axis + image-led (V5: craft/quality pass)

A creative-correction pass ("too much like a generic interface, too many
boxes, lacks cinematic scale") called for benchmarking against Anduril's
public site for visual confidence, restraint, and scale — studied directly
in-browser (screenshots, not code/copy/imagery) purely for calibration, then
built as an original P32 visual language. Takeaways actually applied: no
borders/shadows/rounded corners on photography (full-bleed, flat, no
"cards"); small mono/label text used only functionally (index numbers,
section eyebrows), never as decorative chrome; generous negative space
between statements instead of visible rule lines. P32's own explicit
black/white/pale-blue restriction was kept — Anduril's own varied palette
was not adopted, only its confidence and restraint from chrome.

- **Centered**: Hero headline (both axes), Vision headline/body, Gap's
  label/headline (its three statements are full-width, not narrow-column-
  centered, by explicit instruction — "large full-width statements," not
  cards), Uniqueness headline/body/lifecycle diagram, Playbook's headline,
  Execution statement, Team headline/body, Contact (logo, email, phone,
  address, copyright row all centered).
- **Image-led (real photography throughout)**: seven official NASA
  photographs (Black Marble, Blue Marble, SRTM topography, a Tin Bider
  crater crop, an orbital sunrise, Earth's limb over the Pacific, and
  atmospheric glow with the Milky Way — the last three added in this pass
  specifically for Vision/Execution/Hero, sourced via the official NASA
  Image and Video Library API for full 5568×3712 originals rather than the
  ~1041×694 copies embedded in the article pages) plus one real photograph
  supplied directly by the client for Team — see `ASSET_CREDITS.md` for
  exact sourcing and `ASSETS.md` for the placement map. The seven NASA
  images share one duotone treatment via `NasaPhoto`
  (`components/media/NasaPhoto.tsx`): grayscale, contrast, a directional
  darkening gradient, a low-opacity pale-blue color-blend tint. The Team
  photo is treated separately (grayscale/contrast/gradient, no blue tint —
  "restrained pale-blue detail only if necessary," and a full color-blend
  tint over real people read wrong where it reads fine over satellite
  imagery). Rhythm: full-screen (Hero, Team, Execution), a per-statement
  image that changes on interaction (Gap), a single crossfading image stage
  (Playbook), a full-width band within a white section (Vision), and one
  large wordless full-bleed image as the pacing beat before Contact
  (Resolution). `Execution`'s `RedButtonAbstract` now layers over a real
  photo rather than standing alone. `Vision`'s procedural `GlobalRoutes`
  diagram was removed and deleted — a real atmospheric photograph replaced
  it outright once "large atmospheric image" was requested explicitly,
  and a decorative line-art diagram is exactly what a later brief warned
  against.

## Entrance reveal (restrained, one-time, non-scroll-linked)

A later revision asked for *some* motion back, specifically not scroll-
linked: a one-time entrance on major statements. Then, in a further pass,
"more movement and animations on the texts." All of it stays paint-
triggered (plays once, the instant an element exists in the DOM) and pure
CSS — never scroll-triggered, since a scroll-linked version was explicitly
rejected earlier in this project and is not being reintroduced under a
different name.

- **`.word-reveal`** (`app/globals.css`, built via `lib/splitWords.tsx`) —
  every section heading (Vision, Gap, Uniqueness, Playbook, Execution,
  Team, plus Gap's and Playbook's large per-statement/per-step text) is
  now split into per-word `<span>` elements, each fading/rising/un-blurring
  in with a 70ms stagger per word (`translateY(28px→0)`, `scale(0.94→1)`,
  `blur(5px→0)`, 700ms, `var(--ease-out)`). This replaced the earlier
  single-block `.reveal-heading` (deleted, along with its keyframe, once
  nothing referenced it) — word-level movement is explicitly the ceiling
  here, not letter-level, which stays off-limits everywhere on the site,
  Hero especially. `splitWords()` keeps real space characters as separate
  text nodes between the word-spans (not inside them), so normal line-
  wrapping and `text-wrap: balance` are unaffected — verified at 390px.
  Confirmed genuinely animating (not just correctly delayed) by sampling
  every `.word-reveal` element's computed opacity immediately after
  navigation: word 0 of every heading sitewide read ~42% opacity, word 1
  ~2%, later words 0% — all mid-flight simultaneously, not a static state.
  Also confirmed all 135 instances resolve to opacity 1 under reduced
  motion. Uniqueness's headline (which embeds the inline P32 logo
  mid-sentence) gives the logo its own word-index slot so it animates in
  sequence with the surrounding words rather than popping in separately.
- `.reveal-body` — fade + `translateY(14px→0)`, 800ms, 350ms delay
  (widened again in this same pass). Still a single block, not staggered
  per word — supporting/body text explicitly does not get word-by-word
  stagger, per an earlier, more specific instruction; only headings do.
- `.label-glow` — a slow (4s), continuous, low-contrast opacity breathe
  (0.65↔1) on small accent labels only (section eyebrows, index numbers:
  Gap's "01/02/03", Playbook's step indices) — ambient rather than
  one-time, confirmed to actually freeze under reduced motion
  (`animation-iteration-count: infinite` is overridden back to a single
  cycle by the sitewide rule's `!important`).

Because all of this is pure CSS: if the stylesheet fails to load, every
element is simply visible at default opacity — content is never hidden
behind JavaScript, satisfying "do not hide content if JavaScript fails."
The sitewide `prefers-reduced-motion` rule (see below) collapses all of it
to its end state instantly. None of this is applied to Hero's headline,
which explicitly stays reveal-free ("the film provides the movement, the
typography provides control").

## Tried and reverted: section gradient blends and glass panels

A gradient blend between adjacent black/white sections (`SectionBlend.tsx`)
and a consistent frosted-glass panel treatment (`.glass-light`/`.glass-dark`
in `app/globals.css`) were built, applied sitewide, verified, and committed
— then explicitly rejected in the very next round ("i dont like the
gradient scratch that," "i dont like the glass buttons remove as well") and
fully removed: the component file deleted, the CSS classes deleted, every
section reverted to its plain hard-cut/no-panel form. `.reveal-heading`,
`.reveal-body`, `.label-glow`, and Vision's `OrbitField` ambient animation
were kept — only the gradient-blend and glass-panel pieces were disliked,
not the rest of that same round's work. Noted here so a future pass doesn't
re-propose the same two ideas without knowing they were already tried.

## Motion system (V3: no scroll-linked animation, GSAP removed entirely)

All scroll-linked animation was removed sitewide per an explicit rejection
of the scroll-scrubbed/pinned approach ("the current scroll effects are
rejected... remove them cleanly, do not attempt to improve them"). This was
not a partial rollback: `gsap` was uninstalled from `package.json` entirely,
and `lib/gsapSetup.ts`, `lib/motion.ts`, and `components/MotionRefresh.tsx`
were deleted, once grep confirmed zero remaining imports of any of them.
Every section is now static in the document by default — no element is ever
set to `opacity: 0` pending a scroll trigger — and any motion left is either
a plain CSS transition responding to a real hover/focus/click/tap, or (Hero
only) a fixed-length, non-scroll-linked, pure-CSS `@keyframes` sequence that
autoplays on paint like a native browser animation. Nothing pins the
viewport, nothing scrubs opacity or transform against scroll progress,
nothing depends on scroll position to reveal content.

- **Hero** (`Hero.tsx`): still a plain server component — no
  `"use client"`, no refs, no custom `useEffect`, no hand-written JavaScript
  animation logic. The eighteen-shot cinematic sequence
  (`@keyframes p32-hero-shot` / `p32-hero-rest` in `app/globals.css`) is
  pure CSS: each shot layer gets its own `animation-delay`/
  `animation-duration` as inline style, `animation-fill-mode: both` holds
  it hidden before and after its turn, and it just plays the instant the
  HTML paints. Sixteen of the eighteen shots are still real crop/zoom
  photographs (nine credited NASA images plus four client-supplied stock
  stills — a lone figure in a crowded terminal, an overhead crosswalk, a
  stadium crowd, a satellite render — added for "scale of people from
  afar"; see `ASSET_CREDITS.md` for the provenance disclosure on the
  latter, since their exact licensing wasn't sourced or verified here). The
  other two shots are genuine `<video>` elements: the client supplied two
  source video files directly (a real, unstaged traffic-light shot, and a
  stock CGI/motion-graphics render of a stylised city — disclosed as such,
  it is not a real-city photograph). Both were transcoded locally with
  macOS's built-in AVFoundation encoder (`avconvert` — still no ffmpeg in
  this environment) from 46 MB/352 MB sources down to ~700 KB–1.4 MB
  720p clips matching each shot's `hold` duration; poster frames were
  extracted with `qlmanage` and are swapped in for the video by a pure-CSS
  rule under reduced motion (`video[data-hero-video] { display: none }` /
  `img[data-hero-video-poster] { display: block }`) — no JavaScript needed
  to drive, autoplay, loop, or fall back either video. It settles on the
  Black Marble global view as the nineteenth/resting frame after ~14s and
  stays there — it does not loop. The headline is present in the static
  markup from the first paint, with no reveal animation of its own, not
  even the sitewide `.reveal-heading` ("no animated letters... the film
  provides the movement, the typography remains confident and stable").
- **Vision**: the one section with a deliberate, continuous (not one-time,
  not scroll-linked) ambient background animation -- three concentric orbit
  rings drifting at different speeds (`OrbitField.tsx`, `@keyframes
  p32-orbit-spin` / `p32-orbit-spin-reverse`), added after the plain static
  version was called out as "boring." Pure CSS `transform: rotate()`,
  `animation-iteration-count: infinite`; the sitewide reduced-motion rule's
  `!important` on `animation-iteration-count` overrides `infinite` back to
  a single (effectively instant) cycle, freezing it — confirmed by sampling
  the computed transform 1s apart under both settings. The statement sits
  in a single frosted glass panel (`backdrop-blur`, translucent gradient
  fill, soft shadow) over the rings and a soft radial pale-blue glow behind
  it, rather than bare text on white. The real orbital-sunrise photograph
  originally placed here as a full-width image band was removed — it
  produced a large image block followed by the section's own bottom
  padding as a visually blank gap before Gap's dark section began (a real
  layout bug caught by scrolling through it, not by inspecting the section
  in isolation) — and moved to `Resolution` instead, where it replaced
  Blue Marble as the large silent image before Contact.
- **Uniqueness, Execution, Contact**: fully static. No refs, no effects, no
  client-side JavaScript. `Uniqueness`'s lifecycle diagram lost its
  scroll-scrubbed dot-collapse animation and is now just the settled
  three-node diagram; `Execution` lost its scroll-triggered word-by-word
  "lock" animation and is now stable centered typography from first paint,
  over a real photograph.
- **Gap** (`Gap.tsx`): three large full-width statements, `useState` holds
  which one is active (index 0 by default, so there is always a selected
  state — "the other two remain discoverable" implies one is already
  showing). `onMouseEnter`, `onFocus`, and `onClick` all set the same active
  index, so hover, keyboard focus, and tap/click all reach the identical
  state — no information depends only on hover. No visible border/divider
  lines between statements (an earlier version used `divide-y`, which read
  as a bordered list rather than "large full-width statements" — removed
  after the Anduril-benchmarking pass); spacing alone separates them, and
  the active statement's row grows to `48vh` (from a resting `~30–34vh`) so
  its image reads as genuinely large-scale, not a background tint strip.
  The active statement's visual (real topography imagery for "an evolving
  technological landscape"; the procedural `SystemLayers.tsx` for "friction
  between disparate systems," no real photograph fitting that abstract
  concept; the procedural `ExposureScan.tsx` for "the security risk of
  exposure," same reasoning) fades and scales in via plain CSS transitions,
  and its supporting-context sentence expands via a `grid-template-rows`
  transition — both driven by React state, nothing tied to scroll position.
  The three per-point `context` sentences in `lib/content.ts` are the one
  piece of Gap copy not supplied by the client (there was no prior
  elaboration to reuse for an explicit "supporting context becomes visible"
  requirement); they stay strictly a restatement of the pressure itself, no
  new capability, client, or metric claims, and are flagged there for the
  client's review.
- **Playbook** (`Playbook.tsx`, rebuilt again — the four-box grid layout
  was explicitly rejected and removed completely, along with its four
  small generative SVG icons in `PlaybookIcons.tsx`, deleted once grep
  confirmed nothing else referenced them): a slim single-row step-name
  strip (`role="tablist"`) replaces the four-column grid; below it, one
  shared image-and-text stage (`role="tabpanel"`) holds all four steps
  stacked via `position: absolute` inside a fixed-`min-height` container,
  crossfading via opacity — the section's height never changes when the
  active step changes (verified: identical stage height before and after a
  step switch). Hover (desktop, gated to `(hover: hover) and
  (pointer: fine)`) previews; click/tap selects; `ArrowLeft/Right/Up/Down`
  and `Home`/`End` move both focus and the active step via a `navRefs`
  array (`role="tab"` + roving `tabIndex`), satisfying "keyboard
  navigation works" explicitly. All four step names stay visible
  simultaneously at every breakpoint (wrapping to a centered stack on
  narrow widths, never scrolling horizontally or overflowing).
- **Team** (`Team.tsx`): one static "powerful image," not an animation.
  Uses the real photograph supplied directly by the client (desert
  silhouettes in tactical gear, low sun) rather than the earlier NASA
  stand-in used before a real team photo existed — see `ASSET_CREDITS.md`.
  Composition is preserved as supplied; no people, weapons, insignia, or
  effects were added; the pale-blue color-blend tint used on NASA imagery
  is deliberately *not* applied here (a full color tint over real people
  reads wrong where it reads fine over satellite photography — "restrained
  pale-blue detail only if necessary," judged not necessary). Alt text
  describes only what is visible; no claim about the photographed
  individuals' identity, unit, or employment is made anywhere. The
  two-sentence headline is simply present in the markup, plus the sitewide
  `.reveal-heading`/`.reveal-body` one-time entrance.
- Interactive hover/focus states elsewhere (Contact's links, Nav) are plain
  CSS `transition-colors` — no JavaScript, no delay before the state change
  a click or tap depends on.
- Reduced motion: the sitewide rule in `app/globals.css` forces
  `animation-delay`, `animation-duration`, `transition-delay`, and
  `transition-duration` all to ~0 for every element. This was extended
  during this rebuild to include the two `-delay` properties (previously
  only duration/iteration-count were forced) after actually testing
  Hero under reduced motion and finding a real bug: an un-zeroed
  `animation-delay` left the Hero's resting frame waiting out its real
  6.7s delay before its now-instant animation fired, so reduced-motion
  visitors saw a blank black Hero for several real seconds. Fixed at the
  global rule, not per-component, so it protects every future
  delayed animation too.

## What's deliberately not built yet

- No access-code/entry gate (pending spec from Amit) — no routing or UI
  scaffolding for it exists yet, by instruction. A cinematic discovery
  entrance was built and then explicitly rejected and removed in an earlier
  round of this rebuild; this requirement has never been implemented as an
  access gate and remains exactly a pending spec.
- No video: only static photography is used, presented via pure-CSS
  animated crops rather than a `<video>` element. No video-generation,
  video-sourcing, or video-encoding (no ffmpeg) capability was available in
  this environment.

## Personnel register and Cyber Intelligence page (V6)

- **Team** is now a compact introduction: headline, a controlled editorial
  photo frame, the approved two lines of body copy, then the
  Organizational Structure & Key Personnel register
  (`components/sections/Personnel.tsx`). Two ruled bands: Advisory Board
  (five) and Cyber Leadership & Strategic Advisory (two). Both use the same
  portrait size so the second tier is distinct by band, not diminished.
  Hover/focus firms the portrait's monochrome and extends a pale-blue index
  rule; names and roles are always visible. Phones use compact
  portrait-and-text rows. No biographies (none approved).
- **/cyber-intelligence** (`app/cyber-intelligence/page.tsx`,
  `components/cyber/CyberSections.tsx`) rebuilds the approved one-pager
  left-aligned on a 12-column grid, alternating dark/light: hero, the three
  questions as one ruled chain, a paired-row comparison (labels visible on
  mobile, screen-reader labels on desktop), Who We Are linking back to the
  register, a five-stage track that draws once (`data-reveal="line"`),
  grouped deliverables, a four-stage engagement path with an ownership
  scale, a closing statement, and the shared Contact block.
- Entry points: nav link "Cyber Intelligence", the "Explore capability"
  link beside the cyber-leadership band, and the Contact footer. Links back
  to `/` from the cyber page set `prefetch={false}` (prefetching the
  homepage pulls in its Hero preload hints, which Chrome then flags as
  unused).
- **Homepage Cyber teaser** (`components/sections/CyberTeaser.tsx`), placed
  between Execution and Team: a dark full-width section over its own Black
  Marble crop (Europe / Mediterranean / Middle East), centered mono label
  and mono headline, Instrument Sans body and CTA. The CTA is the page's one
  solid white control; hover (fine pointers) and focus turn it pale blue and
  extend its rule, pressed scales to 0.97. Uses the existing one-time reveal
  system only. Browser Back from the Cyber page restores the homepage
  scroll position (verified).
