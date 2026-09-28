import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { NasaPhoto } from "@/components/media/NasaPhoto";
import { cyber, contact, personnel } from "@/lib/content";
import { assetPath } from "@/lib/basePath";
import { splitWords } from "@/lib/splitWords";

// Cyber Intelligence & Exposure -- the one-pager's approved content rebuilt
// in the site's own language. Unlike the homepage's centered axis, this is a
// reading page, so it runs left-aligned on a 12-column grid. Sections
// alternate dark/light; every photograph is true grayscale via NasaPhoto;
// pale blue appears only on indexes, rules, and the process track.

const idx = (i: number) => String(i + 1).padStart(2, "0");

function SectionLabel({ children, id, tone = "dark" }: { children: string; id: string; tone?: "dark" | "light" }) {
  return (
    <h2
      id={id}
      className={`font-mono text-xs uppercase tracking-[0.18em] sm:text-sm ${
        tone === "dark" ? "text-p32-signal" : "text-p32-signal-deep"
      }`}
    >
      {children}
    </h2>
  );
}

export function CyberHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden bg-p32-black text-p32-white md:min-h-[92vh]"
    >
      <Nav page="cyber" />
      <NasaPhoto
        src="/media/stock/optimized/satellite-orbit.webp"
        alt="A communications satellite in orbit above cloud-covered Earth"
        objectPosition="62% center"
        priority
        contrast={1.1}
        gradient="180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.8) 78%, rgba(0,0,0,0.95) 100%"
      />
      <div className="p32-container relative pt-32 pb-14 md:pb-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-p32-signal sm:text-sm">{cyber.label}</p>
        <h1
          data-reveal="words"
          className="mt-5 max-w-5xl font-display text-[10vw] font-medium uppercase leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {splitWords(cyber.headline)}
        </h1>
        <p
          data-reveal="up"
          style={{ "--reveal-index": 4 } as CSSProperties}
          className="mt-8 max-w-[62ch] text-pretty text-base leading-relaxed text-p32-gray-300 sm:text-lg md:mt-10 md:text-xl"
        >
          {cyber.intro}
        </p>
      </div>
    </section>
  );
}

