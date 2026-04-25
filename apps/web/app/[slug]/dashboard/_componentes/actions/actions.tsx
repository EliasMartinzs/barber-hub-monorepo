"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ActionsProps {
  slug: string;
}

export function Actions({ slug }: ActionsProps) {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500 mb-2">
          AÇÕES
        </p>
        <h2 className="font-display text-3xl md:text-6xl leading-none uppercase mb-8 md:mb-12">
          ATALHOS
        </h2>

        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          <Link href={`/${slug}/dashboard/appointments/new`}>
            <Button className="bg-transparent border border-white text-white font-mono text-xs tracking-[1.4px] uppercase px-4 md:px-8 py-3 md:py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 w-full md:w-auto">
              NOVO AGENDAMENTO
            </Button>
          </Link>
          <Link href={`/${slug}/dashboard/clients/new`}>
            <Button className="bg-transparent border border-gray-700 text-white font-mono text-xs tracking-[1.4px] uppercase px-4 md:px-8 py-3 md:py-4 rounded-full hover:border-white transition-all duration-300 w-full md:w-auto">
              CADASTRAR CLIENTE
            </Button>
          </Link>
          <Link href={`/${slug}/dashboard/services/new`}>
            <Button className="bg-transparent border border-gray-700 text-white font-mono text-xs tracking-[1.4px] uppercase px-4 md:px-8 py-3 md:py-4 rounded-full hover:border-white transition-all duration-300 w-full md:w-auto">
              ADICIONAR SERVIÇO
            </Button>
          </Link>
          <Button className="bg-transparent border border-gray-700 text-white font-mono text-xs tracking-[1.4px] uppercase px-4 md:px-8 py-3 md:py-4 rounded-full hover:border-white transition-all duration-300 w-full md:w-auto">
            GERAR RELATÓRIO
          </Button>
        </div>
      </div>
    </section>
  );
}