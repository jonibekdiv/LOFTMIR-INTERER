"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Check, Trash2 } from "lucide-react";
import { useProductsStore, type AdminProduct } from "@/lib/store/products";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { items, updateProduct, deleteProduct } = useProductsStore();
  const product = items.find((p) => p.id === id);
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [form, setForm] = useState<Partial<AdminProduct>>({});

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  if (!product) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-sm text-red-600">Mahsulot topilmadi</p>
        <Link
          href="/admin/mahsulotlar"
          className="mt-4 inline-block text-sm font-semibold text-petrol-600"
        >
          Ro‘yxatga qaytish
        </Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(id, form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/admin/mahsulotlar"
        className="inline-flex items-center gap-2 text-xs font-medium text-graphite-500 hover:text-petrol-600"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Mahsulotlarga qaytish
      </Link>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-graphite-900">
            Tahrirlash
          </h1>
          <p className="mt-1 text-sm text-graphite-500">{product.name.uz}</p>
        </div>
        <button
          onClick={() => setConfirmDelete(true)}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 px-4 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-3.5 w-3.5" />
          O‘chirish
        </button>
      </div>

      {saved && (
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <Check className="h-4 w-4" />
          Saqlandi
        </div>
      )}

      <form onSubmit={handleSave} className="mt-8 space-y-6">
        <Card title="Asosiy ma’lumot">
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Nomi (UZ)"
              value={form.name?.uz ?? ""}
              onChange={(v) =>
                setForm({
                  ...form,
                  name: { ...(form.name ?? { uz: "", ru: "", en: "" }), uz: v },
                })
              }
            />
            <Field
              label="Slug"
              value={form.slug ?? ""}
              onChange={(v) => setForm({ ...form, slug: v })}
            />
            <Field
              label="SKU"
              value={form.sku ?? ""}
              onChange={(v) => setForm({ ...form, sku: v })}
            />
          </div>
          <div className="mt-5">
            <label className="text-sm font-medium text-graphite-700">
              Tavsif
            </label>
            <textarea
              value={form.description?.uz ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: {
                    ...(form.description ?? { uz: "", ru: "", en: "" }),
                    uz: e.target.value,
                  },
                })
              }
              rows={4}
              className="mt-2 w-full rounded-xl border border-graphite-200 bg-white px-4 py-3 text-sm focus:border-petrol-600 focus:outline-none"
            />
          </div>
        </Card>

        <Card title="Narx va ombor">
          <div className="grid gap-5 md:grid-cols-3">
            <Field
              label="Narx (so‘m)"
              type="number"
              value={String(form.price ?? 0)}
              onChange={(v) => setForm({ ...form, price: Number(v) })}
            />
            <Field
              label="Chegirmadan oldingi"
              type="number"
              value={String(form.compareAtPrice ?? 0)}
              onChange={(v) => setForm({ ...form, compareAtPrice: Number(v) })}
            />
            <Field
              label="Tannarx"
              type="number"
              value={String(form.costPrice ?? 0)}
              onChange={(v) => setForm({ ...form, costPrice: Number(v) })}
            />
            <Field
              label="Ombor"
              type="number"
              value={String(form.stockCount ?? 0)}
              onChange={(v) => setForm({ ...form, stockCount: Number(v) })}
            />
          </div>
        </Card>

        <Card title="O‘lchamlar">
          <div className="grid gap-5 md:grid-cols-4">
            <Field
              label="Eni (sm)"
              type="number"
              value={String(form.dimensions?.width ?? 0)}
              onChange={(v) =>
                setForm({
                  ...form,
                  dimensions: {
                    ...(form.dimensions ?? { width: 0, height: 0, depth: 0 }),
                    width: Number(v),
                  },
                })
              }
            />
            <Field
              label="Bo‘yi (sm)"
              type="number"
              value={String(form.dimensions?.height ?? 0)}
              onChange={(v) =>
                setForm({
                  ...form,
                  dimensions: {
                    ...(form.dimensions ?? { width: 0, height: 0, depth: 0 }),
                    height: Number(v),
                  },
                })
              }
            />
            <Field
              label="Chuqurligi (sm)"
              type="number"
              value={String(form.dimensions?.depth ?? 0)}
              onChange={(v) =>
                setForm({
                  ...form,
                  dimensions: {
                    ...(form.dimensions ?? { width: 0, height: 0, depth: 0 }),
                    depth: Number(v),
                  },
                })
              }
            />
            <Field
              label="Vazni (kg)"
              type="number"
              value={String(form.weight ?? 0)}
              onChange={(v) => setForm({ ...form, weight: Number(v) })}
            />
          </div>
        </Card>

        <Card title="Kategoriya va status">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-graphite-700">
                Kategoriya
              </label>
              <select
                value={form.categorySlug ?? "javonlar"}
                onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
                className="mt-2 h-12 w-full rounded-xl border border-graphite-200 bg-white px-4 text-sm focus:border-petrol-600 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name.uz}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-graphite-700">
                Status
              </label>
              <select
                value={form.status ?? "draft"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as AdminProduct["status"],
                  })
                }
                className="mt-2 h-12 w-full rounded-xl border border-graphite-200 bg-white px-4 text-sm focus:border-petrol-600 focus:outline-none"
              >
                <option value="draft">Qoralama</option>
                <option value="published">Faol</option>
                <option value="archived">Arxiv</option>
              </select>
            </div>
          </div>
          <div className="mt-5 flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFeatured ?? false}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="h-5 w-5 accent-petrol-600"
              />
              <span className="text-sm font-medium text-graphite-700">
                Featured
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isNew ?? false}
                onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
                className="h-5 w-5 accent-petrol-600"
              />
              <span className="text-sm font-medium text-graphite-700">
                Yangi
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isBestseller ?? false}
                onChange={(e) => setForm({ ...form, isBestseller: e.target.checked })}
                className="h-5 w-5 accent-petrol-600"
              />
              <span className="text-sm font-medium text-graphite-700">
                Bestseller
              </span>
            </label>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/mahsulotlar"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-graphite-200 px-6 text-sm font-medium hover:bg-graphite-50"
          >
            Bekor qilish
          </Link>
          <button
            type="submit"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-petrol-600 px-6 text-sm font-semibold text-white hover:bg-petrol-700"
          >
            <Save className="h-4 w-4" />
            Saqlash
          </button>
        </div>
      </form>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-graphite-900/50 backdrop-blur-sm"
            onClick={() => setConfirmDelete(false)}
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6">
            <h3 className="font-display text-lg font-bold text-graphite-900">
              O‘chirishni tasdiqlang
            </h3>
            <p className="mt-2 text-sm text-graphite-600">
              <strong>{product.name.uz}</strong> o‘chirilsinmi?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="h-11 flex-1 rounded-xl border border-graphite-200 text-sm font-medium hover:bg-graphite-50"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  deleteProduct(id);
                  router.push("/admin/mahsulotlar");
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

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-graphite-200/60 bg-white p-6">
      <h2 className="mb-5 font-display text-lg font-bold text-graphite-900">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-graphite-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-graphite-200 bg-white px-4 text-sm focus:border-petrol-600 focus:outline-none"
      />
    </div>
  );
}
