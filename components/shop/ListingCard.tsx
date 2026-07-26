import Image from "next/image";
import { Gavel, Clock } from "lucide-react";
import type { EbayListing } from "@/lib/ebay";

export function ListingCard({ item }: { item: EbayListing }) {
  const isAuction = item.buyingOptions.includes("AUCTION");

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border border-valley-navy/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square w-full bg-valley-cream">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-3 transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-valley-navy/40">
            No Image
          </div>
        )}
        {isAuction && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-valley-navy/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-valley-cream">
            <Gavel size={10} /> Auction
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="line-clamp-2 text-sm font-medium text-valley-navy">{item.title}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-display text-lg text-valley-red">
            {item.price !== null
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: item.currency,
                }).format(item.price)
              : "See Listing"}
          </span>
          {item.condition && (
            <span className="text-xs text-valley-navy/60">{item.condition}</span>
          )}
        </div>
        {item.itemEndDate && (
          <p className="flex items-center gap-1 text-xs text-valley-navy/50">
            <Clock size={12} /> Ends {new Date(item.itemEndDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </a>
  );
}
