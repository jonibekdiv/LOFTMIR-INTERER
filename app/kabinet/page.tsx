"use client";

import { User, Phone, Mail, Edit3 } from "lucide-react";

export default function CabinetPage() {
  return (
    <div className="space-y-6">
      {/* Profil kartasi */}
      <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl gradient-petrol">
              <User className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="price-display text-xl text-charcoal-900">
                Mehmon foydalanuvchi
              </h2>
              <p className="mt-1 text-xs text-charcoal-500">
                Profilni to‘ldirish uchun tahrirlash
              </p>
            </div>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-charcoal-200 text-charcoal-600 hover:border-forest-600 hover:text-forest-600">
            <Edit3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Aloqa ma’lumotlari */}
      <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6 md:p-8">
        <h3 className="font-display price-text text-lg font-bold text-charcoal-900">
          Aloqa ma’lumotlari
        </h3>
        <div className="mt-5 space-y-4">
          <InfoRow icon={Phone} label="Telefon" value="+998 20 000 87 70" />
          <InfoRow icon={Mail} label="Email" value="kiritilmagan" muted />
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  muted,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-forest-600/5 text-forest-600">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs text-charcoal-500">{label}</p>
        <p className={muted ? "text-sm text-charcoal-400 italic" : "text-sm font-medium text-charcoal-800"}>
          {value}
        </p>
      </div>
    </div>
  );
}
