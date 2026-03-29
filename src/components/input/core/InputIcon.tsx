"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputIconProps {
  children: React.ReactNode;
  position?: "left" | "right";
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export function InputIcon({
  children,
  position = "left",
  className,
  onClick,
  interactive,
}: InputIconProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 flex items-center justify-center",
        "text-gray-400 dark:text-gray-500",
        "transition-all duration-200 ease-out",
        position === "left" ? "left-3.5" : "right-3.5",
        interactive &&
          "cursor-pointer hover:text-purple-500 dark:hover:text-purple-400",
        className
      )}
    >
      {children}
    </span>
  );
}
