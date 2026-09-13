import { Product } from "@/types/product";

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "popular";

export interface ShopFilters {
  category?: string;
  q?: string;
  brand?: string;          // comma-separated or single
  minPrice?: number;
  maxPrice?: number;
  storage?: string;        // e.g. "256GB"
  availability?: string;   // in-stock | low-stock | out-of-stock
  platform?: string;       // playstation | xbox | nintendo | vr | pc
  sort?: SortOption;
}

export function parseShopFilters(params: Record<string, string | string[] | undefined>): ShopFilters {
  const get = (key: string) => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v;
  };

  return {
    category: get("category") || undefined,
    q: get("q") || undefined,
    brand: get("brand") || undefined,
    minPrice: get("minPrice") ? Number(get("minPrice")) : undefined,
    maxPrice: get("maxPrice") ? Number(get("maxPrice")) : undefined,
    storage: get("storage") || undefined,
    availability: get("availability") || undefined,
    platform: get("platform") || undefined,
    sort: (get("sort") as SortOption) || "featured",
  };
}

export function filterProducts(products: Product[], filters: ShopFilters): Product[] {
  let result = [...products];

  // Category
  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  // Search query
  if (filters.q) {
    const q = filters.q.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)) ||
        p.category.includes(q) ||
        p.subcategory.includes(q)
    );
  }

  // Brand (supports comma-separated for multi-select later)
  if (filters.brand) {
    const brands = filters.brand.split(",").map((b) => b.trim().toLowerCase());
    result = result.filter((p) => brands.includes(p.brand.toLowerCase()));
  }

  // Price range
  if (typeof filters.minPrice === "number" && !isNaN(filters.minPrice)) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (typeof filters.maxPrice === "number" && !isNaN(filters.maxPrice)) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  // Storage
  if (filters.storage) {
    const storages = filters.storage.split(",").map((s) => s.trim().toUpperCase());
    result = result.filter((p) => {
      if (!p.storageOptions || p.storageOptions.length === 0) return false;
      return p.storageOptions.some((s) =>
        storages.some((filterS) => s.toUpperCase().includes(filterS.replace("GB", "")) || s.toUpperCase() === filterS)
      );
    });
  }

  // Availability
  if (filters.availability) {
    result = result.filter((p) => p.availability === filters.availability);
  }

  // Platform (mainly for gaming)
  if (filters.platform) {
    const platform = filters.platform.toLowerCase();
    result = result.filter((p) => {
      if (platform === "playstation") return p.subcategory === "playstation" || p.brand === "Sony" && p.category === "gaming";
      if (platform === "xbox") return p.subcategory === "xbox" || p.brand === "Microsoft";
      if (platform === "nintendo") return p.subcategory === "nintendo" || p.brand === "Nintendo";
      if (platform === "vr") return p.subcategory === "vr";
      if (platform === "pc") return p.category === "computers" || p.subcategory === "windows-laptop" || p.subcategory === "macbook";
      return true;
    });
  }

  // Sort
  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case "popular":
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "featured":
    default:
      // Featured first, then by review count
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.reviewCount - a.reviewCount;
      });
      break;
  }

  return result;
}

// Helpers to build filter options from the catalog
export function getUniqueBrands(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.brand))).sort();
}

export function getUniqueStorages(products: Product[]): string[] {
  const set = new Set<string>();
  products.forEach((p) => {
    p.storageOptions?.forEach((s) => set.add(s));
  });
  // Sort by numeric value roughly
  return Array.from(set).sort((a, b) => {
    const numA = parseInt(a) || 0;
    const numB = parseInt(b) || 0;
    return numA - numB;
  });
}

export function getPriceBounds(products: Product[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 2000 };
  const prices = products.map((p) => p.price);
  return {
    min: Math.floor(Math.min(...prices) / 50) * 50,
    max: Math.ceil(Math.max(...prices) / 50) * 50,
  };
}
