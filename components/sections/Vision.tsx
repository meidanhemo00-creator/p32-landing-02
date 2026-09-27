import { vision } from "@/lib/content";
import { OrbitField } from "@/components/scenes/OrbitField";
import { splitWords } from "@/lib/splitWords";

// Bright white section with a continuous ambient background (three slow
// orbit rings -- global reach, echoing the copy) instead of a static void.
// Not scroll-linked: it runs for as long as the section exists, the same
// way a native CSS animation would.
export function Vision() {
  return (
    <section className="p32-section relative overflow-hidden bg-p32-white text-p32-black">
      <OrbitField />
      <div className="p32-container relative flex flex-col items-center text-center">
        <h2
          data-reveal="words"
          className="max-w-4xl text-balance font-display text-3xl font-medium uppercase leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
        >
          {splitWords(vision.headline)}
        </h2>
        <p
          data-reveal="up"
          className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-p32-gray-700 sm:text-lg md:mt-10 md:text-xl"
        >
          {vision.body}
        </p>
      </div>
    </section>
  );
}
