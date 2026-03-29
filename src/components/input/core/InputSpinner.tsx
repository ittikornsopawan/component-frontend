"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputSpinnerProps {
  className?: string;
  size?: "sm" | "md";
}

export function InputSpinner({ className, size = "sm" }: InputSpinnerProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border-2 border-current border-t-transparent animate-spin text-purple-400",
        size === "sm" ? "w-4 h-4" : "w-5 h-5",
        className
      )}
      aria-label="Loading"
      role="status"
    />
  );
}
