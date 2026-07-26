"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ebayCategoryGroups, conditionOptions } from "@/lib/data";

const SORT_OPTIONS = [
  { value: "", label: "Best Match" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "newlyListed", label: "Newest" },
  { value: "endingSoonest", label: "Ending Soonest" },
];

export function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [minPrice, setMinPrice] = useState(searchParams.get("min") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") ?? "");

  useEffect(() => {
    setMinPrice(searchParams.get("min") ?? "");
    setMaxPrice(searchParams.get("max") ?? "");
  }, [searchParams]);

  const currentSort = searchParams.get("sort") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentConditions = searchParams.get("condition")?.split(",").filter(Boolean) ?? [];

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function toggleCondition(ebayId: string) {
    const next = currentConditions.includes(ebayId)
      ? currentConditions.filter((id) => id !== ebayId)
      : [...currentConditions, ebayId];
    updateParams({ condition: next.join(",") || null });
  }

  function applyPriceRange(e: React.FormEvent) {
    e.preventDefault();
    updateParams({ min: minPrice || null, max: maxPrice || null });
  }

  return (
    <aside
      className={`space-y-8 rounded-lg border border-valley-navy/10 bg-white p-5 transition-opacity ${
        isPending ? "opacity-60" : ""
      }`}
    >
      <div>
        <label htmlFor="sort" className="font-display text-sm uppercase tracking-wide text-valley-navy">
          Sort By
        </label>
        <select
          id="sort"
          value={currentSort}
          onChange={(e) => updateParams({ sort: e.target.value || null })}
          className="mt-2 w-full rounded-md border border-valley-navy/20 bg-white px-3 py-2 text-sm"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-display text-sm uppercase tracking-wide text-valley-navy">Category</h3>
        <select
          value={currentCategory}
          onChange={(e) => updateParams({ category: e.target.value || null })}
          className="mt-2 w-full rounded-md border border-valley-navy/20 bg-white px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          {ebayCategoryGroups.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-display text-sm uppercase tracking-wide text-valley-navy">Condition</h3>
        <div className="mt-2 space-y-2">
          {conditionOptions
            .filter((c) => c.ebayId)
            .map((c) => (
              <label key={c.ebayId} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={currentConditions.includes(c.ebayId)}
                  onChange={() => toggleCondition(c.ebayId)}
                  className="h-4 w-4 accent-valley-red"
                />
                {c.label}
              </label>
            ))}
        </div>
      </div>

      <form onSubmit={applyPriceRange}>
        <h3 className="font-display text-sm uppercase tracking-wide text-valley-navy">Price Range</h3>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-md border border-valley-navy/20 px-2 py-1.5 text-sm"
          />
          <span className="text-valley-navy/50">&ndash;</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-md border border-valley-navy/20 px-2 py-1.5 text-sm"
          />
        </div>
        <button
          type="submit"
          className="mt-3 w-full rounded-md bg-valley-navy px-3 py-2 text-sm text-valley-cream hover:bg-valley-navy-light"
        >
          Apply
        </button>
      </form>

      <button
        onClick={() => router.push(pathname)}
        className="w-full text-center text-sm text-valley-red hover:underline"
      >
        Clear All Filters
      </button>
    </aside>
  );
}
