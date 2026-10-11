import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data/categories";

export function Categories() {
  return (
    <section className="container-x py-20 md:py-28">
      {/* Header */}
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
            Kategoriyalar
          </span>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight text-graphite-900 md:text-5xl">
            Har bir xona uchun
          </h2>
          <p className="mt-3 max-w-xl text-sm text-graphite-500">
            Uyingizning har bir burchagi uchun ideal mebel tanlovi
          </p>
        </div>
        <Link
          href="/mahsulotlar"
          className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-petrol-600 transition-colors hover:text-gold-500 md:self-auto"
        >
          Barchasini ko‘rish
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            href={`/kategoriya/${cat.slug}`}
            className="group relative flex aspect-[4/5] flex-col overflow-hidden rounded-3xl bg-graphite-900 transition-all duration-500 hover:shadow-2xl"
          >
            {/* Fon rasmi */}
            <Image
              src={cat.image}
              alt={cat.name.uz}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              priority={i < 2}
            />

            {/* Overlay — qora gradient pastdan */}
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-900 via-graphite-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-900/80 via-transparent to-transparent" />

            {/* Kontent */}
            <div className="relative flex h-full flex-col justify-between p-6 text-white">
              {/* Yuqori qism — raqam va tugma */}
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs font-semibold text-gold-400">
                  0{i + 1}
                </span>

                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-graphite-900 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              {/* Pastki qism — nom va tavsif */}
              <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <h3 className="font-display text-2xl font-bold leading-tight md:text-3xl">
                  {cat.name.uz}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-graphite-300">
                  {cat.description.uz}
                </p>

                {/* Pastdagi chiziq va mahsulot soni */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-medium text-gold-400">
                    {cat.productCount} ta mahsulot
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-graphite-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Ko‘rish →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
