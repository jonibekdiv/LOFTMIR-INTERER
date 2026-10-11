"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";
import { products as initialProducts } from "@/lib/data/products";

export type AdminProduct = Product & {
  status: "draft" | "published" | "archived";
  sku: string;
  costPrice?: number;
  createdAt: string;
  updatedAt: string;
};

function normalizeProducts(): AdminProduct[] {
  const now = new Date().toISOString();
  return initialProducts.map((p) => ({
    ...p,
    status: "published",
    sku: `LM-${p.id.toUpperCase()}`,
    costPrice: Math.round(p.price * 0.6),
    createdAt: now,
    updatedAt: now,
  }));
}

type ProductsState = {
  items: AdminProduct[];
  addProduct: (p: AdminProduct) => void;
  updateProduct: (id: string, patch: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  archiveProduct: (id: string) => void;
  reset: () => void;
};

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      items: normalizeProducts(),
      addProduct: (p) => set((s) => ({ items: [p, ...s.items] })),
      updateProduct: (id, patch) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id
              ? { ...i, ...patch, updatedAt: new Date().toISOString() }
              : i
          ),
        })),
      deleteProduct: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      archiveProduct: (id) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id
              ? { ...i, status: "archived" as const, updatedAt: new Date().toISOString() }
              : i
          ),
        })),
      reset: () => set({ items: normalizeProducts() }),
    }),
    { name: "loftmir-products" }
  )
);
