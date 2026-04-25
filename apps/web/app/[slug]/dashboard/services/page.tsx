import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockServices = [
  {
    id: "1",
    name: "Corte Masculino",
    category: "Cortes",
    price: 45,
    duration: 30,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b928a1?w=600&h=400&fit=crop",
    description: "Corte moderno com tesoura e máquina, incluindo lavagem.",
  },
  {
    id: "2",
    name: "Corte + Barba",
    category: "Cortes",
    price: 85,
    duration: 60,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop",
    description: "Combo completo: corte masculino + barba modelada profissional.",
  },
  {
    id: "3",
    name: "Barba Modelada",
    category: "Barba",
    price: 35,
    duration: 30,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=400&fit=crop",
    description: "Modelagem de barba com navalha e produtos premium.",
  },
  {
    id: "4",
    name: "Corte Degradê",
    category: "Cortes",
    price: 50,
    duration: 45,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=400&fit=crop",
    description: "Degradê perfeito com navalha e máquina, diversos tipos de fading.",
  },
  {
    id: "5",
    name: "Barba Raspada",
    category: "Barba",
    price: 25,
    duration: 20,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    description: "Barba raspada com toalha quente e navalha profissional.",
  },
  {
    id: "6",
    name: "Progressiva",
    category: "Tratamentos",
    price: 80,
    duration: 90,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop",
    description: "Tratamento capilar progressiva com produtos de alta qualidade.",
  },
  {
    id: "7",
    name: "Sobrancelha",
    category: "Barba",
    price: 25,
    duration: 15,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop",
    description: "Design de sobrancelha com pinça e navalha.",
  },
  {
    id: "8",
    name: "Corte Infantil",
    category: "Cortes",
    price: 30,
    duration: 25,
    isActive: false,
    imageUrl: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600&h=400&fit=crop",
    description: "Corte especial para crianças ambiente divertida.",
  },
  {
    id: "9",
    name: "Pacote Premium",
    category: "Pacotes",
    price: 150,
    duration: 120,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34cb?w=600&h=400&fit=crop",
    description: "Corte + Barba + Massagem facial + Tratamento capilar.",
  },
  {
    id: "10",
    name: "Massagem Facial",
    category: "Tratamentos",
    price: 60,
    duration: 30,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop",
    description: "Massagem facial relaxante com produtos premium.",
  },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const activeServices = mockServices.filter((s) => s.isActive);
  const inactiveServices = mockServices.filter((s) => !s.isActive);

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-8 md:py-12 px-4 md:px-6 border-b border-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div>
            <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500 mb-2">
              GESTÃO
            </p>
            <h1 className="font-display text-3xl md:text-6xl leading-none uppercase">
              SERVIÇOS
            </h1>
          </div>
          <Link href={`/${slug}/dashboard/services/new`} className="inline-flex">
            <Button className="bg-white text-black font-mono text-xs md:text-sm tracking-[1.4px] uppercase px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-gray-200 transition-colors w-full md:w-auto">
              NOVO SERVIÇO
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 overflow-x-auto no-scrollbar">
            <button className="bg-white text-black font-mono text-xs tracking-[1.4px] uppercase px-3 md:px-4 py-2 rounded-full whitespace-nowrap">
              TODOS ({mockServices.length})
            </button>
            <button className="bg-transparent border border-gray-700 text-white font-mono text-xs tracking-[1.4px] uppercase px-3 md:px-4 py-2 rounded-full hover:border-white whitespace-nowrap">
              ATIVOS ({activeServices.length})
            </button>
            <button className="bg-transparent border border-gray-700 text-white font-mono text-xs tracking-[1.4px] uppercase px-3 md:px-4 py-2 rounded-full hover:border-white whitespace-nowrap">
              INATIVOS ({inactiveServices.length})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {mockServices.map((service) => (
              <div
                key={service.id}
                className={`group relative bg-black border border-gray-800 hover:border-white/50 transition-all duration-500 overflow-hidden ${
                  !service.isActive ? "opacity-60" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {!service.isActive && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="font-mono text-xs tracking-[1.4px] uppercase px-4 py-2 border border-red-500 text-red-500">
                        INATIVO
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <span className="font-display text-2xl md:text-3xl text-white">
                      R$ {service.price}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="font-mono text-[10px] tracking-[1.4px] uppercase px-2 py-1 bg-white/20 text-white backdrop-blur-sm">
                      {service.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <h3 className="font-display text-xl md:text-2xl uppercase mb-2">
                    {service.name}
                  </h3>
                  <p className="font-mono text-xs text-gray-500 line-clamp-2 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[1.2px] uppercase text-gray-400">
                      {service.duration} MIN
                    </span>
                    <div className="flex gap-2">
                      <Link href={`/${slug}/dashboard/services/${service.id}/edit`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 font-mono text-[10px] md:text-xs tracking-[1.4px] uppercase"
                        >
                          EDITAR
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-500 font-mono text-[10px] md:text-xs tracking-[1.4px] uppercase hover:text-white"
                      >
                        {service.isActive ? "DESATIVAR" : "ATIVAR"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}