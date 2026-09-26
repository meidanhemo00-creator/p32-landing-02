// Abstract and procedural, deliberately: "disparate systems" has no real
// photographic subject, so rather than stage or fabricate one, this stays a
// diagram -- three panels that sit misaligned and disconnected from one
// another, standing in for the friction the copy describes. Static: no
// scroll-linked reveal, just a permanent illustration.
const LAYERS = [
  { y: 16, w: 78, x: 4, rotate: -1.6 },
  { y: 42, w: 62, x: 24, rotate: 1.2 },
  { y: 68, w: 86, x: -4, rotate: -0.7 },
];

export function SystemLayers() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-p32-near-black">
      {LAYERS.map((l, i) => (
        <div
          key={i}
          className="tx-machined absolute border border-p32-gray-800 bg-p32-panel/60"
          style={{
            top: `${l.y}%`,
            left: `${l.x}%`,
            width: `${l.w}%`,
            height: "22%",
            transform: `rotate(${l.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
