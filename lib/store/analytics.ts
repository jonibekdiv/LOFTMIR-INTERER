"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type DemoOrder = {
  id: string;
  number: string;
  customerName: string;
  customerPhone: string;
  total: number;
  status: OrderStatus;
  itemsCount: number;
  createdAt: string;
  note?: string;
};

export type DemoCustomer = {
  id: string;
  name: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  createdAt: string;
};

function genDemoOrders(): DemoOrder[] {
  const statuses: OrderStatus[] = [
    "pending", "confirmed", "processing", "shipped",
    "delivered", "delivered", "delivered", "cancelled",
  ];
  const names = [
    "Aziz Karimov", "Dilnoza Yusupova", "Bobur Toshmatov",
    "Malika Rahimova", "Sardor Aliyev", "Nilufar Saidova",
    "Jasur Bekmurodov", "Zulfiya Ismoilova", "Otabek Nazarov",
    "Shahzoda Xolova", "Kamron Ergashev", "Madina Umarova",
  ];
  const orders: DemoOrder[] = [];
  const now = Date.now();

  for (let i = 0; i < 45; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    orders.push({
      id: `order-${i + 1}`,
      number: `LM-2401${String(i + 1).padStart(4, "0")}`,
      customerName: names[Math.floor(Math.random() * names.length)],
      customerPhone: `+998 90 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
      total: Math.floor(500000 + Math.random() * 8000000),
      status,
      itemsCount: Math.floor(1 + Math.random() * 4),
      createdAt: new Date(now - daysAgo * 86400000 - Math.random() * 86400000).toISOString(),
    });
  }
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export const DEMO_ORDERS: DemoOrder[] = genDemoOrders();

export const DEMO_CUSTOMERS: DemoCustomer[] = [
  { id: "c1", name: "Aziz Karimov", phone: "+998 90 123 45 67", ordersCount: 8, totalSpent: 24500000, createdAt: "2024-01-15T10:00:00Z" },
  { id: "c2", name: "Dilnoza Yusupova", phone: "+998 90 234 56 78", ordersCount: 5, totalSpent: 15200000, createdAt: "2024-02-20T11:00:00Z" },
  { id: "c3", name: "Bobur Toshmatov", phone: "+998 90 345 67 89", ordersCount: 12, totalSpent: 38400000, createdAt: "2023-12-05T09:00:00Z" },
  { id: "c4", name: "Malika Rahimova", phone: "+998 90 456 78 90", ordersCount: 3, totalSpent: 8900000, createdAt: "2024-03-10T14:00:00Z" },
  { id: "c5", name: "Sardor Aliyev", phone: "+998 90 567 89 01", ordersCount: 7, totalSpent: 21100000, createdAt: "2024-01-25T16:00:00Z" },
  { id: "c6", name: "Nilufar Saidova", phone: "+998 90 678 90 12", ordersCount: 2, totalSpent: 5400000, createdAt: "2024-04-01T12:00:00Z" },
];

type AnalyticsState = {
  orders: DemoOrder[];
  customers: DemoCustomer[];
  addOrder: (o: DemoOrder) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateOrderNote: (id: string, note: string) => void;
  deleteOrder: (id: string) => void;
  resetOrders: () => void;
};

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set) => ({
      orders: DEMO_ORDERS,
      customers: DEMO_CUSTOMERS,

      addOrder: (o) => set((s) => ({ orders: [o, ...s.orders] })),

      updateOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id ? { ...o, status } : o
          ),
        })),

      updateOrderNote: (id, note) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id ? { ...o, note } : o
          ),
        })),

      deleteOrder: (id) =>
        set((s) => ({
          orders: s.orders.filter((o) => o.id !== id),
        })),

      resetOrders: () => set({ orders: DEMO_ORDERS }),
    }),
    { name: "loftmir-analytics", version: 2 }
  )
);
