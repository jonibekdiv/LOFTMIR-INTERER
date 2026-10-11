"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { categories as initial } from "@/lib/data/categories";
import type { Category } from "@/lib/types";

export type AdminCategory = Category & {
  status: "active" | "hidden";
  createdAt: string;
};

function normalize(): AdminCategory[] {
  const now = new Date().toISOString();
  return initial.map((c) => ({ ...c, status: "active", createdAt: now }));
}

type CategoriesState = {
  items: AdminCategory[];
  addCategory: (c: AdminCategory) => void;
  updateCategory: (id: string, patch: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;
  reset: () => void;
};

export const useCategoriesStore = create<CategoriesState>()(
  persist(
    (set) => ({
      items: normalize(),
      addCategory: (c) => set((s) => ({ items: [c, ...s.items] })),
      updateCategory: (id, patch) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        })),
      deleteCategory: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      reset: () => set({ items: normalize() }),
    }),
    { name: "loftmir-categories", version: 1 }
  )
);
