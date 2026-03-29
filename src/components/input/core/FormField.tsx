"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function FormField({ children, className, id }: FormFieldProps) {
  return (
    <div id={id} className={cn("flex flex-col gap-1.5 w-full", className)}>
      {children}
    </div>
  );
}
