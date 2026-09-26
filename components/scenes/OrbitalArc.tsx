// TEMPORARY — stands in for asset #1 in ASSETS.md (cinematic orbital view of
// Earth) until real photography/generated imagery replaces it. Procedural
// SVG only: no image-generation capability was available in this
// environment.
export function OrbitalArc() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient id="orbital-glow" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#9dd2e2" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#9dd2e2" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="500" cy="560" rx="560" ry="150" fill="url(#orbital-glow)" />
      <circle cx="500" cy="1460" r="900" fill="#030304" />
      <circle cx="500" cy="1460" r="900" fill="none" stroke="#9dd2e2" strokeOpacity="0.3" strokeWidth="1.5" />
    </svg>
  );
}
