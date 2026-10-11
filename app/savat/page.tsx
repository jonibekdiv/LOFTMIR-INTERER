"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatUZS } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clear } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container-x py-12">
        <h1 className="font-serif text-4xl font-bold text-charcoal-800 md:text-5xl">
          Savat
        </h1>
        <div className="mt-10 rounded-3xl border border-dashed border-sage-200 bg-ivory-100 py-24 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_4px_24px_-8px_rgba(18,79,69,0.1)]">
            <ShoppingBag className="h-8 w-8 text-charcoal-300" />
          </div>
          <h2 className="mt-6 font-serif text-2xl font-bold text-charcoal-800">
            Savat hozircha bo‘sh
          </h2>
          <p className="mt-2 text-sm text-charcoal-400">
            Mahsulotlarni ko‘rib chiqing va savatga qo‘shishingiz mumkin
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
    <div className="container-wide py-10 md:py-14">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold text-charcoal-800 md:text-5xl">
            Savat
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

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-3 lg:col-span-2">
          {items.map((item, idx) => (
            <div
              key={`${item.productId}-${item.color ?? "default"}-${idx}`}
              className="flex gap-4 rounded-2xl border border-sage-200 bg-white p-4 transition-all hover:shadow-[0_4px_24px_-8px_rgba(18,79,69,0.08)]"
            >
              <Link
                href={`/mahsulot/${item.slug}`}
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-ivory-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/mahsulot/${item.slug}`}
                      className="font-serif text-base font-semibold text-charcoal-800 transition-colors hover:text-forest-600"
                    >
                      {item.name}
                    </Link>
                    {item.color && (
                      <p className="mt-0.5 text-xs text-charcoal-400">
                        Rang: {item.color}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.color)}
                    aria-label="O‘chirish"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-charcoal-400 transition-all hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                  <div className="flex items-center gap-1 rounded-xl border border-sage-200">
                    <button
                      onClick={() => updateQuantity(item.productId, item.color, item.quantity - 1)}
                      aria-label="Kamaytirish"
                      className="grid h-9 w-9 place-items-center text-charcoal-500 transition-colors hover:text-forest-600"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="price-text min-w-[32px] text-center text-sm font-semibold text-charcoal-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.color, item.quantity + 1)}
                      aria-label="Ko‘paytirish"
                      className="grid h-9 w-9 place-items-center text-charcoal-500 transition-colors hover:text-forest-600"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="price-display text-lg text-charcoal-800">
                      {formatUZS(item.price * item.quantity)}
                    </div>
                    <div className="price-text text-xs text-charcoal-400">
                      {formatUZS(item.price)} × {item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/mahsulotlar"
            className="inline-flex items-center gap-2 pt-4 text-sm font-semibold text-forest-600 transition-colors hover:text-gold-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Xaridni davom ettirish
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-sage-200 bg-white p-6">
            <h2 className="font-serif text-xl font-bold text-charcoal-800">
              Buyurtma xulosasi
            </h2>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-charcoal-500">Mahsulotlar</dt>
                <dd className="price-text font-semibold text-charcoal-800">
                  {formatUZS(totalPrice())}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-charcoal-500">Yetkazib berish</dt>
                <dd className="text-sm font-semibold text-forest-600">Bepul</dd>
              </div>
              <div className="border-t border-sage-200 pt-4">
                <div className="flex items-end justify-between">
                  <dt className="font-serif font-semibold text-charcoal-800">Jami</dt>
                  <dd className="price-display text-2xl text-charcoal-800">
                    {formatUZS(totalPrice())}
                  </dd>
                </div>
              </div>
            </dl>

            <Link
              href="/buyurtma"
              className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-forest-600 text-sm font-semibold text-ivory-200 transition-all hover:bg-forest-700"
            >
              Buyurtmani rasmiylashtirish
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-4 text-center text-[11px] text-charcoal-400">
              Yetkazib berish Toshkent bo‘ylab bepul
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
