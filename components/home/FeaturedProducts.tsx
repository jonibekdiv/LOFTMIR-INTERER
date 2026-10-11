import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="bg-graphite-50 py-20 md:py-28">
      <div className="container-x">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
              Tanlangan
            </span>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight text-graphite-900 md:text-5xl">
              Eng sevimli mahsulotlar
            </h2>
          </div>
          <Link
            href="/mahsulotlar"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-petrol-600 hover:text-gold-500 transition-colors"
          >
            Barchasini korish
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
