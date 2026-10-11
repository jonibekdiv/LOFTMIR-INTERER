import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "gold" | "new" | "sale" | "dark";
  className?: string;
}) {
  const styles = {
    default: "bg-forest-600 text-white",
    gold: "gradient-gold text-charcoal-900",
    new: "bg-emerald-600 text-white",
    sale: "bg-red-600 text-white",
    dark: "bg-charcoal-800 text-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
