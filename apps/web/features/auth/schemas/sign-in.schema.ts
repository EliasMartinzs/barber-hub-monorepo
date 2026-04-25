import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Senha deve conter no minimo 8 caracteres",
    })
    .max(64, {
      message: "Senha deve conter no maximo 64 caracteres",
    }),
  rememberMe: z.boolean(),
  callbackURL: z.string(),
});

export type SignInType = z.infer<typeof signInSchema>;
