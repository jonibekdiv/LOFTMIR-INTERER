"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Hero3D } from "./Hero3D";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-graphite-900 text-white">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1e4a47 0%, #256c63 60%, #0f2a28 100%)" }} />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "radial-gradient(circle at 20% 40%, rgba(229,167,58,0.35) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(37,108,99,0.5) 0%, transparent 50%)"
      }} />
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-petrol-400/20 blur-3xl" />

      <div className="container-x relative grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1.5 text-xs font-medium text-gold-300 animate-fadeUp">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Premium mebel . Toshkent . 2024</span>
          </div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight animate-fadeUp md:text-7xl lg:text-[5rem]" style={{ animationDelay: "80ms" }}>
            <span className="block text-white">Uyingizga</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #e5a73a 0%, #f2ce7f 50%, #c98b22 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              joziba
            </span>
            <span className="block text-white">baxsh eting</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite-300 md:text-lg animate-fadeUp" style={{ animationDelay: "160ms" }}>
            LOFTMIR INTERER - zamonaviy interyer uchun premium mebel. Qolda yasalgan, tabiiy materiallardan, har bir detalga etibor berilgan.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row animate-fadeUp" style={{ animationDelay: "240ms" }}>
            <Link
              href="/mahsulotlar"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-8 text-base font-semibold text-graphite-900 shadow-[0_8px_32px_-8px_rgba(229,167,58,0.6)] transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #e5a73a 0%, #f2ce7f 50%, #c98b22 100%)" }}
            >
              Kolleksiyani korish
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/maxsus-buyurtma"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Maxsus buyurtma
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 animate-fadeUp" style={{ animationDelay: "320ms" }}>
            <Stat number="500+" label="Mamnun mijozlar" />
            <Stat number="30 kun" label="Qaytarish kafolati" />
            <Stat number="12 oy" label="Rasmiy kafolat" />
          </div>
        </div>

        {/* 3D Model */}
        <div className="lg:col-span-5 animate-fadeUp" style={{ animationDelay: "400ms" }}>
          <div className="relative aspect-square w-full">
            <Hero3D modelUrl="/models/zig-zag-javon.glb" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-gold-400 md:text-3xl">{number}</div>
      <div className="mt-1 text-xs text-graphite-400">{label}</div>
    </div>
  );
}
