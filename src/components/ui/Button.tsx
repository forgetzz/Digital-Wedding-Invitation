"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
};

const base =
  "relative inline-flex items-center justify-center gap-2 px-8 py-3.5 font-body text-[13px] tracking-[0.18em] uppercase transition-colors duration-300 rounded-full select-none";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  solid:
    "bg-sage text-ivory hover:bg-sage-dark active:bg-sage-dark border border-sage",
  outline:
    "bg-transparent text-sage border border-gold hover:bg-gold/10 active:bg-gold/20",
  ghost: "bg-transparent text-ivory/90 hover:text-white border border-ivory/40",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
