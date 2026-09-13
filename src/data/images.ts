/**
 * Centralized product image registry.
 * Prefer locally hosted assets in /public/products/ (reliable).
 * External URLs only when verified working.
 */

export type ProductImageEntry = {
  url: string;
  source: string;
  alt: string;
};

/** Local product photos downloaded into /public/products */
const LOCAL = (id: string) => `/products/${id}.jpg`;

const PLACEHOLDER = (label: string) =>
  `https://placehold.co/800x800/1a1a1a/666666/png?text=${encodeURIComponent(label)}&font=inter`;

/**
 * Map product ID → image.
 * Local files take priority. Only include IDs that exist in the catalog.
 */
export const productImages: Record<string, ProductImageEntry> = {
  // ===== iPhone (local) =====
  "iphone-16-pro-max": { url: LOCAL("iphone-16-pro-max"), source: "Local asset", alt: "iPhone 16 Pro Max" },
  "iphone-16-pro": { url: LOCAL("iphone-16-pro"), source: "Local asset", alt: "iPhone 16 Pro" },
  "iphone-16-plus": { url: LOCAL("iphone-16-plus"), source: "Local asset", alt: "iPhone 16 Plus" },
  "iphone-16": { url: LOCAL("iphone-16"), source: "Local asset", alt: "iPhone 16" },
  "iphone-15-pro-max": { url: LOCAL("iphone-15-pro-max"), source: "Local asset", alt: "iPhone 15 Pro Max" },
  "iphone-15-pro": { url: LOCAL("iphone-15-pro"), source: "Local asset", alt: "iPhone 15 Pro" },
  "iphone-15-plus": { url: LOCAL("iphone-15-plus"), source: "Local asset", alt: "iPhone 15 Plus" },
  "iphone-15": { url: LOCAL("iphone-15"), source: "Local asset", alt: "iPhone 15" },
  "iphone-14-pro-max": { url: LOCAL("iphone-14-pro-max"), source: "Local asset", alt: "iPhone 14 Pro Max" },
  "iphone-14": { url: LOCAL("iphone-14"), source: "Local asset", alt: "iPhone 14" },
  "iphone-13": { url: LOCAL("iphone-13"), source: "Local asset", alt: "iPhone 13" },
  "iphone-12": { url: LOCAL("iphone-12"), source: "Local asset", alt: "iPhone 12" },
  "iphone-11": { url: LOCAL("iphone-11"), source: "Local asset", alt: "iPhone 11" },

  // ===== Samsung (local) =====
  "samsung-s24-ultra": { url: LOCAL("samsung-s24-ultra"), source: "Local asset", alt: "Galaxy S24 Ultra" },
  "samsung-s24-plus": { url: LOCAL("samsung-s24-plus"), source: "Local asset", alt: "Galaxy S24+" },
  "samsung-s24": { url: LOCAL("samsung-s24"), source: "Local asset", alt: "Galaxy S24" },
  "samsung-s23-ultra": { url: LOCAL("samsung-s23-ultra"), source: "Local asset", alt: "Galaxy S23 Ultra" },
  "samsung-zflip6": { url: LOCAL("samsung-zflip6"), source: "Local asset", alt: "Galaxy Z Flip6" },
  "samsung-zfold6": { url: LOCAL("samsung-zfold6"), source: "Local asset", alt: "Galaxy Z Fold6" },
  "samsung-a55": { url: LOCAL("samsung-a55"), source: "Local asset", alt: "Galaxy A55" },
  "samsung-a35": { url: LOCAL("samsung-a35"), source: "Local asset", alt: "Galaxy A35" },

  // ===== Google / Xiaomi (local) =====
  "pixel-9-pro": { url: LOCAL("pixel-9-pro"), source: "Local asset", alt: "Pixel 9 Pro" },
  "pixel-9": { url: LOCAL("pixel-9"), source: "Local asset", alt: "Pixel 9" },
  "pixel-8-pro": { url: LOCAL("pixel-8-pro"), source: "Local asset", alt: "Pixel 8 Pro" },
  "xiaomi-14": { url: LOCAL("xiaomi-14"), source: "Local asset", alt: "Xiaomi 14" },
  "xiaomi-14t": { url: LOCAL("xiaomi-14t"), source: "Local asset", alt: "Xiaomi 14T" },

  // ===== Audio (local where available) =====
  "airpods-pro-2": { url: LOCAL("airpods-pro-2"), source: "Local asset", alt: "AirPods Pro 2" },
  "airpods-max": { url: LOCAL("airpods-max"), source: "Local asset", alt: "AirPods Max" },
  "airpods-4": { url: PLACEHOLDER("AirPods 4"), source: "Placeholder", alt: "AirPods 4" },
  "galaxy-buds-3-pro": { url: PLACEHOLDER("Galaxy Buds3 Pro"), source: "Placeholder", alt: "Galaxy Buds3 Pro" },
  "sony-wh1000xm5": { url: PLACEHOLDER("Sony WH-1000XM5"), source: "Placeholder", alt: "Sony WH-1000XM5" },
  "sony-wf1000xm5": { url: PLACEHOLDER("Sony WF-1000XM5"), source: "Placeholder", alt: "Sony WF-1000XM5" },
  "bose-qc-ultra": { url: PLACEHOLDER("Bose QC Ultra"), source: "Placeholder", alt: "Bose QuietComfort Ultra" },

  // ===== Gaming =====
  "ps5-pro": { url: PLACEHOLDER("PS5 Pro"), source: "Placeholder", alt: "PlayStation 5 Pro" },
  "ps5-slim": { url: PLACEHOLDER("PS5 Slim"), source: "Placeholder", alt: "PlayStation 5 Slim" },
  "ps5-digital": { url: PLACEHOLDER("PS5 Digital"), source: "Placeholder", alt: "PS5 Slim Digital" },
  "ps4-pro": { url: PLACEHOLDER("PS4 Pro"), source: "Placeholder", alt: "PlayStation 4 Pro" },
  "ps4-slim": { url: PLACEHOLDER("PS4 Slim"), source: "Placeholder", alt: "PlayStation 4 Slim" },
  "dualsense": { url: PLACEHOLDER("DualSense"), source: "Placeholder", alt: "DualSense Controller" },
  "xbox-series-x": { url: PLACEHOLDER("Xbox Series X"), source: "Placeholder", alt: "Xbox Series X" },
  "xbox-series-s": { url: PLACEHOLDER("Xbox Series S"), source: "Placeholder", alt: "Xbox Series S" },
  "xbox-one-x": { url: PLACEHOLDER("Xbox One X"), source: "Placeholder", alt: "Xbox One X" },
  "switch-oled": { url: PLACEHOLDER("Switch OLED"), source: "Placeholder", alt: "Nintendo Switch OLED" },
  "switch-standard": { url: PLACEHOLDER("Nintendo Switch"), source: "Placeholder", alt: "Nintendo Switch" },
  "switch-lite": { url: PLACEHOLDER("Switch Lite"), source: "Placeholder", alt: "Nintendo Switch Lite" },
  "meta-quest-3": { url: PLACEHOLDER("Meta Quest 3"), source: "Placeholder", alt: "Meta Quest 3" },
  "meta-quest-3s": { url: PLACEHOLDER("Meta Quest 3S"), source: "Placeholder", alt: "Meta Quest 3S" },
  "meta-quest-2": { url: PLACEHOLDER("Meta Quest 2"), source: "Placeholder", alt: "Meta Quest 2" },

  // ===== Computers =====
  "macbook-pro-14-m4": { url: PLACEHOLDER("MacBook Pro 14"), source: "Placeholder", alt: "MacBook Pro 14-inch M4" },
  "macbook-pro-16-m4": { url: PLACEHOLDER("MacBook Pro 16"), source: "Placeholder", alt: "MacBook Pro 16-inch M4" },
  "macbook-air-13-m3": { url: PLACEHOLDER("MacBook Air 13"), source: "Placeholder", alt: "MacBook Air 13-inch M3" },
  "macbook-air-15-m3": { url: PLACEHOLDER("MacBook Air 15"), source: "Placeholder", alt: "MacBook Air 15-inch M3" },
  "mac-mini-m4": { url: PLACEHOLDER("Mac mini M4"), source: "Placeholder", alt: "Mac mini M4" },
  "dell-xps-14": { url: PLACEHOLDER("Dell XPS 14"), source: "Placeholder", alt: "Dell XPS 14" },
  "dell-xps-13": { url: PLACEHOLDER("Dell XPS 13"), source: "Placeholder", alt: "Dell XPS 13" },
  "lenovo-yoga-7i": { url: PLACEHOLDER("Lenovo Yoga 7i"), source: "Placeholder", alt: "Lenovo Yoga 7i" },
  "asus-zenbook-14": { url: PLACEHOLDER("ASUS Zenbook 14"), source: "Placeholder", alt: "ASUS Zenbook 14" },

  // ===== Wearables =====
  "apple-watch-series-10": { url: PLACEHOLDER("Apple Watch S10"), source: "Placeholder", alt: "Apple Watch Series 10" },
  "apple-watch-ultra-2": { url: PLACEHOLDER("Apple Watch Ultra 2"), source: "Placeholder", alt: "Apple Watch Ultra 2" },
  "galaxy-watch-7": { url: LOCAL("galaxy-watch-7"), source: "Local asset", alt: "Galaxy Watch7" },

  // ===== Cameras =====
  "gopro-hero12": { url: PLACEHOLDER("GoPro HERO12"), source: "Placeholder", alt: "GoPro HERO12 Black" },
  "sony-zv-e10": { url: PLACEHOLDER("Sony ZV-E10"), source: "Placeholder", alt: "Sony ZV-E10" },
  "logitech-brio-4k": { url: PLACEHOLDER("Logitech Brio 4K"), source: "Placeholder", alt: "Logitech Brio 4K" },

  // ===== Charging =====
  "apple-magsafe-charger": { url: LOCAL("apple-magsafe-charger"), source: "Local asset", alt: "MagSafe Charger" },
  "apple-20w-usb-c": { url: PLACEHOLDER("20W USB-C"), source: "Placeholder", alt: "20W USB-C Power Adapter" },
  "anker-737": { url: PLACEHOLDER("Anker 737"), source: "Placeholder", alt: "Anker 737 Power Bank" },
};

/** Resolve image for a product ID. Always returns a usable entry. */
export function getProductImage(productId: string, productName?: string): ProductImageEntry {
  const entry = productImages[productId];
  if (entry) return entry;
  return {
    url: PLACEHOLDER(productName || productId),
    source: "Placeholder",
    alt: productName || productId,
  };
}
