import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-petrol-600 text-white hover:bg-petrol-700 shadow-[0_4px_20px_-6px_rgb(30_74_71_/0.5)]",
        gold: "gradient-gold text-graphite-900 hover:brightness-110 shadow-[0_4px_20px_-6px_rgb(229_167_58_/0.6)]",
        outline: "border border-graphite-300 bg-transparent text-graphite-800 hover:border-petrol-600 hover:text-petrol-600",
        ghost: "bg-transparent text-graphite-700 hover:bg-graphite-100",
        dark: "bg-graphite-800 text-white hover:bg-graphite-900",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-sm rounded-xl",
        lg: "h-13 px-8 text-base rounded-xl",
        xl: "h-14 px-10 text-base rounded-2xl",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";
