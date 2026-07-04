import { type ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
          size === "md" && "px-5 py-2.5 text-sm",
          size === "lg" && "px-7 py-3.5 text-base",
          variant === "primary" &&
            "bg-primary text-white hover:bg-black active:scale-[0.98]",
          variant === "accent" &&
            "bg-accent text-primary hover:brightness-105 active:scale-[0.98] shadow-soft",
          variant === "outline" &&
            "border border-border bg-white text-primary hover:border-primary active:scale-[0.98]",
          variant === "ghost" && "text-primary hover:bg-black/5",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;
