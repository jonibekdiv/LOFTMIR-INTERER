"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function Categories() {
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
          y: 60,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
        });
      }

      /* Parallax: har bir kartochka rasmi scroll bo'lganda siljiydi */
      const imgs = gridRef.current?.querySelectorAll("img");
      imgs?.forEach((img) => {
        gsap.fromTo(
          img,
          { y: -30 },
          {
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ivory-200 py-20 md:py-32">
      <div className="container-wide">
        <div
          ref={headerRef}
          className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <span className="label-mono text-gold-500">Kategoriyalar</span>
            <h2 className="text-h2 mt-4 font-serif text-charcoal-800">
              Har bir xona uchun
              <br />
              <span className="italic text-forest-600">mukammal tanlov</span>
            </h2>
          </div>
          <Link
            href="/mahsulotlar"
            className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-forest-600 transition-colors hover:text-gold-500 md:self-auto"
          >
            Barchasini ko‘rish
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div ref={gridRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/kategoriya/${cat.slug}`}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-3xl bg-charcoal-700",
                i === 0
                  ? "aspect-square md:col-span-2 md:row-span-2 md:aspect-auto"
                  : "aspect-[4/5]"
              )}
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name.uz}
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                  priority={i < 2}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/30 to-transparent" />

              <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="price-text text-xs font-semibold text-gold-400">
                    0{i + 1}
                  </span>
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-ivory-200/20 bg-charcoal-800/40 text-ivory-200 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-charcoal-800">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <div>
                  <h3
                    className={cn(
                      "font-serif font-semibold leading-tight text-ivory-200",
                      i === 0 ? "text-3xl md:text-4xl" : "text-2xl"
                    )}
                  >
                    {cat.name.uz}
                  </h3>
                  <p className="mt-2 line-clamp-2 max-w-md text-sm text-ivory-200/70">
                    {cat.description.uz}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-ivory-200/15 pt-4">
                    <span className="price-text text-xs font-semibold text-gold-400">
                      {cat.productCount} ta mahsulot
                    </span>
                    <span className="label-mono text-[9px] text-ivory-200/0 transition-colors duration-500 group-hover:text-ivory-200/60">
                      Ko‘rish →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
