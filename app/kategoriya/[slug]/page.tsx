import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const list = products.filter((p) => p.categorySlug === slug);

  return (
    <div className="container-x py-12">
      <nav className="mb-6 flex items-center gap-2 text-xs text-graphite-500">
        <Link href="/" className="hover:text-petrol-600">Bosh sahifa</Link>
        <span>/</span>
        <Link href="/mahsulotlar" className="hover:text-petrol-600">Mahsulotlar</Link>
        <span>/</span>
        <span className="text-graphite-800">{category.name.uz}</span>
      </nav>

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
          Kategoriya
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-graphite-900 md:text-5xl">
          {category.name.uz}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-graphite-500">
          {category.description.uz}
        </p>
        <p className="mt-3 text-xs font-medium text-graphite-400">
          {list.length} ta mahsulot topildi
        </p>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-graphite-200 bg-white py-20 text-center">
          <Package className="mx-auto h-10 w-10 text-graphite-300" />
          <p className="mt-3 font-display text-xl font-bold text-graphite-700">
            Bu kategoriyada mahsulot yoq
          </p>
          <Link
            href="/mahsulotlar"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-petrol-600 px-5 text-sm font-semibold text-white hover:bg-petrol-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Barcha mahsulotlar
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
