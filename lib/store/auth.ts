"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/* Demo login ma'lumotlari - keyin o'zgartirasiz */
export const ADMIN_CREDENTIALS = {
  login: "admin",
  password: "loftmir2024",
};

export type AdminUser = {
  login: string;
  name: string;
  role: "owner" | "admin" | "manager";
};

type AuthState = {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (login: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (login, password) => {
        if (
          login.trim() === ADMIN_CREDENTIALS.login &&
          password === ADMIN_CREDENTIALS.password
        ) {
          set({
            user: {
              login: ADMIN_CREDENTIALS.login,
              name: "Administrator",
              role: "owner",
            },
            isAuthenticated: true,
          });
          return { ok: true };
        }
        return { ok: false, error: "Login yoki parol noto'g'ri" };
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "loftmir-admin-auth" }
  )
);
