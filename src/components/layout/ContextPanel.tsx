"use client";

import React, { useEffect, useRef } from "react";
import { X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { glass, motion, focus, typography } from "@/styles/tokens";
import type { ContextPanelProps, ContextNavItem, ContextNavGroup } from "./layout.types";

// ─── ContextPanel ─────────────────────────────────────────────────────────────

export function ContextPanel({
  open,
  activeItem,
  activeSubmenuId,
  onSubmenuClick,
  onClose,
  className,
}: ContextPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Focus first item when opened
  useEffect(() => {
    if (open && panelRef.current) {
      const first = panelRef.current.querySelector<HTMLElement>("button, a");
      first?.focus();
    }
  }, [open]);

  // Group children by group or render flat
  const groups: ContextNavGroup[] = React.useMemo(() => {
    if (!activeItem?.children) return [];
    return [{ id: "main", items: activeItem.children }];
  }, [activeItem]);

  return (
    <>
      {/* Panel */}
      <div
        ref={panelRef}
        role="navigation"
        aria-label={activeItem ? `${activeItem.label} submenu` : "Secondary navigation"}
        aria-hidden={!open}
        className={cn(
          "flex flex-col h-full w-72 flex-shrink-0 z-sticky",
          "bg-[#f8f7ff]/95 dark:bg-[#0f0817]/85 backdrop-blur-xl",
          "border-r border-purple-200 dark:border-purple-800/30",
          "transition-[width,opacity] duration-200 ease-out overflow-hidden",
          open ? "w-72 opacity-100" : "w-0 opacity-0 pointer-events-none",
          className,
        )}
      >
        {activeItem && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between gap-3 h-16 px-5 border-b border-white/15 dark:border-white/8 flex-shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-5 h-5 text-brand-600 dark:text-brand-400 flex-shrink-0">
                  {activeItem.icon}
                </span>
                <h2 className={cn(typography.preset["section-title"], "truncate")}>
                  {activeItem.label}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className={cn(
                  "w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-xl",
                  "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
                  "hover:bg-white/40 dark:hover:bg-white/8",
                  focus.brand,
                  motion.fast,
                )}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Groups */}
            <nav className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-4">
              {groups.map((group) => (
                <div key={group.id} className="flex flex-col gap-0.5">
                  {group.title && (
                    <p className={cn(typography.preset.overline, "px-3 mb-1")}>
                      {group.title}
                    </p>
                  )}
                  {group.items.map((item) => (
                    <ContextItem
                      key={item.id}
                      item={item}
                      isActive={activeSubmenuId === item.id}
                      onClick={onSubmenuClick}
                    />
                  ))}
                </div>
              ))}
            </nav>
          </>
        )}
      </div>
    </>
  );
}

// ─── ContextItem ──────────────────────────────────────────────────────────────

function ContextItem({
  item,
  isActive,
  onClick,
}: {
  item: ContextNavItem;
  isActive: boolean;
  onClick: (item: ContextNavItem) => void;
}) {
  return (
    <button
      type="button"
      disabled={item.disabled}
      onClick={() => !item.disabled && onClick(item)}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left",
        "outline-none",
        focus.brand,
        motion.fast,
        isActive
          ? "bg-purple-200/40 dark:bg-purple-800/30 text-purple-600 dark:text-purple-400"
          : [
              "text-gray-900 dark:text-gray-100",
              "hover:bg-purple-100/30 dark:hover:bg-purple-800/20",
            ],
        item.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
      )}
    >
      
      {/* Icon */}
      {item.icon && (
        <span
          className={cn(
            "flex-shrink-0 w-4 h-4 flex items-center justify-center",
            isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400",
            motion.fast,
          )}
        >
          {item.icon}
        </span>
      )}

      {/* Label */}
      <span className="flex-1 text-sm font-medium truncate">{item.label}</span>

      {/* Badge */}
      {item.badge != null && (
        <span className="ml-auto flex-shrink-0 min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white leading-none">
          {typeof item.badge === "number" && item.badge > 99 ? "99+" : item.badge}
        </span>
      )}
    </button>
  );
}
