# P32 — Image Asset Manifest

**Status: real photography is in use.** No image- or video-generation
capability exists in this environment (checked directly, not assumed), so
every photographic asset on the page is an official NASA satellite image,
not a generated or procedural stand-in. Full source URLs, titles, and credit
lines for each file are recorded in `ASSET_CREDITS.md` — this file only maps
assets to where they're used.

## Source & optimized files

- `public/media/nasa/source/` — untouched originals as downloaded.
- `public/media/nasa/optimized/` — WebP derivatives (resized, re-encoded)
  actually referenced by the page.

| Optimized file | Original subject | Used in |
|---|---|---|
| `black-marble-earth-at-night.webp` | NASA Black Marble — Earth's city lights at night, global composite | Hero (full-screen background), Team (three crops, crossfaded), Playbook step 04 |
| `blue-marble-earth.webp` | NASA Blue Marble — true-color whole-Earth composite | Resolution (full-bleed, before Contact), Playbook step 03 |
| `topography-of-the-world.webp` | NASA/JPL/NIMA SRTM global topographic relief map | Gap (full-bleed background), Playbook step 02 |
| `tin-bider-crater-algeria.webp` | Satellite crop of Tin Bider crater, Algeria | Playbook step 01 |

## Treatment

All four are rendered through the shared `NasaPhoto` component
(`components/media/NasaPhoto.tsx`): `grayscale(1)` + a contrast/brightness
adjustment to bring color satellite photography into the black/white system,
a directional darkening gradient (tuned per placement for text legibility),
and a low-opacity (`0.18`) pale-blue (`#9dd2e2`, the same signal color used
everywhere else) `mix-blend-mode: color` tint — so the photographs read as
part of one cohesive brand system rather than raw stock imagery.

## Rules followed

No NASA branding or logos are used or implied; no endorsement is stated or
implied; no third-party (non-NASA) copyrighted material is used. See
`ASSET_CREDITS.md` for the exact source page, direct file URL, and credit
line for each asset.
