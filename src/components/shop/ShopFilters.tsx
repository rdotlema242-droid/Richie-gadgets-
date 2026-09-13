"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopFiltersProps {
  brands: string[];
  storages: string[];
  priceBounds: { min: number; max: number };
  categories: readonly { id: string; name: string }[];
  currentCategory?: string;
  resultCount: number;
}

const PLATFORMS = [
  { id: "playstation", label: "PlayStation" },
  { id: "xbox", label: "Xbox" },
  { id: "nintendo", label: "Nintendo" },
  { id: "vr", label: "VR" },
  { id: "pc", label: "PC / Computers" },
];

const AVAILABILITY = [
  { id: "in-stock", label: "In Stock" },
  { id: "low-stock", label: "Low Stock" },
  { id: "out-of-stock", label: "Out of Stock" },
];

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "newest", label: "Newest" },
  { id: "popular", label: "Most Popular" },
];

export function ShopFilters({
  brands,
  storages,
  priceBounds,
  categories,
  currentCategory,
  resultCount,
}: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const get = (key: string) => searchParams.get(key) || "";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams]
  );

  const clearAll = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const activeFiltersCount = [
    get("brand"),
    get("minPrice") || get("maxPrice"),
    get("storage"),
    get("availability"),
    get("platform"),
    get("sort") && get("sort") !== "featured" ? get("sort") : "",
  ].filter(Boolean).length;

  const currentBrand = get("brand");
  const currentStorage = get("storage");
  const currentAvailability = get("availability");
  const currentPlatform = get("platform");
  const currentSort = get("sort") || "featured";
  const minPrice = get("minPrice");
  const maxPrice = get("maxPrice");

  return (
    <aside className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
            Filters
          </h2>
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Sort by</h3>
        <select
          value={currentSort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="w-full h-10 px-3 rounded-lg bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Category</h3>
        <div className="space-y-1.5">
          <button
            onClick={() => updateParams({ category: null })}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
              !currentCategory
                ? "bg-white/10 text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
          >
            All products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParams({ category: cat.id })}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                currentCategory === cat.id
                  ? "bg-white/10 text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Brand</h3>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2.5 px-1 py-1.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={currentBrand.toLowerCase() === brand.toLowerCase()}
                onChange={() => {
                  if (currentBrand.toLowerCase() === brand.toLowerCase()) {
                    updateParams({ brand: null });
                  } else {
                    updateParams({ brand });
                  }
                }}
                className="rounded border-border text-accent focus:ring-accent"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Price range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder={String(priceBounds.min)}
            value={minPrice}
            onChange={(e) => updateParams({ minPrice: e.target.value || null })}
            min={0}
            className="w-full h-10 px-3 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <span className="text-muted-foreground text-sm">–</span>
          <input
            type="number"
            placeholder={String(priceBounds.max)}
            value={maxPrice}
            onChange={(e) => updateParams({ maxPrice: e.target.value || null })}
            min={0}
            className="w-full h-10 px-3 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[
            { label: "Under $300", max: "300" },
            { label: "$300–$700", min: "300", max: "700" },
            { label: "$700–$1200", min: "700", max: "1200" },
            { label: "Over $1200", min: "1200" },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() =>
                updateParams({
                  minPrice: preset.min || null,
                  maxPrice: preset.max || null,
                })
              }
              className="px-2.5 py-1 rounded-full text-xs border border-border text-muted-foreground hover:text-foreground hover:border-white/30 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Storage */}
      {storages.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Storage</h3>
          <div className="flex flex-wrap gap-1.5">
            {storages.map((s) => (
              <button
                key={s}
                onClick={() =>
                  updateParams({ storage: currentStorage === s ? null : s })
                }
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs border transition-colors",
                  currentStorage === s
                    ? "bg-white text-black border-white"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-white/30"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Platform */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Platform</h3>
        <div className="space-y-1.5">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() =>
                updateParams({ platform: currentPlatform === p.id ? null : p.id })
              }
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                currentPlatform === p.id
                  ? "bg-white/10 text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Availability</h3>
        <div className="space-y-1.5">
          {AVAILABILITY.map((a) => (
            <button
              key={a.id}
              onClick={() =>
                updateParams({
                  availability: currentAvailability === a.id ? null : a.id,
                })
              }
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                currentAvailability === a.id
                  ? "bg-white/10 text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground pt-2 border-t border-border">
        {isPending ? "Updating…" : `${resultCount} product${resultCount !== 1 ? "s" : ""}`}
      </p>
    </aside>
  );
}
