import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { getProductBySlug, products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductViewer } from "@/components/3d/ProductViewer";
import { formatUZS } from "@/lib/utils";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const hasDiscount = !!product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container-wide py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-charcoal-400">
        <Link href="/" className="transition-colors hover:text-forest-600">Bosh sahifa</Link>
        <span>/</span>
        <Link href="/mahsulotlar" className="transition-colors hover:text-forest-600">Mahsulotlar</Link>
        <span>/</span>
        <span className="text-charcoal-700">{product.name.uz}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — 3D + badges */}
        <div className="space-y-4">
          <ProductViewer
            modelUrl={product.model3d}
            fallbackImage={product.images[0]}
            productName={product.name.uz}
          />

          {product.model3d && (
            <div className="rounded-2xl border border-gold-400/30 bg-gold-400/5 px-4 py-3 text-xs text-charcoal-700">
              💡 <strong className="font-semibold">Maslahat:</strong> Modelni sichqoncha yoki barmoq bilan aylantiring
            </div>
          )}
        </div>

        {/* Right — info */}
        <div>
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {product.isNew && (
              <span className="label-mono inline-flex items-center rounded-full bg-forest-600 px-2.5 py-1 text-[10px] text-ivory-200">
                Yangi
              </span>
            )}
            {product.isBestseller && (
              <span className="label-mono inline-flex items-center rounded-full bg-gold-400 px-2.5 py-1 text-[10px] text-charcoal-800">
                Bestseller
              </span>
            )}
            {hasDiscount && (
              <span className="label-mono inline-flex items-center rounded-full bg-charcoal-700 px-2.5 py-1 text-[10px] text-ivory-200">
                −{discountPercent}%
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-charcoal-800 md:text-5xl">
            {product.name.uz}
          </h1>

          {/* Rating + stock */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
              <span className="price-text font-semibold text-charcoal-700">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-charcoal-400">({product.reviewCount} sharh)</span>
            </div>
            {product.inStock && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-600/10 px-3 py-1 text-xs font-medium text-forest-700">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-600" />
                Omborda: {product.stockCount} dona
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-sm leading-relaxed text-charcoal-500">
            {product.description.uz}
          </p>

          {/* Price */}
          <div className="mt-8 flex items-end gap-4">
            <span className="price-display text-3xl text-charcoal-800 md:text-4xl">
              {formatUZS(product.price)}
            </span>
            {hasDiscount && (
              <span className="price-text text-lg text-charcoal-300 line-through">
                {formatUZS(product.compareAtPrice!)}
              </span>
            )}
          </div>

          {/* Colors */}
          <div className="mt-8">
            <p className="label-mono mb-3 text-charcoal-400">Rang tanlang</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.hex}
                  title={c.name.uz}
                  className="group flex items-center gap-2 rounded-xl border border-sage-200 bg-white px-3 py-2 text-xs font-medium text-charcoal-700 transition-all hover:border-forest-600"
                >
                  <span
                    className="h-4 w-4 rounded-full ring-1 ring-charcoal-700/10"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name.uz}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex gap-3">
            <button className="group flex h-14 flex-1 items-center justify-center gap-2.5 rounded-xl bg-forest-600 text-base font-semibold text-ivory-200 transition-all hover:bg-forest-700">
              <ShoppingBag className="h-5 w-5" />
              Savatga qo‘shish
            </button>
            <button
              aria-label="Sevimlilarga qo‘shish"
              className="grid h-14 w-14 place-items-center rounded-xl border border-sage-200 bg-white text-charcoal-500 transition-all hover:border-forest-600 hover:text-forest-600"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Info cards */}
          <div className="mt-8 grid gap-3 rounded-2xl border border-sage-200 bg-ivory-100 p-5 md:grid-cols-3">
            <InfoCard icon={Truck} title="Bepul yetkazish" sub="Toshkent bo‘ylab" />
            <InfoCard icon={RotateCcw} title="30 kun qaytarish" sub="Shartlarsiz" />
            <InfoCard icon={ShieldCheck} title="12 oy kafolat" sub="Rasmiy" />
          </div>

          {/* Specs */}
          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-sage-200 bg-white p-5 text-sm">
            <Spec label="Material" value={product.material.uz} />
            <Spec label="Vazni" value={`${product.weight} kg`} />
            <Spec
              label="O‘lchamlar"
              value={`${product.dimensions.width}×${product.dimensions.height}×${product.dimensions.depth} sm`}
            />
            <Spec label="Tayyorlash" value={`${product.productionDays} kun`} />
          </dl>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="mb-10">
            <span className="label-mono text-gold-500">O‘xshash</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-charcoal-800 md:text-4xl">
              Sizga ham yoqishi mumkin
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  sub,
}: {
  icon: typeof Truck;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-forest-600/10 text-forest-600">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs font-semibold text-charcoal-800">{title}</p>
        <p className="mt-0.5 text-[11px] text-charcoal-400">{sub}</p>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label-mono text-charcoal-400">{label}</dt>
      <dd className="mt-1 font-medium text-charcoal-800">{value}</dd>
    </div>
  );
}
