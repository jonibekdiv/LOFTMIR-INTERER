export const metadata = { title: "Qaytarish" };

export default function ReturnPage() {
  return (
    <div className="container-x py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
          Ma’lumot
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-charcoal-900 md:text-5xl">
          Qaytarish siyosati
        </h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-charcoal-600">
          <p>✅ Mahsulotni <strong>30 kun</strong> ichida qaytarish mumkin.</p>
          <p>📋 Mahsulot asl holatida, shikastlanmagan bo‘lishi kerak.</p>
          <p>💰 Pul 3–5 ish kuni ichida qaytariladi.</p>
          <p>📞 Qaytarish uchun <a href="tel:+998200008770" className="text-forest-600 font-semibold">+998 20 000 87 70</a> raqamiga qo‘ng‘iroq qiling.</p>
        </div>
      </div>
    </div>
  );
}
