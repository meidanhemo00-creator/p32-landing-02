// TEMPORARY — stands in for asset #4 in ASSETS.md (macro optical/sensor
// hardware) until real imagery replaces it.
export function OpticalMacro({ active = false }: { active?: boolean }) {
  const blades = Array.from({ length: 8 });
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      <circle cx="100" cy="100" r="92" fill="#040403" />
      {[72, 52, 34, 18].map((r, i) => (
        <circle key={i} cx="100" cy="100" r={r} fill="none" stroke="#2a2a26" strokeWidth="1" />
      ))}
      {blades.map((_, i) => {
        const a = (i / blades.length) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * 18}
            y1={100 + Math.sin(a) * 18}
            x2={100 + Math.cos(a) * 72}
            y2={100 + Math.sin(a) * 72}
            stroke="#2a2a26"
            strokeWidth="1"
          />
        );
      })}
      <circle
        cx="100"
        cy="100"
        r="7"
        fill={active ? "#9dd2e2" : "#57564f"}
        style={{ transition: "fill 400ms ease" }}
      />
      <circle cx="128" cy="72" r="3" fill="#ffffff" opacity="0.45" />
    </svg>
  );
}
