import { team } from "@/lib/content";

export function Team() {
  return (
    <section className="relative overflow-hidden bg-p32-black text-p32-white p32-section">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--p32-gray-100) 0px, var(--p32-gray-100) 1px, transparent 1px, transparent 64px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[10%] hidden w-px bg-p32-signal/25 md:block"
      />
      <div className="p32-container relative">
        <h2 className="max-w-3xl font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
          {team.headline}
        </h2>
        <div className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-p32-gray-300 md:mt-14 md:text-xl">
          <p>{team.bodyOne}</p>
          <p>{team.bodyTwo}</p>
        </div>
      </div>
    </section>
  );
}
