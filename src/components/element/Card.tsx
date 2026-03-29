"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardVariant = "default" | "elevated" | "flat" | "glass" | "clickable" | "interactive";
export type CardPadding = "none" | "compact" | "default" | "spacious";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  asChild?: boolean;
  href?: string;
}

// ─── Variant map ─────────────────────────────────────────────────────────────

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 shadow-lg shadow-black/8 dark:shadow-black/20",
  elevated:
    "bg-white/80 dark:bg-white/8 backdrop-blur-xl border border-white/30 dark:border-white/15 shadow-xl shadow-black/12 dark:shadow-black/25",
  flat:
    "bg-white/40 dark:bg-white/4 border border-white/20 dark:border-white/10",
  glass:
    "bg-white/20 dark:bg-white/3 backdrop-blur-2xl border border-white/10 dark:border-white/8",
  clickable:
    "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 shadow-lg shadow-black/8 cursor-pointer select-none " +
    "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/12 hover:bg-white/70 dark:hover:bg-white/8 " +
    "active:scale-[0.99] active:shadow-md active:translate-y-0 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/50 focus-visible:ring-offset-2",
  interactive:
    "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 shadow-lg shadow-black/8 " +
    "hover:ring-2 hover:ring-purple-300/30 dark:hover:ring-purple-400/20 hover:bg-white/70 dark:hover:bg-white/8 hover:shadow-xl " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/50",
};

const paddingStyles: Record<CardPadding, string> = {
  none:     "",
  compact:  "p-4",
  default:  "p-6",
  spacious: "p-8",
};

// ─── Card ─────────────────────────────────────────────────────────────────────

export function Card({
  variant = "default",
  padding = "default",
  className,
  children,
  onClick,
  href,
  ...props
}: CardProps) {
  const base = cn(
    "rounded-3xl transition-all duration-200 ease-out",
    variantStyles[variant],
    paddingStyles[padding],
    className
  );

  if (href) {
    return (
      <a href={href} className={base} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <div
      className={base}
      onClick={onClick}
      tabIndex={variant === "clickable" || variant === "interactive" ? 0 : undefined}
      role={variant === "clickable" ? "button" : undefined}
      onKeyDown={
        variant === "clickable" && onClick
          ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e as unknown as React.MouseEvent<HTMLDivElement>); } }
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  );
}

// ─── CardHeader ───────────────────────────────────────────────────────────────

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}

export function CardHeader({ className, children, divider, ...props }: CardHeaderProps) {
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

// ─── CardTitle ────────────────────────────────────────────────────────────────

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base font-semibold text-gray-800 dark:text-gray-100 leading-snug", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

// ─── CardDescription ─────────────────────────────────────────────────────────

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
}

// ─── CardAction ───────────────────────────────────────────────────────────────

export function CardAction({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2 flex-shrink-0 ml-auto", className)} {...props}>
      {children}
    </div>
  );
}

// ─── CardContent ─────────────────────────────────────────────────────────────

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  );
}

// ─── CardFooter ───────────────────────────────────────────────────────────────

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
  align?: "start" | "center" | "end" | "between";
}

export function CardFooter({ className, children, divider, align = "end", ...props }: CardFooterProps) {
  const alignMap = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" };
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
