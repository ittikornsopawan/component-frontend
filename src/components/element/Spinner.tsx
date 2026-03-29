"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "default" | "white" | "colored";

const sizeStyles: Record<SpinnerSize, { dim: string; border: string }> = {
  xs: { dim: "w-3 h-3",    border: "border-2" },
  sm: { dim: "w-4 h-4",    border: "border-2" },
  md: { dim: "w-6 h-6",    border: "border-[3px]" },
  lg: { dim: "w-9 h-9",    border: "border-[3px]" },
  xl: { dim: "w-12 h-12",  border: "border-4" },
};

const variantStyles: Record<SpinnerVariant, string> = {
  default: "border-purple-200/40 dark:border-purple-800/40 border-t-purple-400 dark:border-t-purple-400",
  white:   "border-white/20 border-t-white",
  colored: "border-purple-200/40 dark:border-purple-800/40 border-t-purple-500 dark:border-t-purple-300",
};

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
  label?: string;
}

export function Spinner({ size = "md", variant = "default", className, label = "Loading…" }: SpinnerProps) {
  const { dim, border } = sizeStyles[size];
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center flex-shrink-0", className)}
    >
      <span
        className={cn(
          "rounded-full animate-spin",
          dim,
          border,
          variantStyles[variant]
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
