"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputContainerProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  htmlFor?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
}

export function InputContainer({
  children,
  className,
  label,
  htmlFor,
  helperText,
  errorMessage,
  required,
}: InputContainerProps) {
  const helperId = htmlFor ? `${htmlFor}-helper` : undefined;
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none"
        >
          {label}
          {required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}
      {children}
      {helperText && !errorMessage && (
        <p id={helperId} className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          {helperText}
        </p>
      )}
      {errorMessage && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-red-400 animate-fade-in">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
