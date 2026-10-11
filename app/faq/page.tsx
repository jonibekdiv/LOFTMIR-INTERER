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
    <div className="container-wide py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <span className="label-mono text-gold-500">FAQ</span>
        <h1 className="mt-4 font-serif text-4xl font-bold text-charcoal-800 md:text-5xl">
          Ko‘p so‘raladigan savollar
        </h1>

        <div className="mt-12 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-sage-200 bg-white p-5 transition-all open:border-forest-600/50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-base font-semibold text-charcoal-800 marker:hidden">
                {f.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-sage-200 text-charcoal-500 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-500">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
