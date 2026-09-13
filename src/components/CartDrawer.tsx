"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { getProductById } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";

export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isCartOpen = useCartStore((s) => s.isCartOpen);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Calculate totals
  const cartProducts = items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { item, product };
    })
    .filter(Boolean) as {
    item: (typeof items)[0];
    product: NonNullable<ReturnType<typeof getProductById>>;
  }[];

  const subtotal = cartProducts.reduce(
    (sum, { item, product }) => sum + product.price * item.quantity,
    0
  );

  const deliveryEstimate = subtotal > 0 ? 0 : 0; // Demo: free delivery messaging
  const total = subtotal + deliveryEstimate;

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col",
          "transition-transform duration-300 ease-out"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-foreground" />
            <h2 className="text-lg font-semibold text-foreground">
              Your cart
            </h2>
            {items.length > 0 && (
              <span className="text-sm text-muted-foreground">
                ({items.reduce((s, i) => s + i.quantity, 0)})
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-foreground font-medium">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add something you love.
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-6 inline-flex h-10 px-6 items-center rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {cartProducts.map(({ item, product }) => {
                const primaryImage =
                  product.images.find((i) => i.isPrimary) || product.images[0];
                return (
                  <li
                    key={`${item.productId}-${item.selectedStorage || ""}-${item.selectedColor || ""}`}
                    className="flex gap-4"
                  >
                    {/* Image */}
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => setCartOpen(false)}
                      className="relative h-20 w-20 shrink-0 rounded-lg bg-white/[0.04] border border-border overflow-hidden"
                    >
                      {primaryImage ? (
                        <Image
                          src={primaryImage.url}
                          alt={primaryImage.alt}
                          fill
                          className="object-contain p-1.5"
                          sizes="80px"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                          No img
                        </div>
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={() => setCartOpen(false)}
                            className="text-sm font-medium text-foreground hover:underline line-clamp-2"
                          >
                            {product.name}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {product.brand}
                            {item.selectedStorage && ` · ${item.selectedStorage}`}
                            {item.selectedColor && ` · ${item.selectedColor}`}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.variantId)
                          }
                          className="p-1.5 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto pt-2 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-border rounded-full overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity - 1,
                                item.variantId
                              )
                            }
                            className="p-1.5 hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity + 1,
                                item.variantId
                              )
                            }
                            className="p-1.5 hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-foreground">
                          {formatPrice(product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer / Summary */}
        {cartProducts.length > 0 && (
          <div className="border-t border-border px-5 py-5 space-y-4 shrink-0 bg-background">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-foreground">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-base pt-2 border-t border-border">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-semibold text-foreground">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={() => setCartOpen(false)}
                className="flex items-center justify-center h-12 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={() => setCartOpen(false)}
                className="flex items-center justify-center h-11 rounded-full border border-border text-sm font-medium text-foreground hover:bg-white/5 transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            <p className="text-[11px] text-center text-muted-foreground">
              Demo store — no real payment will be processed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
