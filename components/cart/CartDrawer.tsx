"use client";

import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatUZS } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-graphite-900/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-500",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-graphite-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-petrol-600" />
            <h2 className="price-display text-xl text-graphite-900">
              Savat
            </h2>
            <span className="rounded-full bg-petrol-600/10 px-2.5 py-0.5 text-xs font-semibold text-petrol-600">
              {items.length}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Yopish"
            className="grid h-10 w-10 place-items-center rounded-xl hover:bg-graphite-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-graphite-50">
                <ShoppingBag className="h-8 w-8 text-graphite-300" />
              </div>
              <p className="mt-5 font-display price-text text-lg font-bold text-graphite-800">
                Savat bo‘sh
              </p>
              <p className="mt-1 text-xs text-graphite-500">
                Mahsulotlarni ko‘rib chiqing va savatga qo‘shing
              </p>
              <button
                onClick={closeCart}
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-petrol-600 px-6 text-sm font-semibold text-white hover:bg-petrol-700"
              >
                Xaridni boshlash
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item, idx) => (
                <li
                  key={`${item.productId}-${item.color ?? "default"}-${idx}`}
                  className="flex gap-3 rounded-2xl border border-graphite-100 p-3"
                >
                  <Link
                    href={`/mahsulot/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-graphite-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/mahsulot/${item.slug}`}
                        onClick={closeCart}
                        className="line-clamp-2 text-sm font-semibold text-graphite-800 hover:text-petrol-600"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.productId, item.color)}
                        aria-label="O‘chirish"
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-graphite-400 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {item.color && (
                      <p className="mt-0.5 text-[11px] text-graphite-500">
                        Rang: {item.color}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <div className="flex items-center gap-1 rounded-lg border border-graphite-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.color, item.quantity - 1)
                          }
                          aria-label="Kamaytirish"
                          className="grid h-7 w-7 place-items-center text-graphite-600 hover:text-petrol-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[24px] text-center text-xs font-semibold text-graphite-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.color, item.quantity + 1)
                          }
                          aria-label="Ko‘paytirish"
                          className="grid h-7 w-7 place-items-center text-graphite-600 hover:text-petrol-600"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-graphite-900">
                        {formatUZS(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-graphite-100 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-graphite-600">Jami:</span>
              <span className="price-display text-2xl text-graphite-900">
                {formatUZS(totalPrice())}
              </span>
            </div>

            <Link
              href="/savat"
              onClick={closeCart}
              className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-petrol-600 text-sm font-semibold text-white transition-all hover:bg-petrol-700"
            >
              Savatni ko‘rish
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="text-center text-[11px] text-graphite-500">
              Toshkent bo‘ylab bepul yetkazib berish
            </p>
          </div>
        )}
      </div>
    </>
  );
}
