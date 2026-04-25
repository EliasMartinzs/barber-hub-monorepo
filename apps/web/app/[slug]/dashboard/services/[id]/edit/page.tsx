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
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const mockCategories = [
  { id: "1", name: "Cortes" },
  { id: "2", name: "Barba" },
  { id: "3", name: "Tratamentos" },
  { id: "4", name: "Pacotes" },
];

const mockService = {
  id: "1",
  name: "Corte Masculino",
  category: "Cortes",
  price: 45,
  duration: 30,
  isActive: true,
  imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b928a1?w=600&h=400&fit=crop",
  description: "Corte moderno com tesoura e máquina, incluindo lavagem.",
};

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;

  return <EditServiceForm slug={slug} serviceId={id} initialData={mockService} />;
}

interface EditServiceFormProps {
  slug: string;
  serviceId: string;
  initialData: typeof mockService;
}

function EditServiceForm({ slug, serviceId, initialData }: EditServiceFormProps) {
  const form = useForm<CreateServiceType>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: initialData.name,
      description: initialData.description || "",
      price: initialData.price,
      duration: initialData.duration,
      categoryId: mockCategories.find((c) => c.name === initialData.category)?.id || "",
      isActive: initialData.isActive,
      imageUrl: initialData.imageUrl || "",
    },
  });

  function onSubmit(values: CreateServiceType) {
    console.log("Updating service:", serviceId, values);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-8 md:py-12 px-4 md:px-6 border-b border-gray-900">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${slug}/dashboard/services`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs tracking-[1.4px] uppercase">
              Voltar aos serviços
            </span>
          </Link>
          <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500 mb-2">
            EDIÇÃO
          </p>
          <h1 className="font-display text-3xl md:text-6xl leading-none uppercase">
            EDITAR SERVIÇO
          </h1>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 relative aspect-video overflow-hidden">
            <img
              src={initialData.imageUrl}
              alt={initialData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="font-display text-4xl md:text-5xl uppercase">
                {initialData.name}
              </span>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup className="gap-4 md:gap-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

            <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-4">
              <Button
                type="submit"
                className="bg-white text-black font-mono text-xs md:text-sm tracking-[1.4px] uppercase px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gray-200 transition-colors w-full md:w-auto"
              >
                SALVAR ALTERAÇÕES
              </Button>
              <Link href={`/${slug}/dashboard/services`} className="flex-1 md:flex-none">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-700 text-white font-mono text-xs md:text-sm tracking-[1.4px] uppercase px-6 md:px-8 py-3 md:py-4 rounded-full hover:border-white w-full md:w-auto"
                >
                  CANCELAR
                </Button>
              </Link>
              <Button
                type="button"
                variant="ghost"
                className="text-red-500 font-mono text-xs md:text-sm tracking-[1.4px] uppercase px-6 md:px-8 py-3 md:py-4 hover:text-red-400 w-full md:w-auto md:ml-auto"
              >
                EXCLUIR
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}