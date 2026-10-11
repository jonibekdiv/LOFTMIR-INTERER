"use client";

import { useState } from "react";
import {
  MessageSquare,
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CustomOrder = {
  id: string;
  name: string;
  phone: string;
  type: string;
  dimensions: string;
  material: string;
  budget: string;
  comment: string;
  status: "new" | "contacted" | "in_progress" | "done" | "rejected";
  createdAt: string;
};

/* Demo ma'lumotlar */
const DEMO: CustomOrder[] = [
  { id: "co-1", name: "Aziz Karimov", phone: "+998 90 123 45 67", type: "Javon", dimensions: "120×200×40 sm", material: "Eman + qora metall", budget: "3 500 000 so‘m", comment: "Uy uchun maxsus o‘lchamda", status: "new", createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "co-2", name: "Dilnoza Yusupova", phone: "+998 90 234 56 78", type: "Stol", dimensions: "180×75×90 sm", material: "Yong‘oq", budget: "5 000 000 so‘m", comment: "Oshxona uchun", status: "contacted", createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: "co-3", name: "Bobur Toshmatov", phone: "+998 90 345 67 89", type: "Shkaf", dimensions: "200×220×60 sm", material: "MDF + oynali", budget: "6 800 000 so‘m", comment: "Kiyim shkafi", status: "in_progress", createdAt: new Date(Date.now() - 7 * 86400000).toISOString() },
  { id: "co-4", name: "Malika Rahimova", phone: "+998 90 456 78 90", type: "Stullar (4 ta)", dimensions: "45×90×50 sm", material: "Yog‘och", budget: "2 400 000 so‘m", comment: "Ovqat stoliga", status: "done", createdAt: new Date(Date.now() - 14 * 86400000).toISOString() },
];

const STATUS_CONFIG: Record<
  CustomOrder["status"],
  { label: string; text: string; color: string }
> = {
  new: { label: "Yangi", text: "bg-amber-50 text-amber-700", color: "#f59e0b" },
  contacted: { label: "Aloqaga chiqildi", text: "bg-blue-50 text-blue-700", color: "#3b82f6" },
  in_progress: { label: "Bajarilmoqda", text: "bg-indigo-50 text-indigo-700", color: "#6366f1" },
  done: { label: "Yakunlangan", text: "bg-emerald-50 text-emerald-700", color: "#10b981" },
  rejected: { label: "Rad etilgan", text: "bg-red-50 text-red-600", color: "#ef4444" },
};

const ALL_STATUSES: CustomOrder["status"][] = ["new", "contacted", "in_progress", "done", "rejected"];

export default function AdminCustomOrdersPage() {
  const [items, setItems] = useState<CustomOrder[]>(DEMO);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | CustomOrder["status"]>("all");
  const [selected, setSelected] = useState<CustomOrder | null>(null);

  const filtered = items.filter((c) => {
    if (query) {
      const q = query.toLowerCase();
      if (!c.name.toLowerCase().includes(q) && !c.phone.includes(q)) return false;
    }
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    return true;
  });

  const counts: Record<string, number> = { all: items.length };
  ALL_STATUSES.forEach((s) => {
    counts[s] = items.filter((i) => i.status === s).length;
  });

  const updateStatus = (id: string, status: CustomOrder["status"]) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status } : i)));
    if (selected && selected.id === id) {
      setSelected({ ...selected, status });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-display text-2xl text-charcoal-900">
          Maxsus buyurtmalar
        </h1>
        <p className="mt-1 text-sm text-charcoal-500">
          {items.length} ta ariza
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all",
            statusFilter === "all"
              ? "border-forest-600 bg-forest-600 text-white"
              : "border-charcoal-200 bg-white text-charcoal-700 hover:border-forest-600"
          )}
        >
          Barchasi
          <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold", statusFilter === "all" ? "bg-white/20" : "bg-charcoal-100")}>
            {counts.all}
          </span>
        </button>
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all",
              statusFilter === s
                ? "border-forest-600 bg-forest-600 text-white"
                : "border-charcoal-200 bg-white text-charcoal-700 hover:border-forest-600"
            )}
          >
            {STATUS_CONFIG[s].label}
            <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold", statusFilter === s ? "bg-white/20" : "bg-charcoal-100")}>
              {counts[s]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ism yoki telefon..."
          className="h-11 w-full rounded-xl border border-charcoal-200 bg-white pl-11 pr-4 text-sm focus:border-forest-600 focus:outline-none"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-charcoal-200 bg-white py-20 text-center">
          <MessageSquare className="mx-auto h-10 w-10 text-charcoal-300" />
          <p className="mt-3 text-sm font-semibold text-charcoal-700">
            Ariza topilmadi
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((c) => {
            const cfg = STATUS_CONFIG[c.status];
            const date = new Date(c.createdAt);
            return (
              <div
                key={c.id}
                className="rounded-2xl border border-charcoal-200/60 bg-white p-5 transition-all hover:border-forest-600/40 hover:shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-charcoal-900">
                      {c.name}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-charcoal-500">
                      {c.phone}
                    </p>
                  </div>
                  <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold", cfg.text)}>
                    {cfg.label}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5 text-xs">
                  <p className="text-charcoal-600">
                    <strong className="text-charcoal-800">Tur:</strong> {c.type}
                  </p>
                  <p className="text-charcoal-600">
                    <strong className="text-charcoal-800">O‘lcham:</strong> {c.dimensions}
                  </p>
                  <p className="text-charcoal-600">
                    <strong className="text-charcoal-800">Material:</strong> {c.material}
                  </p>
                  <p className="text-charcoal-600">
                    <strong className="text-charcoal-800">Budjet:</strong> {c.budget}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-charcoal-100 pt-3">
                  <span className="label-mono text-[11px] text-charcoal-500">
                    {date.toLocaleDateString("uz-UZ", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                  <button
                    onClick={() => setSelected(c)}
                    className="inline-flex h-8 items-center gap-1 rounded-lg bg-forest-600/10 px-3 text-xs font-semibold text-forest-600 hover:bg-forest-600 hover:text-white"
                  >
                    <Eye className="h-3 w-3" />
                    Batafsil
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4">
          <div className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative mt-8 w-full max-w-2xl rounded-2xl bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="heading-display text-xl text-charcoal-900">
                  {selected.name}
                </h2>
                <p className="mt-1 text-xs text-charcoal-500">
                  Ariza #{selected.id.toUpperCase()}
                </p>
              </div>
              <span className={cn("rounded-full px-3 py-1.5 text-xs font-semibold", STATUS_CONFIG[selected.status].text)}>
                {STATUS_CONFIG[selected.status].label}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoBlock icon={Phone} label="Telefon" value={selected.phone} />
              <InfoBlock icon={MapPin} label="Mahsulot turi" value={selected.type} />
              <InfoBlock icon={MessageSquare} label="O‘lchamlar" value={selected.dimensions} />
              <InfoBlock icon={CheckCircle2} label="Material" value={selected.material} />
              <InfoBlock icon={Clock} label="Budjet" value={selected.budget} />
              <InfoBlock icon={Clock} label="Sana" value={new Date(selected.createdAt).toLocaleString("uz-UZ")} />
            </div>

            {selected.comment && (
              <div className="mt-6 rounded-xl bg-charcoal-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                  Izoh
                </p>
                <p className="mt-2 text-sm text-charcoal-700">{selected.comment}</p>
              </div>
            )}

            {/* Status o'zgartirish */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Statusni o‘zgartirish
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {ALL_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className={cn(
                      "rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all",
                      selected.status === s
                        ? "border-forest-600 bg-forest-600 text-white"
                        : "border-charcoal-200 hover:border-forest-600"
                    )}
                  >
                    {STATUS_CONFIG[s].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="h-11 rounded-xl border border-charcoal-200 px-5 text-sm font-medium hover:bg-charcoal-50"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-charcoal-100 bg-charcoal-50/50 p-4">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-forest-600">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="label-mono text-[10px] uppercase tracking-wider text-charcoal-500">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-charcoal-800 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}
