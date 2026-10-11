"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderCustomer = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
};

export type OrderAddress = {
  city: string;
  district: string;
  street: string;
  building: string;
  apartment?: string;
  comment?: string;
};

export type OrderPayment = "cash" | "card_on_delivery";

export type CompletedOrder = {
  id: string;
  number: string;
  createdAt: string;
  customer: OrderCustomer;
  address: OrderAddress;
  payment: OrderPayment;
  items: Array<{
    productId: string;
    slug: string;
    name: string;
    image: string;
    price: number;
    color?: string;
    quantity: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered";
};

type CheckoutState = {
  customer: OrderCustomer;
  address: OrderAddress;
  payment: OrderPayment;
  setCustomer: (c: Partial<OrderCustomer>) => void;
  setAddress: (a: Partial<OrderAddress>) => void;
  setPayment: (p: OrderPayment) => void;
  reset: () => void;
};

const initialCustomer: OrderCustomer = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

const initialAddress: OrderAddress = {
  city: "Toshkent",
  district: "",
  street: "",
  building: "",
  apartment: "",
  comment: "",
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      customer: initialCustomer,
      address: initialAddress,
      payment: "cash",
      setCustomer: (c) =>
        set((s) => ({ customer: { ...s.customer, ...c } })),
      setAddress: (a) => set((s) => ({ address: { ...s.address, ...a } })),
      setPayment: (p) => set({ payment: p }),
      reset: () =>
        set({
          customer: initialCustomer,
          address: initialAddress,
          payment: "cash",
        }),
    }),
    { name: "loftmir-checkout" }
  )
);

/* Saqlangan buyurtmalar — localStorage */
export const ORDERS_KEY = "loftmir-orders";

export function loadOrders(): CompletedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveOrder(order: CompletedOrder) {
  if (typeof window === "undefined") return;
  const orders = loadOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function findOrderByNumber(num: string): CompletedOrder | undefined {
  return loadOrders().find((o) => o.number === num);
}

export function generateOrderNumber(): string {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `LM-${yy}${mm}${dd}-${rand}`;
}
