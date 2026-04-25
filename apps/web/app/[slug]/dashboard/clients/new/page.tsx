"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClientSchema, CreateClientType } from "@/lib/schemas/client.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default async function NewClientPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const form = useForm<CreateClientType>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  function onSubmit(values: CreateClientType) {
    console.log("Creating client:", values);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-12 px-6 border-b border-gray-900">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500 mb-2">
            CLIENTE
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-none uppercase">
            NOVO CLIENTE
          </h1>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup className="gap-6">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Nome Completo</FieldLabel>
                    <Input
                      {...field}
                      placeholder="João da Silva"
                      className="bg-black border-gray-800 text-white font-mono focus:border-white"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Telefone</FieldLabel>
                    <Input
                      {...field}
                      placeholder="(11) 99999-9999"
                      className="bg-black border-gray-800 text-white font-mono focus:border-white"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email (opcional)</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="joao@email.com"
                      className="bg-black border-gray-800 text-white font-mono focus:border-white"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="notes"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Observações (opcional)</FieldLabel>
                    <Textarea
                      {...field}
                      placeholder="Alguma observação sobre o cliente..."
                      className="bg-black border-gray-800 text-white font-mono focus:border-white min-h-[120px]"
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
                CADASTRAR CLIENTE
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