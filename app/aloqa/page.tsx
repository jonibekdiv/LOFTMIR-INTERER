import { Phone, Mail, MapPin, Instagram, Send, Clock } from "lucide-react";

export const metadata = { title: "Aloqa" };

export default function ContactPage() {
  const items = [
    { icon: Phone, label: "Telefon", value: "+998 20 000 87 70", href: "tel:+998200008770" },
    { icon: Send, label: "Telegram", value: "@rangerbek", href: "https://t.me/rangerbek" },
    { icon: Instagram, label: "Instagram", value: "@ranger", href: "https://instagram.com/ranger" },
    { icon: Mail, label: "Email", value: "pubgkir40@gmail.com", href: "mailto:pubgkir40@gmail.com" },
    { icon: MapPin, label: "Manzil", value: "Toshkent, O‘zbekiston" },
    { icon: Clock, label: "Ish vaqti", value: "Dush–Yak · 24/7" },
  ];

  return (
    <div className="container-x py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">Aloqa</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-graphite-900 md:text-5xl">
          Biz bilan bog‘laning
        </h1>
        <p className="mt-4 text-sm text-graphite-500">
          Savollaringiz bormi? 24/7 aloqadamiz.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => {
          const Wrapper = it.href ? "a" : "div";
          return (
            <Wrapper
              key={it.label}
              {...(it.href ? { href: it.href } : {})}
              className="group rounded-2xl border border-graphite-200/60 bg-white p-5 transition-all hover:border-petrol-600/60 hover:shadow-soft"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-petrol-600/5 text-petrol-600">
                <it.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-wider text-graphite-500">
                {it.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-graphite-800 group-hover:text-petrol-600">
                {it.value}
              </p>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
