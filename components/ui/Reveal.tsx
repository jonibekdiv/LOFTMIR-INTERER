"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Animatsiya turi */
  animation?: "fade-up" | "fade" | "fade-left" | "fade-right" | "scale" | "blur";
  /** Kechikish (sekund) */
  delay?: number;
  /** Davomiylik (sekund) */
  duration?: number;
  /** Boshlanish nuqtasi: "top 85%" */
  start?: string;
  /** className */
  className?: string;
  /** Har bir element ketma-ket */
  stagger?: number;
  /** Child elementlar uchun (stagger) */
  staggerTarget?: string;
  as?: "div" | "section" | "article";
};

export function Reveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 1,
  start = "top 85%",
  className,
  stagger,
  staggerTarget,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const el = ref.current!;
      const target = staggerTarget ? el.querySelectorAll(staggerTarget) : el;

      const fromVars: gsap.TweenVars = { opacity: 0 };
      const toVars: gsap.TweenVars = {
        opacity: 1,
        duration,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      };

      switch (animation) {
        case "fade-up":
          fromVars.y = 50;
          toVars.y = 0;
          break;
        case "fade":
          break;
        case "fade-left":
          fromVars.x = -60;
          toVars.x = 0;
          break;
        case "fade-right":
          fromVars.x = 60;
          toVars.x = 0;
          break;
        case "scale":
          fromVars.scale = 0.92;
          toVars.scale = 1;
          break;
        case "blur":
          fromVars.filter = "blur(12px)";
          toVars.filter = "blur(0px)";
          break;
      }

      if (stagger && staggerTarget) {
        toVars.stagger = stagger;
      }

      gsap.fromTo(target, fromVars, toVars);
    }, ref);

    return () => ctx.revert();
  }, [animation, delay, duration, start, stagger, staggerTarget]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
