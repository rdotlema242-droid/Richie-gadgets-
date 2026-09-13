import Link from "next/link";
import { products } from "@/data/products";
import { Package, ShoppingCart, Users, Tag, ImageIcon, Settings } from "lucide-react";

export const metadata = {
  title: "Admin",
  description: "Richie Gadgets admin dashboard (demo)",
};

export default function AdminDashboard() {
  const totalProducts = products.length;
  const featuredCount = products.filter((p) => p.featured).length;
  const dealsCount = products.filter((p) => p.isDeal).length;
  const outOfStock = products.filter((p) => p.availability === "out-of-stock").length;

  const cards = [
    { label: "Total Products", value: totalProducts, icon: Package, href: "/admin/products" },
    { label: "Featured", value: featuredCount, icon: Tag, href: "/admin/products?filter=featured" },
    { label: "Active Deals", value: dealsCount, icon: ShoppingCart, href: "/admin/products?filter=deals" },
    { label: "Out of Stock", value: outOfStock, icon: Package, href: "/admin/products?filter=out-of-stock" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Demo admin dashboard. Connect Supabase and add authentication for production use.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="p-5 rounded-xl border border-border bg-card hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <card.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="mt-4 text-2xl font-semibold text-foreground">{card.value}</p>
            <p className="text-sm text-muted-foreground">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "Products", desc: "Add, edit, delete products and manage inventory", href: "/admin/products", icon: Package },
          { title: "Categories", desc: "Manage product categories", href: "/admin/categories", icon: Tag },
          { title: "Orders", desc: "View and update customer orders", href: "/admin/orders", icon: ShoppingCart },
          { title: "Images", desc: "Central image registry notes", href: "/admin/products", icon: ImageIcon },
          { title: "Users", desc: "Customer accounts (requires Supabase Auth)", href: "/admin/users", icon: Users },
          { title: "Settings", desc: "Store configuration", href: "/admin/settings", icon: Settings },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-white/20 transition-colors"
          >
            <item.icon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <h2 className="font-medium text-foreground">{item.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
