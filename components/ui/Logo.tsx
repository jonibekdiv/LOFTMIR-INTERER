import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const isLight = variant === "light";
  return (
    <Link
      href="/"
      aria-label="LOFTMIR INTERER"
      className={cn("group inline-flex items-center gap-3 transition-opacity hover:opacity-90", className)}
    >
      <span
        className={cn(
          "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-500 group-hover:rotate-3",
          isLight ? "border-gold-400 bg-white/5" : "border-petrol-600 bg-petrol-600/5"
        )}
      >
        <span
          className={cn(
            "font-display text-2xl font-black leading-none",
            isLight ? "text-gold-400" : "text-petrol-600"
          )}
        >
          L
        </span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold-400" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[17px] font-bold tracking-[0.18em] uppercase",
            isLight ? "text-white" : "text-graphite-800"
          )}
        >
          Loftmir
        </span>
        <span
          className={cn(
            "mt-0.5 text-[11px] font-medium tracking-[0.32em] lowercase",
            isLight ? "text-gold-400" : "text-gold-500"
          )}
        >
          interer
        </span>
      </span>
    </Link>
  );
}
