"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// ─── StatCard ─────────────────────────────────────────────────────────────────

export type StatCardVariant = "default" | "glass" | "colored";

export interface StatCardTrend {
  direction: "up" | "down" | "flat";
  value: string;
  label?: string;
}

export interface StatCardProps {
  label: string;
  value: string | number;
  trend?: StatCardTrend;
  icon?: React.ReactNode;
  variant?: StatCardVariant;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const trendConfig = {
  up:   { icon: TrendingUp,   text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50/60 dark:bg-emerald-900/20" },
  down: { icon: TrendingDown, text: "text-red-500 dark:text-red-400",         bg: "bg-red-50/60 dark:bg-red-900/20" },
  flat: { icon: Minus,        text: "text-gray-500 dark:text-gray-400",       bg: "bg-gray-50/60 dark:bg-white/8" },
};

const statCardVariants: Record<StatCardVariant, string> = {
  default: "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 shadow-lg shadow-black/8",
  glass:   "bg-white/20 dark:bg-white/3 backdrop-blur-2xl border border-white/10 dark:border-white/8",
  colored: "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 shadow-lg shadow-black/8",
};

export function StatCard({
  label,
  value,
  trend,
  icon,
  variant = "default",
  onClick,
  href,
  className,
}: StatCardProps) {
  const isClickable = !!onClick || !!href;
  const trendCfg = trend ? trendConfig[trend.direction] : null;
  const TrendIcon = trendCfg?.icon;

  const content = (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-snug">{label}</p>
        {icon && (
          <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-purple-100/60 dark:bg-purple-900/20 flex items-center justify-center text-purple-500 dark:text-purple-400 [&>svg]:w-5 [&>svg]:h-5">
            {icon}
          </span>
        )}
      </div>
      <p className="text-3xl font-black tabular-nums text-gray-900 dark:text-white leading-none tracking-tight">
        {value}
      </p>
      {trend && trendCfg && TrendIcon && (
        <div className="flex items-center gap-1.5">
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold", trendCfg.text, trendCfg.bg)}>
            <TrendIcon className="w-3 h-3" />
            {trend.value}
          </span>
          {trend.label && (
            <span className="text-xs text-gray-400 dark:text-gray-500">{trend.label}</span>
          )}
        </div>
      )}
    </div>
  );

  const base = cn(
    "rounded-3xl p-6 transition-all duration-200 ease-out",
    statCardVariants[variant],
    isClickable && "cursor-pointer hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/12 active:scale-[0.99]",
    className
  );

  if (href) return <a href={href} className={base}>{content}</a>;
  return <div className={base} onClick={onClick}>{content}</div>;
}

// ─── MetricCard ───────────────────────────────────────────────────────────────

export interface MetricCardSecondary {
  label: string;
  value: string | number;
}

export interface MetricCardProps {
  title: string;
  primary: { value: string | number; delta?: string; deltaDirection?: "up" | "down" | "flat" };
  secondary?: MetricCardSecondary[];
  footer?: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, primary, secondary, footer, className }: MetricCardProps) {
  const dir = primary.deltaDirection ?? "flat";
  const deltaColors = {
    up:   "text-emerald-600 dark:text-emerald-400",
    down: "text-red-500 dark:text-red-400",
    flat: "text-gray-400 dark:text-gray-500",
  };

  return (
    <div className={cn(
      "rounded-3xl p-6 flex flex-col gap-4",
      "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 shadow-lg shadow-black/8",
      className
    )}>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <div className="flex items-end gap-3">
        <span className="text-4xl font-black tabular-nums text-gray-900 dark:text-white leading-none">
          {primary.value}
        </span>
        {primary.delta && (
          <span className={cn("text-sm font-semibold mb-0.5", deltaColors[dir])}>
            {primary.delta}
          </span>
        )}
      </div>
      {secondary && secondary.length > 0 && (
        <div className="flex gap-4 pt-2 border-t border-white/20 dark:border-white/10">
          {secondary.map((s, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-400 dark:text-gray-500">{s.label}</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 tabular-nums">{s.value}</span>
            </div>
          ))}
        </div>
      )}
      {footer && <div className="pt-1">{footer}</div>}
    </div>
  );
}

// ─── InfoBox ──────────────────────────────────────────────────────────────────

export type InfoBoxVariant = "info" | "tip" | "warning" | "error";

export interface InfoBoxProps {
  variant?: InfoBoxVariant;
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const infoBoxConfig: Record<InfoBoxVariant, { bg: string; border: string; accent: string; title: string; text: string }> = {
  info:    { bg: "bg-blue-50/60 dark:bg-blue-900/20",    border: "border-blue-200/50 dark:border-blue-700/40",    accent: "border-l-blue-400",    title: "text-blue-800 dark:text-blue-200",    text: "text-blue-700 dark:text-blue-300" },
  tip:     { bg: "bg-purple-50/60 dark:bg-purple-900/20",border: "border-purple-200/50 dark:border-purple-700/40",accent: "border-l-purple-400",  title: "text-purple-800 dark:text-purple-200",text: "text-purple-700 dark:text-purple-300" },
  warning: { bg: "bg-amber-50/60 dark:bg-amber-900/20",  border: "border-amber-200/50 dark:border-amber-700/40",  accent: "border-l-amber-400",   title: "text-amber-800 dark:text-amber-200",  text: "text-amber-700 dark:text-amber-300" },
  error:   { bg: "bg-red-50/60 dark:bg-red-900/20",      border: "border-red-200/50 dark:border-red-700/40",      accent: "border-l-red-400",     title: "text-red-800 dark:text-red-200",      text: "text-red-700 dark:text-red-300" },
};

export function InfoBox({ variant = "info", title, icon, dismissible, onDismiss, className, children }: InfoBoxProps) {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;
  const cfg = infoBoxConfig[variant];
  return (
    <div className={cn(
      "rounded-2xl px-4 py-3.5 border border-l-4 backdrop-blur-md",
      cfg.bg, cfg.border, cfg.accent, className
    )}>
      <div className="flex items-start gap-3">
        {icon && <span className="flex-shrink-0 mt-0.5 [&>svg]:w-4 [&>svg]:h-4">{icon}</span>}
        <div className="flex-1 min-w-0">
          {title && <p className={cn("text-sm font-semibold mb-1", cfg.title)}>{title}</p>}
          {children && <div className={cn("text-sm leading-relaxed", cfg.text)}>{children}</div>}
        </div>
        {dismissible && (
          <button type="button" onClick={() => { setDismissed(true); onDismiss?.(); }} className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ─── KeyValueDisplay ──────────────────────────────────────────────────────────

export type KVLayout = "horizontal" | "vertical" | "grid";

export interface KVItem {
  key: string;
  value: React.ReactNode;
  badge?: boolean;
  avatar?: boolean;
}

export interface KeyValueDisplayProps {
  items: KVItem[];
  layout?: KVLayout;
  className?: string;
}

export function KeyValueDisplay({ items, layout = "horizontal", className }: KeyValueDisplayProps) {
  if (layout === "grid") {
    return (
      <div className={cn("grid grid-cols-2 gap-3", className)}>
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-1 p-3 rounded-xl bg-white/30 dark:bg-white/5">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{item.key}</span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }

  if (layout === "vertical") {
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">{item.key}</span>
            <span className="text-sm text-gray-800 dark:text-gray-200">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center justify-between gap-4 px-3 py-2.5 rounded-xl transition-colors duration-150",
            "hover:bg-purple-50/30 dark:hover:bg-purple-900/10",
            i % 2 === 0 ? "bg-white/20 dark:bg-white/3" : ""
          )}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">{item.key}</span>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 text-right">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
