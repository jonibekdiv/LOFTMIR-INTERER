"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  RotateCw,
} from "lucide-react";
import { loadOrders, type CompletedOrder } from "@/lib/store/checkout";
import { useCartStore } from "@/lib/store/cart";
import { formatUZS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_MAP: Record<
  CompletedOrder["status"],
  { label: string; color: string; icon: typeof Clock }
> = {
  pending: { label: "Kutilmoqda", color: "amber", icon: Clock },
  confirmed: { label: "Tasdiqlangan", color: "blue", icon: CheckCircle2 },
  processing: { label: "Tayyorlanmoqda", color: "blue", icon: RotateCw },
  shipped: { label: "Yuborilgan", color: "indigo", icon: Truck },
  delivered: { label: "Yetkazilgan", color: "emerald", icon: CheckCircle2 },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<CompletedOrder[]>([]);
  const [loaded, setLoaded] = useState(false);
 const addItemLite = useCartStore((s) => s.addItemLite);

  useEffect(() => {
    setOrders(loadOrders());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-charcoal-200 border-t-forest-600" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-charcoal-200 bg-charcoal-50 py-20 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white shadow-soft">
          <ShoppingBag className="h-8 w-8 text-charcoal-400" />
        </div>
        <h2 className="mt-5 font-display text-xl font-bold text-charcoal-800">
          Buyurtmalar yo‘q
        </h2>
        <p className="mt-2 text-sm text-charcoal-500">
          Hali buyurtma bermagansiz
        </p>
        <Link
          href="/mahsulotlar"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-forest-600 px-6 text-sm font-semibold text-white hover:bg-forest-700"
        >
          Xaridni boshlash
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="price-display text-xl text-charcoal-900">
          Buyurtmalarim
        </h2>
        <span className="text-xs text-charcoal-500">
          {orders.length} ta buyurtma
        </span>
      </div>

      {orders.map((order) => {
        const status = STATUS_MAP[order.status];
        const Icon = status.icon;
        const totalItems = order.items.reduce((sum, i) => sum + i.quantity, 0);
        const date = new Date(order.createdAt);
        const dateStr = date.toLocaleDateString("uz-UZ", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        const timeStr = date.toLocaleTimeString("uz-UZ", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={order.id}
            className="overflow-hidden rounded-2xl border border-charcoal-200/60 bg-white transition-all hover:border-forest-600/50 hover:shadow-soft"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal-100 bg-charcoal-50/50 px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-forest-600/10 text-forest-600">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-base font-bold text-charcoal-900">
                    {order.number}
                  </p>
                  <p className="mt-0.5 text-[11px] text-charcoal-500">
                    {dateStr} · {timeStr}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
                  status.color === "amber" && "bg-amber-50 text-amber-700",
                  status.color === "blue" && "bg-blue-50 text-blue-700",
                  status.color === "indigo" && "bg-indigo-50 text-indigo-700",
                  status.color === "emerald" && "bg-emerald-50 text-emerald-700"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {status.label}
              </span>
            </div>

            {/* Items preview */}
            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="relative h-14 w-14 overflow-hidden rounded-xl border-2 border-white bg-charcoal-100"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="grid h-14 w-14 place-items-center rounded-xl border-2 border-white bg-charcoal-100 text-xs font-bold text-charcoal-600">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="line-clamp-1 text-sm font-medium text-charcoal-800">
                    {order.items[0].name}
                    {order.items.length > 1 && (
                      <span className="text-charcoal-400">
                        {" "}va yana {order.items.length - 1} ta
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-charcoal-500">
                    Jami {totalItems} ta mahsulot
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display price-text text-lg font-bold text-charcoal-900">
                    {formatUZS(order.total)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-wrap gap-2 border-t border-charcoal-100 pt-4">
                <Link
                  href={`/buyurtma/holat?number=${order.number}`}
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-forest-600 px-4 text-xs font-semibold text-white hover:bg-forest-700"
                >
                  Holatni ko‘rish
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  onClick={() => {
                    order.items.forEach((i) => {
                      /* Mahsulotni qayta savatga qo'shish - sodda versiya */
                      addItemLite(
                        {
                          id: i.productId,
                          slug: i.slug,
                          name: { uz: i.name, ru: i.name, en: i.name },
                          images: [i.image],
                          price: i.price,
                          stockCount: 99,
                        } as never,
                        i.color,
                        i.quantity
                      );
                    });
                  }}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-charcoal-200 px-4 text-xs font-medium text-charcoal-700 hover:border-forest-600 hover:text-forest-600"
                >
                  <RotateCw className="h-3.5 w-3.5" />
                  Qayta buyurtma
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

