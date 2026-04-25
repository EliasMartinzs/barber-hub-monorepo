"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23000'/%3E%3C/svg%3E"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-barber-cutting-hair-in-salon-41238-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-[1720px]">
        <p className="text-white/60 font-mono text-xs md:text-sm uppercase tracking-[2px] mb-6 md:mb-8 animate-fade-in">
          O futuro do negócio de barbearias
        </p>

        <h1 className="text-white font-display text-[48px] md:text-[120px] lg:text-[180px] xl:text-[240px] leading-[0.9] uppercase tracking-[-2px] md:tracking-[-4px] mb-6 md:mb-8">
          Domine
          <br />
          <span className="md:ml-8 lg:ml-16">Sua</span>
          <br />
          <span className="text-white/80">Arte</span>
        </h1>

        <p className="text-white/80 font-sans text-lg md:text-2xl max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
          A plataforma completa para gerenciar sua barbearia. Agendamentos,
          clientes, cortes e muito mais — tudo em um só lugar.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <Link
            href="/sign-up"
            className="group relative px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-[1.4px] rounded-[9999px] hover:opacity-90 transition-all"
          >
            <span className="relative z-10">Comece o teste gratuito</span>
          </Link>

          <Link
            href="#showcase"
            className="px-8 py-4 border border-white/30 text-white font-mono text-sm uppercase tracking-[1.4px] rounded-[9999px] hover:border-white transition-all"
          >
            Veja em ação
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
