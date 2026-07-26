import type { Metadata } from "next";
import Link from "next/link";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ListingCard } from "@/components/shop/ListingCard";
import { EbayFallback } from "@/components/shop/EbayFallback";
import { EbayNotConfiguredError, searchListings, type EbaySort } from "@/lib/ebay";
import { business } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse The Valley Sports Cards & Collectibles' live eBay inventory — baseball, football, basketball, and hockey cards, memorabilia, and more.",
};

const PAGE_SIZE = 24;

type ShopPageProps = {
  searchParams: {
    sort?: string;
    category?: string;
    condition?: string;
    min?: string;
    max?: string;
    page?: string;
  };
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  let items: Awaited<ReturnType<typeof searchListings>>["items"] = [];
  let total = 0;
  let fallback: "not-configured" | "error" | null = null;

  try {
    const result = await searchListings({
      query: searchParams.category,
      sort: (searchParams.sort as EbaySort) || undefined,
      conditionIds: searchParams.condition?.split(",").filter(Boolean),
      minPrice: searchParams.min ? Number(searchParams.min) : undefined,
      maxPrice: searchParams.max ? Number(searchParams.max) : undefined,
      limit: PAGE_SIZE,
      offset,
    });
    items = result.items;
    total = result.total;
  } catch (err) {
    fallback = err instanceof EbayNotConfiguredError ? "not-configured" : "error";
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-valley-navy">Shop the Store</h1>
        <p className="mt-2 max-w-2xl text-valley-navy/70">
          Live inventory from our eBay store,{" "}
          <a
            href={business.ebayStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-valley-red hover:underline"
          >
            {business.ebayHandle}
          </a>
          . Sort and filter below, then click through to eBay to buy.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        <ShopFilters />

        <div>
          {fallback ? (
            <div className="grid grid-cols-1">
              <EbayFallback reason={fallback} />
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-lg border border-valley-navy/10 bg-white p-10 text-center text-valley-navy/60">
              No listings matched your filters. Try widening your search.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((item) => (
                  <ListingCard key={item.id} item={item} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-4">
                  <PageLink
                    searchParams={searchParams}
                    page={page - 1}
                    disabled={page <= 1}
                    label="Previous"
                  />
                  <span className="text-sm text-valley-navy/60">
                    Page {page} of {totalPages}
                  </span>
                  <PageLink
                    searchParams={searchParams}
                    page={page + 1}
                    disabled={page >= totalPages}
                    label="Next"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PageLink({
  page,
  disabled,
  label,
  searchParams,
}: {
  page: number;
  disabled: boolean;
  label: string;
  searchParams: ShopPageProps["searchParams"];
}) {
  if (disabled) {
    return (
      <span className="cursor-not-allowed rounded-md border border-valley-navy/10 px-4 py-2 text-sm text-valley-navy/30">
        {label}
      </span>
    );
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value && key !== "page") params.set(key, value);
  }
  params.set("page", String(page));

  return (
    <Link
      href={`?${params.toString()}`}
      className="rounded-md border border-valley-navy/20 px-4 py-2 text-sm hover:border-valley-red hover:text-valley-red"
    >
      {label}
    </Link>
  );
}
