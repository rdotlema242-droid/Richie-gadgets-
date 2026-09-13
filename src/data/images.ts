/**
 * Centralized product image registry.
 * Prefer official manufacturer CDNs.
 * When an official URL is unreliable, fall back to a clean placeholder.
 * Update URLs here — never scatter them through product data.
 */

const PLACEHOLDER = (label: string) =>
  `https://placehold.co/800x800/111111/555555/png?text=${encodeURIComponent(label)}&font=inter`;

export const productImages: Record<string, { url: string; source: string; alt: string }> = {
  // ===== iPhone =====
  "iphone-16-pro-max": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-max-finish-select-202409-6-9inch-naturaltitanium?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1723234230324",
    source: "Official Apple",
    alt: "iPhone 16 Pro Max Natural Titanium",
  },
  "iphone-16-pro": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1723234230324",
    source: "Official Apple",
    alt: "iPhone 16 Pro Black Titanium",
  },
  "iphone-16-plus": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1723234230324",
    source: "Official Apple",
    alt: "iPhone 16 Plus Ultramarine",
  },
  "iphone-16": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1723234230324",
    source: "Official Apple",
    alt: "iPhone 16 Ultramarine",
  },
  "iphone-15-pro-max": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch-bluetitanium?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1692845702708",
    source: "Official Apple",
    alt: "iPhone 15 Pro Max Blue Titanium",
  },
  "iphone-15-pro": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1692845702708",
    source: "Official Apple",
    alt: "iPhone 15 Pro Blue Titanium",
  },
  "iphone-15": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1692923777972",
    source: "Official Apple",
    alt: "iPhone 15 Blue",
  },
  "iphone-15-plus": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-blue?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1692923777972",
    source: "Official Apple",
    alt: "iPhone 15 Plus Blue",
  },
  "iphone-14-pro-max": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1663703841896",
    source: "Official Apple",
    alt: "iPhone 14 Pro Max Deep Purple",
  },
  "iphone-14": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1663703841896",
    source: "Official Apple",
    alt: "iPhone 14 Midnight",
  },
  "iphone-13": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202109-6-1inch-pink?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1629842709000",
    source: "Official Apple",
    alt: "iPhone 13 Pink",
  },
  "iphone-12": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-finish-select-202010-blue?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1604343704000",
    source: "Official Apple",
    alt: "iPhone 12 Blue",
  },
  "iphone-11": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-black-select-2019?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1566956144032",
    source: "Official Apple",
    alt: "iPhone 11 Black",
  },

  // ===== Samsung =====
  "samsung-s24-ultra": {
    url: "https://images.samsung.com/is/image/samsung/p6pim/uk/2401/gallery/uk-galaxy-s24-ultra-sm-s928bztgeub-539573-sm-s928bztgeub-539573?$650_519_PNG$",
    source: "Official Samsung",
    alt: "Galaxy S24 Ultra",
  },
  "samsung-s24-plus": {
    url: "https://images.samsung.com/is/image/samsung/p6pim/uk/2401/gallery/uk-galaxy-s24-plus-sm-s926bzggeub-539573?$650_519_PNG$",
    source: "Official Samsung",
    alt: "Galaxy S24+",
  },
  "samsung-s24": {
    url: "https://images.samsung.com/is/image/samsung/p6pim/uk/2401/gallery/uk-galaxy-s24-sm-s921bzggeub-539573-sm-s921bzggeub-539573?$650_519_PNG$",
    source: "Official Samsung",
    alt: "Galaxy S24",
  },
  "samsung-s23-ultra": {
    url: "https://images.samsung.com/is/image/samsung/p6pim/uk/2302/gallery/uk-galaxy-s23-ultra-sm-s918bzkgeub-534863?$650_519_PNG$",
    source: "Official Samsung",
    alt: "Galaxy S23 Ultra",
  },
  "samsung-zflip6": {
    url: PLACEHOLDER("Galaxy Z Flip6"),
    source: "Placeholder",
    alt: "Galaxy Z Flip6",
  },
  "samsung-zfold6": {
    url: PLACEHOLDER("Galaxy Z Fold6"),
    source: "Placeholder",
    alt: "Galaxy Z Fold6",
  },
  "samsung-a55": {
    url: PLACEHOLDER("Galaxy A55"),
    source: "Placeholder",
    alt: "Galaxy A55",
  },
  "samsung-a35": {
    url: PLACEHOLDER("Galaxy A35"),
    source: "Placeholder",
    alt: "Galaxy A35",
  },

  // ===== Google / Xiaomi =====
  "pixel-9-pro": { url: PLACEHOLDER("Pixel 9 Pro"), source: "Placeholder", alt: "Pixel 9 Pro" },
  "pixel-9": { url: PLACEHOLDER("Pixel 9"), source: "Placeholder", alt: "Pixel 9" },
  "pixel-8-pro": { url: PLACEHOLDER("Pixel 8 Pro"), source: "Placeholder", alt: "Pixel 8 Pro" },
  "xiaomi-14": { url: PLACEHOLDER("Xiaomi 14"), source: "Placeholder", alt: "Xiaomi 14" },
  "xiaomi-14t": { url: PLACEHOLDER("Xiaomi 14T"), source: "Placeholder", alt: "Xiaomi 14T" },

  // ===== PlayStation =====
  "ps5-pro": {
    url: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-pro-product-thumbnail-01-en-10sep24?$facebook$",
    source: "Official PlayStation",
    alt: "PlayStation 5 Pro",
  },
  "ps5-slim": {
    url: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-product-thumbnail-01-en-14sep23?$facebook$",
    source: "Official PlayStation",
    alt: "PlayStation 5 Slim",
  },
  "ps5-digital": {
    url: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-product-thumbnail-01-en-14sep23?$facebook$",
    source: "Official PlayStation",
    alt: "PS5 Slim Digital",
  },
  "ps4-pro": { url: PLACEHOLDER("PS4 Pro"), source: "Placeholder", alt: "PS4 Pro" },
  "ps4-slim": { url: PLACEHOLDER("PS4 Slim"), source: "Placeholder", alt: "PS4 Slim" },
  "dualsense": {
    url: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-controller-product-thumbnail-01-en-14sep23",
    source: "Official PlayStation",
    alt: "DualSense Controller",
  },

  // ===== Xbox =====
  "xbox-series-x": { url: PLACEHOLDER("Xbox Series X"), source: "Placeholder", alt: "Xbox Series X" },
  "xbox-series-s": { url: PLACEHOLDER("Xbox Series S"), source: "Placeholder", alt: "Xbox Series S" },
  "xbox-one-x": { url: PLACEHOLDER("Xbox One X"), source: "Placeholder", alt: "Xbox One X" },

  // ===== Nintendo =====
  "switch-oled": {
    url: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/switch/site-design-update/hardware/switch-oled-model/gallery/gallery_01",
    source: "Official Nintendo",
    alt: "Nintendo Switch OLED",
  },
  "switch-standard": { url: PLACEHOLDER("Nintendo Switch"), source: "Placeholder", alt: "Nintendo Switch" },
  "switch-lite": { url: PLACEHOLDER("Switch Lite"), source: "Placeholder", alt: "Switch Lite" },

  // ===== VR =====
  "meta-quest-3": { url: PLACEHOLDER("Meta Quest 3"), source: "Placeholder", alt: "Meta Quest 3" },
  "meta-quest-3s": { url: PLACEHOLDER("Meta Quest 3S"), source: "Placeholder", alt: "Meta Quest 3S" },
  "meta-quest-2": { url: PLACEHOLDER("Meta Quest 2"), source: "Placeholder", alt: "Meta Quest 2" },

  // ===== Mac / Computers =====
  "macbook-pro-14-m4": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1728919557574",
    source: "Official Apple",
    alt: "MacBook Pro 14 M4",
  },
  "macbook-pro-16-m4": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202410?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1728919557574",
    source: "Official Apple",
    alt: "MacBook Pro 16 M4",
  },
  "macbook-air-13-m3": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1708367688034",
    source: "Official Apple",
    alt: "MacBook Air 13 M3",
  },
  "macbook-air-15-m3": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202402?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1708367688034",
    source: "Official Apple",
    alt: "MacBook Air 15 M3",
  },
  "mac-mini-m4": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-202410-gallery-1?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1728919557574",
    source: "Official Apple",
    alt: "Mac mini M4",
  },
  "dell-xps-14": { url: PLACEHOLDER("Dell XPS 14"), source: "Placeholder", alt: "Dell XPS 14" },
  "dell-xps-13": { url: PLACEHOLDER("Dell XPS 13"), source: "Placeholder", alt: "Dell XPS 13" },
  "lenovo-yoga-7i": { url: PLACEHOLDER("Lenovo Yoga 7i"), source: "Placeholder", alt: "Lenovo Yoga 7i" },
  "asus-zenbook-14": { url: PLACEHOLDER("ASUS Zenbook 14"), source: "Placeholder", alt: "ASUS Zenbook 14" },

  // ===== Audio =====
  "airpods-pro-2": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1660803972361",
    source: "Official Apple",
    alt: "AirPods Pro 2",
  },
  "airpods-max": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1604706016000",
    source: "Official Apple",
    alt: "AirPods Max",
  },
  "airpods-4": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-202409?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1723234230324",
    source: "Official Apple",
    alt: "AirPods 4",
  },
  "galaxy-buds-3-pro": { url: PLACEHOLDER("Galaxy Buds3 Pro"), source: "Placeholder", alt: "Galaxy Buds3 Pro" },
  "sony-wh1000xm5": { url: PLACEHOLDER("Sony WH-1000XM5"), source: "Placeholder", alt: "Sony WH-1000XM5" },
  "sony-wf1000xm5": { url: PLACEHOLDER("Sony WF-1000XM5"), source: "Placeholder", alt: "Sony WF-1000XM5" },
  "bose-qc-ultra": { url: PLACEHOLDER("Bose QC Ultra"), source: "Placeholder", alt: "Bose QC Ultra" },

  // ===== Wearables =====
  "apple-watch-series-10": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-42mm-aluminum-jetblack-sportband-black-s10?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1723739899999",
    source: "Official Apple",
    alt: "Apple Watch Series 10",
  },
  "apple-watch-ultra-2": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-2-202409?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1723739899999",
    source: "Official Apple",
    alt: "Apple Watch Ultra 2",
  },
  "galaxy-watch-7": { url: PLACEHOLDER("Galaxy Watch7"), source: "Placeholder", alt: "Galaxy Watch7" },

  // ===== Cameras =====
  "gopro-hero12": { url: PLACEHOLDER("GoPro HERO12"), source: "Placeholder", alt: "GoPro HERO12 Black" },
  "sony-zv-e10": { url: PLACEHOLDER("Sony ZV-E10"), source: "Placeholder", alt: "Sony ZV-E10" },
  "logitech-brio-4k": { url: PLACEHOLDER("Logitech Brio 4K"), source: "Placeholder", alt: "Logitech Brio 4K" },

  // ===== Charging =====
  "apple-magsafe-charger": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1603995640000",
    source: "Official Apple",
    alt: "MagSafe Charger",
  },
  "apple-20w-usb-c": {
    url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU7V2?wid=800&hei=800&fmt=jpeg&qlt=90&.v=0",
    source: "Official Apple",
    alt: "20W USB-C Power Adapter",
  },
  "anker-737": { url: PLACEHOLDER("Anker 737"), source: "Placeholder", alt: "Anker 737 Power Bank" },
};

/** Resolve image for a product ID. Falls back to a clean placeholder. */
export function getProductImage(productId: string, productName?: string) {
  const entry = productImages[productId];
  if (entry) return entry;
  return {
    url: PLACEHOLDER(productName || productId),
    source: "Placeholder",
    alt: productName || productId,
  };
}
