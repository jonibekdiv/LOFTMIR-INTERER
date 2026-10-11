"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Users,
  Package,
  DollarSign,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ArrowRight,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAnalyticsStore, type OrderStatus } from "@/lib/store/analytics";
import { formatUZS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const RANGES = [
  { value: 7, label: "7 kun" },
  { value: 30, label: "30 kun" },
  { value: 90, label: "90 kun" },
];

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; icon: typeof Clock; text: string }
> = {
  pending: { label: "Kutilmoqda", color: "#f59e0b", icon: Clock, text: "text-amber-600 bg-amber-50" },
  confirmed: { label: "Tasdiqlangan", color: "#3b82f6", icon: CheckCircle2, text: "text-blue-600 bg-blue-50" },
  processing: { label: "Tayyorlanmoqda", color: "#6366f1", icon: Package, text: "text-indigo-600 bg-indigo-50" },
  shipped: { label: "Yuborilgan", color: "#8b5cf6", icon: Truck, text: "text-violet-600 bg-violet-50" },
  delivered: { label: "Yetkazilgan", color: "#10b981", icon: CheckCircle2, text: "text-forest-600 bg-forest-600/10" },
  cancelled: { label: "Bekor", color: "#ef4444", icon: XCircle, text: "text-red-500 bg-red-50" },
};

