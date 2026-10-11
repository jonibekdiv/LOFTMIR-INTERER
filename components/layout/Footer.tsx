import Link from "next/link";
import { Instagram, Send, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const FOOTER_LINKS = {
  shop: [
    { href: "/mahsulotlar", label: "Barcha mahsulotlar" },
    { href: "/kategoriya/javonlar", label: "Javonlar" },
    { href: "/kategoriya/stollar", label: "Stollar" },
    { href: "/kategoriya/stullar", label: "Stullar" },
    { href: "/kategoriya/shkaflar", label: "Shkaflar" },
  ],
  help: [
    { href: "/yetkazib-berish", label: "Yetkazib berish" },
    { href: "/qaytarish", label: "Qaytarish (30 kun)" },
    { href: "/kafolat", label: "Kafolat (12 oy)" },
    { href: "/faq", label: "FAQ" },
    { href: "/aloqa", label: "Aloqa" },
  ],
  company: [
    { href: "/biz-haqimizda", label: "Biz haqimizda" },
    { href: "/maxsus-buyurtma", label: "Maxsus buyurtma" },
    { href: "/maxfiylik", label: "Maxfiylik siyosati" },
    { href: "/foydalanish", label: "Foydalanish shartlari" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-24 bg-charcoal-900 text-charcoal-300">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal-400">
              Premium mebel va interyer mahsulotlari. Toshkent boylab bepul yetkazib berish. 12 oy kafolat.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://instagram.com/ranger" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-charcoal-300 hover:bg-gold-400 hover:text-charcoal-900 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://t.me/rangerbek" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-charcoal-300 hover:bg-gold-400 hover:text-charcoal-900 transition-colors">
                <Send className="h-4 w-4" />
              </a>
              <a href="mailto:pubgkir40@gmail.com" aria-label="Email" className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-charcoal-300 hover:bg-gold-400 hover:text-charcoal-900 transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Dokon</h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.shop.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Yordam</h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.help.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Kompaniya</h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Aloqa</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a href="tel:+998200008770" className="hover:text-gold-400 transition-colors">+998 20 000 87 70</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>Toshkent, Ozbekiston</span>
              </li>
              <li className="text-charcoal-400">Dush-Yak . 24/7</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-charcoal-500">
            (c) 2024 LOFTMIR INTERER. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-xs text-charcoal-500">
            Premium mebel brendi uchun ishlab chiqilgan.
          </p>
        </div>
      </div>
    </footer>
  );
}
