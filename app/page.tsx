import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone, ArrowRight } from "lucide-react";
import { business, locations } from "@/lib/data";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-valley-navy bg-stitch-pattern text-valley-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 sm:py-24">
          <Image
            src="/images/valley-sports-cards-logo.png"
            alt="The Valley Sports Cards & Collectibles"
            width={520}
            height={373}
            priority
            className="h-auto w-full max-w-md"
          />
          <p className="max-w-2xl font-display text-lg text-valley-cream/90 sm:text-xl">
            Two Mohawk Valley storefronts, one lifelong hobby: buying, selling, and
            trading sports cards &amp; collectibles in Herkimer and Cooperstown &mdash;
            home of the Baseball Hall of Fame.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-md bg-valley-red px-6 py-3 font-display text-sm uppercase tracking-wide text-white transition-colors hover:bg-valley-red-dark"
            >
              Shop the Store <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-md border border-valley-gold/50 px-6 py-3 font-display text-sm uppercase tracking-wide text-valley-cream transition-colors hover:border-valley-gold hover:text-valley-gold"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-display text-3xl text-valley-navy">
          Two Locations, One Valley
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-valley-navy/70">
          Stop in and dig through the boxes &mdash; both shops carry singles, hobby
          boxes, mini helmets, memorabilia, and supplies for every collector.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="rounded-lg border border-valley-navy/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="font-display text-2xl text-valley-red">{loc.name}</h3>
              <div className="mt-4 space-y-3 text-sm text-valley-navy/80">
                <p className="flex items-start gap-2">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-valley-gold" />
                  <span>
                    {loc.address}, {loc.city}, {loc.state} {loc.zip}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={18} className="shrink-0 text-valley-gold" />
                  <a href={`tel:${loc.phone.replace(/[^\d]/g, "")}`}>{loc.phone}</a>
                </p>
                <div className="flex items-start gap-2">
                  <Clock size={18} className="mt-0.5 shrink-0 text-valley-gold" />
                  <ul>
                    {loc.hours.map((h) => (
                      <li key={h.days}>
                        <span className="font-medium">{h.days}:</span> {h.time}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  loc.mapQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm font-medium text-valley-red hover:underline"
              >
                Get Directions &rarr;
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-valley-cream/60 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl text-valley-navy">
            Can&apos;t Make It In? Shop {business.ebayHandle} on eBay
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-valley-navy/70">
            Every card and piece of memorabilia in our eBay store ships straight
            from our shelves &mdash; sortable and filterable right here on our site.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-valley-navy px-6 py-3 font-display text-sm uppercase tracking-wide text-valley-cream transition-colors hover:bg-valley-navy-light"
          >
            Browse Listings <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
