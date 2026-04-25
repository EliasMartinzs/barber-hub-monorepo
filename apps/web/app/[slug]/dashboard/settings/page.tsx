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
  updateTenantSchema,
  UpdateTenantType,
  updateUserSchema,
  UpdateUserType,
} from "@/lib/schemas/settings.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Camera,
  Clock,
  Mail,
  MapPin,
  Phone,
  Save,
  Store,
  User,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const mockUser = {
  id: "user-1",
  name: "João Silva",
  email: "joao@barbearia.com",
  image:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
};

const mockTenant = {
  id: "tenant-1",
  name: "Barbearia Moderno",
  description: "Cortes modernos e barba modelada no melhor estilo.",
  phone: "(11) 99999-9999",
  email: "contato@barbeariamoderno.com",
  address: "Rua das Flores, 123",
  city: "São Paulo",
  state: "SP",
  logoUrl:
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop",
  timezone: "America/Sao_Paulo",
  isActive: true,
};

const mockBusinessHours = [
  {
    dayOfWeek: 0,
    dayName: "DOMINGO",
    openTime: "00:00",
    closeTime: "00:00",
    isClosed: true,
  },
  {
    dayOfWeek: 1,
    dayName: "SEGUNDA",
    openTime: "09:00",
    closeTime: "19:00",
    isClosed: false,
  },
  {
    dayOfWeek: 2,
    dayName: "TERÇA",
    openTime: "09:00",
    closeTime: "19:00",
    isClosed: false,
  },
  {
    dayOfWeek: 3,
    dayName: "QUARTA",
    openTime: "09:00",
    closeTime: "19:00",
    isClosed: false,
  },
  {
    dayOfWeek: 4,
    dayName: "QUINTA",
    openTime: "09:00",
    closeTime: "19:00",
    isClosed: false,
  },
  {
    dayOfWeek: 5,
    dayName: "SEXTA",
    openTime: "09:00",
    closeTime: "21:00",
    isClosed: false,
  },
  {
    dayOfWeek: 6,
    dayName: "SÁBADO",
    openTime: "09:00",
    closeTime: "18:00",
    isClosed: false,
  },
];

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <SettingsForm
      slug={slug}
      user={mockUser}
      tenant={mockTenant}
      businessHours={mockBusinessHours}
    />
  );
}

interface SettingsFormProps {
  slug: string;
  user: typeof mockUser;
  tenant: typeof mockTenant;
  businessHours: typeof mockBusinessHours;
}

function SettingsForm({
  slug,
  user,
  tenant,
  businessHours,
}: SettingsFormProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-[2px] uppercase text-gray-500 mb-4">
            CONFIGURAÇÃO
          </p>
          <h1 className="font-display text-5xl md:text-8xl lg:text-[10rem] leading-[0.85] uppercase">
            AJUSTES<span className="text-gray-700">.</span>
          </h1>
          <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-400 mt-6 max-w-md mx-auto">
            GERENCIE SEU PERFIL E BARBEARIA
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-4 md:px-6 -mt-8 md:-mt-12 relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-1 bg-gray-900/80 backdrop-blur-md p-1 rounded-full overflow-x-auto">
            {[
              { icon: User, label: "PERFIL" },
              { icon: Store, label: "BARBEARIA" },
              { icon: Clock, label: "HORÁRIOS" },
            ].map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 font-mono text-[10px] md:text-xs tracking-[1.4px] uppercase px-3 md:px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300",
                    isActive
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {activeTab === 0 && <ProfileForm user={user} />}
          {activeTab === 1 && <TenantForm tenant={tenant} />}
          {activeTab === 2 && <BusinessHoursForm hours={businessHours} />}
        </div>
      </section>
    </div>
  );
}

