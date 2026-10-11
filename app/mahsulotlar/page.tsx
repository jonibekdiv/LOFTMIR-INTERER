"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Package,
} from "lucide-react";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import {
  ProductFilters,
  type Filters,
} from "@/components/product/ProductFilters";
import { cn } from "@/lib/utils";

type SortKey = "newest" | "price-asc" | "price-desc" | "rating" | "popular";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Yangi" },
  { value: "popular", label: "Mashhur" },
  { value: "price-asc", label: "Narx: pastdan" },
  { value: "price-desc", label: "Narx: yuqoridan" },
  { value: "rating", label: "Reyting" },
];

const DEFAULT_FILTERS: Filters = {
  categories: [],
  priceMin: 0,
  priceMax: 10000000,
  colors: [],
  inStockOnly: false,
  onSaleOnly: false,
};

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortKey>("newest");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  /* URL'dan query yangilanishini kuzatish */
  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) setQuery(q);
  }, [searchParams]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = mobileFiltersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  /* Filtrlash + saralash */
  const filtered = useMemo(() => {
    let list = [...products];

    /* Qidiruv */
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.uz.toLowerCase().includes(q) ||
          p.shortDescription.uz.toLowerCase().includes(q) ||
          p.material.uz.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    /* Kategoriya */
    if (filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.categorySlug));
    }

    /* Narx */
    list = list.filter(
      (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
    );

    /* Rang */
    if (filters.colors.length > 0) {
      list = list.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.hex))
      );
    }

    /* Omborda */
    if (filters.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    /* Chegirmada */
    if (filters.onSaleOnly) {
      list = list.filter(
        (p) => p.compareAtPrice && p.compareAtPrice > p.price
      );
    }

    /* Saralash */
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
      default:
        list.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
    }

    return list;
  }, [query, sort, filters]);

  /* Aktiv filtrlar soni */
  const activeFilterCount =
    filters.categories.length +
    filters.colors.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    (filters.priceMax < 10000000 ? 1 : 0);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setQuery("");
  };

  const currentSortLabel = SORT_OPTIONS.find((s) => s.value === sort)?.label;

  return (
    <div className="container-wide py-10 md:py-14">
      {/* ═══════════ HEADER ═══════════ */}
      <div className="mb-8">
        <nav className="mb-4 flex items-center gap-2 text-xs text-charcoal-400">
          <a href="/" className="transition-colors hover:text-forest-600">
            Bosh sahifa
          </a>
          <span>/</span>
          <span className="text-charcoal-700">Mahsulotlar</span>
        </nav>

        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight tracking-tight text-charcoal-800">
              {query ? (
                <>
                  <span className="text-charcoal-400">Qidiruv:</span>{" "}
                  <span className="italic">{query}</span>
                </>
              ) : (
                <>
                  Barcha <span className="italic text-forest-600">mahsulotlar</span>
                </>
              )}
            </h1>
            <p className="price-text mt-2 text-sm text-charcoal-400">
              {filtered.length} ta mahsulot topildi
            </p>
          </div>

          {/* Search input — desktop */}
          <div className="relative hidden md:block md:max-w-xs md:flex-1 lg:max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mahsulot qidirish..."
              className="h-12 w-full rounded-xl border border-charcoal-700/10 bg-white pl-11 pr-4 text-sm focus:border-forest-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ═══════════ MAIN LAYOUT ═══════════ */}
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* ─── Desktop Filters Sidebar ─── */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] rounded-2xl border border-charcoal-700/8 bg-white p-6">
            <ProductFilters
              filters={filters}
              onChange={(patch) => setFilters({ ...filters, ...patch })}
              onReset={resetFilters}
              productCount={filtered.length}
            />
          </div>
        </aside>

        {/* ─── Main content ─── */}
        <div>
          {/* Mobile search */}
          <div className="relative mb-4 md:hidden">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mahsulot qidirish..."
              className="h-12 w-full rounded-xl border border-charcoal-700/10 bg-white pl-11 pr-4 text-sm focus:border-forest-600 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Tozalash"
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-charcoal-400 hover:bg-charcoal-700/5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Mobile filter button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-charcoal-700/10 bg-white px-4 text-sm font-medium text-charcoal-700 transition-colors hover:border-forest-600/30 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtr
                {activeFilterCount > 0 && (
                  <span className="price-text grid h-5 min-w-5 place-items-center rounded-full bg-forest-600 px-1.5 text-[10px] font-bold text-ivory-100">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Active filter chips */}
              {activeFilterCount > 0 && (
                <div className="hidden items-center gap-2 md:flex">
                  {filters.categories.map((c) => (
                    <Chip
                      key={c}
                      label={c}
                      onRemove={() =>
                        setFilters({
                          ...filters,
                          categories: filters.categories.filter((x) => x !== c),
                        })
                      }
                    />
                  ))}
                  <button
                    onClick={resetFilters}
                    className="text-[11px] font-semibold uppercase tracking-wider text-forest-600 transition-colors hover:text-gold-500"
                  >
                    Hammasini tozalash
                  </button>
                </div>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-charcoal-700/10 bg-white px-4 text-sm font-medium text-charcoal-700 transition-colors hover:border-forest-600/30"
              >
                <span className="text-charcoal-400">Saralash:</span>
                <span>{currentSortLabel}</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 text-charcoal-400 transition-transform",
                    sortOpen && "rotate-180"
                  )}
                />
              </button>

              {sortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setSortOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-charcoal-700/10 bg-white py-1 shadow-lg">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSort(opt.value);
                          setSortOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors",
                          sort === opt.value
                            ? "bg-forest-600/8 font-semibold text-forest-700"
                            : "text-charcoal-600 hover:bg-charcoal-700/5"
                        )}
                      >
                        {opt.label}
                        {sort === opt.value && (
                          <span className="h-1.5 w-1.5 rounded-full bg-forest-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Mobile Filters Drawer ─── */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-[visibility,opacity] duration-500",
          mobileFiltersOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-charcoal-800/60 backdrop-blur-md"
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 max-h-[90vh] rounded-t-3xl bg-ivory-100 p-6 shadow-2xl transition-transform duration-500 ease-expo",
            mobileFiltersOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-charcoal-700/15" />
          <ProductFilters
            filters={filters}
            onChange={(patch) => setFilters({ ...filters, ...patch })}
            onReset={resetFilters}
            productCount={filtered.length}
            onClose={() => setMobileFiltersOpen(false)}
            mobile
          />
        </div>
      </div>
    </div>
  );
}

/* Chip */
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-600/10 px-3 py-1.5 text-xs font-medium text-forest-700">
      {label}
      <button
        onClick={onRemove}
        className="grid h-4 w-4 place-items-center rounded-full transition-colors hover:bg-forest-600/20"
        aria-label="O‘chirish"
      >
        <X className="h-2.5 w-2.5" />
      </button>
    </span>
  );
}

/* Empty state */
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-charcoal-700/15 bg-white py-24 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ivory-200">
        <Package className="h-8 w-8 text-charcoal-400" />
      </div>
      <h2 className="mt-6 font-serif text-2xl font-bold text-charcoal-800">
        Mahsulot topilmadi
      </h2>
      <p className="mt-2 text-sm text-charcoal-400">
        Filtrni o‘zgartiring yoki boshqa narsa qidirib ko‘ring
      </p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-forest-600 px-6 text-sm font-semibold text-ivory-100 transition-colors hover:bg-forest-700"
      >
        Filtrni tozalash
      </button>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-wide flex min-h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-charcoal-700/10 border-t-forest-600" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
