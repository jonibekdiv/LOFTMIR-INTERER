"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Heart, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/kabinet", label: "Profil", icon: User, exact: true },
  { href: "/kabinet/buyurtmalar", label: "Buyurtmalarim", icon: Package },
  { href: "/kabinet/sevimlilar", label: "Sevimlilar", icon: Heart },
  { href: "/kabinet/manzillar", label: "Manzillar", icon: MapPin },
];

export default function CabinetLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="price-display text-3xl text-graphite-900 md:text-4xl">
        Mijoz kabineti
      </h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {NAV.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-petrol-600 text-white shadow-[0_4px_20px_-6px_rgba(30,74,71,0.4)]"
                      : "bg-white text-graphite-700 border border-graphite-200/60 hover:border-petrol-600 hover:text-petrol-600"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  );
}
