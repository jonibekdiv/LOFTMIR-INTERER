"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, LogIn, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { Logo } from "@/components/ui/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();
  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) router.replace("/admin");
  }, [isAuthenticated, router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const res = login(form.login, form.password);
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
    } else {
      setError(res.error ?? "Xatolik");
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-800 px-4">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(232,175,66,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(63,143,126,0.4) 0%, transparent 50%)",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo variant="light" />
        </div>

        <div className="rounded-3xl border border-ivory-200/10 bg-white/5 p-8 backdrop-blur-md">
          <div className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold-400/10">
              <Lock className="h-6 w-6 text-gold-400" />
            </div>
            <h1 className="mt-4 font-serif text-2xl font-bold text-ivory-200">
              Admin Panel
            </h1>
            <p className="mt-2 text-xs text-ivory-200/60">
              Faqat ruxsat berilgan foydalanuvchilar uchun
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-medium text-ivory-200/70">Login</label>
              <div className="relative mt-2">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory-200/40" />
                <input
                  type="text"
                  value={form.login}
                  onChange={(e) => setForm({ ...form, login: e.target.value })}
                  placeholder="admin"
                  required
                  className="h-12 w-full rounded-xl border border-ivory-200/10 bg-white/5 pl-11 pr-4 text-sm text-ivory-200 placeholder:text-ivory-200/30 focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-ivory-200/70">Parol</label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory-200/40" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="h-12 w-full rounded-xl border border-ivory-200/10 bg-white/5 pl-11 pr-4 text-sm text-ivory-200 placeholder:text-ivory-200/30 focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold-400 text-sm font-semibold text-charcoal-800 transition-all hover:bg-gold-300 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal-800/30 border-t-charcoal-800" />
                  Tekshirilmoqda...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Kirish
                </>
              )}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-ivory-200/10 bg-white/5 p-3 text-center">
            <p className="text-[10px] text-ivory-200/40">Demo login:</p>
            <p className="price-text mt-1 text-xs text-gold-400">admin / loftmir2024</p>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] text-ivory-200/40">
          © 2024 LOFTMIR INTERER · Admin Panel v1.0
        </p>
      </div>
    </div>
  );
}
