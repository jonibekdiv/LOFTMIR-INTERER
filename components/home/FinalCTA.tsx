"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "expo.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-charcoal-800 py-24 text-ivory-100 md:py-36"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1920&q=80&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/95 via-charcoal-800/90 to-charcoal-900/70" />
      </div>

      {/* Decorative */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-gold-400/8 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-forest-400/10 blur-[140px]" />

      <div className="container-wide relative">
        <div ref={contentRef} className="mx-auto max-w-4xl text-center">
          {/* Label */}
          <span className="label-mono text-gold-400">
            Keling, boshlaymiz
          </span>

          {/* Headline */}
          <h2 className="mt-6 font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ivory-100">
            Uyingiz uchun
            <br />
            <span className="italic text-gold-400">noyob</span> mebel
            <br />
            yarataylik.
          </h2>

          {/* Subtext */}
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ivory-200/60 md:text-base">
            Har bir loyiha alohida e’tibor bilan yaratiladi. G‘oyangizni
            bizga ayting — biz uni haqiqatga aylantiramiz.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/mahsulotlar"
              className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-gold-400 px-8 text-sm font-semibold text-charcoal-800 shadow-[0_8px_32px_-8px_rgba(232,175,66,0.5)] transition-all hover:bg-gold-300"
            >
              Kolleksiyani ko‘rish
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/maxsus-buyurtma"
              className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-xl border border-ivory-200/25 bg-transparent px-8 text-sm font-semibold text-ivory-100 backdrop-blur-sm transition-all hover:border-gold-400 hover:bg-gold-400/10"
            >
              <MessageCircle className="h-4 w-4" />
              Maxsus buyurtma
            </Link>
          </div>

          {/* Contact info */}
          <div className="mt-16 flex flex-col items-center gap-3 border-t border-ivory-200/10 pt-8 text-xs text-ivory-200/50 md:flex-row md:justify-center md:gap-8">
            <a
              href="tel:+998200008770"
              className="price-text transition-colors hover:text-gold-400"
            >
              +998 20 000 87 70
            </a>
            <span className="hidden h-3 w-px bg-ivory-200/15 md:block" />
            <a
              href="https://t.me/rangerbek"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold-400"
            >
              @rangerbek
            </a>
            <span className="hidden h-3 w-px bg-ivory-200/15 md:block" />
            <span>Toshkent · 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
}
