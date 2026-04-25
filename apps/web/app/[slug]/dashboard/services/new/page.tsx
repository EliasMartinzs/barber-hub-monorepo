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
import {
  createServiceSchema,
  CreateServiceType,
} from "@/lib/schemas/service.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const mockCategories = [
  { id: "1", name: "Cortes" },
  { id: "2", name: "Barba" },
  { id: "3", name: "Tratamentos" },
  { id: "4", name: "Pacotes" },
];

export default function NewServicePage() {
  const form = useForm<CreateServiceType>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      duration: 30,
      categoryId: "",
      isActive: true,
      imageUrl: "",
    },
  });

  function onSubmit(values: CreateServiceType) {
    console.log("Creating service:", values);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-12 px-6 border-b border-gray-900">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500 mb-2">
            SERVIÇO
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-none uppercase">
            NOVO SERVIÇO
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
                    <FieldLabel>Nome do Serviço</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Corte Masculino"
                      className="bg-black border-gray-800 text-white font-mono focus:border-white"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Descrição (opcional)</FieldLabel>
                    <Textarea
                      {...field}
                      placeholder="Descrição do serviço..."
                      className="bg-black border-gray-800 text-white font-mono focus:border-white min-h-[100px]"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Controller
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Preço (R$)</FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        placeholder="45"
                        className="bg-black border-gray-800 text-white font-mono focus:border-white"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="duration"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Duração (minutos)</FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        placeholder="30"
                        className="bg-black border-gray-800 text-white font-mono focus:border-white"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Categoria</FieldLabel>
                    <select
                      {...field}
                      className="w-full bg-black border border-gray-800 text-white font-mono text-sm px-4 py-3 rounded-none focus:border-white focus:outline-none"
                    >
                      <option value="">Selecione uma categoria</option>
                      {mockCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
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
                name="imageUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>URL da Imagem (opcional)</FieldLabel>
                    <Input
                      {...field}
                      placeholder="https://..."
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
                CRIAR SERVIÇO
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
