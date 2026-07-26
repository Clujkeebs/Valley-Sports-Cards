import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { business, locations } from "@/lib/data";
import { SocialIcons } from "@/components/SocialIcons";

export function Footer() {
  return (
    <footer className="border-t border-valley-gold/20 bg-valley-navy text-valley-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="font-display text-lg text-valley-gold">{business.name}</h3>
          <p className="mt-3 text-sm text-valley-cream/80">{business.tagline}</p>
          <SocialIcons className="mt-5" />
        </div>

        {locations.map((loc) => (
          <div key={loc.id}>
            <h4 className="font-display text-base uppercase tracking-wide text-valley-gold">
              {loc.name}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-valley-cream/80">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>
                  {loc.address}
                  <br />
                  {loc.city}, {loc.state} {loc.zip}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <a href={`tel:${loc.phone.replace(/[^\d]/g, "")}`}>{loc.phone}</a>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-valley-gold/10 py-4 text-center text-xs text-valley-cream/60">
        <p>
          <a href={`mailto:${business.email}`} className="inline-flex items-center gap-1 hover:text-valley-gold">
            <Mail size={14} /> {business.email}
          </a>
        </p>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.{" "}
          <Link href="/about" className="hover:text-valley-gold">
            Our Story
          </Link>
        </p>
      </div>
    </footer>
  );
}
