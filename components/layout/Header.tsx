"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Phone,
  ArrowRight,
  Sparkles,
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
];

export function Header() {
  const pathname = usePathname();
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

  /* Ctrl+K / Cmd+K qidiruv */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ═══════════ TOP ANNOUNCEMENT BAR ═══════════ */}
      <div className="hidden bg-charcoal-800 text-ivory-100 md:block">
        <div className="container-wide flex h-10 items-center justify-between text-[11px] tracking-wide">
          {/* Left — phone + info */}
          <div className="flex items-center gap-2.5 text-ivory-200/85">
            <Phone className="h-3 w-3 text-gold-400" />
            <a
              href="tel:+998200008770"
              className="price-text font-medium transition-colors hover:text-gold-400"
            >
              +998 20 000 87 70
            </a>
            <span className="text-ivory-200/25">·</span>
            <span className="text-ivory-200/65">
              Toshkent bo‘ylab bepul yetkazib berish
            </span>
          </div>

          {/* Right — hours + langs */}
          <div className="flex items-center gap-4 text-ivory-200/65">
            <span className="label-mono text-[10px]">Toshkent · 24/7</span>
            <span className="h-3 w-px bg-ivory-200/20" />
            <div className="flex items-center gap-0.5">
              {["UZ", "RU", "EN"].map((lang, i) => (
                <button
                  key={lang}
                  className={cn(
                    "rounded px-2 py-0.5 text-[10px] font-semibold tracking-wider transition-colors",
                    i === 0
                      ? "bg-gold-400/15 text-gold-400"
                      : "text-ivory-200/50 hover:text-gold-400"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ MAIN HEADER ═══════════ */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-500",
          scrolled
            ? "glass-light border-b border-charcoal-700/8 shadow-[0_2px_24px_-12px_rgba(32,37,34,0.15)]"
            : "border-b border-charcoal-700/6 bg-ivory-100"
        )}
      >
        <div className="container-wide">
          <div
            className={cn(
              "flex items-center justify-between gap-6 transition-[height] duration-500",
              scrolled ? "h-16" : "h-[70px] md:h-20"
            )}
          >
            {/* Logo */}
            <Logo />

            {/* ═══════════ DESKTOP NAV — pill shaped ═══════════ */}
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative rounded-full px-3.5 py-2 text-[13px] font-medium tracking-wide transition-all duration-300",
                      isActive
                        ? "bg-forest-600 text-ivory-100 shadow-[0_4px_16px_-4px_rgba(18,79,69,0.4)]"
                        : "text-charcoal-500 hover:bg-charcoal-700/5 hover:text-charcoal-800"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* ═══════════ ACTIONS ═══════════ */}
            <div className="flex items-center gap-1.5">
              {/* Search — desktop pill */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Qidirish"
                className="hidden items-center gap-2 rounded-full border border-charcoal-700/10 bg-white/50 py-2 pl-3.5 pr-2.5 text-xs text-charcoal-400 transition-all hover:border-forest-600/30 hover:bg-white/80 hover:text-forest-600 xl:flex"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="pr-3">Qidirish...</span>
                <kbd className="price-text rounded-md border border-charcoal-700/10 bg-ivory-100 px-1.5 py-0.5 text-[9px] font-semibold text-charcoal-400">
                  ⌘K
                </kbd>
              </button>

              {/* Search icon — mobile/tablet */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Qidirish"
                className="grid h-10 w-10 place-items-center rounded-full text-charcoal-500 transition-all hover:bg-charcoal-700/5 hover:text-forest-600 xl:hidden"
              >
                <Search className="h-[17px] w-[17px]" />
              </button>

              {/* Favorites */}
              <Link
                href="/sevimlilar"
                aria-label="Sevimlilar"
                className="relative hidden h-10 w-10 place-items-center rounded-full text-charcoal-500 transition-all hover:bg-charcoal-700/5 hover:text-forest-600 sm:grid"
              >
                <Heart className="h-[17px] w-[17px]" />
                {mounted && favCount > 0 && (
                  <span className="price-text absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-forest-600 px-1 text-[9px] font-bold text-ivory-100 ring-2 ring-ivory-100">
                    {favCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/kabinet"
                aria-label="Kabinet"
                className="hidden h-10 w-10 place-items-center rounded-full text-charcoal-500 transition-all hover:bg-charcoal-700/5 hover:text-forest-600 sm:grid"
              >
                <User className="h-[17px] w-[17px]" />
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                aria-label="Savat"
                className="relative grid h-10 w-10 place-items-center rounded-full text-charcoal-500 transition-all hover:bg-charcoal-700/5 hover:text-forest-600"
              >
                <ShoppingBag className="h-[17px] w-[17px]" />
                {mounted && cartCount > 0 && (
                  <span className="price-text absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-400 px-1 text-[9px] font-bold text-charcoal-800 ring-2 ring-ivory-100">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* CTA — desktop only */}
              <Link
                href="/maxsus-buyurtma"
                className="ml-1.5 hidden items-center gap-1.5 rounded-full bg-forest-600 px-4 py-2.5 text-[12px] font-semibold tracking-wide text-ivory-100 transition-all hover:bg-forest-700 hover:shadow-[0_8px_24px_-8px_rgba(18,79,69,0.5)] lg:flex"
              >
                <Sparkles className="h-3 w-3" />
                Maxsus buyurtma
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Menyu"
                className="ml-1 grid h-10 w-10 place-items-center rounded-full text-charcoal-500 transition-all hover:bg-charcoal-700/5 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════ MOBILE MENU ═══════════ */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-[visibility,opacity] duration-500",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-charcoal-800/60 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory-100 shadow-2xl transition-transform duration-500 ease-expo",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Mobile header */}
          <div className="flex h-16 items-center justify-between border-b border-charcoal-700/8 px-5">
            <Logo />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Yopish"
              className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-charcoal-700/5"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile nav */}
          <nav className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
            <span className="label-mono mb-4 text-charcoal-400">
              Menyu
            </span>
            <div className="flex flex-col gap-1">
              {NAV.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-4 py-4 transition-colors hover:bg-forest-600/5"
                  style={{
                    animation: mobileOpen
                      ? `fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms both`
                      : undefined,
                  }}
                >
                  <span className="font-serif text-xl font-semibold text-charcoal-800 group-hover:text-forest-600">
                    {item.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-charcoal-300 transition-transform group-hover:translate-x-1 group-hover:text-forest-600" />
                </Link>
              ))}

              <Link
                href="/maxsus-buyurtma"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-between rounded-xl bg-forest-600 px-4 py-4 text-ivory-100 transition-colors hover:bg-forest-700"
                style={{
                  animation: mobileOpen
                    ? `fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${NAV.length * 40}ms both`
                    : undefined,
                }}
              >
                <span className="flex items-center gap-2 font-serif text-xl font-semibold">
                  <Sparkles className="h-4 w-4" />
                  Maxsus buyurtma
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Contact card */}
            <div className="mt-auto pt-8">
              <div className="rounded-2xl border border-charcoal-700/8 bg-white/60 p-5">
                <p className="label-mono mb-2 text-charcoal-400">Aloqa</p>
                <a
                  href="tel:+998200008770"
                  className="price-text block text-base font-semibold text-charcoal-800 transition-colors hover:text-forest-600"
                >
                  +998 20 000 87 70
                </a>
                <p className="mt-1 text-xs text-charcoal-400">
                  Toshkent · 24/7
                </p>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
