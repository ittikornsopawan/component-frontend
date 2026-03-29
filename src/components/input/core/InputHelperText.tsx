"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputHelperTextProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function InputHelperText({ children, className, id }: InputHelperTextProps) {
  return (
    <p
      id={id}
      className={cn(
        "text-xs text-gray-500 dark:text-gray-400 leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
}
