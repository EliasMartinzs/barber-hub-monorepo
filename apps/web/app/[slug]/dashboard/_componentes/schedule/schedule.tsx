"use client";

import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  client: string;
  service: string;
  time: string;
  price: number;
  status: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELED" | "NO_SHOW";
}

interface ScheduleProps {
  appointments: Appointment[];
}

export function Schedule({ appointments }: ScheduleProps) {
  const completedToday = appointments.filter(
    (a) => a.status === "COMPLETED"
  ).length;
  const remainingToday = appointments.filter(
    (a) => a.status !== "COMPLETED" && a.status !== "CANCELED"
  ).length;

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
          <div>
            <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500 mb-2">
              AGENDA
            </p>
            <h2 className="font-display text-3xl md:text-6xl leading-none uppercase">
              HOJE
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="font-display text-2xl md:text-3xl leading-none">{completedToday}</p>
              <p className="font-mono text-[10px] md:text-xs tracking-[1.2px] uppercase text-gray-500">
                CONCLUÍDOS
              </p>
            </div>
            <div className="w-px bg-gray-800" />
            <div className="text-center">
              <p className="font-display text-2xl md:text-3xl leading-none">{remainingToday}</p>
              <p className="font-mono text-[10px] md:text-xs tracking-[1.2px] uppercase text-gray-500">
                RESTANTES
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-800" />

          <div className="space-y-4 md:space-y-6">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="relative flex items-center gap-3 md:gap-6"
              >
                <div className="sticky top-0 z-10 bg-black px-2 md:px-4 py-2">
                  <span className="font-mono text-xs md:text-sm tracking-[1.4px] uppercase">
                    {appointment.time}
                  </span>
                </div>

                <div className="flex-1 ml-8 md:ml-0 md:w-1/2 md:mx-auto">
                  <div className="bg-black border border-gray-800 p-4 md:p-6 hover:border-white/30 transition-colors duration-300">
                    <div className="flex justify-between items-start mb-2 md:mb-4">
                      <div>
                        <h3 className="font-display text-lg md:text-xl uppercase mb-1">
                          {appointment.client}
                        </h3>
                        <p className="font-mono text-[10px] md:text-xs tracking-[1.2px] uppercase text-gray-500">
                          {appointment.service}
                        </p>
                      </div>
                      <span className="font-mono text-sm md:text-sm tracking-[1.2px] uppercase">
                        R$ {appointment.price}
                      </span>
                    </div>
                    <div className="flex gap-2 md:gap-3">
                      <Button
                        size="sm"
                        className="flex-1 bg-white text-black font-mono text-[10px] md:text-xs tracking-[1.4px] uppercase hover:bg-gray-200 transition-colors"
                      >
                        INICIAR
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 font-mono text-[10px] md:text-xs tracking-[1.4px] uppercase"
                      >
                        DETALHES
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}