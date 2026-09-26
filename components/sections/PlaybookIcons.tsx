// Four small, distinct generative marks -- one per Playbook step -- so each
// step has its own visual system rather than a shared generic icon.

export function DeconstructIcon({ active }: { active: boolean }) {
  const gap = active ? 3 : 0;
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => {
        const x = i % 2;
        const y = Math.floor(i / 2);
        // Base position is fixed; the gap is expressed as a GPU-composited
        // transform, not by animating the rect's own x/y attributes.
        const ox = x === 0 ? -gap : gap;
        const oy = y === 0 ? -gap : gap;
        return (
          <rect
            key={i}
            x={4 + x * 16}
            y={4 + y * 16}
            width="14"
            height="14"
            fill="none"
            stroke="var(--p32-signal)"
            strokeWidth="1.2"
            style={{
              transform: `translate(${ox}px, ${oy}px)`,
              transition: "transform 400ms var(--ease-out, ease)",
            }}
          />
        );
      })}
    </svg>
  );
}

export function ScanIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      <circle cx="20" cy="20" r="15" fill="none" stroke="var(--p32-gray-700)" strokeWidth="1" />
      <circle cx="20" cy="20" r="9" fill="none" stroke="var(--p32-gray-700)" strokeWidth="1" />
      <g
        style={{
          transformOrigin: "20px 20px",
          animation: active ? "p32-scan-spin 2.6s linear infinite" : "none",
        }}
      >
        <line x1="20" y1="20" x2="20" y2="5" stroke="var(--p32-signal)" strokeWidth="1.4" />
      </g>
      <circle cx="20" cy="20" r="1.6" fill="var(--p32-signal)" />
    </svg>
  );
}

export function BuildIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={12}
          y={28 - i * 9}
          width={16 - i * 3}
          height="7"
          fill="none"
          stroke="var(--p32-signal)"
          strokeWidth="1.2"
          style={{
            transform: active ? "translateY(0)" : "translateY(4px)",
            opacity: active ? 1 : 0.55,
            transformOrigin: "center",
            transition: `transform 380ms var(--ease-out, ease) ${i * 60}ms, opacity 380ms ease ${i * 60}ms`,
          }}
        />
      ))}
    </svg>
  );
}

export function OrchestrateIcon({ active }: { active: boolean }) {
  const pts = [
    [20, 6],
    [34, 20],
    [20, 34],
    [6, 20],
  ];
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      {pts.map(([x, y], i) => (
        <line
          key={i}
          x1="20"
          y1="20"
          x2={x}
          y2={y}
          stroke="var(--p32-signal)"
          strokeWidth="1.1"
          style={{
            strokeDasharray: 20,
            strokeDashoffset: active ? 0 : 20,
            transition: `stroke-dashoffset 420ms var(--ease-out, ease) ${i * 70}ms`,
          }}
        />
      ))}
      <circle cx="20" cy="20" r="2.4" fill="var(--p32-signal)" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill="var(--p32-gray-100)" />
      ))}
    </svg>
  );
}
