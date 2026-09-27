import { vision } from "@/lib/content";
import { OrbitField } from "@/components/scenes/OrbitField";

// Bright white section with a continuous ambient background (three slow
// orbit rings -- global reach, echoing the copy) instead of a static void.
// Not scroll-linked: it runs for as long as the section exists, the same
// way a native CSS animation would. The statement sits in a restrained
// glass panel over it for legibility -- no card grid, just one panel.
export function Vision() {
  return (
    <section className="p32-section relative overflow-hidden bg-p32-white text-p32-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(157,210,226,0.16) 0%, rgba(157,210,226,0) 70%)",
        }}
      />
      <OrbitField />
      <div className="p32-container relative flex flex-col items-center text-center">
        <div className="reveal-heading rounded-3xl border border-black/[0.06] bg-gradient-to-b from-white/80 to-white/55 px-8 py-14 shadow-[0_1px_60px_rgba(0,0,0,0.06)] backdrop-blur-md md:px-20 md:py-20">
          <h2 className="max-w-4xl text-balance font-display text-3xl font-medium uppercase leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            {vision.headline}
          </h2>
          <p className="reveal-body mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-p32-gray-700 md:mt-10 md:text-xl">
            {vision.body}
          </p>
        </div>
      </div>
    </section>
  );
}
