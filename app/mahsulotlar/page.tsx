"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { ProductCard } from "@/components/product/ProductCard";
import { cn, formatUZS } from "@/lib/utils";

type SortKey = "newest" | "price-asc" | "price-desc" | "rating";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("newest");
  const [priceMax, setPriceMax] = useState<number>(10000000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.uz.toLowerCase().includes(q) ||
          p.shortDescription.uz.toLowerCase().includes(q)
      );
    }
    if (selectedCat) list = list.filter((p) => p.categorySlug === selectedCat);
    list = list.filter((p) => p.price <= priceMax);
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [query, selectedCat, sort, priceMax]);

  return (
    <div className="container-x py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-graphite-900 md:text-5xl">
          Barcha mahsulotlar
        </h1>
        <p className="mt-2 text-sm text-graphite-500">
          {filtered.length} ta mahsulot topildi
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qidirish..."
            className="h-12 w-full rounded-xl border border-graphite-200 bg-white pl-11 pr-4 text-sm focus:border-petrol-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(true)}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-graphite-200 bg-white px-4 text-sm font-medium hover:border-petrol-600"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtr
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-12 rounded-xl border border-graphite-200 bg-white px-4 text-sm focus:border-petrol-600 focus:outline-none"
          >
            <option value="newest">Yangi</option>
            <option value="price-asc">Narx: arzondan</option>
            <option value="price-desc">Narx: qimmatdan</option>
            <option value="rating">Reyting</option>
          </select>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCat(null)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
            !selectedCat ? "border-petrol-600 bg-petrol-600 text-white" : "border-graphite-200 bg-white hover:border-petrol-600"
          )}
        >
          Hammasi
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setSelectedCat(c.slug)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
              selectedCat === c.slug ? "border-petrol-600 bg-petrol-600 text-white" : "border-graphite-200 bg-white hover:border-petrol-600"
            )}
          >
            {c.name.uz}
          </button>
        ))}
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
          <div className="absolute inset-0 bg-graphite-900/40 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="relative w-full max-w-md rounded-t-3xl bg-white p-6 md:rounded-3xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">Filtrlar</h3>
              <button onClick={() => setShowFilters(false)} className="grid h-9 w-9 place-items-center rounded-xl hover:bg-graphite-100">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div>
              <label className="text-sm font-medium text-graphite-700">
                Maksimal narx: {formatUZS(priceMax)}
              </label>
              <input
                type="range"
                min={500000}
                max={10000000}
                step={100000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="mt-3 w-full accent-petrol-600"
              />
            </div>
            <button
              onClick={() => setShowFilters(false)}
              className="mt-6 h-12 w-full rounded-xl bg-petrol-600 text-white font-medium"
            >
              Ko‘rsatish
            </button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-graphite-200 bg-graphite-50 py-20 text-center">
          <p className="text-sm text-graphite-500">Hech narsa topilmadi</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
