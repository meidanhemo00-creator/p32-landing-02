import { P32LogoOnDark } from "@/components/Logo";
import { contact } from "@/lib/content";
import { SectionBlend } from "@/components/SectionBlend";

// Calm dark conclusion, static. No motion needed to signal that the system
// has resolved -- it simply presents the functional contact details.
export function Contact() {
  return (
    <section id="contact" className="p32-section relative bg-p32-black text-p32-white">
      <SectionBlend from="white" />
      <div className="reveal-body p32-container relative flex flex-col items-center text-center">
        <div className="glass-dark flex w-full max-w-xl flex-col items-center rounded-3xl px-8 py-14 md:px-16 md:py-16">
          <P32LogoOnDark height={26} />
          <h2 className="mt-10 font-mono text-xs uppercase tracking-[0.14em] text-p32-gray-500">
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

          <div className="mt-20 flex w-full max-w-md items-center justify-between border-t border-p32-gray-800 pt-6 text-xs text-p32-gray-600 md:mt-28">
            <span>© {new Date().getFullYear()} P32</span>
            <span>Tel Aviv</span>
          </div>
        </div>
      </div>
    </section>
  );
}
