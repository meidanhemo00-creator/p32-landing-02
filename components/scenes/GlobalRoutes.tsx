// TEMPORARY — stands in for asset #7 in ASSETS.md (global network / orbital
// route visual) until real imagery replaces it. Tuned for light sections.
export function GlobalRoutes() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <g opacity="0.5" stroke="#d8d8d3" strokeWidth="1" fill="none">
        <ellipse cx="600" cy="250" rx="560" ry="220" />
        <ellipse cx="600" cy="250" rx="560" ry="120" />
        <ellipse cx="600" cy="250" rx="380" ry="220" />
        <line x1="40" y1="250" x2="1160" y2="250" />
      </g>
      <path
        d="M 180 320 Q 600 60 1040 300"
        fill="none"
        stroke="var(--p32-signal-deep)"
        strokeWidth="1.4"
        opacity="0.55"
      />
      {[
        [180, 320],
        [1040, 300],
        [600, 130],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="var(--p32-signal-deep)" opacity="0.7" />
      ))}
    </svg>
  );
}