function ProfileForm({ user }: { user: typeof mockUser }) {
  const form = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      image: user.image || "",
    },
  });

  function onSubmit(values: UpdateUserType) {
    console.log("Updating user:", values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
      {/* Avatar Section */}
      <div className="relative">
        <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-gray-700" />
          <img
            src={user.image}
            alt={user.name}
            className="relative w-full h-full rounded-full object-cover border-2 border-gray-800"
          />
          <button
            type="button"
            className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Camera className="w-4 h-4 md:w-5 md:h-5 text-black" />
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="font-display text-2xl md:text-3xl uppercase">
            {user.name}
          </p>
          <p className="font-mono text-xs text-gray-500 mt-1">{user.email}</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

        <FieldGroup className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500">
              INFORMAÇÕES PESSOAIS
            </p>
          </div>

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative">
                <FieldLabel className="text-gray-500 font-mono text-xs tracking-[1.4px] uppercase mb-2 block">
                  NOME COMPLETO
                </FieldLabel>
                <Input
                  {...field}
                  className="bg-transparent border-0 border-b-2 border-gray-800 text-white font-display text-xl md:text-2xl uppercase py-4 focus:border-white focus:outline-none transition-colors placeholder:text-gray-700"
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
              <Field data-invalid={fieldState.invalid} className="relative">
                <FieldLabel className="text-gray-500 font-mono text-xs tracking-[1.4px] uppercase mb-2 block">
                  EMAIL
                </FieldLabel>
                <Input
                  {...field}
                  type="email"
                  className="bg-transparent border-0 border-b-2 border-gray-800 text-white font-mono text-lg py-4 focus:border-white focus:outline-none transition-colors placeholder:text-gray-700"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative">
                <FieldLabel className="text-gray-500 font-mono text-xs tracking-[1.4px] uppercase mb-2 block">
                  URL DA FOTO
                </FieldLabel>
                <Input
                  {...field}
                  className="bg-transparent border-0 border-b-2 border-gray-800 text-gray-400 font-mono text-sm py-4 focus:border-white focus:outline-none transition-colors placeholder:text-gray-700"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>

      <Button
        type="submit"
        className="w-full bg-white text-black font-mono text-sm tracking-[1.4px] uppercase py-4 md:py-5 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
      >
        <Save className="w-5 h-5" />
        SALVAR ALTERAÇÕES
      </Button>
    </form>
  );
}

function TenantForm({ tenant }: { tenant: typeof mockTenant }) {
  const form = useForm<UpdateTenantType>({
    resolver: zodResolver(updateTenantSchema),
    defaultValues: {
      name: tenant.name,
      description: tenant.description || "",
      phone: tenant.phone || "",
      email: tenant.email || "",
      address: tenant.address || "",
      city: tenant.city || "",
      state: tenant.state || "",
      logoUrl: tenant.logoUrl || "",
      timezone: tenant.timezone,
      isActive: tenant.isActive,
    },
  });

  function onSubmit(values: UpdateTenantType) {
    console.log("Updating tenant:", values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
      {/* Cover Image */}
      <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
        <img
          src={tenant.logoUrl}
          alt={tenant.name}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                className="bg-transparent border-none text-white font-display text-3xl md:text-5xl uppercase placeholder:text-gray-600 focus:outline-none w-full"
                placeholder="NOME DA BARBEARIA"
              />
            )}
          />
        </div>

        <button
          type="button"
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
        >
          <Camera className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="space-y-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Store className="w-4 h-4 text-white" />
          </div>
          <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500">
            DADOS DA BARBEARIA
          </p>
        </div>

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-gray-500 font-mono text-xs tracking-[1.4px] uppercase mb-2 block">
                DESCRIÇÃO
              </FieldLabel>
              <Textarea
                {...field}
                className="bg-transparent border-0 border-b-2 border-gray-800 text-white font-mono text-base py-4 focus:border-white focus:outline-none transition-colors placeholder:text-gray-700 min-h-[80px] resize-none"
                placeholder="Conte um pouco sobre sua barbearia..."
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-gray-500 font-mono text-xs tracking-[1.4px] uppercase mb-2 block flex items-center gap-2">
                  <Phone className="w-3 h-3" /> TELEFONE
                </FieldLabel>
                <Input
                  {...field}
                  className="bg-transparent border-0 border-b-2 border-gray-800 text-white font-mono text-lg py-4 focus:border-white focus:outline-none transition-colors placeholder:text-gray-700"
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
                <FieldLabel className="text-gray-500 font-mono text-xs tracking-[1.4px] uppercase mb-2 block flex items-center gap-2">
                  <Mail className="w-3 h-3" /> EMAIL
                </FieldLabel>
                <Input
                  {...field}
                  type="email"
                  className="bg-transparent border-0 border-b-2 border-gray-800 text-white font-mono text-lg py-4 focus:border-white focus:outline-none transition-colors placeholder:text-gray-700"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-gray-500 font-mono text-xs tracking-[1.4px] uppercase mb-2 block flex items-center gap-2">
                <MapPin className="w-3 h-3" /> ENDEREÇO
              </FieldLabel>
              <Input
                {...field}
                className="bg-transparent border-0 border-b-2 border-gray-800 text-white font-mono text-lg py-4 focus:border-white focus:outline-none transition-colors placeholder:text-gray-700"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-gray-500 font-mono text-xs tracking-[1.4px] uppercase mb-2 block">
                  CIDADE
                </FieldLabel>
                <Input
                  {...field}
                  className="bg-transparent border-0 border-b-2 border-gray-800 text-white font-mono text-lg py-4 focus:border-white focus:outline-none transition-colors placeholder:text-gray-700"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="state"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-gray-500 font-mono text-xs tracking-[1.4px] uppercase mb-2 block">
                  ESTADO
                </FieldLabel>
                <Input
                  {...field}
                  className="bg-transparent border-0 border-b-2 border-gray-800 text-white font-mono text-lg py-4 focus:border-white focus:outline-none transition-colors placeholder:text-gray-700"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="logoUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="md:col-span-1 col-span-2"
              >
                <FieldLabel className="text-gray-500 font-mono text-xs tracking-[1.4px] uppercase mb-2 block">
                  URL DO LOGO
                </FieldLabel>
                <Input
                  {...field}
                  className="bg-transparent border-0 border-b-2 border-gray-800 text-gray-400 font-mono text-sm py-4 focus:border-white focus:outline-none transition-colors placeholder:text-gray-700"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-white text-black font-mono text-sm tracking-[1.4px] uppercase py-4 md:py-5 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
      >
        <Save className="w-5 h-5" />
        SALVAR ALTERAÇÕES
      </Button>
    </form>
  );
}

