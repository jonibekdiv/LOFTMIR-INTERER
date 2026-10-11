"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const STEPS = [
  {
    n: "01",
    title: "Tanlang",
    text: "Katalogdan o‘zingizga yoqqan mahsulotni tanlang yoki maxsus buyurtma bering.",
  },
  {
    n: "02",
    title: "Moslashtiring",
    text: "Rang, o‘lcham va materialni o‘zingizga moslab sozlang.",
  },
  {
    n: "03",
    title: "Buyurtma bering",
    text: "Rasmiylashtirish 2 daqiqada. Toshkent bo‘ylab bepul yetkazib berish.",
  },
  {
    n: "04",
    title: "Zavq oling",
    text: "12 oy kafolat va 30 kun qaytarish. Uyingiz yangi joziba kasb etadi.",
  },
];

export function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Header reveal */
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "expo.out",
      });

      /* Horizontal line grow */
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
          },
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "expo.out",
        });
      }

      /* Steps staggered */
      const steps = gridRef.current?.children;
      if (steps) {
        gsap.from(steps, {
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          opacity: 0,
          y: 60,
          duration: 1,
          stagger: 0.15,
          ease: "expo.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-forest-700 py-24 text-ivory-100 md:py-36"
    >
      {/* Decorative */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-gold-400/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-forest-400/15 blur-[120px]" />

      <div className="container-wide relative">
        {/* Header */}
        <div
          ref={headerRef}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-mono text-gold-400">
            Qanday ishlaymiz
          </span>
          <h2 className="text-h2 mt-4 font-serif text-ivory-100">
            Soddadan
            <br />
            <span className="italic text-gold-400">mukammalgacha</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ivory-200/60 md:text-base">
            Har bir mahsulot qo‘lda yasaladi va sifat tekshiruvidan
            o‘tadi. Sizga faqat eng yaxshisini yetkazamiz.
          </p>
        </div>

        {/* Progress line */}
        <div className="mt-20">
          <div className="relative">
            <div
              ref={lineRef}
              className="h-px w-full bg-gradient-to-r from-gold-400/60 via-ivory-200/20 to-transparent"
            />
          </div>

          {/* Steps grid */}
          <div
            ref={gridRef}
            className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4"
          >
            {STEPS.map((step) => (
              <div key={step.n} className="group relative">
                {/* Number */}
                <div className="flex items-baseline gap-3">
                  <span className="price-text font-serif text-5xl font-bold text-gold-400/70 transition-colors duration-500 group-hover:text-gold-400 md:text-6xl">
                    {step.n}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-6 font-serif text-xl font-semibold text-ivory-100 md:text-2xl">
                  {step.title}
                </h3>

                {/* Text */}
                <p className="mt-3 text-sm leading-relaxed text-ivory-200/60">
                  {step.text}
                </p>

                {/* Hover underline */}
                <div className="absolute -bottom-2 left-0 h-px w-0 bg-gold-400 transition-all duration-700 group-hover:w-12" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/maxsus-buyurtma"
            className="group inline-flex h-13 items-center gap-2.5 rounded-xl border border-ivory-200/20 bg-ivory-200/5 px-8 text-sm font-semibold text-ivory-100 backdrop-blur-sm transition-all hover:border-gold-400 hover:bg-gold-400 hover:text-charcoal-800"
          >
            Maxsus buyurtma berish
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
