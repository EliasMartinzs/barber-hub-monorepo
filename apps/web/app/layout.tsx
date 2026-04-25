import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/query-client-provider";
import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BarberHub - Gerencie Sua Barbearia",
  description:
    "A plataforma completa para gerenciar sua barbearia. Agendamentos, clientes, cortes e muito mais.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          unbounded.variable,
          jetbrainsMono.variable,
          dmSans.variable,
        )}
      >
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
