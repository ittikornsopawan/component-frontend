"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

export type OverlayBlur = "sm" | "md" | "lg";

export interface LoadingOverlayProps {
  visible?: boolean;
  blur?: OverlayBlur;
  message?: string;
  spinnerSize?: "sm" | "md" | "lg" | "xl";
  className?: string;
  fullPage?: boolean;
}

const blurMap: Record<OverlayBlur, string> = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-xl",
};

export function LoadingOverlay({
  visible = true,
  blur = "md",
  message,
  spinnerSize = "lg",
  className,
  fullPage = false,
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div
      aria-busy="true"
      aria-label={message ?? "Loading"}
      className={cn(
        "flex flex-col items-center justify-center gap-3 z-20 animate-fade-in",
        "bg-white/30 dark:bg-black/30",
        blurMap[blur],
        fullPage ? "fixed inset-0" : "absolute inset-0 rounded-[inherit]",
        className
      )}
    >
      <Spinner size={spinnerSize} />
      {message && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
