// TEMPORARY — stand in for asset #9 in ASSETS.md (discreet technical-team
// imagery: hands, screens, materials) until real photography replaces them.
// Three distinct frames, crossfaded by the parent as the Team section
// scrolls -- a sequence, not a single static image.

export function WorkLightFrame() {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" className="h-full w-full">
      <rect width="400" height="300" fill="#e9e9e6" />
      <defs>
        <radialGradient id="worklight" cx="62%" cy="35%" r="45%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#worklight)" />
      <g stroke="#3a3a36" strokeWidth="1.2" fill="none" opacity="0.75">
        <rect x="120" y="150" width="150" height="90" transform="rotate(-6 195 195)" />
        <rect x="150" y="130" width="90" height="60" transform="rotate(10 195 160)" />
      </g>
      <circle cx="248" cy="105" r="5" fill="#9dd2e2" opacity="0.8" />
    </svg>
  );
}

export function ScreenSilhouetteFrame() {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" className="h-full w-full">
      <rect width="400" height="300" fill="#dedeDA" />
      <rect x="150" y="70" width="150" height="100" fill="#c9c9c4" />
      <path
        d="M170 90 L290 90 L290 150 L170 150 Z"
        fill="none"
        stroke="var(--p32-signal-deep)"
        strokeWidth="1"
        opacity="0.5"
      />
      <ellipse cx="220" cy="230" rx="90" ry="110" fill="#2a2a27" opacity="0.88" />
    </svg>
  );
}

export function MachinedMacroFrame() {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" className="h-full w-full">
      <rect width="400" height="300" fill="#d4d4cf" />
      <g stroke="#9c9c95" strokeWidth="1">
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={i} x1={-40 + i * 22} y1="0" x2={-40 + i * 22 + 90} y2="300" opacity={i % 3 === 0 ? 0.8 : 0.35} />
        ))}
      </g>
      <line x1="60" y1="0" x2="150" y2="300" stroke="#9dd2e2" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}