export default function AdminDashboardPage() {
  const { orders, customers } = useAnalyticsStore();
  const [range, setRange] = useState(30);

  const now = Date.now();
  const rangeMs = range * 86400000;

  /* Filtrlangan buyurtmalar */
  const filtered = useMemo(
    () =>
      orders.filter(
        (o) => new Date(o.createdAt).getTime() >= now - rangeMs
      ),
    [orders, now, rangeMs]
  );

  /* KPI hisoblash */
  const kpi = useMemo(() => {
    const totalRevenue = filtered
      .filter((o) => o.status !== "cancelled")
      .reduce((s, o) => s + o.total, 0);

    const orderCount = filtered.length;
    const avgOrder = orderCount > 0 ? Math.round(totalRevenue / orderCount) : 0;

    const delivered = filtered.filter((o) => o.status === "delivered").length;
    const pending = filtered.filter((o) => o.status === "pending").length;
    const cancelled = filtered.filter((o) => o.status === "cancelled").length;

    /* Oldingi davr bilan solishtirish */
    const prevFrom = now - rangeMs * 2;
    const prevTo = now - rangeMs;
    const prevOrders = orders.filter((o) => {
      const t = new Date(o.createdAt).getTime();
      return t >= prevFrom && t < prevTo;
    });
    const prevRevenue = prevOrders
      .filter((o) => o.status !== "cancelled")
      .reduce((s, o) => s + o.total, 0);

    const growth =
      prevRevenue > 0
        ? Math.round(((totalRevenue - prevRevenue) / prevRevenue) * 100)
        : 0;

    return {
      totalRevenue,
      orderCount,
      avgOrder,
      delivered,
      pending,
      cancelled,
      growth,
    };
  }, [filtered, orders, now, rangeMs]);

  /* Savdo grafigi (kunlar bo'yicha) */
  const salesChart = useMemo(() => {
    const days: Record<string, { date: string; sales: number; orders: number }> = {};
    for (let i = range - 1; i >= 0; i--) {
      const d = new Date(now - i * 86400000);
      const key = d.toISOString().slice(0, 10);
      days[key] = {
        date: d.toLocaleDateString("uz-UZ", { day: "2-digit", month: "short" }),
        sales: 0,
        orders: 0,
      };
    }
    filtered
      .filter((o) => o.status !== "cancelled")
      .forEach((o) => {
        const key = o.createdAt.slice(0, 10);
        if (days[key]) {
          days[key].sales += o.total;
          days[key].orders += 1;
        }
      });
    return Object.values(days);
  }, [filtered, range, now]);

  /* Status bo'yicha taqsimot */
  const statusChart = useMemo(() => {
    const counts: Record<OrderStatus, number> = {
      pending: 0,
      confirmed: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };
    filtered.forEach((o) => {
      counts[o.status]++;
    });
    return (Object.keys(counts) as OrderStatus[])
      .map((s) => ({
        name: STATUS_CONFIG[s].label,
        value: counts[s],
        color: STATUS_CONFIG[s].color,
      }))
      .filter((d) => d.value > 0);
  }, [filtered]);

  /* Eng yaxshi mijozlar */
  const topCustomers = useMemo(
    () => [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5),
    [customers]
  );

  /* Oxirgi buyurtmalar */
  const recentOrders = filtered.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="price-display text-2xl text-charcoal-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Umumiy ko‘rsatkichlar va statistika
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-charcoal-200 bg-white p-1">
          <Calendar className="ml-2 h-4 w-4 text-charcoal-400" />
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                range === r.value
                  ? "bg-forest-600 text-white"
                  : "text-charcoal-600 hover:bg-charcoal-100"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Umumiy savdo"
          value={formatUZS(kpi.totalRevenue)}
          change={kpi.growth}
          icon={DollarSign}
          color="petrol"
        />
        <KpiCard
          title="Buyurtmalar"
          value={String(kpi.orderCount)}
          sub={`O‘rtacha: ${formatUZS(kpi.avgOrder)}`}
          icon={ShoppingBag}
          color="gold"
        />
        <KpiCard
          title="Yetkazilgan"
          value={String(kpi.delivered)}
          sub={`${kpi.pending} kutilmoqda`}
          icon={CheckCircle2}
          color="emerald"
        />
        <KpiCard
          title="Bekor qilingan"
          value={String(kpi.cancelled)}
          sub="Filtrlangan davrda"
          icon={XCircle}
          color="red"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Savdo grafigi */}
        <div className="rounded-2xl border border-charcoal-200/60 bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="heading-display price-text text-lg font-bold text-charcoal-900">
                Savdo dinamikasi
              </h2>
              <p className="text-xs text-charcoal-500">
                Oxirgi {range} kun
              </p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChart}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e4a47" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#1e4a47" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#a3a3a3"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  interval={Math.floor(range / 7)}
                />
                <YAxis
                  stroke="#a3a3a3"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => typeof value === "number" ? `${(value / 1000000).toFixed(1)}M` : ""}
                />
                <Tooltip
                  formatter={(value) => typeof value === "number" ? formatUZS(value) : String(value)}
                  labelStyle={{ color: "#0f0f0f", fontWeight: 600 }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e6e6e6",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#1e4a47"
                  strokeWidth={2}
                  fill="url(#salesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status doirasi */}
        <div className="rounded-2xl border border-charcoal-200/60 bg-white p-5">
          <h2 className="heading-display price-text text-lg font-bold text-charcoal-900">
            Buyurtma statuslari
          </h2>
          <p className="text-xs text-charcoal-500">Filtrlangan davr</p>
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusChart}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusChart.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e6e6e6",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-2">
            {statusChart.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-charcoal-600">{s.name}</span>
                </div>
                <span className="font-semibold text-charcoal-800">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders + top customers */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Oxirgi buyurtmalar */}
        <div className="rounded-2xl border border-charcoal-200/60 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-charcoal-100 px-5 py-4">
            <div>
              <h2 className="heading-display price-text text-lg font-bold text-charcoal-900">
                Oxirgi buyurtmalar
              </h2>
              <p className="text-xs text-charcoal-500">Eng yangi 6 ta</p>
            </div>
            <Link
              href="/admin/buyurtmalar"
              className="inline-flex items-center gap-1 text-xs font-semibold text-forest-600 hover:text-gold-500"
            >
              Barchasi
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-charcoal-50/50 text-left text-[11px] uppercase tracking-wider text-charcoal-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Buyurtma</th>
                  <th className="px-5 py-3 font-semibold">Mijoz</th>
                  <th className="px-5 py-3 font-semibold">Summa</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100 text-sm">
                {recentOrders.map((o) => {
                  const cfg = STATUS_CONFIG[o.status];
                  const Icon = cfg.icon;
                  return (
                    <tr key={o.id} className="hover:bg-charcoal-50/50">
                      <td className="px-5 py-3 font-medium text-charcoal-800">
                        {o.number}
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-sm text-charcoal-800">{o.customerName}</p>
                        <p className="text-[11px] text-charcoal-500">{o.customerPhone}</p>
                      </td>
                      <td className="px-5 py-3 table-num font-semibold text-charcoal-900">
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Eng yaxshi mijozlar */}
        <div className="rounded-2xl border border-charcoal-200/60 bg-white">
          <div className="border-b border-charcoal-100 px-5 py-4">
            <h2 className="heading-display price-text text-lg font-bold text-charcoal-900">
              Eng yaxshi mijozlar
            </h2>
            <p className="text-xs text-charcoal-500">Umumiy xaridlar bo‘yicha</p>
          </div>
          <ul className="divide-y divide-charcoal-100">
            {topCustomers.map((c, idx) => (
              <li key={c.id} className="flex items-center gap-3 px-5 py-3">
                <div
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-bold",
                    idx === 0 && "bg-gold-400 text-charcoal-900",
                    idx === 1 && "bg-charcoal-200 text-charcoal-700",
                    idx === 2 && "bg-amber-600/20 text-amber-700",
                    idx > 2 && "bg-charcoal-100 text-charcoal-500"
                  )}
                >
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="line-clamp-1 text-sm font-medium text-charcoal-800">
                    {c.name}
                  </p>
                  <p className="text-[11px] text-charcoal-500">
                    {c.ordersCount} ta buyurtma
                  </p>
                </div>
                <span className="text-xs font-bold text-charcoal-900">
                  {formatUZS(c.totalSpent)}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-charcoal-100 px-5 py-3">
            <Link
              href="/admin/mijozlar"
              className="inline-flex items-center gap-1 text-xs font-semibold text-forest-600 hover:text-gold-500"
            >
              Barcha mijozlar
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* KPI Card komponenti */
function KpiCard({
  title,
  value,
  change,
  sub,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change?: number;
  sub?: string;
  icon: typeof DollarSign;
  color: "petrol" | "gold" | "emerald" | "red";
}) {
  const colorMap = {
    petrol: "bg-forest-600/10 text-forest-600",
    gold: "bg-gold-400/15 text-gold-600",
    emerald: "bg-forest-600/10 text-forest-600",
    red: "bg-red-50 text-red-500",
  };

  return (
    <div className="rounded-2xl border border-charcoal-200/60 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className={cn("grid h-11 w-11 place-items-center rounded-xl", colorMap[color])}>
          <Icon className="h-5 w-5" />
        </div>
        {typeof change === "number" && (
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold",
              change >= 0
                ? "bg-forest-600/10 text-forest-600"
                : "bg-red-50 text-red-500"
            )}
          >
            {change >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <p className="mt-4 text-xs font-medium text-charcoal-500">{title}</p>
      <p className="mt-1 price-display text-2xl text-charcoal-900">
        {value}
      </p>
      {sub && <p className="mt-1 text-[11px] text-charcoal-500">{sub}</p>}
    </div>
  );
}
