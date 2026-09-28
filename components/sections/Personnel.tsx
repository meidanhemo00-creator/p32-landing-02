import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { personnel, type Person } from "@/lib/content";
import { assetPath } from "@/lib/basePath";

// Organizational register, read top to bottom: the Advisory Board band, then
// a separate Cyber Leadership & Strategic Advisory band. Both tiers use the
// same portrait size and type so the second tier never reads as lesser --
// the organizational distinction is carried by the band itself (its own
// index, title, member count and rule), not by shrinking anyone.
//
// Portraits: every file in /media/team/portraits was normalized once, offline,
// to the same square crop, head scale, grayscale tone curve, and (for the
// five studio cutouts from the team deck) the same neutral-gray backdrop, so
// all seven sit as one series. Hover/focus lifts them from a softer to a
// firmer monochrome and extends the pale-blue index rule; nothing is hidden
// behind hover -- names and roles are always visible, on every device.
function PersonEntry({ person, index }: { person: Person; index: number }) {
  return (
    <li data-reveal="up" style={{ "--reveal-index": index } as CSSProperties}>
      <figure
        tabIndex={0}
        aria-label={`${person.name}, ${person.roles.join(", ")}`}
        className="personnel-entry group grid grid-cols-[7rem_1fr] items-start gap-4 outline-none sm:block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-p32-signal"
      >
        <div className="relative aspect-square overflow-hidden bg-p32-gray-800">
          <Image
            src={assetPath(`/media/team/portraits/${person.portrait}.webp`)}
            alt={`Portrait of ${person.name}`}
            fill
            sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 112px"
            className="personnel-portrait"
          />
        </div>
        <figcaption className="sm:mt-4">
          <span aria-hidden="true" className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.12em] text-p32-gray-500 transition-colors duration-300 group-hover:text-p32-signal group-focus-visible:text-p32-signal">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="personnel-rule h-px bg-p32-signal-deep" />
          </span>
          <span className="mt-3 block text-lg font-medium leading-tight tracking-tight text-p32-white sm:text-xl">
            {person.name}
          </span>
          <span className="mt-2 block space-y-0.5 text-sm leading-snug text-p32-gray-300">
            {person.roles.map((role) => (
              <span key={role} className="block">
                {role}
              </span>
            ))}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

function GroupHeader({ index, title, count, id }: { index: number; title: string; count: number; id: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-p32-gray-800 pt-4">
      <h3 id={id} className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.16em] text-p32-white sm:text-sm">
        <span className="text-p32-signal">{String(index + 1).padStart(2, "0")}</span>
        <span>{title}</span>
      </h3>
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-p32-gray-500">
        {count} {count === 1 ? "person" : "people"}
      </span>
    </div>
  );
}

export function Personnel() {
  const [board, cyber] = personnel.groups;
  const [titleLead, titleTail] = personnel.title.split(/\s(?=&)/);
  return (
    <div className="p32-container mt-16 md:mt-24">
      <div className="grid gap-6 md:grid-cols-12 md:gap-10">
        <h2
          data-reveal="up"
          className="font-mono text-sm uppercase leading-relaxed tracking-[0.18em] text-p32-signal md:col-span-5 md:text-base"
        >
          {/* Broken deliberately at the ampersand so "&" never hangs alone. */}
          <span className="block">{titleLead}</span>
          <span className="block">{titleTail}</span>
        </h2>
        <div
          data-reveal="up"
          style={{ "--reveal-index": 1 } as CSSProperties}
          className="max-w-[38rem] space-y-4 text-pretty text-lg leading-relaxed text-p32-gray-300 md:col-span-7 md:text-xl"
        >
          <p className="text-p32-white">{personnel.supportOne}</p>
          <p>{personnel.supportTwo}</p>
        </div>
      </div>

      <section aria-labelledby={`${board.id}-title`} className="mt-12 md:mt-16">
        <GroupHeader index={0} title={board.title} count={board.people.length} id={`${board.id}-title`} />
        <ul className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-y-10 sm:gap-x-6 lg:grid-cols-5 md:mt-8">
          {board.people.map((person, i) => (
            <PersonEntry key={person.name} person={person} index={i} />
          ))}
        </ul>
      </section>

      <section aria-labelledby={`${cyber.id}-title`} className="mt-14 md:mt-20">
        <GroupHeader index={1} title={cyber.title} count={cyber.people.length} id={`${cyber.id}-title`} />
        <div className="mt-6 grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-y-10 sm:gap-x-6 lg:grid-cols-5 md:mt-8">
          <ul className="grid grid-cols-1 gap-y-6 sm:col-span-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10">
            {cyber.people.map((person, i) => (
              <PersonEntry key={person.name} person={person} index={i} />
            ))}
          </ul>
          <div
            data-reveal="up"
            style={{ "--reveal-index": 2 } as CSSProperties}
            className="flex flex-col justify-end border-l border-p32-gray-800 pl-5 sm:col-span-1 lg:col-span-2 lg:col-start-4 lg:pl-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-p32-gray-500">Capability</p>
            <Link
              href="/cyber-intelligence"
              className="p32-press group mt-3 inline-flex flex-col text-xl font-medium leading-snug tracking-tight text-p32-white transition-colors hover:text-p32-signal md:text-2xl"
            >
              <span>Cyber Intelligence &amp; Exposure</span>
              <span className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-p32-signal">
                Explore capability
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
