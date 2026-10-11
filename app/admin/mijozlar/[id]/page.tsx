"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  User,
  ShoppingBag,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Package,
  Mail,
} from "lucide-react";
import { useAnalyticsStore, type OrderStatus } from "@/lib/store/analytics";
import { formatUZS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; text: string; color: string }
> = {
  pending: { label: "Kutilmoqda", text: "bg-amber-50 text-amber-700", color: "#f59e0b" },
  confirmed: { label: "Tasdiqlangan", text: "bg-blue-50 text-blue-700", color: "#3b82f6" },
  processing: { label: "Tayyorlanmoqda", text: "bg-indigo-50 text-indigo-700", color: "#6366f1" },
  shipped: { label: "Yuborilgan", text: "bg-violet-50 text-violet-700", color: "#8b5cf6" },
  delivered: { label: "Yetkazilgan", text: "bg-emerald-50 text-emerald-700", color: "#10b981" },
  cancelled: { label: "Bekor", text: "bg-red-50 text-red-600", color: "#ef4444" },
};

export default function AdminCustomerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { customers, orders } = useAnalyticsStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-graphite-200 border-t-petrol-600" />
      </div>
    );
  }

  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-sm text-red-600">Mijoz topilmadi</p>
        <Link
          href="/admin/mijozlar"
          className="mt-4 inline-block text-sm font-semibold text-petrol-600"
        >
          Ro‘yxatga qaytish
        </Link>
      </div>
    );
  }

  /* Bu mijozning buyurtmalari */
  const customerOrders = orders
    .filter((o) => o.customerName === customer.name)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const totalSpent = customerOrders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);

  const avgOrder = customerOrders.length > 0 ? Math.round(totalSpent / customerOrders.length) : 0;

  const lastOrder = customerOrders[0];

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/admin/mijozlar"
        className="inline-flex items-center gap-2 text-xs font-medium text-graphite-500 hover:text-petrol-600"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Mijozlarga qaytish
      </Link>

      {/* Header card */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-graphite-200/60 bg-white">
        <div className="h-24 gradient-petrol" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="grid h-24 w-24 place-items-center rounded-2xl border-4 border-white gradient-gold text-3xl font-bold text-graphite-900 shadow-soft">
                {customer.name.charAt(0)}
              </div>
              <div className="pb-2">
                <h1 className="font-display text-2xl font-bold text-graphite-900">
                  {customer.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-graphite-500">
                  <span className="inline-flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {customer.phone}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Ro‘yxatdan:{" "}
                    {new Date(customer.createdAt).toLocaleDateString("uz-UZ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistika */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={ShoppingBag}
          label="Buyurtmalar"
          value={String(customerOrders.length)}
          color="petrol"
        />
        <StatCard
          icon={TrendingUp}
          label="Jami xarid"
          value={formatUZS(totalSpent)}
          color="gold"
        />
        <StatCard
          icon={Package}
          label="O‘rtacha buyurtma"
          value={formatUZS(avgOrder)}
          color="emerald"
        />
      </div>

      {/* Buyurtmalar tarixi */}
      <div className="mt-6 rounded-2xl border border-graphite-200/60 bg-white">
        <div className="border-b border-graphite-100 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-graphite-900">
            Buyurtmalar tarixi
          </h2>
          <p className="text-xs text-graphite-500">
            {customerOrders.length} ta buyurtma
          </p>
        </div>

        {customerOrders.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-graphite-300" />
            <p className="mt-3 text-sm text-graphite-500">
              Buyurtmalar yo‘q
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-graphite-100">
            {customerOrders.map((o) => {
              const cfg = STATUS_CONFIG[o.status];
              const date = new Date(o.createdAt);
              return (
                <li key={o.id}>
                  <Link
                    href={`/admin/buyurtmalar/${o.id}`}
                    className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-graphite-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-petrol-600/10 text-petrol-600">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-mono text-sm font-semibold text-graphite-800">
                          {o.number}
                        </p>
                        <p className="mt-0.5 text-[11px] text-graphite-500">
                          {date.toLocaleDateString("uz-UZ", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}{" "}
                          · {o.itemsCount} ta mahsulot
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "hidden rounded-full px-2.5 py-1 text-[10px] font-semibold sm:inline-block",
                          cfg.text
                        )}
                      >
                        {cfg.label}
                      </span>
                      <span className="font-semibold text-graphite-900">
                        {formatUZS(o.total)}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof User;
  label: string;
  value: string;
  color: "petrol" | "gold" | "emerald";
}) {
  const colorMap = {
    petrol: "bg-petrol-600/10 text-petrol-600",
    gold: "bg-gold-400/15 text-gold-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="rounded-2xl border border-graphite-200/60 bg-white p-5">
      <div className={cn("grid h-11 w-11 place-items-center rounded-xl", colorMap[color])}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-xs font-medium text-graphite-500">{label}</p>
      <p className="mt-1 font-display text-xl font-bold text-graphite-900">
        {value}
      </p>
    </div>
  );
}
