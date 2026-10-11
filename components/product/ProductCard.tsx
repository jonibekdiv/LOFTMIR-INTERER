"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";
import { cn, formatUZS } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const favItems = useFavoritesStore((s) => s.items);
  const toggleFav = useFavoritesStore((s) => s.toggle);
  const isFav = favItems.some((i) => i.productId === product.id);

  const hasDiscount =
    !!product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100
      )
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
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col"
    >
      <Link
        href={`/mahsulot/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ivory-300"
      >
        {!imgError ? (
          <Image
            src={coverImage}
            alt={product.name.uz}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              "object-cover transition-transform duration-[1200ms]",
              hovered ? "scale-[1.06]" : "scale-100"
            )}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center gradient-forest">
            <span className="font-serif text-6xl text-ivory-200/20">
              {product.name.uz.charAt(0)}
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
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

        {/* Favorite */}
        <button
          type="button"
          aria-label={isFav ? "Sevimlilardan o‘chirish" : "Sevimlilarga qo‘shish"}
          onClick={handleFav}
          className={cn(
            "absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full backdrop-blur-md transition-all duration-300",
            isFav
              ? "bg-gold-400 text-charcoal-800"
              : "bg-ivory-200/80 text-charcoal-500 hover:bg-ivory-200 hover:text-charcoal-800"
          )}
        >
          <Heart
            className={cn("h-[15px] w-[15px] transition-all", isFav && "fill-current")}
          />
        </button>

        {/* Hover overlay */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl bg-charcoal-800/85 px-4 py-3 backdrop-blur-md transition-all duration-500",
            hovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <span className="label-mono text-[10px] text-ivory-200/80">
            Batafsil ko‘rish
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 text-gold-400" />
        </div>
      </Link>

      {/* Info */}
      <div className="mt-4 flex flex-1 flex-col">
        <span className="label-mono text-[10px] text-charcoal-400">
          {product.categorySlug}
        </span>

        <Link
          href={`/mahsulot/${product.slug}`}
          className="mt-2 line-clamp-1 font-serif text-lg font-semibold tracking-tight text-charcoal-800 transition-colors hover:text-forest-600"
        >
          {product.name.uz}
        </Link>

        <p className="mt-1 line-clamp-1 text-xs text-charcoal-400">
          {product.shortDescription.uz}
        </p>

        {product.colors.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.hex}
                title={c.name.uz}
                className="h-3 w-3 rounded-full ring-1 ring-charcoal-700/10"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="price-text text-[11px] text-charcoal-300 line-through">
                {formatUZS(product.compareAtPrice!)}
              </span>
            )}
            <span className="price-display text-base text-charcoal-800">
              {formatUZS(product.price)}
            </span>
          </div>

          <button
            type="button"
            aria-label="Savatga qo‘shish"
            onClick={() => addItem(product)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-600 text-ivory-200 transition-all hover:scale-105 hover:bg-forest-700 active:scale-95"
          >
            <ShoppingBag className="h-[15px] w-[15px]" />
          </button>
        </div>
      </div>
    </article>
  );
}
