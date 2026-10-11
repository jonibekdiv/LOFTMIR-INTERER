"use client";

import Link from "next/link";
import { User, Package, Heart, MapPin, Settings, LogOut } from "lucide-react";

export default function CabinetPage() {
  const items = [
    { icon: Package, label: "Buyurtmalarim", desc: "0 ta buyurtma", href: "/kabinet/buyurtmalar" },
    { icon: Heart, label: "Sevimlilar", desc: "0 ta mahsulot", href: "/sevimlilar" },
    { icon: MapPin, label: "Manzillarim", desc: "Manzil qo‘shilmagan", href: "#" },
    { icon: Settings, label: "Sozlamalar", desc: "Profil sozlamalari", href: "#" },
  ];

  return (
    <div className="container-wide py-10 md:py-14">
      <h1 className="font-serif text-4xl font-bold text-charcoal-800 md:text-5xl">
        Mijoz kabineti
      </h1>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {/* Profile card */}
        <div className="rounded-3xl border border-sage-200 bg-white p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-forest">
            <User className="h-7 w-7 text-ivory-200" />
          </div>
          <h2 className="mt-4 font-serif text-xl font-bold text-charcoal-800">
            Mehmon foydalanuvchi
          </h2>
          <p className="price-text mt-1 text-sm text-charcoal-400">
            +998 20 000 87 70
          </p>
          <button className="mt-6 h-10 w-full rounded-xl border border-sage-200 text-sm font-medium text-charcoal-700 transition-all hover:border-forest-600 hover:text-forest-600">
            Tahrirlash
          </button>
        </div>

        {/* Grid */}
        <div className="grid gap-3 sm:grid-cols-2 md:col-span-2">
          {items.map((it) => (
            <Link
              key={it.label}
              href={it.href}
              className="rounded-2xl border border-sage-200 bg-white p-5 transition-all hover:border-forest-600/50 hover:shadow-[0_8px_24px_-8px_rgba(18,79,69,0.1)]"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-forest-600/8 text-forest-600">
                  <it.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal-800">
                    {it.label}
                  </p>
                  <p className="mt-0.5 text-xs text-charcoal-400">{it.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