// Three questions as one chain of decisions -- reach, priority, ownership --
// joined by a single vertical rule through their indexes rather than split
// into three separate cards.
export function CyberProblem() {
  const { problem } = cyber;
  return (
    <section aria-labelledby="problem-title" className="p32-section tx-grain-light bg-p32-white text-p32-black">
      <div className="p32-container relative z-[2] grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <SectionLabel id="problem-title" tone="light">
            {problem.title}
          </SectionLabel>
        </div>
        <div className="md:col-span-8">
          <p data-reveal="up" className="max-w-[40ch] text-pretty text-xl leading-snug tracking-tight text-p32-gray-700 sm:text-2xl md:text-3xl">
            {problem.lead}
          </p>
          <ol className="relative mt-10 md:mt-14">
            <span aria-hidden="true" className="absolute top-3 bottom-3 left-[0.6rem] w-px bg-p32-signal-deep/40 sm:left-[0.7rem]" />
            {problem.questions.map((q, i) => (
              <li
                key={q}
                data-reveal="up"
                style={{ "--reveal-index": i + 1 } as CSSProperties}
                className="relative grid grid-cols-[1.25rem_1fr] gap-x-5 border-t border-p32-gray-100 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[1.5rem_1fr] sm:gap-x-8 md:py-8"
              >
                <span
                  aria-hidden="true"
                  className="relative z-[1] mt-2 block size-[1.25rem] border border-p32-signal-deep bg-p32-white sm:size-[1.5rem]"
                />
                <div>
                  <span className="font-mono text-xs tracking-[0.14em] text-p32-signal-deep">{idx(i)}</span>
                  <p className="mt-1 text-balance text-2xl font-medium leading-tight tracking-tight sm:text-3xl md:text-4xl">
                    {q}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// Paired rows. On desktop a two-column comparison with one header row; on
// mobile each pair stacks with both labels visible. The labels stay in the
// DOM (visually hidden on desktop) so screen readers get them per row.
export function CyberDifferent() {
  const { different } = cyber;
  return (
    <section aria-labelledby="different-title" className="p32-section tx-grain-dark bg-p32-black text-p32-white">
      <div className="p32-container relative z-[2]">
        <SectionLabel id="different-title">{different.title}</SectionLabel>

        <div
          aria-hidden="true"
          className="mt-10 hidden grid-cols-[minmax(0,1fr)_5rem_minmax(0,1.35fr)] border-b border-p32-gray-700 pb-4 font-mono text-xs uppercase tracking-[0.16em] md:grid"
        >
          <span className="text-p32-gray-500">{different.typicalLabel}</span>
          <span />
          <span className="text-p32-signal">{different.p32Label}</span>
        </div>

        <ul className="mt-8 md:mt-0">
          {different.rows.map(([typical, ours], i) => (
            <li
              key={typical}
              data-reveal="up"
              style={{ "--reveal-index": i } as CSSProperties}
              className="grid gap-3 border-t border-p32-gray-800 py-6 first:border-t-0 md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1.35fr)] md:items-baseline md:gap-0 md:border-t md:py-7 md:first:border-t-0"
            >
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-p32-gray-600 md:sr-only">
                  {different.typicalLabel}
                </span>
                <p className="mt-1 text-base text-p32-gray-500 md:mt-0 md:text-lg">{typical}</p>
              </div>
              <span aria-hidden="true" className="hidden h-px w-10 self-center bg-p32-signal-deep md:block" />
              <div className="border-l border-p32-signal-deep pl-4 md:border-l-0 md:pl-0">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-p32-signal md:sr-only">
                  {different.p32Label}
                </span>
                <p className="mt-1 text-pretty text-lg font-medium leading-snug tracking-tight md:mt-0 md:text-2xl">
                  {ours}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Links the page to the people behind it without repeating the full
// register: the two cyber-leadership entries, then a route to the rest.
export function CyberWhoWeAre() {
  const { whoWeAre } = cyber;
  const leads = personnel.groups[1].people;
  return (
    <section aria-labelledby="who-title" className="p32-section bg-p32-gray-050 text-p32-black">
      <div className="p32-container grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <SectionLabel id="who-title" tone="light">
            {whoWeAre.title}
          </SectionLabel>
          <p
            data-reveal="up"
            className="mt-6 max-w-[22ch] text-balance text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:mt-8 md:text-5xl"
          >
            {whoWeAre.lead}
          </p>
          <p
            data-reveal="up"
            style={{ "--reveal-index": 1 } as CSSProperties}
            className="mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed text-p32-gray-700 md:text-xl"
          >
            {whoWeAre.body}
          </p>
        </div>

        <div data-reveal="up" style={{ "--reveal-index": 2 } as CSSProperties} className="md:col-span-5 md:col-start-8 md:pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-p32-gray-600">
            {personnel.groups[1].title}
          </p>
          <ul className="mt-4 border-t border-p32-gray-300">
            {leads.map((person) => (
              <li key={person.name} className="flex items-center gap-4 border-b border-p32-gray-300 py-4">
                <div className="relative size-16 shrink-0 overflow-hidden bg-p32-gray-100 sm:size-20">
                  <Image
                    src={assetPath(`/media/team/portraits/${person.portrait}.webp`)}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover", filter: "grayscale(1)" }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-medium leading-tight tracking-tight">{person.name}</p>
                  <p className="mt-1 text-sm leading-snug text-p32-gray-700">{person.roles.join(", ")}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/#team"
            prefetch={false}
            className="p32-press mt-5 inline-block font-mono text-xs uppercase tracking-[0.14em] text-p32-signal-deep underline-offset-4 hover:underline"
          >
            View the full organizational structure
          </Link>
        </div>
      </div>
    </section>
  );
}

// Five stages on one track. The track draws once as the list enters view
// (data-reveal="line", see globals.css) -- a one-time entrance, never
// scrubbed or pinned. Vertical on small screens, horizontal from lg. ACT is
// the track's end point: the decision the page's headline promises.
export function CyberHowWeWork() {
  const { howWeWork } = cyber;
  const last = howWeWork.stages.length - 1;
  return (
    <section aria-labelledby="work-title" className="relative overflow-hidden bg-p32-black py-16 text-p32-white md:py-28">
      <NasaPhoto
        src="/media/nasa/optimized/city-lights-lucknow.webp"
        alt=""
        objectPosition="center"
        contrast={1.25}
        gradient="180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%"
      />
      <div className="p32-container relative">
        <SectionLabel id="work-title">{howWeWork.title}</SectionLabel>
        <ol className="relative mt-10 grid gap-9 md:mt-16 lg:grid-cols-5 lg:gap-6">
          <span
            aria-hidden="true"
            data-reveal="line"
            className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-p32-signal-deep lg:top-[5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:origin-left"
          />
          {howWeWork.stages.map((stage, i) => {
            const isAct = i === last;
            return (
              <li
                key={stage.name}
                data-reveal="up"
                style={{ "--reveal-index": i + 2 } as CSSProperties}
                className="relative grid grid-cols-[11px_1fr] gap-x-5 lg:block"
              >
                <span
                  aria-hidden="true"
                  className={`relative z-[1] mt-1.5 block size-[11px] border lg:mt-0 ${
                    isAct ? "border-p32-signal bg-p32-signal" : "border-p32-signal-deep bg-p32-black"
                  }`}
                />
                <div className="lg:mt-8">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-p32-gray-500">{idx(i)}</span>
                  <h3
                    className={`mt-1 font-mono text-xl uppercase tracking-[0.08em] md:text-2xl ${
                      isAct ? "text-p32-signal" : "text-p32-white"
                    }`}
                  >
                    {stage.name}
                  </h3>
                  <p className="mt-2 max-w-[30ch] text-pretty text-base leading-snug text-p32-gray-300 md:text-lg">
                    {stage.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

// Four capability groups as editorial rows under one wide image band: the
// group name and its count on the left, its capabilities as ruled lines on
// the right, read in one column so each group's order stays obvious. No
// card chrome.
export function CyberDeliver() {
  const { deliver } = cyber;
  return (
    <section aria-labelledby="deliver-title" className="bg-p32-white pb-14 text-p32-black md:pb-28">
      <div className="relative h-[220px] w-full overflow-hidden bg-p32-black sm:h-[280px] md:h-[360px]">
        <NasaPhoto
          src="/media/nasa/optimized/city-lights-lahore.webp"
          alt="The city lights of Lahore at night, photographed from the International Space Station (NASA)"
          objectPosition="center 45%"
          contrast={1.3}
          gradient="180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%"
          reveal
        />
      </div>
      <div className="p32-container mt-12 md:mt-20">
        <SectionLabel id="deliver-title" tone="light">
          {deliver.title}
        </SectionLabel>
        <div className="mt-8 md:mt-12">
          {deliver.groups.map((group, i) => (
            <div
              key={group.name}
              data-reveal="up"
              style={{ "--reveal-index": i } as CSSProperties}
              className="grid gap-4 border-t border-p32-black py-7 md:grid-cols-12 md:gap-10 md:py-10"
            >
              <div className="md:col-span-4">
                <h3 className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl">{group.name}</h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-p32-gray-600">
                  {String(group.items.length).padStart(2, "0")} capabilities
                </p>
              </div>
              <ul className="md:col-span-8 lg:col-span-7">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-t border-p32-gray-100 py-3 text-base leading-snug text-p32-gray-700 first:border-t-0 first:pt-0 md:text-lg"
                  >
                    <span aria-hidden="true" className="mt-[0.55em] block h-px w-3 shrink-0 bg-p32-signal-deep" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Four stages toward independence. Under the stages, two opposing bars
// show ownership passing from P32 to the client's own team -- the point
// of the Handover stage, drawn rather than claimed.
export function CyberEngagement() {
  const { engagement } = cyber;
  return (
    <section aria-labelledby="engage-title" className="p32-section tx-grain-dark bg-p32-black text-p32-white">
      <div className="p32-container relative z-[2]">
        <SectionLabel id="engage-title">{engagement.title}</SectionLabel>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-6">
          {engagement.stages.map((stage, i) => (
            <li
              key={stage.name}
              data-reveal="up"
              style={{ "--reveal-index": i } as CSSProperties}
              className="border-t border-p32-gray-700 pt-5"
            >
              <span className="font-mono text-sm tracking-[0.14em] text-p32-signal">{idx(i)}</span>
              <h3 className="mt-2 font-mono text-xl uppercase tracking-[0.08em] md:text-2xl">{stage.name}</h3>
              <p className="mt-3 max-w-[34ch] text-pretty text-base leading-relaxed text-p32-gray-300 md:text-lg">
                {stage.detail}
              </p>
            </li>
          ))}
        </ol>

        <div data-reveal="up" style={{ "--reveal-index": 4 } as CSSProperties} className="mt-12 md:mt-16" aria-hidden="true">
          <div className="h-1.5 w-full bg-[linear-gradient(90deg,var(--p32-white)_0%,rgba(255,255,255,0)_100%)]" />
          <div className="mt-1.5 h-1.5 w-full bg-[linear-gradient(90deg,rgba(157,210,226,0)_0%,var(--p32-signal)_100%)]" />
          <div className="mt-3 flex justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em]">
            <span className="text-p32-white">{engagement.scaleStart}</span>
            <span className="text-right text-p32-signal">{engagement.scaleEnd}</span>
          </div>
        </div>
        <p className="sr-only">
          Across the four stages, ownership moves from P32 to your own team.
        </p>
      </div>
    </section>
  );
}

export function CyberClosing() {
  return (
    <section aria-labelledby="closing-title" className="relative overflow-hidden bg-p32-black py-24 text-p32-white md:py-40">
      <NasaPhoto
        src="/media/nasa/optimized/earths-limb-pacific.webp"
        alt="The sun illuminating Earth's limb above the Pacific Ocean, seen from the International Space Station (NASA)"
        objectPosition="center 70%"
        gradient="180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.85) 100%"
        reveal
      />
      <div className="p32-container relative">
        <h2
          id="closing-title"
          data-reveal="words"
          className="max-w-5xl font-display text-[9.5vw] font-medium uppercase leading-[1] tracking-tight sm:text-6xl md:text-7xl"
        >
          {splitWords(cyber.headline)}
        </h2>
        <div data-reveal="up" style={{ "--reveal-index": 4 } as CSSProperties} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 md:mt-14">
          <a
            href={contact.emailHref}
            className="p32-press inline-flex h-12 items-center justify-center bg-p32-white px-7 font-mono text-sm uppercase tracking-[0.12em] text-p32-black transition-colors hover:bg-p32-signal"
          >
            Contact P32
          </a>
          <Link
            href="/"
            prefetch={false}
            className="p32-press inline-flex h-12 items-center justify-center border border-p32-gray-500 px-7 font-mono text-sm uppercase tracking-[0.12em] text-p32-white transition-colors hover:border-p32-white"
          >
            Back to main site
          </Link>
        </div>
      </div>
    </section>
  );
}
