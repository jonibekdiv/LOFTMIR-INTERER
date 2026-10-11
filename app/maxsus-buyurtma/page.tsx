"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

export default function CustomOrderPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container-x py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
          Maxsus buyurtma
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-charcoal-900 md:text-5xl">
          O‘zingizga xos mebel yasatmoqchimisiz?
        </h1>
        <p className="mt-4 text-sm text-charcoal-500">
          O‘lchamlar, material va rangni o‘zingiz tanlang. Biz sizga individual taklif tayyorlaymiz.
        </p>

        {!sent ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-10 space-y-5 rounded-3xl border border-charcoal-200/60 bg-white p-6 md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Ism *" name="name" />
              <Field label="Telefon *" name="phone" type="tel" />
            </div>
            <Field label="Mahsulot turi" name="type" placeholder="Javon, stol, shkaf..." />
            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Eni (sm)" name="width" type="number" />
              <Field label="Bo‘yi (sm)" name="height" type="number" />
              <Field label="Chuqurligi (sm)" name="depth" type="number" />
            </div>
            <Field label="Material / Rang" name="material" placeholder="Eman, qora metall..." />
            <Field label="Budjet (taxminiy)" name="budget" />
            <div>
              <label className="text-sm font-medium text-charcoal-700">Izoh</label>
              <textarea
                rows={4}
                className="mt-2 w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3 text-sm focus:border-forest-600 focus:outline-none"
                placeholder="Qo‘shimcha ma’lumot..."
              />
            </div>
            <label className="flex items-start gap-3 text-xs text-charcoal-500">
              <input type="checkbox" required className="mt-0.5 accent-forest-600" />
              Shaxsiy ma’lumotlarim qayta ishlanishiga roziman
            </label>
            <button
              type="submit"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-forest-600 text-base font-semibold text-white hover:bg-forest-700"
            >
              <Send className="h-5 w-5" />
              Ariza yuborish
            </button>
          </form>
        ) : (
          <div className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="mt-5 price-display text-2xl text-charcoal-900">
              Arizangiz qabul qilindi!
            </h2>
            <p className="mt-2 text-sm text-charcoal-600">
              Tez orada mutaxassisimiz siz bilan bog‘lanadi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label, name, type = "text", placeholder,
}: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-charcoal-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-charcoal-200 bg-white px-4 text-sm focus:border-forest-600 focus:outline-none"
      />
    </div>
  );
}
