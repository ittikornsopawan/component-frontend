"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { surface, radius, spacing, transition, focus } from "./tokens";
import type { SurfaceVariant, RadiusVariant } from "./tokens";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PaddingVariant = "none" | "compact" | "default" | "spacious";

export interface BaseSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant;
  rounded?: RadiusVariant;
  padding?: PaddingVariant;
  hoverable?: boolean;
  interactive?: boolean;
  clickable?: boolean;
  disabled?: boolean;
  as?: "div" | "article" | "section" | "aside" | "li";
}

// ─── BaseSurface ──────────────────────────────────────────────────────────────
// Foundation primitive — all surfaces extend this.

export function BaseSurface({
  variant = "default",
  rounded = "lg",
  padding = "none",
  hoverable = false,
  interactive = false,
  clickable = false,
  disabled = false,
  as: Tag = "div",
  className,
  children,
  onClick,
  ...props
}: BaseSurfaceProps) {
  const isActionable = clickable || interactive || !!onClick;

  return (
    <Tag
      className={cn(
        surface[variant],
        radius[rounded],
        spacing[padding],
        transition.base,

        // Hoverable: lift + brighten
        hoverable && "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/12 hover:bg-white/75 dark:hover:bg-white/8",

        // Interactive: ring glow on hover
        interactive && [
          "hover:ring-2 hover:ring-purple-300/30 dark:hover:ring-purple-400/20",
          "hover:bg-white/70 dark:hover:bg-white/8",
          "hover:shadow-xl",
        ],

        // Clickable: cursor + press scale
        clickable && [
          "cursor-pointer select-none",
          "hover:-translate-y-0.5 hover:shadow-xl hover:bg-white/75 dark:hover:bg-white/8",
          "active:scale-[0.99] active:shadow-md active:translate-y-0",
          focus,
        ],

        // Disabled
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",

        className
      )}
      onClick={(!disabled ? onClick : undefined) as React.MouseEventHandler<HTMLElement>}
      tabIndex={isActionable && !disabled ? 0 : undefined}
      role={clickable && !props.role ? "button" : props.role}
      aria-disabled={disabled || undefined}
      onKeyDown={
        (clickable && onClick && !disabled
          ? (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                (onClick as () => void)();
              }
            }
          : undefined) as React.KeyboardEventHandler<HTMLElement>
      }
      {...(props as React.HTMLAttributes<HTMLElement>)}
    >
      {children}
    </Tag>
  );
}

// ─── SurfaceHeader ────────────────────────────────────────────────────────────

export interface SurfaceHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}

export function SurfaceHeader({ divider, className, children, ...props }: SurfaceHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4",
        divider && "pb-4 border-b border-white/20 dark:border-white/10 mb-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── SurfaceContent ───────────────────────────────────────────────────────────

export function SurfaceContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  );
}

// ─── SurfaceFooter ────────────────────────────────────────────────────────────

export type SurfaceFooterAlign = "start" | "center" | "end" | "between";

export interface SurfaceFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
  align?: SurfaceFooterAlign;
}

const alignMap: Record<SurfaceFooterAlign, string> = {
  start:   "justify-start",
  center:  "justify-center",
  end:     "justify-end",
  between: "justify-between",
};

export function SurfaceFooter({ divider, align = "end", className, children, ...props }: SurfaceFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        alignMap[align],
        divider && "pt-4 border-t border-white/20 dark:border-white/10 mt-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── SurfaceContainer ─────────────────────────────────────────────────────────
// Lightweight layout wrapper — no visual surface, just spacing structure.

export function SurfaceContainer({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {children}
    </div>
  );
}
