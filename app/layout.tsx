import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const inter = Inter({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "LOFTMIR INTERER — Premium mebel va interyer",
    template: "%s · LOFTMIR INTERER",
  },
  description:
    "Zamonaviy interyer uchun premium mebel. Qo‘lda yasalgan, tabiiy materiallardan. Toshkent bo‘ylab bepul yetkazib berish.",
  keywords: ["mebel", "interyer", "javon", "stol", "stul", "shkaf", "Toshkent", "LOFTMIR"],
  openGraph: {
    title: "LOFTMIR INTERER",
    description: "Premium mebel va interyer mahsulotlari",
    type: "website",
    locale: "uz_UZ",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased">
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
