import { NasaPhoto } from "@/components/media/NasaPhoto";

// A silent full-bleed image, the pacing "breath" the brief asked for
// before the close: no copy is invented for it, and none is needed --
// three dark, image-led sections (Playbook, Execution, Team) precede it,
// so this is deliberately the one light beat before Contact's dark close.
export function Resolution() {
  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-p32-white md:h-[85vh]">
      <NasaPhoto
        src="/media/nasa/optimized/blue-marble-earth.webp"
        alt="True-color composite of the whole Earth (NASA Blue Marble)"
        objectPosition="center"
        gradient="180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.1) 100%"
        contrast={1.05}
      />
    </section>
  );
}
