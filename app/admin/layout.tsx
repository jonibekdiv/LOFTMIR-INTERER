"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FolderTree,
  Settings,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/mahsulotlar", label: "Mahsulotlar", icon: Package },
  { href: "/admin/buyurtmalar", label: "Buyurtmalar", icon: ShoppingBag },
  { href: "/admin/mijozlar", label: "Mijozlar", icon: Users },
  { href: "/admin/kategoriyalar", label: "Kategoriyalar", icon: FolderTree },
  { href: "/admin/maxsus-buyurtmalar", label: "Maxsus buyurtmalar", icon: MessageSquare },
  { href: "/admin/sozlamalar", label: "Sozlamalar", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [mounted, isAuthenticated, pathname, router]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  /* Login sahifasi alohida ko'rinadi */
  if (pathname === "/admin/login") return <>{children}</>;

  if (!mounted || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-graphite-900">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-gold-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-graphite-50">
      {/* Sidebar (desktop) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-graphite-900 text-white transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Logo variant="light" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-lg lg:hidden"
            aria-label="Yopish"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {NAV.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-gold-400 text-graphite-900"
                    : "text-graphite-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-medium text-graphite-400 hover:bg-white/5 hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Saytni ko‘rish
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-medium text-graphite-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            Chiqish
          </button>
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-graphite-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-graphite-200 bg-white px-4 md:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl hover:bg-graphite-100 lg:hidden"
            aria-label="Menyu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden lg:block">
            <h1 className="heading-display price-text text-lg font-bold text-graphite-900">
              {NAV.find((n) =>
                n.exact ? pathname === n.href : pathname.startsWith(n.href)
              )?.label ?? "Admin"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-xs font-semibold text-graphite-800">
                {user?.name}
              </p>
              <p className="text-[10px] text-graphite-500 capitalize">
                {user?.role}
              </p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-gold text-sm font-bold text-graphite-900">
              {user?.name?.charAt(0) ?? "A"}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
