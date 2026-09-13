import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "store.storeimages.cdn-apple.com" },
      { protocol: "https", hostname: "images.samsung.com" },
      { protocol: "https", hostname: "gmedia.playstation.com" },
      { protocol: "https", hostname: "assets.nintendo.com" },
      { protocol: "https", hostname: "www.sony.com" },
      { protocol: "https", hostname: "i.dell.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "assets.xboxservices.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "resource.logitech.com" },
      { protocol: "https", hostname: "assets.bose.com" },
      { protocol: "https", hostname: "gopro.com" },
      { protocol: "https", hostname: "**" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
