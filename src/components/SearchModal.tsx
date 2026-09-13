"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => (query.trim().length < 2 ? [] : searchProducts(query).slice(0, 8)),
    [query]
  );

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
          />
          <button
             onClick={handleClose}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-white/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim().length < 2 ? (
            <div className="px-4 py-8 text-center text-muted-foreground text-sm">
              Start typing to search for products
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-foreground font-medium">No results found</p>
              <p className="text-muted-foreground text-sm mt-1">
                Try a different search term
              </p>
            </div>
          ) : (
            <ul className="py-2">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                     onClick={handleClose}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="relative h-14 w-14 rounded-lg bg-white/5 overflow-hidden shrink-0">
                      {product.images[0] && (
                        <Image
                          src={product.images[0].url}
                          alt={product.images[0].alt}
                          fill
                          className="object-contain p-1"
                          sizes="56px"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.brand} · {product.category}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {formatPrice(product.price)}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {results.length > 0 && (
          <div className="border-t border-border px-4 py-3">
            <Link
              href={`/shop?q=${encodeURIComponent(query)}`}
               onClick={handleClose}
              className="text-sm text-accent hover:text-accent-hover font-medium"
            >
              View all results →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
