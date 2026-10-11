"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { Hero3D } from "./Hero3D";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  /* ─── ENTRANCE ANIMATION (faqat bir marta) ─── */
  useEffect(() => {
    if (prefersReducedMotion()) {
      /* Reduced-motion: hamma narsa darhol ko'rinadi */
      const els = [labelRef, headlineRef, paraRef, ctaRef, statsRef, modelRef, scrollHintRef];
      els.forEach((r) => {
        if (r.current) {
          r.current.style.opacity = "1";
          r.current.style.transform = "none";
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1 },
      });

      /* Boshlang'ich holat */
      gsap.set(
        [
          labelRef.current,
          headlineRef.current,
          paraRef.current,
          ctaRef.current,
          statsRef.current,
        ],
        { opacity: 0, y: 30 }
      );
      gsap.set(modelRef.current, { opacity: 0, scale: 0.95 });
      gsap.set(scrollHintRef.current, { opacity: 0 });

      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.7 })
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 1.1 }, "-=0.4")
        .to(paraRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.7")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(modelRef.current, { opacity: 1, scale: 1, duration: 1.4 }, "-=1.4")
        .to(scrollHintRef.current, { opacity: 1, duration: 0.6 }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ─── SCROLL ANIMATION (ixtiyoriy, faqat yumshoq effekt) ─── */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Matn scroll bo'lganda sekin yuqoriga */
      gsap.to(
        [headlineRef.current, paraRef.current, ctaRef.current, statsRef.current],
        {
          y: -60,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );

      /* 3D model sekin kattalashadi */
      gsap.to(modelRef.current, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* Scroll hint tez yo'qoladi */
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "15% top",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-forest-700 text-ivory-200 md:min-h-[calc(100vh-5.7rem)]"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-forest" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 30%, rgba(232,175,66,0.25) 0%, transparent 45%), radial-gradient(circle at 85% 70%, rgba(63,143,126,0.35) 0%, transparent 50%)",
        }}
      />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-gold-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-forest-400/15 blur-[120px]" />

      {/* Content */}
      <div className="container-wide relative grid min-h-[calc(100vh-3.5rem)] gap-8 py-12 md:min-h-[calc(100vh-5.7rem)] md:py-16 lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Left — Text */}
        <div className="lg:col-span-7 xl:col-span-6">
          {/* Label */}
          <div
            ref={labelRef}
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/8 px-3.5 py-1.5 text-[11px] font-medium tracking-wider text-gold-300 backdrop-blur-sm"
          >
            <Sparkles className="h-3 w-3" />
            <span className="uppercase">Premium mebel · Toshkent</span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="mt-8 font-serif text-[clamp(2.75rem,8vw,6rem)] font-bold leading-[0.98] tracking-[-0.03em] text-balance text-ivory-200 md:mt-10"
          >
            Uyingizga
            <br />
            <span
              className="italic"
              style={{
                background:
                  "linear-gradient(120deg, #e8af42 0%, #f0c96b 40%, #d19432 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              joziba
            </span>{" "}
            baxsh
            <br />
            eting.
          </h1>

          {/* Paragraph */}
          <p
            ref={paraRef}
            className="mt-8 max-w-xl text-[15px] leading-relaxed text-ivory-200/70 md:text-base"
          >
            <strong className="font-semibold text-ivory-200">
              LOFTMIR INTERER
            </strong>{" "}
            — zamonaviy interyer uchun premium mebel. Qo‘lda yasalgan,
            tabiiy materiallardan, har bir detalga e’tibor bilan yaratilgan.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/mahsulotlar"
              className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-gold-400 px-7 text-sm font-semibold tracking-wide text-charcoal-800 shadow-[0_8px_32px_-8px_rgba(232,175,66,0.5)] transition-all hover:bg-gold-300"
            >
              Kolleksiyani ko‘rish
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/maxsus-buyurtma"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-xl border border-ivory-200/20 bg-ivory-200/5 px-7 text-sm font-semibold tracking-wide text-ivory-200 backdrop-blur-sm transition-all hover:border-ivory-200/40 hover:bg-ivory-200/10"
            >
              Maxsus buyurtma
            </Link>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-ivory-200/10 pt-8"
          >
            <Stat value="500+" label="Mamnun mijozlar" />
            <Stat value="30 kun" label="Qaytarish" />
            <Stat value="12 oy" label="Kafolat" />
          </div>
        </div>

        {/* Right — 3D */}
        <div
          ref={modelRef}
          className="relative aspect-square w-full lg:col-span-5 lg:aspect-[5/6] xl:col-span-6 xl:aspect-square"
        >
          <Hero3D modelUrl="/models/zig-zag-javon.glb" />
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="label-mono text-ivory-200/40">Pastga suring</span>
        <ArrowDown className="scroll-hint h-4 w-4 text-gold-400" />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="price-text text-xl font-bold text-gold-400 md:text-2xl">
        {value}
      </div>
      <div className="mt-1.5 text-[11px] font-medium tracking-wide text-ivory-200/50">
        {label}
      </div>
    </div>
  );
}
