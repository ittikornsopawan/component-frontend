"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Panel ────────────────────────────────────────────────────────────────────

export type PanelVariant = "default" | "transparent" | "bordered";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PanelVariant;
  padding?: "none" | "sm" | "md" | "lg";
}

const panelVariants: Record<PanelVariant, string> = {
  default:     "bg-white/30 dark:bg-white/3 backdrop-blur-sm border border-white/15 dark:border-white/8 rounded-3xl",
  transparent: "",
  bordered:    "border-l-2 border-purple-300/40 dark:border-purple-500/30 pl-4 hover:border-purple-400/60 transition-colors duration-200",
};

const panelPadding = { none: "", sm: "p-4", md: "p-6", lg: "p-8" };

export function Panel({ variant = "default", padding = "none", className, children, ...props }: PanelProps) {
  return (
    <div className={cn(panelVariants[variant], panelPadding[padding], className)} {...props}>
      {children}
    </div>
  );
}

// ─── SectionContainer ─────────────────────────────────────────────────────────

export function SectionContainer({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {children}
    </div>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

export function SectionHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-6", className)} {...props}>
      {children}
    </div>
  );
}

// ─── SectionTitle ─────────────────────────────────────────────────────────────

export function SectionTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-lg font-bold text-gray-800 dark:text-gray-100 leading-snug", className)} {...props}>
      {children}
    </h2>
  );
}

// ─── SectionSubtitle ──────────────────────────────────────────────────────────

export function SectionSubtitle({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

// ─── SectionTitleGroup ────────────────────────────────────────────────────────

export function SectionTitleGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-0.5 flex-1 min-w-0", className)} {...props}>
      {children}
    </div>
  );
}

// ─── SectionAction ────────────────────────────────────────────────────────────

export function SectionAction({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2 flex-shrink-0 ml-auto", className)} {...props}>
      {children}
    </div>
  );
}

// ─── SectionContent ───────────────────────────────────────────────────────────

export function SectionContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  );
}

// ─── SectionFooter ────────────────────────────────────────────────────────────

export function SectionFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-end gap-3 mt-4", className)} {...props}>
      {children}
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

export type DividerVariant = "solid" | "gradient" | "dashed";
export type DividerOrientation = "horizontal" | "vertical";
export type DividerSpacing = "sm" | "md" | "lg";

export interface DividerProps {
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  spacing?: DividerSpacing;
  label?: string;
  className?: string;
}

const dividerSpacing: Record<DividerSpacing, string> = { sm: "my-3", md: "my-6", lg: "my-10" };
const vDividerSpacing: Record<DividerSpacing, string> = { sm: "mx-2 h-4", md: "mx-3 h-6", lg: "mx-4 h-8" };

export function Divider({
  variant = "solid",
  orientation = "horizontal",
  spacing = "md",
  label,
  className,
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-block w-px self-stretch bg-white/20 dark:bg-white/10",
          vDividerSpacing[spacing],
          className
        )}
      />
    );
  }

  if (label) {
    return (
      <div aria-hidden="true" className={cn("flex items-center gap-3", dividerSpacing[spacing], className)}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-white/15 to-transparent" />
        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium px-1 select-none">{label}</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/30 dark:via-white/15 to-transparent" />
      </div>
    );
  }

  const lineStyle =
    variant === "gradient"
      ? "h-px bg-gradient-to-r from-transparent via-white/30 dark:via-white/15 to-transparent"
      : variant === "dashed"
      ? "border-t border-dashed border-white/20 dark:border-white/10"
      : "border-t border-white/20 dark:border-white/10";

  return <div aria-hidden="true" className={cn(lineStyle, dividerSpacing[spacing], className)} />;
}

// ─── Spacer ───────────────────────────────────────────────────────────────────

const spacerSizes: Record<string, string> = {
  "1": "1", "2": "2", "3": "3", "4": "4", "6": "6",
  "8": "8", "10": "10", "12": "12", "16": "16",
};

export interface SpacerProps {
  size?: keyof typeof spacerSizes;
  axis?: "x" | "y" | "both";
}

export function Spacer({ size = "4", axis = "y" }: SpacerProps) {
  const val = `${parseInt(size) * 4}px`;
  return (
    <div
      aria-hidden="true"
      style={{
        display: "block",
        ...(axis === "y" || axis === "both" ? { height: val } : {}),
        ...(axis === "x" || axis === "both" ? { width: val } : {}),
        flexShrink: 0,
      }}
    />
  );
}
