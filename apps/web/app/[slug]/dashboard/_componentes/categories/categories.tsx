"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  servicesCount: number;
  thumbnailUrl: string;
}

interface CategoriesProps {
  categories: Category[];
  slug: string;
}

export function Categories({ categories, slug }: CategoriesProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:mb-12 mb-8">
          <div>
            <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500 mb-2">
              CATÁLOGO
            </p>
            <h2 className="font-display text-3xl md:text-6xl leading-none uppercase">
              SERVIÇOS
            </h2>
          </div>
          <Link href={`/${slug}/dashboard/services`}>
            <Button
              className="bg-transparent border border-white text-white font-mono text-xs tracking-[1.4px] uppercase px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300 w-full md:w-auto"
            >
              VER TODOS
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-900">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-black group relative aspect-square overflow-hidden"
            >
              <img
                src={category.thumbnailUrl}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <h3 className="font-display text-lg md:text-2xl md:text-3xl uppercase tracking-wide text-center">
                  {category.name}
                </h3>
                <p className="font-mono text-[10px] md:text-xs tracking-[1.2px] uppercase text-gray-500 mt-1 md:mt-2">
                  {category.servicesCount} SERVIÇOS
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}