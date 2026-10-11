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
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity hover:opacity-90",
        className
      )}
    >
      {/* Belgisi */}
      <span
        className={cn(
          "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-[1.5px] transition-all duration-500 group-hover:rotate-3",
          isLight
            ? "border-gold-400 bg-gold-400/5"
            : "border-forest-600 bg-forest-600/5"
        )}
      >
        <span
          className={cn(
            "font-serif text-2xl font-black leading-none",
            isLight ? "text-gold-400" : "text-forest-600"
          )}
        >
          L
        </span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold-400" />
      </span>

      {/* Matn */}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[17px] font-bold tracking-[0.16em] uppercase",
            isLight ? "text-ivory-100" : "text-charcoal-800"
          )}
        >
          Loftmir
        </span>
        <span
          className={cn(
            "mt-0.5 text-[10px] font-semibold tracking-[0.3em] lowercase",
            isLight ? "text-gold-400" : "text-gold-500"
          )}
        >
          interer
        </span>
      </span>
    </Link>
  );
}
