export const metadata = { title: "Biz haqimizda" };

export default function AboutPage() {
  return (
    <div className="container-wide py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <span className="label-mono text-gold-500">Biz haqimizda</span>
        <h1 className="mt-4 font-serif text-4xl font-bold text-charcoal-800 md:text-5xl">
          LOFTMIR INTERER
        </h1>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-charcoal-500">
          <p>
            <strong className="font-semibold text-charcoal-800">LOFTMIR INTERER</strong> — zamonaviy interyer uchun premium mebel ishlab chiqaruvchi brend. Biz tabiiy materiallar, qo‘lda yasalgan sifat va nozik dizaynni qadrlaymiz.
          </p>
          <p>
            Har bir mahsulot Toshkentdagi ustaxonamizda qo‘lda yasaladi. Biz eng yaxshi eman, metall va matolardan foydalanamiz, har bir detalni diqqat bilan tekshiramiz.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            { n: "500+", l: "Mamnun mijozlar" },
            { n: "7+", l: "Yillik tajriba" },
            { n: "100%", l: "Sifat kafolati" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-sage-200 bg-white p-6 text-center"
            >
              <div className="price-text text-3xl font-bold text-gold-500">
                {s.n}
              </div>
              <p className="mt-2 text-xs text-charcoal-400">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
