"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "error" | "neutral";
export type BadgeSize = "sm" | "md" | "lg";
export type StatusType = "online" | "offline" | "away" | "busy";
export type DotBadgePosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

// ─── Variant maps ─────────────────────────────────────────────────────────────

const badgeVariantStyles: Record<BadgeVariant, string> = {
  primary:   "bg-purple-100/70 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-700/40",
  secondary: "bg-blue-100/70 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-700/40",
  success:   "bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-700/40",
  warning:   "bg-amber-100/70 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-700/40",
  error:     "bg-red-100/70 dark:bg-red-900/30 text-red-600 dark:text-red-300 border-red-200/60 dark:border-red-700/40",
  neutral:   "bg-gray-100/70 dark:bg-white/8 text-gray-600 dark:text-gray-400 border-gray-200/60 dark:border-white/10",
};

const badgeSizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px] gap-1",
  md: "px-2.5 py-1 text-xs gap-1.5",
  lg: "px-4 py-1.5 text-sm gap-2",
};

const dotSizeStyles: Record<BadgeSize, string> = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
  lg: "w-2.5 h-2.5",
};

const dotVariantColors: Record<BadgeVariant, string> = {
  primary:   "bg-purple-500",
  secondary: "bg-blue-500",
  success:   "bg-emerald-500",
  warning:   "bg-amber-500",
  error:     "bg-red-500",
  neutral:   "bg-gray-400",
};

// ─── Badge ────────────────────────────────────────────────────────────────────

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
}

export function Badge({
  variant = "neutral",
  size = "md",
  dot = false,
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold tracking-wide border transition-colors duration-150",
        badgeVariantStyles[variant],
        badgeSizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn("rounded-full flex-shrink-0", dotSizeStyles[size], dotVariantColors[variant])} />
      )}
      {icon && <span className="flex-shrink-0 [&>svg]:w-3 [&>svg]:h-3">{icon}</span>}
      {children}
    </span>
  );
}

// ─── Tag ──────────────────────────────────────────────────────────────────────

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  onRemove?: () => void;
  disabled?: boolean;
}

export function Tag({
  variant = "neutral",
  size = "md",
  icon,
  onRemove,
  disabled,
  className,
  children,
  ...props
}: TagProps) {
  const iconSize = size === "sm" ? "w-3 h-3" : size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold tracking-wide border transition-colors duration-150",
        badgeVariantStyles[variant],
        badgeSizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {icon && <span className={cn("flex-shrink-0", `[&>svg]:${iconSize}`)}>{icon}</span>}
      {children}
      {onRemove && !disabled && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          aria-label="Remove tag"
          className="flex-shrink-0 ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 hover:text-red-500 transition-colors duration-150 focus:outline-none"
        >
          <X className={iconSize} />
        </button>
      )}
    </span>
  );
}

// ─── StatusBadge ──────────────────────────────────────────────────────────────

const statusConfig: Record<StatusType, { color: string; label: string; pulse: boolean }> = {
  online:  { color: "bg-emerald-400", label: "Online",  pulse: true },
  away:    { color: "bg-amber-400",   label: "Away",    pulse: false },
  busy:    { color: "bg-red-400",     label: "Busy",    pulse: false },
  offline: { color: "bg-gray-400",    label: "Offline", pulse: false },
};

export interface StatusBadgeProps {
  status: StatusType;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusBadge({ status, showLabel = false, size = "md", className }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  const dotSize = size === "sm" ? "w-2 h-2" : size === "lg" ? "w-3.5 h-3.5" : "w-2.5 h-2.5";
  const ringSize = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4";
  const textSize = size === "sm" ? "text-[10px]" : size === "lg" ? "text-sm" : "text-xs";

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="relative flex items-center justify-center flex-shrink-0">
        {cfg.pulse && (
          <span className={cn("absolute rounded-full animate-ping opacity-60", ringSize, cfg.color.replace("bg-", "bg-").replace("400", "300"))} />
        )}
        <span className={cn("rounded-full", dotSize, cfg.color)} />
      </span>
      {showLabel && (
        <span className={cn("font-medium text-gray-600 dark:text-gray-400", textSize)}>{cfg.label}</span>
      )}
    </span>
  );
}

// ─── DotBadge ─────────────────────────────────────────────────────────────────

const dotPositionStyles: Record<DotBadgePosition, string> = {
  "top-right":    "-top-1 -right-1",
  "top-left":     "-top-1 -left-1",
  "bottom-right": "-bottom-1 -right-1",
  "bottom-left":  "-bottom-1 -left-1",
};

export interface DotBadgeProps {
  count?: number;
  max?: number;
  position?: DotBadgePosition;
  dot?: boolean;
  variant?: "error" | "primary" | "success" | "warning";
  className?: string;
  children: React.ReactNode;
}

const dotBadgeColors = {
  error:   "bg-red-400 ring-red-100 dark:ring-red-900",
  primary: "bg-purple-400 ring-purple-100 dark:ring-purple-900",
  success: "bg-emerald-400 ring-emerald-100 dark:ring-emerald-900",
  warning: "bg-amber-400 ring-amber-100 dark:ring-amber-900",
};

export function DotBadge({
  count,
  max = 99,
  position = "top-right",
  dot = false,
  variant = "error",
  className,
  children,
}: DotBadgeProps) {
  const displayCount = count !== undefined && count > max ? `${max}+` : count;
  const hasContent = count !== undefined ? count > 0 : true;

  return (
    <span className={cn("relative inline-flex", className)}>
      {children}
      {hasContent && (
        <span
          aria-label={count !== undefined ? `${displayCount} notifications` : undefined}
          className={cn(
            "absolute z-10 flex items-center justify-center ring-2 ring-white dark:ring-slate-900 rounded-full animate-fade-in",
            dotBadgeColors[variant],
            dotPositionStyles[position],
            dot || count === undefined
              ? "w-2.5 h-2.5"
              : "min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white"
          )}
        >
          {!dot && count !== undefined && displayCount}
        </span>
      )}
    </span>
  );
}
