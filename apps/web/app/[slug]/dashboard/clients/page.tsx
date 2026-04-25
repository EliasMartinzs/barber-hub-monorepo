import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockClients = [
  {
    id: "1",
    name: "Carlos Eduardo",
    phone: "(11) 99999-9999",
    email: "carlos@email.com",
    totalVisits: 12,
    lastVisit: "2026-04-15",
    totalSpent: 1240,
  },
  {
    id: "2",
    name: "Rafael Silva",
    phone: "(11) 98888-8888",
    email: "rafael@email.com",
    totalVisits: 8,
    lastVisit: "2026-04-14",
    totalSpent: 680,
  },
  {
    id: "3",
    name: "Bruno Santos",
    phone: "(11) 97777-7777",
    email: "bruno@email.com",
    totalVisits: 15,
    lastVisit: "2026-04-16",
    totalSpent: 1520,
  },
  {
    id: "4",
    name: "Lucas Oliveira",
    phone: "(11) 96666-6666",
    email: "lucas@email.com",
    totalVisits: 5,
    lastVisit: "2026-04-10",
    totalSpent: 390,
  },
  {
    id: "5",
    name: "Mateus Costa",
    phone: "(11) 95555-5555",
    email: "mateus@email.com",
    totalVisits: 3,
    lastVisit: "2026-04-05",
    totalSpent: 180,
  },
  {
    id: "6",
    name: "Thiago Ferreira",
    phone: "(11) 94444-4444",
    email: "thiago@email.com",
    totalVisits: 20,
    lastVisit: "2026-04-16",
    totalSpent: 2100,
  },
  {
    id: "7",
    name: "Ana Paula",
    phone: "(11) 93333-3333",
    email: "ana@email.com",
    totalVisits: 7,
    lastVisit: "2026-04-12",
    totalSpent: 520,
  },
  {
    id: "8",
    name: "Marcos Vinícius",
    phone: "(22) 98888-7777",
    email: "marcos@email.com",
    totalVisits: 2,
    lastVisit: "2026-04-01",
    totalSpent: 90,
  },
];

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-12 px-6 border-b border-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500 mb-2">
              GESTÃO
            </p>
            <h1 className="font-display text-4xl md:text-6xl leading-none uppercase">
              CLIENTES
            </h1>
          </div>
          <Link
            href={`/${slug}/dashboard/clients/new`}
            className="inline-flex"
          >
            <Button className="bg-white text-black font-mono text-sm tracking-[1.4px] uppercase px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
              NOVO CLIENTE
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar cliente por nome ou telefone..."
              className="w-full md:w-96 bg-black border border-gray-800 text-white font-mono text-sm px-4 py-3 focus:border-white focus:outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockClients.map((client) => (
              <div
                key={client.id}
                className="bg-black border border-gray-800 p-6 hover:border-white/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl uppercase mb-1">
                      {client.name}
                    </h3>
                    <p className="font-mono text-sm text-gray-500 uppercase">
                      {client.phone}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="font-display text-lg">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <p className="font-display text-2xl">{client.totalVisits}</p>
                    <p className="font-mono text-xs tracking-[1.2px] uppercase text-gray-500">
                      VISITAS
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-2xl">{client.totalSpent}</p>
                    <p className="font-mono text-xs tracking-[1.2px] uppercase text-gray-500">
                      GASTO
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-lg">{client.lastVisit}</p>
                    <p className="font-mono text-xs tracking-[1.2px] uppercase text-gray-500">
                      ÚLTIMA
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-white text-black font-mono text-xs tracking-[1.4px] uppercase hover:bg-gray-200"
                  >
                    AGENDAR
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 font-mono text-xs tracking-[1.4px] uppercase"
                  >
                    EDITAR
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              <button className="w-10 h-10 border border-gray-800 flex items-center justify-center font-mono text-xs text-gray-500 hover:border-white hover:text-white transition-colors">
                ‹
              </button>
              <button className="w-10 h-10 bg-white text-black flex items-center justify-center font-mono text-xs">
                1
              </button>
              <button className="w-10 h-10 border border-gray-800 flex items-center justify-center font-mono text-xs text-gray-500 hover:border-white hover:text-white transition-colors">
                2
              </button>
              <button className="w-10 h-10 border border-gray-800 flex items-center justify-center font-mono text-xs text-gray-500 hover:border-white hover:text-white transition-colors">
                ›
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}