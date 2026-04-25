"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  createAppointmentSchema,
  CreateAppointmentType,
} from "@/lib/schemas/appointment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const mockClients = [
  { id: "1", name: "Carlos Eduardo", phone: "(11) 99999-9999" },
  { id: "2", name: "Rafael Silva", phone: "(11) 98888-8888" },
  { id: "3", name: "Bruno Santos", phone: "(11) 97777-7777" },
  { id: "4", name: "Lucas Oliveira", phone: "(11) 96666-6666" },
];

const mockServices = [
  { id: "1", name: "Corte Masculino", price: 45, duration: 30 },
  { id: "2", name: "Corte + Barba", price: 85, duration: 60 },
  { id: "3", name: "Barba Modelada", price: 35, duration: 30 },
  { id: "4", name: "Corte Degradê", price: 45, duration: 30 },
  { id: "5", name: "Progressiva", price: 80, duration: 90 },
];

const mockBarbers = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Pedro Santos" },
];

export default function NewAppointmentPage() {
  const form = useForm<CreateAppointmentType>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      clientId: "",
      serviceId: "",
      barberId: "",
      startAt: "",
    },
  });

  function onSubmit(values: CreateAppointmentType) {
    console.log("Creating appointment:", values);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-12 px-6 border-b border-gray-900">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500 mb-2">
            AGENDAMENTO
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-none uppercase">
            NOVO
          </h1>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup className="gap-6">
              <Controller
                name="clientId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Cliente</FieldLabel>
                    <select
                      {...field}
                      className="w-full bg-black border border-gray-800 text-white font-mono text-sm px-4 py-3 rounded-none focus:border-white focus:outline-none"
                    >
                      <option value="">Selecione um cliente</option>
                      {mockClients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name} - {client.phone}
                        </option>
                      ))}
                    </select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="serviceId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Serviço</FieldLabel>
                    <select
                      {...field}
                      className="w-full bg-black border border-gray-800 text-white font-mono text-sm px-4 py-3 rounded-none focus:border-white focus:outline-none"
                    >
                      <option value="">Selecione um serviço</option>
                      {mockServices.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} - R$ {service.price} (
                          {service.duration}min)
                        </option>
                      ))}
                    </select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="barberId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Barbeiro</FieldLabel>
                    <select
                      {...field}
                      className="w-full bg-black border border-gray-800 text-white font-mono text-sm px-4 py-3 rounded-none focus:border-white focus:outline-none"
                    >
                      <option value="">Selecione um barbeiro</option>
                      {mockBarbers.map((barber) => (
                        <option key={barber.id} value={barber.id}>
                          {barber.name}
                        </option>
                      ))}
                    </select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="startAt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Data e Hora</FieldLabel>
                    <Input
                      {...field}
                      type="datetime-local"
                      className="bg-black border-gray-800 text-white font-mono focus:border-white"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="bg-white text-black font-mono text-sm tracking-[1.4px] uppercase px-8 py-4 rounded-full hover:bg-gray-200 transition-colors"
              >
                CRIAR AGENDAMENTO
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-gray-700 text-white font-mono text-sm tracking-[1.4px] uppercase px-8 py-4 rounded-full hover:border-white"
              >
                CANCELAR
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
