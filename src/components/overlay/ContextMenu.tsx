"use client";

import React, { useState, useEffect, useRef, useCallback, useId } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContextMenuItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  checked?: boolean;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface ContextMenuProps {
  children: React.ReactElement;
  items: (ContextMenuItem | "separator")[];
  className?: string;
}

// ─── ContextMenu ──────────────────────────────────────────────────────────────

export function ContextMenu({ children, items, className }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos,  setPos]  = useState({ x: 0, y: 0 });
  const [activeIdx, setActiveIdx] = useState(-1);
  const panelRef   = useRef<HTMLDivElement>(null);
  const id         = useId();

  const close = useCallback(() => { setOpen(false); setActiveIdx(-1); }, []);

  // Position panel, clamping to viewport edges
  const openAt = useCallback((x: number, y: number) => {
    setOpen(true);
    setActiveIdx(-1);

    requestAnimationFrame(() => {
      if (!panelRef.current) return;
      const pw = panelRef.current.offsetWidth  || 200;
      const ph = panelRef.current.offsetHeight || 200;
      const vp = { w: window.innerWidth, h: window.innerHeight };
      setPos({
        x: Math.min(x, vp.w - pw - 8),
        y: Math.min(y, vp.h - ph - 8),
      });
    });

    setPos({ x, y }); // optimistic set before measure
  }, []);

  // Click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current?.contains(e.target as Node)) return;
      close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close]);

  // ESC + keyboard nav
  useEffect(() => {
    if (!open) return;
    const selectableItems = items.filter(
      (it): it is ContextMenuItem => it !== "separator" && !it.disabled
    );
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => (i + 1) % selectableItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => (i - 1 + selectableItems.length) % selectableItems.length);
      } else if (e.key === "Enter" && activeIdx >= 0) {
        e.preventDefault();
        selectableItems[activeIdx]?.onClick?.();
        close();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close, activeIdx, items]);

  // Scroll / resize → close
  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open, close]);

  const selectableItems = items.filter(
    (it): it is ContextMenuItem => it !== "separator" && !it.disabled
  );

  const cloned = React.cloneElement(children, {
    onContextMenu: (e: React.MouseEvent) => {
      e.preventDefault();
      openAt(e.clientX, e.clientY);
    },
  } as React.HTMLAttributes<HTMLElement>);

  const panel = open ? createPortal(
    <div
      ref={panelRef}
      id={id}
      role="menu"
      aria-label="Context menu"
      className={cn(
        "fixed z-tooltip min-w-[180px] max-w-xs",
        "bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl",
        "border border-white/30 dark:border-white/10",
        "rounded-2xl shadow-glass-xl py-1.5 animate-fade-in",
        className
      )}
      style={{ top: pos.y, left: pos.x }}
    >
      {items.map((item, idx) => {
        if (item === "separator") {
          return <div key={`sep-${idx}`} className="my-1 h-px bg-white/20 dark:bg-white/10 mx-2" />;
        }
        const selIdx   = selectableItems.indexOf(item);
        const isActive = selIdx === activeIdx;
        return (
          <button
            key={item.id}
            role="menuitem"
            disabled={item.disabled}
            onClick={() => { item.onClick?.(); close(); }}
            onMouseEnter={() => setActiveIdx(selIdx)}
            className={cn(
              "w-[calc(100%-8px)] flex items-center gap-3 mx-1 px-3 py-2 text-sm rounded-xl",
              "transition-colors duration-100",
              item.danger
                ? "text-red-600 dark:text-red-400"
                : "text-gray-700 dark:text-gray-300",
              isActive && !item.danger && "bg-purple-50/60 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
              isActive && item.danger  && "bg-red-50/60 dark:bg-red-900/20",
              !isActive && !item.danger && "hover:bg-gray-50/60 dark:hover:bg-white/6",
              !isActive && item.danger  && "hover:bg-red-50/40 dark:hover:bg-red-900/10",
              item.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
            )}
          >
            {item.icon && (
              <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center opacity-70">
                {item.icon}
              </span>
            )}
            <span className="flex-1 font-medium text-left">{item.label}</span>
            {item.checked  && <Check className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />}
            {item.shortcut && (
              <kbd className="text-[10px] text-gray-400 dark:text-gray-500 font-mono flex-shrink-0">
                {item.shortcut}
              </kbd>
            )}
          </button>
        );
      })}
    </div>,
    document.body
  ) : null;

  return (
    <>
      {cloned}
      {panel}
    </>
  );
}
