import { ReactNode } from "react";

export default function LayoutAuth({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh w-full bg-black flex items-center justify-center">
      {children}
    </div>
  );
}
