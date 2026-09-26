import { vision } from "@/lib/content";
import { GlobalRoutes } from "@/components/scenes/GlobalRoutes";

// Static: bright white section, large centered black typography, generous
// negative space. No scroll-linked reveal -- the statement is simply
// present, the way the rest of the page loads.
export function Vision() {
  return (
    <section className="p32-section relative overflow-hidden bg-p32-white text-p32-black">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40">
        <GlobalRoutes />
      </div>
      <div className="p32-container relative flex flex-col items-center text-center">
        <h2 className="max-w-4xl text-balance font-display text-3xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
          {vision.headline}
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-p32-gray-700 md:mt-10 md:text-xl">
          {vision.body}
        </p>
      </div>
    </section>
  );
}
