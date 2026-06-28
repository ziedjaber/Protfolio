import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "gold" | "space";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
          // Variants
          variant === "default" && "bg-white text-[#0A0A0A] hover:bg-white/95 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/85 border border-border/80",
          variant === "outline" && "border border-border/80 bg-transparent text-foreground hover:bg-white/5 hover:border-white/30",
          variant === "ghost" && "hover:bg-white/5 text-foreground/80 hover:text-foreground",
          variant === "gold" && "bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(167,139,250,0.35)] border border-primary",
          variant === "space" && "text-white font-semibold hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] border border-purple-500/30 hover:border-purple-400",
          // Sizes
          size === "default" && "h-11 px-6 py-2 rounded-sm",
          size === "sm" && "h-9 px-4 text-xs rounded-sm",
          size === "lg" && "h-12 px-8 text-base rounded-sm",
          size === "icon" && "h-10 w-10 rounded-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
