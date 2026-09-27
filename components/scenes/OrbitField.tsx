// Ambient, continuous background motion for Vision -- not scroll-linked
// (it never stops or ties to scroll position), not a one-time reveal.
// Three concentric orbit rings drift slowly at different rates, echoing
// the section's own "global reach" copy. Pure CSS rotation (transform
// only); the sitewide prefers-reduced-motion rule freezes it to a single
// static frame.
export function OrbitField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 800 800" className="h-[150%] w-[150%] max-w-none opacity-[0.16]">
        <g style={{ transformOrigin: "400px 400px", animation: "p32-orbit-spin 70s linear infinite" }}>
          <circle cx="400" cy="400" r="220" fill="none" stroke="var(--p32-signal-deep)" strokeWidth="1" />
          <circle cx="620" cy="400" r="4" fill="var(--p32-signal-deep)" />
        </g>
        <g style={{ transformOrigin: "400px 400px", animation: "p32-orbit-spin-reverse 110s linear infinite" }}>
          <circle cx="400" cy="400" r="320" fill="none" stroke="var(--p32-signal-deep)" strokeWidth="1" />
          <circle cx="400" cy="80" r="3" fill="var(--p32-signal-deep)" />
        </g>
        <g style={{ transformOrigin: "400px 400px", animation: "p32-orbit-spin 160s linear infinite" }}>
          <circle cx="400" cy="400" r="140" fill="none" stroke="var(--p32-signal-deep)" strokeWidth="1" />
          <circle cx="400" cy="260" r="2.5" fill="var(--p32-signal-deep)" />
        </g>
      </svg>
    </div>
  );
}
