"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertVariant = "info" | "success" | "warning" | "error" | "neutral";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  action?: { label: string; onClick: () => void };
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  children?: React.ReactNode;
}

// ─── Variant config ───────────────────────────────────────────────────────────

const variantConfig: Record<AlertVariant, {
  bg: string;
  border: string;
  accent: string;
  title: string;
  text: string;
  icon: React.ReactNode;
}> = {
  info: {
    bg:     "bg-blue-50/60 dark:bg-blue-900/20",
    border: "border-blue-200/60 dark:border-blue-700/40",
    accent: "border-l-blue-400 dark:border-l-blue-500",
    title:  "text-blue-800 dark:text-blue-200",
    text:   "text-blue-700 dark:text-blue-300",
    icon:   <Info className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
  },
  success: {
    bg:     "bg-emerald-50/60 dark:bg-emerald-900/20",
    border: "border-emerald-200/60 dark:border-emerald-700/40",
    accent: "border-l-emerald-400 dark:border-l-emerald-500",
    title:  "text-emerald-800 dark:text-emerald-200",
    text:   "text-emerald-700 dark:text-emerald-300",
    icon:   <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
  },
  warning: {
    bg:     "bg-amber-50/60 dark:bg-amber-900/20",
    border: "border-amber-200/60 dark:border-amber-700/40",
    accent: "border-l-amber-400 dark:border-l-amber-500",
    title:  "text-amber-800 dark:text-amber-200",
    text:   "text-amber-700 dark:text-amber-300",
    icon:   <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
  },
  error: {
    bg:     "bg-red-50/60 dark:bg-red-900/20",
    border: "border-red-200/60 dark:border-red-700/40",
    accent: "border-l-red-400 dark:border-l-red-500",
    title:  "text-red-800 dark:text-red-200",
    text:   "text-red-700 dark:text-red-300",
    icon:   <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />,
  },
  neutral: {
    bg:     "bg-gray-50/60 dark:bg-white/5",
    border: "border-gray-200/60 dark:border-white/10",
    accent: "border-l-gray-400 dark:border-l-white/30",
    title:  "text-gray-800 dark:text-gray-200",
    text:   "text-gray-600 dark:text-gray-400",
    icon:   <Info className="w-5 h-5 text-gray-400 dark:text-gray-500" />,
  },
};

// ─── Alert ────────────────────────────────────────────────────────────────────

export function Alert({
  variant = "info",
  title,
  icon,
  action,
  dismissible = false,
  onDismiss,
  className,
  children,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  const cfg = variantConfig[variant];

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-2xl px-4 py-3.5 border-l-4 border backdrop-blur-md animate-fade-in",
        cfg.bg,
        cfg.border,
        cfg.accent,
        className
      )}
    >
      {/* Icon */}
      <span className="flex-shrink-0 mt-0.5">{icon ?? cfg.icon}</span>

      {/* Body */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn("text-sm font-semibold leading-snug", cfg.title, children && "mb-1")}>
            {title}
          </p>
        )}
        {children && (
          <div className={cn("text-sm leading-relaxed", cfg.text)}>
            {children}
          </div>
        )}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={cn(
              "mt-2 text-xs font-semibold underline underline-offset-2 hover:no-underline transition-all duration-150",
              cfg.title
            )}
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="flex-shrink-0 mt-0.5 p-0.5 rounded-lg opacity-50 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-150"
        >
          <X className="w-4 h-4 text-current" />
        </button>
      )}
    </div>
  );
}
