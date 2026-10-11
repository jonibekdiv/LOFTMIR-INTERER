import { RotateCcw, Check, X } from "lucide-react";

export const metadata = { title: "Qaytarish siyosati" };

export default function ReturnPage() {
  return (
    <div className="container-wide py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <span className="label-mono text-gold-500">Ma’lumot</span>
        <h1 className="mt-4 font-serif text-4xl font-bold text-charcoal-800 md:text-5xl">
          Qaytarish siyosati
        </h1>

        <div className="mt-10 space-y-6">
          <div className="rounded-2xl border border-sage-200 bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-600/10 text-forest-600">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-charcoal-800">
                  30 kun ichida qaytarish
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
                  Mahsulotni <strong className="font-semibold text-charcoal-800">30 kun</strong> ichida shartlarsiz qaytarish mumkin. Mahsulot asl holatida va shikastlanmagan bo‘lishi kerak.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-sage-200 bg-white p-6">
            <h2 className="mb-4 font-serif text-lg font-bold text-charcoal-800">
              Qaytarish shartlari
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                <span className="text-charcoal-600">Mahsulot 30 kun ichida qaytariladi</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                <span className="text-charcoal-600">Asl holatida, shikastlanmagan</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                <span className="text-charcoal-600">Yetkazib berish hujjati mavjud</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <span className="text-charcoal-600">Buyurtma asosida yasalgan mahsulotlar qaytarilmaydi</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gold-400/30 bg-gold-400/5 p-6">
            <p className="text-sm text-charcoal-700">
              <strong className="font-semibold">Pul qaytarish muddati:</strong> 3–5 ish kuni ichida
            </p>
            <p className="mt-2 text-sm text-charcoal-700">
              <strong className="font-semibold">Aloqa:</strong>{" "}
              <a href="tel:+998200008770" className="text-forest-600 underline">
                +998 20 000 87 70
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
