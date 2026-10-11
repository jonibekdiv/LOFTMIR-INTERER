"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag, ArrowRight, Star } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites";
import { useCartStore } from "@/lib/store/cart";
import { products } from "@/lib/data/products";
import { formatUZS } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function FavoritesPage() {
  const { items, remove, clear } = useFavoritesStore();
  const addItem = useCartStore((s) => s.addItem);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-graphite-200 border-t-petrol-600" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-x py-12">
        <h1 className="heading-display text-4xl text-graphite-900 md:text-5xl">
          Sevimlilar
        </h1>
        <div className="mt-10 rounded-3xl border border-dashed border-graphite-200 bg-graphite-50 py-24 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-soft">
            <Heart className="h-8 w-8 text-graphite-400" />
          </div>
          <h2 className="mt-6 heading-display text-2xl text-graphite-800">
            Sevimlilar bo‘sh
          </h2>
          <p className="mt-2 text-sm text-graphite-500">
            Yoqqan mahsulotlarni yurakcha bilan belgilang
          </p>
          <Link
            href="/mahsulotlar"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-petrol-600 px-6 text-sm font-semibold text-white hover:bg-petrol-700"
          >
            Mahsulotlarni ko‘rish
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="heading-display text-4xl text-graphite-900 md:text-5xl">
            Sevimlilar
          </h1>
          <p className="mt-2 text-sm text-graphite-500">
            {items.length} ta mahsulot
          </p>
        </div>
        <button
          onClick={clear}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-graphite-200 px-4 text-xs font-medium text-graphite-600 hover:border-red-300 hover:text-red-500"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Tozalash
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((fav) => {
          const product = products.find((p) => p.id === fav.productId);
          const coverImage = fav.image;
          const hasDiscount = product?.compareAtPrice && product.compareAtPrice > fav.price;

          return (
            <article
              key={fav.productId}
              className="group hover-lift relative overflow-hidden rounded-2xl border border-graphite-200/60 bg-white"
            >
              <Link href={`/mahsulot/${fav.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-graphite-100">
                  <Image
                    src={coverImage}
                    alt={fav.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Link>

              <button
                type="button"
                onClick={() => remove(fav.productId)}
                aria-label="Sevimlilardan o‘chirish"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-red-500 text-white backdrop-blur-md transition-all hover:scale-110"
              >
                <Heart className="h-4 w-4 fill-current" />
              </button>

              <div className="p-4">
                {product && (
                  <div className="flex items-center gap-1 text-xs text-gold-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="table-num font-semibold text-graphite-700">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-graphite-400">
                      ({product.reviewCount})
                    </span>
                  </div>
                )}

                <Link href={`/mahsulot/${fav.slug}`}>
                  <h3 className="mt-1.5 line-clamp-1 text-base font-semibold text-graphite-800 transition-colors group-hover:text-petrol-600">
                    {fav.name}
                  </h3>
                </Link>

                <div className="mt-4 flex items-end justify-between gap-2">
                  <div className="flex flex-col">
                    {hasDiscount && (
                      <span className="price-text text-xs text-graphite-400 line-through">
                        {formatUZS(product!.compareAtPrice!)}
                      </span>
                    )}
                    <span className="price-display text-lg text-graphite-900">
                      {formatUZS(fav.price)}
                    </span>
                  </div>

                  {product && (
                    <button
                      type="button"
                      aria-label="Savatga qo‘shish"
                      onClick={() => addItem(product)}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-petrol-600 text-white transition-all hover:scale-105 hover:bg-petrol-700 active:scale-95"
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
