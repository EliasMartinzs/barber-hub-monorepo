"use client";

interface StatsProps {
  stats: {
    todayAppointments: number;
    weeklyRevenue: number;
    totalClients: number;
    rating: number;
  };
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-900">
          <div className="bg-black p-4 md:p-8 md:p-12 group hover:bg-gray-900/30 transition-colors duration-300">
            <p className="font-mono text-[10px] md:text-xs tracking-[1.4px] uppercase text-gray-500 mb-1 md:mb-2">
              HOJE
            </p>
            <p className="font-display text-3xl md:text-5xl lg:text-7xl leading-none">
              {stats.todayAppointments}
            </p>
            <p className="font-mono text-[10px] md:text-xs tracking-[1.2px] uppercase text-gray-500 mt-1 md:mt-2">
              AGENDAMENTOS
            </p>
          </div>
          <div className="bg-black p-4 md:p-8 md:p-12 group hover:bg-gray-900/30 transition-colors duration-300">
            <p className="font-mono text-[10px] md:text-xs tracking-[1.4px] uppercase text-gray-500 mb-1 md:mb-2">
              SEMANA
            </p>
            <p className="font-display text-3xl md:text-5xl lg:text-7xl leading-none">
              R$ {stats.weeklyRevenue}
            </p>
            <p className="font-mono text-[10px] md:text-xs tracking-[1.2px] uppercase text-gray-500 mt-1 md:mt-2">
              FATURAMENTO
            </p>
          </div>
          <div className="bg-black p-4 md:p-8 md:p-12 group hover:bg-gray-900/30 transition-colors duration-300">
            <p className="font-mono text-[10px] md:text-xs tracking-[1.4px] uppercase text-gray-500 mb-1 md:mb-2">
              TOTAL
            </p>
            <p className="font-display text-3xl md:text-5xl lg:text-7xl leading-none">
              {stats.totalClients}
            </p>
            <p className="font-mono text-[10px] md:text-xs tracking-[1.2px] uppercase text-gray-500 mt-1 md:mt-2">
              CLIENTES
            </p>
          </div>
          <div className="bg-black p-4 md:p-8 md:p-12 group hover:bg-gray-900/30 transition-colors duration-300">
            <p className="font-mono text-[10px] md:text-xs tracking-[1.4px] uppercase text-gray-500 mb-1 md:mb-2">
              NOTA
            </p>
            <p className="font-display text-3xl md:text-5xl lg:text-7xl leading-none">
              {stats.rating}
              <span className="text-lg md:text-2xl lg:text-4xl text-gray-500">/5</span>
            </p>
            <p className="font-mono text-[10px] md:text-xs tracking-[1.2px] uppercase text-gray-500 mt-1 md:mt-2">
              AVALIAÇÃO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}