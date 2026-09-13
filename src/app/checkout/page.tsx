"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, CreditCard, Truck, Shield } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { getProductById } from "@/data/products"
import { getProductImage } from "@/data/images";
import { formatPrice } from "@/lib/utils";

type PaymentMethod = "card" | "paypal" | "transfer";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderId, setOrderId] = useState("");

  const cartProducts = useMemo(() => {
    return items
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        return { item, product };
      })
      .filter(Boolean) as {
      item: (typeof items)[0];
      product: NonNullable<ReturnType<typeof getProductById>>;
    }[];
  }, [items]);

  const subtotal = cartProducts.reduce(
    (sum, { item, product }) => sum + product.price * item.quantity,
    0
  );
  const deliveryFee = 0; // Demo free delivery messaging
  const total = subtotal + deliveryFee;

  const validate = () => {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = "Full name is required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Valid email is required";
    if (!phone.trim()) next.phone = "Phone number is required";
    if (!address.trim()) next.address = "Address is required";
    if (!city.trim()) next.city = "City is required";
    if (!state.trim()) next.state = "State / Region is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartProducts.length === 0) return;

    setIsSubmitting(true);

    // Simulate processing delay (demo)
    await new Promise((r) => setTimeout(r, 1200));

    clearCart();
    setIsSubmitting(false);
    setOrderId(`RG-${Date.now().toString().slice(-8)}`);
    setStep("success");
  };

  // Empty cart state
  if (items.length === 0 && step === "form") {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Your cart is empty
        </h1>
        <p className="mt-3 text-muted-foreground">
          Add some products before checking out.
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

  // Success / Order confirmation
  if (step === "success") {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 sm:py-28 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success/10 text-success mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Order received
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Thank you{fullName ? `, ${fullName.split(" ")[0]}` : ""}. This is a{" "}
          <strong className="text-foreground">demo checkout</strong> — no real
          payment was processed and no order was placed.
        </p>
        <div className="mt-8 p-5 rounded-2xl border border-border bg-card text-left text-sm space-y-2">
          <p className="text-muted-foreground">
            <span className="text-foreground font-medium">Demo order ID:</span>{" "}
            {orderId}
          </p>
          <p className="text-muted-foreground">
            <span className="text-foreground font-medium">Email:</span> {email}
          </p>
          <p className="text-muted-foreground">
            <span className="text-foreground font-medium">Total (demo):</span>{" "}
            {formatPrice(total)}
          </p>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/shop"
            className="inline-flex h-12 px-8 items-center justify-center rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 px-8 items-center justify-center rounded-full border border-border text-sm font-medium text-foreground hover:bg-white/5 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Demo checkout — no real payment will be processed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-10 lg:gap-14">
        {/* Left: Delivery + Payment */}
        <div className="lg:col-span-3 space-y-10">
          {/* Delivery details */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-medium text-foreground">
                Delivery details
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">
                  Full name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Jane Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                  Phone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="+1 555 000 0000"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1.5">
                  Address *
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Street address"
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-destructive">{errors.address}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1.5">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="City"
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-destructive">{errors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-foreground mb-1.5">
                  State / Region *
                </label>
                <input
                  id="state"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="State or region"
                />
                {errors.state && (
                  <p className="mt-1 text-xs text-destructive">{errors.state}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-1.5">
                  Delivery notes <span className="text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="Apartment, landmark, preferred delivery time..."
                />
              </div>
            </div>
          </section>

          {/* Payment method */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-medium text-foreground">
                Payment method
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: "card" as PaymentMethod,
                  label: "Credit / Debit Card",
                  desc: "Visa, Mastercard, Amex (demo)",
                },
                {
                  id: "paypal" as PaymentMethod,
                  label: "PayPal",
                  desc: "Pay securely with PayPal (demo)",
                },
                {
                  id: "transfer" as PaymentMethod,
                  label: "Bank Transfer",
                  desc: "Direct transfer (demo)",
                },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === method.id
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-white/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="mt-1 accent-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {method.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {method.desc}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-white/[0.03] border border-border">
              <Shield className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                This is a demonstration checkout. Selecting a payment method and
                placing an order will not charge any card or create a real
                transaction.
              </p>
            </div>
          </section>
        </div>

        {/* Right: Order summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-medium text-foreground mb-5">
              Order summary
            </h2>

            <ul className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {cartProducts.map(({ item, product }) => {
                const primaryImage = getProductImage(product.id, product.name);
                return (
                  <li key={item.productId} className="flex gap-3">
                    <div className="relative h-14 w-14 shrink-0 rounded-lg bg-white/[0.04] border border-border overflow-hidden">
                      {primaryImage && (
                        <Image
                          src={primaryImage.url}
                          alt={primaryImage.alt}
                          fill
                          className="object-contain p-1"
                          sizes="56px"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-foreground shrink-0">
                      {formatPrice(product.price * item.quantity)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 space-y-2 text-sm border-t border-border pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-foreground">
                  {deliveryFee === 0 ? "Free (demo)" : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cartProducts.length === 0}
              className="mt-6 w-full h-12 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing…" : "Place order (demo)"}
            </button>

            <p className="mt-3 text-[11px] text-center text-muted-foreground">
              By placing this demo order you acknowledge no real payment will occur.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
