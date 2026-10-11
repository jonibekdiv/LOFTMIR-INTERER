"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type ParallaxProps = {
  children: ReactNode;
  /** Tezlik: -100 (yuqoriga), 100 (pastga) */
  speed?: number;
  /** Boshlanish trigger */
  start?: string;
  /** Tugash trigger */
  end?: string;
  /** className */
  className?: string;
};

export function Parallax({
  children,
  speed = -80,
  start = "top bottom",
  end = "bottom top",
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: -speed },
        {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: 0.8,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [speed, start, end]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
