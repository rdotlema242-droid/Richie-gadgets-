export type ProductCategory =
  | "smartphones"
  | "gaming"
  | "computers"
  | "audio"
  | "wearables"
  | "accessories"
  | "cameras"
  | "charging";

export type ProductSubcategory =
  | "iphone"
  | "samsung-phone"
  | "google-pixel"
  | "xiaomi"
  | "tecno"
  | "infinix"
  | "playstation"
  | "xbox"
  | "nintendo"
  | "vr"
  | "gaming-accessories"
  | "macbook"
  | "windows-laptop"
  | "desktop"
  | "airpods"
  | "headphones"
  | "earbuds"
  | "speakers"
  | "apple-watch"
  | "galaxy-watch"
  | "fitness"
  | "chargers"
  | "cables"
  | "power-banks"
  | "cases"
  | "keyboards"
  | "mice"
  | "storage"
  | "camera"
  | "action-camera"
  | "webcam"
  | "other";

export interface ProductImage {
  url: string;
  alt: string;
  source: string;
  isPrimary?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  storage?: string;
  ram?: string;
  color?: string;
  price: number;
  previousPrice?: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  description: string;
  shortDescription: string;
  price: number;
  previousPrice?: number;
  discount?: number;
  images: ProductImage[];
  variants?: ProductVariant[];
  storageOptions?: string[];
  colorOptions?: string[];
  specs: Record<string, string>;
  tags: string[];
  rating: number;
  reviewCount: number;
  availability: "in-stock" | "low-stock" | "out-of-stock" | "pre-order";
  featured?: boolean;
  newArrival?: boolean;
  isDeal?: boolean;
  whatsIncluded?: string[];
  warranty?: string;
  compatibility?: string[];
  createdAt: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}
