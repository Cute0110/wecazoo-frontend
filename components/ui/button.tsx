import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 transition-all duration-400 hover:bg-foreground hover:border-foreground hover:text-primary select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-foreground shadow",
        outline: "border border-input bg-background shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-foreground shadow-sm",
        link: "text-primary underline-offset-4 hover:underline hover:bg-transparent p-none",
      },
      size: {
        default:
          "h-[45px] md:h-[48px] lg:h-[51px] px-[20px] md:px-[24px] xl:px-[32px] py-[15px]",
        sm: "h-fit px-6 py-2.5 text-sm",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
        fit: "px-none h-fit w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  size?: "default" | "sm" | "lg" | "icon" | "fit";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };