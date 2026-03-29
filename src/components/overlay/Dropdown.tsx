"use client";

import React, {
  useState, useEffect, useRef, useCallback, useId,
  createContext, useContext,
} from "react";
import { createPortal } from "react-dom";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DropdownItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  checked?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export type DropdownPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

export interface DropdownProps {
  trigger: React.ReactElement;
  items: (DropdownItem | "separator")[];
  placement?: DropdownPlacement;
  className?: string;
  onClose?: () => void;
}

// ─── Anchor position ─────────────────────────────────────────────────────────

interface AnchorPos { top: number; left: number; width: number; }

function getDropdownPos(
  triggerEl: HTMLElement,
  panelEl: HTMLElement,
  placement: DropdownPlacement
): AnchorPos {
  const tr = triggerEl.getBoundingClientRect();
  const ph = panelEl.offsetHeight;
  const pw = panelEl.offsetWidth;
  const vp = { h: window.innerHeight, w: window.innerWidth };

  const spaceBelow = vp.h - tr.bottom;
  const spaceAbove = tr.top;
  const preferBottom = placement.startsWith("bottom");
  const flipToTop = preferBottom && spaceBelow < ph + 8 && spaceAbove > ph + 8;
  const flipToBottom = !preferBottom && spaceAbove < ph + 8 && spaceBelow > ph + 8;

  const top = (preferBottom && !flipToTop) || flipToBottom
    ? tr.bottom + 6
    : tr.top - ph - 6;

  const alignEnd = placement.endsWith("end");
  const left = alignEnd
    ? Math.max(8, Math.min(tr.right - pw, vp.w - pw - 8))
    : Math.max(8, Math.min(tr.left, vp.w - pw - 8));

  return { top, left, width: tr.width };
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────

export function Dropdown({
  trigger,
  items,
  placement = "bottom-start",
  className,
  onClose,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<AnchorPos | null>(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const triggerRef = useRef<HTMLElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const id = useId();

  const close = useCallback(() => {
    setOpen(false);
    setActiveIdx(-1);
    onClose?.();
  }, [onClose]);

  // Position on open / scroll / resize
  const updatePos = useCallback(() => {
    if (!triggerRef.current || !panelRef.current || !open) return;
    setPos(getDropdownPos(triggerRef.current, panelRef.current, placement));
  }, [open, placement]);

  useEffect(() => {
    if (!open) return;
    // Slight delay so panel is in DOM before measuring
    const frame = requestAnimationFrame(updatePos);
    window.addEventListener("scroll",  updatePos, true);
    window.addEventListener("resize",  updatePos);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [open, updatePos]);

  // Click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        panelRef.current?.contains(e.target as Node)
      ) return;
      close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close]);

  // Keyboard navigation
  const selectableItems = items.filter(
    (it): it is DropdownItem => it !== "separator" && !it.disabled
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault(); setOpen(true);
        }
        return;
      }
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
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
      } else if (e.key === "Tab") {
        close();
      }
    },
    [open, close, activeIdx, selectableItems]
  );

  const cloned = React.cloneElement(trigger, {
    ref:          triggerRef,
    onClick:      () => setOpen((v) => !v),
    onKeyDown:    handleKeyDown,
    "aria-haspopup":   "listbox",
    "aria-expanded":   open,
    "aria-controls":   id,
  } as React.HTMLAttributes<HTMLElement>);

  const panel = open ? (
    <div
      ref={panelRef}
      id={id}
      role="listbox"
      className={cn(
        "fixed z-[250] min-w-[180px] max-w-xs",
        "bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl",
        "border border-white/30 dark:border-white/10",
        "rounded-2xl shadow-glass-xl",
        "py-1.5 animate-slide-down",
        className
      )}
      style={pos ? { top: pos.top, left: pos.left } : { opacity: 0, pointerEvents: "none" }}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, idx) => {
        if (item === "separator") {
          return <div key={`sep-${idx}`} className="my-1 h-px bg-white/20 dark:bg-white/10 mx-2" />;
        }
        const selIdx = selectableItems.indexOf(item);
        const isActive = selIdx === activeIdx;
        return (
          <button
            key={item.id}
            role="option"
            aria-selected={item.checked}
            disabled={item.disabled}
            onClick={() => { item.onClick?.(); close(); }}
            onMouseEnter={() => setActiveIdx(selIdx)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-xl mx-1 transition-colors duration-100",
              "text-gray-700 dark:text-gray-300",
              isActive && !item.danger && "bg-purple-50/60 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
              isActive && item.danger  && "bg-red-50/60 dark:bg-red-900/20 text-red-600 dark:text-red-400",
              !isActive && item.danger  && "text-red-600 dark:text-red-400 hover:bg-red-50/40 dark:hover:bg-red-900/10",
              !isActive && !item.danger && "hover:bg-gray-50/60 dark:hover:bg-white/6",
              item.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
              "w-[calc(100%-8px)]"
            )}
          >
            {item.icon && (
              <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center opacity-70">
                {item.icon}
              </span>
            )}
            <span className="flex-1 text-left">
              <span className="block font-medium">{item.label}</span>
              {item.description && (
                <span className="block text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.description}</span>
              )}
            </span>
            {item.checked && <Check className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />}
            {item.shortcut && (
              <kbd className="text-[10px] text-gray-400 dark:text-gray-500 font-mono flex-shrink-0">{item.shortcut}</kbd>
            )}
          </button>
        );
      })}
    </div>
  ) : null;

  return (
    <>
      {cloned}
      {panel && createPortal(panel, document.body)}
    </>
  );
}
