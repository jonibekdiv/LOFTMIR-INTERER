"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Archive,
  MoreVertical,
  Package,
  Eye,
} from "lucide-react";
import { useProductsStore, type AdminProduct } from "@/lib/store/products";
import { formatUZS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_BADGE: Record<
  AdminProduct["status"],
  { label: string; cls: string }
> = {
  published: { label: "Faol", cls: "bg-emerald-50 text-emerald-700" },
  draft: { label: "Qoralama", cls: "bg-amber-50 text-amber-700" },
  archived: { label: "Arxiv", cls: "bg-charcoal-100 text-charcoal-600" },
};

export default function AdminProductsPage() {
  const { items, deleteProduct, archiveProduct } = useProductsStore();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | AdminProduct["status"]>("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AdminProduct | null>(null);

  const filtered = useMemo(() => {
    let list = [...items];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.uz.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      list = list.filter((p) => p.status === statusFilter);
    }
    return list.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [items, query, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="price-display text-2xl text-charcoal-900">
            Mahsulotlar
          </h1>
          <p className="mt-1 text-sm text-charcoal-500">
            {items.length} ta mahsulot · {filtered.length} ko‘rsatilmoqda
          </p>
        </div>
        <Link
          href="/admin/mahsulotlar/yangi"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-forest-600 px-5 text-sm font-semibold text-white transition-all hover:bg-forest-700"
        >
          <Plus className="h-4 w-4" />
          Yangi mahsulot
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-charcoal-200/60 bg-white p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nomi, slug yoki SKU bo‘yicha qidirish..."
            className="h-11 w-full rounded-xl border border-charcoal-200 bg-white pl-11 pr-4 text-sm focus:border-forest-600 focus:outline-none"
          />
        </div>

        <div className="flex gap-1 rounded-xl border border-charcoal-200 bg-white p-1">
          {(["all", "published", "draft", "archived"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                statusFilter === s
                  ? "bg-forest-600 text-white"
                  : "text-charcoal-600 hover:bg-charcoal-100"
              )}
            >
              {s === "all" && "Barchasi"}
              {s === "published" && "Faol"}
              {s === "draft" && "Qoralama"}
              {s === "archived" && "Arxiv"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-charcoal-200 bg-white py-20 text-center">
          <Package className="mx-auto h-10 w-10 text-charcoal-300" />
          <p className="mt-3 text-sm font-semibold text-charcoal-700">
            Mahsulot topilmadi
          </p>
          <p className="mt-1 text-xs text-charcoal-500">
            Filtrni o‘zgartiring yoki yangi mahsulot qo‘shing
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-charcoal-200/60 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-charcoal-50/60 text-left text-[11px] uppercase tracking-wider text-charcoal-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Mahsulot</th>
                  <th className="px-5 py-3 font-semibold">SKU</th>
                  <th className="px-5 py-3 font-semibold">Narx</th>
                  <th className="px-5 py-3 font-semibold">Ombor</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100 text-sm">
                {filtered.map((p) => {
                  const badge = STATUS_BADGE[p.status];
                  return (
                    <tr key={p.id} className="hover:bg-charcoal-50/40">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-charcoal-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.images[0]}
                              alt={p.name.uz}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="line-clamp-1 font-medium text-charcoal-800">
                              {p.name.uz}
                            </p>
                            <p className="text-[11px] text-charcoal-500 line-clamp-1">
                              {p.categorySlug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-charcoal-600">
                        {p.sku}
                      </td>
                      <td className="px-5 py-3">
                        <p className="table-num font-semibold text-charcoal-900">
                          {formatUZS(p.price)}
                        </p>
                        {p.compareAtPrice && (
                          <p className="text-[11px] text-charcoal-400 line-through">
                            {formatUZS(p.compareAtPrice)}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                            p.stockCount > 10
                              ? "bg-emerald-50 text-emerald-700"
                              : p.stockCount > 0
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-600"
                          )}
                        >
                          {p.stockCount} dona
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                            badge.cls
                          )}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() =>
                              setOpenMenu(openMenu === p.id ? null : p.id)
                            }
                            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-charcoal-100"
                            aria-label="Amallar"
                          >
                            <MoreVertical className="h-4 w-4 text-charcoal-500" />
                          </button>

                          {openMenu === p.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenMenu(null)}
                              />
                              <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-charcoal-200 bg-white py-1 shadow-lg">
                                <Link
                                  href={`/admin/mahsulotlar/${p.id}`}
                                  className="flex items-center gap-2 px-4 py-2 text-xs text-charcoal-700 hover:bg-charcoal-50"
                                  onClick={() => setOpenMenu(null)}
                                >
                                  <Edit3 className="h-3.5 w-3.5" />
                                  Tahrirlash
                                </Link>
                                <Link
                                  href={`/mahsulot/${p.slug}`}
                                  target="_blank"
                                  className="flex items-center gap-2 px-4 py-2 text-xs text-charcoal-700 hover:bg-charcoal-50"
                                  onClick={() => setOpenMenu(null)}
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                  Saytda ko‘rish
                                </Link>
                                <button
                                  onClick={() => {
                                    archiveProduct(p.id);
                                    setOpenMenu(null);
                                  }}
                                  className="flex w-full items-center gap-2 px-4 py-2 text-xs text-charcoal-700 hover:bg-charcoal-50"
                                >
                                  <Archive className="h-3.5 w-3.5" />
                                  Arxivlash
                                </button>
                                <button
                                  onClick={() => {
                                    setConfirmDelete(p);
                                    setOpenMenu(null);
                                  }}
                                  className="flex w-full items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  O‘chirish
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirm delete modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm"
            onClick={() => setConfirmDelete(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6">
            <h3 className="heading-display price-text text-lg font-bold text-charcoal-900">
              O‘chirishni tasdiqlang
            </h3>
            <p className="mt-2 text-sm text-charcoal-600">
              <strong>{confirmDelete.name.uz}</strong> mahsulotini o‘chirishni
              xohlaysizmi? Bu amalni ortga qaytarib bo‘lmaydi.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="h-11 flex-1 rounded-xl border border-charcoal-200 text-sm font-medium hover:bg-charcoal-50"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  deleteProduct(confirmDelete.id);
                  setConfirmDelete(null);
                }}
                className="h-11 flex-1 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
              >
                O‘chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
