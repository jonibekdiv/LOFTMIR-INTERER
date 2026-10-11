"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="container-x py-20 md:py-28">
      <div className="relative overflow-hidden rounded-3xl gradient-petrol p-10 text-white md:p-16">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-petrol-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            Yangiliklar
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
            Yangi kolleksiyalardan birinchi bolib xabardor boling
          </h2>
          <p className="mt-4 text-sm text-graphite-200">
            Chegirmalar, yangi mahsulotlar va maxsus takliflar haqida email orqali xabar yuboramiz.
          </p>

          {!done ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setDone(true);
              }}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="h-13 flex-1 rounded-xl border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-graphite-300 backdrop-blur-sm focus:border-gold-400 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl gradient-gold px-6 text-sm font-semibold text-graphite-900 transition-transform hover:scale-[1.02]"
              >
                <Send className="h-4 w-4" />
                Obuna bolish
              </button>
            </form>
          ) : (
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-xl border border-gold-400/40 bg-gold-400/10 px-6 py-4 text-sm text-gold-200">
              <Check className="h-5 w-5 text-gold-400" />
              Rahmat! Tez orada xabar yuboramiz.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
