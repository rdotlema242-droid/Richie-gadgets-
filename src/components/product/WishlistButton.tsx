"use client";

import { Heart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

export function WishlistButton({ productId }: { productId: string }) {
  const isInWishlist = useCartStore((s) => s.isInWishlist(productId));
  const addToWishlist = useCartStore((s) => s.addToWishlist);
  const removeFromWishlist = useCartStore((s) => s.removeFromWishlist);

  const toggle = () => {
    if (isInWishlist) removeFromWishlist(productId);
    else addToWishlist(productId);
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        "inline-flex items-center justify-center h-12 w-12 rounded-full border transition-colors",
        isInWishlist
          ? "border-accent bg-accent text-white"
          : "border-border text-foreground hover:bg-white/5"
      )}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("h-5 w-5", isInWishlist && "fill-current")} />
    </button>
  );
}
