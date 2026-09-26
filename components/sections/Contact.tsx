import { P32LogoOnDark } from "@/components/Logo";
import { contact } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" className="p32-section bg-p32-black text-p32-white">
      <div className="p32-container">
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
            <p className="mt-2 text-lg text-p32-gray-500 md:text-xl">
              {contact.address}
            </p>
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
