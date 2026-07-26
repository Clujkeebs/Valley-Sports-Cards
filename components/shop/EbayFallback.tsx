import { ShoppingBag } from "lucide-react";
import { business } from "@/lib/data";

export function EbayFallback({ reason }: { reason: "not-configured" | "error" }) {
  return (
    <div className="col-span-full flex flex-col items-center rounded-lg border border-dashed border-valley-navy/20 bg-white p-10 text-center">
      <ShoppingBag size={36} className="text-valley-gold" />
      <h2 className="mt-4 font-display text-xl text-valley-navy">
        {reason === "not-configured"
          ? "Live eBay Listings Coming Soon"
          : "We Couldn't Load Live Listings Right Now"}
      </h2>
      <p className="mt-2 max-w-md text-sm text-valley-navy/70">
        {reason === "not-configured"
          ? "This site is ready to pull listings directly from our eBay store once API credentials are added (see the README). In the meantime, browse everything currently for sale directly on eBay."
          : "eBay's API didn't respond. Please try again shortly, or shop the store directly on eBay in the meantime."}
      </p>
      <a
        href={business.ebayStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-md bg-valley-red px-5 py-2.5 font-display text-sm uppercase tracking-wide text-white hover:bg-valley-red-dark"
      >
        Shop {business.ebayHandle} on eBay
      </a>
    </div>
  );
}
