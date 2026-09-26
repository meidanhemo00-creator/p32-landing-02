# P32 — Image Asset Manifest

**Status: real photography is in use throughout.** No image-generation,
video-generation, licensed-footage-acquisition, or video-encoding (no
ffmpeg) capability exists in this environment (checked directly, not
assumed). Every photographic asset on the page is either an official NASA
photograph or a photograph supplied directly by the client — never
generated, procedural, or a video stand-in. Full source URLs, titles, and
credit lines for each file are recorded in `ASSET_CREDITS.md` — this file
only maps assets to where they're used.

The Hero's opening "film" is not a `<video>` element for the reason above:
it is a pure-CSS `@keyframes` sequence of real crop/zoom shots of the NASA
files below (see `components/sections/Hero.tsx`'s `SHOTS` array and
`app/globals.css`'s `p32-hero-shot`/`p32-hero-rest` keyframes).

## Source & optimized files

- `public/media/nasa/source/` — untouched NASA originals as downloaded.
- `public/media/nasa/optimized/` — WebP derivatives (resized, re-encoded)
  actually referenced by the page.
- `public/media/team/source/` / `public/media/team/optimized/` — the
  client-supplied Team photograph, same untouched-original /
  derivative split.

| Optimized file | Original subject | Used in |
|---|---|---|
| `black-marble-earth-at-night.webp` | NASA Black Marble — Earth's city lights at night, global composite | Hero (3 shots + resting frame), Resolution, Playbook step 04 |
| `blue-marble-earth.webp` | NASA Blue Marble — true-color whole-Earth composite | Hero (2 shots) |
| `topography-of-the-world.webp` | NASA/JPL/NIMA SRTM global topographic relief map | Hero (2 shots), Gap statement 01 (shown when active), Playbook step 02 |
| `tin-bider-crater-algeria.webp` | Satellite crop of Tin Bider crater, Algeria | Hero (2 shots), Playbook step 01 |
| `orbital-sunrise.webp` | The sun's first rays above Earth's limb, orbital sunrise (ISS) | Hero (1 shot), Vision (full-width band) |
| `earths-limb-pacific.webp` | The sun illuminates Earth's limb above the Pacific Ocean (ISS) | Hero (1 shot), Playbook step 03 |
| `atmospheric-glow-milkyway.webp` | Atmospheric glow with the Milky Way's stars (ISS) | Hero (1 shot), Execution (full-screen background) |
| `team-desert-silhouettes.webp` (in `public/media/team/optimized/`) | Client-supplied photograph: silhouetted figures in tactical gear, desert terrain, low sun | Team (full-bleed, single image) |

No procedural stand-in is used for any of the above. Gap's second and third
statements (`SystemLayers.tsx`, `ExposureScan.tsx`) remain original,
procedural CSS/SVG compositions standing in for abstract concepts
("disparate systems," "exposure") that have no real photographic subject —
not photographs requiring a credit line. `Execution`'s `RedButtonAbstract`
is likewise a procedural overlay layered *over* a real photograph, not a
substitute for one.

## Treatment

The seven NASA images are rendered through the shared `NasaPhoto` component
(`components/media/NasaPhoto.tsx`): `grayscale(1)` + a contrast/brightness
adjustment to bring color satellite photography into the black/white
system, a directional darkening gradient (tuned per placement for text
legibility), and a low-opacity (`0.18`) pale-blue (`#9dd2e2`, the same
signal color used everywhere else) `mix-blend-mode: color` tint — so the
photographs read as part of one cohesive brand system rather than raw stock
imagery.

The Team photograph uses the same grayscale/contrast/gradient treatment
directly (not the shared component, since it isn't NASA imagery) but
**without** the pale-blue color-blend tint — a full color tint that reads
as a considered brand device over satellite photography reads as an odd
color cast over real people, so it was judged unnecessary here per "add
restrained pale-blue detail only if necessary."

## Rules followed

No NASA branding or logos are used or implied; no endorsement is stated or
implied; no third-party (non-NASA) copyrighted material is used. The Team
photograph was supplied directly by the client with explicit approval for
this exact use; no people, weapons, insignia, or effects were added to it,
and no claim about the photographed individuals' identity, unit, or
employment appears anywhere on the site. See `ASSET_CREDITS.md` for the
exact source page, direct file URL, and credit line for each NASA asset.
