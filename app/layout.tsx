import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = Inter({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LOFTMIR INTERER - Premium mebel va interyer",
    template: "%s . LOFTMIR INTERER",
  },
  description:
    "Zamonaviy interyer uchun premium mebel. Qolda yasalgan, tabiiy materiallardan. Toshkent boylab bepul yetkazib berish.",
  keywords: ["mebel", "interyer", "javon", "stol", "stul", "shkaf", "Toshkent", "LOFTMIR"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
