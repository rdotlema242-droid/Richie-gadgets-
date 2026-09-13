import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { getProductImage } from "@/data/images";
import { formatPrice } from "@/lib/utils";
import { Pencil, Plus } from "lucide-react";

export const metadata = {
  title: "Admin · Products",
};

export default function AdminProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} products · Demo view (local data)
          </p>
        </div>
        <button
          disabled
          className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white/10 text-muted-foreground text-sm cursor-not-allowed"
          title="Connect Supabase to enable"
        >
          <Plus className="h-4 w-4" />
          Add product
        </button>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-white/[0.02]">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Product
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                  Brand
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                  Category
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                  Price
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Status
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const img = getProductImage(product.id, product.name);
                return (
                  <tr
                    key={product.id}
                    className="border-b border-border last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-lg bg-white/[0.04] overflow-hidden shrink-0">
                          <Image
                            src={img.url}
                            alt={img.alt}
                            fill
                            className="object-contain p-1"
                            sizes="40px"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate max-w-[200px]">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground sm:hidden">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                      {product.brand}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell capitalize">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-xs ${
                          product.availability === "in-stock"
                            ? "bg-success/10 text-success"
                            : product.availability === "low-stock"
                              ? "bg-warning/10 text-warning"
                              : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {product.availability}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="View product"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Full CRUD activates when Supabase is connected. See supabase-schema.sql
        and README.
      </p>
    </div>
  );
}
