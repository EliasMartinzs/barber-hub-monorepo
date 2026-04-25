"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, Calendar, Users, Scissors, Home, ChevronRight, Settings } from "lucide-react";

interface NavProps {
  slug: string;
}

const navItems = [
  { href: "/dashboard", label: "INÍCIO", icon: Home },
  { href: "/dashboard/appointments", label: "AGENDAMENTOS", icon: Calendar },
  { href: "/dashboard/clients", label: "CLIENTES", icon: Users },
  { href: "/dashboard/services", label: "SERVIÇOS", icon: Scissors },
  { href: "/dashboard/settings", label: "AJUSTES", icon: Settings },
];

export function DashboardNav({ slug }: NavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    const basePath = `/${slug}/${href}`;
    return pathname === basePath || pathname.startsWith(`${basePath}/`);
  };

  const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className={cn("flex flex-col gap-1", isMobile ? "py-6" : "flex-row items-center gap-2")}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        if (isMobile) {
          return (
            <Link
              key={item.href}
              href={`/${slug}${item.href}`}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between px-6 py-4 font-mono text-sm tracking-[1.4px] uppercase transition-colors",
                active
                  ? "bg-white/10 text-white border-l-2 border-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-4">
                <Icon className="w-5 h-5" />
                {item.label}
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={`/${slug}${item.href}`}
            className={cn(
              "font-mono text-xs tracking-[1.4px] uppercase px-4 py-2 rounded-full transition-all duration-300",
              active
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-black border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 bg-black border-gray-900 p-0"
              >
                <SheetTitle className="sr-only">Navegação</SheetTitle>
                <div className="border-b border-gray-900 px-6 py-6">
                  <Link
                    href={`/${slug}/dashboard`}
                    className="font-display text-2xl uppercase tracking-wide"
                    onClick={() => setOpen(false)}
                  >
                    {slug}
                  </Link>
                </div>
                <NavContent isMobile />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop logo - hidden on mobile */}
          <div className="hidden md:block">
            <Link
              href={`/${slug}/dashboard`}
              className="font-display text-xl md:text-2xl uppercase tracking-wide hover:text-white text-white transition-colors"
            >
              {slug}
            </Link>
          </div>

          {/* Mobile logo - centered */}
          <div className="md:hidden flex-1 text-center">
            <Link
              href={`/${slug}/dashboard`}
              className="font-display text-lg uppercase tracking-wide"
            >
              {slug}
            </Link>
          </div>

          {/* Desktop nav - hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
            <NavContent />
          </div>

          {/* Spacer for mobile balance */}
          <div className="w-10 md:hidden" />
        </div>
      </div>
    </header>
  );
}