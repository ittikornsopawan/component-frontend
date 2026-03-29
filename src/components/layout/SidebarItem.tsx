"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, focus } from "@/styles/tokens";
import { SidebarTooltip } from "./SidebarTooltip";
import type { SidebarItemProps } from "./layout.types";

// ─── Badge ─────────────────────────────────────────────────────────────────────

function ItemBadge({ value }: { value: string | number }) {
  return (
    <span className="ml-auto flex-shrink-0 min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white leading-none">
      {typeof value === "number" && value > 99 ? "99+" : value}
    </span>
  );
}

// ─── SidebarItem ──────────────────────────────────────────────────────────────

export function SidebarItem({ item, isActive, isCollapsed, onClick }: SidebarItemProps) {
  const hasChildren = !!item.children?.length;

  const button = (
    <button
      type="button"
      disabled={item.disabled}
      onClick={() => !item.disabled && onClick(item)}
      aria-current={isActive ? "page" : undefined}
      aria-label={isCollapsed ? item.label : undefined}
      aria-haspopup={hasChildren ? "true" : undefined}
      className={cn(
        "group relative w-full flex items-center gap-3 rounded-2xl",
        "outline-none",
        focus.brand,
        motion.fast,
        isCollapsed ? "justify-center px-0 py-3 mx-auto w-12 h-12" : "px-3 py-2.5",
        isActive
          ? "bg-purple-200/40 dark:bg-purple-800/30 text-purple-600 dark:text-purple-400 shadow-glass-sm"
          : [
              "text-gray-900 dark:text-gray-100",
              "hover:bg-purple-100/30 dark:hover:bg-purple-800/20 hover:text-purple-600 dark:hover:text-purple-400",
            ],
        item.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
      )}
    >
      
      {/* Icon */}
      <span
        className={cn(
          "flex-shrink-0 flex items-center justify-center w-5 h-5",
          motion.fast,
          isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400",
        )}
      >
        {item.icon}
      </span>

      {/* Label + badge (full mode only) */}
      {!isCollapsed && (
        <>
          <span className="flex-1 text-sm font-medium text-left truncate">
            {item.label}
          </span>
          {item.badge != null && <ItemBadge value={item.badge} />}
          {hasChildren && (
            <ChevronRight
              className={cn(
                "w-3.5 h-3.5 flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400",
                motion.fast,
                isActive && "text-purple-600 dark:text-purple-400",
              )}
            />
          )}
        </>
      )}

      {/* Collapsed badge dot */}
      {isCollapsed && item.badge != null && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-black/20" />
      )}
    </button>
  );

  if (isCollapsed) {
    return (
      <SidebarTooltip content={item.label} disabled={item.disabled}>
        {button}
      </SidebarTooltip>
    );
  }

  return button;
}
