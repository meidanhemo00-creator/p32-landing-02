import { NasaPhoto } from "@/components/media/NasaPhoto";

// A silent full-bleed image, the pacing "breath" the brief asked for
// before the close: no copy is invented for it, and none is needed --
// three dark, image-led sections (Playbook, Execution, Team) precede it,
// so this is deliberately the one light beat before Contact's dark close.
export function Resolution() {
  return (
    <section className="relative h-[38vh] min-h-[280px] w-full overflow-hidden bg-p32-white md:h-[85vh]">
      <NasaPhoto
        src="/media/nasa/optimized/orbital-sunrise.webp"
        alt="Orbital sunrise: the sun's first rays above Earth's limb, highlighting the thin blue atmosphere, seen from the International Space Station (NASA)"
        objectPosition="center 60%"
        gradient="180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.08) 100%"
        contrast={1.05}
        reveal
      />
    </section>
  );
}
