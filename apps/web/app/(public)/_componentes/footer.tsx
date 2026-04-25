"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 md:py-24 border-t border-white/10">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 mb-16">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-white font-display text-2xl tracking-[0.2em] uppercase">
                Barberhub
              </span>
            </Link>
            <p className="text-white/40 font-sans text-sm max-w-xs">
              A plataforma definitiva para barbeiros modernos gerenciarem seus negócios.
            </p>
          </div>

          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-[1.4px] mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/60 font-sans text-sm hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 font-sans text-sm hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 font-sans text-sm hover:text-white transition-colors">
                  Showcase
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 font-sans text-sm hover:text-white transition-colors">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-[1.4px] mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/60 font-sans text-sm hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 font-sans text-sm hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 font-sans text-sm hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 font-sans text-sm hover:text-white transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-[1.4px] mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/60 font-sans text-sm hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 font-sans text-sm hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 font-sans text-sm hover:text-white transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-white/40 font-mono text-xs">
            © {currentYear} BarberHub. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-white/40 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.846 1.606 7.612-.812-.025-1.673-.315-2.261-.792v.052c0 2.084 1.482 3.819 3.561 4.206-.375.102-.775.156-1.183.156-.292 0-.576-.028-.846-.082.577 1.799 2.248 3.11 4.229 3.15-1.571 1.232-3.584 1.965-5.76 1.965-.374 0-.743-.022-1.107-.065 2.064 1.321 4.492 2.093 7.136 2.093 8.571 0 13.257-7.098 12.999-13.413-.095-.633-.149-1.29-.149-1.974z" />
              </svg>
            </Link>
            <Link href="#" className="text-white/40 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
            <Link href="#" className="text-white/40 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}