export const metadata = { title: "Biz haqimizda" };

export default function AboutPage() {
  return (
    <div className="container-x py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
          Biz haqimizda
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-charcoal-900 md:text-5xl">
          LOFTMIR INTERER
        </h1>
        <div className="prose prose-lg mt-8 space-y-5 text-charcoal-600">
          <p className="text-base leading-relaxed">
            LOFTMIR INTERER — zamonaviy interyer uchun premium mebel ishlab chiqaruvchi brend. Biz tabiiy materiallar, qo‘lda yasalgan sifat va nozik dizaynni qadrlaymiz.
          </p>
          <p className="text-base leading-relaxed">
            Har bir mahsulot Toshkentdagi ustaxonamizda qo‘lda yasaladi. Biz eng yaxshi eman, metall va matolardan foydalanamiz, har bir detalni diqqat bilan tekshiramiz.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { n: "500+", l: "Mamnun mijozlar" },
            { n: "7+", l: "Yillik tajriba" },
            { n: "100%", l: "Sifat kafolati" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-charcoal-200/60 bg-white p-6 text-center">
              <div className="font-display text-3xl font-bold text-gold-500">{s.n}</div>
              <p className="mt-1 text-xs text-charcoal-500">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
