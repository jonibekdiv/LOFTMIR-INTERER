"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";
import { cn, formatUZS } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const favItems = useFavoritesStore((s) => s.items);
  const toggleFav = useFavoritesStore((s) => s.toggle);
  const isFav = favItems.some((i) => i.productId === product.id);

  const hasDiscount = !!product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const coverImage = product.images[0];

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFav({
      productId: product.id,
      slug: product.slug,
      name: product.name.uz,
      image: coverImage,
      price: product.price,
    });
  };

  return (
    <article className="group hover-lift relative overflow-hidden rounded-2xl border border-graphite-200/60 bg-white">
      <Link href={`/mahsulot/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-graphite-100">
          {!imgError ? (
            <Image
              src={coverImage}
              alt={product.name.uz}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #1e4a47 0%, #256c63 60%, #0f2a28 100%)",
              }}
            >
              <span className="font-display text-6xl text-white/30">
                {product.name.uz.charAt(0)}
              </span>
            </div>
          )}

          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.isNew && <Badge variant="new">Yangi</Badge>}
            {product.isBestseller && <Badge variant="gold">Bestseller</Badge>}
            {hasDiscount && <Badge variant="sale">-{discountPercent}%</Badge>}
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={isFav ? "Sevimlilardan o‘chirish" : "Sevimlilarga qo‘shish"}
        onClick={handleFav}
        className={cn(
          "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur-md transition-all",
          isFav
            ? "bg-red-500 text-white scale-105"
            : "bg-white/80 text-graphite-700 hover:bg-white hover:scale-110"
        )}
      >
        <Heart className={cn("h-4 w-4 transition-all", isFav && "fill-current")} />
      </button>

      <div className="p-4">
        <div className="flex items-center gap-1 text-xs text-gold-500">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="table-num font-semibold text-graphite-700">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-graphite-400">({product.reviewCount})</span>
        </div>

        <Link href={`/mahsulot/${product.slug}`}>
          <h3 className="mt-1.5 line-clamp-1 text-base font-semibold text-graphite-800 transition-colors group-hover:text-petrol-600">
            {product.name.uz}
          </h3>
        </Link>

        <p className="mt-0.5 line-clamp-1 text-xs text-graphite-500">
          {product.shortDescription.uz}
        </p>

        <div className="mt-3 flex items-center gap-1.5">
          {product.colors.slice(0, 4).map((c) => (
            <span
              key={c.hex}
              title={c.name.uz}
              className="h-3.5 w-3.5 rounded-full border border-graphite-200"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="price-text text-xs text-graphite-400 line-through">
                {formatUZS(product.compareAtPrice!)}
              </span>
            )}
            <span className="price-display text-lg text-graphite-900">
              {formatUZS(product.price)}
            </span>
          </div>

          <button
            type="button"
            aria-label="Savatga qo‘shish"
            onClick={() => addItem(product)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-petrol-600 text-white transition-all hover:scale-105 hover:bg-petrol-700 active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
