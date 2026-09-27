// A soft gradient blend at the top edge of a section, fading in the color
// of whichever section came before it -- so a black-to-white (or reverse)
// boundary reads as a smooth transition rather than a hard cut. Purely
// visual, static (no animation, nothing to freeze under reduced motion).
export function SectionBlend({ from }: { from: "black" | "white" }) {
  const rgb = from === "black" ? "0, 0, 0" : "255, 255, 255";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 md:h-40"
      style={{ background: `linear-gradient(to bottom, rgba(${rgb}, 1) 0%, rgba(${rgb}, 0) 100%)` }}
    />
  );
}
