import { Metadata } from "next";
import SignInForm from "./_componentes/sign-in-form";

export const metadata: Metadata = {
  title: "Entrar - BarberHub",
  description: "Entre na sua conta BarberHub",
};

export default function SignInPage() {
  return (
    <>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1
            className="font-display text-5xl md:text-7xl uppercase tracking-tight text-foreground"
            style={{ lineHeight: 1.0 }}
          >
            Entrar
          </h1>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
            Acesse sua conta
          </p>
        </div>
        <SignInForm />
      </div>
    </>
  );
}
