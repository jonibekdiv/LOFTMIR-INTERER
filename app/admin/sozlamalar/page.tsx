"use client";

import { useState, useEffect } from "react";
import {
  Store,
  Phone,
  Mail,
  MapPin,
  Send,
  Instagram,
  Globe,
  Save,
  Check,
  Building2,
  Banknote,
  Truck,
} from "lucide-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cn } from "@/lib/utils";

/* ============ Settings store ============ */
type SiteSettings = {
  brandName: string;
  brandTagline: string;
  phone: string;
  email: string;
  telegram: string;
  instagram: string;
  address: string;
  workingHours: string;
  deliveryInfo: string;
  warranty: string;
  returnDays: number;
  warrantyMonths: number;
  currency: string;
  language: "uz" | "ru" | "en";
  announcement: string;
  showAnnouncement: boolean;
};

const DEFAULT_SETTINGS: SiteSettings = {
  brandName: "LOFTMIR INTERER",
  brandTagline: "Premium mebel va interyer",
  phone: "+998 20 000 87 70",
  email: "pubgkir40@gmail.com",
  telegram: "@rangerbek",
  instagram: "@ranger",
  address: "Toshkent, O‘zbekiston",
  workingHours: "Dush–Yak · 24/7",
  deliveryInfo: "Toshkent bo‘ylab bepul yetkazib berish",
  warranty: "12 oy rasmiy kafolat",
  returnDays: 30,
  warrantyMonths: 12,
  currency: "UZS",
  language: "uz",
  announcement: "",
  showAnnouncement: false,
};

type SettingsState = {
  settings: SiteSettings;
  update: (patch: Partial<SiteSettings>) => void;
  reset: () => void;
};

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      update: (patch) =>
        set((s) => ({ settings: { ...s.settings, ...patch } })),
      reset: () => set({ settings: DEFAULT_SETTINGS }),
    }),
    { name: "loftmir-settings", version: 1 }
  )
);

/* ============ Page ============ */
export default function AdminSettingsPage() {
  const { settings, update, reset } = useSettingsStore();
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="heading-display text-2xl text-charcoal-900">
          Sozlamalar
        </h1>
        <p className="mt-1 text-sm text-charcoal-500">
          Sayt bo‘yicha umumiy ma’lumotlar
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <Check className="h-4 w-4" />
          Sozlamalar saqlandi
        </div>
      )}

      {/* Brend */}
      <Card title="Brend" icon={Store}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Brend nomi"
            value={settings.brandName}
            onChange={(v) => update({ brandName: v })}
          />
          <Field
            label="Slogan"
            value={settings.brandTagline}
            onChange={(v) => update({ brandTagline: v })}
          />
        </div>
      </Card>

      {/* Aloqa */}
      <Card title="Aloqa ma’lumotlari" icon={Phone}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Telefon"
            value={settings.phone}
            onChange={(v) => update({ phone: v })}
            icon={Phone}
          />
          <Field
            label="Email"
            value={settings.email}
            onChange={(v) => update({ email: v })}
            icon={Mail}
            type="email"
          />
          <Field
            label="Telegram"
            value={settings.telegram}
            onChange={(v) => update({ telegram: v })}
            icon={Send}
          />
          <Field
            label="Instagram"
            value={settings.instagram}
            onChange={(v) => update({ instagram: v })}
            icon={Instagram}
          />
          <Field
            label="Manzil"
            value={settings.address}
            onChange={(v) => update({ address: v })}
            icon={MapPin}
          />
          <Field
            label="Ish vaqti"
            value={settings.workingHours}
            onChange={(v) => update({ workingHours: v })}
          />
        </div>
      </Card>

      {/* Savdo siyosati */}
      <Card title="Savdo siyosati" icon={Truck}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-charcoal-700">
              Yetkazib berish ma’lumoti
            </label>
            <textarea
              value={settings.deliveryInfo}
              onChange={(e) => update({ deliveryInfo: e.target.value })}
              rows={2}
              className="mt-2 w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3 text-sm focus:border-forest-600 focus:outline-none"
            />
          </div>
          <Field
            label="Qaytarish muddati (kun)"
            type="number"
            value={String(settings.returnDays)}
            onChange={(v) => update({ returnDays: Number(v) })}
          />
          <Field
            label="Kafolat muddati (oy)"
            type="number"
            value={String(settings.warrantyMonths)}
            onChange={(v) => update({ warrantyMonths: Number(v) })}
          />
        </div>
      </Card>

      {/* Valyuta va til */}
      <Card title="Valyuta va til" icon={Globe}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-charcoal-700">
              Valyuta
            </label>
            <select
              value={settings.currency}
              onChange={(e) => update({ currency: e.target.value })}
              className="mt-2 h-12 w-full rounded-xl border border-charcoal-200 bg-white px-4 text-sm focus:border-forest-600 focus:outline-none"
            >
              <option value="UZS">UZS (so‘m)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal-700">
              Asosiy til
            </label>
            <select
              value={settings.language}
              onChange={(e) =>
                update({ language: e.target.value as "uz" | "ru" | "en" })
              }
              className="mt-2 h-12 w-full rounded-xl border border-charcoal-200 bg-white px-4 text-sm focus:border-forest-600 focus:outline-none"
            >
              <option value="uz">O‘zbekcha</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </Card>

      {/* E'lon */}
      <Card title="E’lon paneli" icon={Building2}>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.showAnnouncement}
            onChange={(e) => update({ showAnnouncement: e.target.checked })}
            className="h-5 w-5 accent-forest-600"
          />
          <span className="text-sm font-medium text-charcoal-700">
            Bosh sahifada e’lonni ko‘rsatish
          </span>
        </label>
        {settings.showAnnouncement && (
          <div className="mt-4">
            <label className="text-sm font-medium text-charcoal-700">
              E’lon matni
            </label>
            <input
              value={settings.announcement}
              onChange={(e) => update({ announcement: e.target.value })}
              placeholder="Masalan: Yangi kolleksiya chegirmada!"
              className="mt-2 h-12 w-full rounded-xl border border-charcoal-200 bg-white px-4 text-sm focus:border-forest-600 focus:outline-none"
            />
          </div>
        )}
      </Card>

      {/* Actions */}
      <div className="flex justify-between gap-3">
        <button
          onClick={reset}
          className="h-11 rounded-xl border border-charcoal-200 px-5 text-sm font-medium text-charcoal-600 hover:bg-charcoal-50"
        >
          Standartga qaytarish
        </button>
        <button
          onClick={handleSave}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-forest-600 px-6 text-sm font-semibold text-white hover:bg-forest-700"
        >
          <Save className="h-4 w-4" />
          Sozlamalarni saqlash
        </button>
      </div>
    </div>
  );
}

/* ============ Helpers ============ */
function Card({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Store;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-forest-600/10 text-forest-600">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="heading-display text-lg text-charcoal-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  icon?: typeof Phone;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-charcoal-700">{label}</label>
      <div className="relative mt-2">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-12 w-full rounded-xl border border-charcoal-200 bg-white pr-4 text-sm focus:border-forest-600 focus:outline-none",
            Icon ? "pl-11" : "pl-4"
          )}
        />
      </div>
    </div>
  );
}
