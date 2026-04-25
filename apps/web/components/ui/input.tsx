import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full min-w-0 rounded-none border bg-clip-padding text-base transition-[color,box-shadow,background-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 md:text-sm",
  {
    variants: {
      variant: {
        default:
          "bg-input/50 border-transparent border-input focus-visible:border-ring",
        transparent: "bg-transparent border-border focus-visible:border-ring",
        white:
          "bg-white border-transparent text-black placeholder:text-gray-400 focus-visible:border-gray-300",
        black:
          "bg-black border-transparent text-white placeholder:text-gray-500 focus-visible:border-gray-700",
        ghost: "bg-transparent border-transparent focus-visible:border-ring",
      },
      size: {
        default: "h-9 px-3 py-1",
        xs: "h-6 px-2 py-0.5 text-xs",
        sm: "h-8 px-3 py-1 text-sm",
        lg: "h-10 px-4 py-2 text-lg",
        xl: "h-12 px-5 py-3 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type InputVariants = VariantProps<typeof inputVariants>;

type InputBaseProps = Omit<React.ComponentProps<"input">, "size">;

export interface InputProps extends InputVariants, InputBaseProps {
  variant?: "default" | "transparent" | "white" | "black" | "ghost";
  size?: "default" | "xs" | "sm" | "lg" | "xl";
}

function Input({
  className,
  type,
  variant = "default",
  size = "default",
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      data-size={size}
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
