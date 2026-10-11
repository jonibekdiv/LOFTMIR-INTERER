"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Package,
  Clock,
  CheckCircle2,
  Printer,
  Trash2,
  Save,
  Calendar,
} from "lucide-react";
import { useAnalyticsStore, type OrderStatus } from "@/lib/store/analytics";
import { formatUZS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const ALL_STATUSES: OrderStatus[] = [
  "pending", "confirmed", "processing", "shipped", "delivered", "cancelled",
];

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Kutilmoqda",
  confirmed: "Tasdiqlangan",
  processing: "Tayyorlanmoqda",
  shipped: "Yuborilgan",
  delivered: "Yetkazilgan",
  cancelled: "Bekor qilingan",
};

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  /* Selector orqali — har doim yangilanadi */
  const order = useAnalyticsStore((s) => s.orders.find((o) => o.id === id));
  const updateOrderStatus = useAnalyticsStore((s) => s.updateOrderStatus);
  const updateOrderNote = useAnalyticsStore((s) => s.updateOrderNote);
  const deleteOrder = useAnalyticsStore((s) => s.deleteOrder);

  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Order yuklangach, izohni to'ldirish */
  useEffect(() => {
    if (order) setNote(order.note ?? "");
  }, [order]);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-charcoal-200 border-t-forest-600" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-sm text-red-600">Buyurtma topilmadi</p>
        <Link
          href="/admin/buyurtmalar"
          className="mt-4 inline-block text-sm font-semibold text-forest-600"
        >
          Ro‘yxatga qaytish
        </Link>
      </div>
    );
  }

  const date = new Date(order.createdAt);

  const handleStatus = (s: OrderStatus) => {
    updateOrderStatus(order.id, s);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleSaveNote = () => {
    updateOrderNote(order.id, note);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/admin/buyurtmalar"
        className="inline-flex items-center gap-2 text-xs font-medium text-charcoal-500 hover:text-forest-600"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Buyurtmalarga qaytish
      </Link>

      <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal-900">
            {order.number}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-charcoal-500">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {date.toLocaleDateString("uz-UZ", {
                day: "2-digit", month: "long", year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {date.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-charcoal-200 px-4 text-xs font-medium hover:bg-charcoal-50"
          >
            <Printer className="h-3.5 w-3.5" />
            Chop etish
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 px-4 text-xs font-medium text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            O‘chirish
          </button>
        </div>
      </div>

      {saved && (
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          Saqlandi
        </div>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-charcoal-900">
              Status
            </h2>
            <p className="mt-1 text-xs text-charcoal-500">
              Joriy: <strong className="text-charcoal-800">{STATUS_LABEL[order.status]}</strong>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
              {ALL_STATUSES.map((s) => {
                const isActive = order.status === s;
                return (
                  <button
                    key={s}
                    onClick={() => handleStatus(s)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-xs font-semibold transition-all text-left",
                      isActive
                        ? "border-forest-600 bg-forest-600 text-white"
                        : "border-charcoal-200 hover:border-forest-600 hover:bg-forest-600/5"
                    )}
                  >
                    {STATUS_LABEL[s]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-charcoal-900">
              Buyurtma tarkibi
            </h2>
            <div className="mt-4 space-y-3">
              {Array.from({ length: order.itemsCount }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-charcoal-100 p-3"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-charcoal-100">
                    <Package className="h-5 w-5 text-charcoal-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-charcoal-800">
                      Mahsulot #{idx + 1}
                    </p>
                    <p className="text-xs text-charcoal-500">
                      1 x {formatUZS(Math.round(order.total / order.itemsCount))}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-charcoal-800">
                    {formatUZS(Math.round(order.total / order.itemsCount))}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-charcoal-100 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Mahsulotlar</span>
                <span className="font-medium">{formatUZS(order.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Yetkazish</span>
                <span className="font-medium text-emerald-600">Bepul</span>
              </div>
              <div className="flex justify-between border-t border-charcoal-100 pt-2">
                <span className="font-semibold text-charcoal-800">Jami</span>
                <span className="font-display text-xl font-bold text-charcoal-900">
                  {formatUZS(order.total)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-charcoal-900">
              Ichki izoh
            </h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Faqat adminlar ko‘radigan izoh..."
              className="mt-3 w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3 text-sm focus:border-forest-600 focus:outline-none"
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleSaveNote}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-forest-600 px-4 text-xs font-semibold text-white hover:bg-forest-700"
              >
                <Save className="h-3.5 w-3.5" />
                Izohni saqlash
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6">
            <h2 className="font-display text-base font-bold text-charcoal-900">
              Mijoz
            </h2>
            <div className="mt-4 space-y-3">
              <InfoRow icon={User} label="Ism" value={order.customerName} />
              <InfoRow icon={Phone} label="Telefon" value={order.customerPhone} />
            </div>
          </div>

          <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6">
            <h2 className="font-display text-base font-bold text-charcoal-900">
              Yetkazish manzili
            </h2>
            <div className="mt-4">
              <InfoRow
                icon={MapPin}
                label="Manzil"
                value="Toshkent, Chilonzor tumani, Bunyodkor shoh ko‘chasi, 12A"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6">
            <h2 className="font-display text-base font-bold text-charcoal-900">
              Status tarixi
            </h2>
            <ol className="mt-4 space-y-4">
              <li className="flex gap-3">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-charcoal-800">
                    Buyurtma qabul qilindi
                  </p>
                  <p className="mt-0.5 text-[11px] text-charcoal-500">
                    {date.toLocaleString("uz-UZ")}
                  </p>
                </div>
              </li>
              {order.status !== "pending" && (
                <li className="flex gap-3">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-600 text-white">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal-800">
                      {STATUS_LABEL[order.status]}
                    </p>
                    <p className="mt-0.5 text-[11px] text-charcoal-500">
                      Hozirgi holat
                    </p>
                  </div>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>

      {/* Confirm delete modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm"
            onClick={() => setConfirmDelete(false)}
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6">
            <h3 className="font-display text-lg font-bold text-charcoal-900">
              O‘chirishni tasdiqlang
            </h3>
            <p className="mt-2 text-sm text-charcoal-600">
              <strong>{order.number}</strong> buyurtmasini o‘chirishni xohlaysizmi?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="h-11 flex-1 rounded-xl border border-charcoal-200 text-sm font-medium hover:bg-charcoal-50"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  deleteOrder(order.id);
                  router.push("/admin/buyurtmalar");
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

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-forest-600/5 text-forest-600">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-charcoal-500">{label}</p>
        <p className="text-sm font-medium text-charcoal-800 break-words">{value}</p>
      </div>
    </div>
  );
}
