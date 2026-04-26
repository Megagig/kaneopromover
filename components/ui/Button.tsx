import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  href?: string;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-black hover:bg-primary-hover",
  secondary:
    "bg-transparent border border-border text-text-primary hover:bg-surface",
  ghost: "bg-transparent text-text-primary hover:bg-surface",
  danger: "bg-error text-white hover:bg-red-600",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  href,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
