import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import {
  getFeaturedProducts,
  getDealProducts,
  getNewArrivals,
  categories,
} from "@/data/products";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const deals = getDealProducts().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
              RICHIE GADGETS / PREMIUM TECHNOLOGY
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1]">
              Technology,
              <br />
              thoughtfully selected.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Discover smartphones, gaming systems, computers and everyday
              technology from brands you know and trust.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/shop?category=gaming"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border text-foreground text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Explore Gaming
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {[
              { title: "Quality Products", desc: "Carefully selected technology." },
              { title: "Fast Delivery", desc: "Convenient delivery options." },
              { title: "Customer Support", desc: "Help when you need it." },
              { title: "Secure Ordering", desc: "A simple shopping experience." },
            ].map((item) => (
              <div key={item.title} className="px-6 py-8 text-center lg:text-left">
                <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Everything you need.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Explore our collection of technology built for work, entertainment and everyday life.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group relative flex flex-col justify-end min-h-[200px] p-6 rounded-2xl border border-border bg-card hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <h3 className="text-lg font-medium text-foreground group-hover:text-white transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">Featured</h2>
              <p className="mt-2 text-muted-foreground text-sm">Hand-picked technology worth your attention.</p>
            </div>
            <Link href="/shop" className="hidden sm:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        </div>
      </section>

      {deals.length > 0 && (
        <section className="py-16 sm:py-20 border-t border-border bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">Worth a second look</h2>
                <p className="mt-2 text-muted-foreground text-sm">Selected products at better prices.</p>
              </div>
              <Link href="/deals" className="hidden sm:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                All deals <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {deals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {newArrivals.length > 0 && (
        <section className="py-16 sm:py-20 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">Just arrived</h2>
                <p className="mt-2 text-muted-foreground text-sm">The latest technology, now available.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 sm:py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">Ready to explore?</h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Browse the full collection of thoughtfully selected technology.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Browse all products
          </Link>
        </div>
      </section>
    </div>
  );
}
