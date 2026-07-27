import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "@/components/SocialIcons";
import { business } from "@/lib/data";

const NAV_LINKS = [
  { href: "/", label: "Home", external: false },
  { href: "/about", label: "About", external: false },
  { href: business.ebayStoreUrl, label: "Shop", external: true },
];

function NavLink({
  href,
  label,
  external,
  className,
}: {
  href: string;
  label: string;
  external: boolean;
  className?: string;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-valley-gold/20 bg-valley-navy text-valley-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:px-6">
        <Link href="/" className="flex items-center gap-3 justify-self-start">
          <Image
            src="/images/valley-sports-cards-logo.png"
            alt="The Valley Sports Cards & Collectibles"
            width={230}
            height={165}
            priority
            className="h-12 w-auto rounded-md bg-valley-cream px-2 py-1 sm:h-14"
          />
        </Link>

        <nav className="hidden items-center justify-center gap-8 font-display text-sm uppercase tracking-wide sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              className="transition-colors hover:text-valley-gold"
            />
          ))}
        </nav>

        <div className="hidden justify-self-end sm:block">
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
          <NavLink key={link.href} {...link} className="text-sm" />
        ))}
        <SocialIcons className="pt-2" />
      </div>
    </details>
  );
}
