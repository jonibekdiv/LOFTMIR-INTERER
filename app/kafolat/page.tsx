export const metadata = { title: "Kafolat" };

export default function WarrantyPage() {
  return (
    <div className="container-x py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
          Ma’lumot
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-graphite-900 md:text-5xl">
          Kafolat
        </h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-graphite-600">
          <p>🛡️ Barcha mahsulotlarga <strong>12 oy rasmiy kafolat</strong> beriladi.</p>
          <p>🔧 Kafolat ishlab chiqarish nuqsonlarini qamrab oladi.</p>
          <p>⚠️ Kafolat noto‘g‘ri ishlatish natijasidagi zararlarni qamramaydi.</p>
        </div>
      </div>
    </div>
  );
}
