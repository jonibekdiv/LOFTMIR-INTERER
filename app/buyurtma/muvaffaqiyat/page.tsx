"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, Phone, ArrowRight, Home, Clock } from "lucide-react";
import { findOrderByNumber, type CompletedOrder } from "@/lib/store/checkout";
import { formatUZS } from "@/lib/utils";

function SuccessContent() {
  const searchParams = useSearchParams();
  const number = searchParams.get("number");
  const [order, setOrder] = useState<CompletedOrder | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (number) setOrder(findOrderByNumber(number) ?? null);
    setLoaded(true);
  }, [number]);

  return (
    <div className="container-wide py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-forest-600/10">
          <CheckCircle2 className="h-10 w-10 text-forest-600" />
        </div>

        <h1 className="mt-6 font-serif text-3xl font-bold text-charcoal-800 md:text-4xl">
          Buyurtmangiz qabul qilindi!
        </h1>
        <p className="mt-3 text-sm text-charcoal-500">
          Operatorimiz tez orada siz bilan bog‘lanadi
        </p>

        {loaded && order && (
          <>
            <div className="mt-10 rounded-2xl border border-sage-200 bg-white p-6 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="label-mono text-charcoal-400">Buyurtma raqami</p>
                  <p className="price-text mt-1 font-serif text-2xl font-bold text-charcoal-800">
                    {order.number}
                  </p>
                </div>
                <span className="rounded-full bg-gold-400/15 px-3 py-1.5 text-xs font-medium text-gold-600">
                  Kutilmoqda
                </span>
              </div>

              <div className="mt-6 grid gap-4 border-t border-sage-200 pt-6 sm:grid-cols-2">
                <InfoRow icon={Clock} label="Holat" value="Tasdiqlash kutilmoqda" />
                <InfoRow
                  icon={Phone}
                  label="Aloqa"
                  value={`${order.customer.firstName} ${order.customer.lastName}`}
                />
              </div>

              <div className="mt-6 border-t border-sage-200 pt-6">
                <p className="label-mono mb-3 text-charcoal-400">Buyurtma</p>
                <ul className="space-y-2.5">
                  {order.items.map((i, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-ivory-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-xs font-medium text-charcoal-800">
                          {i.name}
                        </p>
                        <p className="price-text text-[11px] text-charcoal-400">
                          {i.quantity} × {formatUZS(i.price)}
                        </p>
                      </div>
                      <span className="price-text text-xs font-semibold text-charcoal-800">
                        {formatUZS(i.price * i.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between border-t border-sage-200 pt-4">
                  <span className="font-serif font-semibold text-charcoal-800">Jami</span>
                  <span className="price-display text-xl text-charcoal-800">
                    {formatUZS(order.total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-ivory-100 p-4">
                <p className="label-mono text-charcoal-400">Yetkazish manzili</p>
                <p className="mt-2 text-sm text-charcoal-700">
                  {order.address.city}, {order.address.district}, {order.address.street}{" "}
                  {order.address.building}
                  {order.address.apartment && `, xon. ${order.address.apartment}`}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`/buyurtma/holat?number=${order.number}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-forest-600 px-6 text-sm font-semibold text-ivory-200 transition-colors hover:bg-forest-700"
              >
                <Package className="h-4 w-4" />
                Buyurtmani kuzatish
              </Link>
              <Link
                href="/mahsulotlar"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-sage-200 px-6 text-sm font-medium text-charcoal-700 transition-colors hover:border-forest-600 hover:text-forest-600"
              >
                Xaridni davom ettirish
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}

        {loaded && !order && number && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm text-red-600">
              Buyurtma topilmadi. Iltimos, qaytadan urinib ko‘ring.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-forest-600/8 text-forest-600">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="label-mono text-charcoal-400">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-charcoal-800">{value}</p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container-wide flex min-h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-sage-200 border-t-forest-600" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
