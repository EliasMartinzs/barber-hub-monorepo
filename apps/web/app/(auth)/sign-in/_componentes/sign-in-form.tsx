"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { useRouter } from "next/navigation";

import {
  signInSchema,
  SignInType,
} from "@/features/auth/schemas/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      callbackURL: "",
      rememberMe: false,
    },
  });

  const isPending = false;

  // const { mutate, isPending } = useSignIn();

  async function onSubmit() {}

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup className="gap-3">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="jonhdoe@email.com"
                className="bg-background border-border focus-visible:border-foreground"
                size="xl"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Senha</FieldLabel>

              <InputPassword
                value={field.value}
                onChange={field.onChange}
                placeholder="*******"
                className="bg-background border-border focus-visible:border-foreground"
                size="xl"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-12 font-mono text-sm uppercase tracking-widest bg-primary transition-colors duration-300"
      >
        {isPending ? "Entrando..." : "Entrar"}
      </Button>

      <p className="text-center font-mono text-sm text-muted-foreground">
        Não tem uma conta?{" "}
        <a
          href="/sign-up"
          className="text-foreground uppercase tracking-widest hover:underline"
        >
          Cadastrar
        </a>
      </p>
    </form>
  );
}
