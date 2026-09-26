import { vision } from "@/lib/content";

export function Vision() {
  return (
    <section className="p32-section bg-p32-white text-p32-black">
      <div className="p32-container">
        <h2 className="max-w-5xl font-display text-3xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
          {vision.headline}
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-p32-gray-700 md:mt-10 md:text-xl">
          {vision.body}
        </p>
      </div>
    </section>
  );
}
