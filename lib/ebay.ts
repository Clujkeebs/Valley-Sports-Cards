import { business } from "@/lib/data";

export class EbayNotConfiguredError extends Error {
  constructor() {
    super("eBay API credentials are not configured");
    this.name = "EbayNotConfiguredError";
  }
}

export type EbayListing = {
  id: string;
  title: string;
  url: string;
  imageUrl: string | null;
  price: number | null;
  currency: string;
  condition: string | null;
  buyingOptions: string[];
  itemEndDate: string | null;
  createdDate: string | null;
};

export type EbaySort = "price" | "-price" | "newlyListed" | "endingSoonest" | "";

export type EbaySearchParams = {
  query?: string;
  sort?: EbaySort;
  conditionIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new EbayNotConfiguredError();
  }

  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "https://api.ebay.com/oauth/api_scope",
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`eBay OAuth token request failed: ${res.status}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.value;
}

function buildFilter(params: EbaySearchParams): string {
  const filters: string[] = [`sellers:{${business.ebayUsername}}`];

  if (params.conditionIds && params.conditionIds.length > 0) {
    filters.push(`conditionIds:{${params.conditionIds.join("|")}}`);
  }

  if (params.minPrice !== undefined || params.maxPrice !== undefined) {
    const min = params.minPrice ?? 0;
    const max = params.maxPrice ?? "";
    filters.push(`price:[${min}..${max}]`);
    filters.push("priceCurrency:USD");
  }

  return filters.join(",");
}

export async function searchListings(
  params: EbaySearchParams = {}
): Promise<{ items: EbayListing[]; total: number }> {
  const token = await getAccessToken();

  const searchParams = new URLSearchParams();
  searchParams.set("q", params.query?.trim() || business.shortName);
  searchParams.set("filter", buildFilter(params));
  searchParams.set("limit", String(params.limit ?? 48));
  searchParams.set("offset", String(params.offset ?? 0));
  if (params.sort) {
    searchParams.set("sort", params.sort);
  }

  const res = await fetch(
    `https://api.ebay.com/buy/browse/v1/item_summary/search?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`eBay Browse API request failed: ${res.status}`);
  }

  const data = await res.json();

  const items: EbayListing[] = (data.itemSummaries ?? []).map((item: any) => ({
    id: item.itemId,
    title: item.title,
    url: item.itemWebUrl,
    imageUrl: item.image?.imageUrl ?? item.thumbnailImages?.[0]?.imageUrl ?? null,
    price: item.price?.value ? Number(item.price.value) : null,
    currency: item.price?.currency ?? "USD",
    condition: item.condition ?? null,
    buyingOptions: item.buyingOptions ?? [],
    itemEndDate: item.itemEndDate ?? null,
    createdDate: item.itemCreationDate ?? null,
  }));

  return { items, total: data.total ?? items.length };
}
