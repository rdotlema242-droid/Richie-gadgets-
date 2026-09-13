"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { getProductById } from "@/data/products"
import { getProductImage } from "@/data/images";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

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

  if (cartProducts.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-foreground">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="mt-8 inline-flex h-12 px-8 items-center justify-center rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-8">
        Shopping cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cartProducts.map(({ item, product }) => {
            const primaryImage = getProductImage(product.id, product.name);
            return (
              <div
                key={`${item.productId}-${item.selectedStorage}-${item.selectedColor}`}
                className="flex gap-4 sm:gap-6 p-4 rounded-xl border border-border bg-card"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-lg bg-white/[0.04] overflow-hidden"
                >
                  {primaryImage && (
                    <Image
                      src={primaryImage.url}
                      alt={primaryImage.alt}
                      fill
                      className="object-contain p-2"
                      sizes="112px"
                      unoptimized
                    />
                  )}
                </Link>

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-base font-medium text-foreground hover:underline"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {product.brand}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-full overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1, item.variantId)
                        }
                        className="p-2 hover:bg-white/5 text-muted-foreground"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1, item.variantId)
                        }
                        className="p-2 hover:bg-white/5 text-muted-foreground"
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-base font-semibold text-foreground">
                      {formatPrice(product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div>
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-medium text-foreground mb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-foreground">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-3 border-t border-border">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex items-center justify-center h-12 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Or open cart drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
