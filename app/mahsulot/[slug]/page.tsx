import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { getProductBySlug, products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductViewer } from "@/components/3d/ProductViewer";
import { Badge } from "@/components/ui/Badge";
import { formatUZS } from "@/lib/utils";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const hasDiscount = !!product.compareAtPrice && product.compareAtPrice > product.price;
  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container-x py-12">
      <nav className="mb-8 flex items-center gap-2 text-xs text-charcoal-500">
        <Link href="/" className="hover:text-forest-600">Bosh sahifa</Link>
        <span>/</span>
        <Link href="/mahsulotlar" className="hover:text-forest-600">Mahsulotlar</Link>
        <span>/</span>
        <span className="text-charcoal-800">{product.name.uz}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <ProductViewer
            modelUrl={product.model3d}
            fallbackImage={product.images[0]}
            productName={product.name.uz}
          />

          {product.model3d && (
            <div className="rounded-2xl border border-gold-400/30 bg-gold-400/5 px-4 py-3 text-xs text-charcoal-700">
              <strong>Maslahat:</strong> Modelni sichqoncha yoki barmoq bilan aylantiring.
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.isNew && <Badge variant="new">Yangi</Badge>}
            {product.isBestseller && <Badge variant="gold">Bestseller</Badge>}
            {hasDiscount && (
              <Badge variant="sale">
                -{Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)}%
              </Badge>
            )}
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold text-charcoal-900 md:text-4xl">
            {product.name.uz}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-gold-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-semibold text-charcoal-700">{product.rating.toFixed(1)}</span>
              <span className="text-charcoal-400">({product.reviewCount} sharh)</span>
            </div>
            {product.inStock && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Omborda: {product.stockCount} dona
              </span>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-charcoal-600">
            {product.description.uz}
          </p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-3xl font-bold text-charcoal-900">
              {formatUZS(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-charcoal-400 line-through">
                {formatUZS(product.compareAtPrice!)}
              </span>
            )}
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
              Rang tanlang
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.hex}
                  className="group flex items-center gap-2 rounded-xl border border-charcoal-200 bg-white px-3 py-2 text-xs hover:border-forest-600"
                >
                  <span
                    className="h-4 w-4 rounded-full border border-charcoal-200"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name.uz}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-forest-600 text-base font-semibold text-white transition-all hover:bg-forest-700">
              <ShoppingBag className="h-5 w-5" />
              Savatga qoshish
            </button>
            <button className="grid h-14 w-14 place-items-center rounded-2xl border border-charcoal-200 bg-white text-charcoal-700 hover:border-forest-600">
              <Heart className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 grid gap-3 rounded-2xl border border-charcoal-200/60 bg-charcoal-50 p-5 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-forest-600" />
              <div>
                <p className="text-xs font-semibold text-charcoal-800">Bepul yetkazish</p>
                <p className="text-[11px] text-charcoal-500">Toshkent boylab</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="mt-0.5 h-5 w-5 shrink-0 text-forest-600" />
              <div>
                <p className="text-xs font-semibold text-charcoal-800">30 kun qaytarish</p>
                <p className="text-[11px] text-charcoal-500">Shartlarsiz</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-forest-600" />
              <div>
                <p className="text-xs font-semibold text-charcoal-800">12 oy kafolat</p>
                <p className="text-[11px] text-charcoal-500">Rasmiy</p>
              </div>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-charcoal-200/60 p-5 text-sm">
            <div>
              <dt className="text-xs text-charcoal-500">Material</dt>
              <dd className="mt-1 font-medium text-charcoal-800">{product.material.uz}</dd>
            </div>
            <div>
              <dt className="text-xs text-charcoal-500">Vazn</dt>
              <dd className="mt-1 font-medium text-charcoal-800">{product.weight} kg</dd>
            </div>
            <div>
              <dt className="text-xs text-charcoal-500">Olchamlar</dt>
              <dd className="mt-1 font-medium text-charcoal-800">
                {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} sm
              </dd>
            </div>
            <div>
              <dt className="text-xs text-charcoal-500">Ishlab chiqarish</dt>
              <dd className="mt-1 font-medium text-charcoal-800">{product.productionDays} kun</dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl font-bold text-charcoal-900">
            Oxshash mahsulotlar
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
