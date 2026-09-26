// TEMPORARY — stands in for asset #5 in ASSETS.md (engineering/development
// environment) until real imagery replaces it.
export function EngineeringGrid({ active = false }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      <rect x="10" y="10" width="180" height="180" fill="#040403" />
      <g opacity="0.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`v${i}`} x1={10 + i * 36} y1="10" x2={10 + i * 36} y2="190" stroke="#2a2a26" strokeWidth="1" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="10" y1={10 + i * 36} x2="190" y2={10 + i * 36} stroke="#2a2a26" strokeWidth="1" />
        ))}
      </g>
      <rect
        x="46"
        y="70"
        width="70"
        height="46"
        fill="none"
        stroke={active ? "#9dd2e2" : "#57564f"}
        strokeWidth="1.4"
        style={{ transition: "stroke 400ms ease, transform 400ms ease", transform: active ? "translateY(-4px)" : "none" }}
      />
      <rect x="96" y="96" width="46" height="30" fill="none" stroke="#57564f" strokeWidth="1" />
      <circle cx="60" cy="84" r="2" fill="#9dd2e2" opacity={active ? 1 : 0.5} />
    </svg>
  );
}
