"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function InputLabel({
  children,
  className,
  required,
  ...props
}: InputLabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium text-gray-700 dark:text-gray-300 select-none",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-red-400 dark:text-red-400">*</span>
      )}
    </label>
  );
}
