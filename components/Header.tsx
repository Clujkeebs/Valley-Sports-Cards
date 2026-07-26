import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "@/components/SocialIcons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-valley-gold/20 bg-valley-navy text-valley-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/valley-sports-cards-logo.png"
            alt="The Valley Sports Cards & Collectibles"
            width={230}
            height={165}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-8 font-display text-sm uppercase tracking-wide sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-valley-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:block">
          <SocialIcons />
        </div>

        <MobileNav />
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <details className="relative sm:hidden">
      <summary className="list-none cursor-pointer rounded border border-valley-gold/40 px-3 py-2 text-sm">
        Menu
      </summary>
      <div className="absolute right-0 top-full mt-2 flex w-48 flex-col gap-3 rounded-md border border-valley-gold/30 bg-valley-navy p-4 shadow-xl">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm">
            {link.label}
          </Link>
        ))}
        <SocialIcons className="pt-2" />
      </div>
    </details>
  );
}
