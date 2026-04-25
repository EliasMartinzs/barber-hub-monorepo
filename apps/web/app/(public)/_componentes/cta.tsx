"use client";

import Link from "next/link";

export function CTA() {
  return (
    <section className="relative py-24 md:py-32 lg:py-48">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 text-center">
        <p className="text-white/60 font-mono text-xs uppercase tracking-[2px] mb-4">
          Prepare para começar
        </p>
        <h2 className="text-white font-display text-5xl md:text-8xl lg:text-[200px] uppercase leading-[0.9] mb-8 md:mb-12">
          Build
          <br />
          <span className="text-white/40">Your</span>
          <br />
          Empire
        </h2>

        <p className="text-white/80 font-sans text-lg md:text-2xl max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed">
          Junte-se a milhares de barbeiros que já transformaram seus negócios.
          Comece grÁtis hoje — sem cartão de crédito.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <Link
            href="/dashboard"
            className="group relative px-10 py-5 bg-white text-black font-mono text-sm uppercase tracking-[1.4px] rounded-[9999px] hover:opacity-90 transition-all"
          >
            <span className="relative z-10">Comece o teste gratuito</span>
            <div className="absolute inset-0 rounded-[9999px] bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="#features"
            className="px-10 py-5 text-white font-mono text-sm uppercase tracking-[1.4px] hover:opacity-60 transition-opacity"
          >
            Veja todas as novidades
          </Link>
        </div>
      </div>
    </section>
  );
}
