"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, XCircle, Megaphone, X } from "lucide-react";

export type BannerVariant = "info" | "warning" | "error" | "announcement";

export interface BannerProps {
  variant?: BannerVariant;
  children: React.ReactNode;
  action?: { label: string; href?: string; onClick?: () => void };
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const bannerConfig: Record<BannerVariant, { bg: string; border: string; icon: React.ReactNode; text: string }> = {
  info:         { bg: "bg-blue-50/80 dark:bg-blue-900/30",    border: "border-blue-200/50 dark:border-blue-700/40",   icon: <Info className="w-4 h-4 text-blue-500" />,          text: "text-blue-800 dark:text-blue-200" },
  warning:      { bg: "bg-amber-50/80 dark:bg-amber-900/30",  border: "border-amber-200/50 dark:border-amber-700/40", icon: <AlertTriangle className="w-4 h-4 text-amber-500" />, text: "text-amber-800 dark:text-amber-200" },
  error:        { bg: "bg-red-50/80 dark:bg-red-900/30",      border: "border-red-200/50 dark:border-red-700/40",     icon: <XCircle className="w-4 h-4 text-red-500" />,        text: "text-red-800 dark:text-red-200" },
  announcement: { bg: "bg-purple-50/80 dark:bg-purple-900/30",border: "border-purple-200/50 dark:border-purple-700/40",icon: <Megaphone className="w-4 h-4 text-purple-500" />,   text: "text-purple-800 dark:text-purple-200" },
};

export function Banner({ variant = "info", children, action, dismissible, onDismiss, className }: BannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const cfg = bannerConfig[variant];

  return (
    <div
      role="banner"
      className={cn(
        "w-full border-b backdrop-blur-md py-3 px-6 flex items-center gap-3 animate-fade-in",
        cfg.bg, cfg.border, className
      )}
    >
      <span className="flex-shrink-0">{cfg.icon}</span>
      <p className={cn("flex-1 text-sm", cfg.text)}>{children}</p>
      {action && (
        action.href ? (
          <a
            href={action.href}
            className={cn("flex-shrink-0 text-sm font-semibold underline underline-offset-2 hover:no-underline transition-all duration-150", cfg.text)}
          >
            {action.label}
          </a>
        ) : (
          <button
            type="button"
            onClick={action.onClick}
            className={cn("flex-shrink-0 text-sm font-semibold underline underline-offset-2 hover:no-underline transition-all duration-150", cfg.text)}
          >
            {action.label}
          </button>
        )
      )}
      {dismissible && (
        <button
          type="button"
          onClick={() => { setDismissed(true); onDismiss?.(); }}
          aria-label="Dismiss banner"
          className={cn("flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity p-0.5 rounded", cfg.text)}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
