import { ShieldCheck } from "lucide-react";

export const metadata = { title: "Kafolat" };

export default function WarrantyPage() {
  return (
    <div className="container-wide py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <span className="label-mono text-gold-500">Ma’lumot</span>
        <h1 className="mt-4 font-serif text-4xl font-bold text-charcoal-800 md:text-5xl">
          Kafolat
        </h1>

        <div className="mt-10 space-y-5">
          <div className="rounded-2xl border border-sage-200 bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-600/10 text-forest-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-charcoal-800">
                  12 oy rasmiy kafolat
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
                  Barcha mahsulotlarimizga <strong className="font-semibold text-charcoal-800">12 oy</strong> rasmiy kafolat beriladi. Kafolat ishlab chiqarish nuqsonlarini qamrab oladi.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-sage-200 bg-white p-6">
            <h2 className="mb-4 font-serif text-lg font-bold text-charcoal-800">
              Kafolat nimani qamrab oladi?
            </h2>
            <ul className="space-y-3 text-sm text-charcoal-600">
              <li>✅ Ishlab chiqarish nuqsonlari</li>
              <li>✅ Materiallar sifati</li>
              <li>✅ Qurilma mustahkamligi</li>
              <li>❌ Noto‘g‘ri ishlatish natijasidagi zararlar</li>
              <li>❌ Tabiiy eskirish</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
