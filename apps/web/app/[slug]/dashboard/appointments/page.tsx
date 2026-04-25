import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockAppointments: Array<{
  id: string;
  client: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  price: number;
  status: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELED" | "NO_SHOW";
}> = [
  {
    id: "1",
    client: "Carlos Eduardo",
    service: "Corte Masculino + Barba",
    barber: "João Silva",
    date: "2026-04-16",
    time: "09:00",
    price: 85,
    status: "COMPLETED" as const,
  },
  {
    id: "2",
    client: "Rafael Silva",
    service: "Corte Degradê",
    barber: "João Silva",
    date: "2026-04-16",
    time: "10:30",
    price: 45,
    status: "CONFIRMED" as const,
  },
  {
    id: "3",
    client: "Bruno Santos",
    service: "Barba Modelada",
    barber: "Pedro Santos",
    date: "2026-04-16",
    time: "11:30",
    price: 35,
    status: "SCHEDULED" as const,
  },
  {
    id: "4",
    client: "Lucas Oliveira",
    service: "Corte + Barba + Progressiva",
    barber: "João Silva",
    date: "2026-04-16",
    time: "14:00",
    price: 150,
    status: "SCHEDULED" as const,
  },
  {
    id: "5",
    client: "Mateus Costa",
    service: "Corte Infantil",
    barber: "Pedro Santos",
    date: "2026-04-17",
    time: "15:30",
    price: 30,
    status: "SCHEDULED" as const,
  },
  {
    id: "6",
    client: "Thiago Ferreira",
    service: "Sobrancelha",
    barber: "João Silva",
    date: "2026-04-17",
    time: "16:30",
    price: 25,
    status: "SCHEDULED" as const,
  },
  {
    id: "7",
    client: "Ana Paula",
    service: "Corte Feminino",
    barber: "Pedro Santos",
    date: "2026-04-18",
    time: "10:00",
    price: 60,
    status: "SCHEDULED" as const,
  },
  {
    id: "8",
    client: "Marcos Vinícius",
    service: "Barba Raspada",
    barber: "João Silva",
    date: "2026-04-18",
    time: "11:00",
    price: 30,
    status: "CANCELED" as const,
  },
];

export default async function AppointmentsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const statusColors: Record<string, string> = {
    SCHEDULED: "text-gray-400 border-gray-700",
    CONFIRMED: "text-white border-white",
    COMPLETED: "text-green-400 border-green-400",
    CANCELED: "text-red-400 border-red-400",
    NO_SHOW: "text-yellow-400 border-yellow-400",
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-12 px-6 border-b border-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500 mb-2">
              GESTÃO
            </p>
            <h1 className="font-display text-4xl md:text-6xl leading-none uppercase">
              AGENDAMENTOS
            </h1>
          </div>
          <Link
            href={`/${slug}/dashboard/appointments/new`}
            className="inline-flex"
          >
            <Button className="bg-white text-black font-mono text-sm tracking-[1.4px] uppercase px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
              NOVO AGENDAMENTO
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar">
            <button className="bg-white text-black font-mono text-xs tracking-[1.4px] uppercase px-4 py-2 rounded-full whitespace-nowrap">
              TODOS
            </button>
            <button className="bg-transparent border border-gray-700 text-white font-mono text-xs tracking-[1.4px] uppercase px-4 py-2 rounded-full hover:border-white whitespace-nowrap">
              AGENDADOS
            </button>
            <button className="bg-transparent border border-gray-700 text-white font-mono text-xs tracking-[1.4px] uppercase px-4 py-2 rounded-full hover:border-white whitespace-nowrap">
              CONFIRMADOS
            </button>
            <button className="bg-transparent border border-gray-700 text-white font-mono text-xs tracking-[1.4px] uppercase px-4 py-2 rounded-full hover:border-white whitespace-nowrap">
              CONCLUÍDOS
            </button>
            <button className="bg-transparent border border-gray-700 text-white font-mono text-xs tracking-[1.4px] uppercase px-4 py-2 rounded-full hover:border-white whitespace-nowrap">
              CANCELADOS
            </button>
          </div>

          <div className="space-y-4">
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-black border border-gray-800 p-6 hover:border-white/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-display text-xl uppercase">
                        {appointment.client}
                      </h3>
                      <span
                        className={`font-mono text-xs tracking-[1.4px] uppercase px-3 py-1 border ${statusColors[appointment.status]}`}
                      >
                        {appointment.status === "SCHEDULED" && "AGENDADO"}
                        {appointment.status === "CONFIRMED" && "CONFIRMADO"}
                        {appointment.status === "COMPLETED" && "CONCLUÍDO"}
                        {appointment.status === "CANCELED" && "CANCELADO"}
                        {appointment.status === "NO_SHOW" && "FALTOU"}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-gray-500 uppercase">
                      {appointment.service}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-2 text-gray-500">
                      <span className="font-mono text-xs tracking-[1.2px] uppercase">
                        {appointment.date} às {appointment.time}
                      </span>
                      <span className="font-mono text-xs tracking-[1.2px] uppercase">
                        {appointment.barber}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-2xl">
                      R$ {appointment.price}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 font-mono text-xs tracking-[1.4px] uppercase"
                      >
                        EDITAR
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-500 font-mono text-xs tracking-[1.4px] uppercase hover:text-white"
                      >
                        EXCLUIR
                      </Button>
                    </div>
                  </div>
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
                3
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
