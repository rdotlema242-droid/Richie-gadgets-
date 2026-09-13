"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { getProductImage } from "@/data/images";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const isInWishlist = useCartStore((s) => s.isInWishlist(product.id));
  const addToWishlist = useCartStore((s) => s.addToWishlist);
  const removeFromWishlist = useCartStore((s) => s.removeFromWishlist);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast("Removed from wishlist");
    } else {
      addToWishlist(product.id);
      toast.success("Added to wishlist");
    }
  };

  // Prefer centralized registry, fall back to product.images
  const registryImage = getProductImage(product.id, product.name);
  const legacyImage = product.images?.find((i) => i.isPrimary) || product.images?.[0];
  const imageUrl = registryImage.url || legacyImage?.url;
  const imageAlt = registryImage.alt || legacyImage?.alt || product.name;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-black/20"
    >
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isDeal && product.discount && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-accent text-white">
            -{product.discount}%
          </span>
        )}
        {product.newArrival && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-white/10 text-foreground backdrop-blur-sm">
            New
          </span>
        )}
      </div>

      <button
        onClick={toggleWishlist}
        className={cn(
          "absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200",
          isInWishlist
            ? "bg-accent text-white"
            : "bg-black/40 text-white/80 hover:bg-black/60 hover:text-white backdrop-blur-sm"
        )}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={cn("h-4 w-4", isInWishlist && "fill-current")} />
      </button>

      <div className="relative aspect-square bg-white/[0.03] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 pt-3">
        <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
          {product.brand}
        </p>
        <h3 className="mt-1 text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-white transition-colors">
          {product.name}
        </h3>

        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="text-base font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.previousPrice && product.previousPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.previousPrice)}
            </span>
          )}
        </div>

        {product.availability === "low-stock" && (
          <p className="mt-1.5 text-xs text-warning">Low stock</p>
        )}
        {product.availability === "out-of-stock" && (
          <p className="mt-1.5 text-xs text-destructive">Out of stock</p>
        )}
      </div>
    </Link>
  );
}
