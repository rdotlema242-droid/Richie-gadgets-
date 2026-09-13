import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug, products } from "@/data/products";
import { getProductImage } from "@/data/images";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { WishlistButton } from "@/components/product/WishlistButton";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} | ${product.brand}`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const primaryImage = getProductImage(product.id, product.name);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Gallery */}
        <div className="relative aspect-square bg-white/[0.03] rounded-2xl border border-border overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              className="object-contain p-8"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            {product.brand}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-sm text-foreground">★ {product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.previousPrice && product.previousPrice > product.price && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.previousPrice)}
                </span>
                {product.discount && (
                  <span className="text-sm font-medium text-accent">
                    -{product.discount}%
                  </span>
                )}
              </>
            )}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Availability */}
          <p className="mt-4 text-sm">
            {product.availability === "in-stock" && (
              <span className="text-success">In stock</span>
            )}
            {product.availability === "low-stock" && (
              <span className="text-warning">Low stock</span>
            )}
            {product.availability === "out-of-stock" && (
              <span className="text-destructive">Out of stock</span>
            )}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <AddToCartButton productId={product.id} />
            <WishlistButton productId={product.id} />
          </div>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Hi, I'm interested in ${product.name} (${formatPrice(product.price)})`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center h-12 px-6 rounded-full border border-border text-sm font-medium text-foreground hover:bg-white/5 transition-colors"
          >
            Order via WhatsApp
          </a>

          {/* Specs */}
          <div className="mt-12">
            <h2 className="text-lg font-medium text-foreground">Key specifications</h2>
            <dl className="mt-4 space-y-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 text-sm border-b border-border pb-3">
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd className="text-foreground text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {product.whatsIncluded && (
            <div className="mt-8">
               <h2 className="text-lg font-medium text-foreground">What&apos;s included</h2>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {product.whatsIncluded.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-8 text-xs text-muted-foreground">
            Demo product page. Warranty and delivery information are illustrative.
          </p>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20 pt-12 border-t border-border">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-8">
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
