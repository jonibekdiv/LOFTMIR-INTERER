"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Users,
  Phone,
  ShoppingBag,
  TrendingUp,
  ChevronRight,
  ArrowUpDown,
  Mail,
} from "lucide-react";
import { useAnalyticsStore } from "@/lib/store/analytics";
import { formatUZS } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AdminCustomersPage() {
  const { customers, orders } = useAnalyticsStore();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"spent" | "orders" | "newest">("spent");

  /* Har bir mijoz uchun buyurtmalar sonini hisoblash */
  const enriched = useMemo(() => {
    return customers.map((c) => {
      const customerOrders = orders.filter(
        (o) => o.customerName === c.name
      );
      return {
        ...c,
        liveOrdersCount: customerOrders.length,
        liveTotalSpent: customerOrders
          .filter((o) => o.status !== "cancelled")
          .reduce((s, o) => s + o.total, 0),
        lastOrder:
          customerOrders.length > 0
            ? customerOrders.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              )[0].createdAt
            : null,
      };
    });
  }, [customers, orders]);

  const filtered = useMemo(() => {
    let list = [...enriched];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) => c.name.toLowerCase().includes(q) || c.phone.includes(q)
      );
    }
    switch (sortBy) {
      case "spent":
        list.sort((a, b) => b.liveTotalSpent - a.liveTotalSpent);
        break;
      case "orders":
        list.sort((a, b) => b.liveOrdersCount - a.liveOrdersCount);
        break;
      case "newest":
        list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
    return list;
  }, [enriched, query, sortBy]);

  /* Statistika */
  const totalRevenue = enriched.reduce((s, c) => s + c.liveTotalSpent, 0);
  const totalOrders = enriched.reduce((s, c) => s + c.liveOrdersCount, 0);
  const avgPerCustomer = enriched.length > 0 ? Math.round(totalRevenue / enriched.length) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="price-display text-2xl text-charcoal-900">
          Mijozlar
        </h1>
        <p className="mt-1 text-sm text-charcoal-500">
          {customers.length} ta mijoz
        </p>
      </div>

      {/* Statistika */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Users}
          label="Jami mijozlar"
          value={String(enriched.length)}
          color="petrol"
        />
        <StatCard
          icon={ShoppingBag}
          label="Jami buyurtmalar"
          value={String(totalOrders)}
          color="gold"
        />
        <StatCard
          icon={TrendingUp}
          label="O‘rtacha mijoz"
          value={formatUZS(avgPerCustomer)}
          color="emerald"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-charcoal-200/60 bg-white p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ism yoki telefon bo‘yicha qidirish..."
            className="h-11 w-full rounded-xl border border-charcoal-200 bg-white pl-11 pr-4 text-sm focus:border-forest-600 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-charcoal-200 bg-white px-3">
          <ArrowUpDown className="h-4 w-4 text-charcoal-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-11 bg-transparent pr-2 text-sm focus:outline-none"
          >
            <option value="spent">Xaridlar bo‘yicha</option>
            <option value="orders">Buyurtmalar bo‘yicha</option>
            <option value="newest">Yangi mijozlar</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-charcoal-200 bg-white py-20 text-center">
          <Users className="mx-auto h-10 w-10 text-charcoal-300" />
          <p className="mt-3 text-sm font-semibold text-charcoal-700">
            Mijoz topilmadi
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-charcoal-200/60 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-charcoal-50/60 text-left text-[11px] uppercase tracking-wider text-charcoal-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Mijoz</th>
                  <th className="px-5 py-3 font-semibold">Telefon</th>
                  <th className="px-5 py-3 font-semibold">Buyurtmalar</th>
                  <th className="px-5 py-3 font-semibold">Jami xarid</th>
                  <th className="px-5 py-3 font-semibold">Oxirgi buyurtma</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100 text-sm">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-charcoal-50/40">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-gold text-sm font-bold text-charcoal-900">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-charcoal-800">
                            {c.name}
                          </p>
                          <p className="text-[11px] text-charcoal-500">
                            ID: {c.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-xs text-charcoal-700">
                        {c.phone}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-600/10 px-2.5 py-1 text-xs font-semibold text-forest-600">
                        <ShoppingBag className="h-3 w-3" />
                        {c.liveOrdersCount} ta
                      </span>
                    </td>
                    <td className="px-5 py-3 table-num font-semibold text-charcoal-900">
                      {formatUZS(c.liveTotalSpent)}
                    </td>
                    <td className="px-5 py-3 text-xs text-charcoal-500">
                      {c.lastOrder
                        ? new Date(c.lastOrder).toLocaleDateString("uz-UZ", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/mijozlar/${c.id}`}
                        className="inline-flex h-8 items-center gap-1 rounded-lg bg-forest-600/10 px-3 text-xs font-semibold text-forest-600 hover:bg-forest-600 hover:text-white"
                      >
                        Ko‘rish
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  color: "petrol" | "gold" | "emerald";
}) {
  const colorMap = {
    petrol: "bg-forest-600/10 text-forest-600",
    gold: "bg-gold-400/15 text-gold-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="rounded-2xl border border-charcoal-200/60 bg-white p-5">
      <div className={cn("grid h-11 w-11 place-items-center rounded-xl", colorMap[color])}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-xs font-medium text-charcoal-500">{label}</p>
      <p className="mt-1 price-display text-xl text-charcoal-900">
        {value}
      </p>
    </div>
  );
}
