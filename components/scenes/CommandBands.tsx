// TEMPORARY — stands in for asset #6 in ASSETS.md (command-center /
// systems-monitoring environment) until real imagery replaces it.
export function CommandBands({ active = false }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      <rect x="10" y="10" width="180" height="180" fill="#040403" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="26" y={30 + i * 38} width="148" height="20" fill="none" stroke="#2a2a26" strokeWidth="1" />
      ))}
      <polyline
        points="30,150 55,138 75,146 100,120 125,132 150,110 170,118"
        fill="none"
        stroke={active ? "#9dd2e2" : "#57564f"}
        strokeWidth="1.3"
        style={{ transition: "stroke 400ms ease" }}
      />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={40 + i * 8} cy={39 + i * 0} r="1.6" fill="#9dd2e2" opacity={active ? 0.8 : 0.35} />
      ))}
    </svg>
  );
}
