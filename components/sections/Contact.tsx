import Link from "next/link";
import { P32LogoOnDark } from "@/components/Logo";
import { contact } from "@/lib/content";

// Calm dark conclusion, static. No motion needed to signal that the system
// has resolved -- it simply presents the functional contact details.
export function Contact({ page = "home" }: { page?: "home" | "cyber" }) {
  return (
    <section id="contact" className="p32-section bg-p32-black text-p32-white">
      <div data-reveal="up" className="p32-container flex flex-col items-center text-center">
        <P32LogoOnDark height={26} />
        <h2 className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-p32-gray-500">
          Contact
        </h2>
        <a
          href={contact.emailHref}
          className="p32-press mt-6 block font-display text-3xl font-medium tracking-tight transition-colors hover:text-p32-signal sm:text-5xl md:text-6xl"
        >
          {contact.email}
        </a>
        <a
          href={contact.phoneHref}
          className="p32-press mt-4 block text-lg text-p32-gray-300 transition-colors hover:text-p32-white md:text-xl"
        >
          {contact.phone}
        </a>
        <p className="mt-2 text-lg text-p32-gray-500 md:text-xl">{contact.address}</p>

        <div className="mt-12 flex w-full max-w-md items-center justify-between border-t border-p32-gray-800 pt-6 text-xs text-p32-gray-600 md:mt-28">
          <span>© {new Date().getFullYear()} P32</span>
          {page === "home" ? (
            <Link href="/cyber-intelligence" className="transition-colors hover:text-p32-white">
              Cyber Intelligence
            </Link>
          ) : (
            <Link href="/" prefetch={false} className="transition-colors hover:text-p32-white">
              Main site
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
