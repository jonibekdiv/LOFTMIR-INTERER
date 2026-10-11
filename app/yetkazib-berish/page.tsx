export const metadata = { title: "Yetkazib berish" };

export default function DeliveryPage() {
  return (
    <div className="container-x py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
          Ma’lumot
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-charcoal-900 md:text-5xl">
          Yetkazib berish
        </h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-charcoal-600">
          <p>✅ Toshkent shahri bo‘ylab yetkazib berish — <strong>bepul</strong>.</p>
          <p>📦 Viloyatlarga yetkazib berish — operator bilan kelishiladi.</p>
          <p>⏱️ Toshkent ichida 1–3 ish kuni ichida yetkazib beriladi.</p>
          <p>🚚 Buyurtma yetkazilganda uni ko‘zdan kechirib, qabul qilib olishingiz mumkin.</p>
        </div>
      </div>
    </div>
  );
}
