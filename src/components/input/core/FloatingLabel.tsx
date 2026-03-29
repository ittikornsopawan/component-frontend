"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FloatingLabelProps {
  label: string;
  htmlFor?: string;
  isFocused: boolean;
  hasValue: boolean;
  hasError?: boolean;
  required?: boolean;
}

export function FloatingLabel({
  label,
  htmlFor,
  isFocused,
  hasValue,
  hasError,
  required,
}: FloatingLabelProps) {
  const isFloated = isFocused || hasValue;
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "absolute left-4 pointer-events-none select-none",
        "transition-all duration-200 ease-out origin-left",
        isFloated
          ? "top-1.5 text-[10px] font-semibold tracking-wide"
          : "top-1/2 -translate-y-1/2 text-sm",
        isFocused && !hasError && "text-purple-500 dark:text-purple-400",
        hasError && "text-red-400",
        !isFocused && !hasError && "text-gray-400 dark:text-gray-500"
      )}
    >
      {label}
      {required && <span className="ml-0.5 text-red-400">*</span>}
    </label>
  );
}
