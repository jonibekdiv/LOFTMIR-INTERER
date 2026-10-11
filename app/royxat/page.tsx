import Link from "next/link";

export const metadata = { title: "Ro‘yxatdan o‘tish" };

export default function RegisterPage() {
  return (
    <div className="container-x flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-3xl border border-charcoal-200/60 bg-white p-8">
        <h1 className="price-display text-3xl text-charcoal-900">Ro‘yxatdan o‘tish</h1>
        <p className="mt-2 text-sm text-charcoal-500">Yangi hisob yarating</p>

        <form className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-charcoal-700">Ism</label>
            <input type="text" className="mt-2 h-12 w-full rounded-xl border border-charcoal-200 px-4 text-sm focus:border-forest-600 focus:outline-none" placeholder="Ismingiz" />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal-700">Telefon</label>
            <input type="tel" className="mt-2 h-12 w-full rounded-xl border border-charcoal-200 px-4 text-sm focus:border-forest-600 focus:outline-none" placeholder="+998 __ ___ __ __" />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal-700">Parol</label>
            <input type="password" className="mt-2 h-12 w-full rounded-xl border border-charcoal-200 px-4 text-sm focus:border-forest-600 focus:outline-none" placeholder="••••••••" />
          </div>
          <button className="h-12 w-full rounded-xl bg-forest-600 text-sm font-semibold text-white hover:bg-forest-700">
            Ro‘yxatdan o‘tish
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-charcoal-500">
          Hisobingiz bormi?{" "}
          <Link href="/kirish" className="font-semibold text-forest-600 hover:text-gold-500">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
}
