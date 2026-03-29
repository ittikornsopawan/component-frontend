"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  isLoading?: boolean;
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, hasError, isLoading, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled || isLoading}
        aria-invalid={hasError ? "true" : undefined}
        className={cn(
          "glass-input-base",
          hasError && "glass-input-error animate-shake-sm",
          isLoading && "cursor-wait",
          className
        )}
        {...props}
      />
    );
  }
);

BaseInput.displayName = "BaseInput";
