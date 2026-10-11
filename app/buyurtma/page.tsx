"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  MapPin,
  CreditCard,
  Check,
  ArrowLeft,
  ArrowRight,
  Banknote,
  Wallet,
  ShoppingBag,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import {
  useCheckoutStore,
  saveOrder,
  generateOrderNumber,
  type CompletedOrder,
  type OrderPayment,
} from "@/lib/store/checkout";
import { formatUZS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Aloqa", icon: User },
  { id: 2, title: "Manzil", icon: MapPin },
  { id: 3, title: "To‘lov", icon: CreditCard },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { items, totalPrice, clear } = useCartStore();
  const {
    customer,
    address,
    payment,
    setCustomer,
    setAddress,
    setPayment,
    reset,
  } = useCheckoutStore();

  const total = totalPrice();
  const shipping = 0;

  if (items.length === 0) {
    return (
      <div className="container-wide py-12">
        <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-sage-200 bg-ivory-100 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_4px_24px_-8px_rgba(18,79,69,0.1)]">
            <ShoppingBag className="h-7 w-7 text-charcoal-300" />
          </div>
          <h1 className="mt-5 font-serif text-2xl font-bold text-charcoal-800">
            Savat bo‘sh
          </h1>
          <p className="mt-2 text-sm text-charcoal-400">
            Buyurtma berish uchun avval mahsulot qo‘shing
          </p>
          <Link
            href="/mahsulotlar"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-forest-600 px-6 text-sm font-semibold text-ivory-200 transition-colors hover:bg-forest-700"
          >
            Mahsulotlarni ko‘rish
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!customer.firstName.trim()) e.firstName = "Ism kiritilishi shart";
      if (!customer.lastName.trim()) e.lastName = "Familiya kiritilishi shart";
      if (!customer.phone.trim() || customer.phone.length < 7)
        e.phone = "Telefon raqami to‘g‘ri kiriting";
    }
    if (s === 2) {
      if (!address.district.trim()) e.district = "Tuman kiritilishi shart";
      if (!address.street.trim()) e.street = "Ko‘cha kiritilishi shart";
      if (!address.building.trim()) e.building = "Uy raqami kiritilishi shart";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 3));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const submitOrder = async () => {
    if (!validateStep(1) || !validateStep(2)) {
      setStep(1);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    const order: CompletedOrder = {
      id: crypto.randomUUID(),
      number: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      customer,
      address,
      payment,
      items: items.map((i) => ({
        productId: i.productId,
        slug: i.slug,
        name: i.name,
        image: i.image,
        price: i.price,
        color: i.color,
        quantity: i.quantity,
      })),
      subtotal: total,
      shipping,
      total: total + shipping,
      status: "pending",
    };

    saveOrder(order);
    clear();
    reset();
    router.push(`/buyurtma/muvaffaqiyat?number=${order.number}`);
  };

  return (
    <div className="container-wide py-10 md:py-14">
      <Link
        href="/savat"
        className="inline-flex items-center gap-2 text-xs font-medium text-charcoal-400 transition-colors hover:text-forest-600"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Savatga qaytish
      </Link>

      <h1 className="mt-4 font-serif text-3xl font-bold text-charcoal-800 md:text-4xl">
        Buyurtmani rasmiylashtirish
      </h1>

      {/* Steps */}
      <div className="mt-8 flex items-center justify-center gap-2 md:gap-4">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isDone = step > s.id;
          return (
            <div key={s.id} className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-full transition-all",
                    isActive && "bg-forest-600 text-ivory-200 ring-4 ring-forest-600/20",
                    isDone && "bg-forest-500 text-ivory-200",
                    !isActive && !isDone && "bg-ivory-300 text-charcoal-400"
                  )}
                >
                  {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <span
                  className={cn(
                    "hidden text-sm font-medium md:inline",
                    isActive && "text-charcoal-800",
                    isDone && "text-forest-600",
                    !isActive && !isDone && "text-charcoal-400"
                  )}
                >
                  {s.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-8 rounded-full md:w-16",
                    step > s.id ? "bg-forest-500" : "bg-sage-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-sage-200 bg-white p-6 md:p-8">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-serif text-xl font-bold text-charcoal-800">
                  Aloqa ma’lumotlari
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Ism *"
                    value={customer.firstName}
                    onChange={(v) => setCustomer({ firstName: v })}
                    error={errors.firstName}
                    placeholder="Ismingiz"
                  />
                  <Field
                    label="Familiya *"
                    value={customer.lastName}
                    onChange={(v) => setCustomer({ lastName: v })}
                    error={errors.lastName}
                    placeholder="Familiyangiz"
                  />
                </div>
                <Field
                  label="Telefon *"
                  value={customer.phone}
                  onChange={(v) => setCustomer({ phone: v })}
                  error={errors.phone}
                  placeholder="+998 90 123 45 67"
                  type="tel"
                />
                <Field
                  label="Email (ixtiyoriy)"
                  value={customer.email ?? ""}
                  onChange={(v) => setCustomer({ email: v })}
                  placeholder="email@example.com"
                  type="email"
                />
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-serif text-xl font-bold text-charcoal-800">
                  Yetkazish manzili
                </h2>
                <Field
                  label="Shahar / Viloyat *"
                  value={address.city}
                  onChange={(v) => setAddress({ city: v })}
                  placeholder="Toshkent"
                />
                <Field
                  label="Tuman *"
                  value={address.district}
                  onChange={(v) => setAddress({ district: v })}
                  error={errors.district}
                  placeholder="Chilonzor tumani"
                />
                <Field
                  label="Ko‘cha *"
                  value={address.street}
                  onChange={(v) => setAddress({ street: v })}
                  error={errors.street}
                  placeholder="Bunyodkor shoh ko‘chasi"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Uy raqami *"
                    value={address.building}
                    onChange={(v) => setAddress({ building: v })}
                    error={errors.building}
                    placeholder="12A"
                  />
                  <Field
                    label="Xonadon (ixtiyoriy)"
                    value={address.apartment ?? ""}
                    onChange={(v) => setAddress({ apartment: v })}
                    placeholder="45"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal-700">
                    Izoh (ixtiyoriy)
                  </label>
                  <textarea
                    value={address.comment ?? ""}
                    onChange={(e) => setAddress({ comment: e.target.value })}
                    rows={3}
                    placeholder="Kuryerga qo‘shimcha ma’lumot..."
                    className="mt-2 w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm focus:border-forest-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-serif text-xl font-bold text-charcoal-800">
                  To‘lov usuli
                </h2>
                <div className="grid gap-3">
                  <PaymentOption
                    value="cash"
                    current={payment}
                    onSelect={setPayment}
                    icon={Banknote}
                    title="Naqd pul"
                    desc="Yetkazib berishda naqd to‘lov"
                  />
                  <PaymentOption
                    value="card_on_delivery"
                    current={payment}
                    onSelect={setPayment}
                    icon={Wallet}
                    title="Karta orqali"
                    desc="Kuryerga karta orqali to‘lov"
                  />
                  <div className="rounded-xl border border-dashed border-sage-200 bg-ivory-100 p-4 text-xs text-charcoal-500">
                    💡 Online to‘lov (Payme, Click) tez orada qo‘shiladi
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-sage-200 bg-ivory-100 p-5">
                  <h3 className="mb-3 text-sm font-semibold text-charcoal-800">
                    Buyurtma tafsilotlari
                  </h3>
                  <dl className="space-y-2 text-sm">
                    <Row label="Mijoz" value={`${customer.firstName} ${customer.lastName}`} />
                    <Row label="Telefon" value={customer.phone} />
                    <Row
                      label="Manzil"
                      value={`${address.city}, ${address.district}, ${address.street} ${address.building}${address.apartment ? `, xon. ${address.apartment}` : ""}`}
                    />
                    <Row label="Mahsulotlar" value={`${items.length} ta`} />
                  </dl>
                </div>

                <label className="flex items-start gap-3 text-xs text-charcoal-600">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 accent-forest-600"
                    defaultChecked
                  />
                  <span>
                    Men{" "}
                    <Link href="/maxfiylik" className="font-medium text-forest-600 underline">
                      maxfiylik siyosati
                    </Link>{" "}
                    va{" "}
                    <Link href="/foydalanish" className="font-medium text-forest-600 underline">
                      foydalanish shartlari
                    </Link>
                    ga roziman
                  </span>
                </label>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-sage-200 pt-6">
              {step > 1 ? (
                <button
                  onClick={prev}
                  disabled={submitting}
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-sage-200 px-5 text-sm font-medium text-charcoal-600 transition-colors hover:border-forest-600 hover:text-forest-600 disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Orqaga
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={next}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-forest-600 px-6 text-sm font-semibold text-ivory-200 transition-colors hover:bg-forest-700"
                >
                  Keyingi
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={submitOrder}
                  disabled={submitting}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-forest-600 px-6 text-sm font-semibold text-ivory-200 transition-colors hover:bg-forest-700 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-ivory-200/40 border-t-ivory-200" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Buyurtmani tasdiqlash
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-sage-200 bg-white p-6">
            <h2 className="font-serif text-lg font-bold text-charcoal-800">
              Buyurtma
            </h2>
            <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
              {items.map((i, idx) => (
                <li key={`${i.productId}-${idx}`} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-ivory-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-xs font-medium text-charcoal-800">
                      {i.name}
                    </p>
                    <p className="price-text text-[11px] text-charcoal-400">
                      {i.quantity} × {formatUZS(i.price)}
                    </p>
                  </div>
                  <span className="price-text text-xs font-semibold text-charcoal-800">
                    {formatUZS(i.price * i.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 border-t border-sage-200 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Mahsulotlar</span>
                <span className="price-text font-medium text-charcoal-800">
                  {formatUZS(total)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Yetkazish</span>
                <span className="font-medium text-forest-600">Bepul</span>
              </div>
              <div className="flex justify-between border-t border-sage-200 pt-2">
                <span className="font-serif font-semibold text-charcoal-800">Jami</span>
                <span className="price-display text-xl text-charcoal-800">
                  {formatUZS(total + shipping)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
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
        className={cn(
          "mt-2 h-12 w-full rounded-xl border bg-white px-4 text-sm focus:outline-none",
          error
            ? "border-red-300 focus:border-red-500"
            : "border-sage-200 focus:border-forest-600"
        )}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function PaymentOption({
  value,
  current,
  onSelect,
  icon: Icon,
  title,
  desc,
}: {
  value: OrderPayment;
  current: OrderPayment;
  onSelect: (v: OrderPayment) => void;
  icon: typeof Banknote;
  title: string;
  desc: string;
}) {
  const active = current === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
        active
          ? "border-forest-600 bg-forest-600/5"
          : "border-sage-200 hover:border-sage-400"
      )}
    >
      <div
        className={cn(
          "grid h-11 w-11 place-items-center rounded-xl",
          active ? "bg-forest-600 text-ivory-200" : "bg-ivory-200 text-charcoal-400"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-charcoal-800">{title}</p>
        <p className="text-xs text-charcoal-400">{desc}</p>
      </div>
      <div
        className={cn(
          "grid h-5 w-5 place-items-center rounded-full border-2",
          active ? "border-forest-600 bg-forest-600" : "border-sage-300"
        )}
      >
        {active && <div className="h-2 w-2 rounded-full bg-ivory-200" />}
      </div>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-charcoal-500">{label}</dt>
      <dd className="text-right font-medium text-charcoal-800">{value}</dd>
    </div>
  );
}
