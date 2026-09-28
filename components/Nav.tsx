import Link from "next/link";
import { P32LogoOnDark } from "./Logo";

// Two restrained links only. On the homepage the extra entry is the Cyber
// Intelligence page; on that page it becomes the route back to the main
// site (the logo also returns home there). next/link applies the GitHub
// Pages basePath automatically, so these work in the static export.
// Links back to "/" skip prefetch: prefetching the homepage pulls in its
// Hero film's preload hints, which the browser then flags as unused here.
export function Nav({ page = "home" }: { page?: "home" | "cyber" }) {
  const isHome = page === "home";
  const linkClass =
    "p32-press font-mono text-xs uppercase tracking-[0.12em] text-p32-white/80 transition-colors hover:text-p32-white sm:text-sm";
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="p32-container flex items-center justify-between gap-4 py-5 md:py-6">
        <Link
          href={isHome ? "#top" : "/"}
          prefetch={isHome ? undefined : false}
          aria-label={isHome ? "P32, back to top" : "P32 home"}
          className="block shrink-0"
        >
          <P32LogoOnDark height={22} priority />
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 sm:gap-8">
          {isHome ? (
            <Link href="/cyber-intelligence" className={linkClass}>
              Cyber Intelligence
            </Link>
          ) : (
            <Link href="/" prefetch={false} className={linkClass}>
              Main site
            </Link>
          )}
          <Link href="#contact" className={linkClass}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
