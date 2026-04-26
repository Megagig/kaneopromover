import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  className?: string;
  hover?: boolean;
  children: ReactNode;
}

export default function Card({ className, hover = false, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface",
        hover &&
          "transition-all duration-200 hover:border-primary/30 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
