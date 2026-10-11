import { Truck } from "lucide-react";

export const metadata = { title: "Yetkazib berish" };

export default function DeliveryPage() {
  return (
    <div className="container-wide py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <span className="label-mono text-gold-500">Ma’lumot</span>
        <h1 className="mt-4 font-serif text-4xl font-bold text-charcoal-800 md:text-5xl">
          Yetkazib berish
        </h1>

        <div className="mt-10 space-y-5">
          <div className="rounded-2xl border border-sage-200 bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-600/10 text-forest-600">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-charcoal-800">
                  Bepul yetkazish
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
                  Toshkent shahri bo‘ylab yetkazib berish <strong className="font-semibold text-charcoal-800">bepul</strong>. Viloyatlarga yetkazib berish operator bilan kelishiladi.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-sage-200 bg-white p-6">
            <h2 className="mb-4 font-serif text-lg font-bold text-charcoal-800">
              Yetkazish muddati
            </h2>
            <ul className="space-y-3 text-sm text-charcoal-600">
              <li>🚚 Toshkent ichida — 1–3 ish kuni</li>
              <li>📦 Buyurtma tayyor bo‘lgach, kuryer bog‘lanadi</li>
              <li>👁️ Mahsulotni ko‘zdan kechirib qabul qilib olishingiz mumkin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
