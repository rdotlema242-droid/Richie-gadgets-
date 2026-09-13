import { Suspense } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { products, categories } from "@/data/products";
import {
  parseShopFilters,
  filterProducts,
  getUniqueBrands,
  getUniqueStorages,
  getPriceBounds,
} from "@/lib/filters";

interface ShopPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata = {
  title: "Shop",
  description: "Browse smartphones, gaming, computers, audio and more at Richie Gadgets.",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const filters = parseShopFilters(params);
  const filtered = filterProducts(products, filters);

  const brands = getUniqueBrands(products);
  const storages = getUniqueStorages(products);
  const priceBounds = getPriceBounds(products);

  const categoryName = filters.category
    ? categories.find((c) => c.id === filters.category)?.name || filters.category
    : "All Products";

  const title = filters.q
    ? `Results for "${filters.q}"`
    : categoryName;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          {filters.brand && ` · ${filters.brand}`}
          {filters.storage && ` · ${filters.storage}`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar filters - desktop */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <Suspense fallback={<div className="text-sm text-muted-foreground">Loading filters…</div>}>
              <ShopFilters
                brands={brands}
                storages={storages}
                priceBounds={priceBounds}
                categories={categories}
                currentCategory={filters.category}
                resultCount={filtered.length}
              />
            </Suspense>
          </div>
        </div>

        {/* Mobile filters trigger + content */}
        <div className="lg:hidden">
          <details className="group mb-6">
            <summary className="flex items-center justify-between cursor-pointer list-none rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground">
              <span>Filters & Sort</span>
              <span className="text-muted-foreground text-xs group-open:hidden">Show</span>
              <span className="text-muted-foreground text-xs hidden group-open:inline">Hide</span>
            </summary>
            <div className="mt-4 p-4 rounded-xl border border-border bg-card">
              <Suspense fallback={null}>
                <ShopFilters
                  brands={brands}
                  storages={storages}
                  priceBounds={priceBounds}
                  categories={categories}
                  currentCategory={filters.category}
                  resultCount={filtered.length}
                />
              </Suspense>
            </div>
          </details>
        </div>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-border bg-card">
              <p className="text-foreground font-medium">No products found</p>
              <p className="mt-2 text-muted-foreground text-sm max-w-sm mx-auto">
                Try adjusting your filters or search term.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-flex h-10 px-6 items-center rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
