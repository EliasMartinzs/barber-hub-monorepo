"use client";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500 mb-2">
            MAIS VENDIDOS
          </p>
          <h2 className="font-display text-3xl md:text-6xl leading-none uppercase">
            PRINCIPAIS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-900">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-black p-4 md:p-8 hover:bg-gray-900/30 transition-colors duration-300"
            >
              <div className="flex justify-between items-start mb-2 md:mb-4">
                <h3 className="font-display text-lg md:text-xl uppercase">{service.name}</h3>
                <span className="font-mono text-base md:text-lg tracking-wide">
                  R$ {service.price}
                </span>
              </div>
              <p className="font-mono text-xs tracking-[1.2px] uppercase text-gray-500">
                {service.duration} MIN
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}