"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Package,
  Eye,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { useAnalyticsStore, type OrderStatus } from "@/lib/store/analytics";
import { formatUZS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; icon: typeof Clock; text: string }
> = {
  pending: { label: "Kutilmoqda", color: "#f59e0b", icon: Clock, text: "bg-amber-50 text-amber-700" },
  confirmed: { label: "Tasdiqlangan", color: "#3b82f6", icon: CheckCircle2, text: "bg-blue-50 text-blue-700" },
  processing: { label: "Tayyorlanmoqda", color: "#6366f1", icon: Package, text: "bg-indigo-50 text-indigo-700" },
  shipped: { label: "Yuborilgan", color: "#8b5cf6", icon: Truck, text: "bg-violet-50 text-violet-700" },
  delivered: { label: "Yetkazilgan", color: "#10b981", icon: CheckCircle2, text: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "Bekor", color: "#ef4444", icon: XCircle, text: "bg-red-50 text-red-600" },
};

const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const { orders } = useAnalyticsStore();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "amount-desc" | "amount-asc">("newest");

  const filtered = useMemo(() => {
    let list = [...orders];

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (o) =>
          o.number.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerPhone.includes(q)
      );
    }

    if (statusFilter !== "all") {
      list = list.filter((o) => o.status === statusFilter);
    }

    switch (sortBy) {
      case "newest":
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "amount-desc":
        list.sort((a, b) => b.total - a.total);
        break;
      case "amount-asc":
        list.sort((a, b) => a.total - b.total);
        break;
    }

    return list;
  }, [orders, query, statusFilter, sortBy]);

  /* Status bo'yicha hisob */
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    ALL_STATUSES.forEach((s) => {
      c[s] = orders.filter((o) => o.status === s).length;
    });
    return c;
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="price-display text-2xl text-graphite-900">
          Buyurtmalar
        </h1>
        <p className="mt-1 text-sm text-graphite-500">
          {orders.length} ta buyurtma · {filtered.length} ko‘rsatilmoqda
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        <StatusTab
          active={statusFilter === "all"}
          onClick={() => setStatusFilter("all")}
          label="Barchasi"
          count={counts.all}
          color="#6b7280"
        />
        {ALL_STATUSES.map((s) => (
          <StatusTab
            key={s}
            active={statusFilter === s}
            onClick={() => setStatusFilter(s)}
            label={STATUS_CONFIG[s].label}
            count={counts[s] ?? 0}
            color={STATUS_CONFIG[s].color}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-graphite-200/60 bg-white p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buyurtma raqami, mijoz ismi yoki telefoni..."
            className="h-11 w-full rounded-xl border border-graphite-200 bg-white pl-11 pr-4 text-sm focus:border-petrol-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-graphite-200 bg-white px-3">
          <ArrowUpDown className="h-4 w-4 text-graphite-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-11 bg-transparent pr-2 text-sm focus:outline-none"
          >
            <option value="newest">Yangi birinchi</option>
            <option value="oldest">Eski birinchi</option>
            <option value="amount-desc">Summa: kattadan</option>
            <option value="amount-asc">Summa: kichikdan</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-graphite-200 bg-white py-20 text-center">
          <Package className="mx-auto h-10 w-10 text-graphite-300" />
          <p className="mt-3 text-sm font-semibold text-graphite-700">
            Buyurtma topilmadi
          </p>
          <p className="mt-1 text-xs text-graphite-500">
            Filtrni o‘zgartiring
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-graphite-200/60 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-graphite-50/60 text-left text-[11px] uppercase tracking-wider text-graphite-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Buyurtma</th>
                  <th className="px-5 py-3 font-semibold">Mijoz</th>
                  <th className="px-5 py-3 font-semibold">Mahsulotlar</th>
                  <th className="px-5 py-3 font-semibold">Summa</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Sana</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-100 text-sm">
                {filtered.map((o) => {
                  const cfg = STATUS_CONFIG[o.status];
                  const Icon = cfg.icon;
                  const date = new Date(o.createdAt);
                  return (
                    <tr key={o.id} className="hover:bg-graphite-50/40">
                      <td className="px-5 py-3 font-mono text-xs font-semibold text-graphite-800">
                        {o.number}
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-sm font-medium text-graphite-800">
                          {o.customerName}
                        </p>
                        <p className="text-[11px] text-graphite-500">
                          {o.customerPhone}
                        </p>
                      </td>
                      <td className="px-5 py-3 text-sm text-graphite-700">
                        {o.itemsCount} ta
                      </td>
                      <td className="px-5 py-3 table-num font-semibold text-graphite-900">
                        {formatUZS(o.total)}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                            cfg.text
                          )}
                        >
                          <Icon className="h-3 w-3" />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-graphite-500">
                        {date.toLocaleDateString("uz-UZ", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                        <br />
                        {date.toLocaleTimeString("uz-UZ", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Link
                          href={`/admin/buyurtmalar/${o.id}`}
                          className="inline-flex h-8 items-center gap-1 rounded-lg bg-petrol-600/10 px-3 text-xs font-semibold text-petrol-600 hover:bg-petrol-600 hover:text-white"
                        >
                          Ko‘rish
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusTab({
  active,
  onClick,
  label,
  count,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all",
        active
          ? "border-petrol-600 bg-petrol-600 text-white"
          : "border-graphite-200 bg-white text-graphite-700 hover:border-petrol-600"
      )}
    >
      {!active && (
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      )}
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
          active ? "bg-white/20" : "bg-graphite-100"
        )}
      >
        {count}
      </span>
    </button>
  );
}
