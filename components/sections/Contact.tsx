"use client";

import { useEffect, useRef } from "react";
import { P32LogoOnDark } from "@/components/Logo";
import { contact } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/gsapSetup";
import { EASE_OUT } from "@/lib/motion";

// Deliberately the calmest motion on the page: one slow, single settle as
// the section arrives, nothing after. The system has resolved; motion
// reduces here to signal that, not to demonstrate more of it.
export function Contact() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const content = contentRef.current;
    if (!content || reducedMotion) return;

    ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.set(content, { opacity: 0, y: 16 });
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: EASE_OUT,
        scrollTrigger: {
          trigger: content,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, content);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="contact" className="p32-section bg-p32-black text-p32-white">
      <div ref={contentRef} className="p32-container">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-p32-gray-500">
              Contact
            </h2>
            <a
              href={contact.emailHref}
              className="mt-6 block font-display text-3xl font-medium tracking-tight transition-colors hover:text-p32-signal sm:text-5xl md:text-6xl"
            >
              {contact.email}
            </a>
            <a
              href={contact.phoneHref}
              className="mt-4 block text-lg text-p32-gray-300 transition-colors hover:text-p32-white md:text-xl"
            >
              {contact.phone}
            </a>
            <p className="mt-2 text-lg text-p32-gray-500 md:text-xl">{contact.address}</p>
          </div>
          <P32LogoOnDark height={30} />
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-p32-gray-800 pt-6 text-xs text-p32-gray-600 md:mt-28">
          <span>© {new Date().getFullYear()} P32</span>
          <span>Tel Aviv</span>
        </div>
      </div>
    </section>
  );
}
