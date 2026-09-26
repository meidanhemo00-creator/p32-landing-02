// TEMPORARY — stands in for asset #2 in ASSETS.md (monochrome satellite view
// of terrain/infrastructure) until real imagery replaces it.
const BLOCKS = [
  { x: 120, y: 180, w: 140, h: 90 },
  { x: 340, y: 260, w: 90, h: 160 },
  { x: 520, y: 140, w: 180, h: 70 },
  { x: 760, y: 300, w: 120, h: 120 },
  { x: 900, y: 160, w: 150, h: 200 },
  { x: 260, y: 480, w: 200, h: 80 },
  { x: 620, y: 460, w: 100, h: 140 },
];
const LIT_POINTS = [
  [180, 220], [400, 300], [560, 170], [820, 340], [960, 200], [310, 520], [660, 500], [1020, 430],
];

export function TopographicScan() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <g opacity="0.55" transform="skewX(-6)">
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 90 - 100} y1="0" x2={i * 90 - 100} y2="800" stroke="#302f2b" strokeWidth="1" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="-200" y1={i * 100} x2="1400" y2={i * 100} stroke="#302f2b" strokeWidth="1" />
        ))}
      </g>
      <g opacity="0.5">
        {BLOCKS.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill="none" stroke="#4a4a44" strokeWidth="1" />
        ))}
      </g>
      {LIT_POINTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#9dd2e2" opacity="0.7" />
      ))}
    </svg>
  );
}
