"use client";

import { X, Check } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { cn, formatUZS } from "@/lib/utils";

export type Filters = {
  categories: string[];
  priceMin: number;
  priceMax: number;
  colors: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
};

const ALL_COLORS = [
  { name: "Tabiiy yog‘och", hex: "#A0714A" },
  { name: "To‘q eman", hex: "#5C3A1E" },
  { name: "Qora", hex: "#1A1A1A" },
  { name: "Oq", hex: "#F5F5F5" },
  { name: "Gold", hex: "#E8AF42" },
  { name: "Kulrang", hex: "#737373" },
];

const PRICE_MAX = 10000000;

export function ProductFilters({
  filters,
  onChange,
  onReset,
  productCount,
  onClose,
  mobile = false,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
  productCount: number;
  onClose?: () => void;
  mobile?: boolean;
}) {
  const toggleCategory = (slug: string) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    onChange({ categories: next });
  };

  const toggleColor = (hex: string) => {
    const next = filters.colors.includes(hex)
      ? filters.colors.filter((c) => c !== hex)
      : [...filters.colors, hex];
    onChange({ colors: next });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal-700/8 pb-5">
        <div>
          <h3 className="font-serif text-lg font-semibold text-charcoal-800">
            Filtrlar
          </h3>
          <p className="price-text mt-0.5 text-[11px] text-charcoal-400">
            {productCount} ta mahsulot
          </p>
        </div>
        {mobile && onClose ? (
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="grid h-9 w-9 place-items-center rounded-full text-charcoal-500 hover:bg-charcoal-700/5"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={onReset}
            className="text-[11px] font-semibold uppercase tracking-wider text-forest-600 transition-colors hover:text-gold-500"
          >
            Tozalash
          </button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 space-y-7 overflow-y-auto py-6">
        {/* Categories */}
        <FilterSection title="Kategoriya">
          <div className="space-y-1">
            {categories.map((c) => {
              const checked = filters.categories.includes(c.slug);
              return (
                <button
                  key={c.slug}
                  onClick={() => toggleCategory(c.slug)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all",
                    checked
                      ? "bg-forest-600/8 text-forest-700"
                      : "text-charcoal-600 hover:bg-charcoal-700/5"
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "grid h-4 w-4 place-items-center rounded border transition-all",
                        checked
                          ? "border-forest-600 bg-forest-600"
                          : "border-charcoal-700/20"
                      )}
                    >
                      {checked && <Check className="h-2.5 w-2.5 text-ivory-100" />}
                    </span>
                    {c.name.uz}
                  </span>
                  <span className="price-text text-[10px] text-charcoal-400">
                    {c.productCount}
                  </span>
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Price */}
        <FilterSection title="Narx">
          <div className="px-1">
            <div className="mb-4 flex items-center justify-between text-xs">
              <span className="price-text text-charcoal-500">
                {formatUZS(filters.priceMin)}
              </span>
              <span className="price-text text-charcoal-500">
                {formatUZS(filters.priceMax)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={PRICE_MAX}
              step={100000}
              value={filters.priceMax}
              onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
              className="w-full accent-forest-600"
            />
          </div>
        </FilterSection>

        {/* Colors */}
        <FilterSection title="Rang">
          <div className="flex flex-wrap gap-2.5">
            {ALL_COLORS.map((c) => {
              const checked = filters.colors.includes(c.hex);
              return (
                <button
                  key={c.hex}
                  onClick={() => toggleColor(c.hex)}
                  title={c.name}
                  className={cn(
                    "relative grid h-9 w-9 place-items-center rounded-full ring-1 transition-all",
                    checked
                      ? "ring-2 ring-forest-600 ring-offset-2 ring-offset-ivory-100"
                      : "ring-charcoal-700/15 hover:ring-charcoal-700/40"
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  {checked && (
                    <Check
                      className="h-3.5 w-3.5"
                      style={{
                        color:
                          c.hex === "#F5F5F5" || c.hex === "#E8AF42"
                            ? "#202522"
                            : "#F5F1E8",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Toggles */}
        <FilterSection title="Boshqa">
          <div className="space-y-2">
            <Toggle
              label="Faqat omborda"
              checked={filters.inStockOnly}
              onChange={(v) => onChange({ inStockOnly: v })}
            />
            <Toggle
              label="Faqat chegirmada"
              checked={filters.onSaleOnly}
              onChange={(v) => onChange({ onSaleOnly: v })}
            />
          </div>
        </FilterSection>
      </div>

      {/* Mobile footer */}
      {mobile && onClose && (
        <div className="border-t border-charcoal-700/8 pt-4">
          <button
            onClick={onClose}
            className="h-13 w-full rounded-xl bg-forest-600 text-sm font-semibold text-ivory-100 transition-colors hover:bg-forest-700"
          >
            Natijalarni ko‘rish ({productCount})
          </button>
        </div>
      )}
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="label-mono mb-3 text-charcoal-400">{title}</h4>
      {children}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-charcoal-700/5">
      <span className="text-sm text-charcoal-600">{label}</span>
      <span
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors",
          checked ? "bg-forest-600" : "bg-charcoal-700/15"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-4" : "translate-x-0.5"
          )}
        />
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
    </label>
  );
}
