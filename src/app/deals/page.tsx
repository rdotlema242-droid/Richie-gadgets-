import { ProductCard } from "@/components/product/ProductCard";
import { getDealProducts } from "@/data/products";

export const metadata = {
  title: "Deals",
  description: "Selected discounted technology products.",
};

export default function DealsPage() {
  const deals = getDealProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          Worth a second look.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Selected products at better prices. Quality technology, thoughtfully discounted.
        </p>
      </div>

      {deals.length === 0 ? (
        <p className="text-muted-foreground">No deals available at the moment.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
