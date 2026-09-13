"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getProductImage } from "@/data/images";

interface ProductImageProps {
  productId: string;
  productName?: string;
  alt?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Reliable product image with:
 * - Centralized URL resolution
 * - object-fit: contain (no crop)
 * - onError fallback (never shows broken-image icon)
 * - Aspect-ratio stable container
 */
export function ProductImage({
  productId,
  productName,
  alt,
  fill = true,
  width,
  height,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: ProductImageProps) {
  const resolved = getProductImage(productId, productName);
  const [src, setSrc] = useState(resolved.url);
  const [failed, setFailed] = useState(false);

  const fallback = `https://placehold.co/800x800/1a1a1a/666666/png?text=${encodeURIComponent(
    productName || productId
  )}&font=inter`;

  const handleError = () => {
    if (!failed) {
      setFailed(true);
      setSrc(fallback);
    }
  };

  return (
    <div className={cn("relative overflow-hidden bg-white/[0.03]", className)}>
      {fill ? (
        <Image
          src={src}
          alt={alt || resolved.alt}
          fill
          className={cn("object-contain p-3", imageClassName)}
          sizes={sizes}
          priority={priority}
          unoptimized
          onError={handleError}
        />
      ) : (
        <Image
          src={src}
          alt={alt || resolved.alt}
          width={width || 400}
          height={height || 400}
          className={cn("object-contain", imageClassName)}
          priority={priority}
          unoptimized
          onError={handleError}
        />
      )}
    </div>
  );
}
