export function Story() {
  const steps = [
    { n: "01", title: "Tanlang", text: "Katalogdan ozingizga yoqqan mahsulotni tanlang yoki maxsus buyurtma bering." },
    { n: "02", title: "Moslashtiring", text: "Rang, olcham va materialni ozingizga moslab sozlang." },
    { n: "03", title: "Buyurtma bering", text: "Rasmiylashtirish 2 daqiqada. Toshkent boylab bepul yetkazib berish." },
    { n: "04", title: "Zavq oling", text: "12 oy kafolat va 30 kun qaytarish. Uyingiz yangi joziba kasb etadi." },
  ];

  return (
    <section className="container-x py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
          Qanday ishlaymiz
        </span>
        <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-graphite-900 md:text-5xl">
          Soddadan - mukammalgacha
        </h2>
        <p className="mt-4 text-base text-graphite-500 text-pretty">
          Har bir mahsulot qolda yasaladi va sifat tekshiruvidan otadi. Sizga faqat eng yaxshisini yetkazamiz.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.n} className="group relative rounded-2xl border border-graphite-200/60 bg-white p-6 transition-all hover:border-gold-400/60 hover:shadow-soft">
            <span className="font-mono text-xs font-semibold text-gold-500">{s.n}</span>
            <h3 className="mt-3 price-display text-xl text-graphite-900">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite-500">
              {s.text}
            </p>
            <div className="absolute bottom-0 left-6 right-6 h-0.5 origin-left scale-x-0 gradient-gold transition-transform duration-500 group-hover:scale-x-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
