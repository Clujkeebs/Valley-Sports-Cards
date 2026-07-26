import type { Metadata } from "next";
import { business, locations } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of The Valley Sports Cards & Collectibles, family-run in Herkimer and Cooperstown, NY since 2019.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl text-valley-navy">Our Story</h1>
      <p className="mt-2 font-display text-lg italic text-valley-red">
        Herkimer &amp; Cooperstown, New York
      </p>

      <div className="prose prose-neutral mt-8 max-w-none text-valley-navy/90 prose-headings:font-display prose-headings:text-valley-navy">
        <p>
          {business.name} is a family-run card shop rooted in New York&apos;s
          Mohawk Valley, owned and operated by Richard and Marcia Lyon. What
          started in {business.foundedYear} as a small baseball card counter in
          Herkimer has grown into a full-fledged hobby destination, carrying
          singles, sealed wax, mini helmets, framed memorabilia, and
          collecting supplies for every sport &mdash; not just baseball.
        </p>
        <p>
          The Lyons run two storefronts today. The original shop sits at 105 S
          Main St in Herkimer, right in the heart of the Mohawk Valley. The
          second is in Cooperstown &mdash; the small village that, fittingly
          for a card shop, is also home to the National Baseball Hall of Fame
          &mdash; putting Hall of Fame history and a case full of cards on the
          same Main Street.
        </p>
        <p>
          Whatever brings you in &mdash; chasing a rookie card, finishing a
          set, framing a piece for the wall, or just looking to talk shop
          &mdash; the Lyons and their team buy, sell, and trade across
          baseball, football, basketball, and hockey. Both locations stock
          hobby boxes, hall-of-famer and star-player singles, mini helmets,
          and the supplies serious collectors need to protect what they find.
        </p>
        <p>
          Can&apos;t make it to Herkimer or Cooperstown? The Valley also runs
          an active eBay store under the handle{" "}
          <a
            href={business.ebayStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {business.ebayHandle}
          </a>
          , with thousands of cards, Starting Lineup figures, and memorabilia
          shipped to collectors nationwide. You can browse and filter that
          same inventory right here on our{" "}
          <a href="/shop">Shop page</a>.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {locations.map((loc) => (
          <div key={loc.id} className="rounded-lg border border-valley-navy/10 bg-white p-5">
            <h2 className="font-display text-xl text-valley-red">{loc.name}</h2>
            <p className="mt-1 text-sm text-valley-navy/70">
              {loc.address}, {loc.city}, {loc.state} {loc.zip}
            </p>
            <p className="text-sm text-valley-navy/70">{loc.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
