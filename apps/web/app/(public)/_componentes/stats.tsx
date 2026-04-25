"use client";

const stats = [
  { value: "10K+", label: "Barbeiros ativos" },
  { value: "500K+", label: "Clientes" },
  { value: "98%", label: "Satisfação" },
  { value: "50+", label: "Countries" },
];

export function Stats() {
  return (
    <section className="relative py-16 md:py-24 border-y border-white/10">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-white font-display text-4xl md:text-6xl lg:text-7xl uppercase mb-2">
                {stat.value}
              </p>
              <p className="text-white/60 font-mono text-xs uppercase tracking-[1.4px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
