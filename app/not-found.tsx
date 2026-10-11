import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] items-center justify-center py-12">
      <div className="text-center">
        <p className="font-display text-[120px] font-black leading-none gradient-gold bg-clip-text text-transparent">
          404
        </p>
        <h1 className="mt-2 price-display text-3xl text-charcoal-900">
          Sahifa topilmadi
        </h1>
        <p className="mt-3 text-sm text-charcoal-500">
          Siz izlagan sahifa mavjud emas yoki ko‘chirilgan.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-forest-600 px-6 text-sm font-semibold text-white hover:bg-forest-700"
        >
          <Home className="h-4 w-4" />
          Bosh sahifaga qaytish
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
