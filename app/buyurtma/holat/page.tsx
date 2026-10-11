"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Package,
  CheckCircle2,
  Truck,
  XCircle,
  Clock,
  Loader2,
  Home,
} from "lucide-react";
import { loadOrders, type CompletedOrder } from "@/lib/store/checkout";
import { formatUZS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_MAP: Record<
  CompletedOrder["status"],
  { label: string; color: string; icon: typeof Clock }
> = {
  pending: { label: "Kutilmoqda", color: "amber", icon: Clock },
  confirmed: { label: "Tasdiqlangan", color: "blue", icon: CheckCircle2 },
  processing: { label: "Tayyorlanmoqda", color: "blue", icon: Loader2 },
  shipped: { label: "Yuborilgan", color: "indigo", icon: Truck },
  delivered: { label: "Yetkazilgan", color: "emerald", icon: CheckCircle2 },
};

function StatusContent() {
  const searchParams = useSearchParams();
  const [number, setNumber] = useState(searchParams.get("number") ?? "");
  const [order, setOrder] = useState<CompletedOrder | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (number) handleSearch();
  }, []);

  const handleSearch = () => {
    const found = loadOrders().find(
      (o) => o.number.toLowerCase() === number.trim().toLowerCase()
    );
    setOrder(found ?? null);
    setSearched(true);
  };

  const status = order ? STATUS_MAP[order.status] : null;

  return (
    <div className="container-x py-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="price-display text-3xl text-charcoal-900 md:text-4xl">
          Buyurtma holati
        </h1>
        <p className="mt-2 text-sm text-charcoal-500">
          Buyurtma raqamini kiriting (masalan: LM-240101-1234)
        </p>

        <div className="mt-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="LM-YYYYMMDD-XXXX"
              className="h-12 w-full rounded-xl border border-charcoal-200 bg-white pl-11 pr-4 text-sm focus:border-forest-600 focus:outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            className="h-12 rounded-xl bg-forest-600 px-6 text-sm font-semibold text-white hover:bg-forest-700"
          >
            Qidirish
          </button>
        </div>

        {searched && !order && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <XCircle className="mx-auto h-8 w-8 text-red-500" />
            <p className="mt-3 text-sm font-semibold text-red-700">
              Bunday raqamli buyurtma topilmadi
            </p>
            <p className="mt-1 text-xs text-red-600">
              Iltimos, raqamni tekshiring yoki biz bilan bog‘laning
            </p>
          </div>
        )}

        {order && status && (
          <div className="mt-8 space-y-6">
            {/* Status */}
            <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-charcoal-500">Buyurtma raqami</p>
                  <p className="price-display text-2xl text-charcoal-900">
                    {order.number}
                  </p>
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
                  <status.icon className="h-3.5 w-3.5" />
                  {status.label}
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6">
              <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Buyurtma jarayoni
              </p>
              <ol className="space-y-4">
                {[
                  { s: "pending", label: "Buyurtma qabul qilindi" },
                  { s: "confirmed", label: "Tasdiqlandi" },
                  { s: "processing", label: "Tayyorlanmoqda" },
                  { s: "shipped", label: "Yuborilgan" },
                  { s: "delivered", label: "Yetkazilgan" },
                ].map((step, i) => {
                  const orderIdx = ["pending", "confirmed", "processing", "shipped", "delivered"].indexOf(order.status);
                  const stepIdx = i;
                  const done = stepIdx <= orderIdx;
                  const current = stepIdx === orderIdx;
                  return (
                    <li key={step.s} className="flex items-start gap-3">
                      <div
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full",
                          done
                            ? "bg-emerald-500 text-white"
                            : "bg-charcoal-100 text-charcoal-400"
                        )}
                      >
                        {done ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <span className="text-xs font-bold">{i + 1}</span>
                        )}
                      </div>
                      <div className="pt-1">
                        <p
                          className={cn(
                            "text-sm font-medium",
                            done ? "text-charcoal-900" : "text-charcoal-400"
                          )}
                        >
                          {step.label}
                          {current && (
                            <span className="ml-2 rounded-full bg-forest-600/10 px-2 py-0.5 text-[10px] font-semibold text-forest-600">
                              Hozir
                            </span>
                          )}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Order details */}
            <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Buyurtma tarkibi
              </p>
              <ul className="space-y-3">
                {order.items.map((i, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-charcoal-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-1 text-sm font-medium text-charcoal-800">
                        {i.name}
                      </p>
                      <p className="text-xs text-charcoal-500">
                        {i.quantity} x {formatUZS(i.price)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-charcoal-800">
                      {formatUZS(i.price * i.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-charcoal-100 pt-4">
                <span className="font-semibold text-charcoal-800">Jami</span>
                <span className="price-display text-xl text-charcoal-900">
                  {formatUZS(order.total)}
                </span>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-charcoal-200 px-6 text-sm font-medium text-charcoal-700 hover:border-forest-600"
            >
              <Home className="h-4 w-4" />
              Bosh sahifa
            </Link>
          </div>
        )}

        {!searched && (
          <div className="mt-8 rounded-2xl border border-dashed border-charcoal-200 bg-charcoal-50 py-12 text-center">
            <Package className="mx-auto h-10 w-10 text-charcoal-300" />
            <p className="mt-3 text-sm text-charcoal-500">
              Buyurtma raqamingizni yuqoriga kiriting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="container-x flex min-h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-charcoal-200 border-t-forest-600" />
        </div>
      }
    >
      <StatusContent />
    </Suspense>
  );
}
