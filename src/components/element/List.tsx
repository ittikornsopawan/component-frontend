"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ListVariant = "default" | "flush" | "bordered" | "separated";

// ─── List ─────────────────────────────────────────────────────────────────────

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: ListVariant;
  role?: string;
}

const listVariantStyles: Record<ListVariant, string> = {
  default:   "flex flex-col gap-1",
  flush:     "flex flex-col",
  bordered:  "flex flex-col gap-2",
  separated: "flex flex-col",
};

export function List({ variant = "default", className, children, role = "list", ...props }: ListProps) {
  return (
    <ul role={role} className={cn(listVariantStyles[variant], className)} {...props}>
      {children}
    </ul>
  );
}

// ─── ListItem ─────────────────────────────────────────────────────────────────

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  title?: string;
  subtitle?: string;
  selected?: boolean;
  disabled?: boolean;
  variant?: ListVariant;
  href?: string;
}

export function ListItem({
  leading,
  trailing,
  title,
  subtitle,
  selected = false,
  disabled = false,
  variant = "default",
  href,
  className,
  children,
  onClick,
  ...props
}: ListItemProps) {
  const isClickable = !!onClick || !!href;

  const inner = (
    <>
      {leading && (
        <span className="flex-shrink-0 flex items-center justify-center w-10 h-10">{leading}</span>
      )}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        {title && (
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate leading-snug">
            {title}
          </span>
        )}
        {subtitle && (
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{subtitle}</span>
        )}
        {children}
      </div>
      {trailing && <span className="flex-shrink-0 flex items-center">{trailing}</span>}
    </>
  );

  const baseClass = cn(
    "flex items-center gap-3 px-4 py-3 transition-colors duration-150",
    variant === "flush" && "border-b border-white/15 dark:border-white/8 last:border-0",
    variant === "bordered" && "rounded-2xl bg-white/50 dark:bg-white/4 border border-white/20 dark:border-white/8",
    selected && "bg-purple-50/60 dark:bg-purple-900/20 border-l-2 border-purple-400",
    isClickable && !disabled && "cursor-pointer hover:bg-white/60 dark:hover:bg-white/8",
    isClickable && !disabled && !selected && "hover:bg-white/50 dark:hover:bg-white/6",
    isClickable && !disabled && "active:scale-[0.995]",
    disabled && "opacity-40 cursor-not-allowed pointer-events-none",
    className
  );

  if (href && !disabled) {
    return (
      <li role="listitem" {...(props as React.HTMLAttributes<HTMLLIElement>)}>
        <a href={href} className={baseClass}>{inner}</a>
      </li>
    );
  }

  return (
    <li
      role="listitem"
      className={baseClass}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      {inner}
    </li>
  );
}

// ─── ListGroup ────────────────────────────────────────────────────────────────

export interface ListGroupProps {
  label: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ListGroup({ label, collapsible = false, defaultOpen = true, className, children }: ListGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <li className={cn("flex flex-col", className)}>
      <div
        className={cn(
          "flex items-center justify-between px-4 py-2 select-none",
          collapsible && "cursor-pointer hover:bg-white/30 dark:hover:bg-white/5 rounded-xl transition-colors duration-150"
        )}
        onClick={collapsible ? () => setOpen((v) => !v) : undefined}
        aria-expanded={collapsible ? open : undefined}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {label}
        </span>
        {collapsible && (
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        )}
      </div>
      {(!collapsible || open) && (
        <ul role="group" className={cn("flex flex-col gap-1", collapsible && "animate-slide-down")}>
          {children}
        </ul>
      )}
    </li>
  );
}

// ─── ListItemCard ─────────────────────────────────────────────────────────────

export interface ListItemCardProps {
  leading?: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  trailing?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ListItemCard({
  leading,
  title,
  subtitle,
  badge,
  trailing,
  selected = false,
  disabled = false,
  onClick,
  href,
  className,
  children,
}: ListItemCardProps) {
  const isClickable = !!onClick || !!href;

  const inner = (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all duration-200 ease-out",
        "bg-white/60 dark:bg-white/5 backdrop-blur-xl border-white/25 dark:border-white/10 shadow-sm shadow-black/5",
        selected && "bg-purple-50/60 dark:bg-purple-900/20 border-purple-300/40 dark:border-purple-600/30 shadow-purple-100/20",
        isClickable && !disabled && "cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 hover:bg-white/75 dark:hover:bg-white/8",
        isClickable && !disabled && "active:scale-[0.99] active:translate-y-0",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
      onClick={!disabled ? onClick : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable && !disabled ? 0 : undefined}
      onKeyDown={isClickable && onClick && !disabled
        ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }
        : undefined
      }
    >
      {leading && <span className="flex-shrink-0">{leading}</span>}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        {title && (
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{title}</span>
        )}
        {subtitle && (
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{subtitle}</span>
        )}
        {children}
      </div>
      {badge && <span className="flex-shrink-0">{badge}</span>}
      {trailing && <span className="flex-shrink-0 flex items-center">{trailing}</span>}
    </div>
  );

  if (href && !disabled) {
    return <a href={href} className="block">{inner}</a>;
  }

  return inner;
}
