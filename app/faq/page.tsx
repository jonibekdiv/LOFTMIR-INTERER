export const metadata = { title: "FAQ" };

const faqs = [
  { q: "Yetkazib berish qancha turadi?", a: "Toshkent bo‘ylab yetkazib berish bepul. Viloyatlarga alohida narx kelishiladi." },
  { q: "To‘lov qanday amalga oshiriladi?", a: "Hozircha faqat naqd to‘lov. Online to‘lov tez orada qo‘shiladi." },
  { q: "Mahsulotni qaytarish mumkinmi?", a: "Ha, 30 kun ichida shartlarsiz qaytarish mumkin." },
  { q: "Kafolat muddati qancha?", a: "Barcha mahsulotlarga 12 oy rasmiy kafolat beriladi." },
  { q: "Maxsus o‘lchamda yasatasizmi?", a: "Ha, maxsus buyurtma orqali istalgan o‘lchamda yasatish mumkin." },
  { q: "Ishlab chiqarish muddati qancha?", a: "Odatda 3–12 kun, mahsulotga qarab." },
];

export default function FAQPage() {
  return (
    <div className="container-x py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">FAQ</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-graphite-900 md:text-5xl">
          Ko‘p so‘raladigan savollar
        </h1>

        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-graphite-200/60 bg-white p-5 open:border-petrol-600/50">
              <summary className="cursor-pointer list-none text-base font-semibold text-graphite-800 marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {f.q}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-graphite-200 text-graphite-500 transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-graphite-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
