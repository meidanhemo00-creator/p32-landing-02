import Link from "next/link";
import { P32LogoOnDark } from "./Logo";

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="p32-container flex items-center justify-between py-5 md:py-6">
        <Link href="#top" aria-label="P32, back to top" className="block">
          <P32LogoOnDark height={22} priority />
        </Link>
        <Link
          href="#contact"
          className="p32-press font-mono text-sm text-p32-white/80 transition-colors hover:text-p32-white"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
