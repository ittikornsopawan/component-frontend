"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TabsVariant = "default" | "pills" | "underline" | "glass";

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  tabs: TabItem[];
  variant?: TabsVariant;
  className?: string;
  fullWidth?: boolean;
}

export interface TabPanelProps {
  value: string;
  activeValue: string;
  className?: string;
  children: React.ReactNode;
  keepMounted?: boolean;
}

// ─── Variant styles ───────────────────────────────────────────────────────────

const trackStyles: Record<TabsVariant, string> = {
  default:  "bg-white/30 dark:bg-white/5 backdrop-blur-md p-1 rounded-2xl border border-white/20 dark:border-white/10",
  pills:    "gap-1",
  underline: "border-b border-white/20 dark:border-white/10 gap-1",
  glass:    "bg-white/20 dark:bg-white/5 backdrop-blur-xl p-1 rounded-2xl border border-white/15 dark:border-white/8",
};

const inactiveTabStyles: Record<TabsVariant, string> = {
  default:  "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/40 dark:hover:bg-white/8 rounded-xl",
  pills:    "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-white/8 rounded-xl border border-transparent",
  underline:"text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-t-xl border-b-2 border-transparent -mb-px",
  glass:    "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/30 dark:hover:bg-white/8 rounded-xl",
};

const activeTabStyles: Record<TabsVariant, string> = {
  default:  "bg-white/70 dark:bg-white/15 text-gray-900 dark:text-white shadow-md rounded-xl",
  pills:    "bg-purple-400/20 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-300/40 dark:border-purple-600/40 rounded-xl",
  underline:"text-gray-900 dark:text-white border-b-2 border-purple-400 -mb-px rounded-t-xl",
  glass:    "bg-white/50 dark:bg-white/12 text-gray-900 dark:text-white shadow-sm rounded-xl",
};

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export function Tabs({
  value,
  defaultValue,
  onChange,
  tabs,
  variant = "default",
  className,
  fullWidth = false,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? tabs[0]?.value ?? "");
  const activeValue = value !== undefined ? value : internalValue;
  const listRef = useRef<HTMLDivElement>(null);

  const select = (v: string) => {
    if (value === undefined) setInternalValue(v);
    onChange?.(v);
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const enabled = tabs.filter((t) => !t.disabled);
    const curIdx = enabled.findIndex((t) => t.value === activeValue);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = enabled[(curIdx + 1) % enabled.length];
      select(next.value);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = enabled[(curIdx - 1 + enabled.length) % enabled.length];
      select(prev.value);
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "flex items-center transition-all duration-200",
        trackStyles[variant],
        fullWidth && "w-full",
        variant === "pills" || variant === "underline" ? "gap-1" : "",
        className
      )}
    >
      {tabs.map((tab, idx) => {
        const isActive = tab.value === activeValue;
        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            disabled={tab.disabled}
            tabIndex={isActive ? 0 : -1}
            onClick={() => !tab.disabled && select(tab.value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-all duration-200 ease-out select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/50",
              fullWidth && "flex-1 justify-center",
              isActive ? activeTabStyles[variant] : inactiveTabStyles[variant],
              tab.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
            )}
          >
            {tab.icon && <span className="[&>svg]:w-4 [&>svg]:h-4 flex-shrink-0">{tab.icon}</span>}
            {tab.label}
            {tab.badge && <span className="ml-0.5">{tab.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}

// ─── TabPanel ─────────────────────────────────────────────────────────────────

export function TabPanel({ value, activeValue, className, children, keepMounted = false }: TabPanelProps) {
  const isActive = value === activeValue;
  if (!isActive && !keepMounted) return null;
  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      className={cn(isActive && "animate-fade-in", className)}
    >
      {children}
    </div>
  );
}
