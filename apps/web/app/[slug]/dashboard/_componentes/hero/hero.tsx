"use client";

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] md:h-[70vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

      <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl">
        <p className="font-mono text-xs md:text-sm tracking-[1.4px] uppercase text-gray-400 mb-3 md:mb-4">
          PAINEL DE CONTROLE
        </p>
        <h1 className="font-display text-[clamp(2.5rem,10vw,10rem)] leading-[0.9] uppercase tracking-0 mb-6 md:mb-8">
          BARBER<span className="text-gray-500">HUB</span>
        </h1>
        <p className="font-mono text-xs md:text-sm tracking-[1.4px] uppercase text-gray-400 max-w-xl mx-auto">
          SUA BARBEARIA, SEU IMPÉRIO
        </p>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-20 md:w-32 h-px bg-white/20" />
    </section>
  );
}