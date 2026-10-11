"use client";

import { useState } from "react";
import { useEffect, useRef } from "react";
import { Send, Check, ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(innerRef.current, {
        scrollTrigger: { trigger: innerRef.current, start: "top 80%" },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "expo.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3500);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-ivory-100 py-20 md:py-28"
    >
      <div className="container-wide">
        <div
          ref={innerRef}
          className="relative overflow-hidden rounded-3xl gradient-forest p-10 text-ivory-100 md:p-16 lg:p-20"
        >
          {/* Decorative */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-forest-400/15 blur-3xl" />

          {/* Noise */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.4'/></svg>\")",
            }}
          />

          <div className="relative mx-auto max-w-3xl">
            <span className="label-mono text-gold-400">
              Yangiliklar
            </span>
            <h2 className="text-h3 mt-4 font-serif text-ivory-100 md:text-h2">
              Yangi kolleksiyalardan
              <br />
              <span className="italic text-gold-400">birinchi bo‘lib</span>{" "}
              xabardor bo‘ling
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory-200/60 md:text-base">
              Chegirmalar, yangi mahsulotlar va maxsus takliflar haqida
              email orqali xabar yuboramiz. Spam yo‘q — faqat foydali
              ma’lumot.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="email@example.com"
                  required
                  disabled={status === "loading" || status === "success"}
                  className={cn(
                    "h-14 w-full rounded-xl border bg-ivory-200/5 px-5 text-sm text-ivory-100 placeholder:text-ivory-200/40 backdrop-blur-sm transition-all focus:outline-none",
                    status === "error"
                      ? "border-red-400/60 focus:border-red-400"
                      : "border-ivory-200/15 focus:border-gold-400",
                    (status === "loading" || status === "success") && "opacity-60"
                  )}
                />
                {status === "error" && (
                  <span className="absolute -bottom-5 left-0 text-[11px] text-red-300">
                    Email to‘g‘ri kiriting
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={cn(
                  "group inline-flex h-14 items-center justify-center gap-2.5 rounded-xl px-7 text-sm font-semibold transition-all",
                  status === "success"
                    ? "bg-emerald-500 text-white"
                    : "bg-gold-400 text-charcoal-800 hover:bg-gold-300",
                  status === "loading" && "cursor-wait opacity-70"
                )}
              >
                {status === "loading" && (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal-800/30 border-t-charcoal-800" />
                    Yuborilmoqda...
                  </>
                )}
                {status === "success" && (
                  <>
                    <Check className="h-4 w-4" />
                    Rahmat!
                  </>
                )}
                {status !== "loading" && status !== "success" && (
                  <>
                    Obuna bo‘lish
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Small note */}
            <p className="mt-5 text-[11px] text-ivory-200/40">
              Obunani istalgan vaqtda bekor qilishingiz mumkin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
