"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { getProductById } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function WishlistPage() {
  const wishlist = useCartStore((s) => s.wishlist);
  const products = wishlist
    .map((w) => getProductById(w.productId))
    .filter(Boolean);

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <Heart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-foreground">Your wishlist is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Save products you love by tapping the heart icon.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex h-12 px-8 items-center justify-center rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">
        Wishlist
      </h1>
      <p className="text-muted-foreground text-sm mb-10">
        {products.length} saved product{products.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) =>
          product ? <ProductCard key={product.id} product={product} /> : null
        )}
      </div>
    </div>
  );
}
