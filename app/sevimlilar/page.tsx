"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag, ArrowRight, Star } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites";
import { useCartStore } from "@/lib/store/cart";
import { products } from "@/lib/data/products";
import { formatUZS } from "@/lib/utils";

export default function FavoritesPage() {
  const { items, remove, clear } = useFavoritesStore();
  const addItem = useCartStore((s) => s.addItem);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="container-wide flex min-h-[60vh] items-center justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-sage-200 border-t-forest-600" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-wide py-12">
        <h1 className="font-serif text-4xl font-bold text-charcoal-800 md:text-5xl">
          Sevimlilar
        </h1>
        <div className="mt-10 rounded-3xl border border-dashed border-sage-200 bg-ivory-100 py-24 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_4px_24px_-8px_rgba(18,79,69,0.1)]">
            <Heart className="h-8 w-8 text-charcoal-300" />
          </div>
          <h2 className="mt-6 font-serif text-2xl font-bold text-charcoal-800">
            Sevimlilar bo‘sh
          </h2>
          <p className="mt-2 text-sm text-charcoal-400">
            Yoqqan mahsulotlarni yurakcha bilan belgilang
          </p>
          <Link
            href="/mahsulotlar"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-forest-600 px-6 text-sm font-semibold text-ivory-200 transition-colors hover:bg-forest-700"
          >
            Mahsulotlarni ko‘rish
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-wide py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 md:text-5xl">
            Sevimlilar
          </h1>
          <p className="price-text mt-2 text-sm text-charcoal-400">
            {items.length} ta mahsulot
          </p>
        </div>
        <button
          onClick={clear}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-sage-200 bg-white px-4 text-xs font-medium text-charcoal-500 transition-all hover:border-red-300 hover:text-red-500"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Tozalash
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((fav) => {
          const product = products.find((p) => p.id === fav.productId);
          const hasDiscount = product?.compareAtPrice && product.compareAtPrice > fav.price;

          return (
            <article
              key={fav.productId}
              className="group relative overflow-hidden rounded-2xl border border-sage-200 bg-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_48px_-20px_rgba(18,79,69,0.35)]"
            >
              <Link href={`/mahsulot/${fav.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-ivory-300">
                  <Image
                    src={fav.image}
                    alt={fav.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </Link>

              <button
                type="button"
                onClick={() => remove(fav.productId)}
                aria-label="Sevimlilardan o‘chirish"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-gold-400 text-charcoal-800 backdrop-blur-md transition-all hover:scale-110"
              >
                <Heart className="h-4 w-4 fill-current" />
              </button>

              <div className="p-4">
                {product && (
                  <div className="flex items-center gap-1 text-xs text-gold-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="price-text font-semibold text-charcoal-700">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-charcoal-400">
                      ({product.reviewCount})
                    </span>
                  </div>
                )}

                <Link href={`/mahsulot/${fav.slug}`}>
                  <h3 className="mt-1.5 line-clamp-1 font-serif text-base font-semibold text-charcoal-800 transition-colors group-hover:text-forest-600">
                    {fav.name}
                  </h3>
                </Link>

                <div className="mt-4 flex items-end justify-between gap-2">
                  <div className="flex flex-col">
                    {hasDiscount && (
                      <span className="price-text text-xs text-charcoal-300 line-through">
                        {formatUZS(product!.compareAtPrice!)}
                      </span>
                    )}
                    <span className="price-display text-lg text-charcoal-800">
                      {formatUZS(fav.price)}
                    </span>
                  </div>

                  {product && (
                    <button
                      type="button"
                      aria-label="Savatga qo‘shish"
                      onClick={() => addItem(product)}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-600 text-ivory-200 transition-all hover:scale-105 hover:bg-forest-700 active:scale-95"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
