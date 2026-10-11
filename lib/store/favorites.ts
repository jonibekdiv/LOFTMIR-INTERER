"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavoriteItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  addedAt: string;
};

type FavoritesState = {
  items: FavoriteItem[];
  has: (productId: string) => boolean;
  toggle: (item: Omit<FavoriteItem, "addedAt">) => void;
  add: (item: Omit<FavoriteItem, "addedAt">) => void;
  remove: (productId: string) => void;
  clear: () => void;
  count: () => number;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      has: (productId) => get().items.some((i) => i.productId === productId),

      add: (item) => {
        if (get().items.some((i) => i.productId === item.productId)) return;
        set((s) => ({
          items: [
            { ...item, addedAt: new Date().toISOString() },
            ...s.items,
          ],
        }));
      },

      remove: (productId) =>
        set((s) => ({
          items: s.items.filter((i) => i.productId !== productId),
        })),

      toggle: (item) => {
        const exists = get().items.some((i) => i.productId === item.productId);
        if (exists) {
          get().remove(item.productId);
        } else {
          get().add(item);
        }
      },

      clear: () => set({ items: [] }),

      count: () => get().items.length,
    }),
    { name: "loftmir-favorites", version: 1 }
  )
);
