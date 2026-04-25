import z from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, {
    message: "Insira seu nome",
  }),
  password: z
    .string()
    .min(8, {
      message: "Senha deve conter no minimo 8 caracteres",
    })
    .max(64, {
      message: "Senha deve conter no maximo 64 caracteres",
    }),
  tenantName: z
    .string()
    .min(2, {
      message: "Insira o nome da sua barbearia",
    })
    .max(64, {
      message: "Insira no maximo 64 caracteres",
    }),
  callbackURL: z.string(),
});

export type SignUpType = z.infer<typeof signUpSchema>;
