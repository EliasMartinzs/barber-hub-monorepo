import { Metadata } from "next";
import SignUpForm from "./_componentes/sign-up-form";

export const metadata: Metadata = {
  title: "Cadastrar - BarberHub",
  description: "Crie sua conta BarberHub",
};

export default function SignUpPage() {
  return (
    <>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1
            className="font-display text-5xl md:text-7xl uppercase tracking-tight text-foreground"
            style={{ lineHeight: 1.0 }}
          >
            Cadastrar
          </h1>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
            Crie sua conta
          </p>
        </div>
        <SignUpForm />
      </div>
    </>
  );
}
