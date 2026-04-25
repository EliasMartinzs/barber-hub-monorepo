"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-white font-mono text-sm uppercase tracking-[1.4px] hover:opacity-75 transition-opacity"
        >
          Menu
        </Link>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="text-white font-display text-xl md:text-2xl tracking-[0.2em] uppercase">
            Barberhub
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="#features"
            className="text-white font-mono text-sm uppercase tracking-[1.4px] hover:opacity-75 transition-opacity hidden md:block"
          >
            Features
          </Link>
          <Link
            href="#showcase"
            className="text-white font-mono text-sm uppercase tracking-[1.4px] hover:opacity-75 transition-opacity hidden md:block"
          >
            Showcase
          </Link>
          <Link
            href="/sign-in"
            className="text-white font-mono text-sm uppercase tracking-[1.4px] hover:opacity-75 transition-opacity"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="bg-white text-black px-6 py-3 font-mono text-sm uppercase tracking-[1.4px] hover:opacity-90 transition-opacity rounded-[9999px]"
          >
            Comece
          </Link>
        </div>
      </div>
    </nav>
  );
}
