"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputWrapperProps {
  children: React.ReactNode;
  className?: string;
  hasError?: boolean;
  isFocused?: boolean;
}

export function InputWrapper({
  children,
  className,
  hasError,
  isFocused,
}: InputWrapperProps) {
  return (
    <div
      className={cn(
        "relative flex items-center w-full",
        "rounded-2xl",
        "transition-all duration-200 ease-out",
        isFocused && "scale-[1.01]",
        hasError && "animate-shake-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
