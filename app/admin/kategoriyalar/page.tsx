"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  FolderTree,
  X,
  Save,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { useCategoriesStore, type AdminCategory } from "@/lib/store/categories";
import { cn } from "@/lib/utils";

type FormState = Partial<AdminCategory>;

const EMPTY_FORM: FormState = {
  name: { uz: "", ru: "", en: "" },
  description: { uz: "", ru: "", en: "" },
  slug: "",
  image: "",
  productCount: 0,
  status: "active",
};

export default function AdminCategoriesPage() {
  const { items, addCategory, updateCategory, deleteCategory } =
    useCategoriesStore();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [confirmDelete, setConfirmDelete] = useState<AdminCategory | null>(null);
  const [saved, setSaved] = useState(false);

  const filtered = items.filter((c) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      c.name.uz.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    );
  });

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (c: AdminCategory) => {
    setEditing(c);
    setForm(c);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name?.uz.trim() || !form.slug?.trim()) return;

    const now = new Date().toISOString();

    if (editing) {
      updateCategory(editing.id, {
        ...form,
        name: form.name as AdminCategory["name"],
        description: form.description as AdminCategory["description"],
      });
    } else {
      addCategory({
        id: `cat-${Date.now()}`,
        slug: form.slug!,
        name: form.name as AdminCategory["name"],
        description: form.description as AdminCategory["description"],
        image: form.image || "/products/zig-zag-javon/1.svg",
        productCount: form.productCount ?? 0,
        status: form.status ?? "active",
        createdAt: now,
      });
    }

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setModalOpen(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="heading-display text-2xl text-charcoal-900">
            Kategoriyalar
          </h1>
          <p className="mt-1 text-sm text-charcoal-500">
            {items.length} ta kategoriya
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-forest-600 px-5 text-sm font-semibold text-white transition-all hover:bg-forest-700"
        >
          <Plus className="h-4 w-4" />
          Yangi kategoriya
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nomi yoki slug bo‘yicha qidirish..."
          className="h-11 w-full rounded-xl border border-charcoal-200 bg-white pl-11 pr-4 text-sm focus:border-forest-600 focus:outline-none"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-charcoal-200 bg-white py-20 text-center">
          <FolderTree className="mx-auto h-10 w-10 text-charcoal-300" />
          <p className="mt-3 text-sm font-semibold text-charcoal-700">
            Kategoriya topilmadi
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="group rounded-2xl border border-charcoal-200/60 bg-white p-5 transition-all hover:border-forest-600/40 hover:shadow-soft"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl gradient-petrol">
                  <FolderTree className="h-5 w-5 text-white" />
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(c)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-charcoal-500 hover:bg-charcoal-100 hover:text-forest-600"
                    aria-label="Tahrirlash"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(c)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-charcoal-500 hover:bg-red-50 hover:text-red-500"
                    aria-label="O‘chirish"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="heading-display mt-4 text-lg text-charcoal-900">
                {c.name.uz}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs text-charcoal-500">
                {c.description.uz}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="label-mono rounded-full bg-forest-600/10 px-2.5 py-1 text-[10px] font-semibold text-forest-600">
                  {c.productCount} ta mahsulot
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                    c.status === "active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-charcoal-100 text-charcoal-500"
                  )}
                >
                  {c.status === "active" ? (
                    <>
                      <Eye className="h-3 w-3" />
                      Faol
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3 w-3" />
                      Yashirin
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal — yangi/tahrirlash */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4">
          <div
            className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative mt-8 w-full max-w-2xl rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="heading-display text-xl text-charcoal-900">
                {editing ? "Kategoriyani tahrirlash" : "Yangi kategoriya"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg hover:bg-charcoal-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {/* Slug */}
              <Field
                label="Slug (URL) *"
                value={form.slug ?? ""}
                onChange={(v) => setForm({ ...form, slug: v })}
                placeholder="javonlar"
              />

              {/* Nomlar */}
              <div className="grid gap-4 md:grid-cols-3">
                <Field
                  label="Nomi (UZ) *"
                  value={form.name?.uz ?? ""}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      name: {
                        ...(form.name ?? { uz: "", ru: "", en: "" }),
                        uz: v,
                      },
                    })
                  }
                />
                <Field
                  label="Nomi (RU)"
                  value={form.name?.ru ?? ""}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      name: {
                        ...(form.name ?? { uz: "", ru: "", en: "" }),
                        ru: v,
                      },
                    })
                  }
                />
                <Field
                  label="Nomi (EN)"
                  value={form.name?.en ?? ""}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      name: {
                        ...(form.name ?? { uz: "", ru: "", en: "" }),
                        en: v,
                      },
                    })
                  }
                />
              </div>

              {/* Tavsif */}
              <div>
                <label className="text-sm font-medium text-charcoal-700">
                  Tavsif (UZ)
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
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3 text-sm focus:border-forest-600 focus:outline-none"
                />
              </div>

              {/* Status + Soni */}
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Mahsulotlar soni"
                  type="number"
                  value={String(form.productCount ?? 0)}
                  onChange={(v) =>
                    setForm({ ...form, productCount: Number(v) })
                  }
                />
                <div>
                  <label className="text-sm font-medium text-charcoal-700">
                    Status
                  </label>
                  <select
                    value={form.status ?? "active"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as "active" | "hidden",
                      })
                    }
                    className="mt-2 h-12 w-full rounded-xl border border-charcoal-200 bg-white px-4 text-sm focus:border-forest-600 focus:outline-none"
                  >
                    <option value="active">Faol</option>
                    <option value="hidden">Yashirin</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="h-11 rounded-xl border border-charcoal-200 px-5 text-sm font-medium hover:bg-charcoal-50"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSave}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-forest-600 px-5 text-sm font-semibold text-white hover:bg-forest-700"
              >
                {saved ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saqlandi
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Saqlash
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm"
            onClick={() => setConfirmDelete(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6">
            <h3 className="heading-display text-lg text-charcoal-900">
              O‘chirishni tasdiqlang
            </h3>
            <p className="mt-2 text-sm text-charcoal-600">
              <strong>{confirmDelete.name.uz}</strong> kategoriyasini o‘chirishni
              xohlaysizmi?
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
                  deleteCategory(confirmDelete.id);
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

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-charcoal-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-charcoal-200 bg-white px-4 text-sm focus:border-forest-600 focus:outline-none"
      />
    </div>
  );
}
