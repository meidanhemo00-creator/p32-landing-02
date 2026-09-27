# P32 — Image & Video Asset Manifest

**Status: real media throughout, from three sources.** No image-generation,
video-generation, licensed-footage-acquisition, or AI video-encoding
capability exists in this environment (checked directly, not assumed).
Every visual asset on the page is (1) an official NASA photograph, (2) a
photograph or video file supplied directly by the client, or (3) an
original procedural CSS/SVG composition for a concept with no photographic
subject — never AI-generated. Full source URLs/titles/credits (or, for
client-supplied files, exactly what's known about their provenance) are
recorded in `ASSET_CREDITS.md` — this file only maps assets to where
they're used.

The Hero's opening film is mostly a pure-CSS `@keyframes` sequence of real
crop/zoom shots (see `components/sections/Hero.tsx`'s `SHOTS` array and
`app/globals.css`'s `p32-hero-shot`/`p32-hero-rest` keyframes) — but two of
its eighteen shots are genuine `<video>` elements (autoplay, muted, loop,
playsInline; no JavaScript needed to drive them), using two video files the
client supplied directly.

## Source & optimized files

- `public/media/nasa/source/` / `optimized/` — untouched NASA originals /
  WebP derivatives.
- `public/media/team/source/` / `optimized/` — the client-supplied Team
  photograph, same split.
- `public/media/stock/source/` / `optimized/` — four client-supplied still
  images (PNG originals / WebP derivatives).
- `public/media/video/optimized/` — two short MP4 clips and their poster
  frames, transcoded locally from client-supplied source video. **The raw
  video originals (46 MB and 352 MB) are not committed** — see
  `ASSET_CREDITS.md` for why and where they live locally.

### NASA photographs

| Optimized file | Original subject | Used in |
|---|---|---|
| `black-marble-earth-at-night.webp` | NASA Black Marble — Earth's city lights at night, global composite | Hero (3 shots + resting frame), Resolution, Playbook step 04 |
| `blue-marble-earth.webp` | NASA Blue Marble — true-color whole-Earth composite | Hero (1 shot) |
| `topography-of-the-world.webp` | NASA/JPL/NIMA SRTM global topographic relief map | Hero (2 shots), Gap statement 01 (shown when active), Playbook step 02 |
| `tin-bider-crater-algeria.webp` | Satellite crop of Tin Bider crater, Algeria | Hero (2 shots), Playbook step 01 |
| `orbital-sunrise.webp` | The sun's first rays above Earth's limb, orbital sunrise (ISS) | Hero (1 shot), Resolution (full-bleed, before Contact) |
| `earths-limb-pacific.webp` | The sun illuminates Earth's limb above the Pacific Ocean (ISS) | Hero (1 shot), Playbook step 03 |
| `atmospheric-glow-milkyway.webp` | Atmospheric glow with the Milky Way's stars (ISS) | Hero (1 shot), Execution (full-screen background) |
| `city-lights-lahore.webp` | The city lights of Lahore, Pakistan's second-largest city (ISS) | Hero (1 shot) |
| `city-lights-lucknow.webp` | The city lights of Lucknow, India (ISS) | Hero (1 shot) |

Lahore and Lucknow were added for a "scale of people from afar, satellite
images of big crowded cities" request. No satellite/orbital photograph, day
or night, can resolve individual people — a physical limit of the altitude.
These are the honest match: real, named, densely-populated cities
photographed from the ISS, not a fabricated crowd scene.

### Client-supplied media (see `ASSET_CREDITS.md` for full provenance disclosure)

| File | Subject | Used in |
|---|---|---|
| `team/optimized/team-desert-silhouettes.webp` | Team photograph: silhouetted figures in tactical gear, desert terrain | Team (full-bleed, single image) |
| `video/optimized/city-traffic-light-green.mp4` | Real footage: a traffic light turning green, urban street | Hero (1 shot, real `<video>`) |
| `video/optimized/city-skyscrapers-top-view.mp4` | **Disclosed as CGI/motion-graphics**, not a real-city photograph: a stylised aerial cityscape render | Hero (1 shot, real `<video>`) |
| `stock/optimized/crowd-terminal-silhouette.webp` | Lone figure walking through a crowded terminal/mall | Hero (1 shot) |
| `stock/optimized/crosswalk-crowd-overhead.webp` | Overhead crosswalk, one still figure amid a blurred crowd | Hero (1 shot) |
| `stock/optimized/stadium-crowd-night.webp` | Stadium crowd at night, motion blur | Hero (1 shot) |
| `stock/optimized/satellite-orbit.webp` | Satellite/orbital hardware render, monochrome | Hero (1 shot) |

The four stock stills and two videos were supplied directly by the client
("use all of these") in response to wanting more imagery of people/urban
scale in the Hero. Their exact licensing was not sourced or verified by
Claude — see `ASSET_CREDITS.md`'s provenance disclosure before any public
launch.

No procedural stand-in is used for any photograph or video above. Gap's
second and third statements (`SystemLayers.tsx`, `ExposureScan.tsx`) remain
original, procedural CSS/SVG compositions for abstract concepts ("disparate
systems," "exposure") that have no photographic subject. `Execution`'s
`RedButtonAbstract` is a procedural overlay layered *over* a real
photograph. `Vision`'s `OrbitField.tsx` is the same kind of original
procedural motif.

## Treatment

The nine NASA images are rendered through the shared `NasaPhoto` component
(`components/media/NasaPhoto.tsx`): `grayscale(1)` + a contrast/brightness
adjustment, a directional darkening gradient (tuned per placement for text
legibility), and a low-opacity (`0.18`) pale-blue (`#9dd2e2`) `mix-blend-mode:
color` tint — so the photographs read as part of one cohesive brand system
rather than raw stock imagery. The four client-supplied stock stills reuse
the same `NasaPhoto` component (generically, despite its name) for visual
consistency with the rest of the Hero sequence.

The Team photograph and the two client-supplied videos use the same
grayscale/contrast/gradient treatment applied directly (not the shared
component) but **without** the pale-blue color-blend tint — a full color
tint that reads as a considered brand device over satellite photography
reads as an odd color cast over real people/footage, so it was judged
unnecessary per "add restrained pale-blue detail only if necessary."

## Rules followed

- No NASA branding or logos are used or implied; no endorsement is stated
  or implied.
- No third-party material was *sourced by Claude* — the Team photograph and
  the six Hero stock/video assets were all supplied directly by the client;
  their provenance is disclosed exactly as found in `ASSET_CREDITS.md`, and
  licensing was not independently verified.
- No people, weapons, insignia, or fake effects were added to the Team
  photograph or any client-supplied asset; no claim about any photographed
  individuals' identity, unit, or employment appears anywhere on the site.
- Every NASA original file is byte-identical to what NASA serves at the URL
  given in `ASSET_CREDITS.md`; only the `optimized/` derivatives are
  resized/re-encoded.
