// TEMPORARY — stands in for asset #10 in ASSETS.md (abstract "from
// architecture to the red button") until real imagery replaces it.
export function RedButtonAbstract({ armed = false }: { armed?: boolean }) {
  const rings = [280, 210, 150, 96, 50];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
    >
      {rings.map((r, i) => (
        <circle
          key={i}
          cx="300"
          cy="300"
          r={r}
          fill="none"
          stroke="var(--p32-gray-100)"
          strokeWidth="1"
          opacity={0.5 - i * 0.06}
        />
      ))}
      {/* Fixed radius; "arming" is a GPU-composited transform scale from
          its own center, not an animated r attribute. */}
      <circle
        cx="300"
        cy="300"
        r={7}
        fill="var(--p32-signal-deep)"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          transform: armed ? "scale(1)" : "scale(0.55)",
          transition: "transform 700ms var(--ease-out, ease)",
        }}
      />
    </svg>
  );
}
