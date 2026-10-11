"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Phone,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SearchModal } from "@/components/search/SearchModal";
import { useCartStore } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/mahsulotlar", label: "Mahsulotlar" },
  { href: "/kategoriya/javonlar", label: "Javonlar" },
  { href: "/kategoriya/stollar", label: "Stollar" },
  { href: "/kategoriya/stullar", label: "Stullar" },
  { href: "/kategoriya/shkaflar", label: "Shkaflar" },
  { href: "/maxsus-buyurtma", label: "Maxsus buyurtma" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const openCart = useCartStore((s) => s.openCart);
  const cartCount = useCartStore((s) => s.totalCount());
  const favCount = useFavoritesStore((s) => s.items.length);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Global qidiruv shortcut: Ctrl+K yoki Cmd+K */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div className="hidden bg-graphite-800 text-white md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-graphite-200">
            <Phone className="h-3.5 w-3.5 text-gold-400" />
            <span>+998 20 000 87 70</span>
            <span className="text-graphite-500">.</span>
            <span>Toshkent boylab bepul yetkazib berish</span>
          </div>
          <div className="flex items-center gap-4 text-graphite-300">
            <span>Toshkent . 24/7</span>
            <span className="text-graphite-500">|</span>
            <button className="hover:text-gold-400 transition-colors">UZ</button>
            <button className="text-graphite-500 hover:text-gold-400 transition-colors">RU</button>
            <button className="text-graphite-500 hover:text-gold-400 transition-colors">EN</button>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled ? "glass border-b border-graphite-200/60 shadow-soft" : "bg-cream"
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium text-graphite-700 transition-colors hover:text-petrol-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {/* Qidiruv */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Qidirish"
              className="hidden items-center gap-2 rounded-xl border border-graphite-200 bg-white px-3 py-2 text-xs text-graphite-500 transition-all hover:border-petrol-600 hover:text-petrol-600 md:flex"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Qidirish...</span>
              <span className="ml-2 rounded border border-graphite-200 bg-graphite-50 px-1.5 py-0.5 font-mono text-[10px]">
                ⌘K
              </span>
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Qidirish"
              className="grid h-10 w-10 place-items-center rounded-xl text-graphite-700 transition-colors hover:bg-graphite-100 md:hidden"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            {/* Sevimlilar */}
            <Link
              href="/sevimlilar"
              aria-label="Sevimlilar"
              className="relative hidden sm:grid h-10 w-10 place-items-center rounded-xl text-graphite-700 transition-colors hover:bg-graphite-100"
            >
              <Heart className="h-[18px] w-[18px]" />
              {mounted && favCount > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {favCount}
                </span>
              )}
            </Link>

            {/* Kabinet */}
            <Link
              href="/kabinet"
              aria-label="Kabinet"
              className="hidden sm:grid h-10 w-10 place-items-center rounded-xl text-graphite-700 transition-colors hover:bg-graphite-100"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>

            {/* Savat */}
            <button
              onClick={openCart}
              aria-label="Savat"
              className="relative grid h-10 w-10 place-items-center rounded-xl text-graphite-700 transition-colors hover:bg-graphite-100"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {mounted && cartCount > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold-400 px-1 text-[10px] font-bold text-graphite-900">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobil menyu */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menyu"
              className="ml-1 grid h-10 w-10 place-items-center rounded-xl text-graphite-700 hover:bg-graphite-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobil menyu */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-all duration-300",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-graphite-900/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[88%] max-w-sm bg-cream shadow-2xl transition-transform duration-500",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <Logo />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Yopish"
              className="grid h-10 w-10 place-items-center rounded-xl hover:bg-graphite-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-3 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3.5 text-base font-medium text-graphite-800 hover:bg-petrol-600/5 hover:text-petrol-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Qidiruv modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
