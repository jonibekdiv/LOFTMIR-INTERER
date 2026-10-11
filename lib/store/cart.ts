"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color?: string;
  quantity: number;
  maxStock: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, color?: string, quantity?: number) => void;
  addItemLite: (item: Partial<CartItem> & { productId: string; slug: string; name: string; image: string; price: number }, color?: string, quantity?: number) => void;
  removeItem: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, color: string | undefined, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalCount: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, color, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === product.id && i.color === color
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id && i.color === color
                  ? { ...i, quantity: Math.min(i.quantity + quantity, i.maxStock) }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name.uz,
                image: product.images[0],
                price: product.price,
                color,
                quantity,
                maxStock: product.stockCount,
              },
            ],
            isOpen: true,
          };
        });
      },

      addItemLite: (item, color, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.color === color
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.color === color
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: item.productId,
                slug: item.slug,
                name: item.name,
                image: item.image,
                price: item.price,
                color,
                quantity,
                maxStock: item.maxStock ?? 99,
              },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (productId, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.color === color)
          ),
        }));
      },

      updateQuantity: (productId, color, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.color === color
              ? { ...i, quantity: Math.max(1, Math.min(quantity, i.maxStock)) }
              : i
          ),
        }));
      },

      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "loftmir-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
