import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Narxni so'mda formatlash.
 * Har doim bir xil natija beradi va chiroyli ko'rinadi.
 */
export function formatUZS(amount: number): string {
  const rounded = Math.round(amount);
  const str = String(rounded);
  const parts: string[] = [];
  let rest = str;
  while (rest.length > 3) {
    parts.unshift(rest.slice(-3));
    rest = rest.slice(0, -3);
  }
  parts.unshift(rest);
  return parts.join(" ") + " so'm";
}

/**
 * Faqat raqam qismi (so'msiz) - kartochkalar uchun.
 */
export function formatNumber(amount: number): string {
  const rounded = Math.round(amount);
  const str = String(rounded);
  const parts: string[] = [];
  let rest = str;
  while (rest.length > 3) {
    parts.unshift(rest.slice(-3));
    rest = rest.slice(0, -3);
  }
  parts.unshift(rest);
  return parts.join(" ");
}
