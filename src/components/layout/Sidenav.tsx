"use client";

import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, focus } from "@/styles/tokens";
import { SidebarItem } from "./SidebarItem";
import { SidebarTooltip } from "./SidebarTooltip";
import type { SidenavProps } from "./layout.types";

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name, url, size = "sm" }: { name: string; url?: string; size?: "sm" | "md" }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  if (url) {
    return (
      <img
        src={url}
        alt={name}
        className={cn(sz, "rounded-full object-cover ring-2 ring-white/20 flex-shrink-0")}
      />
    );
  }
  return (
    <div
      className={cn(
        sz,
        "rounded-full flex items-center justify-center flex-shrink-0",
        "bg-gradient-to-br from-brand-400 to-brand-600 text-gray-900 dark:text-gray-100 font-semibold",
        "ring-2 ring-white/20",
      )}
    >
      {initials}
    </div>
  );
}

// ─── Sidenav ──────────────────────────────────────────────────────────────────

export function Sidenav({
  items,
  activeItemId,
  isCollapsed,
  isDark,
  onItemClick,
  onToggleCollapse,
  onThemeToggle,
  className,
}: SidenavProps) {
  return (
    <aside
      role="navigation"
      aria-label="Primary navigation"
      className={cn(
        "relative flex flex-col h-full z-sticky",
        "bg-white/90 dark:bg-[#0f0817]/90 backdrop-blur-xl",
        "border-r border-purple-200 dark:border-purple-800/30",
        "transition-[width] duration-300 ease-out",
        isCollapsed ? "w-[72px]" : "w-64",
        className,
      )}
    >
      {/* ── Logo area ── */}
      <div
        className={cn(
          "flex items-center h-16 border-b border-white/10 dark:border-white/8 flex-shrink-0",
          isCollapsed ? "justify-center px-0" : "px-5 gap-3",
        )}
      >
        {/* Logo mark */}
        <div className="w-8 h-8 flex-shrink-0 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-brand-sm">
          <span className="text-gray-900 dark:text-gray-100 font-bold text-sm select-none">S</span>
        </div>
        {/* Product name (full mode only) */}
        {!isCollapsed && (
          <span className="text-gray-900 dark:text-gray-100 font-bold text-base tracking-tight truncate select-none">
            SaaS App
          </span>
        )}
      </div>

      {/* ── Nav items ── */}
      <nav className={cn("flex-1 overflow-y-auto overflow-x-hidden py-3 flex flex-col gap-1", isCollapsed ? "px-2" : "px-3")}>
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={activeItemId === item.id}
            isCollapsed={isCollapsed}
            onClick={onItemClick}
          />
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className={cn("flex flex-col gap-1 border-t border-white/10 dark:border-white/8 py-3 flex-shrink-0", isCollapsed ? "px-2" : "px-3")}>
        {/* Theme toggle pill */}
        {onThemeToggle && (
          isCollapsed ? (
            <SidebarTooltip content={isDark ? "Switch to Light" : "Switch to Dark"}>
              <button
                type="button"
                onClick={onThemeToggle}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className={cn(
                  "w-12 h-9 mx-auto flex items-center justify-center rounded-xl",
                  "bg-purple-100/40 hover:bg-purple-200/30 text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400",
                  focus.brand, motion.fast,
                )}
              >
                {isDark
                  ? <Sun  className="w-3.5 h-3.5" />
                  : <Moon className="w-3.5 h-3.5" />}
              </button>
            </SidebarTooltip>
          ) : (
            <div className="px-3">
              <div
                role="group"
                aria-label="Theme"
                className="flex items-center w-full h-9 rounded-xl bg-white/8 p-0.5 gap-0.5"
              >
                {/* Light button */}
                <button
                  type="button"
                  onClick={() => isDark && onThemeToggle()}
                  aria-pressed={!isDark}
                  aria-label="Light mode"
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 h-full rounded-[9px] text-xs font-medium",
                    motion.fast,
                    !isDark
                      ? "bg-purple-200/40 dark:bg-purple-800/30 text-purple-600 dark:text-purple-400"
                      : [
                          "text-gray-600 dark:text-gray-100",
                          "hover:bg-purple-100/30 dark:hover:bg-purple-800/20",
                        ],
                  )}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
                {/* Dark button */}
                <button
                  type="button"
                  onClick={() => !isDark && onThemeToggle()}
                  aria-pressed={isDark}
                  aria-label="Dark mode"
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 h-full rounded-[9px] text-xs font-medium",
                    motion.fast,
                    isDark
                      ? "bg-purple-900/30 text-purple-400"
                      : "text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-100/30 dark:hover:bg-purple-800/20",
                  )}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
              </div>
            </div>
          )
        )}

              </div>

          </aside>
  );
}
