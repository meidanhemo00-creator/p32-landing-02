# P32 — Image Asset Manifest

**Status: no image- or video-generation capability is available in this
environment.** This was checked directly (tool search, not assumption)
before writing a single line of this file. Every visual scene currently in
the codebase is procedural (SVG/Canvas/CSS), not a photograph, and each is
marked `TEMPORARY —` in its component file where it stands in for one of
the ten subjects below. When real photography or generated imagery exists,
replace the corresponding component's rendered output (or swap it for an
`<Image>` reference) without touching layout, since every scene occupies a
fixed-aspect container sized for its slot.

One consistent campaign treatment applies to all ten, so a single brief can
be handed to any image generator or photographer:

**Campaign treatment:** black-and-white foundation, restrained pale-blue
(`#9dd2e2`) accents only, deep blacks, hard directional light, fine film
grain, atmospheric haze, real material texture, high contrast, editorial
framing, large physical scale, minimal-to-no visible human identity, no one
looking at camera, no sci-fi, no neon, no holographic overlays, no stock-
photo staging.

| # | Subject | Section / slot | Crop & dimensions | Placeholder component | Generation prompt |
|---|---|---|---|---|---|
| 1 | Cinematic orbital/satellite view of Earth | Hero, background layer | Full-bleed, 16:9 minimum, works cropped to any viewport (design for 2560×1440 source) | `OrbitalArc` in `components/scenes/OrbitalArc.tsx` | "Monochrome orbital view of Earth's limb from low orbit, thin atmospheric glow line, deep black space, no stars scattered like confetti, restrained pale cyan-blue atmospheric rim light only, film grain, high contrast, no text, no UI overlays" |
| 2 | Monochrome satellite view of terrain/urban infrastructure | Gap, full-bleed background | Full-bleed, 21:9 crop preferred (design for 2560×1200) | `TopographicScan` in `components/scenes/TopographicScan.tsx` | "Black and white satellite reconnaissance view of dense urban infrastructure at oblique angle, hard directional light, long shadows, fine grain, no color, no labels or markers, editorial framing" |
| 3 | Topographical landscape scan | Hero, foreground layer (terrain contour) | Full-bleed, lower two-thirds of a 16:9 frame | `TerrainField` in `components/sections/HeroScene` internals | "Topographic contour-line scan of mountainous terrain from directly above, monochrome, thin precise linework aesthetic like a technical survey plate, no color" |
| 4 | Macro image of advanced optical/sensor hardware | Playbook, step 02 background | 4:3 or 1:1 macro crop (design for 1600×1600) | `OpticalMacro` in `components/scenes/OpticalMacro.tsx` | "Extreme macro photograph of a precision optical sensor lens assembly, concentric aperture blades, single hard specular highlight, black background, monochrome with a single pale cyan-blue reflection, real glass and metal texture" |
| 5 | Cinematic engineering/technological-development environment | Playbook, step 03 background | 4:3 (design for 1920×1440) | `EngineeringGrid` in `components/scenes/EngineeringGrid.tsx` | "Cinematic wide shot of an advanced hardware fabrication bench, layered technical schematics faintly visible, monochrome, hard rim lighting, shallow depth of field, no visible logos or people" |
| 6 | Restrained command-center / systems-monitoring environment | Playbook, step 04 background | 4:3 (design for 1920×1440) | `CommandBands` in `components/scenes/CommandBands.tsx` | "Wide shot of a dim command-and-control room, rows of monitoring displays showing abstract line-graph data only (no readable text), monochrome, single operator silhouette in deep shadow, no faces visible" |
| 7 | Global network / orbital-route visual | Vision & Uniqueness, ambient background | Full-bleed, wide (design for 2560×1000) | `GlobalRoutes` in `components/scenes/GlobalRoutes.tsx` | "Abstract global network map, thin great-circle route arcs over a barely-visible world outline, monochrome line art on white, single pale cyan-blue route highlighted, extremely minimal" |
| 8 | Multiple independent technologies integrating into one system | Uniqueness, lifecycle convergence | Inline SVG scene (existing, vector not photographic) | `LifecycleTrace` in `components/sections/Uniqueness.tsx` | "Macro photograph of disparate precision components (a sensor, a circuit module, a structural bracket) arranged as if converging toward a single point, monochrome, hard light, shallow depth of field" |
| 9 | Discreet technical-team imagery (silhouettes, hands, screens, materials) | Team, cinematic sequence | Three sequential full-bleed frames, 3:2 (design for 2400×1600 each) | `MaterialFrames` in `components/scenes/MaterialFrames.tsx` | "Series of three discreet monochrome photographs: (a) hands working on a partially-disassembled hardware module under a single work light, (b) an out-of-focus silhouette reviewing a screen of abstract technical readouts, (c) close macro of machined metal material texture; consistent hard lighting and grain across all three, no faces" |
| 10 | Abstract "from architecture to the red button" | Execution, full-screen background | Full-bleed, 16:9 (design for 2560×1440) | `RedButtonAbstract` in `components/scenes/RedButtonAbstract.tsx` | "Extreme minimal abstract composition: a single small, precise point of pale cyan-blue light at the center of concentric dark machined-metal rings, vast negative space, monochrome, hard directional light, no literal button or weapon imagery" |

All ten placeholders are wired into their final layout slots now (see each
section component). Swapping in real assets later is a content change, not
a layout change.