function BusinessHoursForm({ hours }: { hours: typeof mockBusinessHours }) {
  const form = useForm({
    defaultValues: {
      hours: hours,
    },
  });

  function onSubmit(data: { hours: typeof mockBusinessHours }) {
    console.log("Updating business hours:", data.hours);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <Clock className="w-4 h-4 text-white" />
        </div>
        <p className="font-mono text-xs tracking-[1.4px] uppercase text-gray-500">
          HORÁRIO DE FUNCIONAMENTO
        </p>
      </div>

      <div className="space-y-2">
        {hours.map((hour, index) => (
          <div
            key={hour.dayOfWeek}
            className={cn(
              "group relative p-4 md:p-6 border transition-all duration-300",
              hour.isClosed
                ? "border-gray-900 bg-gray-900/20"
                : "border-gray-800 hover:border-white/50 bg-black",
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "font-display text-xl md:text-2xl uppercase tracking-wider",
                    hour.isClosed ? "text-gray-600" : "text-white",
                  )}
                >
                  {hour.dayName}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {hour.isClosed ? (
                  <span className="font-mono text-xs tracking-[1.4px] uppercase text-gray-600">
                    FECHADO
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg text-white">
                      {hour.openTime}
                    </span>
                    <span className="text-gray-600">—</span>
                    <span className="font-mono text-lg text-white">
                      {hour.closeTime}
                    </span>
                  </div>
                )}

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...form.register(`hours.${index}.isClosed`)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-transparent"></div>
                </label>
              </div>
            </div>

            {!hour.isClosed && (
              <div className="mt-4 pt-4 border-t border-gray-900 grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] tracking-[1.4px] uppercase text-gray-600 block mb-2">
                    ABERTURA
                  </label>
                  <input
                    type="time"
                    {...form.register(`hours.${index}.openTime`)}
                    className="w-full bg-transparent border border-gray-800 text-white font-mono text-sm px-3 py-2 focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[1.4px] uppercase text-gray-600 block mb-2">
                    FECHAMENTO
                  </label>
                  <input
                    type="time"
                    {...form.register(`hours.${index}.closeTime`)}
                    className="w-full bg-transparent border border-gray-800 text-white font-mono text-sm px-3 py-2 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        type="submit"
        className="w-full bg-white text-black font-mono text-sm tracking-[1.4px] uppercase py-4 md:py-5 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
      >
        <Save className="w-5 h-5" />
        SALVAR HORÁRIOS
      </Button>
    </form>
  );
}
