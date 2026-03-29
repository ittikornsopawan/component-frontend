"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface InputErrorMessageProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function InputErrorMessage({ children, className, id }: InputErrorMessageProps) {
  return (
    <p
      id={id}
      role="alert"
      className={cn(
        "flex items-center gap-1.5 text-xs text-red-400 dark:text-red-400 animate-fade-in",
        className
      )}
    >
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {children}
    </p>
  );
}
