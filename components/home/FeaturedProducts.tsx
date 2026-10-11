"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 8);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "expo.out",
      });

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          opacity: 0,
          y: 50,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ivory-50 py-20 md:py-32"
    >
      <div className="container-wide">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <span className="label-mono text-gold-500">
              Tanlangan kolleksiya
            </span>
            <h2 className="text-h2 mt-4 font-serif text-charcoal-800">
              Eng sevimli
              <br />
              <span className="italic text-forest-600">mahsulotlar</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm text-charcoal-400">
              Mijozlarimiz tomonidan eng ko‘p tanlanadigan premium mebel.
              Sifat va did uyg‘unligi.
            </p>
          </div>
          <Link
            href="/mahsulotlar"
            className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-forest-600 transition-colors hover:text-gold-500 md:self-auto"
          >
            Barchasini ko‘rish
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/mahsulotlar"
            className="group inline-flex h-13 items-center gap-2.5 rounded-xl border border-charcoal-700/15 bg-ivory-100 px-8 text-sm font-semibold text-charcoal-800 transition-all hover:border-forest-600 hover:bg-forest-600 hover:text-ivory-100"
          >
            Barcha mahsulotlarni ko‘rish
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
