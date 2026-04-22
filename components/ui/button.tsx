import * as React from "react";

import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

const variantStyles = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border border-primary/15 bg-white/70 text-primary hover:bg-white"
} as const;

const sizeStyles = {
  default: "h-11 px-5 py-2.5",
  sm: "h-9 px-4"
} as const;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button
    className={cn(baseStyles, variantStyles[variant ?? "default"], sizeStyles[size ?? "default"], className)}
    ref={ref}
    {...props}
  />
));
Button.displayName = "Button";

export { Button };

