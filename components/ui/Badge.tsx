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
    default: "bg-petrol-600 text-white",
    gold: "gradient-gold text-graphite-900",
    new: "bg-emerald-600 text-white",
    sale: "bg-red-600 text-white",
    dark: "bg-graphite-800 text-white",
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
