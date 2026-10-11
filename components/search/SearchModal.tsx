"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, TrendingUp, ArrowRight, Package } from "lucide-react";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { formatUZS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const POPULAR_SEARCHES = ["Javon", "Stol", "X-stellaj", "Ofis kursisi", "Shkaf"];

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      document.body.style.overflow = "hidden";
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handler);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handler);
      };
    }
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.uz.toLowerCase().includes(q) ||
          p.shortDescription.uz.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      )
      .slice(0, 6);
  }, [query]);

  const matchedCategories = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return categories.filter((c) => c.name.uz.toLowerCase().includes(q)).slice(0, 3);
  }, [query]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/mahsulotlar?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  if (!open || !mounted) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-20">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Search input */}
        <form onSubmit={submit} className="flex items-center gap-3 border-b border-charcoal-100 px-5 py-4">
          <Search className="h-5 w-5 shrink-0 text-charcoal-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mahsulot yoki kategoriya qidirish..."
            className="h-10 flex-1 bg-transparent text-base text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="grid h-7 w-7 place-items-center rounded-full text-charcoal-400 hover:bg-charcoal-100"
              aria-label="Tozalash"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="hidden rounded-lg border border-charcoal-200 px-2 py-1 text-[10px] font-medium text-charcoal-500 md:block"
          >
            ESC
          </button>
        </form>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Empty state — popular searches */}
          {!query.trim() && (
            <div className="p-5">
              <p className="label-mono mb-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">
                Mashhur qidiruvlar
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="inline-flex items-center gap-2 rounded-xl border border-charcoal-200 bg-white px-4 py-2 text-sm font-medium text-charcoal-700 transition-all hover:border-forest-600 hover:text-forest-600"
                  >
                    <TrendingUp className="h-3.5 w-3.5" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty state — no results */}
          {query.trim() && results.length === 0 && matchedCategories.length === 0 && (
            <div className="py-16 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-charcoal-50">
                <Search className="h-7 w-7 text-charcoal-300" />
              </div>
              <p className="mt-4 text-sm font-semibold text-charcoal-700">
                Hech narsa topilmadi
              </p>
              <p className="mt-1 text-xs text-charcoal-500">
                Boshqa so‘z bilan urinib ko‘ring
              </p>
            </div>
          )}

          {/* Categories */}
          {matchedCategories.length > 0 && (
            <div className="border-b border-charcoal-100 p-4">
              <p className="label-mono mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal-500">
                Kategoriyalar
              </p>
              {matchedCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/kategoriya/${c.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-charcoal-50"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-forest-600/10 text-forest-600">
                    <Package className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-charcoal-800">
                      {c.name.uz}
                    </p>
                    <p className="text-[11px] text-charcoal-500">
                      {c.productCount} ta mahsulot
                    </p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-charcoal-400" />
                </Link>
              ))}
            </div>
          )}

          {/* Products */}
          {results.length > 0 && (
            <div className="p-4">
              <p className="label-mono mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal-500">
                Mahsulotlar ({results.length})
              </p>
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/mahsulot/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-charcoal-50"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-charcoal-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.images[0]}
                      alt={p.name.uz}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold text-charcoal-800">
                      {p.name.uz}
                    </p>
                    <p className="line-clamp-1 text-[11px] text-charcoal-500">
                      {p.shortDescription.uz}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="price-text text-sm font-bold text-charcoal-900">
                      {formatUZS(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Footer */}
          {query.trim() && results.length > 0 && (
            <div className="border-t border-charcoal-100 bg-charcoal-50/50 px-4 py-3">
              <button
                onClick={() => {
                  router.push(`/mahsulotlar?q=${encodeURIComponent(query.trim())}`);
                  onClose();
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest-600 py-2.5 text-sm font-semibold text-white hover:bg-forest-700"
              >
                Barcha natijalarni ko‘rish
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
