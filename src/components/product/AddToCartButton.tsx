"use client";

import { toast } from "sonner";
import { useCartStore } from "@/store/cart";

export function AddToCartButton({ productId }: { productId: string }) {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  const handleClick = () => {
    addItem({ productId, quantity: 1 });
    toast.success("Added to cart");
    setCartOpen(true);
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
    >
      Add to Cart
    </button>
  );
}
