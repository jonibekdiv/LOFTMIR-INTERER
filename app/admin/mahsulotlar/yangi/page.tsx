"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Check } from "lucide-react";
import { useProductsStore, type AdminProduct } from "@/lib/store/products";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80",
  "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80",
  "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80",
  "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
  "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
];

export default function NewProductPage() {
  const router = useRouter();
  const { addProduct, items } = useProductsStore();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    nameUz: "",
    nameRu: "",
    nameEn: "",
    slug: "",
    sku: "",
    category: "javonlar",
    descriptionUz: "",
    price: 0,
    compareAtPrice: 0,
    costPrice: 0,
    stock: 10,
    weight: 20,
    width: 60,
    height: 200,
    depth: 35,
    material: "Qora metall, taban yog‘och",
    productionDays: 7,
    status: "draft" as AdminProduct["status"],
    isFeatured: false,
    imageUrl: PLACEHOLDER_IMAGES[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const slug =
      form.slug ||
      form.nameUz
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const sku = form.sku || `LM-${Date.now().toString(36).toUpperCase()}`;
    const now = new Date().toISOString();

    const newProduct: AdminProduct = {
      id: `p-${Date.now()}`,
      slug,
      sku,
      name: { uz: form.nameUz, ru: form.nameRu || form.nameUz, en: form.nameEn || form.nameUz },
      shortDescription: {
        uz: form.descriptionUz.slice(0, 100),
        ru: form.descriptionUz.slice(0, 100),
        en: form.descriptionUz.slice(0, 100),
      },
      description: {
        uz: form.descriptionUz,
        ru: form.descriptionUz,
        en: form.descriptionUz,
      },
      price: form.price,
      compareAtPrice: form.compareAtPrice || undefined,
      costPrice: form.costPrice || undefined,
      categorySlug: form.category,
      images: [form.imageUrl],
      material: {
        uz: form.material,
        ru: form.material,
        en: form.material,
      },
      dimensions: {
        width: form.width,
        height: form.height,
        depth: form.depth,
      },
      weight: form.weight,
      colors: [
        { name: { uz: "Tabiiy", ru: "Natural", en: "Natural" }, hex: "#A0714A" },
        { name: { uz: "Qora", ru: "Black", en: "Black" }, hex: "#1A1A1A" },
        { name: { uz: "Oq", ru: "White", en: "White" }, hex: "#F5F5F5" },
      ],
      inStock: form.stock > 0,
      stockCount: form.stock,
      rating: 5.0,
      reviewCount: 0,
      isNew: true,
      isFeatured: form.isFeatured,
      productionDays: form.productionDays,
      tags: [form.category],
      status: form.status,
      createdAt: now,
      updatedAt: now,
    };

    addProduct(newProduct);
    setSaved(true);
    setTimeout(() => router.push("/admin/mahsulotlar"), 1200);
  };

  if (saved) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="mt-5 price-display text-2xl text-graphite-900">
            Mahsulot qo‘shildi!
          </h2>
          <p className="mt-2 text-sm text-graphite-500">
            Ro‘yxatga qaytmoqda...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/admin/mahsulotlar"
        className="inline-flex items-center gap-2 text-xs font-medium text-graphite-500 hover:text-petrol-600"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Mahsulotlarga qaytish
      </Link>

      <h1 className="mt-4 price-display text-2xl text-graphite-900">
        Yangi mahsulot
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Asosiy ma'lumot */}
        <Card title="Asosiy ma’lumot">
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Nomi (UZ) *"
              value={form.nameUz}
              onChange={(v) => setForm({ ...form, nameUz: v })}
              placeholder="Zig-Zag Javon"
              required
            />
            <Field
              label="Slug (URL)"
              value={form.slug}
              onChange={(v) => setForm({ ...form, slug: v })}
              placeholder="zig-zag-javon"
            />
            <Field
              label="Nomi (RU)"
              value={form.nameRu}
              onChange={(v) => setForm({ ...form, nameRu: v })}
            />
            <Field
              label="Nomi (EN)"
              value={form.nameEn}
              onChange={(v) => setForm({ ...form, nameEn: v })}
            />
          </div>
          <div className="mt-5">
            <label className="text-sm font-medium text-graphite-700">
              Tavsif
            </label>
            <textarea
              value={form.descriptionUz}
              onChange={(e) => setForm({ ...form, descriptionUz: e.target.value })}
              rows={4}
              placeholder="Mahsulot haqida batafsil ma’lumot..."
              className="mt-2 w-full rounded-xl border border-graphite-200 bg-white px-4 py-3 text-sm focus:border-petrol-600 focus:outline-none"
            />
          </div>
        </Card>

        {/* Narx va ombor */}
        <Card title="Narx va ombor">
          <div className="grid gap-5 md:grid-cols-3">
            <Field
              label="Narx (so‘m) *"
              type="number"
              value={String(form.price)}
              onChange={(v) => setForm({ ...form, price: Number(v) })}
              required
            />
            <Field
              label="Chegirmadan oldingi narx"
              type="number"
              value={String(form.compareAtPrice)}
              onChange={(v) => setForm({ ...form, compareAtPrice: Number(v) })}
            />
            <Field
              label="Tannarx (maxfiy)"
              type="number"
              value={String(form.costPrice)}
              onChange={(v) => setForm({ ...form, costPrice: Number(v) })}
            />
            <Field
              label="Ombordagi soni *"
              type="number"
              value={String(form.stock)}
              onChange={(v) => setForm({ ...form, stock: Number(v) })}
              required
            />
            <Field
              label="SKU"
              value={form.sku}
              onChange={(v) => setForm({ ...form, sku: v })}
              placeholder="LM-ZZ-001"
            />
            <Field
              label="Ishlab chiqarish (kun)"
              type="number"
              value={String(form.productionDays)}
              onChange={(v) => setForm({ ...form, productionDays: Number(v) })}
            />
          </div>
        </Card>

        {/* Kategoriya va material */}
        <Card title="Kategoriya va material">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-graphite-700">
                Kategoriya *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-2 h-12 w-full rounded-xl border border-graphite-200 bg-white px-4 text-sm focus:border-petrol-600 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name.uz}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="Material"
              value={form.material}
              onChange={(v) => setForm({ ...form, material: v })}
              placeholder="Qora metall, tabiiy yog‘och"
            />
          </div>
        </Card>

        {/* O'lchamlar */}
        <Card title="O‘lchamlar va vazn">
          <div className="grid gap-5 md:grid-cols-4">
            <Field
              label="Eni (sm)"
              type="number"
              value={String(form.width)}
              onChange={(v) => setForm({ ...form, width: Number(v) })}
            />
            <Field
              label="Bo‘yi (sm)"
              type="number"
              value={String(form.height)}
              onChange={(v) => setForm({ ...form, height: Number(v) })}
            />
            <Field
              label="Chuqurligi (sm)"
              type="number"
              value={String(form.depth)}
              onChange={(v) => setForm({ ...form, depth: Number(v) })}
            />
            <Field
              label="Vazni (kg)"
              type="number"
              value={String(form.weight)}
              onChange={(v) => setForm({ ...form, weight: Number(v) })}
            />
          </div>
        </Card>

        {/* Rasm */}
        <Card title="Rasm">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-graphite-700">
                Rasm URL yoki tanlang
              </label>
              <input
                type="text"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="mt-2 h-12 w-full rounded-xl border border-graphite-200 bg-white px-4 text-sm focus:border-petrol-600 focus:outline-none"
              />
              <div className="mt-3 grid grid-cols-3 gap-2">
                {PLACEHOLDER_IMAGES.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setForm({ ...form, imageUrl: url })}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                      form.imageUrl === url
                        ? "border-petrol-600"
                        : "border-graphite-200 hover:border-graphite-300"
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="h-full w-full object-cover" />
                    {form.imageUrl === url && (
                      <div className="absolute inset-0 grid place-items-center bg-petrol-600/20">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-graphite-700">
                Ko‘rinishi
              </label>
              <div className="mt-2 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl border border-graphite-200 bg-graphite-50">
                {form.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-10 w-10 text-graphite-300" />
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Sozlamalar */}
        <Card title="Sozlamalar">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-graphite-700">
                Status
              </label>
              <div className="mt-2 flex gap-2">
                {(["draft", "published", "archived"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm({ ...form, status: s })}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-sm font-medium transition-all",
                      form.status === s
                        ? "border-petrol-600 bg-petrol-600 text-white"
                        : "border-graphite-200 text-graphite-700 hover:border-graphite-300"
                    )}
                  >
                    {s === "draft" && "Qoralama"}
                    {s === "published" && "Faol"}
                    {s === "archived" && "Arxiv"}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="h-5 w-5 accent-petrol-600"
              />
              <span className="text-sm font-medium text-graphite-700">
                Bosh sahifada ko‘rsatish (Featured)
              </span>
            </label>
          </div>
        </Card>

        {/* Submit */}
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
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-graphite-200/60 bg-white p-6">
      <h2 className="mb-5 heading-display price-text text-lg font-bold text-graphite-900">
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
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-graphite-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 h-12 w-full rounded-xl border border-graphite-200 bg-white px-4 text-sm focus:border-petrol-600 focus:outline-none"
      />
    </div>
  );
}
