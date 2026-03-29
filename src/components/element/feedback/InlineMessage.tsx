"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { color } from "../base/tokens";
import type { ColorVariant } from "../base/tokens";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InlineMessageVariant = "info" | "success" | "warning" | "error";
export type InlineMessageSize = "sm" | "md";

export interface InlineMessageProps {
  variant?: InlineMessageVariant;
  size?: InlineMessageSize;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const defaultIcons: Record<InlineMessageVariant, React.ReactNode> = {
  info:    <Info className="w-3.5 h-3.5" />,
  success: <CheckCircle2 className="w-3.5 h-3.5" />,
  warning: <AlertTriangle className="w-3.5 h-3.5" />,
  error:   <XCircle className="w-3.5 h-3.5" />,
};

const variantToColor: Record<InlineMessageVariant, ColorVariant> = {
  info:    "secondary",
  success: "success",
  warning: "warning",
  error:   "error",
};

const sizeStyles: Record<InlineMessageSize, string> = {
  sm: "text-xs gap-1 py-0.5",
  md: "text-sm gap-1.5 py-1",
};

// ─── InlineMessage ────────────────────────────────────────────────────────────
// Compact inline feedback — used under form fields, next to labels, inside cells.
// No background, no border — pure text + icon tint.

export function InlineMessage({
  variant = "info",
  size = "md",
  icon,
  className,
  children,
}: InlineMessageProps) {
  const colorTokens = color[variantToColor[variant]];
  const displayIcon = icon ?? defaultIcons[variant];

  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center font-medium leading-snug",
        colorTokens.text,
        sizeStyles[size],
        className
      )}
    >
      <span className="flex-shrink-0">{displayIcon}</span>
      <span>{children}</span>
    </span>
  );
}
